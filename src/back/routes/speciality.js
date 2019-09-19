var express = require('express');
var router = express.Router();
var speciality_controller = require('../controllers/speciality');

// GET all speciality.
router.get('/specialities', speciality_controller.speciality_get);
router.get('/specialities/:specialityId', speciality_controller.speciality_findOne);
router.post('/specialities', speciality_controller.speciality_create);

module.exports = router;