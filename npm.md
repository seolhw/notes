npm里面package.json的script字段：如何继发执行和并发的执行多个任务（以webpack和ts为例）

### 使用npm创建package.json配置文件，利用webpackge进行打包

1、新建一个文件夹

2、使用yarn init -y 以默认值创建一个package.json配置文件

![1](https://minio.lihuiwang.net/notes/notes/2023/09/10/1.png)

3、使用cnpm add webpack webpack-cli webpack-dev-server -D 安装webpack开发环境依赖

![2](https://minio.lihuiwang.net/notes/notes/2023/09/10/2.png)

4、新建webpack.config.js配置文件

![3](https://minio.lihuiwang.net/notes/notes/2023/09/10/3.png)

5、执行npx webpack命令进行打包，打包之后会生产dist文件夹

npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装。

![4](https://minio.lihuiwang.net/notes/notes/2023/09/10/4.png)

6、配置package.json使npm run bulid等价于npx webpacke

![5](https://minio.lihuiwang.net/notes/notes/2023/09/10/5.png)

### 配置package.json使ts转换为js

1、使用npm i typescript -D下载typescript

2、使用npx tsc -init创建tsconfig.json配置文件,并修改config.json配置项

![6](https://minio.lihuiwang.net/notes/notes/2023/09/10/6.png)

3、使用npx tsc使ts文件转换为js文件

6、配置package.json使npm run ts等价于npx tsc

### npm里面package.json的script字段：如何继发执行和并发的执行多个任务(先把ts转换为js，再利用webpack进行打包)

1、修改webpack.config.js里的项目入口配置

![7](https://minio.lihuiwang.net/notes/notes/2023/09/10/7.png)

2、利用&&修饰符继发执行先把ts转换为js，再进行打包,输入npm run tb来完成

![8](https://minio.lihuiwang.net/notes/notes/2023/09/10/8.png)

利用script的钩子函数继发执行先把ts转换为js，再进行打包,输入npm run build来完成

用户执行`npm run build`的时候，会自动按照下面的顺序执行。

~~~javascript
npm run prebuild && npm run build && npm run postbuild
~~~

![9](https://minio.lihuiwang.net/notes/notes/2023/09/10/9.png)

### 使用 loader 告诉 webpack将 TypeScript 转为 JavaScript

1、使用`cnpm install ts-loader`下载ts-loader

![10](https://minio.lihuiwang.net/notes/notes/2023/09/10/10.png)

2、配置webpack将TypeScript转为JavaScript不用生成js文件，直接可进行打包

![11](https://minio.lihuiwang.net/notes/notes/2023/09/10/11.png)