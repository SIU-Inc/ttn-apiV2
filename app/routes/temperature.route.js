const express = require("express");
const router = express.Router();

const temperature = require("../controller/temperature.controller");

router.post("/", temperature.addToDataBase);
router.get("/", temperature.findAll);

module.exports = router;