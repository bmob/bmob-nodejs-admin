var express = require('express')
var router = express.Router()
var utils = require('../lib/utils')
var BC = require('bmob-nodejs');
// var bcrypt = require('bcryptjs')

// 获取用户列表信息
router.get('/feedbackList', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var where = req.query.where ? JSON.parse(req.query.where) : {};
    var order = req.query.order ? JSON.parse(req.query.order) : "-createdAt";   //默认根据时间降序
    var limit = req.query.limit ? req.query.limit : 10;                         //默认10条
    var page  = req.query.page  ? req.query.page : 1;                           //默认第1页
    var skip  = (page-1)*limit;

    db.find({
        "table":"feedback",                     //表名
        "where":where,                          //查询条件是一个JSON object
        "order":order,                          //排序列表，[-]字段名称,-表示降序，默认为升序
        "limit":limit,                          //limit大小，一页返回多少条记录，默认为0
        "skip":skip,                            //skip,分页offset，(page-1)*limit
        "count":1                               //count,只返回符合条件的记录总数
    },function(err,data){                       //回调函数
        res.send(JSON.parse(data));
    });

})



//获取单个反馈信息
router.get('/feedback/:id', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var objectId = req.params.id;
    db.findOne({
        "table":"feedback",                     //表名
        "objectId":objectId                     //记录的objectId
    },function(err,data){                       //回调函数
        res.send(JSON.parse(data));
    });
})


// 修改
router.put('/feedback/:id', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var objectId = req.params.id;
    var data = req.body;

    db.update({
        "table":"feedback",                     //表名
        "objectId":objectId,                    //记录的objectId
        "data":data                             //需要更新的数据，格式为JSON
    },function(err,data){                       //回调函数
        res.send(JSON.parse(data));
    });
})


// 删除一条反馈
router.delete('/feedback/:id', (req, res, next) => {
    var modules = BC.getModules(BC);
    var db = modules.oData;

    var objectId = req.params.id;

    db.remove({
        "table":"feedback",                     //表名
        "objectId":objectId                     //记录的objectId
    },function(err,data){                       //回调函数
        res.send(JSON.parse(data));
    });
})

module.exports = router