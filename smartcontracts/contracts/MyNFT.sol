// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract MyNFT is ERC721, ERC721Enumerable, ERC721Burnable, AccessControl {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;
  uint16 private _MAX_MINTS = 100;

  constructor() ERC721('MyNFT', 'MNFT') {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function safeMint(address to) public onlyRole(DEFAULT_ADMIN_ROLE) {
    uint256 tokenId = _tokenIdCounter.current();
    require(tokenId < _MAX_MINTS, 'Max Mints achieved, cant mint more');
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
  }

  function mint() public {
    uint256 tokenId = _tokenIdCounter.current();
    require(tokenId < _MAX_MINTS, 'Max Mints achieved, cant mint more');
    _tokenIdCounter.increment();
    _safeMint(msg.sender, tokenId);
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
