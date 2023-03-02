const { ethers } = require("ethers");
const saltyard_json = require('./build/SaltYard.json'); 

const provider = new ethers.providers.JsonRpcProvider("https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259");

const yard_address = config["SaltYard"];
const yard_abi = saltyard_json.abi;

const ListenToEvenets = async () => {
    
    const saltYard = new ethers.Contract(yard_address, yard_abi, provider);
    console.log("yard loaded");

    saltYard.on("Staked", (user, thisStake, totalStaked, timestamp, event)=> {
        let info = {
            user: user, 
            thisStake : ethers.utils.formatUnits(thisStake, 6),
            totalStaked: ethers.utils.formatUnits(totalStaked, 6),
            timestamp: timestamp,
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });

    saltYard.on("UnStaked", (user, unstakedAmount, remainingStake, timestamp, event)=> {
        let info = {
            user: user,
            unstakedAmount: ethers.utils.formatUnits(unstakedAmount, 6),
            remainingStake: ethers.utils.formatUnits(remainingStake, 6),
            timestamp: timestamp,
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });
}

ListenToEvenets();