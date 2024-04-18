const carAvailabilityUsecase = require("../usecase/car_availability");

exports.getCarAvailability = async (req, res, next) => {
  try {
    const data = await carAvailabilityUsecase.getCarAvailability();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarAvailabilitybyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carAvailabilityUsecase.getCarAvailabilitybyId(id);
    if (!data) {
      return next({
        message: `Car with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.addCarAvailability = async (req, res, next) => {
  try {
    const { car_id, available, availableAt, rentPerDay } = req.body;
    if (!car_id || car_id == "") {
      return next({
        message: "car_id must be provided!",
        statusCode: 400,
      });
    }
    if (!available || available == "") {
      return next({
        message: "available must be provided!",
        statusCode: 400,
      });
    }
    if (!availableAt || availableAt == "") {
      return next({
        message: "availableAt must be provided!",
        statusCode: 400,
      });
    }
    if (!rentPerDay || rentPerDay == "") {
      return next({
        message: "rentPerDay must be provided!",
        statusCode: 400,
      });
    }

    const data = await carAvailabilityUsecase.addCarAvailability({
      car_id,
      available,
      availableAt,
      rentPerDay,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCarAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { car_id, available, availableAt, rentPerDay } = req.body;
    if (!car_id || car_id == "") {
      return next({
        message: "car_id must be provided!",
        statusCode: 400,
      });
    }
    if (!available || available == "") {
      return next({
        message: "available must be provided!",
        statusCode: 400,
      });
    }
    if (!availableAt || availableAt == "") {
      return next({
        message: "availableAt must be provided!",
        statusCode: 400,
      });
    }
    if (!rentPerDay || rentPerDay == "") {
      return next({
        message: "rentPerDay must be provided!",
        statusCode: 400,
      });
    }

    const data = await carAvailabilityUsecase.updateCarAvailability(id, {
      car_id,
      available,
      availableAt,
      rentPerDay,
    });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCarAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carAvailabilityUsecase.deleteCarAvailability(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
