/**
 * Created by Chanaka Fernando on 11/19/2016.
 */
var root_01 = require('../scheduleData/root_01');
//var root_02 = require('../scheduleData/root_02');
//var root_03 = require('../scheduleData/root_03');
//var root_04 = require('../scheduleData/root_04');
//var root_05 = require('../scheduleData/root_05');
//var root_06 = require('../scheduleData/root_06');
//var root_07 = require('../scheduleData/root_07');
//var root_08 = require('../scheduleData/root_08');


/*
* This method will return all the bus schedule data with mat
*
* */
module.exports.selectScheduleFile=function(rootNo){
    var result=null;
    console.log(rootNo);
    switch(rootNo){

        case '01':{result = root_01}break;
        case '02':{result = root_02}break;
        //case '03':{result = root_03}break;
        //case '04':{result = root_04}break;
        case '05':{result = root_05}break;
        //case '06':{result = root_06}break;
       // case '07':{result = root_07}break;
        case '08':{result = root_08}break;
        //case '09':{result = root_09}break;
        default:console.log("Requested rout doesn't match with the Content");
    }
    return result;
};
