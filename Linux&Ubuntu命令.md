### Ubuntu命令

### apt命令

apt全部命令请查看[apt命令大全](https://man.linuxde.net/apt-get-2)

| 命令                                           | 描述                                   |
| ---------------------------------------------- | -------------------------------------- |
| sudo apt-get update                            | 更新源                                 |
| Sudo apt-get install <包>[=版本号]             | 安装软件或包，版本号可选               |
| apt-cache  search  <包>                        | 在源上搜索包                           |
| apt-cache show <包>                            | 查看包的信息                           |
| apt-cache dump                                 | 查看每个包的简要细心                   |
| apt-get  upgrade                               | 更新已安装的软件                       |
| apt-get update                                 | 更新软件包列表                         |
| apt-get remove <包>                            | 卸载软件但保留配置文件                 |
| apt-get clean                                  | 删除软件包的备份                       |
| which <包>                                     | 查看是否在本机上装过此软件             |
| apt-cache show <包>                            | 查看软件信息                           |
| apt-cache madison <包>                         | 查看包的版本                           |
| top / htop                                     | 显示正在运行的程序                     |
| kill -9 pid                                   | 杀死对应进程                           |
| netstat -ap | grep [端口]                     | 查看某个端口是否被占用                 |
| ps -ef | grep <packageName>                   | 查看和软件相关的进程                   |
| ln <options> <sourcefilepath> <targetfilepath> | 创建一个指向源文件的连接，类似快捷方式 |
| cat [文件名]                                             |          查看文件内容                              |
| wget                                  |            下载文件的工具                      |
| dpkg -l                                  |            查看已安装的所有软件                      |
| source $HOME/.bash_profile         |       环境变量生效           |



### linux常用命令
|命令|描述|
|--|--|
|rm -rf|删除文件夹|
|rz -y |上传文件，并覆盖原有文件|
|sz <文件> | 下载文件 |
|sudo su | 使用管理员权限 |
|su 用户名 | 退出管理员权限 |
|sudo chmod 600 *| 修改文件权限 600表示只有所有者有读和写的权限 |
|sudo chmod 777 *| 777 所有人可读可写，可执行 |
|mkdir <dir>| 创建文件夹 |
| touch filename | 创建文件 |
| tail -f filename | 查看log文件 |
| gedit | 文本器 |
| pwd | 查看文件路径 |
| cp filename filename | 拷贝某个文件并且重命名 |
| shutdown | -h now  | 立刻关机 |
| shutdown | -h 1  | 1分钟后关机 |
| shutdown | -r now  | 立刻重启计算机 |
| halt |   | 关机 |
| reboot |   | 重启 |
| sync |   | 将内存的数据同步到磁盘 |
| logout |   | 注销 |
| useradd | 用户名  | 添加用户 |
| password | 用户名  | 设置用户密码 |
| su | - 用户名  | 切换用户 |
| groupadd | 组名 | 添加组 |
| groupdel | 组名 | 删除组 |
| useradd | -g 用户组 用户名 | 创建用户并加入组 |
| usermod | -g 用户组 用户名 | 修改用户的所属组 |
| id | 用户名 | 查看用户的一些信息 |
| touch | 文件名 | 创建文件 |
| mkdir | 文件夹名字 | 创建文件夹，-p参数可以创建多级目录 |
| mv | 当前地址 目标地址 | 移动目录，如果两个文件在同一个目录下，则为重命名 |


