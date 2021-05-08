pragma solidity >=0.6.0 <0.8.0;

import "./ERC721.sol";

contract Color is ERC721 {

    string[] public colors; //array storing all the deployed colors
    mapping(string => bool) _colorExists; // another mapping array for knowing if the color is taken or not


    // constructor(name, symbol)
    constructor() ERC721("Color", "COLOR") public {
    }

    function mint(string memory _color) public {

        // require UNIQUE Color (non fung)
        require(!_colorExists[_color]);

        // passed in color -> add and track
        colors.push(_color);
        uint _id = colors.length-1;

        // call mint function
        _mint(msg.sender, _id);

        // Color - track its existence
        _colorExists[_color] = true;
    }
}