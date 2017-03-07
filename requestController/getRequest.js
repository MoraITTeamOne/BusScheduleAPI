/**
 * Created by Chanaka Fernando on 1/16/2017.
 */

var utills = require('../utills');
var subFunctions = require('./subFunctions');
var path = require('path');
var collectionModels = require('../dataModels/collectionModels');

/**
 * all the get request from the user, is handled here
 * @param app
 */
module.exports.getMethods = function (app) {
    utills.logger(__dirname + "\\getRequest.js", 200);

    /**
     * send a index file of the bus api
     */
    app.get('/', function (req, res) {
        utills.logger("successfully accessed " + req.url, 200);
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
        res.status(200);
        utills.logger("successfully send the index.html file", 200);
    });


//===================================================================================================
    /**
     * send all bus ids in json format, listed in the database
     */
    app.get('/get/all-bus', function (req, res) {
        utills.logger("successfuly accesed " + req.url, 200);
        utills.DBConnection();
        var Projection = {
            __v: false,
            _id: false
        };
        collectionModels.Buses.find({}, Projection, function (err, buse_id) {
            if (err) {
                utills.logger("error occured :", 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: buse_id});
                utills.logger("succesfuly send the bus id list", 200);
            }
        });

    });


    /**
     *send all conductors listed in the DB
     */
    app.get('/get/all-conductor', function (req, res) {
        utills.logger("successfuly accesed " + req.url, 200);
        utills.DBConnection();
        var Projection = {
            __v: false,
            _id: false
        };
        collectionModels.Conductors.find({}, Projection, function (err, list) {
            if (err) {
                utills.logger("error occured :", 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: list});
                utills.logger("succesfuly send the conductor list", 200);
            }
        });
    });


    /**
     * send all driver data ,listed in tthe database
     */
    app.get('/get/all-driver', function (req, res) {
        utills.logger("successfuly accesed " + req.url, 200);
        utills.DBConnection();
        var Projection = {
            _id: false,
            __v: false

        };
        collectionModels.Driver.find({}, Projection, function (err, list) {
            if (err) {
                utills.logger("error occured :", 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: list});
                utills.logger("succesfuly send the Driver list", 200);
            }
        });
    });


