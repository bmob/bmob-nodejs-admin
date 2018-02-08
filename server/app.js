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
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

//   if (req.method == 'OPTIONS') {
//     res.send(200); /让options请求快速返回/
//   }
//   else {
//     next();
//   }
// });

app.use(errorhandler());



//把端口从3000改为80
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Express server listening on port %d", server.address().port);
});
