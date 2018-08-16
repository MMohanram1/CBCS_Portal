var express = require('express');
var app = express();

app.use('/', express.static('./views/public'));
app.use('/assets', express.static('./views/assets'));

var loginCreate = require('./models/login/loginCreate.js');
var loginDelete = require('./models/login/loginDelete.js');
var loginVerify = require('./models/login/loginVerify.js');
var loginRead = require('./models/login/loginRead.js');
var loginUpdate = require('./models/login/loginUpdate.js');
var studentCreate = require('./models/student/studentCreate.js');
var studentDelete = require('./models/student/studentDelete.js');
var studentRead = require('./models/student/studentRead.js');
var studentUpdate = require('./models/student/studentUpdate.js');

app.use('/api/login/create', loginCreate);
app.use('/api/login/delete', loginDelete);
app.use('/api/login/verify', loginVerify);
app.use('/api/login/read', loginRead);
app.use('/api/login/update', loginUpdate);
app.use('/api/student/create', studentCreate);
app.use('/api/student/delete', studentDelete);
app.use('/api/student/read', studentRead);
app.use('/api/student/update', studentUpdate);

app.listen(3000);