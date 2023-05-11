const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Pet = require("./pet");

const HouseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: Number,
      required: true,
      trim: true,
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
        required: false,
        trim: true,
      },
    ],
  },
  { collection: "houses" }
);

const House = mongoose.model("House", HouseSchema);

module.exports = House;
