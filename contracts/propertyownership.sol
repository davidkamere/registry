pragma solidity ^0.8.17;

import './registry.sol';

//SPDX-License-Identifier: UNLICENSED
contract PropertyOwnership is Registry {

    mapping (address => uint) public ownerToToken;

    // modifier ensures only the owner of the property approves
    modifier onlyOwnerOf(uint _propertyId) {
        require(msg.sender == propertyToHolder[_propertyId]);
        _;
    }

}
