const petModel = require("./pet");

async function getPets(name, type) {
  let result;
  if (name === undefined && type === undefined) {
    result = await petModel.find();
  } else if (name && !type) {
    result = await findPetByName(name);
  } else if (type && !name) {
    result = await findPetByType(type);
  } else {
    result = await findPetByNameAndType(name, type);
  }
  return result;
}

async function findPetById(id) {
  // try {
  return await petModel.findById(id);
  // } catch (error) {
  //   console.log(error);
  //   return undefined;
  // }
}

async function addPet(pet) {
  // try {
  const petToAdd = new petModel(pet);
  const savedPet = await petToAdd.save();
  return savedPet;
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
}

async function findPetByName(name) {
  return await petModel.find({ name: name });
}

async function findPetByType(type) {
  return await petModel.find({ type: type });
}

async function findPetByNameAndType(name, type) {
  return await petModel.find({ name: name, type: type });
}

async function deletePet(id) {
  return await petModel.findByIdAndDelete(id);
}

// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }

exports.getPets = getPets;
exports.findPetById = findPetById;
exports.findPetByName = findPetByName;
exports.findPetByType = findPetByType;
exports.findPetByNameAndType = findPetByNameAndType;
exports.addPet = addPet;
exports.deletePet = deletePet;
// exports.disconnectDB = disconnectDB;
