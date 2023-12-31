const mongoose = require('mongoose');
const { REQUIRED_FIELD, INVALID_URL } = require('../constants/errorMessages');
const { URL_REGEX } = require('../constants/regexs');

const phoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    manufacturer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Manufacturer',
      required: [true, REQUIRED_FIELD]
    },
    price: {
      type: Number,
      required: [true, REQUIRED_FIELD]
    },
    image: {
      type: String,
      required: [true, REQUIRED_FIELD],
      match: [URL_REGEX, INVALID_URL],
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