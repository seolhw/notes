# 中间件的使用

 一、原生路由的实现

1、在根目录下，新建页面文件夹

```css
pages
├──index.html
├──koa.html
└──404.html
```

2、index.js基本代码

~~~javascript
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

// 根据需求,读取相应的页面,并返回
function render(page){
    return new Promise((resolve, reject)=>{
        let pageUrl = `./pages/${page}`;
        //生成二进制流
        fs.readFile(pageUrl, "binary", (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

// 识别url,判断所请求的页面
async function route(url){
    let page = '404.html';
    switch(url){
        case '/':
            page ='index.html';
            break;
        case '/index':
            page ='index.html';
            break;
        case '/koa':
            page = 'koa.html';
            break;
        default:
            break;
    }
    let html = await render(page);
    return html;
}

app.use(async(ctx)=>{
    let url = ctx.request.url;
    let html = await route(url);
    ctx.body=html;
})

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});
~~~

## koa-router中间件路由

~~~javascript
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
//实现'/home'、'/page'两个子路由层级，以及各自的两个孙子路由层级

//子路由
let home = new Router();
home
    .get('/',async(ctx)=>{
        ctx.body="Home";
    })
    .get('/one',async(ctx)=>{
        ctx.body="Home one";
    })
    .get('/two',async(ctx)=>{
        ctx.body ='Home two';
    })

let page = new Router();
page
    .get('/',async(ctx)=>{
        ctx.body="Page";
    })
    .get('/one',async(ctx)=>{
        ctx.body="Page one";
    })
    .get('/two',async(ctx)=>{
        ctx.body ='Page two';
    })

//总路由，装载子路由
let router = new Router();
//所有路由必须加上一个tony父层级，才能被访问
// const router = new Router({
//       prefix: '/tony'
// })
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});
~~~

1、具名路由参数是通过ctx.params来获取的

~~~javascript
router.get('/users/:id',async(ctx,next)=>{
    console.log(ctx.params)
})
~~~

2、两种配置路由的方法

~~~javascript
// 上面的例子采取的是此种方法
const index =require('./routes/index')
const users=require('./routes/users')
router.use('/',index.routes())
router.use('/users',users.routes())
app.use(router.routes()).use(router.allowedMethods)
~~~

~~~javascript
// koa-generator框架采取的是此种方法
const index =require('./routes/index')
const users=require('./routes/users')
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
~~~

两种方式的区别如下

第一种，使用routes目录时，我们需要在app.js里嵌入一个路由，然后通过该路由包裹routes里的路由，即router.use('/',index.routers())；最后再通过app.use(route.routers)挂载路由。

第二种，使用前缀方式时，我们需要在app.js里直接使用routes2里的路由app.use(index.routers())；在具体的路由通过router.prefix('/')来实现路由。

## koa-views+ejs视图模版渲染中间件

1、在根目录下，新建views文件夹，并添加inde.ejs、page.ejs

~~~javascript
// inde.ejs
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%=title%></title>
    </head>
    <body>
        <h1><%=title%></h1>
    </body>
</html>

//page.ejs
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%=title%></title>
    </head>
    <body>
        <h1><%=title%></h1>
    </body>
</html>
~~~

2、index.js基本代码

~~~javascript
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const path = require('path')
const app = new Koa();
//通过app.use()绑定到app上，实际上给app对象增加ctx.render方法的绑定
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

//实现'/home'、'/page'两个子路由层级，以及各自的两个孙子路由层级
//子路由
let home = new Router();
home
    .get('/',async(ctx)=>{
        // ctx.body="Home";
         let title = '你好模板引擎，我是一个HOME页面的标题'
        // 需要给模板引擎传递变量参数，指定第二个参数是一个对象，index是views下面的ejs文件的前缀
        await ctx.render('index', {
            title
        })
    })
    .get('/one',async(ctx)=>{
        ctx.body="Home one";
    })
    .get('/two',async(ctx)=>{
        ctx.body ='Home two';
    })

let page = new Router();
page
    .get('/',async(ctx)=>{
        // ctx.body="Page";
        let title = '你好模板引擎，我是一个PAGE页面的标题'
        // 需要给模板引擎传递变量参数，指定第二个参数是一个对象，index是views下面的ejs文件的前缀
        await ctx.render('page', {
            title
        })
    })
    .get('/one',async(ctx)=>{
        ctx.body="Page one";
    })
    .get('/two',async(ctx)=>{
        ctx.body ='Page two';
    })

//总路由，装载子路由
let router = new Router();
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});
~~~

