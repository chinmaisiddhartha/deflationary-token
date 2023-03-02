// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Oracle.sol";


interface Token {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (uint256);  
    function TotalRewards() external view returns(uint256);  
}


contract SaltYard is Ownable {

    Token SALTS;

    uint256 public totalStaked; // total SALTS staked on this contract
    
    // tracks total rewards sent to pool from marketplace 
    uint256 public totalrewards = SALTS.TotalRewards();
    
    uint256 public stake_duration; // 30 days / 90 days 
    
    // charges for early unstake before 7 days (early unstake tax)
    uint public interestRate ;

    address public oracle;

    constructor(Token _tokenAddress)  {
        require(address(_tokenAddress) != address(0),"Token Address cannot be address 0");                
        SALTS = _tokenAddress;        
    } 


    struct  StakeInfo {   
        uint256 amount; // total staked amount
        uint[] stakes; // tracks every stake
        uint[] min_lockin; // minimum lockin period  
        uint256 claimed; // tracks interest withdrawn
        uint256 rewards; // total rewards earned by user        
        bool staked; // default false, true for stakers
    }

    mapping (address => StakeInfo) public stakeInfos;

    address[] private stakedAddresses ;

    event Staked(address indexed user, uint256 thisStake, uint256 totalStaked, uint256 timestamp );
    event UnStaked(address indexed user, uint256 unstakedAmount, uint256 remainingStake, uint256 timestamp);


    function Stake(uint256 _amount) external {
        SALTS.transferFrom(msg.sender, address(this), _amount);
        StakeInfo storage _stakeInfo = stakeInfos[msg.sender];
        _stakeInfo.stakes.push(_amount);
        _stakeInfo.min_lockin.push(block.timestamp + 7 days);

        if(!_stakeInfo.staked){
            stakedAddresses.push(msg.sender);
        }
        _stakeInfo.staked = true;
        _stakeInfo.amount += _amount;
        totalStaked += _amount; 

        emit Staked(msg.sender, _amount, stakeInfos[msg.sender].amount, block.timestamp);

    }


    // helps in calculating early unstake tax
    struct Unstake_stats {
        uint unstakable; // passed 7 days
        uint taxable; // behind 7 days
    }

    mapping (address => Unstake_stats) stats;

    function UnStake(uint256 _amount) external {
        require(_amount <= stakeInfos[msg.sender].amount, "invalid amount");
        StakeInfo storage _stake = stakeInfos[msg.sender];
       
        for (uint i = 0; i < _stake.stakes.length; i ++) {
            if(_stake.min_lockin[i] <= block.timestamp) {
                stats[msg.sender].unstakable += _stake.stakes[i];
            } else {
                stats[msg.sender].taxable += _stake.stakes[i];
            }
        }

        uint totalTokens;
        if (_amount <= stats[msg.sender].unstakable) {
            totalTokens = _amount ;
        } else {
            uint remaining = _amount - stats[msg.sender].unstakable;
            uint amt_with_tax = remaining - (remaining * interestRate / 100);
            totalTokens = stats[msg.sender].unstakable + amt_with_tax ;
        }
        SALTS.transfer(msg.sender, totalTokens);

        totalStaked -= totalTokens ;
        _stake.amount -= totalTokens;

        emit UnStaked(msg.sender, _amount, stakeInfos[msg.sender].amount, block.timestamp);
    }


    //  Update all the staker's rewards in this method.

    function UpdateRewards() public returns(bool){
        for (uint i = 0 ; i <= stakedAddresses.length ; i ++) {
            uint256 amount = stakeInfos[stakedAddresses[i]].amount;
            uint256 reward_per_token = totalrewards / totalStaked * (stake_duration * 24 * 60);
            uint256 _rewards = amount * reward_per_token;
            stakeInfos[stakedAddresses[i]].rewards += _rewards;
        }
        return true;
    }


    function claimRewards() public {
        uint amount = stakeInfos[msg.sender].rewards;
        Oracle(oracle).invoke(msg.sender);
    }

    function sendRewards(uint256 amount) external {
        require(msg.sender == oracle);
        SALTS.transfer(msg.sender, amount);
        stakeInfos[msg.sender].rewards -= amount ;
        stakeInfos[msg.sender].claimed += amount ;


    }

    function lockinperiod(uint i) external view returns (uint256) {
        StakeInfo storage myStake = stakeInfos[msg.sender];
        return myStake.min_lockin[i];
    }
    
    function set_stake_duration(uint _days) public onlyOwner {
        stake_duration = _days;
    }

}