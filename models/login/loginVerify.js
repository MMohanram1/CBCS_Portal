var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var md5 = require('md5');

var jsonParser = bodyParser.json();

var mysql = require('mysql');
var mysqlConfig = require('../mysqlConfig.js');

var connection = mysql.createConnection({
    host     : mysqlConfig.host,
    port     : mysqlConfig.port,
    user     : mysqlConfig.user,
    password : mysqlConfig.password,
    database : mysqlConfig.database,
});

/*var jsonParser = {
    user: "1601124",
    password: "Srec@123"
}*/ //for user creation

router.post('/', jsonParser, function(req, res){
    
    if(!req.body){
       res.status(400);
       res.json({message: "Bad Request"});
    } else {

        var receivedJson = req.body;
        var query = "SELECT userPassword FROM login where registerNumber='" + receivedJson["user"] + "'";
        
        console.log(query);

        connection.connect();

        connection.query(query, function (error, results, fields) {

            console.log(results[0]["userPassword"]);
            if (error) {
                throw error;
                res.status(400);
                res.json({"status":400,"desc":"Error"});
            }
            else if(md5(receivedJson["password"])==results[0]["userPassword"]){
                res.status(200);
                res.json({"status":200,"desc":"Success"});
            }
            else{
                res.status(400);
                res.json({"status":400,"desc":"Error"});
            }
        })

        connection.end();
    }
 });

module.exports = router;