## koa-static中间件的使用

koa-static中间件，主要用于设置静态文件资源的文件路径

1、在根目录下，新建页面文件夹

~~~javascript
static
└──1.jpg
views
└──index.ejs
~~~

2、index.js基本代码

~~~javascript
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
let static = require('koa-static');
const path = require('path')
const app = new Koa();

app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
//将html页面下访问的资源路径导向到static文件下
app.use(static(path.join(__dirname, 'static')))

//总路由，装载子路由
let router = new Router();
router.get('/', async (ctx) => {
  let title = '你好模板引擎，我是一个HOME页面的标题'
  // 需要给模板引擎传递变量参数，指定第二个参数是一个对象，index是views下面的ejs文件的前缀
  await ctx.render('index', {
    title
  })
})
//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
});
~~~

3、views文件夹下，index.ejs的基本代码

~~~html
<!-- index.ejs -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%=title%></title>
    </head>
    <body>
        <h1><%=title%></h1>
        <!-- 使用静态资源 -->
        <img src="/1.jpg" alt="" width="100px" height="300px">
    </body>
</html>
~~~

## koa-bodyparser中间件的使用

koa-bodyparser：处理post请求报文

1、在根目录下，新建router.js页面；安装koa-bodyparser中间件。

2、index.js基本代码

**注意：**koa-bodyparse的使用顺序，在路由中间件之前使用。

~~~javascript
const views = require('koa-views')
let static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path')
const app = new Koa();
const router = require('./router')
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
//将html页面下访问的资源路径导向到static文件下
app.use(static(path.join(__dirname, 'static')))
// 处理请求报文
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
//加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
});
~~~

2、router.js的基本代码

~~~javascript
const Router = require('koa-router');
//总路由，装载子路由
let router = new Router();
router.get('/', async (ctx) => {
  let title = '你好模板引擎，我是一个HOME页面的标题'
  // 需要给模板引擎传递变量参数，指定第二个参数是一个对象，index是views下面的ejs文件的前缀
  await ctx.render('index', {
    title
  })
})
router.get('/users', async (ctx) => {
  // 获取get方式的路由参数
  // console.log(ctx.query, ctx.request.query)
  ctx.body = {
    name: '123'
  }
})
router.post('/users', async (ctx) => {
  console.log('ctx.request.body', ctx.request.body)
  ctx.body = {
    name: 'hello'
  }
})
module.exports = router
~~~

3、接口请求

~~~javascript
// get请求
fetch('/users?id=678')
  .then(res => res.json())
  .then(json => console.log(json));
// post请求
fetch('/users',{
    method: 'POST',
    body:JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
})
 .then(res => res.json())
 .then(json => console.log(json));
~~~

## koa-multer中间件的使用

koa-multer：处理文件上传

1、路由设置

~~~javascript
const Router = require('koa-router');
const multer = require('koa-multer')
const path = require('path');
//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: path.join(__dirname, './uploads'),
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });
//总路由，装载子路由
let router = new Router();
// 文件上传
router.post('/upload', upload.single('file'), async (ctx, next) => {
  console.log(ctx)
  ctx.body = {
    filename: ctx.req.file.filename//返回文件名
  }
})
module.exports = router
~~~



# HTTP必知必会

## 请求、响应

req.method请求的方法：get、post、等

req.url请求的url地址：'/a?b=1'

res.write是向body中写入内容的方法；而res.end()完成了两项内容，分别是将参数data（如果有）放到body里，以及向浏览器发送body中的所有数据。

请求和响应都是继承自stream的，所以可以直接通过pipe方法进行组装（pipe是用来传递上一个流的输出并将其作为下一个流的输入的链式方法）。

## 代理

对web客户端来说，代理扮演的是服务器的角色，对web服务器来说，代理扮演的是客户端的角色。Node.js代理、Nginx代理。

