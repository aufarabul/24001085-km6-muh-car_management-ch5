const express = require("express");
const router = express.Router();
const carsController = require("../controller/cars");
const cars = require("../models/cars");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(
    authMiddleware(["member", "admin", "superadmin"]),
    carsController.getCars
  )
  .post(authMiddleware(["admin", "superadmin"]), carsController.addCar);
router
  .route("/:id")
  .get(
    authMiddleware(["member", "admin", "superadmin"]),
    carsController.getCarbyId
  )
  .put(authMiddleware(["admin", "superadmin"]), carsController.updateCar)
  .delete(authMiddleware(["admin", "superadmin"]), carsController.deleteCar);

module.exports = router;
