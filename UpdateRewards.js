// const cron = require("node-cron");
// const { ethers } = require("ethers");

// const provider = new ethers.providers.JsonRpcProvider(
//   "https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259"
// );
// const saltyard_json = require("./build/SaltYard.json");
// const config = require("./config.json");
// const address = config["SaltYard"];

// const abi = saltyard_json.abi;
// const salt_address = config["SaltsToken"];
// const salts_abi = require("./build/SaltsToken.json");

// const wallet = new ethers.Wallet(config["private_key"], provider);

// saltYard = new ethers.Contract(address, abi, wallet);
// saltz = new ethers.Contract(salt_address, salts_abi, wallet);

// const toalRewards = saltz.TotalRewards();
// console.log("total rewards: ", toalRewards);

//const gasCost = Number(ethers.utils.formatEther(gasPrice.mul(gasLimit)));

// const Updaterewards = async () => {
// console.log("Calculating");
// const gasPrice = await wallet.getGasPrice();
// console.log("asdasdasd");
// const gasLimit = await saltYard.estimateGas.UpdateRewards();

// console.log(gasPrice.toString(), gasLimit.toString())
//   await saltYard.connect(config["user"]).UpdateRewards({
//     gasPrice: 42000000000,
//     gasLimit: 120000,
//     value: 0,
//   });
//   console.log("We are done");
// };

// Updaterewards();

// function UpdateRewards() public onlyOwner {
//     console.log("for loop..");
//     for (uint i = 0 ; i <= stakedAddresses.length ; i ++) {
//         address account = stakedAddresses[i];
//         StakeInfo storage user = stakeInfos[account];
//         uint256 amount = user.amount;
//         uint256 reward_per_token = totalRewards() / totalStaked * (stake_duration * 24 * 60);
//         uint256 _rewards = amount * reward_per_token;
//         console.log("rewards total..", _rewards);
//         user.rewards += _rewards;
//         console.log("added rewards to staker..");
//     }

// cron.schedule('* * * * *', () => {
//     console.log("updating rewards every minuite")
// updates rewards for every minuite
//     Updaterewards();

//     console.log("rewards updated")
// });

// const cron = require("node-cron");
const { ethers } = require("ethers");
const UserModel = require("./models/userModal");
const provider = new ethers.providers.JsonRpcProvider(
  "https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259"
);
const saltyard_json = require("./build/SaltYard.json");
const saltz_json = require("./build/SaltsToken.json");

const config = require("./config.json");

const yard_address = config["SaltYard"];
const saltz_address = config["SaltsToken"];

const yard_abi = saltyard_json.abi;
const saltz_abi = saltz_json.abi;

const wallet = new ethers.Wallet(config["private_key"], provider);

saltYard = new ethers.Contract(yard_address, yard_abi, wallet);
saltz = new ethers.Contract(saltz_address, saltz_abi, wallet);

console.log("updating rewards..");
const UpdateRewards = async () => {
  const totalRewards = await saltz.TotalRewards();
  const totalStaked = await saltYard.totalStaked();
  const stake_duration = await saltYard.stake_duration();
  const totalStakers = await saltYard.totalStakers();
  // cosnt stakedAddresses(i) = await yard.stakedAddresses();
  console.log("for loop..");
  for (i = 0; i <= totalStakers; i++) {
    console.log("fetching address..");
    const account = await saltYard.stakedAddresses[i];
    console.log("fetching user struct..");
    const user = await saltYard.stakeInfos[account];
    console.log("calculating amount..");
    const amount = await saltYard.stakeInfos(account).amount;
    console.log("calculate rewards..");
    const reward_per_token =
      (totalRewards / totalStaked) * (stake_duration * 24 * 60);
    console.log("_rewards");
    const _rewards = amount * reward_per_token;
    console.log("address ", account, "rewards ", _rewards);
    const userData = await UserModel.findOne({ userAddress: account })
    // TODO:@MUHIB Save this in DB
    userData.totalStakedRewards += _rewards;
    userData.totalStaked = totalStaked;
    await userData.save()
    //         console.log("added rewards to staker..");
  }
};

UpdateRewards();

//const gasCost = Number(ethers.utils.formatEther(gasPrice.mul(gasLimit)));

// const Updaterewards = async () => {
//   // console.log("Calculating");
//   // const gasPrice = await wallet.getGasPrice();
//   // console.log("asdasdasd");
//   // const gasLimit = await saltYard.estimateGas.UpdateRewards();

//   // console.log(gasPrice.toString(), gasLimit.toString())
//   await saltYard.connect(config["user"]).UpdateRewards({
//     gasPrice: 42000000000,
//     gasLimit: 120000,
//     value: 0,
//   });
//   console.log("We are done");
// };

// Updaterewards();

// function UpdateRewards()  {
//     console.log("for loop..");
//     const totalRewards = await saltz.TotalRewards();
//     const totalStaked = await yard.totalStaked();
//     const stake_duration = await yard.stake_duration();
//     cosnt stakedAddresses = await yard.stakedAddresses();
//     for ( i = 0 ; i <= stakedAddresses.length ; i ++) {
//         const account = stakedAddresses[i];
//         const user = await yard.stakeInfos(account);
//         const amount = user.amount;
//         const reward_per_token = totalRewards / totalStaked * (stake_duration * 24 * 60);
//         const _rewards = amount * reward_per_token;
//         console.log("rewards total..", _rewards);
//    // TODO:Save this DB @MUHIB
//         user.rewards += _rewards;
//         console.log("added rewards to staker..");
//     }

// cron.schedule('* * * * *', () => {
//     console.log("updating rewards every minuite")
//     // updates rewards for every minuite
//     Updaterewards();

//     console.log("rewards updated")
// });
