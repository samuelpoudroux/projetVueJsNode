var express = require('express');
var router = express.Router();
var patient_controller = require('../controllers/patient');

// GET all patients.
router.get('/patients', patient_controller.patient_get);
router.get('/patients/:patientId', patient_controller.patient_findOne);
router.post('/patients', patient_controller.patient_create);
router.put('/patients', patient_controller.patient_update);
router.put('/patients/:patientId', patient_controller.patient_update);
router.delete('/patients/:patientId', patient_controller.patient_delete);
module.exports = router;