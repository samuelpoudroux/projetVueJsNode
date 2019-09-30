const Appointment = require("../../../server/models/").Appointment;

exports.appointment_get = (req, res) => {
    Appointment.findAll()
        .then(appointments => {
            res.send(appointments);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving appointments."
            });
        });
}

// Create and Save a new appointment
exports.appointment_create = (req, res) => {
    // Validate request
    // if (!req.body.patientId || !req.body.physicianId || !req.body.meetingName || !req.body.meetingDate) {
    //     return res.status(400).send({
    //         message: "le prénom du medecin doit être indiqué"
    //     });
    // }
    // Save appointment in the database
    Appointment.create({
        meetingName: req.body.meetingName,
        patientId: req.body.patientId,
        physicianId: req.body.physicianId,
        meetingDate: req.body.meetingDate
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the appointment."
        });
    });
};


// Find a single note with a appointmentId
exports.appointment_findOne = (req, res) => {
    Appointment.findByPk(req.params.appointmentId).then(appointment => {
        if (!appointment) {
            return res.status(404).send({
                message: "toto" + req.params.appointmentId
            });
        }
        res.send(appointment);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "appointment not found with id " + req.params.appointmentId
            });
        }
        return res.status(500).send({
            message: "Error retrieving appointment with id " + req.params.appointmentId
        });
    });
};

// Update a note identified by the noteId in the request
exports.appointment_update = (req, res) => {
    Appointment.update({
            meetingName: req.body.meetingName,
            patientId: req.body.patientId,
            physicianId: req.body.physicianId,
            meetingDate: req.body.meetingDate
        }, {
            where: {
                id: req.params.appointmentId
            }
        }).then(result => {
            res.json(result)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "appointment not found with id " + req.params.appointmentId
                });
            }
            return res.status(500).send({
                message: "Error updating appointment with id " + req.params.appointmentId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.appointment_delete = (req, res) => {
    Appointment.destroy({
        where: {
            id: req.params.appointmentId
        }
    }).then(appointment => {
        if (!appointment) {
            return res.status(404).send({
                message: "appointment not found with id " + req.params.appointmentId
            });
        }
        res.send({ message: "appointment deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "appointment not found with id " + req.params.appointmentId
            });
        }
        return res.status(500).send({
            message: "Could not delete appointment with id " + req.params.appointmentId
        });
    });
};