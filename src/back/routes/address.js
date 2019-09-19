var express = require('express');
var router = express.Router();
var address_controller = require('../controllers/address');

// GET all addresses.
router.get('/addresses', address_controller.address_get);
router.get('/addresses/:addressId', address_controller.address_findOne);
router.post('/addresses', address_controller.address_create);
router.put('/addresses', address_controller.address_update);
router.put('/addresses/:addressId', address_controller.address_update);
router.delete('/addresses/:addressId', address_controller.address_delete);
module.exports = router;