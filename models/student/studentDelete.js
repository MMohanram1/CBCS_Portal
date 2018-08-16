var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
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
    "registerNumber": "1601124"
 }*/ //for user deletion

 router.post('/', jsonParser, function(req, res){
    
    if(!req.body){
       res.status(400);
       res.json({message: "Bad Request"});
    } else {

        var receivedJson = req.body;
        var query = "DELETE FROM studentDetails WHERE registerNumber='" + receivedJson["registerNumber"] + "'";
        
        console.log(query);

        connection.connect();

        connection.query(query, function (error, results, fields) {

            if (error){
                throw error;
                res.status(400);
                res.json({"status":400,"desc":"Error"});
            }

            res.status(200);
            res.json({"status":200,"desc":"Success"});
        })

        connection.end();
    }
 });

module.exports = router;