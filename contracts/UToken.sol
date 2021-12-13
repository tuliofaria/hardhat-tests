pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UToken is ERC20 {
    address owner;

    constructor(uint256 initialSupply) ERC20("U-Token", "$UT") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You need to be the Owner.");
        _;
    }

    function mintNewTokens(uint256 amount) external onlyOwner {
        _mint(msg.sender, amount);
    }
}