const mongoose = require('mongoose');
const Phone = require('../models/Phone.model');
const createError = require('http-errors');

module.exports.getHome = (req, res, next) => {
  Phone.find().limit(3).sort({ createdAt: 'desc' })
    .then(phones => {
      res.render('home', { phones });
    })
    .catch(err => next(err))
}

module.exports.getPhones = (req, res, next) => {
  Phone.find().sort({ createdAt: 'desc' })
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
  res.render('phones/form');
}

module.exports.doPhoneCreate = (req, res, next) => {
  Phone.create(req.body)
    .then(phoneDB => {
      res.redirect('/smartphones');
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Renderizar la vista de nuevo, pero con los errores
        res.render('phones/form', { errors: err.errors, phone: req.body })
      } else {
        next(err)
      }
    })
}