
var express = require('express');
var bodyParser = require('body-parser');
var services = require('./services/services.js');
var config = require('./config.json'); 
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//To access Busschedule.json  file directly 
app.use("/DataFiles", express.static(__dirname + '/res/BusSchedule.json'));
services.serviceCall(app);

//starting the server
app.listen(config.SERVER_PORT, function (res, err) {
    if (err) {
        console.log('Somthing going wrong Please Check The Error :' + err);
        res.status(500);
    }
    console.log('BusSchedule is listening on port ' + config.SERVER_PORT);
});
