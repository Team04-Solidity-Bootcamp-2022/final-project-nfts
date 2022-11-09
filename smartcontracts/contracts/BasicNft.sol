// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract BasicNft is ERC721 {
  uint256 private s_tokenCounter;

  event Minted(uint256 indexed tokenId);

  constructor() ERC721('MyNFT', 'MNFT') {
    s_tokenCounter = 0;
  }

  function mintNft() public {
    _safeMint(msg.sender, s_tokenCounter);
    emit Minted(s_tokenCounter);
    s_tokenCounter = s_tokenCounter + 1;
  }

  function getTokenCounter() public view returns (uint256) {
    return s_tokenCounter;
  }
}
