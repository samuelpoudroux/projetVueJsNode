const Physician = require("../../../server/models/").Physician;

exports.physician_get = (req, res) => {
    Physician.findAll()
        .then(physicians => {
            res.send(physicians);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving physicians."
            });
        });
}

// Create and Save a new physician
exports.physician_create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "le prénom du medecin doit être indiqué"
        });
    }
    // Save physician in the database
    Physician.create({
        firstName: req.body.firstName
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the physician."
        });
    });
};


// Find a single note with a physicianId
exports.physician_findOne = (req, res) => {
    Physician.findByPk(req.params.physicianId).then(physician => {
        if (!physician) {
            return res.status(404).send({
                message: "physician not found with id " + req.params.physicianId
            });
        }
        res.send(physician);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "physician not found with id " + req.params.physicianId
            });
        }
        return res.status(500).send({
            message: "Error retrieving physician with id " + req.params.physicianId
        });
    });
};

// Update a note identified by the noteId in the request
exports.physician_update = (req, res) => {
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    Physician.update({
            firstName: req.body.firstName
        }, {
            where: {
                id: req.params.physicianId
            }
        }).then(result => {
            res.json(result)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "physician not found with id " + req.params.physicianId
                });
            }
            return res.status(500).send({
                message: "Error updating physician with id " + req.params.physicianId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.physician_delete = (req, res) => {
    Physician.destroy({
        where: {
            id: req.params.physicianId
        }
    }).then(physician => {
        if (!physician) {
            return res.status(404).send({
                message: "physician not found with id " + req.params.physicianId
            });
        }
        res.send({ message: "physician deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "physician not found with id " + req.params.physicianId
            });
        }
        return res.status(500).send({
            message: "Could not delete physician with id " + req.params.physicianId
        });
    });
};