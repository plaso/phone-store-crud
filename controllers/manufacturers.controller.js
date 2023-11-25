const Manufacturer = require('../models/Manufacturer.model');
const Phone = require('../models/Phone.model');
const createError = require('http-errors');

module.exports.getManufacturers = (req, res, next) => {
  Manufacturer.find()
    .then(manufacturers => {
      res.render('manufacturers/list', { manufacturers });
    })
    .catch(err => next(err))
}

// Esta opcion es buscando a mano los telefonos
module.exports.getManufacturerDetail_UNUSED = (req, res, next) => {
  Manufacturer.findById(req.params.id)
    .then(manufacturer => {
      if (manufacturer) {
        return Phone.find({ manufacturer: manufacturer._id })
          .then(phones => {
            res.render('manufacturers/detail', { manufacturer, phones });
          })
      } else {
        next(createError(404, 'Fabricante no encontrado'));
      }
    })
    .catch(err => next(err));
}

module.exports.getManufacturerDetail = (req, res, next) => {
  Manufacturer.findById(req.params.id)
    .populate('phones') // Phone.find({ manufacturer: manufacturer._id }) y te lo inyecto en manufacturer.phones  <-- Por el virtual del modelo
    .then(manufacturer => {
      if (manufacturer) {
        console.log(manufacturer.phones);
        res.render('manufacturers/detail', { manufacturer });
      } else {
        next(createError(404, 'Fabricante no encontrado'));
      }
    })
    .catch(err => next(err));
}