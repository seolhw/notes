## 基础知识

### js 中 replace 的第二个参数是函数时，函数参数的含义

【https://www.cnblogs.com/smile-fanyin/p/13035710.html】

- 当正则没有分组

  当正则没有分组的时候，传进去的第一个参数是正则捕获到的内容，第二个参数是捕获到的内容在原字符串中的索引位置，第三个参数是原字符串。

- 当正则有分组的时候

  当正则有分组的时候，第一个参数是总正则查找到的内容，后面依次是各个子正则查找到的内容，传完查找到的内容之后，再把总正则查找到的内容在原字符串的索引传进，最后一个参数是原字符串。

  ```javascript
  前瞻： exp1(?=exp2) 查找exp2前面的exp1
  后顾: (?<=exp2)exp1 查找exp2后面的exp1
  负前瞻: exp1(?!exp2) 查找后面不是exp2的exp1
  负后顾: (?<!exp2)exp1 查找前面不是exp2的exp1
  注意：前瞻、后顾、负前瞻、负后顾， 这些表达式只是表示一个位置，跟^与$表示开始与结束一样

  查找的始终是exp1  只是位置不一样
  ```

### 位置前加/和不加/

区别就是选择的路径不同。因为加"/"的意思是根目录下的绝对路径，不加"/"的意思是当前目录下的相对路径。

### 正向代理和反向代理的区别

【https://mbd.baidu.com/ug_share/mbox/4a81af9963/share?tk=c6c12d18139400f8d3d9a703d28b8a28&share_url=https%3A%2F%2Fyebd1h.smartapps.cn%2Fpages%2Fblog%2Findex%3FblogId%3D82982474%26_swebfr%3D1%26_swebFromHost%3Dbaiduboxapp】

- 正向代理

  正向代理是代理客户端，为客户端收发请求，使真实客户端对服务器不可见（vpn）

- 反向代理

  为服务器收发请求，使真实服务器对客户端不可见（负载均衡）

- 区别

  正向代理需要你主动设置代理服务器 ip 或者域名进行访问，由设置的服务器 ip 或者域名去获取访问内容并返回；而反向代理不需要你做任何设置，直接访问服务器真实 ip 或者域名，但是服务器内部会自动根据访问内容进行跳转及内容返回，你不知道它最终访问的是哪些机器。

### React 知识：

父组件获取子组件的属性或方法：https://blog.csdn.net/qq_42547768/article/details/117285029

## littele test

## 模拟 new 的实现

【https://mbd.baidu.com/ug_share/mbox/4a81af9963/share?tk=b50297ce81ca2c1022242e1423e5f519&share_url=https%3A%2F%2Fwjrsbu.smartapps.cn%2Fzhihu%2Farticle%3Fid%3D162995509%26isShared%3D1%26_swebfr%3D1%26_swebFromHost%3Dbaiduboxapp】

/\*\*

-
- dns 解析过程
- 1、浏览器缓存（会检查浏览器缓存，有没有这个域名解析过的 ip 地址）
- 2、操作系统缓存（host 文件配置 有没有这个域名对应的 dns 解析结果）
- 3、网络配置中的“dns 服务器地址”（把域名发送给这个本地 dns 服务器）
- 4、本地 DNS 服务器没有命中，去根 DNS 服务器需求解析
- 5、根 DNS 服务器给本地 DNS 服务器返回一个顶级 DNS 服务器地址
- 6、本地 DNS 服务器再向顶级 DNS 发送解析请求
- 7、顶级 DNS 服务器查找并返回此域名对应的 Name Server 域名服务器的地址
- 8、Name Serve 服务器再把查询出来的域名和 IP 地址等等信息返回给本地 DNS 服务器
- 9、本地 DNS 服务器会缓存这个域名和 IP 的对应关系
- 10、把解析的结果返回给本地电脑，本地电脑缓存在本地系统缓存中。
  \*/
