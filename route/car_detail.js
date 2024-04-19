const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");

const carsDetailController = require("../controller/car_detail");

router
  .route("/")
  .get(
    authMiddleware(["member", "admin", "superadmin"]),
    carsDetailController.getCarDetail
  )
  .post(
    authMiddleware(["admin", "superadmin"]),
    carsDetailController.addCarDetail
  );
router
  .route("/:id")
  .get(
    authMiddleware(["member", "admin", "superadmin"]),
    carsDetailController.getCarDetailbyId
  )
  .put(
    authMiddleware(["admin", "superadmin"]),
    carsDetailController.updateCarDetail
  )
  .delete(
    authMiddleware(["admin", "superadmin"]),
    carsDetailController.deleteCarDetail
  );

module.exports = router;
