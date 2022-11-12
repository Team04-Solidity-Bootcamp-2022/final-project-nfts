// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error NotInSwapPool(address nftAddress, uint256 tokenId);
error AlreadyInSwapPool(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();

contract NftMarketplace is ReentrancyGuard, Ownable {
  struct Listing {
    uint256 price;
    address seller;
  }

  struct SwapListing {
    uint256 index;
    address swapper;
  }

  event ItemListed(
    address indexed seller,
    address indexed nftAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  event ItemAddedToSwapPool(
    address indexed swapper,
    address indexed nftAddress,
    uint256 indexed tokenId
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

  event Swapped(
    address swapper0,
    address swapper1,
    address indexed nftAddress,
    uint256 indexed tokenId0,
    uint256 indexed tokenId1
  );

  // State variables
  mapping(address => mapping(uint256 => Listing)) private s_listings;
  mapping(address => uint256) private s_proceeds;
  mapping(address => uint256[]) private s_swapPools;
  mapping(address => mapping(uint256 => SwapListing)) private s_swapListings;

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
    if (s_listings[nftAddress][tokenId].price <= 0) {
      revert NotListed(nftAddress, tokenId);
    }
    _;
  }

  modifier isInSwapPool(
    address nftAddress,
    uint256 tokenId
  ) {
    address swapper = s_swapListings[nftAddress][tokenId].swapper;
    if (swapper == address(0)) {
      revert NotInSwapPool(nftAddress, tokenId);
    }
    _;
  }

  modifier notInSwapPool(
    address nftAddress,
    uint256 tokenId
  ) {
    if (s_swapListings[nftAddress][tokenId].swapper != address(0)) {
      revert AlreadyInSwapPool(nftAddress, tokenId);
    }
    _;
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
    require(s_swapListings[nftAddress][tokenId].swapper == address(0), "Already on swap pool");
    if (price <= 0) {
      revert PriceMustBeAboveZero();
    }

    if (IERC721(nftAddress).getApproved(tokenId) != address(this)) {
      revert NotApprovedForMarketplace();
    }

    s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
    emit ItemListed(msg.sender, nftAddress, tokenId, price);
  }

  function listSwapItem(
    address nftAddress,
    uint256 tokenId
  )
    external
    notInSwapPool(nftAddress, tokenId)
    isOwner(nftAddress, tokenId, msg.sender)
  {
    require(s_listings[nftAddress][tokenId].price <= 0, "Already listed");
    if (IERC721(nftAddress).getApproved(tokenId) != address(this)) {
      revert NotApprovedForMarketplace();
    }

    
    s_swapListings[nftAddress][tokenId] = SwapListing(s_swapPools[nftAddress].length, msg.sender);
    s_swapPools[nftAddress].push(tokenId);
    emit ItemAddedToSwapPool(msg.sender, nftAddress, tokenId);
  }

  function randomNFTSwap(
    address nftAddress,
    uint256 tokenId
  )
    external
    isInSwapPool(nftAddress, tokenId)
  {
    require(s_swapPools[nftAddress].length > 1, "Not enough nfts to swap, try later");
    require(IERC721(nftAddress).ownerOf(tokenId) == msg.sender, "Not NFT owner");

    uint256 rndIndex = getRandomNumber(block.number) % s_swapPools[nftAddress].length;
    uint16 decrement = 1;
    while(s_swapPools[nftAddress][rndIndex] == tokenId) {
      //FIXME
      rndIndex = getRandomNumber(block.number-decrement) % s_swapPools[nftAddress].length;
      ++decrement;
    }

    uint256 tokenId1 = s_swapPools[nftAddress][rndIndex];
    IERC721(nftAddress).safeTransferFrom(
      s_swapListings[nftAddress][tokenId1].swapper,
      msg.sender,
      tokenId1
    );
    IERC721(nftAddress).safeTransferFrom(
      msg.sender,
      s_swapListings[nftAddress][tokenId1].swapper,
      tokenId
    );

  
    delete s_swapListings[nftAddress][tokenId1];
    remove(nftAddress, rndIndex);

    unchecked {
      remove(nftAddress, s_swapListings[nftAddress][tokenId].index);
    }
    delete s_swapListings[nftAddress][tokenId];

    emit Swapped(
      msg.sender,
      s_swapListings[nftAddress][tokenId1].swapper,
      nftAddress,
      tokenId,
      tokenId1
    );
  }

  function getRandomNumber(uint256 blockNumber) public view returns (uint256 randomNumber) {
        randomNumber = uint256(blockhash(blockNumber));
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

  function remove(address nftAddress, uint index) public{
    s_swapPools[nftAddress][index] = s_swapPools[nftAddress][s_swapPools[nftAddress].length - 1];
    s_swapPools[nftAddress].pop();
  }

  function getListing(address nftAddress, uint256 tokenId)
    external
    view
    returns (Listing memory)
  {
    return s_listings[nftAddress][tokenId];
  }

  function getSwapPoolListing(address nftAddress, uint256 tokenId)
    external
    view
    returns (SwapListing memory)
  {
    return s_swapListings[nftAddress][tokenId];
  }

  function getSwapPool(address nftAddress) 
    external
    view
    returns (uint256[] memory)
  {
    return s_swapPools[nftAddress];
  }

  function getProceeds(address seller)
    external
    view
    returns (uint256) 
  {
    return s_proceeds[seller];
  }
}
