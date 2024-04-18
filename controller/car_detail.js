const carDetailUsecase = require("../usecase/car_detail");

exports.getCarDetail = async (req, res, next) => {
  try {
    const data = await carDetailUsecase.getCarDetail();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarDetailbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carDetailUsecase.getCarDetailbyId(id);
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

exports.addCarDetail = async (req, res, next) => {
  try {
    const { car_id, description, transmission, type, capacity } = req.body;
    if (!car_id || car_id == "") {
      return next({
        message: "car_id must be provided!",
        statusCode: 400,
      });
    }
    if (!description || description == "") {
      return next({
        message: "description must be provided!",
        statusCode: 400,
      });
    }
    if (!transmission || transmission == "") {
      return next({
        message: "transmission must be provided!",
        statusCode: 400,
      });
    }
    if (!type || type == "") {
      return next({
        message: "type must be provided!",
        statusCode: 400,
      });
    }
    if (!capacity || capacity == "") {
      return next({
        message: "capacity must be provided!",
        statusCode: 400,
      });
    }

    const data = await carDetailUsecase.addCarDetail({
      car_id,
      description,
      transmission,
      type,
      capacity,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCarDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { car_id, description, transmission, type, capacity } = req.body;
    if (!car_id || car_id == "") {
      return next({
        message: "car_id must be provided!",
        statusCode: 400,
      });
    }
    if (!description || description == "") {
      return next({
        message: "description must be provided!",
        statusCode: 400,
      });
    }
    if (!transmission || transmission == "") {
      return next({
        message: "transmission must be provided!",
        statusCode: 400,
      });
    }
    if (!type || type == "") {
      return next({
        message: "type must be provided!",
        statusCode: 400,
      });
    }
    if (!capacity || capacity == "") {
      return next({
        message: "capacity must be provided!",
        statusCode: 400,
      });
    }

    const data = await carDetailUsecase.updateCarDetail(id, {
      car_id,
      description,
      transmission,
      type,
      capacity,
    });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCarDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carDetailUsecase.deleteCarDetail(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
