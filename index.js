/* import moralis */
const Moralis = require("moralis-v1/node");
// Import exppress deps
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const dataRouter = require("./routes/data.route");

/* Moralis init code */
const serverUrl = "https://rijq3idfgr2e.usemoralis.com:2053/server";
const appId = "lFycc0g9ooBhUP0y4uv2ZWQlqXgwmFvl91xuUTVt";
const masterKey = "4YqojvwvsZLT2vdewQOzrkjDsvbuVfIsHgkreqbb";

async function getData() {

    await Moralis.start({ serverUrl, appId, masterKey });
}

// const stop = fsevents.watch(__dirname, (path, flags, id) => {
//   const info = fsevents.getInfo(path, flags, id);
// }); // To start observation
// stop(); // To end observation

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", [userRouter, dataRouter]);

//Connection to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(
    URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Connection successful with mongoDB.");
    }
);

//Listen Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is runnig on ${port}`);
});
