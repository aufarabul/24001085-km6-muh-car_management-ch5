const express = require("express");
const router = express.Router();

const carsController = require("../controller/cars");
const cars = require("../models/cars");

router.route("/").get(carsController.getCars).post(carsController.addCar);
router
  .route("/:id")
  .get(carsController.getCarbyId)
  .put(carsController.updateCar)
  .delete(carsController.deleteCar);

module.exports = router;