//==========================================================================================


    /**
     * send specific bus data by given bus ID
     */
    app.get('/get/bus/:id', function (req, res) {
        utills.logger("successfuly accesed " + req.url, 200);
        utills.DBConnection();
        var Selection = {
            ID: req.params.id
        };
        var Projection = {
            __v: false,
            _id: false
        };
        collectionModels.Buses.find(Selection, Projection, function (err, bus) {
            if (err) {
                utills.logger("error occured :", 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: bus});
                utills.logger("succesfuly send the BUS", 200);
            }
        });
    });


    /**
     * send specific conductor data by given NTC ID
     */
    app.get('/get/conductor/:ntc', function (req, res) {
        utills.logger("successfuly accesed " + req.url, 200);
        utills.DBConnection();
        var Selection = {
            NTC: req.params.ntc
        };
        var Projection = {
            __v: false,
            _id: false
        };
        collectionModels.Conductors.find(Selection, Projection, function (err, conductor) {
            if (err) {
                utills.logger("error occured :", 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: conductor});
                utills.logger("succesfuly send the Conductor", 200);
            }
        });
    });


    /**
     * send a specific driver data by given drver NTC
     */
    app.get('/get/driver/:ntc', function (req, res) {
        utills.logger('successfully accesed ' + req.url, 200);
        utills.DBConnection();
        var Selection = {
            NTC: req.params.ntc
        };
        var Projection = {
            __v: false,
            _id: false
        };
        collectionModels.Driver.find(Selection, Projection, function (err, driver) {
            if (err) {
                utills.logger('error occured :', 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: driver});
                utills.logger("succesfuly send the Driver ", 200);
            }
        });

    });


    //===========================================================================

    /**
     * send sumarry in json format, listed in the database
     */
    app.get('/get/summary', function (req, res) {
        var array = {
            Buses: null,
            Conductors: null,
            Drivers: null
        };

        var error;


        utills.logger("successfuly accesed " + req.url, 200);
        utills.DBConnection();
        var projForBus = {
            __v: false,
            _id: false,
            D_NTC: false,
            C_NTC: false,
            RouteNo: false
        };
        var sort = {
            skip: 0,
            limit: 5,
            sort: {Rank: 1}
        };
        collectionModels.Buses.find({}, projForBus, sort, function (err, buses) {
            if (err) {
                utills.logger("error occured :", 500, err);
                error = err;
            } else {
                array.Buses = buses;
                utills.logger("succesfuly attached the top bus  list to the result array", 200);
            }
        });
        var projForConductor = {
            __v: false,
            _id: false,
            NIC: false,
            DOB: false,
            Tel_No: false,
            Add: false,
            Name: false
        };
        var sort = {
            skip: 0,
            limit: 5,
            sort: {Rank: 1}
        };
        collectionModels.Conductors.find({}, projForConductor, sort, function (err, conductors) {
            if (err) {
                utills.logger("error occured :", 500, err);
                error = err;
            } else {
                array.Conductors = conductors;
                utills.logger("succesfuly attached the top conductors  list to the result array", 200);
            }
        });

        var projForDrivers = {
            __v: false,
            _id: false,
            NIC: false,
            DOB: false,
            Tel_No: false,
            Add: false,
            Name: false
        };
        var sort = {
            skip: 0,
            limit: 1,
            sort: {Rank: 1}
        };
        collectionModels.Driver.find({}, projForDrivers, sort, function (err, drivers) {
            if (err) {
                utills.logger("error occured :", 500, err);
                error = err;

            } else {
                array.Drivers = drivers;
                utills.logger("succesfuly attached the top drivers  list to the result array", 200);
            }


            if (error) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'Error', content: error.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: array});
                utills.logger("succesfuly send the array list ", 200);
            }

        });


    });


    /**
     * this method will return scheduled buses befor the requested time
     */
    app.get('/get/past-schedule/:startLocation/:endLocation/:sTime',function (req,res) {
        var sLocation =   req.params.startLocation;
        var eLocation = req.params.endLocation;
        var sTime      = parseInt(req.params.sTime);

        subFunctions.getRoute(sLocation ,eLocation,function (err,routeList) {
            var routes = routeList;
            if(err){
                utills.logger("Error happen :",500,err);
            }else {
                console.log(routes);  //remove after compleation
                subFunctions.getPastBusList(routes,sTime,sLocation,function (err,list ){
                    if(err){
                        utills.logger("Error happen :",500,err);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send({status: 'Error', content: ""});
                    }else{
                        //console.log(list);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send({status: 'success', content: list});
                        utills.logger("succesfuly send the array list ", 200);

                    }

                });
            }
        });

    });



    /**
     * this method will return scheduled buses after the requested time
     */
    app.get('/get/future-schedule/:startLocation/:endLocation/:sTime',function (req,res) {
        var sLocation =   req.params.startLocation;
        var eLocation = req.params.endLocation;
        var sTime      = parseInt(req.params.sTime);

        subFunctions.getRoute(sLocation ,eLocation,function (err,routeList) {
            var routes = routeList;
            if(err){
                utills.logger("Error happen :",500,err);
            }else {
                console.log(routes);  //remove after compleation
                subFunctions.getFutureBusList(routes,sTime,sLocation,function (err,list ){
                    if(err){
                        utills.logger("Error happen :",500,err);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send({status: 'Error', content: ""});
                    }else{
                        //console.log(list);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send({status: 'success', content: list});
                        utills.logger("succesfuly send the array list ", 200);

                    }

                });
            }
        });

    });


};
