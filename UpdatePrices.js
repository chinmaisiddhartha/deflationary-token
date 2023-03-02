/*
MSP(Minimum selling price) = (Initial locked BUSD + Burned Token in BUSD)/(Initial token- token burned)
SSP(Staked selling price) = (Initial locked BUSD + Burn BUSD)/(Initial token - Token burned - token staked)
CMP(Current market price) = (Total BUSD in pair)/(Total token in pair)
*/

const cron = require("node-cron");
const { ethers } = require("ethers");
const DataModel = require("./models/dataModel");

const provider = new ethers.providers.JsonRpcProvider(
    "https://yypyuibcfn6w.usemoralis.com:2053/server/EQwBceig8F5q8PX4m0zJEYEHN0Opv2bOo8UjCqug"
);

const saltyard_json = require("./build/SaltYard.json");
const salts_json = require("./build/SaltsToken.json");
const market_json = require("./build/SaltsMarketPlace.json");
const config = require("./config.json");
const yard_address = config["SaltYard"];
const market_address = config["SaltsMarketPlace"];
const salts_address = config["SALTS"];

const yard_abi = saltyard_json.abi;
const market_abi = market_json.abi;
const salts_abi = salts_json.abi;

const wallet = new ethers.Wallet(config["private_key"], provider);

saltYard = new ethers.Contract(yard_address, yard_abi, wallet);

saltsMarket = new ethers.Contract(market_address, market_abi, wallet);

saltsToken = new ethers.Contract(salts_address, salts_abi, wallet);

cron.schedule("*/2 * * * *", async () => {
    console.log("updating prices for every two minuites");
    // Current market price
    const CMP = await saltsMarket.CMP_Salts_to_Busd();
    const data = Promise.resolve(CMP);
    data.then((value) => {
        const result = ethers.utils.formatUnits(value, 18);
        console.log("Current Market Price is :", result);
    });

    //MSP(Minimum selling price) = (Initial locked BUSD + Burned Token in BUSD)/(Initial token- token burned)
    //SSP(Staked selling price) = (Initial locked BUSD + Burn BUSD)/(Initial token - Token burned - token staked)
    let initial_locked_busd = 1000;
    const burned_token = await saltsToken.BurnedTokens();
    const burned_token_in_Busd = burned_token * CMP;
    const currentSupply = await saltsToken.currentSupply();
    const totalStaked = await saltYard.stakedSalts(); 
    const MSP = (initial_locked_busd + burned_token_in_Busd) / currentSupply;
    const SSP =
        (initial_locked_busd + burned_token_in_Busd) /
        (currentSupply - totalStaked);

    //TODO: @SID Store TVL.(Total value locked)     
    //TODO: @SID Store the trading volume data (Total sell/buy in last 5 mins.) (Data is visible on bscscan)
    //TODO: @SID fetch total volume.
    //TODO: @SID store all time low and all time high. 
    //TODO: @SID estimate the APY. 
    //TODO: @SID SALTZ ROI. 

    try {
        const newRecord = new DataModel({
            MSP: MSP,
            SSP: SSP,
            CMP: CMP,
            createdAtInInteger: new Date(),
        });
        await newRecord.save();
        // res.json({ msg: "Note Created" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
    console.log("Minimum Selling Price is :", MSP);
    console.log("Staked Selling Price is: ", SSP);
    console.log("prices updated");
});

// TODO: Keep the currentValue of MSP,SSP,CMP,TVL,CS... 

//TODO: Expose an api to provide the latest entry. 
//TODO: Expose an api to provide the chart data points. (Give 12 points depending on the timeframe ) for eg: 6M = 6*30*24 = 4320.. 4320/12 = every 360 hours. 


