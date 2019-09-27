var express = require('express');
var router = express.Router();
var physician_controller = require('../controllers/physician');


// GET all physician.
router.get('/physicians', physician_controller.physician_get);
router.get('/physicians/:physicianId', physician_controller.physician_findOne);
router.get('/physicians/name/:firstname', physician_controller.physician_get_startingBy);
router.post('/physicians', physician_controller.physician_create);
router.put('/physicians', physician_controller.physician_update);
router.put('/physicians/:physicianId', physician_controller.physician_update);
router.delete('/physicians/:physicianId', physician_controller.physician_delete);

module.exports = router;