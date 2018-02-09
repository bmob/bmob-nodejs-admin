var express = require('express')
var router = express.Router()
var utils = require('../lib/utils')
var jwt = require('jsonwebtoken')
var BC = require('bmob-nodejs');
// var jwt = require('jsonwebtoken')
// var bcrypt = require('bcryptjs')

// 获取全部用户信息
router.get('/users', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;


    db.getAllUser(function(err,data){         //回调函数
        res.send(JSON.parse(data));
    });
})

// 获取用户列表信息
router.get('/usersList', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var where = req.query.where ? JSON.parse(req.query.where) : {};
    var order = req.query.order ? JSON.parse(req.query.order) : "-createdAt";   //默认根据时间降序
    var limit = req.query.limit ? req.query.limit : 10;                         //默认10条
    var page  = req.query.page  ? req.query.page : 1;                           //默认第1页
    var skip  = (page-1)*limit;

    db.find({
        "table":"_User",                        //表名
        "where":where,                          //查询条件是一个JSON object
        "order":order,                          //排序列表，[-]字段名称,-表示降序，默认为升序
        "limit":limit,                          //limit大小，一页返回多少条记录，默认为0
        "skip":skip,                            //skip,分页offset，(page-1)*limit
        "count":1                               //count,只返回符合条件的记录总数
    },function(err,data){                       //回调函数
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
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var username = req.body.username;
    var password = req.body.password;

    db.userLogin({
        "username":username,              //登录用户名
        "password":password,              //用户密码
    },function(err,data){                 //回调函数
        var userToken = {
            name: data.username,
            id: data.objectId
          }
        // 密钥
        var secret = 'bmob-nodejs-admin'
        var token = jwt.sign(userToken, secret)
        var data = JSON.parse(data);
        if(data.code != 101){
            data.adminSessionToken = token
        }
        res.send(data);
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



module.exports = router