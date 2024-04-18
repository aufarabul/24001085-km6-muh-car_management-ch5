const carsRepo = require("../../repository/cars");

exports.getCars = async () => {
  const data = await carsRepo.getCars();
  return data;
};

exports.getCarbyId = async (id) => {
  const data = await carsRepo.getCarbyId(id);
  return data;
};

exports.addCar = async (payload) => {
  const data = await carsRepo.addCar(payload);
  return data;
};

exports.updateCar = async (id, payload) => {
  // update old data
  await carsRepo.updateCar(id, payload);

  // find the new data
  const data = await carsRepo.getCarbyId(id);

  return data;
};

exports.deleteCar = async (id) => {
  const data = await carsRepo.deleteCar(id);
  return data;
};
