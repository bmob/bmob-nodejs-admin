/*
 * GET home page.
 */


var BC = require('bmob-nodejs');
var jwt = require('jsonwebtoken')
var express = require('express');
var router = express.Router();

router.use('/', require('../api/user'));
router.use('/', require('../api/feedback'));

BC.initialize('39ee83f92ff3a195130596a4eaec5ddf', 'a1223fca87f5d229953817f5c2493446', '0b75514a665a8762e6d14329c34a41f7');

router.all('*',function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
	}
	else {
        //token验证,所有不是登录的请求都需要验证token
        if(req.params[0] != "/login"){
            var token = req.headers.authorization
            jwt.verify(token, 'bmob-nodejs-admin', function(err, decode){
                if (err) {  //  时间失效的时候/ 伪造的token
                    res.status(401).send('unauthorization');
                } else {
                    next()
                }
            })
        }else{
            next()
        }
	}
});
module.exports = router;