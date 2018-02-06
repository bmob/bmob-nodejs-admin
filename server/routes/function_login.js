var BC = require('bmob');
var utils = require('../lib/utils');

BC.Function.define("login",
    function onRequest(request,response,modules){
        //获取数据库对象
        var db = modules.oData;

        var username = request.body.username;
        var password = utils.md5(request.body.password);

        db.userLogin({
            "username":username,              //登录用户名
            "password":password,              //用户密码
        },function(err,data){                 //回调函数
            response.send(JSON.parse(data));
        });
});

module.export = BC.Function;
