var express = require('express');
var router = express.Router();
var appointment_controller = require('../controllers/appointment');

// GET all appointments.
router.get('/appointments', appointment_controller.appointment_get);
router.get('/appointments/:appointmentId', appointment_controller.appointment_findOne);
router.post('/appointments', appointment_controller.appointment_create);
router.put('/appointments', appointment_controller.appointment_update);
router.put('/appointments/:appointmentId', appointment_controller.appointment_update);
router.delete('/appointments/:appointmentId', appointment_controller.appointment_delete);
module.exports = router;