### Docker

| 命令                                                   | 描述                              |
|--------------------------------------------------------|-----------------------------------|
| docker container run -it                               | 以交互的方式运行容器              |
| docker run -d                                          | 以进程守护的方式运行容器          |
| docker logs -f -t --tail 容器id                        | 查看容器日志                      |
| docker container ls                                    | 查看正在运行的容器列表            |
| docker container exec [容器id或容器name] ['/bin/bash'] | 进入到正在运行中的容器中的shell中 |
| docker container ls -a                                 | 查看全部容器包括停止的容器        |
| docker container ps -a                                 | 查看正在运行的容器                |
| docker container start [容器id或容器name]              | 启动暂停的容器                    |
| docker restart [容器id或容器name]                      | 重启容器                          |
| docker pull                                            | 下载镜像                          |
| docker image ls                                        | 查看本地所有镜像                  |
| docker rmi [镜像id]                                    | 删除镜像，只能删除未引用的镜像    |
| docker version                                         | 查看版本以及docker详情            |
| docker container stop [容器id]                         | 停止容器                          |
| docker container kill [容器id]                         | 强制停止容器(杀死容器)            |
| docker container rm  [容器id]                          | 停止并删除容器                    |
| docker system info                                     | 查看docker系统详情                |
| docker search [镜像name]                               | 在远程仓库搜索镜像                |
| docker ps                                              | 查看正在运行的容器                |
| docker cp                                              | 拷贝数据                          |
| docker image save node:lts -o mynodelts                | 导出镜像                          |
| docker image load -i .\mynodelts.image                | 导入镜像                          |
| docker image build -t demopy .             | 通过DockerFile构建镜像                        |
| docker image tag  demopy seolhw/demopy            | 将镜像tag改成dockerhub的规范镜像，方便推送dockerhub |
| docker image history [imageid]            | 查看镜像分层,镜像构建历史 |
| docker  system prune -f           | 批量删除已退出的容器 |
| docker  image prune -a          | 批量删除未使用的镜像 |

示例
- docker run -t -d -p 1337:1337 --net host -v E:/2021/strapi-docker/app:/home/app --name nodelts node:lts

在容器的shell中，有两种退出方式
- Ctrl + d 退出并停止容器；exit 也可以
- Ctrl + p + q 退出并在后台运行容器；


## 一些概念

### 数据卷容器

> 使用数据卷容器来实现多容器的数据共享


## 热门命令

### docker run [参数] image:Tag

> 运行容器

**参数说明**

- --name="Name"  容器名称，启动后的容器名称
- -d             后台方式运行
- -it            以交互方式运行
- -p             端口映射，主机端口:容器端口
- -P             随机端口映射
- --rm           用完就关，用来测试
- --net          网络配置
- -e             修改环境变量
- --volume-from 容器id   多容器数据卷同步，当前数据卷继承自容器id
- --link         连接多个容器，使容器间可以通过容器名称来通信（不推荐的方式）

*link的原理其实就是在当前容器的hosts中写入目标容器，现在已经不推荐了，现在推荐使用自定义网络*

*在容器内通过exit命令退出当前容器，并停止容器*

*在容器内通过`Ctrl+P+Q`命令退出当前容器，容器正常运行*

### docker ps

> 列出所有运行的容器

**参数说明**

- -a              列出全部的容器
- -n=[n]          显示最近的n个容器
- -q              只显示容器的id

### docker rm 容器id

> 删除容器

- -f              强制删除容器，可以删除运行中的容器
- -l              删除指定的链接
- -v              删除与容器关联的匿名卷

### docker rmi 镜像id

> 删除镜像

### docker start / docker restart

> 启动容器和重启容器

```

docker start 容器id     // 启动一个stop状态的容器
docker restart 容器id   // 重启一个运行中的容器
docker stop 容器id      // 停止容器
docker kill 容器id      // 强制停止容器

```

### docker top 容器id

> 查看容器内的进程id

### docker inspect 容器id

> 查看容器详情

### docker exec -it 容器id /bin/bash

> 进入容器，并启动新终端

### docker attach 容器id

> 进入容器正在执行的终端，不会启动新的终端

### docker cp 容器id:容器内路径 目标主机路径

> 从容器内拷贝文件到主机上

- 无论容器是否是启动状态，都可以正常执行cp命令

### docker stats 容器id

> 查看容器内存占用

### docker commit -m "描述信息" 容器id 新的镜像名[:TAG]

> 提交容器成为新的镜像

- -m      提交的描述信息
- -a      作者

### docker volume

> 数据卷管理

- create    创建数据卷
- inspect   显示一个或多个卷的详细信息
- ls        查看数据卷列表
- prune     删除所有未使用的本地卷
- rm        删除一个或多个数据卷

### docker save

> 保存镜像到压缩包，方便相互传递

### docker load

> 加载镜像压缩包

## docker 高级

### docker network

> docker 网络相关

- 每启动一个容器，就会虚拟出新的网卡，且是成对出现的，这就是evth-pair技术，是宿主机与容器连接的桥梁

- docker0是docker默认的网络，或者是路由器，所有的容器间的通信都是经由docker01转发的，docker会给我们的容器分配一个可用的ip，当然我们也可以创建新的网络来代替docker0

- 宿主机与docker的网络通信是直连的（NAT）

- docker0的特点
  - 默认的
  - 域名不可访问

#### 自定义网络

> 自定义网络可以实现容器互连

- docker network ls // 查看所有docker网络
- 网络模式
  - bridge 桥接模式(默认)
  - none  不配置网络
  - host  和宿主机共享网络
  - container  容器网络连通(很少用，局限性很大)
- docker network create 创建自定义网络，常用参数：
  - --driver bridge           // 网络类型
  - --subnet 192.168.0.0/16   // 网段
  - --gateway 192.168.0.1     // 网关
- 使用自定义网络，还可以通过容器名称进行相互访问，且天然实现集群隔离
- 不同网络下的容器也可以通过docker network connect实现连通
  - 原理就是将容器放在一个网络下，一个容器两个ip
