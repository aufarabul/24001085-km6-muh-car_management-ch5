const crypto = require("crypto");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");
const { cars, car_detail, car_availability } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCars = async () => {
  try {
    // Fetch cars with eager loading for car_detail and car_availability models
    const data = await cars.findAll({
      include: [{ model: car_detail }, { model: car_availability }],
    });

    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

exports.getCarbyId = async (id) => {
  const key = `cars:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // if in the redis not found, we will get from database (postgres) and then save it to redis
  data = await cars.findAll({
    where: {
      id,
    },
    include: [{ model: car_detail }, { model: car_availability }],
  });
  if (data.length > 0) {
    // save in the redis if in the postgres is found
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
  // let redisClient, data;
  // const key = `cars:${id}`;

  // try {
  //   // check redis and if there are any data return data from redis
  //   redisClient = await redis();
  //   let dataString = await redisClient.get(key);
  //   if (dataString) {
  //     data = JSON.parse(dataString); // need to be parsed because data in redis is string, so we will convert from string to js object/array
  //     return data;
  //   }

  //   // if in the redis not found, we will get from database (postgres) and then save it to redis
  //   data = await cars.findAll({
  //     where: {
  //       id,
  //     },
  //     include: [{ model: car_detail }, { model: car_availability }],
  //   });
  //   if (data.length > 0) {
  //     // save in the redis if in the postgres is found
  //     dataString = JSON.stringify(data[0]); // need to be stringify because redis save the data in string, so we have convert it to string
  //     await redisClient.set(key, dataString, {
  //       EX: 300,
  //     });

  //     return data[0];
  //   }

  //   throw new Error(`car is not found!`);
  // } finally {
  //   await redisClient.disconnect(); // finally is always run after the function has been executed, so in this way we will disconnect the redis after this function executed
  // }
};

exports.addCar = async (payload) => {
  if (payload.image) {
    // upload image to cloudinary
    const { image } = payload;

    // make unique filename -> 213123128uasod9as8djas
    image.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }
  const data = await cars.create(payload);

  // Save to redis (cache)
  const key = `cars:${data.id}`;
  await setData(key, data, 300);

  return data;
  // let redisClient, data;
  // try {
  //   // Create data to postgres
  //   data = await cars.create(payload);
  //   // Save to redis (cache)
  //   const key = `cars:${data.id}`;
  //   redisClient = await redis();
  //   const dataString = JSON.stringify(data);
  //   await redisClient.set(key, dataString, {
  //     EX: 300,
  //   });
  //   return data;
  // } finally {
  //   await redisClient.disconnect();
  // }
};

exports.updateCar = async (id, payload) => {
  const key = `cars:${id}`;
  if (payload.image) {
    // upload image to cloudinary
    const { image } = payload;

    // make unique filename -> 213123128uasod9as8djas
    image.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  // update to postgres
  await cars.update(payload, {
    where: {
      id,
    },
  });

  // get from postgres
  const data = await cars.findAll({
    where: {
      id,
    },
    include: [{ model: car_detail }, { model: car_availability }],
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  return data;
  // const data = await cars.create(payload);

  // // Save to redis (cache)
  // const key = `cars:${data.id}`;
  // await setData(key, data, 300);

  // return data;
};
//   let redisClient, data;
//   const key = `cars:${id}`;
//   try {
//     // update data to postgres
//     await cars.update(payload, {
//       where: {
//         id,
//       },
//     });

//     // get data from postgres
//     data = await cars.findAll({
//       where: {
//         id,
//       },
//       include: [{ model: car_detail }, { model: car_availability }],
//     });

//     if (data.length > 0) {
//       // save to redis (cache)
//       redisClient = await redis();
//       const dataString = JSON.stringify(data[0]);
//       await redisClient.set(key, dataString, {
//         EX: 300,
//       });

//       return data[0];
//     }

//     throw new Error(`Class is not found!`);
//   } finally {
//     await redisClient.disconnect();
//   }
// };
exports.deleteCar = async (id) => {
  const key = `cars:${id}`;

  // delete from postgres
  await cars.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
  // let redisClient, data;
  // const key = `cars:${id}`;
  // try {
  //   // delete from postgres
  //   data = await cars.destroy({ where: { id } });

  //   // delete from redis
  //   redisClient = await redis();
  //   await redisClient.del(key);

  //   return null;
  // } finally {
  //   await redisClient.disconnect();
  // }
};
