const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259");
const salts_json = require('./build/SaltsToken.json'); 
const config = require('./config.json');
const address = config["SaltsToken"];
const abi = salts_json.abi;


const wallet = new ethers.Wallet(config['private_key'] , provider);

saltsToken = new ethers.Contract(address, abi, wallet);

const CheckBalance = async () => {
    console.log("checking balance..");
    const balance = await saltsToken.balanceOf(wallet.address);
    console.log("balance is : ", balance.toString());
}

CheckBalance();