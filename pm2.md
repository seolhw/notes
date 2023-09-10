# pm2 命令列表

> npm install -g pm2 // 安装

> yarn global add pm2

|命令|描述|
|--|--|
|pm2 start npm -- run start| 运行要守护的进程 |
|pm2 logs| 查看日志 |
|pm2 logs [进程name]| 查看应用日志 |
|pm2 stop [进程name]| 结束应用进程 |
|pm2 stop all| 结束所有应用进程 |
|pm2 delete [进程name]| 删除某个进程 |
|pm2 delete all | 删除全部进程 |
|pm2 list | 列出全部进程 |
|pm2 describe [进程name]| 查看应用的具体情况 |
|pm2 monit| 查看进程/应用的资源消耗情况 |
|pm2 restart [进程name]| 重启进程 |
|pm2 restart all | 重启全部进程 |
|pm2-dev start app.js | 启动开发支持，更新代码自动重启 |

