## 检索数据（SELECT）

| 语句                                                         | 含义                                        |
| ------------------------------------------------------------ | ------------------------------------------- |
| SELECT prod_name FROM products                               | 从products表中检索一个名为prod_name的列     |
| SELECT prod_name,prod_id FROM products                       | 检索多个列，列名之间必须以逗号分隔          |
| SELECT * FROM products                                       | 检索所有列                                  |
| SELECT DISTINCT prod_name FROM products                      | 检索不同行，DISTINCT关键字会自动过滤重复行  |
| SELECT prod_name FROM products LIMIT 5                       | 限制结果，返回前5行                         |
| SELECT prod_name FROM products LIMIT 5,5                     | 返回从5行开始的5行（检索出来的第一行为行0） |
| SELECT prod_name FROM products LIMIT 5 OFFSET 5              | 同上，另一种写法                            |
| SELECT COUNT(*) AS num_items,MIN(prod_price) AS price_min,MAX(prod_price) AS price_max,AVG(prod_price) AS price_avg  FROM products | 组合聚焦函数                                |

## 排序检索数据（ORDER BY）

| 语句                                                         | 含义                                             |
| ------------------------------------------------------------ | ------------------------------------------------ |
| SELECT prod_name FROM products ORDER BY prod_name            | 对prod_name列以字母顺序排序                      |
| SELECT prod_id,prod_price,prod_name FROM products ORDER BY prod_price,prod_name | 多列排序，先按照价格排序再按照姓名排序           |
| SELECT prod_id,prod_price,prod_name FROM products ORDER BY prod_price DESC | 指定排序方向，默认升序，DESC关键字，指定降序排序 |
| SELECT prod_price FROM products ORDER BY prod_price DESC LIMIT 1 | 返回最昂贵物品的值                               |

## 过滤数据（where）

| 语句                                                         | 含义                                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| SELECT * FROM products WHERE prod_price=2.50                 | 返回价格值为2.5的行                                |
| SELECT * FROM products WHERE prod_price prod_price BETWEEN 5 AND 10 | 范围值检查，检索价格在5美元和10 美元之间的所有商品 |
| SELECT * FROM products WHERE prod_price prod_price IS NULL   | 空值检查                                           |
| SELECT * FROM products WHERE vend_id=1003 AND prod_price<=10 | 由供应商1003制造且价格小于等于10美元的所有产品     |
| SELECT * FROM products WHERE vend_id=1002 OR vend_id=1003    | 由供应商1003或1002制造的所有商品                   |
| SELECT * FROM products WHERE vend_id IN (1002,1003)          | 同上                                               |
| SELECT * FROM products WHERE vend_id NOT IN (1002,1003)      | 不是由供应商1003或1002制造的所有商品               |
| SELECT * FROM products WHERE prod_name LIKE 'jet%'           | 找出所有以词jet起头的产品                          |
| SELECT * FROM products WHERE prod_name REGEXP '^[0-9\\.]'    | 找出以一个数（包括小数点开始的数）开始的所有产品。 |
| SELECT AVG(prod_price) AS avg_price FROM products            | 返回products表中所有产品的平均价格                 |
| SELECT AVG(DISTINCT prod_price) AS avg_price FROM products WHERE vend_id=1003 | 聚焦不同的值，来计算平均值                         |

WHERE子句操作符

| 操作符  | 说明               |
| ------- | ------------------ |
| =       | 等于               |
| <>      | 不等于             |
| !=      | 不等于             |
| <       | 小于               |
| <=      | 小于等于           |
| >       | 大于               |
| >=      | 大于等于           |
| BETWEEN | 在指定的两个值之间 |

逻辑操作符

| 操作符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| AND    | 附件条件，同时满足                                           |
| OR     | 检索匹配任一条件的行，优先级比AND低，可以使用（）提高优先级  |
| IN     | 用来指定条件范围，范围中的每个条件都可以进行匹配。IN取合法值的由逗号分隔的清单，全都括在圆括号中，比OR语法更清楚直观，执行更快。 |
| NOT    | 否定它之后所跟的任何条件                                     |

