const carsAvailRepo = require("../../repository/car_availability");

exports.getCarAvailability = async () => {
  const data = await carsAvailRepo.getCarAvailability();
  return data;
};

exports.getCarAvailabilitybyId = async (id) => {
  const data = await carsAvailRepo.getCarAvailabilitybyId(id);
  return data;
};

exports.addCarAvailability = async (payload) => {
  const data = await carsAvailRepo.addCarAvailability(payload);
  return data;
};

exports.updateCarAvailability = async (id, payload) => {
  // update old data
  await carsAvailRepo.updateCarAvailability(id, payload);

  // find the new data
  const data = await carsAvailRepo.getCarAvailabilitybyId(id);

  return data;
};

exports.deleteCarAvailability = async (id) => {
  const data = await carsAvailRepo.deleteCarAvailability(id);
  return data;
};
