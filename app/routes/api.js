const express = require("express");
const router = express.Router();

const TemperatureRouter = require("../routes/temperature.route");

router.use("/temperature", TemperatureRouter);

module.exports = router;