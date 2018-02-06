var BC = require('bmob');

BC.Function.define("getUserList",
    function onRequest(request,response,modules){
        //获取数据库对象
        var db = modules.oData;

        db.getAllUser(function(err,data){         //回调函数
            response.send(JSON.parse(data));
        });
});

module.export = BC.Function;