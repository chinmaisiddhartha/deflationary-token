const router = require("express").Router();
const dataController = require("../controller/data.controller");
// const auth = require('../middleware/auth');

router.post("/data", dataController.addData);
router.get("/data", dataController.getData);
router.get("/time-data", dataController.getTimeData);
router.get("/cryptocurrency", dataController.getCryptocurrencyData);

module.exports = router;
