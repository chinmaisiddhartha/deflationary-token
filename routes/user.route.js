const router = require("express").Router();
const userController = require("../controller/user.controller");

router.post("/user/login", userController.SignIn);
router.post("/user/reward", userController.UpdateReward);

module.exports = router;
