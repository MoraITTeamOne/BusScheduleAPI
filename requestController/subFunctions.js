/**
 * Created by Chanaka Fernando on 2/10/2017.
 */
var utills = require('../utills');
var collectionModels = require('../dataModels/collectionModels');


/**
 *
 * This method will return all the busRote numbers matches with start locaton and end location
 *
 * @param sLoc     : start location
 * @param eLoc     : end location
 * @param callBack : return the route number list
 */
function getRoute(sLoc, eLoc,callBack){
    var list =[];
    console.log(sLoc);  // to be removed
    console.log(eLoc);  // to be removed
    var sLocation =sLoc.toUpperCase();
    var eLocation =eLoc.toUpperCase();
    utills.logger("successfuly accesed getRoute", 200);
    utills.DBConnection();
    collectionModels.BusRoute.find(function (err,data) {
        if(err){
            utills.logger("Error occure",500,err);
        } else{

            for(var i=0;i<data.length;i++){
                var j=0;
                var k=0;
                for(var j=0;j<data[i].StopPoints.length;j++){
                    var temp1 = false;
                    var temp2 = false;
                    if ((data[i].StopPoints[j].place).toUpperCase() === sLocation) {
                        temp1 = true;
                        break;
                    }
                }
                for(var k=0;k<data[i].StopPoints.length;k++){
                    if ((data[i].StopPoints[k].place).toUpperCase() === eLocation) {
                        temp2 = true;
                        break;
                    }
                }
                if((temp1 === true && temp2 ===true) &&(j < k)){
                    list.push(data[i].RouteNo);
                }
            }
        }
        if(list.length == 0){
            utills.logger("Data not found",404,err);
            callBack(err,list);
        }else{
            utills.logger("Succesfully returned route list",200);
            callBack(err,list);

        }

    });

}
exports.getRoute=getRoute;



/**
 *
 * This method will return past busses within 15 min from requested time
 *
 * @param array     :a route number list will be pased as a array
 * @param reqTime   :requested time
 * @param sLoc      :start location
 * @param callback  :callback function to return Buslist
 */
function getPastBusList(array,reqTime,sLoc,callback){
    var fullArray=[];
    var result=[];
    var sLocation =sLoc.toUpperCase();
    var count =0;
    utills.logger("successfuly accesed getPastBusList", 200);
    utills.DBConnection();

    for(var i=0;i<array.length ;i++){
        var sellection = {
            Route : array[i]
        };
        var projection = {
            _id : false,
            _v :false
        };
        collectionModels.BusSchedules.find(sellection,projection, {}, function (err, datalist) {
            if (err) {
                utills.logger("error occured :", 500, err);
            } else {
                var items = 0;
                while (datalist.length -1 >= items){
                    fullArray.push(datalist[items]);
                    items++;
                }
                if(array.length-1 == count){
                    for(var j=0;j< fullArray.length;j++){
                        var end = fullArray[j].stopPoints.length;
                        for(var k =0;k < end;k++){
                            var nTime = parseInt(fullArray[j].stopPoints[k].arrivalTime);
                            var timeGap = (nTime - reqTime);
                            var startPlace = (fullArray[j].stopPoints[k].place).toUpperCase();

                            if((timeGap >= - 15 && timeGap <=0) && (startPlace === sLocation)){
                                console.log(nTime+" "+timeGap+" "+startPlace); // to be removed
                                console.log(fullArray[j].Id);                  // to be removed
                                result.push(fullArray[j]);
                            }
                        }

                    }
                    if(result.length == 0){
                        utills.logger("No item found with start time and start location",404,err);
                        callback(err,result);
                    }else{
                        utills.logger("Buslist returned from getPastBusList",200);
                        callback(err,result);
                    }

                }else {
                    count++;
                }
            }
        });

    } //end of the for loop

}
exports.getPastBusList = getPastBusList;


/**
 *
 * This method will return future busses within 15 min from requested time
 *
 * @param array     :a route number list will be pased as a array
 * @param reqTime   :requested time
 * @param sLoc      :start location
 * @param callback  :callback function to return Buslist
 */
function getFutureBusList(array,reqTime,sLoc,callback){
    var fullArray=[];
    var result=[];
    var sLocation =sLoc.toUpperCase();
    var count =0;
    utills.logger("successfuly accesed getFutureBusList", 200);
    utills.DBConnection();

    for(var i=0;i<array.length ;i++){
        var sellection = {
            Route : array[i]
        };
        var projection = {
            _id : false,
            _v :false
        };
        collectionModels.BusSchedules.find(sellection,projection, {}, function (err, datalist) {
            if (err) {
                utills.logger("error occured :", 500, err);
            } else {
                var items = 0;
                while (datalist.length -1 >= items){
                    fullArray.push(datalist[items]);
                    items++;
                }
                if(array.length-1 == count){
                    for(var j=0;j< fullArray.length;j++){
                        var end = fullArray[j].stopPoints.length;
                        for(var k =0;k < end;k++){
                            var nTime = parseInt(fullArray[j].stopPoints[k].arrivalTime);
                            var timeGap = (nTime - reqTime );
                            var startPlace = (fullArray[j].stopPoints[k].place).toUpperCase();

                            if((timeGap <= 15 && timeGap >=0) && (startPlace === sLocation)){
                                console.log(nTime+" "+timeGap+" "+startPlace); // to be removed
                                console.log(fullArray[j].Id);                  // to be removed
                                result.push(fullArray[j]);
                            }
                        }

                    }
                    if(result.length == 0){
                        utills.logger("No item found with start time and start location",404,err);
                        callback(err,result);
                    }else{
                        utills.logger("Buslist returned from getFutureBusList",200);
                        callback(err,result);
                    }

                }else {
                    count++;
                }
            }
        });

    } //end of the for loop

}
exports.getFutureBusList = getFutureBusList;