# Docker 容器简述

在现代软件开发和部署中，容器化技术已经变得不可或缺。Docker，作为容器化技术的代表，已经成为了众多企业的首选工具之一。本文将介绍 Docker 的基本概念、优势，以及如何在公司的开发和运维流程中充分利用 Docker。

## 什么是 Docker？

Docker 是一个开源的容器化平台，它允许开发人员将应用程序及其所有依赖项打包到一个统一的容器中。这个容器可以在任何支持 Docker 的环境中运行，无论是开发人员的笔记本电脑、测试服务器还是生产服务器。这种可移植性和一致性使得开发、测试和部署变得更加可控和可预测。

## Docker 的优势

### 1. 轻量级

Docker 容器是轻量级的，因为它们共享宿主操作系统的内核，而不是像虚拟机一样需要独立的操作系统。这使得容器启动速度快，占用资源少，更适合在云环境中弹性扩展。
<div style="display: flex; flex-direction: row;"><img src="https://www.docker.com/wp-content/uploads/2021/11/docker-containerized-appliction-blue-border_2.png.webp" alt="Docker容器架构" width="400"><img src="https://www.docker.com/wp-content/uploads/2021/11/container-vm-whatcontainer_2.png.webp" width="400"/></div>
### 2. 一致性

容器打包了应用程序及其依赖项，确保在不同环境中的一致性。这消除了"在我的机器上可以工作"的问题，提高了开发和测试的效率。

### 3. 高度可定制

Docker 允许你通过 `Dockerfile` 定制容器镜像，以满足特定应用程序的要求。这使得容器可以适应各种不同的应用场景。

### 4. 快速部署

容器可以在几秒钟内启动，因此应用程序的部署变得更加快速和灵活。这对于持续集成和持续交付（CI/CD）流程至关重要。

### 5. 生态系统

Docker 生态系统丰富，有数以千计的官方和社区维护的容器镜像可供使用。这意味着你可以轻松地集成各种服务和工具，以满足公司的需求。

## Docker 的使用场景

Docker 可以应用于许多不同的场景，包括但不限于：

- **应用程序隔离**: 将不同应用程序放在不同容器中，防止它们之间发生冲突。
- **微服务架构**: 使用 Docker 容器来部署和管理微服务，实现高度可伸缩的应用程序。
- **持续集成和持续交付**: 使用容器化技术可以简化构建、测试和部署流程，加速交付周期。
- **开发环境一致性**: 开发人员可以使用与生产环境一致的容器镜像，避免了环境差异引起的问题。

## 本地环境使用 Docker

要开始使用 Docker，你需要掌握一些基本概念，包括容器、镜像、`Dockerfile` 和容器编排。建议你参考 Docker 官方文档和教程，以获取更详细的信息和实际操作指导。

### 安装Docker

本地环境可以一键安装 [Docker Desktop](https://docs.docker.com/get-docker/)，支持 `Mac`、`Windows`、`Linux` 

![image-20230909204855483](C:\Users\18792\AppData\Roaming\Typora\typora-user-images\image-20230909204855483.png)

### 基本使用

我们将使用 `nginx` 镜像和 `ghost` 镜像启动容器，实现nginx的代理和静态文件访问的功能。

nginx 是常用的web服务器，通常用来做服务转发和代理

ghost 是基于 Node.js 的 CMS 软件，类似 wordpress

#### 拉取镜像

```shell
docker pull nginx
docker pull ghost
```

#### 启动容器

```shell
docker run -d -p 80:80  --name nginx nginx
docker run -d --name ghost -e NODE_ENV=development -e url=http://ghost.cn ghost
```

通过 docker ps -a 或者 Docker Desktop 可以查看容器的状态，确定容器是 running 状态

![image-20230909210709858](C:\Users\18792\AppData\Roaming\Typora\typora-user-images\image-20230909210709858.png)

#### 修改配置

可以直接去容器内修改配置文件，也可以使用卷挂载的方式放在宿主机上，这里我们使用卷挂载的方式

```shell
mkdir docker-demo
cd ./docker-demo
mkdir nginx-config  # 存放配置文件
mkdir nginx-website  # 静态文件目录
code .

docker stop nginx
docker rm nginx

# 手动创建 nginx-config/default.conf 文件
docker run -it --rm nginx cat /etc/nginx/conf.d/default.conf
# 复制上一行命令输出的nginx配置文件

# 重新创建容器，windows 使用绝对路径
docker run -d -p 80:80 -v C:\Users\18792\docker-demo\nginx-config:/etc/nginx/conf.d -v C:\Users\18792\docker-demo\nginx-website:/app/website --name nginx nginx

# 开始配置代理
docker inspect ghost

# 修改配置，重启
docker restart nginx

```



### 编写Docker Compose文件

上面的命令太多了，难以记忆，难以维护，也很难转发给别人使用，我们可以使用 Docker Compose文件 来简化整个过程，该文件就是用来描述这些动作的

上述的命令可以写成一下 Compose 文件

```yml
# docker-compose.yaml

version: '3'

services:
  nginx:
    container_name: dh_nginx
    image: nginx
    ports:
      - 80:80
    volumes:
      - nginx_conf:/etc/nginx/conf.d/
      # - nginx_logs:/var/log/nginx/
      - website:/app/website
    networks:
      - my-network
    hostname: nginx.lcoal
    depends_on:
      - ghost

  ghost:
    container_name: dh_ghost
    image: ghost
    environment:
      - NODE_ENV=development
      - url=http://ghost.cn
    volumes:
      - ghost_data:/var/lib/ghost/content/
    # ports:
      # - 2368:2368
    networks:
      - my-network
    hostname: ghost.lcoal

networks:
  my-network:
    driver: bridge

volumes:
  nginx_conf:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ${VOLUMES_NGINX_CONF}
  nginx_logs:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ${VOLUMES_NGINX_LOGS}
  website:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ${VOLUMES_WEBSITE}

  ghost_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ${VOLUMES_GHOST_DATA}





```



```yaml
# 启动

docker compose -f ‘./docker-compose.yaml’ up -d 

# 修改了 compose 文件后，需要再次执行 up -d ，docker 会感知到然后会自动重启容器

# 如果是仅仅修改了 卷 的数据，则需要 restart 手动重启容器
```

![image-20230909220146092](C:\Users\18792\AppData\Roaming\Typora\typora-user-images\image-20230909220146092.png)



## 前端程序员使用Docker的场景

### 容器化开发

结合`VScode`和docker Dev Environments 功能，实现本地开发





## 结语

Docker 已经成为现代软件开发和运维的关键技术之一。通过容器化，你可以实现更高的灵活性、可移植性和一致性，从而提高了开发速度和应用程序的可维护性。

祝愿大家在容器化的世界中取得成功！