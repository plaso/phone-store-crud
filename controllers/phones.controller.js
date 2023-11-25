const mongoose = require('mongoose');
const Phone = require('../models/Phone.model');
const Manufacturer = require('../models/Manufacturer.model');
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
    .populate('manufacturer') // findById(phone.manufacturer) -> esto lo hace mongoose por mi
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
  Manufacturer.find()
    .then(manufacturers => {
      res.render('phones/form', { manufacturers });
    })
    .catch(err => next(err))
}

module.exports.doPhoneCreate = (req, res, next) => {
  Phone.create(req.body)
    .then(phoneDB => {
      res.redirect(`/smartphones/${phoneDB._id}`);
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Renderizar la vista de nuevo, pero con los errores
        return Manufacturer.find()
          .then(manufacturers => {
            res.render('phones/form', { errors: err.errors, manufacturers, phone: req.body })
          })
      } else {
        next(err)
      }
    })
}

module.exports.getPhoneEditForm = (req, res, next) => {
  Promise.all([
    Phone.findById(req.params.id), // El telefono de la vista
    Manufacturer.find()
  ])
    .then((response) => {
      const [phone, manufacturers] = response;
      if (phone) {
        res.render('phones/form', { phone, manufacturers, isEdit: true })
      } else {
        next(createError(404, 'No hemos encontrado este smartphone'))
      }
    })
}

module.exports.doPhoneEdit = (req, res, next) => {
  Phone.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Primer parametro id - segundo objeto de updates - tercero el new true si quereis el objeto actualizado
    .then(phoneDB => {
      res.redirect(`/smartphones/${phoneDB._id}`);
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Renderizar la vista de nuevo, pero con los errores
        return Manufacturer.find()
          .then(manufacturers => {
            res.render('phones/form', { errors: err.errors, manufacturers, phone: req.body, isEdit: true })
          })
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