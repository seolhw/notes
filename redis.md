# redis 常见命令

| 命令                                     | 描述                                                                |
|------------------------------------------|---------------------------------------------------------------------|
| set [name] [value]                       | 设置储存的键值对                                                    |
| get [name]                               | 通过key获取value                                                    |
| keys                                     | 打印所有的key                                                       |
| DBSIZE                                   | 查看当前数据库的记录数                                              |
| select [n]                               | 切换数据库，redis默认会启动16个数据库                               |
| flushdb                                  | 清空当前数据库                                                      |
| flushall                                 | 清空全部数据库                                                      |
| exists [key]                             | 判断某个key是否存在                                                 |
| expire [key] [time]                      | 判断key的过期时间，time为倒计时，单位是秒                           |
| ttl [key]                                | 获取key的失效倒计时，单位是秒                                       |
| type [key]                               | 获取key的类型                                                       |
| ping                                     | 测试链接状态，返回PONG表示连接成功                                  |
| APPEND [key] [value]                     | 对已有的key，进行追加内容                                           |
| STRLEN [key]                             | 获取key对应的value的长度                                            |
| incr [key]                               | 使value自增1                                                        |
| edcr [key]                               | 使value自减1                                                        |
| incrby [key] [n]                         | 使value自增n                                                        |
| edcrby [key] [n]                         | 使value自减n                                                        |
| GETRANGE [key] [n1] [n2]                 | 获取截取字符串，从index为n1截取到n2,如果n2为-1就是查看所有字符串    |
| SETRANGE [key] [n] [val]                 | 替换字符串，index为n和之后的字符串替换为val                         |
| setex [key] [n] [value]                  | 设置值，和过期时间，n的单位是秒                                     |
| setnx [key] [value]                      | 不存在设置，如果该key已存在，就返回设置失败，否则设置成功           |
| mset [key1] [value1] [key2] [value2] ... | 设置多个值                                                          |
| mget [key1] [key2] ...                   | 获取多个值                                                          |
| msetnx                                   | 同 setnx ，可以批量，有任意一个不成功，则所有设置均不成功，原子操作 |
| getset [key] [value]                     | 先获取值，在设置                                                    |
| lpush                                    | 从头部添加值                                                        |
| lrange                                   | 查看列表的中所有值                                                  |
| rpush                                    | 从尾部添加值                                                        |
| lpop                                     | 从头部移除一个值                                                    |
| rpop                                     | 从尾部移除一个值                                                    |
| lindex                                   | 通过index取数组中的对应值                                           |
| llen                                     | 长度                                                                |
| lrem list 1 one                          | 移除列表中的one，移除1个                                            |
| ltrim                                    | 截取                                                                |
| rpoplpush                                | 移除到列表的最后一个元素，并添加到新的列表中                        |
| smembefs  myset                          | 查看set类型的数据                                                   |
| spop myset                               | 随机删除一个set类型的元素                                           |
| srandmember myset  [n]                   | 随机抽取n个元素                                                     |
| sadd myset value                         | 添加值                                                              |
| smove  myset myset2 value                | 移动值                                                              |
| Sdiff   key1 key2                        | 对比，差集                                                          |
| Sinter   key1 key2                       | 交集                                                                |
| Sunion   key1 key2                       | 并集                                                                |
| hset myhash field1 value1                | 设置hash类型的值                                                    |
| hget myhash field1                       | 获取hash类型的值                                                    |
| hmset myhash field1 value1               | 设置多个hash类型的值                                                |
| hmget myhash field1 field2               | 获取多个hash类型的值                                                |
| hgetall myhash                           | 获取hash所有的值                                                    |
| hdel myhash field1 field2                | 删除hash某些值                                                      |
| hlen myhash                              | 删除hash某些值                                                      |
| hexists myhash                           | 判断hash的某个字段是否存在                                          |
| hkeys myhash                             | 获取hash的所有字段                                                  |
| hvalues myhash                           | 获取hash的所有值                                                    |
| Hincrby myhash   field1    1             | 自增1                                                               |
| hsetnx myhash field1 value1              | 不存在才会设置，存在会报错                                          |
| zset                                     | 有序集合                                                            |
| zadd                                     | 有序几个添加                                                        |
| zrange                                   | 查看有序集合                                                        |
| zrangbyscore                             | 排序                                                                |
| zrem                                     | 移除zset的元素                                                      |
| zcard                                    | 有序集合中的元素个数                                                |
| zrevrange                                | 从大到小排序                                                        |
| zcount                                   | 个数                                                                |
| geoadd                                   | 添加地理位置数据                                                    |
| geopos                                   | 获取地理位置数据                                                    |
| geodist                                  | 计算两地距离                                                    |




