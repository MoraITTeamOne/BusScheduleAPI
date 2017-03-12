/**
 * Created by Chanaka Fernando on 1/2/2017.
 * @email nuwan.c.fernando@gmail.com
 */

var utills = require('../utills');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * create a colection structure for a newly sent bus
 */
var bus =new Schema({
    ID        :{type:String, required:true,unique:true,max:6},
    D_NTC     :{type:String, required:true,max:6},
    C_NTC     :{type:String, required:true,max:6},
    RouteNo   :{type:String, required:true,min:1},
    BusType   :String,
    Rank      :Number
});
var Buses = mongoose.model('Buses',bus);
exports.Buses = Buses;


/**
 * create the collection structure for newly sent conductor
 * DOB type change
 */
var conductor=new Schema({
    NIC       :{type:String, required:true,unique:true,max:10},
    NTC       :{type:String, required:true,unique:true,max:6},
    Name      :{
        fName:String,
        lName:String
    },
    DOB       :String,
    Tel_No    :String,
    Add       :String,
    Rank      :Number
});
var Conductors=mongoose.model('Conductors',conductor);
exports.Conductors =Conductors;


/**
 * create  the collection structure for newly send Driver
 * DOB type change
 */
var driver = new Schema({
    NIC       :{type:String, required:true,unique:true,max:10},
    NTC       :{type:String, required:true,unique:true,max:6},
    Name      :{
        fName:String,
        lName:String
    },
    DOB       :String,
    Tel_No    :String,
    Add       :String,
    Rank      :Number
});
exports.Driver = mongoose.model('Driver',driver);


/**
 * create  the collection structure for newly sent schedule
 */
var place = new Schema({
    place :String,
    arrivalTime  : String
});

var Schedule = new Schema({
    Id         :{type:String, required:true,max:6},
    Route     :{type:String, required:true,min:1},
    stopPoints  :[place]
});
exports.BusSchedules= mongoose.model('BusSchedules',Schedule);
//==================================================================


/**
 * create a schema to enter a Root
 */
var geoData = new Schema({
    place      :{type:String,require:true},
    latitude   : {type:Number,require:true},
    longitude  : {type:Number,require:true}
});

var route = new Schema({
    RouteNo: {type: String, require: true, unique: true,min:1},
    Descriptions: String,
    StopPoints: [geoData]
});

exports.BusRoute = mongoose.model('BusRoute',route);
//=============================================


