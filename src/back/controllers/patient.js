const Patient = require("../../../server/models/").Patient;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.patient_get = (req, res) => {
    Patient.findAll()
        .then(patients => {
            res.send(patients);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving patients."
            });
        });
}

exports.patient_get_startingBy = (req, res) => {
    Patient.findAll({
        where: {
            firstName: {
                [Op.startsWith]: req.params.firstname
            }
        }

    }).then(patient => {
        res.send(patient)
    })
}

// Create and Save a new patient
exports.patient_create = (req, res) => {
    // Validate request
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "le prénom du medecin doit être indiqué"
        });
    }
    // Save patient in the database
    Patient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        addressId: req.body.addressId

    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the patient."
        });
    });
};


// Find a single note with a patientId
exports.patient_findOne = (req, res) => {
    Patient.findByPk(req.params.patientId).then(patient => {
        if (!patient) {
            return res.status(404).send({
                message: "patient not found with id " + req.params.patientId
            });
        }
        res.send(patient);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "patient not found with id " + req.params.patientId
            });
        }
        return res.status(500).send({
            message: "Error retrieving patient with id " + req.params.patientId
        });
    });
};

// Update a note identified by the noteId in the request
exports.patient_update = (req, res) => {
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    Patient.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            addressId: req.body.addressId
        }, {
            where: {
                id: req.params.patientId
            }
        }).then(result => {
            res.json(result)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "patient not found with id " + req.params.patientId
                });
            }
            return res.status(500).send({
                message: "Error updating patient with id " + req.params.patientId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.patient_delete = (req, res) => {
    Patient.destroy({
        where: {
            id: req.params.patientId
        }
    }).then(patient => {
        if (!patient) {
            return res.status(404).send({
                message: "patient not found with id " + req.params.patientId
            });
        }
        res.send({ message: "patient deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "patient not found with id " + req.params.patientId
            });
        }
        return res.status(500).send({
            message: "Could not delete patient with id " + req.params.patientId
        });
    });
};