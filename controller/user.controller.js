const ReferralModel = require("../models/referralModel");
const UserModel = require("../models/userModal");

const userController = {
  SignIn: async (req, res) => {
    try {
      const genRanHex = (size) =>
        [...Array(size)]
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("");

      if (req.body != undefined) {
        const referral = await UserModel.findOne({
          referralLink: req.query.link,
        });
        if (referral) {
          const user = new UserModel({
            userAddress: req.body.userAddress,
            referralLink: genRanHex(32),
          });
          await user.save();
          const newReferral = new ReferralModel({
            userAddress: req.body.userAddress,
            parentAddress: referral.userAddress,
            // referralLink: referral.referralLink,
          });
          await newReferral.save();
          res.json({ msg: "Sign in successfully." });
        } else {
          const user = new UserModel({
            userAddress: req.body.userAddress,
            referralLink: genRanHex(32),
          });
          await user.save();
          res.json({ msg: "Sign in successfully." });
        }
        // const newReferral = new ReferralModel({
        //     userAddress: userAddress,
        //     refLink: refLink,
        // });
        // await newReferral.save();
        // res.json({ msg: "Referral Added Successfully." });
      } else {
        res.json({ msg: "Missing fields." });
      }
      res.end();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  UpdateReward: async (req, res) => {
    try {
      if (req.body != undefined) {
        const user = await UserModel.findOne({
          userAddress: req.body.userAddress,
        });
        user.totalStakedRewards =
          user.totalStakedRewards - req.body.totalStakedRewards;
        await user.save();
      } else {
        res.json({ msg: "Missing fields." });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = userController;
