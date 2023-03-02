const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    MSP: {
      type: Number,
      required: false,
      default: 0,
    },
    SSP: {
      type: Number,
      required: false,
      default: 0,
    },
    CMP: {
      type: Number,
      required: false,
      default: 0,
    },
    burned_token: {
      type: Number,
      required: false,
      default: 0,
    },
    burned_token_in_Busd: {
      type: Number,
      required: false,
      default: 0,
    },
    currentSupply: {
      type: Number,
      required: false,
      default: 0,
    },
    totalStaked: {
      type: Number,
      required: false,
      default: 0,
    },
    TVL: {
      type: Number,
      required: false,
      default: 0,
    },
    createdAtInInteger: {
      type: Number,
      required: false,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
