const { ethers } = require("ethers");


const busd_json = require('./build/StableCoin.json');
const config = require('./config.json');

const busd_address = config["StableCoin"];
const busd_abi = busd_json.abi;


async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://nd-927-536-000.p2pify.com/ed0281ced9ad311a9dee4f7188c7a259");
    const busd = new ethers.Contract(busd_address,busd_abi, provider);
    console.log("busd loaded..");

    busd.on("Transfer", (from, to, value, event)=> {
        let info = {
            from: from,
            to: to,
            value: ethers.utils.formatUnits(value, 6),
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    });


    };

main();