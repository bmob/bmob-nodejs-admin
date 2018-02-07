# Bmob后端云nodejs版本管理后台

> 本管理后台，基于Bmob后端云、nodejs、VUE等技术研发

**演示地址:** http://bmob.cn


## 相关文档：
[Bmob 后端云nodejs 操作数据库文档](http://doc.bmob.cn/cloud_function/web/develop_doc/#_7)


[目前本源码实现APi文档](https://github.com/bmob/bmob-nodejs-admin/blob/master/server/api_docs.md)

## 项目运行:

### 编译安装-前台

``` bash

# Clone project
git clone https://github.com/PanJiaChen/vueAdmin-template.git

# Install dependencies
npm install

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 编译安装-后台

``` bash
//进入server文件夹
node app.js
```

### 修改为自己的Appid
``` bash
//进入server文件夹routes
BC.initialize("你的Application ID", "你的REST API Key", "超级权限传入Master Key");

```

## 目录说明
本项目保持 Vue 原生项目结构
```
.
├── LICENSE
├── README-zh.md
├── README.md
├── build
├── config
├── favicon.ico
├── index.html
├── node_modules    //前端依赖模块
├── package-lock.json
├── package.json
├── server          //服务端目录
│   ├── LICENSE
│   ├── README.md
│   ├── api
│   ├── api_docs.md
│   ├── app.js
│   ├── lib
│   ├── node_modules    //服务端依赖模块
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── routes
│   └── views
├── src
└── static
```
## Demo
![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra
如果你想要路由器生成菜单的用户角色,您可以使用这个分支[权限控制](https://github.com/PanJiaChen/vueAdmin-template/tree/permission-control)，配合Bmob的`Acl`权限管理。

## 相关项目
 [bmob-nodejs-module](https://github.com/bmob/bmob-nodejs-module)
 [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)



## License
[MIT](https://github.com/PanJiaChen/vueAdmin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen
