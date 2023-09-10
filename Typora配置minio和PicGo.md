# Typora 配置 Minio 和 PicGO

# 前言

Typeora 是最流行的 Markdown 编辑器，配合 Minio 和 PicGO 可以自动上传图片到服务器上。



# 安装 Typora 

https://typora.io/



# 安装Minio（Docker）

https://min.io/

```yaml
# minio.docker-compose.yml

version: '3'
services:
  minio:
    image: quay.io/minio/minio
    container_name: minio
    ports:
      - "9000:9000"  # 将MinIO的9000端口映射到主机的9000端口，可根据需要更改
      - "9001:9001"  # minIO console
    environment:
      - MINIO_ROOT_USER=root
      - MINIO_ROOT_PASSWORD=root-password
      - MINIO_SERVER_URL=https://minio.example.net  # 文件的访问域名
    volumes:
      - /mnt/minio/data:/data  # 将MinIO数据存储在主机的/data目录中，可根据需要更改
    command: server /data --console-address ":9001"


```

执行 `docker compose -f minio.docker-compose.yml up -d`

```
# 配置代理访问，只有要能转发到 IP:9000 就可以了，我用的是 Caddy 

# ~/Caddyfile

minio.example.net {
        reverse_proxy 100.64.0.4:9000
}

# 执行 caddy reload 重启服务
# 9001 是 console 控制台的服务器，一般不需要配置外网访问，直接用 内网IP:9001 访问即可
```

访问 ip:9001 输入账号和密码，进入 console 页面

配置 **Buckets** 

创建 **Access Keys**



# 安装PicGO

我们使用 PicGo 来允许 Typora 使用 CLI 的方式上传图片，https://molunerfinn.com/PicGo/

可以下载默认的客户端来进行可视化配置，也可以直接使用 CLI 配置，这里我们使用 CLI 配置

```shell
# 确保当前环境已安装 Nodejs 
node -v

npm install picgo -g # 或者 yarn global add picgo 或者 pnpm install picgo -g

picgo -v # 确定安装完成

# 其默认配置文件在 ~/.picgo/config.json

# 复制下面的配置到该文件中

{
  "picBed": {
    "uploader": "minio",
    "minio": {
      "accessKey": "sLZ4xxxxxxxxxxxxoU", # minio Access Key
      "secretKey": "QD9OlnxxxxxxxxxxxxxxxxxxxxYN9JaQl", # minio Secret Key
      "bucket": "notes", // 存储空间名
      "endPoint": "minio.example.net", // 自定义域名
      "useSSL": true,
      "customDomain": "https://minio.example.net",
      "baseDir": "notes",
      "sameNameFileProcessingMode": "覆盖",
      "isAutoArchive": true
    },
    "current": "minio",
    "transformer": "path"
  },
  "picgoPlugins": {
    "picgo-plugin-minio": true
  }
}


# 安装 picgo-plugin-minio 
picgo install picgo-plugin-minio 

# 测试上传功能
picgo u xxx.png

```



# 配置Typora

进入 格式 -> 图像 -> 全局图像设置

![image-20230910194711338](https://minio.lihuiwang.net/notes/notes/2023/09/10/image-20230910194711338.png)

点击左侧图像的tab

上传服务设定，上传服务，选择自定义命令，输入 picgo u 
点击验证图片上传选项

配置完成