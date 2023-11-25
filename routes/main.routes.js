const router = require('express').Router();

const phonesController = require('../controllers/phones.controller');

router.get('/', phonesController.getHome);

// Read
router.get('/smartphones', phonesController.getPhones);

// Create
router.get('/smartphones/create', phonesController.getPhoneCreateForm); // Esta que vaya antes de la del id porque sino entraria en la otra
router.post('/smartphones', phonesController.doPhoneCreate);

// Read detail
router.get('/smartphones/:id', phonesController.getPhoneDetail);

module.exports = router;