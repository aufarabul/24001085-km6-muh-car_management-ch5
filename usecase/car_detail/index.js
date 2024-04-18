const carsDetailRepo = require("../../repository/car_detail");

exports.getCarDetail = async () => {
  const data = await carsDetailRepo.getCarDetail();
  return data;
};

exports.getCarDetailbyId = async (id) => {
  const data = await carsDetailRepo.getCarDetailbyId(id);
  return data;
};

exports.addCarDetail = async (payload) => {
  const data = await carsDetailRepo.addCarDetail(payload);
  return data;
};

exports.updateCarDetail = async (id, payload) => {
  // update old data
  await carsDetailRepo.updateCarDetail(id, payload);

  // find the new data
  const data = await carsDetailRepo.getCarDetailbyId(id);

  return data;
};

exports.deleteCarDetail = async (id) => {
  const data = await carsDetailRepo.deleteCarDetail(id);
  return data;
};
