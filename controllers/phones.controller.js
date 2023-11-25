const Phone = require('../models/Phone.model');

module.exports.getHome = (req, res, next) => {
  Phone.find().limit(3)
    .then(phones => {
      res.render('home', { phones });
    })
    .catch(err => console.error(err))
}

module.exports.getPhones = (req, res, next) => {
  Phone.find()
    .then(phones => {
      res.render('phones/list', { phones });
    })
    .catch(err => console.error(err))
}

module.exports.getPhoneDetail = (req, res, next) => {
  Phone.findById(req.params.id)
    .then((phone) => {
      res.render('phones/detail', { phone });
    })
    .catch(err => console.error(err))
}