const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");

const carsAvailabilityController = require("../controller/car_availability");

router
  .route("/")
  .get(
    authMiddleware(["member", "admin", "superadmin"]),
    carsAvailabilityController.getCarAvailability
  )
  .post(carsAvailabilityController.addCarAvailability);
router
  .route("/:id")
  .get(
    authMiddleware(["member", "admin", "superadmin"]),
    carsAvailabilityController.getCarAvailabilitybyId
  )
  .put(
    authMiddleware(["admin", "superadmin"]),
    carsAvailabilityController.updateCarAvailability
  )
  .delete(
    authMiddleware(["admin", "superadmin"]),
    carsAvailabilityController.deleteCarAvailability
  );

module.exports = router;
