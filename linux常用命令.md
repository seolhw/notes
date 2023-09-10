###  vim基本使用

| 快捷键                                          |                                       |
| ----------------------------------------------- | ------------------------------------- |
| i或a                                            | 编辑模式                              |
| ESC                                             | 退出编辑模式或命令模式                |
| : 或 /                                          | 命令模式                              |
| :wq                                             | 保存退出                              |
| :q                                              | 退出                                  |
| :q!                                             | 强制退出，不保存                      |
| yy                                              | 拷贝当前行                            |
| 5yy                                             | 拷贝当前行向下的5行 ，并粘贴（输入p） |
| dd                                              | 删除当前行                            |
| 5dd                                             | 删除当前行向下的5行                   |
| 命令行下 /关键字，回车查找，输入n就是查找下一个 | 在文件中查找某个单词                  |

### Linux实操篇

| 命令                                                    |                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| **用户管理**                                            |                                                              |
| useradd 用户名                                          | 添加用户                                                     |
| passwd  用户名                                          | 指定密码                                                     |
| userdel 用户名                                          | 删除用户                                                     |
| id 用户名                                               | 查询用户信息指令                                             |
| su - 切换用户名                                         | 切换用户                                                     |
| whoami/who am I                                         | 查看当前用户                                                 |
| **用户组**                                              |                                                              |
| groupadd 组名                                           | 新增组                                                       |
| groupdel 组名                                           | 删除组                                                       |
| useradd -g 用户组 用户名                                | 增加用户时直接加上组                                         |
| usermod -g 用户组 用户名                                | 修改用户的组                                                 |
| **实用指令**                                            |                                                              |
| man ls                                                  | 查看ls命令的帮助信息                                         |
| pwd                                                     | 显示当前工作目录的绝对路径                                   |
| ls [选项] [目录或是文件]                                | -a 显示当前目录所有的文件和目录，包括隐藏的<br/>-l 以列表的方式显示信息 |
| cd [参数]                                               | 切换到指定目录<br>cd~ 或者cd：回到自己的用户目录<br>cd.. 回到当前目录的上一级目录 |
| mkdir [选项] 要创建的目录                               | -p 创建多级目录                                              |
| rmdir  [选项] 要删除的空目录                            | 如果需要删除非空目录，需要使用 rm -rf 要删除的目录           |
| touch 文件名称                                          | 创建空文件                                                   |
| cp[选项]source dest                                     | 拷贝文件到指定目录<br>-r 递归复制整个文件夹                  |
| rm [选项] 要删除的文件或目录                            | -r:递归删除整个文件夹<br>-f:强制删除不提示                   |
| mv oldNameFile newNameFile                              | 重命名                                                       |
| mv /temp/movefile /targetFolder                         | 移动文件                                                     |
|                                                         | -n:显示行号                                                  |
| cat [选项] 要查看的文件 \| more                         | cat只能浏览文件，而不能修改文件，为了浏览方便，一般会带上管道命令 |
| less 要查看的文件                                       | 用来分屏查看文件内容                                         |
| echo [选项] [输出内容]                                  | 输出内容到控制台                                             |
| head 文件                                               | 重看文件头10行内容                                           |
| head -n 5 文件                                          | 查看文件头5行内容，5可以是任意行数                           |
| tail 文件                                               | 查看文件尾10行内容                                           |
| tail -f 文件                                            | 实时追踪该文档的所有更新                                     |
| >和>>                                                   | >输出重定向和>>追加<br/>ls -l>文件 (功能描述：列表的内容写入文件a.ⅸt中（覆盖写）)<br/>ls-al>文件（功能描述：列表的内容追加到文件aa.txt的末尾）<br/>cat 文件1 > 文件2（功能描述：将文件1的内容覆盖到文件2）<br/>echo"内容">> 文件（追加） |
| find [搜索范围] [选项]                                  | 指令将从指定日录向下递归地遍历其各个子目录，将满足条件的文件或者目录显示在终端<br/>-name <查询方式> 按照指定的文件名查找模式查看文件<br/>-user<用户名>查找属于指定用户名所有文件<br/>-size<文件大小>按照指定的文件大小查找文件 |
| grep [选项] 查找内容 源文件                             | 过滤查找<br/>-n 显示匹配行及行号<br/>-i 忽略字母大小写       |
| gzip 文件<br/>gunzip文件                                | 压缩文件<br/>解压缩文件命令                                  |
| zip [选项] XXX.zip<br/>unzip[选项]XXX.zip               | -r 递归压缩，即压缩目录<br/>-d<目录> 指定解压后文件的存放目录 |
| tar [选项] XXX.tar.gz 打包的内容                        | 打包目录，压缩后的文件格式.tar.gz<br/>-c 产生 .tar打包文件<br/>-v 显示详细信息<br/>-f 指定压缩后的文件名<br/>-z 打包同时压缩<br/>-x 解包.tar文件 |
| **组管理和权限管理**                                    |                                                              |
| ls -ahl                                                 | 查看文件的详细信息（所有者、所在组）                         |
| chown 用户名 文件名                                     | 修改文件所有者                                               |
| groupadd 组名                                           | 新增组                                                       |
| groupdel 组名                                           | 删除组                                                       |
| useradd -g 用户组 用户名                                | 增加用户时直接加上组                                         |
| chgrp 组名 文件名                                       | 修改文件/目录所在的组                                        |
| usermod -g 新组名 用户名                                | 改变用户所在组                                               |
| usermod -d 目录名 用户名                                | 改变该用户登陆的初始目录。特别说明：用户需要有进入到新目录的权限。 |
| chmod                                                   | 修改权限<br/>第一种方式：+ - =<br/>u:所有者 g:所有组 o:其他人 a:所有人(u、g、o的总和)<br/>chmod  u=wX,g=X,0=x文件/目录名<br/>chmod o+w  文件/目录名<br/>chmod a-x   文件/目录名 <br/>第二种方式：通过数字变更权限<br/>r=4 w=2 x=1   rwx=4+2+1=7<br/>chmod u=rwx,g=rx,o=x 文件目录名<br/>相当于chmod 751  文件/目录名 |
| chown                                                   | 修改文件所有者<br/>chown newowner  文件/目录  改变所有者<br/>chown newowner:newgroup 文件/目录 改变所有者和所在组<br/>-R 如果是目录 则使其下所有子文件或目录递归生效 |
| chgrp newgroup 文件/目录                                | 修改文件/目录所在组                                          |
| chgrp-R shaolin /home/test                              | 请将home/test目录下所有的文件和目录的所在组都修改成shaolin(少林) |
| **定时任务调度**                                        |                                                              |
| crontab [选项]                                          | -e 编辑crontab定时任务<br/>-l  查询crontab任务<br/>-r  删除当前用户所有的crontab任务<br/>eg:每隔1分钟，将当前日期和日历都追加到home/mycal文件中<br/>步骤：<br/>(1)vim /home/my.sh写入内容date>>home/mycal和cal>>home/mycal<br/>(2)给my.sh增加执行权限，chmod u+x /home/my.sh<br/>(3)crontab -e     增加   *1****  /home/my.sh |
| at [选项] [时间]                                        | 一次性定时计划任务，Ctrl+D结束at命令的输入，输出两次<br/>eg:2分钟后，输出时间到指定文件内 比如 /root/date200.log<br/>(1) at now+2minutes<br/>(2)date > /rooot/date200/log <br/>atq命令来查看系统中没有执行的工作任务<br/>atrm 4     //表示将job队列，编号为4的job删除. |
| **网络配置**                                            |                                                              |
| ifconfig                                                | 查看linux的网络配置                                          |
| ping                                                    | 测试主机之间网络连通性                                       |
| **进程管理**                                            |                                                              |
| ps                                                      | 显示系统执行的进程<br/>ps-a: 显示当前终端的所有进程信息<br/>ps-u: 以用户的格式显示进程信息<br/>ps-x: 显示后台进程运行的参数<br/>1)指令：ps-aux\|grep xxx,比如我看看有没有sshd服务<br/>2)ps-ef\|grep sshd，以全格式显示当前所有的进程，查看进程的父进程。查看ssd的父进程信息ps-ef是以全格式显示当前所有的进程-e显示所有进程。-f 全格式 |
| kill [选项] 进程号                                      | 通过进程号杀死终止进程<br/>-9: 表示强迫进程立即停止          |
| killall 进程名称                                        | 通过进程名称杀死进程，也支持通配符，这在系统因负载过大而变得很慢时很有用 |
| pstree [选项]                                           | 查看进程树<br/>p:显示进程的PID<br/>-u:显示进程的所属用户     |
| service 服务名 [start \| stop\|restart\|reload\|status] | service管理之类                                              |
| top [选项]                                              | 动态监控进程，和ps很相似，不同之处在于top在执行一段时间可以更新正在运行的进程<br/>-d 秒数:指定top命令每隔几秒更新。默认是3秒<br/>-i: 使top不显示任何闲置或者僵死进程。<br/>-p: 通过指定监控进程ID来仅仅监控某个进程的状态 |
| netstat [选项]                                          | 查看系统网络情况<br/>-an  按一定顺序排列输出<br/>-p     显示哪个进程在调用<br/>netstat -anp\|grep sshd  请查看服务名为sshd的服务的信息 |
|                                                         |                                                              |
|                                                         |                                                              |

