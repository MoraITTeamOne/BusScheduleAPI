
/**
 * Created by Chanaka Fernando on 1/16/2017.
 * @email <nuwan.c.fernando@gmail.com>
 */

var config =require('./app-config.json');


/**
 * for the changing the font color of the comments/log
 * @type {{Reset: string, Bright: string, Dim: string, Underscore: string, Blink: string, Reverse: string, Hidden: string, fg: {Black: string, Red: string, Green: string, Yellow: string, Blue: string, Magenta: string, Cyan: string, White: string, Crimson: string}}}
 */
const fColor = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m"
    }
};


/**
 * this module is used for formatting and keep  a log file
 * @param msg
 * @param statusCode
 * @param err
 */

function logger(msg,statusCode,err){
    var message =msg;
    var code =statusCode;
    var col;
    switch (code){
        case 200: {col = fColor.fg.Green;}break;
        case 404: {col = fColor.fg.Red;}break;
        case 304: {col = fColor.fg.Yellow;}break;
        case 500: {col = fColor.fg.Blue;}break;
    }
    var time=new Date().toLocaleString();
    if(err){
        var errorMsg =err.message;
        var errName =err.name;
        console.log(fColor.fg.Red,time+",  " +col,code+', ' +fColor.fg.Red,message,fColor.fg.White+" ==>"+fColor.fg.Red,errName+'... '+errorMsg,fColor.Reset);
    }else{
        console.log(fColor.fg.Cyan,time+", "+fColor.Bright,col,code+", "+fColor.fg.Magenta,message,fColor.Reset);
    }
}
exports.logger =logger;



/**
 * database connection is fully controlled by this method
 * @returns {boolean}
 */

function dbConnection() {

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting (soucre) My credentials were invalid, it was giving 4, which I can't find in officials docs or anywhere else


    var mongoose = require( 'mongoose' );
    mongoose.Promise = global.Promise;
    if(mongoose.connection.readyState){
        return true;
    }else{
        mongoose.Promise = global.Promise;
        mongoose.connect(config.DB_HOST+':'+config.DB_PORT+'/'+config.DB_NAME);

        // When successfully connected
        mongoose.connection.on('connected', function () {
            logger('Mongoose default connection open ',200);
        });
        // If the connection throws an error
        mongoose.connection.on('error',function (err) {
            logger('connection error:',500,err);
        });
        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            logger('Mongoose default connection disconnected',500);
        });
        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function () {
                logger('Mongoose default connection disconnected through app termination',200);
                process.exit(0);
            });
        });
    }
}
exports.DBConnection=dbConnection;


/**
 * to send the http response to the http requests(post)
 *
 * @param statusCode   : set the status code
 * @param res          : response object
 * @param err          : error object
 */
function sendResponce(statusCode,res,err,result) {

    res.setHeader('Content-Type', 'application/json');
    if (err) {
        res.status(statusCode).send({
            status : statusCode,
            code   :err.code,
            index  :err.index,
            message: err.message
        });

    } else if(result){
        res.setHeader('Content-Type', 'application/json');
        res.status(statusCode).send({
            status: statusCode,
            message: "success",
            content :result

        });
    }else {
        res.setHeader('Content-Type', 'application/json');
        res.status(statusCode).send({
            status: statusCode,
            message: "success"
        });
    }
    res.end();


}
exports.sendResponce=sendResponce;