node.js代理：通过http.createServer启动一个服务，然后让浏览器在这个服务里设置代理，在服务的req中拿到媛请求的所有信息解析出host之后请求远端服务器。回溯后再传给浏览器，使用Node.js实现此功能时只需两个方法http.createServer和http.request即可轻松搞定。

## HTTPS

https是http的安全版，主要使用SSL/TLS进行加密。

https提供的服务主要有如下几种：

认证用户和服务器确保数据被发送到正确的客户和服务器上加密数据以防止数据被中途窃取，维护数据的完整性，确保数据在传输过程中不被改变。

## HTTP2.0

http2.0只适用于以https://开头的网址，http2.0的目标包括一下几个

1、异步连接多路复用

2、头部压缩

3、请求/响应管线化

4、二进制传输数据

提升了web性能，经一步减少网络延迟

## HTTP头部

1、浏览器是依靠请求和响应的头部信息来控制缓存的，浏览器缓存机制，其核心就是把缓存的内容保存在浏览器本地，而每次都向服务器发送相同的请求，在第一次打开时将下载的css、图片缓存到本地，以后每次请求该页面都先从本地读取，效率会很高。例如chrom浏览器会把缓存的文件保存在一个名为userData的文件夹下，服务器端和客户端约定一个有效期，并告诉客户端这个期间不会过期，放心读取缓存。

2、浏览器缓存处理机制：首先，使用cache-control判断是否有缓存，如果有缓存且缓存没有过期，就直接读取缓存并呈现。如果缓存已过期，就检测Etag值，响应头中的Etag表示资源的版本，浏览器在发送请求时会自动附带名为if-None-Match的请求头字段来询问web服务器该资源版本是否仍然可用。如果服务器发现该资源的版本的版本仍然是最新的，就返回304状态码指示浏览器继续使用缓存呈现。否则要返回200状态码并向web服务器发送请求。

强缓存是否命中？（cache-control）==>协商缓存是否命中（Etag 、if-None-Match）==>(304:命中、200:向服务器发送请求)

## HTTP动词

get：用于获取查询展示资源等（幂等性）

post：用于创建资源多见安全级别高的场景

put：用于更新资源

PATCH：用于更新资源与put语义类似，但一般推荐使用PATCH

DELETE：用于删除资源

## HTTP状态码

	类别	原因短语

**1xx	Informational（信息性状态码）	接受的请求正在处理**

**2xx	Success（成功状态码）	请求正常处理完毕**

200：成功

204：请求成功，但不返回内容

**3xx	Redirection（重定向）	需要进行附加操作以完成请求**

301：永久重定向

302 ：临时性重定向

304：命中协商缓存

**4xx	Client error（客户端错误）	客户端请求出错，服务器无法处理请求**

400 ：表示请求报文中存在语法错误

401：未经许可，需要通过HTTP认证

403：服务器拒绝该次访问（访问权限出现问题）

404：表示服务器上无法找到请求的资源

**5xx	Server Error（服务器错误）	服务器处理请求出错**

500：服务器在执行请求时发生了错误

503：表示服务器暂时处于超负荷或正在进行停机维护，无法处理请求

## cookie

web服务器会通过传送HTTP响应头中的set-Cookie消息把一个Cookie发送到用户的浏览器中。

以下是设计比较重要的属性

name=value 对内容赋值

maxAge：最大失效时间

path：影响到的路径，不匹配，浏览器就不发送这个cookie

domain：cookie影响到的域名

Exprise：缓存失效时间

koa中设置cookie：ctx.cookies.set('name','value',{signed:true})

## body解析

中间件：

1、koa-bodyparser：解析body内容

2、koa-multer：文件上传

## 请求的几种方式

1、表单：提交之后页面会跳转

2、AJAX

3、命令行

4、http模块：

request是一个Node.js模块。

superagent是一个轻量级Node.js模块

 got

fetch：Fetch API提供了一个window.fetch()方法，它被定义在BOM的window对象中，我们可以用它来发远程资源的请求，该方法返回的是一个promise对象。（npm i node-fetch）

axios：是一个基于Promise的Http模块，可以同时用在浏览器和Node.js

