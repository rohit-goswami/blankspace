// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract ImageRegister {

    struct Image {
        string ipfsHash;        
        string title;           
        string description;  
        uint256 uploadedOn;   
    }

    mapping (address => Image[]) public ownerToImages;
    bool private stopped = false;

    event LogImageUploaded(
        address indexed _owner,
        string _ipfsHash,
        string _title,
        string _description,
        uint256 _uploadedOn
    );


    fallback () external{}  //non-payable fallback function throws exeption if ether sent to this contract

    function uploadImage(
        string memory  _ipfsHash,
        string memory _title,
        string memory _description
    ) public returns (bool _success){

        require(bytes(_ipfsHash).length == 46 );
        require(bytes(_title).length > 0 && bytes(_title).length <= 256 );
        require(bytes(_description).length < 1024 );
    
        uint256 uploadedOn = block.timestamp;
        Image memory image = Image(
            _ipfsHash,
            _title,
            _description,
            uploadedOn
        );

        ownerToImages[msg.sender].push(image);

        emit LogImageUploaded(
            msg.sender,
            _ipfsHash,
            _title,
            _description,
            uploadedOn
        );

        _success = true;
    }

    function getImageCount(address _owner) view public returns (uint256){
        require(_owner != address(0));
        return ownerToImages[_owner].length;
    }

    function getImage(address _owner, uint8 _index) public view returns (
        string memory _ipfsHash,
        string memory _title,
        string memory _description,
        uint256 _uplaodedOn
    ){
        require(_owner !=address(0));
        require(_index >=0 && _index <= 2**8 -1 );
        require(ownerToImages[_owner].length > 0 );

        Image storage image = ownerToImages[_owner][_index];

        return( 
            image.ipfsHash,
            image.title,
            image.description,
            image.uploadedOn
        );
    }

}