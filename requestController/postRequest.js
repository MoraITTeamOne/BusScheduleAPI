/**
 * Created by Chanaka Fernando on 1/16/2017.
 */
var utills = require('../utills');
var collectionModel = require('../dataModels/collectionModles');


module.exports.postMethods = function (app) {
    utills.logger(__dirname + "\\getRequest.js", 200);


    /**
     * this method will save the data came from admin, into database
     */
    app.post('/post/bus', function (req, res) {
        utills.logger('sucessfully accessed ' + req.url, 200);

        utills.DBConnection();
        var newBus = new collectionModel.Buses({
            ID     : req.body.busId,
            D_NTC  : req.body.driverNTC,
            C_NTC  : req.body.conductorNTC,
            RouteNo: req.body.routeNo,
            Type   : req.body.busType,
            Rank   : req.body.busRank
        });
        newBus.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
            } else {
                utills.logger('Document is saved successfully', 200);
            }
        });
        res.end();

    });


    /**
     *this method will save the driver details came from admin, into database
     */
    app.post('/post/driver', function (req, res) {
        utills.logger('sucessfully accessed ' + req.url, 200);

        utills.DBConnection();
        var newDriver = collectionModel.Driver({
            NIC: req.body.driverNIC,
            NTC: req.body.driverNTC,
            Name: {
                fName: req.body.driverFName,
                lName: req.body.driverLName
            },
            DOB: req.body.driverDOB,
            Tel_No: req.body.driverTP,
            Add: req.body.driverAddress,
            Rank: req.body.driverRank
        });
        newDriver.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
            } else {
                utills.logger('Document is saved successfully', 200);

            }
        });
        res.end();
    });


    /**
     * this method will save the conductor details came from admin, into database
     */
    app.post('/post/conductor', function (req, res) {
        utills.logger('sucessfully accessed ' + req.url, 200);

        utills.DBConnection();
        var newConductor = collectionModel.Conductors({
            NIC: req.body.conductorNIC,
            NTC: req.body.conductorNTC,
            Name: {
                fName: req.body.conductorFName,
                lName: req.body.conductorLName
            },
            DOB: req.body.conductorDOB,
            Tel_No: req.body.conductorTP,
            Add: req.body.conductorAddress,
            Rank: req.body.conductorRank
        });
        newConductor.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
            } else {
                utills.logger('Document is saved successfully', 200);
            }
        });
        res.end();
    });


    /**
     * this method willadd a new schedule to the database
     *
     * warning can't update 2 records with same BusID... Schema problem when it creates
     *
     */
    app.post('/post/schedule',function(req,res){
        utills.logger("Successfuly accesed url" +req.url,200);
        utills.DBConnection();
        var sponsorObject = req.body;
        var newSchedule = collectionModel.BusSchedules({
            Id         :sponsorObject.Id,
            Route      :sponsorObject.Route,
            stopPoints :sponsorObject.stopPoints
        });
        newSchedule.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            } else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res);
            }
        });
        res.end();

    });


    app.post('/post/route',function(req,res){
        utills.logger("Successfuly accesed url" +req.url,200);
        utills.DBConnection();
        var routeObject = req.body;
        var newRoute   = collectionModel.BusRoute({
            RouteNo:routeObject.RouteNo,
            Descriptions:routeObject.Description,
            StopPoints: routeObject.StopPoints

        });
        newRoute.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            } else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res);
            }
        });
    });



};