通配符

| 通配符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| %      | 表示任何字符出现任意次数，可以在搜索模式中任意位置使用，使用多个 |
| _      | 下划线的用途与%一样，但下划线只匹配单个字符而不是多个字符    |

谓词操作符

| 操作符 | 说明                                               |
| ------ | -------------------------------------------------- |
| LIKE   | 为在搜索语句中使用通配符，必须使用LIKE操作符       |
| REGEXP | 为在搜索语句中使用正则表达式，必须使用REGEXP操作符 |

## 创建计算字段

| 字段   | 语句                                                         | 说明                                    |
| ------ | ------------------------------------------------------------ | --------------------------------------- |
| Concat | SELECT Concat(vend_name,'(',vend_country,')') FROM vendors ORDER BY vend_name | 拼接:按照name（location）这样的格式展示 |
| RTrim  | SELECT Concat(RTrim(vend_name),'(',RTrim(vend_country),')') FROM vendors ORDER BY vend_name | 去掉值右边的所有空格                    |
| RLrim  |                                                              | 去掉值左边的所有空格                    |
| AS     | SELECT Concat(RTrim(vend_name),'(',RTrim(vend_country),')')  AS vend_title FROM vendors ORDER BY vend_name | 别名                                    |
| +-*/   | SELECT pro_id,quantity,item_price,quantity*item_price AS expanded_price FROM orderitems WHERE order_num = 20005 | 算术计算                                |

## 使用数据处置函数

常用的文本处理函数

| 函数        | 说明              |
| ----------- | ----------------- |
| Left()      | 返回串左边的字符  |
| Length()    | 返回串的长度      |
| Locate()    | 找出串的一个子串  |
| Lower()     | 将串转换为小写    |
| LTrim()     | 去掉串左边的空格  |
| Right()     | 返回串右边的字符  |
| RTrim()     | 去掉串右边的空格  |
| Soundex()   | 返回串的SOUNDEX值 |
| Substring() | 返回子串的字符    |
| Upper()     | 将串转换为大写    |

常用日期和时间处理函数

| 函数          | 说明                           |
| ------------- | ------------------------------ |
| AddDate()     | 增加一个日期（天、周等）       |
| AddTime()     | 增加一个时间（时、分等）       |
| CurDate()     | 返回当前日期                   |
| CurTime()     | 返回当前时间                   |
| Date()        | 返回日期时间的日期部分         |
| DateDiff()    | 计算两个日期之差               |
| Date_Add()    | 高度灵活的日期运算函数         |
| Date_Format() | 返回一个格式化的日期或时间串   |
| Day()         | 返回一个日期的天数部分         |
| DayOfWeek()   | 对于一个日期，返回对应的星期几 |
| Hour()        | 返回一个时间的小时部分         |
| Minute()      | 返回一个时间的分钟部分         |
| Month()       | 返回一个日期的月份部分         |
| Now()         | 返回当前日期和时间             |
| Second()      | 返回一个事件的秒部分           |
| Time()        | 返回一个日期时间的时间部分     |
| Year()        | 返回一个日期的年份部分         |

数值处理函数

| 函数   | 说明               |
| ------ | ------------------ |
| Abs()  | 返回一个数的绝对值 |
| Cos()  | 返回一个角度的余弦 |
| Exp()  | 返回一个数的指数值 |
| Mod()  | 返回除操作的余数   |
| Pi()   | 返回圆周率         |
| Rand() | 返回一个随机数     |
| Sin()  | 返回一个角的正弦   |
| Sqrt() | 返回一个数的平分根 |
| Tan()  | 返回一个角度的正切 |

## 汇总数据

聚集函数

