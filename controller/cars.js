const carsUsecase = require("../usecase/cars");

exports.getCars = async (req, res, next) => {
  try {
    const data = await carsUsecase.getCars();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carsUsecase.getCarbyId(id);
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

exports.addCar = async (req, res, next) => {
  try {
    const { plate, manufacture, model, year } = req.body;
    const { image } = req?.files;
    if (!plate || plate == "") {
      return next({
        message: "plate must be provided!",
        statusCode: 400,
      });
    }
    if (!manufacture || manufacture == "") {
      return next({
        message: "manufacture must be provided!",
        statusCode: 400,
      });
    }
    if (!model || model == "") {
      return next({
        message: "model must be provided!",
        statusCode: 400,
      });
    }
    if (!year || year == "") {
      return next({
        message: "year must be provided!",
        statusCode: 400,
      });
    }

    const data = await carsUsecase.addCar({
      plate,
      manufacture,
      model,
      year,
      image,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { plate, manufacture, model, year } = req.body;
    const { image } = req.files;
    if (!plate || plate == "") {
      return next({
        message: "plate must be provided!",
        statusCode: 400,
      });
    }
    if (!manufacture || manufacture == "") {
      return next({
        message: "manufacture must be provided!",
        statusCode: 400,
      });
    }
    if (!model || model == "") {
      return next({
        message: "model must be provided!",
        statusCode: 400,
      });
    }
    if (!year || year == "") {
      return next({
        message: "year must be provided!",
        statusCode: 400,
      });
    }

    const data = await carsUsecase.updateCar(id, {
      plate,
      manufacture,
      model,
      year,
      image,
    });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carsUsecase.deleteCar(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
