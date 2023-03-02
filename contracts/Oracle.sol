// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Oracle is Ownable {
    address private master;
    constructor(address _master){
        master = _master;
    }
    event Invoke(address user,uint256 amount);

    function invoke(address user,uint256 amount) external onlyOwner {
        emit Invoke(user, amount);
    }

    function run(bytes calldata callback) external onlyOwner {
        (bool success,) = payable(master).call{value:0}(callback);
        require(success);
    }
}