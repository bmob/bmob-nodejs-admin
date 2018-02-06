var BC = require('bmob');
var utils = require('../lib/utils');

BC.Function.define("signUp",
    function onRequest(request,response,modules){
        //获取数据库对象
        var db = modules.oData;

        var username = request.body.username;
        var password = utils.md5(request.body.password);

        db.userSignUp({
            "data":{
                "username":username,
                "password":password
            }
        },function(err,data){         //回调函数
            response.send(JSON.parse(data));
        });
});

module.export = BC.Function;
