# bmob nodejs测试环境搭建教程


## 修改相应的配置文件

在 routes/function.js中，把后台中的配置填入下面：

```
/**
* initialize SDK
*/
BC.initialize('Application ID', 'REST API Key');
```

## 增加云端代码文件

如果在云端代码编辑器中，有个名为“findone”的方法如下：
```
function onRequest(request, response, modules) {
    var db = modules.oData;
    var objectId = request.body.objectId;
    db.findOne({
     "table":"GameScore",
     "objectId":objectId
    },function(err,data){ 
     
     response.send(data);
    });

}           
```


则在 routes文件夹下，创建一个名为"function_函数名.js"文件，在这个例子中是创建route/function_findone.js文件, 模板如下：
```
var BC = require('bmob');

BC.Function.define("findone",
	function onRequest(request, response, modules) {
	    var db = modules.oData;
	    var objectId = request.body.objectId;
	    db.findOne({
	     "table":"GameScore",
	     "objectId":objectId
	    },function(err,data){ 
	     
	     response.send(data);
	    });
	
	}
});

module.export = BC.Function;

```

## 启动测试环境

### 下载nodejs 4.4.3版本

根据自身的操作系统选择合适的nodejs版本，
[https://nodejs.org/dist/v4.4.3/](https://nodejs.org/dist/v4.4.3/ "nodejs 4.4.3")

注意：现在云逻辑套餐升级后使用的是nodejs 4.4.3,使用其他版本的nodejs不一定合适。

### 安装nodejs

在window下根据安装文件的提示一步一步安装即可。

### 运行demo

假设工程的文件夹是D:\nodejs，则进入D:\nodejs文件夹后在命令行窗口运行下面的命令：

```
node app.js
```

## 测试

### post方式调用云端代码

使用curl工具调用云端代码

```
curl -X POST \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'objectId=gHcW111B' \
    http://127.0.0.1:80/findone
```

上面表示调用方面名为“findone”的云端代码，传入参数objectId=gHcW111B, 使用的是post方式

### get方式调用云端代码

在浏览器中输入下面的网址：

```
http://127.0.0.1:80/findone?objectId=gHcW111B
```

上面表示调用方面名为“findone”的云端代码，传入参数objectId=gHcW111B, 使用的是get方式