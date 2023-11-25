const Phone = require('../models/Phone.model');
const createError = require('http-errors');

module.exports.getHome = (req, res, next) => {
  Phone.find().limit(3)
    .then(phones => {
      res.render('home', { phones });
    })
    .catch(err => next(err))
}

module.exports.getPhones = (req, res, next) => {
  Phone.find()
    .then(phones => {
      res.render('phones/list', { phones });
    })
    .catch(err => next(err))
}

module.exports.getPhoneDetail = (req, res, next) => {
  Phone.findById(req.params.id)
    .then((phone) => {
      if (phone) {
        res.render('phones/detail', { phone });
      } else {
        next(createError(404, 'No hemos encontrado este smartphone'))
      }
    })
    .catch(err => next(err))
}

module.exports.getPhoneCreateForm = (req, res, next) => {
  res.render('phones/create');
}