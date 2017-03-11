/**
 * Created by Chanaka Fernando on 2/19/2017.
 */

var utills = require('../utills');
var collectionModel = require('../dataModels/collectionModels');


module.exports.updateMethods = function (app) {
    utills.logger(__dirname + "\\updateRequest.js", 200);


    /**
     * to update a bus by Its ID
     */
    app.post('/update/bus/:busId',function (req,res) {
        utills.logger('sucessfully accessed ' + req.url, 200);
        utills.DBConnection();
        var selection={
            ID :req.params.busId
        };
        var update ={
            ID     : req.body.busId,
            D_NTC  : req.body.driverNTC,
            C_NTC  : req.body.conductorNTC,
            RouteNo: req.body.routeNo,
            BusType: req.body.busType,
            Rank   : req.body.busRank
        };

        var options = {
            new:true,
            projection:{_id: false,__v:false},
            maxTimeMS: 300
        };

        collectionModel.Buses.findOneAndUpdate(selection,update,options,function (err,list) {
            if(err){
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            }else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res,err,list);
            }
        });
    });



    /**
     * to update a Driver by his NTC
     */
    app.post('/update/bus/driver/:ntc',function (req,res) {
        utills.logger('sucessfully accessed ' + req.url, 200);
        utills.DBConnection();
        var selection={
            NTC :req.params.ntc
        };
        var update ={
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
        };

        var options = {
            new:true,
            projection:{_id: false,__v:false},
            maxTimeMS: 300
        };

        collectionModel.Driver.findOneAndUpdate(selection,update,options,function (err,list) {
            if(err){
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            }else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res,'',list);
            }
        });
    });



    /**
     * to update a Conductor by his NTC
     */
    app.post('/update/bus/conductor/:ntc',function (req,res) {
        utills.logger('sucessfully accessed ' + req.url, 200);
        utills.DBConnection();
        var selection={
            NTC :req.params.ntc
        };
        var update ={
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
        };

        var options = {
            new:true,
            projection:{_id: false,__v:false},
            maxTimeMS: 300
        };

        collectionModel.Conductors.findOneAndUpdate(selection,update,options,function (err,list) {
            if(err){
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            }else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res,'',list);
            }
        });
    });



    /**
     * to update a Route by Its Route number
     */
    app.post('/update/bus/route/:routes',function (req,res) {
        utills.logger('sucessfully accessed ' + req.url, 200);
        utills.DBConnection();
        var selection={
            RouteNo:req.params.routes
        };
        var update ={
            RouteNo:req.body.RouteNo,
            Descriptions:req.body.Description,
            StopPoints: req.body.StopPoints
        };

        var options = {
            new:true,
            projection:{_id: false,__v:false},
            maxTimeMS: 300
        };

        collectionModel.BusRoute.findOneAndUpdate(selection,update,options,function (err,list) {
            if(err){
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            }else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res,'',list);
            }
        });
    });


};

