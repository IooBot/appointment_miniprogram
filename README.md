## appointment (mini-program)
with graphql, raw miniprogram language

<div align="center">
    <img src="https://github.com/kulley/imgs/blob/master/appointment-mp-1.jpg" width="190" >
    <img src="https://github.com/kulley/imgs/blob/master/appointment-mp-2.jpg" width="190">
    <img src="https://github.com/kulley/imgs/blob/master/appointment-mp-3.jpg" width="190" >
 </div>

 ## schema
 ### server 服务个体
 字段含义 | 字段名 | 字段类型 | 字段描述
 ---|---|--- |---|---|--- |---
 服务标识 | id | ID | key
 服务名称 | name | String | non-null
 服务描述  | description | String |
 服务图片 | img | String
 创建时间 | createdAt | String | non-null
 更新时间 | updatedAt | String

 ### service 服务列表
 字段含义 | 字段名 | 字段类型 | 字段描述
 ---|---|--- |---|---|--- |---
 服务标识 | id | ID | key
 服务个体标志 | server_id | ID | non-null
 库存 | repertory_id | ID | non-null
 服务描述|description|String|
 服务价格 | price | float| non-null
 服务开始时间 | startTime | String | non-null
 服务持续时间 | lastTime | String | non-null
 创建时间 | createdAt | String | non-null
 更新时间 | updatedAt | String


 ### repertory 服务库存
 字段含义 | 字段名 | 字段类型 | 字段描述|
 --- | --- |--- |--- |--- |--- |---
 库存标识 | id | ID | key
 服务标识 | service_id | ID | non-null
 数量 | count | int | non-null
 创建时间 | createdAt | String | non-null
 更新时间 | updatedAt | String


 ## 用户有关
 ### user 用户表
 字段含义 | 字段名 | 字段类型 | 字段描述
 ---|---|--- |---|---|--- |---
 用户标识 | id | ID | key
 用户微信标识 | openid | String |
 管理员标志 | admin | Stringr |
 用户名 | username | String |
 密码 | password | String |
 昵称 | nickname | String |
 手机号码  | telephone | String |
 邮箱 | email | String |
 创建时间 | createdAt | String | non-null
 更新时间 | updatedAt | String |


 ### order 预约订单表

 字段含义 | 字段名 | 字段类型 | 字段描述|
 ---|---|--- |---|---|--- |---
 订单编号 | id | ID | key
 顾客标识| user_id | ID|non-null
 预约的服务| service_id | ID |non-null
 订单状态 | orderStatus | String
 客户留言 | remark | String
 预约人数 | customerNumber | int
 订单联系人| contactName | String | non-null
 订单联系人电话 | contactTelephone | String | non-null
 订单付款金额 | payCount | String
 订单付款状态 | payStatus | String
 付款时间 | payTime | String
 订单创建时间 | createdAt | String | non-null
 更新时间 | updatedAt | String


 ```
 name,type,description
 server,collection,
 id,ID,key
 name,String,non-null
 description,String,
 img,String,
 createdAt,String,non-null
 updatedAt,String,
 service,collection,
 id,ID,key
 server_id,ID,non-null
 repertory_id,ID,non-null
 description,String,
 price,float,non-null
 startTime,String,non-null
 lastTime,String,non-null
 createdAt,String,non-null
 updatedAt,String,
 repertory,collection,
 id,ID,key
 service_id,ID,non-null
 count,int,non-null
 createdAt,String,non-null
 updatedAt,String,
 user,collection,
 id,ID,key
 openid,String,
 admin,String,
 username,String,
 password,String,
 telephone,String,
 email,String,
 createdAt,String,non-null
 updatedAt,String,
 order,collection,
 id,ID,key
 user_id,ID,
 service_id,ID,
 orderStatus,String,
 remark,String,
 customerNumber,int,
 contactName,String,non-null
 contactTelephone,String,non-null
 payCount,String,
 payStatus,String,
 payTime,String,
 createdAt,String,non-null
 updatedAt,String,
 ```