﻿var express = require('express');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

var config = require('./app-config.json');
var getRequest = require('./requestController/getRequest');
var postRequest = require('./requestController/postRequest');
var updateRequest = require('./requestController/updateRequest');

var utills = require('./utills');


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(cookieParser());



utills.logger("Started Executing ./app.js", 200);

/**
 * call the services
 */
getRequest.getMethods(app);
postRequest.postMethods(app);
updateRequest.updateMethods(app);


/**
 * start the server
 */
app.listen(config.SERVER_PORT, function (res, err) {
    if (err) {
        utills.logger("Server didn't started properly", 500);
        console.log('Please Check The Error :' + err);
        res.status(500);
    }
    var str = "Listening on Port " + config.SERVER_PORT;
    utills.logger(str, 200);
});

