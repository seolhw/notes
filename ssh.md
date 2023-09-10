# SSH密钥授权Git的方式

|命令|描述|
|--|--|
| ssh-keygen -t rsa | 生成密钥，生成密钥后会在shell中打出出来密钥的地址，一般是 C:\Users\[当前账户名]\.ssh |
| ssh -T git@gitlab.com| 密钥允许验证的地址，通常是git远程仓库的域名(仅域名，不能带路径或http，比如gitlab.com) |

生成本地SSH密钥后，在远程git账号中添加进去就好了

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/1588905906(1).jpg)

#### sourceTree 添加 ssh key 方法

https://www.cnblogs.com/wqbin/p/11070273.html

