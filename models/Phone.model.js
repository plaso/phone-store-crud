const mongoose = require('mongoose');
const { REQUIRED_FIELD } = require('../constants/errorMessages');

const phoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    manufacturer: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    price: {
      type: Number,
      required: [true, REQUIRED_FIELD]
    },
    image: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    description: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
  },
  {
    timestamps: true
  }
);

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;