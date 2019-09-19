//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express');
var cors = require('cors')
var bodyParser = require("body-parser");
var mysql = require('mysql');
var physicianRouter = require('./routes/physician.js');
var patientRouter = require('./routes/patient.js');
var appointmentRouter = require('./routes/appointment.js');
var indexRouter = require('./routes/index.js');
var addressRouter = require('./routes/address.js');
var specialityRouter = require('./routes/speciality.js');


var mySqlClient = mysql.createConnection({
    host: "localhost",
    user: "samuelpoudroux",
    password: "sam131190",
    database: "toto"
});

// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost';
var port = 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()) // Use this after the variable declaration

app.use(indexRouter);
app.use(patientRouter);
app.use(physicianRouter);
app.use(addressRouter);
app.use(appointmentRouter);
app.use(specialityRouter);

// Démarrer le serveur 
app.listen(port, hostname, function() {
    console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port + "\n");
});