const router = require('express').Router();

const phonesController = require('../controllers/phones.controller');

router.get('/', phonesController.getHome);
router.get('/smartphones', phonesController.getPhones);
router.get('/smartphones/:id', phonesController.getPhoneDetail);

module.exports = router;