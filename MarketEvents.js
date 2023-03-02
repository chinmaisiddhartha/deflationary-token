const { ethers } = require("ethers");
const market_json = require('./build/SaltsMarketPlace.json')
const config = require('./config.json');
const market_address = config["SaltsMarket"];
const market_abi = market_json.abi;



const provider = new ethers.providers.JsonRpcProvider("https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259");



const ListenToEvenets = async () => {
    console.log("loading market");
    const saltsMarket = new ethers.Contract(market_address, market_abi, provider);

    saltsMarket.on("UserRegistered", (user, referer, timestamp, event)=> {
        let info = {
            user: user, 
            referer: referer,
            timestamp: timestamp,
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });

    saltsMarket.on("TokensBought", (user, busdAmount, tax, saltsRecieved, timestamp, event)=> {
        let info = {
            user: user,
            busdAmount:ethers.utils.formatUnits(busdAmount, 6),
            tax: ethers.utils.formatUnits(tax, 6),
            saltsRecieved: ethers.utils.formatUnits(saltsRecieved, 6),
            timestamp: timestamp,
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });

    saltsMarket.on("TokensSold", (user, saltsAmount, taxAmount, busdGot, timestamp, event)=> {
        let info = {
            user: user,
            saltsAmount: ethers.utils.formatUnits(saltsAmount, 6),
            taxAmount: ethers.utils.formatUnits(taxAmount, 6),
            busdGot: ethers.utils.formatUnits(busdGot, 6),
            timestamp: timestamp,
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });

    saltsMarket.on("RefTx", (refIndex, user, amount, timestamp, event)=> {
        let info = {
            refIndex: refIndex,
            user: user,
            amount: ethers.utils.formatUnits(amount, 6),
            timestamp: timestamp,
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });
}

ListenToEvenets();