| 函数    | 说明             |
| ------- | ---------------- |
| AVG()   | 返回某列的平均值 |
| COUNT() | 返回某列的行数   |
| MAX()   | 返回某列的最大值 |
| MIN()   | 返回某列的最小值 |
| SUM()   | 返回某列值之和   |

| 语句                                                         | 含义                                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| SELECT AVG(DISTINCT prod_price) AS avg_price FROM products WHERE vend_id=1003 | 聚焦不同的值                                       |
| SELECT * FROM products WHERE prod_price prod_price BETWEEN 5 AND 10 | 范围值检查，检索价格在5美元和10 美元之间的所有商品 |

## 分组数据(GOUP BY)

| 语句                                                         | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT vend_id,COUNT(*) AS num_prods FROM products GROUP BY vend_id | 按照供应商id分组数据                                         |
| SELECT vend_id,COUNT(*) AS num_prods FROM products GROUP BY vend_id WITH ROLLUP | 使用WITH ROLLUP关键字，可以得到每个分组以及每个分组汇总级别（针对每个分组）的值 |
| SELECT cust_id,COUNT(\*) AS orders FROM orders GROUP BY cust_id HAVING COUNT(\*)>=2 | 过滤分组，WHERE在数据分组前进行过滤，HAVING在数据分组后进行过滤 |
| SELECT vend_id,COUNT(\*) AS num_prods FROM products WHERE prod_price >=10 GROUP BY vend_id HAVING COUNT(\*)>=2 | where语句过滤掉所有prod_price至少为10的行。然后按照vend_id分组数据，HAVING子句过滤计数为2或2以上的分组 |
| SELECT order_num, SUM(quantity\*item_price) AS ordertotal FROM ordertimes GROUP BY order_num HAVING SUM(quantity\*item_price)>=50 ORDER BY ordertotal | GROUP BY子句用来按照订单号（order_num列）分组数据，以便SUM(*)函数能够返回总计订单价格。HAVING子句过滤数据，使得只返回总计订单价格大于等于50的订单。最后，用ORDER BY 子句排序输出 |

## 使用子查询

| 语句                                                         | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT cust_name, cust_contact FROM customers WHERE cust_id IN (SELECT cust_id FROM orders WHERE order_num IN (SELECT order_num FROM orderitems WHERE prod_id = 'TNT2')) | 为了执行上述SELECT语句，MySQL实际上必须执行3条SELECT语句。最里面的子查询返回订单号列，此列表用于其外面的子查询的WHERE子句。外面的子查询返回客户ID列表，此客户ID列表用于最外层查询的WHERE子句。最外层查询确实返回所需的数据。 |
| SELECT cust_name, cust_state, (SELECT COUNT(*) FROM orders WHERE orders.cust_id = customers.cust_id) AS orders FROM customers ORDER BY cust_name | orders是一个计算字段，它是由圆括号中的子查询建立的。该子查询对检索出的每个客户执行一次。 |

## 联结表

**外键：**外键为某个表中的一列，它包含另一个表的主键值，定义了两个表之间的关系。

**完全限定列名：**在引用的列可能出现二义性时，必须使用完全限定列名（用一个点分隔的表名和列名）。如果引用一个没有表名限制的具有二义性的列名，MySQL将返回错误。

| 语句                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT vend_name, prod_name, prod_price FROM vendors, products WHERE vendors.vend_id = products.vend_id ORDER BY vend_name, prod_name | 这条FROM子句，列出了两个表，分别是vendors和products。它们就是这条SELECT语句联结的两个表的名字。 |
| SELECT vend_name, prod_name, prod_price FROM vendors INNER JOIN products ON vendors.vend_id = products.vend_id | 同上，首选INNER JOIN                                         |
| SELECT prod_name,  vend_name,  prod_price, quantity FROM orderitems, products, vendors WHERE products.vend_id = vendors.vend_id AND orderitems.prod_id = products.prod_id AND order_num = 20005 | 同子查询                                                     |
|                                                              |                                                              |
|                                                              |                                                              |

