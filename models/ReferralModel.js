const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema(
  {
    userAddress: {
      type: String,
      required: false,
    },
    parentAddress: {
      type: String,
      required: false,
    },
    // referralLink: {
    //     type: String,
    //     required: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Referral", ReferralSchema);

//TODO:
//Sign in api: ((CurrentUserAddress, link)
//userSchema = {userAddress, creationDate,totalStaked, referralLink}

//ReferralSchema = {userAddress, parentAddress}

//TODO:
