const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
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
                    type: Integer,
                    required: true,
                    trim: true,
                    },
                    zip: {
                        type: Integer,
                        required: true,
                        trim: true,
                        },
                        pets:
                        {
                            type: Schema.Types.ObjectId, ref:'Pet',
                            required: false,
                            trim: true,
                            },
  },
}, {collection : 'houset'});

const House = mongoose.model("House", HouseSchema);

module.exports = House;