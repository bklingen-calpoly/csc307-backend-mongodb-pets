const mongoose = require("mongoose");
const houseModel = require("./house");
const dotenv = require("dotenv");

dotenv.config();

// Uncomment the following to debug mongoose queries, etc.
mongoose.set("debug", true);

mongoose.connect(
//   "mongodb+srv://" +
//     process.env.MONGO_USER +
//     ":" +
//     process.env.MONGO_PWD +
//     "@" +
//     process.env.MONGO_CLUSTER +
//     "/" +
//     process.env.MONGO_DB +
//     "?retryWrites=true&w=majority",
  "mongodb://localhost:27017/houses",
  {
    useNewUrlParser: true, //useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
// .catch((error) => console.log(error));
// console.log("process.env:" + process.env);
// console.log(
//   "mongodb+srv://" +
//     process.env.MONGO_USER +
//     ":" +
//     process.env.MONGO_PWD +
//     "@" +
//     process.env.MONGO_CLUSTER +
//     "/" +
//     process.env.MONGO_DB
// );

async function getHouses(name, job) {
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

exports.getUsgetPets = getPets;
exports.findUserById = findUserById;
exports.findUserByName = findUserByName;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
// exports.disconnectDB = disconnectDB;