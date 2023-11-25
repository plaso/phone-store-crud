const mongoose = require('mongoose');
const { REQUIRED_FIELD, INVALID_URL } = require('../constants/errorMessages');
const { URL_REGEX } = require('../constants/regexs');

const manufacturerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    image: {
      type: String,
      required: [true, REQUIRED_FIELD],
      match: [URL_REGEX, INVALID_URL],
    },
    year: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
  },
  {
    timestamps: true
  }
)

manufacturerSchema.virtual('phones', {
  ref: 'Phone',
  localField: '_id',
  foreignField: 'manufacturer',
  justOne: false,
})

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;