var express = require('express');
var router = express.Router();
var address_controller = require('../controllers/address');

// GET all addresss.
router.get('/address', address_controller.address_get);

module.exports = router;