### Ubuntu命令

### apt命令

apt全部命令请查看[apt命令大全](https://man.linuxde.net/apt-get-2)

| 命令                                                         | 描述                                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| sudo apt-get update                                          | 更新源                                             |
| Sudo apt-get install <包>[=版本号]                           | 安装软件或包，版本号可选                           |
| Sudo apt-get install -f <包>[=版本号]                        | 修复安装                                           |
| Sudo apt-get install <包>[=版本号] --reinstall               | 重新安装包                                         |
| apt-cache  search  <包>                                      | 在源上搜索包                                       |
| apt-cache show <包>Ubuntu命令                                | 查看包的信息                                       |
| 命令apt命令apt-cache dump                                    | 描述查看每个包的简要细心                           |
| sudo apt-get updateapt全部命令请查看[apt命令大全](https://man.linuxde.net/apt-get-2)apt-get  upgrade | 更新源更新已安装的软件                             |
| Sudo apt-get install <包>[=版本号]apt-get update             | 安装软件或包，版本号可选更新软件包列表             |
| apt-cache  search  <包>apt-get remove <包>                   | 在源上搜索包卸载软件但保留配置文件                 |
| apt-cache show <包>apt-get clean                             | 查看包的信息删除软件包的备份                       |
| apt-cache dumpwhich <包>                                     | 查看每个包的简要细心查看是否在本机上装过此软件     |
| apt-get  upgradeapt-cache show <包>                          | 更新已安装的软件查看软件信息                       |
| apt-get updateapt-cache madison <包>                         | 更新软件包列表查看包的版本                         |
| apt-get remove <包>top / htop                                | 卸载软件但保留配置文件显示正在运行的程序           |
| apt-get cleankill -9 pid                                     | 删除软件包的备份杀死对应进程                       |
| which <包>netstat -ap                                        | 查看是否在本机上装过此软件grep [端口]              |
| apt-cache show <包>ps -ef                                    | 查看软件信息grep <packageName>                     |
| apt-cache madison <包>ln <options> <sourcefilepath> <targetfilepath> | 查看包的版本创建一个指向源文件的连接，类似快捷方式 |
| top / htopcat [文件名]                                       | 显示正在运行的程序查看文件内容                     |
| kill -9 pidwget                                              | 杀死对应进程下载文件的工具                         |
| netstat -apdpkg -l                                           | grep [端口]查看已安装的所有软件                    |
| ps -efsource $HOME/.bash_profile                             | grep <packageName>环境变量生效                     |

