const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userAddress: {
      type: String,
      required: false,
    },
    referralLink: {
      type: String,
      required: false,
    },
    totalStaked: {
      type: Number,
      required: false,
      default: 0,
    },
    totalStakedRewards: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

//TODO:
//Sign in api: ((CurrentUserAddress, link)
//userSchema = {userAddress, creationDate,totalStaked, referralLink}

//ReferralSchema = {userAddress, parentAddress}

//TODO:
