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
    "registerNumber": "1601124",
    "name": "Mohan Ram M",
    "dept": "BE - COMPUTER SCIENCE AND ENGINEERING",
    "email": "mohanram.1601124@srec.ac.in",
    "mobile": "9790442789",
    "blood": "A+ve",
    "batch": "2016",
    "address": "M.R.Nilayam, 3/232C, A.S.Nagar, Pattanam, Ondipudur, Coimbatore - 641016",
    "accountNumber": "8956423612341234",
    "parentName": "Murugesan S",
    "parentMobile": "9894105648",
    "dateOfBirth": "13/11/1998",
    "status": "Regular",
    "quota": "Government",
    "medium": "English",
    "dateOfJoining": "03/08/2016",
    "community": "BC",
    "religion": "Hinduism",
    "gender": "Male"
}*/ //for user creation

router.post('/', jsonParser, function(req, res){
    
    if(!req.body){
       res.status(400);
       res.json({message: "Bad Request"});
    } else {

        var receivedJson = req.body;
        var query = `
            INSERT INTO studentDetails(
                registerNumber,
                name,
                dept,
                email,
                mobile,
                blood,
                batch,
                address,
                accountNumber,
                parentName,
                parentMobile,
                dateOfBirth,
                status,
                quota,
                medium,
                dateOfJoining,
                community,
                religion,
                gender
            )
            VALUES(
                '` + receivedJson["registerNumber"] + `',
                '` + receivedJson["name"] + `',
                '` + receivedJson["dept"] + `',
                '` + receivedJson["email"] + `',
                '` + receivedJson["mobile"] + `',
                '` + receivedJson["blood"] + `',
                '` + receivedJson["batch"] + `',
                '` + receivedJson["address"] + `',
                '` + receivedJson["accountNumber"] + `',
                '` + receivedJson["parentName"] + `',
                '` + receivedJson["parentMobile"] + `',
                '` + receivedJson["dateOfBirth"] + `',
                '` + receivedJson["status"] + `',
                '` + receivedJson["quota"] + `',
                '` + receivedJson["medium"] + `',
                '` + receivedJson["dateOfJoining"] + `',
                '` + receivedJson["community"] + `',
                '` + receivedJson["religion"] + `',
                '` + receivedJson["gender"] + `'
            )
        `;
        
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