// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NotPledged(address nftAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();
error PriceCannotBeNegative();

contract NftMarketplace is ReentrancyGuard {
  struct Listing {
    uint256 price;
    address seller;
  }

  event ItemListed(
    address indexed seller,
    address indexed nftAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  event ItemCancelled(
    address indexed seller,
    address indexed nftAddress,
    uint256 indexed tokenId
  );

  event ItemBought(
    address indexed buyer,
    address indexed nftAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  event SwapOffered(
    address indexed swapper,
    address indexed listingNftAddress,
    uint256 indexed listingTokenId,
    address swapNftAddress,
    uint256 swapTokenId
  );

  // event ItemSwapped(
  //   address indexed owner,
  //   address indexed swapperAddress, 
  //   address nftAddress, 
  //   address swapNftAddress,
  //   uint256 tokenId, 
  //   uint256 swapTokenId
  // );

  struct Swap {
    address swapper;
    address swapNftAddress;
    uint256 swapTokenId;
  }

  struct SwapPledge {
    address nftAddress;
    uint256 tokenId;
  }

  // State variables
  mapping(address => mapping(uint256 => Listing)) private s_listings;
  mapping(address => uint256) private s_proceeds;

  // Swap offers for an NFT
  mapping(address => mapping(uint256 => Swap[])) private s_swapOffers;

  // NFT pledged to potentially many swaps
  mapping(address => mapping(uint256 => SwapPledge[])) private s_swapPledges;

  // Function modifiers
  modifier notListed(
    address nftAddress,
    uint256 tokenId,
    address owner
  ) {
    Listing memory listing = s_listings[nftAddress][tokenId];
    if (listing.price > 0) {
      revert AlreadyListed(nftAddress, tokenId);
    }
    _;
  }

  modifier isOwner(
    address nftAddress,
    uint256 tokenId,
    address spender
  ) {
    IERC721 nft = IERC721(nftAddress);
    address owner = nft.ownerOf(tokenId);
    if (spender != owner) {
      revert NotOwner();
    }
    _;
  }

  modifier isListed(
    address nftAddress,
    uint256 tokenId
  ) {
    Listing memory listing = s_listings[nftAddress][tokenId];
    if (listing.price <= 0) {
      revert NotListed(nftAddress, tokenId);
    }
    _;
  }

  // Returns false if the nft to be swapped is not pledged to a listing
  function isSwappable(
    address listingNftAddress,
    address swapNftAddress,
    uint256 listingTokenId,
    uint256 swapTokenId
  ) internal view returns (bool) {
    SwapPledge[] memory swapPledges = s_swapPledges[swapNftAddress][swapTokenId];
    bool isFound = false;
    uint256 i = 0;
    while(!isFound && i < swapPledges.length) {
      if(swapPledges[i].nftAddress == listingNftAddress && swapPledges[i].tokenId == listingTokenId) {
        isFound = true;
      }
      i++;
    }
    return isFound;
  }

  function listItem(
    address nftAddress,
    uint256 tokenId,
    uint256 price
  )
    external
    notListed (nftAddress, tokenId, msg.sender)
    isOwner(nftAddress, tokenId, msg.sender)
  {
    if (price <= 0) {
      revert PriceMustBeAboveZero();
    }

    IERC721 nft = IERC721(nftAddress);
    if (nft.getApproved(tokenId) != address(this)) {
      revert NotApprovedForMarketplace();
    }

    s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
    emit ItemListed(msg.sender, nftAddress, tokenId, price);
  }

  function buyItem(
    address nftAddress,
    uint256 tokenId
  )
    external
    payable
    isListed(nftAddress, tokenId)
    nonReentrant
  {
    Listing memory listedItem = s_listings[nftAddress][tokenId];
    if (msg.value < listedItem.price) {
      revert PriceNotMet(nftAddress, tokenId, listedItem.price);
    }

    s_proceeds[listedItem.seller] += msg.value;
    delete (s_listings[nftAddress][tokenId]);
    IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);
    emit ItemBought(msg.sender, nftAddress, tokenId, listedItem.price);
  }

  function updateListing(
    address nftAddress,
    uint256 tokenId,
    uint256 newPrice
  )
    external
    isListed(nftAddress, tokenId)
    nonReentrant
    isOwner(nftAddress, tokenId, msg.sender)
  {
    if (newPrice == 0) {
      revert PriceMustBeAboveZero();
    }

    s_listings[nftAddress][tokenId].price = newPrice;
    emit ItemListed(msg.sender, nftAddress, tokenId, newPrice);
  }

  function withdrawProceeds() external {
    uint256 proceeds = s_proceeds[msg.sender];
    if (proceeds <= 0) {
      revert NoProceeds();
    }
    s_proceeds[msg.sender] = 0;

    (bool success, ) = payable(msg.sender).call{value: proceeds}("");
    require(success, "Transfer failed");
  }


  function cancelListing(address nftAddress, uint256 tokenId)
    external
    isOwner(nftAddress, tokenId, msg.sender)
    isListed(nftAddress, tokenId)
  {
    delete (s_listings[nftAddress][tokenId]);
    emit ItemCancelled(msg.sender, nftAddress, tokenId);
  }

  function getListing(address nftAddress, uint256 tokenId)
    external
    view
    returns (Listing memory)
  {
    return s_listings[nftAddress][tokenId];
  }

  function getProceeds(address seller)
    external
    view
    returns (uint256) 
  {
    return s_proceeds[seller];
  }

  // swapper, i.e. msg.sender, makes a swap offer for a listed NFT
  // but must have own NFT as listed on the marketplace

  function makeSwapOffer(
    address listingNftAddress,
    uint256 listingTokenId,
    address swapNftAddress,
    uint256 swapTokenId
  )
    external
    isOwner(swapNftAddress, swapTokenId, msg.sender)
    nonReentrant
    isListed(swapNftAddress, swapTokenId)
  {
    require(!isSwappable(listingNftAddress, swapNftAddress, listingTokenId, swapTokenId), "Swap offer already exists");

    IERC721 nft = IERC721(swapNftAddress);
    if (nft.getApproved(swapTokenId) != address(this)) {
      revert NotApprovedForMarketplace();
    }

    s_swapOffers[listingNftAddress][listingTokenId]
      .push(
        Swap(
          msg.sender,
          swapNftAddress,
          swapTokenId
        )
      );

    s_swapPledges[swapNftAddress][swapTokenId]
      .push(
        SwapPledge(
          listingNftAddress,
          listingTokenId
        )
      );

    emit SwapOffered(
      msg.sender,
      listingNftAddress,
      listingTokenId,
      swapNftAddress,
      swapTokenId
    );
  }

  function cancelSwapOffer(
    address listingNftAddress,
    uint256 listingTokenId,
    address swapNftAddress,
    uint256 swapTokenId
  )
    external    
    nonReentrant
    isOwner(swapNftAddress, swapTokenId, msg.sender)
  {
    require(isSwappable(listingNftAddress, swapNftAddress, listingTokenId, swapTokenId));
    SwapPledge[] storage swapPledges = s_swapPledges[swapNftAddress][swapTokenId];
    bool isFound = false;
    uint256 i = 0;
    while(!isFound && i < swapPledges.length) {
      if(swapPledges[i].nftAddress == listingNftAddress && swapPledges[i].tokenId == listingTokenId) {
        isFound = true;
        swapPledges[i] = swapPledges[swapPledges.length - 1];
        delete swapPledges[swapPledges.length - 1];
        s_swapPledges[swapNftAddress][swapTokenId] = swapPledges;
      }
    }

    Swap[] storage swapOffers = s_swapOffers[listingNftAddress][listingTokenId];
    isFound = false;
    i = 0;

    while(!isFound && i < swapOffers.length) {
      if(swapOffers[i].swapNftAddress == swapNftAddress && swapOffers[i].swapTokenId == swapTokenId) {
        isFound = true;
        swapOffers[i] = swapOffers[swapPledges.length - 1];
        delete swapOffers[swapOffers.length - 1];
        s_swapOffers[listingNftAddress][listingTokenId] = swapOffers;
      }
    }
  }

  function getSwapOffersForNft(address nftAddress, uint256 tokenId) 
    external
    view
    isListed(nftAddress, tokenId)
    returns (Swap[] memory)
  {
    return s_swapOffers[nftAddress][tokenId];
  }

  function getSwapPledgesOfNft(address nftAddress, uint256 tokenId) 
    external
    view
    isListed(nftAddress, tokenId)
    returns (SwapPledge[] memory)
  {
    return s_swapPledges[nftAddress][tokenId];
  }

  function cleanUpSwapOffers(address nftAddress, address swapNftAddress, uint256 tokenId, uint256 swapTokenId)
    internal
  {
    SwapPledge[] storage swapPledges = s_swapPledges[swapNftAddress][swapTokenId];
    bool isFound = false;
    uint256 i = 0;
    while(!isFound && i < swapPledges.length) {
      if(swapPledges[i].nftAddress == nftAddress && swapPledges[i].tokenId == tokenId) {
        isFound = true;
        swapPledges[i] = swapPledges[swapPledges.length - 1];
        delete swapPledges[swapPledges.length - 1];
        s_swapPledges[swapNftAddress][swapTokenId] = swapPledges;
      }
    }

    Swap[] storage swapOffers = s_swapOffers[nftAddress][tokenId];
    isFound = false;
    i = 0;

    while(!isFound && i < swapOffers.length) {
      if(swapOffers[i].swapNftAddress == swapNftAddress && swapOffers[i].swapTokenId == swapTokenId) {
        isFound = true;
        swapOffers[i] = swapOffers[swapPledges.length - 1];
        delete swapOffers[swapOffers.length - 1];
        s_swapOffers[nftAddress][tokenId] = swapOffers;
      }
    }
  }

  function approveSwap(address swapper, address nftAddress, address swapNftAddress, uint256 tokenId, uint256 swapTokenId)
    external
    isOwner(nftAddress, tokenId, msg.sender)
    isListed(nftAddress, tokenId)
  {
    // TODO: use prices
    // s_proceeds[listedItem.seller] += msg.value;
   
    require(isSwappable(nftAddress, swapNftAddress, tokenId, swapTokenId), "Cannot be swapped");
    cleanUpSwapOffers(nftAddress, swapNftAddress, tokenId, swapTokenId);
    
    delete (s_listings[nftAddress][tokenId]);
    delete (s_listings[swapNftAddress][swapTokenId]);

    IERC721(swapNftAddress).transferFrom(swapper, msg.sender, swapTokenId);
    IERC721(nftAddress).transferFrom(msg.sender, swapper, tokenId);

  }
}
