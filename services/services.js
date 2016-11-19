
var path = require('path');
//var buslist = require('../scheduleData/root_01.JSON');
var selectedSchedule =require('../control/controller.js');


/*
*This function is resfonible for all the URL base sevicess.
*/
module.exports.serviceCall = function (app) {


    // *This get method responsible for displaying Homepage
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../res/', 'index.html'));

    });


    // *This get method will retreve all the busScheduledata
    app.get('/routes/all', function (req, res) {
        return res.json({ Error: false, Schedule: buslist });
    });


    /*
        // *add a data to schedule use this post method
        app.post('/routes/add', function (req, res) {
            if (!req.body.b_id) {
                return res.json({ Message: "busID ID Missing", Error: true });
            }
            buslist.push(req.body);
            return res.json({
                Message: 'success',
                Error: false
            });
        });
    
    
        // *To Updata a schedule data this put method  use
        app.put('/routes/usdate/:id', function (req, res) {
            for (i = 0; i < busList.length; i++) {
                if (toString(buslist[i].b_id) === toString(req.params.b_id)) {
                    buslist[i].root_no = req.body.root_no;
                    buslist[i].s_location = req.body.s_location;
                    buslist[i].s_time = req.body.s_time;
                    buslist[i].desti = req.body.desti;
                    buslist[i].arrTime = req.body.arrTime;
                    buslist[i].sp1 = req.body.sp1;
                    buslist[i].sp1t = req.body.sp1t;
                    buslist[i].sp2 = req.body.sp2;
                    buslist[i].sp2t = req.body.sp2t;
                    return res.json({ message: "Success", error: false });
                }
            }
            return res.status(404).json({ message: "User not Found", error: true });
        });
    */

    // * To get a Specific bus Schedule Row this get method is used
    app.get('/routes/byid/:id', function (req, res) {
        for (i = 0; i < buslist.length; i++) {
            var string_a = buslist[i].BusId.toUpperCase();
            var string_b = req.params.id.toUpperCase();
            if (string_a === string_b) {
                return res.json({
                    Error: false,
                    Message: "Success",
                    BusList: buslist[i]
                });
            }
        }
        return res.status(404).json({
            Error: true,
            Message: "Data not found"    
        });
    });


    // *to retreve  Specific set of buses by start location
    app.get('/routes/bystartplace/:StartLocation', function (req, res) {
        var result = [];
        for (i = 0; i < buslist.length; i++) {
            var str1 = buslist[i].StartLocation.toUpperCase();
            var str2 = req.params.StartLocation.toUpperCase();
            if (str1 == str2) {
                result.push(buslist[i]);                       //add results into json array
                }
        }   
        if (result.length == 0) {                              //check whether the array is emplty
            return res.status(404).json({
                Error: true,
                Message: "Data not found"    
            });
        }
        else {
            return res.json({ Error:false,Message:"Sucess",Content:result });
        }
        });


    // *to retreve  Specific set of buses by root number
    app.get('/routes/byrootno/:RootNo', function (req, res) {
        var result = [];
        for (i = 0; i < buslist.length; i++) {
            var str1 = buslist[i].RootNo.toUpperCase();
            var str2 = req.params.RootNo.toUpperCase();
            if (str1==str2) {
                result.push( buslist[i] );
            }
        }
        if (result.length == 0) {
            return res.status(404).json({
                Error: true,
                Message: "Data not found"
            });
        }
        else {
            return res.json({ Error: false, Message: "Sucess", Content: result });
        }
    });

    //To retreve all the bus list behind the asked time from 10min
    app.get('/routes/sugestion/:root/:location/:time',function(req,res){

        var suggestedList=[];
        var rootNo = req.params.root.toUpperCase();
        var time=req.params.time.toUpperCase();
        var location=req.params.location.toUpperCase();
        var file = selectedSchedule.selectScheduleFile(rootNo);
       // var i=1;
        for( var i=0;i<file.length;i++){
            //for(j=0;j<file[i].StopPoints.length;j++) {
                // if(location==file[i].StopPoints[i]){
                console.log(file[1].StopPoints[i].Place);
           // }
           // }
        }


        //console.log(selectedSchedule.selectScheduleFile(rootNo));
        return res.json({"Error":false,"Content":req.params.location ,"content2":req.params.time ,"content3":req.params.root});
    });




};
