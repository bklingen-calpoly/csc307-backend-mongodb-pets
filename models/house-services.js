// const mongoose = require("mongoose");
const houseModel = require("./house");
const petModel = require("./pet");

async function getHouses(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await houseModel.find();
  } else if (name && !job) {
    result = await findhouseByName(name);
  } else if (job && !name) {
    result = await findhouseByJob(job);
  } else {
    result = await findhouseByNameAndJob(name, job);
  }
  return result;
}

async function getHousesAndPets(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await houseModel.find().populate("pets");
    // .then((res) => console.log("The pets are:" + res));
    console.log("The house with pets: " + result);
  } else if (name && !job) {
    result = await findhouseByName(name);
  } else if (job && !name) {
    result = await findhouseByJob(job);
  } else {
    result = await findhouseByNameAndJob(name, job);
  }
  return result;
}

async function findhouseById(id) {
  // try {
  return await houseModel.findById(id);
  // } catch (error) {
  //   console.log(error);
  //   return undefined;
  // }
}

async function addhouse(house) {
  // try {
  const houseToAdd = new houseModel(house);
  const savedhouse = await houseToAdd.save();
  return savedhouse;
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
}

async function findhouseByName(name) {
  return await houseModel.find({ name: name });
}

async function findhouseByJob(job) {
  return await houseModel.find({ job: job });
}

async function findhouseByNameAndJob(name, job) {
  return await houseModel.find({ name: name, job: job });
}

async function deletehouse(id) {
  return await houseModel.findByIdAndDelete(id);
}

// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }

exports.getHouses = getHouses;
exports.getHousesAndPets = getHousesAndPets;

exports.findhouseById = findhouseById;
exports.findhouseByName = findhouseByName;
exports.addhouse = addhouse;
exports.deletehouse = deletehouse;
// exports.disconnectDB = disconnectDB;
