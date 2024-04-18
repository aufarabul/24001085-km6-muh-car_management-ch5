const express = require("express");
const router = express.Router();

const carsDetailController = require("../controller/car_detail");

router
  .route("/")
  .get(carsDetailController.getCarDetail)
  .post(carsDetailController.addCarDetail);
router
  .route("/:id")
  .get(carsDetailController.getCarDetailbyId)
  .put(carsDetailController.updateCarDetail)
  .delete(carsDetailController.deleteCarDetail);

module.exports = router;
