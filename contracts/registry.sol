pragma solidity ^0.8.17;

import "./Ownable.sol";
//SPDX-License-Identifier: UNLICENSED

contract Registry is Ownable{

    constructor() Ownable(msg.sender){}
    
    uint public propCount = 0;
    uint holderCount = 0;
    uint public transactionCount = 0;

    // struct for property owner details
    struct holder {
        string name;
        string tax_pin;
        string email;
        uint id_no;
        uint contact;
        address owner;
        bool isExist;
    }



    //struct for property details
    struct property {
        uint id;
        string name;
        string location;
        string holder_name;
        string lr_no;
        uint holder_id;
        address _addr;
        uint price;
        bool sold;
        uint timestamp;
    }



    // stores properties
    mapping(uint => property) public properties;
    mapping(uint => property) public transactions;

    // stores holders
    holder [] public holders;


    // event that listens to addition of a new property into the properties array
    event NewProperty(uint propertyId, string name, string location, string holder_name, string lr_no);
    event LogApprovedForTransaction(uint propertyId);
    event LogSold(uint propertyId);



    // a lookup of how many properties a holder has
    mapping (address => uint) public holderToPropertyCount;
    // a lookup of property owners by their property id
    mapping (uint => address) public propertyToHolder;
    // a lookup of validatorDetails by their addresses
    mapping (string => bool) public regToAvailable;

    mapping (address => property) public publicProperty;
    mapping (address => holder) public holderdetails;

    // registers holders
    function regHolders(string memory name, string memory tax_pin, string memory email,uint id_no, uint contact) public {
        holderCount++;
        holders.push(holder(name,tax_pin,email, id_no,contact,msg.sender,true));
        holderdetails[msg.sender]=holder(name,tax_pin,email,id_no,contact,msg.sender,true);
    }

    // returns holder details
    function getHolders() public view returns (holder[] memory){
        return holders;
    }



    // registers property by their owners
    function regProperty(string memory name, string memory location, string memory holder_name, string memory lr_no, uint holder_id,uint price) public {
        //push each property to the properties array
        require(!regToAvailable[lr_no]);
        bool pd = true;
        // add property count
        propCount++;
        transactionCount++;
        uint timestamp = block.timestamp;
        properties[propCount] = property(propCount, name, location, holder_name, lr_no, holder_id, msg.sender,price,pd, timestamp);
        transactions[transactionCount] = property(propCount, name, location, holder_name, lr_no, holder_id, msg.sender,price,pd, timestamp);


        regToAvailable[lr_no] = true;
        holderToPropertyCount[msg.sender]++;

        emit NewProperty(propCount, name, location, holder_name, lr_no);

    }


    // function that gets all properties by their owners address
    function getPropertyByHolder(address _holder) external view returns(uint[] memory) {
        uint[] memory result = new uint[] (holderToPropertyCount[_holder]);
        uint counter = 0;

        //loops through the holders array checking each holder and the properties they own and adds a counter for each property a holder has
        for (uint i = 0; i < holders.length; i++) {
            if(propertyToHolder[i] == _holder) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function buyProperty(uint _propertyId) public payable {
        property memory _land= properties[_propertyId];
        address _seller = _land._addr;
        // Require that the land is for sale
        require(!_land.sold);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Ensure price is correct
        require(msg.value >= _land.price);
        // Update the product
        _land._addr = msg.sender;

        _land.sold = true;

        properties[_propertyId] = _land;
        // Send money
        payable(_seller).transfer(msg.value);
        bool pd = false;
        // Transfer property ownership
        _land.timestamp = block.timestamp;
        transactionCount++;
        transactions[transactionCount] = property(transactionCount, _land.name, _land.location, _land.holder_name, _land.lr_no, _land.holder_id, msg.sender,_land.price,pd, block.timestamp);
        emit LogSold(_propertyId);
    }

    function sellProperty (uint _propertyId) public {
        property memory _land= properties[_propertyId];
        // require that the seller is the land owner
        require(msg.sender == _land._addr);
        // change the owner of the land to the blockchain address
        _land.sold = false;

        properties[_propertyId] = _land;
    }



}
