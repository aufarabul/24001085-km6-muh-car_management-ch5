const express = require("express");
const router = express.Router();
const cars = require("./cars");
const carDetail = require("./car_detail");
const carAvailability = require("./car_availability");

router.use("/cars", cars);
router.use("/car_detail", carDetail);
router.use("/car_availability", carAvailability);

module.exports = router;
