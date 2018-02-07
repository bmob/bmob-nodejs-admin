
var domain = require('domain');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routesIndex = require('./routes/index');
var xml2js = require('xml2js');
var utils = require('./lib/utils');
var getBody = require('raw-body');
var errorhandler = require('errorhandler')

// 解析微信的 xml 数据
var xmlBodyParser = function (req, res, next) {

  if (req._body) return next();
  req.body = req.body || {};

  // ignore GET
  if ('GET' == req.method || 'HEAD' == req.method) return next();

  // check Content-Type
  if ('text/xml' != utils.mime(req)) return next();

  // flag as parsed
  req._body = true;

  // parse
  getBody(req, {
    limit: '5mb',
    length: req.headers['content-length'],
    encoding: 'utf8'
  }, function (err, buf) {
    if (err) return next(err);
    var first = buf.trim()[0];

    if (0 == buf.length) {
      return next(utils.error(400, 'invalid xml, empty body'));
    }

    xml2js.parseString(buf,  {explicitArray : false}, function(err, json) {
      if (err) {
          err.status = 400;
          return next(utils.error(400, 'parse xml err:'+err));
      } else {
          req.body = json;
          next();
      }
    });

  });


};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xmlBodyParser);
app.use(require('express-domain-middleware'));
app.use('/', routesIndex);

// app.use(function errorHandler(err, req, res, next) {

//   res.status(500).send("there is an error in callback function");

// });
app.use(errorhandler());



//把端口从3000改为80
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Express server listening on port %d", server.address().port);
});
