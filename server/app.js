var domain = require('domain');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routesIndex = require('./routes/index');
var xml2js = require('xml2js');
var utils = require('./lib/utils');
var getBody = require('raw-body');
var errorhandler = require('errorhandler');
var userRoutes = require('./api/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-domain-middleware'));
app.use('/', routesIndex);
app.use('/', userRoutes);

// app.use(function errorHandler(err, req, res, next) {

//   res.status(500).send("there is an error in callback function");

// });


// app.all('*',function (req, res, next) {
//     res.send('111');
//     //token验证
//     var token = req.headers.adminsessiontoken
//     try{
//         var decode = jwt.verify(token, 'bmob-nodejs-admin')
//     }
//     catch(e)
//     {
//         res.send(e);
//     }
// });

app.use(errorhandler());



//把端口从3000改为80
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Express server listening on port %d", server.address().port);
});
