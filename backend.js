const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Add mongdb house services
const houseServices = require("./models/house-services");
const petServices = require("./models/pet-services");

const app = express();
const port = 8000;
const APP_VERSION = "1.0.0";

dotenv.config();

// Uncomment the following to debug mongoose queries, etc.
mongoose.set("debug", true);

mongoose.connect(
  //   "mongodb+srv://" +
  //     process.env.MONGO_house +
  //     ":" +
  //     process.env.MONGO_PWD +
  //     "@" +
  //     process.env.MONGO_CLUSTER +
  //     "/" +
  //     process.env.MONGO_DB +
  //     "?retryWrites=true&w=majority",
  "mongodb://127.0.0.1:27017/pet_demo",
  {
    useNewUrlParser: true, //useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
// .catch((error) => console.log(error));
// console.log("process.env:" + process.env);
// console.log(
//   "mongodb+srv://" +
//     process.env.MONGO_house +
//     ":" +
//     process.env.MONGO_PWD +
//     "@" +
//     process.env.MONGO_CLUSTER +
//     "/" +
//     process.env.MONGO_DB
// );

app.use(cors({ origin: "http://localhost" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello World! - pets node backend app version ${APP_VERSION}`);
});

app.get("/houses", async (req, res) => {
  // res.send(houses); this is a very very very very very very very very very long line
  //HTTP code 200 is set by default. See an alternative below
  // res.status(200).send(houses);
  const name = req.query["name"];
  const job = req.query["job"];
  if (name === undefined && job === undefined) {
    try {
      const houses_from_db = await houseServices.getHouses();
      res.send({ houses_list: houses_from_db });
    } catch (error) {
      console.log("Mongoose error: " + error);
      res.status(500).send("An error ocurred in the server.");
    }
  } else if (name && job === undefined) {
    let result = await houseServices.findhouseByName(name);
    result = { houses_list: result };
    res.send(result);
  } else if (job && name === undefined) {
    let result = await houseServices.findhouseByJob(job);
    result = { houses_list: result };
    res.send(result);
  } else {
    let result = await houseServices.findhouseByNameAndJob(name, job);
    result = { houses_list: result };
    res.send(result);
  }
});

app.get("/housesAndPets", async (req, res) => {
  // res.send(houses); this is a very very very very very very very very very long line
  //HTTP code 200 is set by default. See an alternative below
  // res.status(200).send(houses);
  const name = req.query["name"];
  const job = req.query["job"];
  if (name === undefined && job === undefined) {
    try {
      const houses_from_db = await houseServices.getHousesAndPets();
      res.send({ houses_list: houses_from_db });
    } catch (error) {
      console.log("Mongoose error: " + error);
      res.status(500).send("An error ocurred in the server.");
    }
  } else if (name && job === undefined) {
    let result = await houseServices.findhouseByName(name);
    result = { houses_list: result };
    res.send(result);
  } else if (job && name === undefined) {
    let result = await houseServices.findhouseByJob(job);
    result = { houses_list: result };
    res.send(result);
  } else {
    let result = await houseServices.findhouseByNameAndJob(name, job);
    result = { houses_list: result };
    res.send(result);
  }
});
app.get("/pets", async (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  if (name === undefined && job === undefined) {
    try {
      const pets_from_db = await petServices.getPets();
      res.send({ pets_list: pets_from_db });
    } catch (error) {
      console.log("Mongoose error: " + error);
      res.status(500).send("An error ocurred in the server.");
    }
  } else if (name && job === undefined) {
    let result = await petservices.findhouseByName(name);
    result = { pets_list: result };
    res.send(result);
  } else if (job && name === undefined) {
    let result = await petServices.findhouseByJob(job);
    result = { pets_list: result };
    res.send(result);
  } else {
    let result = await PetServices.findhouseByNameAndJob(name, job);
    result = { pets_list: result };
    res.send(result);
  }
});

app.get("/pets/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await houseServices.findPetById(id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { houses_list: result };
    res.send(result);
  }
});

async function findhouseById(id) {
  try {
    return await houseModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

app.delete("/petss/:id", async (req, res) => {
  const id = req.params["id"];
  if (deletehouseById(id)) res.status(204).end();
  else res.status(404).send("Resource not found.");
});

async function deletehouseById(id) {
  try {
    if (await houseServices.deletehouse(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
app.post("/houses", async (req, res) => {
  const house = req.body;
  if (await houseServices.addhouse(house)) res.status(201).end();
  else res.status(500).end();
});

app.post("/pets", async (req, res) => {
  const house = req.body;
  if (await houseServices.addhouse(house)) res.status(201).end();
  else res.status(500).end();
});

app.patch("/pets/:id", async (req, res) => {
  const id = req.params["id"];
  const updatedhouse = req.body;
  const result = await updatehouse(id, updatedhouse);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send("Resource not found.");
  else if (result === 500) {
    res.status(500).send("An error ocurred in the server.");
  }
});

async function updatehouse(id, updatedhouse) {
  try {
    const result = await houseModel.findByIdAndUpdate(id, updatedhouse);
    if (result) return 204;
    else return 404;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(
      `REST API Version ${APP_VERSION} is listening on port: ${process.env.PORT}.`
    );
  } else
    console.log(
      `REST API Version ${APP_VERSION} is listening on port: ${port}.`
    );
});
