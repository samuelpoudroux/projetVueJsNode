const Address = require("../../../server/models/").Address;

exports.address_get = (req, res) => {
    Address.findAll()
        .then(addresss => {
            res.send(addresss);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving addresss."
            });
        });
}

// Create and Save a new address
exports.address_create = (req, res) => {
    // Validate request
    if (!req.body.street || !req.body.city || !req.body.country || !req.body.door) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Save address in the database
    Address.create({
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        door: req.body.door

    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the address."
        });
    });
};


// Find a single note with a addressId
exports.address_findOne = (req, res) => {
    Address.findByPk(req.params.addressId).then(address => {
        if (!address) {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });
        }
        res.send(address);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });
        }
        return res.status(500).send({
            message: "Error retrieving address with id " + req.params.addressId
        });
    });
};

// Update a note identified by the noteId in the request
exports.address_update = (req, res) => {
    Address.update({
            street: req.body.street,
            city: req.body.city,
            country: req.body.country,
            door: req.body.door
        }, {
            where: {
                id: req.params.addressId
            }
        }).then(result => {
            res.json(result)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "address not found with id " + req.params.addressId
                });
            }
            return res.status(500).send({
                message: "Error updating address with id " + req.params.addressId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.address_delete = (req, res) => {
    Address.destroy({
        where: {
            id: req.params.addressId
        }
    }).then(address => {
        if (!address) {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });
        }
        res.send({ message: "address deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });
        }
        return res.status(500).send({
            message: "Could not delete address with id " + req.params.addressId
        });
    });
};