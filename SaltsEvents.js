const { ethers } = require("ethers");
const salts_json = require('./build/SaltsToken.json'); 
const config = require('./config.json');
const salts_address = config["SaltsToken"];
const salts_abi = salts_json.abi;



const provider = new ethers.providers.JsonRpcProvider("https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259");


const ListenToEvenets = async () => {
    const saltsToken = new ethers.Contract(salts_address, salts_abi, provider);
    console.log("salts token loaded..");

    saltsToken.on("Transfer", (from, to, value, event)=> {
        let info = {
            from: from,
            to: to,
            value: ethers.utils.formatUnits(value, 6),
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });

    saltsToken.on("Approval", (owner, spender, value, event)=> {
        let info = {
            owner: owner,
            spender: spender,
            value: ethers.utils.formatUnits(value, 6),
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });

    saltsToken.on("RewardsUpdated", (amount, timestamp, event)=> {
        let info = {
            amount: ethers.utils.formatUnits(amount, 6),
            timestamp: timestamp,
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });

}

ListenToEvenets();
