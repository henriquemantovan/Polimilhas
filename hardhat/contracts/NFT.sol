// SPDX-License-Identifier: GPL-3.0


pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract NFTMilhas is ERC721("PoliMilhas", "PM"){

    IERC20 public TokenContract;
    address public owner;
    mapping (uint256 => string) public tokenImageURL;
    mapping (uint256 => uint256) public price;

    constructor(){
        owner=msg.sender;
    }
        function setTokenContract(address _TokenContractAddress) public {
        require(msg.sender == owner, "Only the owner can set the token contract");
        TokenContract = IERC20(_TokenContractAddress);
    }
    
    function CreateToken(uint256 _ID, string memory  _TokenImage, uint256 _price) public{
        require(msg.sender == owner, "Only the onwer can do this");
        _mint(address(this), _ID);
        tokenImageURL[_ID] = _TokenImage;
        price[_ID] = _price;
    }   

   function buyNFT(uint256 tokenId) public {
        uint256 nftPrice = price[tokenId];
        require(nftPrice > 0, "NFT not for sale");
        require(TokenContract.balanceOf(msg.sender) >= nftPrice, "Insufficient token balance");
        require(ownerOf(tokenId) == address(this), "NFT not available for sale");

        TokenContract.transferFrom(msg.sender, address(TokenContract), nftPrice);

        _transfer(address(this), msg.sender, tokenId);
    }

}