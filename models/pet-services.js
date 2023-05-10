const petModel = require("./pet");

async function getPets(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await petModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  } else {
    result = await findUserByNameAndJob(name, job);
  }
  return result;
}

async function findUserById(id) {
  // try {
  return await petModel.findById(id);
  // } catch (error) {
  //   console.log(error);
  //   return undefined;
  // }
}

async function addUser(user) {
  // try {
  const userToAdd = new petModel(user);
  const savedUser = await userToAdd.save();
  return savedUser;
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
}

async function findUserByName(name) {
  return await petModel.find({ name: name });
}

async function findUserByJob(job) {
  return await petModel.find({ job: job });
}

async function findUserByNameAndJob(name, job) {
  return await petModel.find({ name: name, job: job });
}

async function deleteUser(id) {
  return await petModel.findByIdAndDelete(id);
}

// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }

exports.getPets = getPets;
// exports.findUserById = findUserById;
// exports.findUserByName = findUserByName;
// exports.addUser = addUser;
// exports.deleteUser = deleteUser;
// exports.disconnectDB = disconnectDB;
