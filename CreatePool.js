const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259");

const salts_json = require('./build/SaltsToken.json'); 
const market_json = require('./build/SaltsMarketPlace.json');
const busd_json = require('./build/StableCoin.json');
const config = require('./config.json');

const market_address = config["SaltsMarket"];
const market_abi = market_json.abi;

const salts_address = config["SaltsToken"];
const salts_abi = salts_json.abi;

const busd_address = config["StableCoin"];
const busd_abi = busd_json.abi;

const wallet = new ethers.Wallet(config['private_key'] , provider);
console.log("loading market");
const saltsMarket = new ethers.Contract(market_address, market_abi, wallet);
console.log("loading Salts");
const saltsToken = new ethers.Contract(salts_address, salts_abi, wallet);
console.log("loading busd");
const busd = new ethers.Contract(busd_address,busd_abi, wallet);

let amount;
// const depositSalts = async () => {
//     amount = await saltsToken.balanceOf(wallet.address);
//     console.log("amount is: ", amount.toString());
//     await saltsToken.connect(wallet).transfer(market_address, amount);
//     console.log("success");
// }

// depositSalts();

const checkBalance = async () => {
    amount = await saltsToken.balanceOf(market_address);
    console.log("market sc balance in salts token: ", amount.toString());
}

checkBalance();

// const depostBusd = async() => {
//     console.log("deposting tokens in market sc..");
//     amount = "1000000000000000000000"
//     await busd.connect(wallet).transfer(market_address, amount);
//     console.log("success");
// }

// depostBusd();

const balaceCheck = async () => {
    amount = await busd.balanceOf(market_address);
    console.log("market sc balance in busd: ", amount.toString());
}

balaceCheck();

const checkBalanceinMarket = async()=> {
    const salts_balance = await saltsMarket.salts_balance();
    const busd_balance = await saltsMarket.busd_balance();
    console.log("salts balance : ", salts_balance.toString());
    console.log("busd balance : ", busd_balance.toString());
}

checkBalanceinMarket();

//CMP_Salts_to_Busd()
//CMP_Busd_to_Salts()
console.log("asdafjdfnvsk");
const CMP = async() => {
    const cmp = await saltsMarket.CMP_Salts_to_Busd();
    console.log("Current Market Price is : ", cmp.toString());
}

CMP();

