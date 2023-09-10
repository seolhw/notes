# 入门教程

1、如何从Node.js读取环境变量

~~~javascript
process.env.NODE_ENV // "development"
~~~

*注意：*`process` 不需要 "require"，它是自动可用的。

2、使用exports从Node.js文件中公开功能

module.exports公开了它指向的对象；export公开了它指向的对象的属性

3、安装依赖标识

- `--save=>-S` 安装并添加条目到 `package.json` 文件的 dependencies（生产环境）。
- `--save-dev=>-D` 安装并添加条目到 `package.json` 文件的 devDependencies（开发环境）。

4、更新软件包

~~~j
// 发觉软件包的新版本
npm outdated
// 检查所有软件包是否有满足版本限制的更新版本
npm update
// 指定单个软件包进行更新
npm update <package-name>
//若要将所有软件包更新到新的主版本
npm install -g npm-check-updates
ncu -u
npm update
~~~

5、npm install 使用`-g`标志可以执行全局安装，不会将软件包安装到本地文件夹下，而是使用全局的位置。

`npm root -g`命令会告知其在计算机上的确切位置

6、npx可以运行使用Node.js构建并通过npm仓库发布的代码，无需先安装命令即可运行命令。

7、事件循环

**调用堆栈：**node.js事件循坏，调用堆栈是一个 LIFO 队列（后进先出）。每次迭代中的事件循环都会查看调用堆栈中是否有东西并执行它直到调用堆栈为空。

**消息队列：**当调用 setTimeout() 时，浏览器或 Node.js 会启动定时器。 当定时器到期时（在此示例中会立即到期，因为将超时值设为 0），则回调函数会被放入“消息队列”中。

事件循环会赋予调用堆栈优先级，它首先处理在调用堆栈中找到的所有东西，一旦其中没有任何东西，便开始处理消息队列中的东西。

**es6作业队列：**ECMAScript 2015 引入了作业队列的概念，Promise 使用了该队列（也在 ES6/ES2015 中引入）。 这种方式会尽快地执行异步函数的结果，而不是放在调用堆栈的末尾。在当前函数结束之前 resolve 的 Promise 会在当前函数之后被立即执行。

~~~javascript
const bar = () => console.log('bar')
const baz = () => console.log('baz')
const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  new Promise((resolve, reject) =>
    resolve('应该在 baz 之后、bar 之前')
  ).then(resolve => console.log(resolve))
  baz()
}
foo()
// 这会打印：
foo
baz
应该在 baz 之后、bar 之前
bar
~~~

8、在任何函数之前加上async关键字意味着该函数会返回promise



### commonjs和esmoudel的区别

相同点：都是模块化的一种实现方式

不同点：

- commonjs，运行时加载，导出的是值的拷贝：【module.export、require】

  （exports=module.exports=｛｝，默认会是一个空对象，导出的时候是值的浅拷贝，在导出文件不可修改，在导入文件，可以修改）

- Esmodule，静态编辑期间运行，确定模块的依赖，导出的是值的引用：【export、import】

  （会生成一个模块环境记录的内存，bindings=｛const name=name｝来实时绑定更新，导出的是值的引用在导出文件可以修改，在导入文件直接修改基本数据类型会报错）

  

相关知识点：

js文件是如何运行的：parsing->ast->字节->二进制->运行

ES Module加载js文件的过程是编辑（解析）时加载的，并且是异步的

（1）编译时（解析）时加载，意味着import不能和运行时相关的内容放在一起使用

（2）比如form后面的路径不能动态获取

（3）比如不能将import放到if等语句的代码块中

（4）所以我们有时候也称ES Module是静态解析的，而不是动态或者运行时解析的

异步意味着：js引擎在遇到import时会去获取这个js文件，但是这个获取的过程是一步的，并且不会阻塞主线程，继续执行。也就是说设置了type=module的代码，相当于在script标签上也加上了async属性，如果我们后面有普通的script标签以及对应的代码，那么ES Module对应的js 文件和代码不会阻塞它们的执行。

node对ES Moudle的执行：已经支持（文件后缀名需要为.mjs）

ES和CS相互调用，通常情况下，common.js不能加载ESModule；大多数情况下，ES Moudle可以加载Common.js。

### 包管理工具

- npm：会优先从全局找
- yarn：解决npm的缺陷（npm安装慢，安装版本不一致，报错会继续安装），有缓存。
- npx：npm5.2之后自带的一个命令，会优先从项目里查找，如果没有会临时在node-modules安装一个模块
- cnpm：中国的npm包管理工具

### express和koa的区别

https://cloud.tencent.com/developer/article/1467268