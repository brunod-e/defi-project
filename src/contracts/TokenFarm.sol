pragma solidity ^0.8.0;

import "./BDEToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "BDE Token Farm";
    address public owner;
    address[] public stakers;
    BDEToken public bdeToken;
    DaiToken public daiToken;


    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;


    constructor(BDEToken _bdeToken, DaiToken _daiToken) {
        bdeToken = _bdeToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // Stake Tokens
    function stakeTokens(uint _amount) public {
        require(_amount > 0, "amount cannot be 0");

        daiToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstake Tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];

        require(balance > 0, "staking balance cannot be 0");

        daiToken.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }

    // Issue Tokens
    function issueTokens() public {
        require(msg.sender == owner, "caller must be the owner");

        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];

            if(balance > 0) {
                bdeToken.transfer(recipient, balance);
            }
            
        }
    }

}