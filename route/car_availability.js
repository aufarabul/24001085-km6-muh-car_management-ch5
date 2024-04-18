const express = require("express");
const router = express.Router();

const carsAvailabilityController = require("../controller/car_availability");

router
  .route("/")
  .get(carsAvailabilityController.getCarAvailability)
  .post(carsAvailabilityController.addCarAvailability);
router
  .route("/:id")
  .get(carsAvailabilityController.getCarAvailabilitybyId)
  .put(carsAvailabilityController.updateCarAvailability)
  .delete(carsAvailabilityController.deleteCarAvailability);

module.exports = router;
