# mongodb的相关命令

|命令|描述|
|--|--|
|show dbs | 打印数据库列表 |
|show collections| 显示数据库中所有的集合 |
|show users|显示当前数据库中的用户|
|show profile|显示最新的系统。时间>= 1ms的配置文件条目|
|use [db_name] |设置当前数据库|
|exit|退出命令|
|db.[collections_name].find([搜索条件])| 查找集合内的数据 |
|db.serverStatus()|查看数据库状态|
|db.[collections_name].find().sort({"字段名":-1})|对查询结果排序，-1为降序，1为倒序|
|db.[collections_name].find().limit([num])|查询前面num条数据|
|db.[collections_name].find().skip([num])|跳过num条数据，从第 num+1 条数据开始查询|
|db.dropDatabase()|删除数据库|
|db.[collections_name].drop()|删除集合|
|db.[collections_name].find().limit(10).skip(20)|用于分页，跳过20条数据，查询10条数据|
|db.[collections_name].findOne()|查询一条数据|
|db.[collections_name].find().count()|统计数量|
|db.[collections_name].update({查找条件},{完整替换或$set替换部分数据})|更新数据|
|db.[collections_name].update({查找条件},{$unset:{a:1}})|删除该条记录的a字段|
|db.[collections_name].dropIndex({查找索引})|删除索引|
|db.[collections_name].getIndexes()|获取索引|
|db.[collections_name].find().explain("executionStats")|分析索引的性能|
|db.[collections_name].ensureIndex({"索引字段名":1},{"unique: 唯一索引"})|设置索引，unique缺省为false，为true时创建唯一索引|
|db.[collections_name].createIndex({key: 1(1为升序，-1为降序)}，{"unique: true(唯一索引为true,默认为false)"})|设置索引|
|db.[collections_name].remove()|删除数据|
|db.[collections_name].find().pretty()|格式化输出|
|db.[collections_name].insert()|插入数据|
|use admin / db.auth("admin","123456")| 授权,注意授权前需要切换数据库到admin |
|db.createUser({user: "root",pwd: "123456",roles: [{ role: "readWrite", db: "mydb" }]})| 创建一个用户 |
|use admin db.shutdownServer | 关机 |
|||
|||
|||
|||





| 条件操作符 | 描述     |
| ---------- | -------- |
| $gt        | 大于     |
| $lt        | 小于     |
| $gte       | 大于等于 |
| $lte       | 小于等于 |
| $eq        | 等于     |
| $in           | 判断元素是否在指定集合内          |
| $all           | 判断数组是否包含某几个元素，无关顺序          |
| $nin           | 判断元素是否不在指定的集合范围里          |
| $ne           | 不等于，不匹配参数条件        |
| $not          | 不匹配结果        |
| $or           | 有一个条件成立则匹配        |
| $nor           | 所有条件都不匹配        |
| $and           | 所有条件都必须匹配        |
| $exists           | 判断元素是否存在        |
| .           | 子文档匹配        |
| $regex          | 正则表达式匹配        |

| 更新操作符 | 描述     |
| ---------- | -------- |
| $set       | 需要更新的字段     |


| mongod命令                   | 描述                        |
| --------------------------- | --------------------------- |
| mongod restart              | 重启mongo server            |
| mongod --shutdown           | 关闭服务器                  |
| mongod --config [-f] <path> | 加载config文件              |
| mongod --port <portId>      | 指定端口号                  |
| mongod --bind_ip <bindIp>   | 绑定IP地址，默认是localhost |
| mongod --logpath <logPath>  | 指定log输出地址             |
| mongod --dbpath <dbpath>    | 指定数据库储存文件          |
| service mongod start        | 启动mongodb                            |
| cat /var/log/mongodb/mongod.log | 查看某个文件的内容      |
| service mongod stop | 停止mongodb  |
| service mongod restart | 重启mongodb  |
