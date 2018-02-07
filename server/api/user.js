var express = require('express')
var router = express.Router()
var BC = require('bmob');
var utils = require('../lib/utils');
// var jwt = require('jsonwebtoken')
// var bcrypt = require('bcryptjs')

// 获取全部用户信息
router.get('/users', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    var modules = BC.getModules(BC);
    var db = modules.oData;

    db.getAllUser(function(err,data){         //回调函数
        res.send(JSON.parse(data));
    });
})

//获取单个用户信息
router.get('/users/:id', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var objectId = req.params.id;
    db.getUserByObjectId({
        "objectId":objectId             //记录的objectId
    },function(err,data){               //回调函数
        res.send(JSON.parse(data));
    });
})

//登录
router.post('/login', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var username = req.body.username;
    var password = req.body.password;

    db.userLogin({
        "username":username,              //登录用户名
        "password":password,              //用户密码
    },function(err,data){                 //回调函数
        res.send(JSON.parse(data));
    });
})

//注册，增加用户
router.post('/signUp', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var username = req.body.username;
    var password = req.body.password;

    db.userSignUp({
        "data":{
            "username":username,
            "password":password
        }
    },function(err,data){         //回调函数
        res.send(JSON.parse(data));
    });
})

// 修改
router.put('/users/:id', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var objectId = req.params.id;
    var sessionToken = req.headers.sessiontoken;
    var data = req.body;
    db.setHeader({"X-Bmob-Session-Token":sessionToken});//需要设置登录之后获取的sessionToken头信息

    db.updateUserByObjectId({
        "objectId":objectId,                        //记录的objectId
        "data":data                                 //需要更新的数据，格式为JSON
    },function(err,data){                           //回调函数
        res.send(JSON.parse(data));
    });
})


// 删除一个用户
router.delete('/users/:id', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var objectId = req.params.id;
    var sessionToken = req.headers.sessiontoken;
    db.setHeader({"X-Bmob-Session-Token":sessionToken});//需要设置登录之后获取的sessionToken头信息

    db.removeUserByObjectId({
        "objectId":objectId                 //记录的objectId
    },function(err,data){                   //回调函数
        res.send(JSON.parse(data));
    });
})

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

module.exports = router