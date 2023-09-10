# DockerFile编写指南

## 基础知识

- 关键字全大写
- 执行从上到下
- #表示注释
- 每一个指令都会创建一个新的镜像层，并提交
- 面向开发的，做镜像就要编写dockerfile，企业交付的标准

## 指令

### FROM

> 引入基础镜像，

**选择基础镜像的三个原则**

- 官网镜像由于非官方镜像
- 固定版本的tag，而不是`latest`版本
- 满足功能的情况下，选择体积小的镜像

### MAINTAINER

> 指定维护者信心，名称+邮箱

### RUN

> 运行命令，构建镜像的时候，会对基础镜像执行这些命令

- 尽量只存在一个 RUN 命令，如果有多条命令需要执行，可以 `RUN apt update &&\ apt install -y wget &&\ ...`

### COPY/ADD

> 添加文件到镜像中

- COPY是简单的复制，ADD会自动解压缩


### WORKDIR

> 切换目录，指定WORKDIR后，后续的操作全都在WORKDIR路径下操作

### ARG/ENV

> 声明镜像内变量，e.g ENV VERSION=2.0.1  ${VERSION }

- ARG只能声明DockerFile内使用的变量，该变量会被dockerFile文件内后续的命令使用到，而不会打包进镜像中
- ENV声明的变量，既可以被dockerFile使用，也可以被打包入镜像中
- 在打镜像包的时候，可以通过 --build-arg 改变ARG声明的变量的值，ENV无此功能

### CMD/ENTRYPOINT

> 容器启动时自动执行的命令

- CMD只能有一个，如果有多个，则只执行最后一个
- CMD容器启动时，如果指定了新命令，则会执行新命令，不会执行CMD命令
- ENTRYPOINT可以有多个命令，且不会被覆盖

### VOLUME

> 镜像内定义挂载数据卷，指明挂载的目录

### EXPOSE

> 指定暴露的暴露的默认端口

### ONBUILD

> 当构建一个被继承DockerFile，这个时候就会运行该指令，触发指令
