pragma solidity ^0.8.0;

import "./BDEToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    BDEToken public bdeToken;
    DaiToken public daiToken;

    string public name = "BDE Token Farm";
    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;


    constructor(BDEToken _bdeToken, DaiToken _daiToken) {
        bdeToken = _bdeToken;
        daiToken = _daiToken;
    }

    // Stake Tokens
    function stakeTokens(uint _amount) public {
        daiToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstake Tokens


    // Issue Tokens

}