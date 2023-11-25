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
      res.redirect(`/smartphones/${phoneDB._id}`);
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

module.exports.getPhoneEditForm = (req, res, next) => {
  // Me traigo el phone a editar de la base de datos
  Phone.findById(req.params.id)
    .then(phone => {
      if (phone) {
        res.render('phones/form', { phone, isEdit: true })
      } else {
        next(createError(404, 'No hemos encontrado este smartphone'))
      }
    })
    .catch(err => next(err))

}

module.exports.doPhoneEdit = (req, res, next) => {
  Phone.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Primer parametro id - segundo objeto de updates - tercero el new true si quereis el objeto actualizado
    .then(phoneDB => {
      res.redirect(`/smartphones/${phoneDB._id}`);
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Renderizar la vista de nuevo, pero con los errores
        res.render('phones/form', { errors: err.errors, phone: req.body, isEdit: true })
      } else {
        next(err)
      }
    })
}

module.exports.deletePhone = (req, res, next) => {
  Phone.findByIdAndDelete(req.params.id)
    .then(phoneDB => {
      if (phoneDB) {
        res.redirect('/smartphones');
      } else {
        next(createError(404, 'No hemos encontrado este smartphone'))
      }
    })
    .catch(err => next(err))
}