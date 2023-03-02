const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259");

const busd_json = require('./build/StableCoin.json');
const config = require('./config.json');

const busd_address = config["StableCoin"];
const busd_abi = busd_json.abi;

const wallet = new ethers.Wallet(config['private_key'] , provider);
console.log("wallet loaded");

const busd = new ethers.Contract(busd_address,busd_abi, wallet);
console.log("busd loaded..");

console.log("checking balance before transaction ..");
const checkBalance = async () => {
    amount = await busd.balanceOf(wallet.address);
    console.log("market sc balance in salts token: ", amount.toString());
}
checkBalance();

const SendMoney = async() => {
    const amount = "10000000000000000000";
    const to = config["user"];
    const tx = await busd.connect(wallet).transfer(to, amount);
    console.log("transaction hash : ", tx.hash);
}

SendMoney();
console.log("money sent");

checkBalance();
console.log("we are done..");

