const DataModel = require("../models/dataModel");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const axios = require("axios");
// const dataFns = require("date-fns");

const dataController = {
    addData: async (req, res) => {
        try {
            if (req.body != undefined) {
                const newData = new DataModel({
                    MSP: req.body.MSP,
                    SSP: req.body.SSP,
                    CMP: req.body.CMP,
                    createdAtInInteger: new Date(),
                });
                await newData.save();
                res.json({ msg: "Data Added Successfully." });
            } else {
                res.json({ msg: "Missing fields." });
            }
            res.end();
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getData: async (req, res) => {
        try {
            const data = await DataModel.find();
            console.log(data);
            res.json({ data: data, msg: "Data get Successfully." });
            res.end();
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getTimeData: async (req, res) => {
        try {
            let data = [];
            const today = new Date();
            switch (req.body.time) {
                case 1:
                    //get data of last 24 hours
                    const dataDay = await DataModel.find({
                        createdAt: {
                            $gte: startOfDay(new Date()),
                            $lte: endOfDay(new Date()),
                        },
                    })
                        .sort({ createdAt: -1 })
                        .limit(1);
                    console.log('datatday', dataDay)
                    if (dataDay.length > 0) {
                        var calc = 86400000 / 24;
                        var value = dataDay[0].createdAtInInteger;
                        for (let i = 1; i <= 12; i++) {
                            let element = value - calc * i;
                            console.log("ELEMENT", element);
                            const onData = await DataModel.find({
                                // $or: [{ createdAtInInteger: element }],
                                createdAtInInteger: element,
                            });
                            data.push(onData);
                        }
                        res.json({
                            data,
                            msg: "Data get Successfully.",
                        });
                        res.end();
                    } else {
                        res.json({
                            msg: "No Data Found",
                        });
                        res.end();

                    }
                    break;
                case 7:
                    console.log("In 7");
                    //get data of last week from today
                    // const today = new Date();
                    const lastWeek = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - 7
                    );

                    const dataWeek = await DataModel.find({
                        createdAt: {
                            $gte: startOfDay(lastWeek),
                            $lte: endOfDay(today),
                        },
                    })
                        .sort({ createdAt: -1 })
                        .limit(1);

                    if (dataWeek.length > 0) {
                        var calc = 604800000 / (7 * 24);
                        var value = dataWeek[0].createdAtInInteger;
                        for (let i = 1; i <= 12; i++) {
                            let element = value - calc * i;
                            const onData = await DataModel.find({
                                createdAtInInteger: element,
                            });
                            data.push(onData);
                        }
                        res.json({
                            data,
                            msg: "Data get Successfully.",
                        });
                        res.end();
                    } else {
                        res.json({
                            msg: "No Data Found",
                        });
                        res.end();

                    }
                    break;
                case 30:
                    console.log("In 30");
                    //get data of last month from today
                    const lastMonth = new Date(
                        today.getFullYear(),
                        today.getMonth() - 1,
                        today.getDate()
                    );
                    const dataMonthly = await DataModel.find({
                        createdAt: {
                            $gte: startOfDay(lastMonth),
                            $lte: endOfDay(today),
                        },
                    })
                        .sort({ createdAt: -1 })
                        .limit(1);
                    var calc = 2592000000 / (30 * 24);
                    var value = dataMonthly[0].createdAtInInteger;
                    for (let i = 1; i <= 12; i++) {
                        let element = value - calc * i;
                        const onData = await DataModel.find({
                            // $or: [{ createdAtInInteger: element }]
                            createdAtInInteger: element,
                        });
                        data.push(onData);
                    }
                    res.json({
                        data,
                        msg: "Data get Successfully.",
                    });
                    res.end();

                    break;
                case 183:
                    console.log("In 183");
                    //get data of last 6 month from today
                    const last6Month = new Date(
                        today.getFullYear(),
                        today.getMonth() - 6,
                        today.getDate()
                    );
                    const dataSixMonths = await DataModel.find({
                        createdAt: {
                            $gte: startOfDay(last6Month),
                            $lte: endOfDay(today),
                        },
                    })
                        .sort({ createdAt: -1 })
                        .limit(1);
                    var calc = 15552000000 / (183 * 24);
                    var value = dataSixMonths[0].createdAtInInteger;
                    for (let i = 1; i <= 12; i++) {
                        let element = value - calc * i;
                        const onData = await DataModel.find({
                            // $or: [{ createdAtInInteger: element }],
                            createdAtInInteger: element,
                        });
                        data.push(onData);
                    }
                    res.json({
                        data,
                        msg: "Data get Successfully.",
                    });
                    res.end();
                    break;
                case 365:
                    console.log("In 365");
                    //get data of last year from today
                    const lastYear = new Date(
                        today.getFullYear() - 1,
                        today.getMonth(),
                        today.getDate()
                    );
                    const dataOneYear = await DataModel.find({
                        createdAt: {
                            $gte: startOfDay(lastYear),
                            $lte: endOfDay(today),
                        },
                    })
                        .sort({ createdAt: -1 })
                        .limit(1);
                    var calc = 31536000000 / (365 * 24);
                    var value = dataOneYear[0].createdAtInInteger;
                    for (let i = 1; i <= 12; i++) {
                        let element = value - calc * i;
                        const onData = await DataModel.find({
                            // $or: [{ createdAtInInteger: element }]
                            createdAtInInteger: element,
                        });
                        data.push(onData);
                    }
                    res.json({
                        data,
                        msg: "Data get Successfully.",
                    });
                    res.end();
                    break;
                default:
                    res.json({ data, msg: "Data not found." });
                    res.end();
                    break;
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getCryptocurrencyData: async (req, res) => {
        try {
            const response = []
            const data = await axios.get(
                "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
                {
                    headers: {
                        "X-CMC_PRO_API_KEY": process.env.API_KEY,
                    },
                }
            );
            console.log(data);
            res.json({ data: data.data.data[0].quote.USD, msg: "Data get Successfully." });
            // res.json({ data: data.data, msg: "Data get Successfully." });
            res.end();
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};
module.exports = dataController;
