### Node&Yarn

| 命令                      | 描述                             |
| ------------------------- | -------------------------------- |
| yarn add [package]        | 安装包                           |
| yarn global add [package][@版本号] | 全局安装包（自定义版本号）               |
| yarn global upgrade       | 更新全局安装包                   |
| yarn remove [package]     | 删除包                           |
| yarn upgrade              | 删除node_modules并重新安装所有包 |
| yarn upgrade --latest     | 升级所有依赖项至最新稳定版 |
| yarn config get registry  | 查看当前下载源 |
| yarn config set registry [url] | 切换源 https://registry.yarnpkg.com 或者 https://registry.npm.taobao.org|
| npm view <package> | 远程包的详细信息 |
| yarn global bin | 查看全局包地址 |
| yarn global list | 查看全局包列表 |
| yarn info[package] versions | 产看包的所有版本号 |
|  |  |
|  |  |

### 解决node-sass安装失败的问题
```
  npm install -g mirror-config-china
  // 或者
  yarn global add mirror-config-china
```


```
yarn config set prefix "D:\Scoop\apps\yarn\current"
yarn config set global-folder "D:\Scoop\apps\yarn\current\global"
yarn config set cache-folder "D:\Scoop\apps\yarn\current\cache"
yarn config set link-folder "D:\Scoop\apps\yarn\current\link"
```