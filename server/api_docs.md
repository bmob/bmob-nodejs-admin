# bmob-nodejs-admin接口文档

## 文档说明


## 用户管理

### 登录

#### 地址

http://127.0.0.1:8080/login

#### 请求

* 请求方式 POST
* 数据格式 x-www-form-urlencoded
* 请求参数

| 名称      | 必填 | 类型     | 说明   |
|:--------|:---|:-------|:-----|
| username | 是  | string | 用户名称 |
| password | 是  | string | 用户密码 |

#### 响应

* 数据格式 JSON
* 数据示例

JSON示例
- 成功返回
```json
{
    "createdAt": "2018-02-06 14:38:08",
    "objectId": "bb0d3e0042",
    "sessionToken": "d2a016de40c0b9a080e788edf299e6c1",
    "updatedAt": "2018-02-06 14:38:08",
    "username": "yjy"
}
```

- 失败返回
```json
{
    "code": 101,
    "error": "username or password incorrect."
}
```

- - -

### 添加管理员（注册用户）

#### 地址

http://127.0.0.1:8080/signUp

#### 请求

* 请求方式 POST
* 数据格式 x-www-form-urlencoded
* 请求参数

| 名称      | 必填 | 类型     | 说明   |
|:--------|:---|:-------|:-----|
| username | 是  | string | 用户名称 |
| password | 是  | string | 用户密码 |


#### 响应

* 数据格式 JSON
* 数据示例

JSON示例
- 成功返回
```json
{
    "createdAt": "2018-02-06 15:22:38",
    "objectId": "349a272243",
    "sessionToken": "f707d581403b0557803edbae928b5d6b"
}
```

- 失败返回
```json
{
    "code": 202,
    "error": "username 'yjy' already taken."
}
```

- - -

### 获取用户列表

#### 地址

http://127.0.0.1:8080/users

#### 请求

* 请求方式 GET

#### 响应

* 数据格式 JSON
* 数据示例

```json
{
	"results": [
        {
            "authData": {
                "weapp": {
                    "expires_in": 7200,
                    "openid": "ohlYa0cGBqTngBSMpTLtEPxUoPbc",
                    "session_key": "1lRpan/TJnfSXlhaW01yiA=="
                }
            },
            "createdAt": "2017-06-08 16:16:40",
            "nickName": "magic",
            "objectId": "303798ba84",
            "openid": "ohlYa0cGBqTngBSMpTLtEPxUoPbc",
            "updatedAt": "2017-06-08 18:22:56",
            "userPic": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpg0DmlT4IT7RLDy8NZPt5ehb0UpXc4jkbRAB12lLA3IxQQu6K0FYl6xIzm8fXEeL7PEeGtRfmA/0",
            "username": "0ea0f015b5ff5d7b"
        },
        {
            "authData": {
                "weapp": {
                    "expires_in": 7200,
                    "openid": "oUBzr0JpidGlgRRgGIyxfkzuHI1Q",
                    "session_key": "pkz2+M7KJqSq1zgkC6YnGA=="
                }
            },
            "createdAt": "2017-07-13 15:35:56",
            "nickName": "magic",
            "objectId": "2cf892ed00",
            "openid": "oUBzr0JpidGlgRRgGIyxfkzuHI1Q",
            "updatedAt": "2018-01-26 11:31:59",
            "userPic": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epAdlVeNZWaewQktkjXqAZOhO9sB3s5SMyyk8sevic5dn9HcqSkySx1IZ7g9GHGZiaITNxavzhDy2uw/0",
            "username": "3f83060cf7970e32"
        },
	]
}
```

- - -

### 获取单个用户信息

#### 地址

http://127.0.0.1:8080/users/objectid

#### 请求

* 请求方式 GET

#### 响应

* 数据格式 JSON
* 数据示例

```json
{
    "createdAt": "2018-02-06 17:48:20",
    "objectId": "c0b4c10053",
    "updatedAt": "2018-02-07 10:03:52",
    "username": "kokp"
}
```

- - -

### 修改用户信息(必须在header头设置sessionToken，登录返回的sessionToken)

#### 地址

http://127.0.0.1:8080/users/objectid

### curl例子

```
curl -X PUT \
  http://127.0.0.1:8080/users/c0b4c10053 \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'sessiontoken: 2b1716cf40c1a9fc804dbba86e609c0e' \
  -d username=koko
```

#### 请求

* 请求方式 PUT
* 数据格式 x-www-form-urlencoded
* 请求参数

- body
```
{
  key1 : value1,
  key2 : value2,
  ...
}
```

#### 响应

* 数据格式 JSON
* 数据示例

JSON示例
- 成功返回
```json
{
    "updatedAt": "2018-02-07 10:03:52"
}
```

- 失败返回
```json
{
    "code": 202,
    "error": "username 'kokp' already taken."
}
```

- - -

### 删除一个用户(必须在header头设置sessionToken，登录返回的sessionToken)

#### 地址

http://127.0.0.1:8080/users/objectid

### curl例子

```
curl -X DELETE \
  http://127.0.0.1:8080/users/c0b4c10053 \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'sessiontoken: 2b1716cf40c1a9fc804dbba86e609c0e'
```

#### 请求

* 请求方式 DELETE
* 数据格式 x-www-form-urlencoded

#### 响应

* 数据格式 JSON
* 数据示例

JSON示例
- 成功返回
```json
{
    "msg": "ok"
}
```