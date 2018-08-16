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
    user: "1601124",
    password: "Srec@123",
    type: "student"
}*/ //for user creation

router.post('/', jsonParser, function(req, res){
    
    if(!req.body){
       res.status(400);
       res.json({message: "Bad Request"});
    } else {

        var receivedJson = req.body;
        var query = "INSERT INTO login(registerNumber,userPassword,role) VALUES( '" + receivedJson["user"] + "',MD5('" + receivedJson["password"] + "'),'student')";
        
        console.log(query);

        connection.connect();

        connection.query(query, function (error, results, fields) {

            if (error){
                throw error;
                res.status(400);
                res.json({"status":400,"desc":"Error"});
            }

            res.status(201);
            res.json({"status":201,"desc":"Success"});
        })

        connection.end();
    }
 });

module.exports = router;