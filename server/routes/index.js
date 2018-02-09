/*
 * GET home page.
 */


var BC = require('bmob-nodejs');

var express = require('express');
var router = express.Router();

BC.initialize('39ee83f92ff3a195130596a4eaec5ddf', 'a1223fca87f5d229953817f5c2493446', '0b75514a665a8762e6d14329c34a41f7');

router.all('*',function (req, res, next) {

    //token验证,所有不是登录的请求都需要验证token
    if(req.method !== 'OPTIONS'){
        if(req.params[0] != "/login"){
        var token = req.headers.authorization
            try{
                var decode = jwt.verify(token, 'bmob-nodejs-admin')
            }
            catch(e)
            {
                res.Status =
            }
        }
    }



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