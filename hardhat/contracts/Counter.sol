// SPDX-License-Identifier: GPL-3.0


pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PoliMilhas is ERC20("PoliMilhas", "PM"){
    address public owner;
    
    event TokenRedeemed(address user, uint256 amount);  
    event TokensSentToContract(address sender, uint256 amount);

    constructor() {
        owner = msg.sender; 
    }
    function CreateNewToken(uint256 amount) public{
        require(msg.sender == owner);
        _mint(address(this), amount);

    }
    
    function sendToContract(uint qnt) public{
        require(msg.sender.balance >= qnt, "Not enough Tokens");
        _transfer(address(msg.sender), address(this), qnt);
          emit TokensSentToContract(msg.sender, qnt);
    
    }
    function sendTokens (address recipient, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can send tokens from the contract");
        require(balanceOf(address(msg.sender)) >= amount, "Contract does not have enough tokens");
        _transfer(address(msg.sender), recipient, amount);
    }

    //100 Gwei = 1 PM
    function buyTokens() public payable {
        require(msg.value >= 100 gwei, "Minimum purchase is 100 Gwei");
        uint256 tokenAmount = msg.value / 100 gwei;
        require(totalSupply() >= tokenAmount, "Contract does not have enough tokens");
         _transfer(address(this), msg.sender, tokenAmount);
    }

   function RedeemToken(uint price) public payable{
        require(msg.sender.balance >= price, "Not enough Tokens");
        _transfer(msg.sender, address(this), price);
        emit TokenRedeemed(msg.sender, price);
   }



}   