const Speciality = require("../../../server/models/").Speciality;

exports.speciality_get = (req, res) => {
    Speciality.findAll()
        .then(specialitys => {
            res.send(specialitys);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving specialitys."
            });
        });
}

// Create and Save a new speciality
exports.speciality_create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        return res.status(400).send({
            message: "le prénom du medecin doit être indiqué"
        });
    }
    // Save speciality in the database
    Speciality.create({
        label: req.body.label,
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the speciality."
        });
    });
};

// Find a single note with a specialityId
exports.speciality_findOne = (req, res) => {
    Speciality.findByPk(req.params.specialityId).then(speciality => {
        if (!speciality) {
            return res.status(404).send({
                message: "speciality not found with id " + req.params.specialityId
            });
        }
        res.send(speciality);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "speciality not found with id " + req.params.specialityId
            });
        }
        return res.status(500).send({
            message: "Error retrieving speciality with id " + req.params.specialityId
        });
    });
};