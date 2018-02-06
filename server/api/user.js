var express = require('express')
var router = express.Router()
var BC = require('bmob');
var utils = require('../lib/utils');
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

// // 获取单个信息
// router.get('/users/:id', (req, res, next) => {
//   var id = req.params.id
//   User.findById({ _id: id }).then(user => {
//     res.send(user)
//   }).catch(next)
// })

// // 获取单个用户，通过token, 和query，通过query查询其他用户
// router.get('/user', (req, res, next) => {
//   var token = req.headers.accesstoken
//   var decode = jwt.verify(token, 'vnpastime')
//   var name = decode.name
//   User.findOne({ name: name }).then(user => {
//     res.send(user)
//   }).catch(next)
// })

// // 添加一个用户,用户登录,注册
// router.post('/users', (req, res, next) => {
//   var username = req.body.username
//   var password = req.body.password
//   if (type === 'signin') { // 登录
//     User.findOne({ name: username }).then(user => {
//       if (user != null) {
//         if (!bcrypt.compareSync(password, user.password)) { // 如果密码错误，返回状态给前端
//           res.json({
//             success: false,
//             message: '认证失败，密码错误'
//           })
//         } else { // 密码正确
//           var userToken = {
//             name: user.name,
//             id: user._id
//           }
//           // 密钥
//           var secret = 'vnpastime'
//           // 生成token,可以在加一个设置失效日期
//           var token = jwt.sign(userToken, secret)
//           res.json({
//             success: true,
//             message: '登录成功',
//             token: token
//           })
//         }
//       } else {
//         res.json({
//           success: false,
//           message: '用户不存在'
//         })
//       }
//     }).catch(next)
//   } else if (type === 'signup') { // 注册
//     User.findOne({name: username}).count().then(count => {
//       if (count > 0) {
//         res.json({
//           success: false,
//           message: '用户名已存在'
//         })
//       } else {
//         // 密码加盐处理
//         var salt = bcrypt.genSaltSync(10)
//         var hash = bcrypt.hashSync(password, salt)
//         var userInfo = {
//           name: username,
//           password: hash,
//           avatar_url: 'http://i1.fuimg.com/605011/1f0138a7b101b0f1.jpg'
//         }
//         User.create(userInfo).then(user => {
//           var userToken = {
//             name: user.name,
//             id: user._id
//           }
//           // 密钥
//           var secret = 'vnpastime'
//           // 生成token,可以在加一个设置失效日期
//           var token = jwt.sign(userToken, secret)
//           res.json({
//             success: true,
//             message: '注册成功',
//             token: token
//           })
//         })
//       }
//     }).catch(next)
//   }
// })

// // 修改
// router.put('/users/:id', (req, res, next) => {
//   var id = req.params.id
//   User.findByIdAndUpdate({ _id: id }, req.body).then(user => {
//     User.findById({_id: id}).then((user) => {
//       res.send(user)
//     })
//   }).catch(next)
// })

// // 删除一个用户
// router.delete('/users/:id', (req, res, next) => {
//   var id = req.params.id
//   User.findByIdAndRemove({ _id: id }).then(user => {
//     res.send(user)
//   }).catch(next)
// })

module.exports = router