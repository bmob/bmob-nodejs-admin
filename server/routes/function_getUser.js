var BC = require('bmob');

BC.Function.define("getUser",
    function onRequest(request,response,modules){
        //获取数据库对象
        var db = modules.oData;

        var objectId = request.query.objectId;

        db.getUserByObjectId({
            "objectId":objectId           //记录的objectId
        },function(err,data){           //回调函数
            response.send(JSON.parse(data));
        });
});

module.export = BC.Function;