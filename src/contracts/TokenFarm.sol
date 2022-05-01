pragma solidity ^0.8.0;

import "./BDEToken.sol";
import "./DaiToken.sol";


contract TokenFarm {
    string public name = "BDE Token Farm";
    BDEToken public bdeToken;
    DaiToken public daiToken;

    constructor(BDEToken _bdeToken, DaiToken _daiToken) {
        bdeToken = _bdeToken;
        daiToken = _daiToken;
    }
}