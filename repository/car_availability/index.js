const { cars, car_availability } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCarAvailability = async () => {
  try {
    // Fetch cars with eager loading for car_availability and car_availability models
    const data = await car_availability.findAll({
      include: [{ model: cars }],
    });

    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

exports.getCarAvailabilitybyId = async (id) => {
  const key = `car_availability:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // if in the redis not found, we will get from database (postgres) and then save it to redis
  data = await car_availability.findAll({
    where: {
      id,
    },
    include: [{ model: cars }],
  });
  if (data.length > 0) {
    // save in the redis if in the postgres is found
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
};

exports.addCarAvailability = async (payload) => {
  const data = await car_availability.create(payload);

  // Save to redis (cache)
  const key = `car_availability:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateCarAvailability = async (id, payload) => {
  const key = `car_availability:${id}`;

  // update to postgres
  await car_availability.update(payload, {
    where: {
      id,
    },
  });

  // get from postgres
  const data = await car_availability.findAll({
    where: {
      id,
    },
    include: [{ model: cars }],
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  return data;
};

exports.deleteCarAvailability = async (id) => {
  const key = `car_availability:${id}`;

  // delete from postgres
  await car_availability.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
