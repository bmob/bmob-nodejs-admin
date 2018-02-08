/*
 * GET home page.
 */

var BC = require('bmob-nodejs');

var express = require('express');
var router = express.Router();

BC.initialize('89d05ff35e3d88c42564722df6f44a3a', 'f66acc8498ed2381cea1edf390b428bc', 'b02d2789cacf5424557d47b34cc13df5');

router.all('*',function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
	if (req.method == 'OPTIONS') {
	  res.send(200); /让options请求快速返回/
	}
	else {
	  next();
	}
  });
module.exports = router;