## API开发

api的简单写法：将status和data分开

~~~javascript
 {
    status: {
        'code': 200,
        'message': 'Success',
        'data': {
            ...results...
        }
    }
}
~~~

响应处理：使用Loadsh的—get方法，根据对象路径获取值，如果获取的值是undefined，则会赋予解析结果以默认值，有效减少异常处理。另一种更好的方式是使用TypeScript，TypeScript作为一门静态类型语言提前了类型检查的时机。

~~~javascript
const _ = require('loadash')
const object = { a: [{ a: { c: 3 } }] }
const c = _.get(object, a[0].b.c, 1)
// a[0].b.c:所要取的值
// 1:没取到时的默认值
~~~

## 常用中间件

会话：当客户端浏览器访问服务器的时候，服务器会将客户端信息以某种形式记录下来，这就是会话，当客户端浏览器再次访问服务器时，只需要用该会话中查找用户的状态即可。（koa-generic-session、koa-redis）

Etag：Etag是前端缓存优化的重要部分，Etag在服务器生成后，客户端将通过if-Match或if-None-Match条件判断请求来验证资源是否被修改，其中比较常用的是if-None-Match。如果资源没有被修改则返回304状态码，如果被修改则返回正常值。（koa-conditional-get、koa-etag）。

验证码：动态口令验证码。（notp）

限制访问频率：60s后再发一次，验证有效期10min。

## 在浏览器输入网址会发生什么？

1、网址（DNS解析成IP：服务器地址）

​     ||

2、 防火墙

​     ||

3、本机服务（一般来说是Nginx：http代理，性能高，承载更多资源）

​     ||

4、Nginx会直接返回js、css、img等静态资源，后端接口会成为Ngnix代理，向服务器转发

# 数据库基础

Node.js web编程有4个核心内容：

1、异步控制流程

2、web框架

3、数据库

4、模版引擎

## MVC设计模式

MVC是一种设计模式，其中Model表示模型、View表示视图、Controller表示控制器。这种模式采用一种业务逻辑，数据与界面显示分离的方法来组织代码，将业务逻辑聚合到一个控制器里，可以改进界面及用户交互（UI,UserInteraction）并进行个性化定制，而且不需要重新编写业务逻辑。

控制器的作用主要是访问MongoDB数据库，完成业务逻辑编写工作，然后将处理结果返回浏览器，所以，核心的数据存取工作都是在MongoDB，即经典三层架构里的数据访问层中完成的。

视图和控制器之间，以及控制器和数据之间如何解耦，这时就需要用到模型了，模型能让业务逻辑独立且清晰。

模型又分为领域模型和视图模型，控制器和数据库之间的领域模型，视图和控制器之间的视图模型。说的直白一点，模型和数据库表是一一对应的，在设置模型时，除了要考虑数据库表的结构，还需要考虑ui渲染因素。当然，设计表结构的时候，也是需要考虑用户交互（UI）和用户体验（UE）的，模型设计是数据库开发的核心，往往也是整个软件开发过程的先行部分。

# webpack讲解

webpack是一个现代JavaScript应用程序的静态模块打包器，当webpack处理应用程序时，它会递归构建一个依赖关系图，其中包含应用程序需要的每一个模块，然后将所有模块打包成一个或多个bundle文件。

**特点：**

1、在恰当的时机加载需要的模块

2、将第三方库代码和源码分离

3、实现样式分离

4、实现异步加载分离

**其中包含如下部分：**

1、Entry

2、Output

3、loader

4、Plugin：commonsChunkPugin：提取公共模块

​                      DefinePlugin：定义环境变量

​					  UglifyJsPlugin：实现代码压缩

​					  ExtracTextPlugin：提取样式代码

**webpack打包过程：**

1、从配置文件里找到入口

2、解析模块系统

3、解决依赖

4、处理模块依赖（读取、解析、解决）

5、合并所有使用的模块

6、合并模块系统的运行时环境

7、生成打包后的文件

**加载解析文件的过程：**

1、通过Script标签加载webpack打包后的文件

2、加载模块运行时的环境

3、加载入口文件

4、读取依赖

5、解决依赖

6、执行（带有依赖的）入口文件
