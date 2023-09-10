 docker run -p 80:80 -d --name nginx `
>> -v E:\nginx\newconfig\conf.d\:/etc/nginx/conf.d/ `
>> -v E:\website:/app/website `
>> nginx
>
>

docker run -p 80:80 -d --name nginx`

-v E:\nginx\newconfig\:/etc/nginx/conf.d/`

-v E:\website:/app/website`

nginx`

docker run -d --name some-ghost -e NODE_ENV=development -e url=http://ghost.cn  -P ghost

docker rm $(docker ps -a -q)

docker run -d -p 80:80 --name nginx nginx

docker rm nginx

docker rmi nginx

docker ps -a

docker network ls

docker inspect bridge

docker stop nginx;docker rm nginx

docker run -it nginx /bin/bash

/etc/nginx/conf.d

docker volume rm $(docker volume ls -q)

docker compose up -d

docker compose down

docker compose restart

# docker安装

docker安装链接：https://www.runoob.com/docker/windows-docker-install.html

# docker基本使用

实现本地启动一个nginx服务，并实现静态文件的部署，和代理功能。

## 本地启动一个nginx服务

拉取nginx镜像： docker pull nginx

查看镜像：docker images

运行镜像：docker run -d -p 80:80 --name nginx nginx

查看运行的容器： docker ps

查看某一个容器的详情：docker inspect nginx

浏览器输入http://localhost/，显示Welcome to nginx!即启动成功

## 静态HTTP服务器

1、先找到nginx配置文件的位置

docker run -it nginx /bin/bash  交互模式

ls：查看文件

cd etc/nginx/conf.d/：目录

cat default.conf：查看配置文件内容

exit：退出

编辑本地配置文件

2、退出之前的容器过，用卷挂载的方式，重启容器

退出容器 ： docker stop nginx;docker rm nginx

重启容器：

~~~javascript
docker run -p 80:80 -d --name nginx `
-v E:\nginx\newconfig\:/etc/nginx/conf.d/ `
-v E:\website:/app/website `
nginx
~~~

3、编辑host配置文件

文件位置：c:\windows\system32\drivers\etc

域名配置：127.0.0.1 dh.cn

4、域名访问

浏览器输入http://dh.cn/，显示Hello,World即启动成功

## 代理服务器

拉取ghost镜像：docker pull ghost

运行容器：docker run -d --name some-ghost -e NODE_ENV=development -P ghost （随机分配一个映射端口）

编辑本地配置文件：

~~~javascript
location ~  {
   proxy_pass   http://172.17.0.3:2368;
}
~~~

查看网络：docker network ls

查看某一个网络的具体信息： docker inspect bridge

3、编辑host配置文件

文件位置：c:\windows\system32\drivers\etc

域名配置：127.0.0.1 ghost.cn

4、域名访问

浏览器输入http://ghost.cn/，显示ghost网站首页即启动成功

 # 编写docker-compose

~~~javascript
version: '3'

services:
  nginx:
    container_name: dh_nginx
    image: nginx
    ports:
      - 80:80
    volumes:
      - nginx_conf:/etc/nginx/conf.d/
      - nginx_logs:/var/log/nginx/
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
    ports:
      - 2368:2368
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
~~~

命令：

~~~javascript
 docker compose -f E:\nginx\docker-compose.yaml up -d
~~~

停止：

~~~j
docker compose -f E:\nginx\docker-compose.yaml stop
~~~

重启：

~~~javascript
docker compose -f E:\nginx\docker-compose.yaml restart
~~~

修改`compose.yaml`文件后直接重启

~~~javascript
docker compose up -d
~~~

