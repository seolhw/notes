#### 1.利用Object.freeze()提升性能

vue会对data做getter、setter改造，在现代浏览器里，这个过程实际上挺快的，但仍然有优化空间。

普通的 JavaScript 对象传给 Vue 实例的  `data`  选项，Vue 将遍历此对象所有的属性，并使用  [Object.defineProperty](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperty)  把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化

Vue 在遇到像 `Object.freeze()` 这样被设置为不可配置之后的对象属性时，不会为对象加上 setter getter 等数据劫持的方法，使用了 `Object.freeze()` 之后，减少了 observer 的开销





Object.freeze()是ES5新增的特性，可以冻结一个对象，防止对象被修改，vue 1.0.18+对其提供了支持，对于data或vuex里使用freeze冻结了的对象，vue不会做getter和setter的转换。如果你有一个巨大的数组或Object，并且确信数据不会修改，使用Object.freeze()可以让性能大幅提升。在我的实际开发中，这种提升大约有5~10倍，倍数随着数据量递增。对于纯展示的大数据，都可以使用Object.freeze提升性能，

Object.freeze()冻结的是值，你仍然可以将变量的引用替换，重新替换成一个新的 `Object.freeze()`的对象。



const的行为像 let。它们唯一的区别是， const定义了一个无法重新分配的变量。 通过 const声明的变量是具有块级作用域的，而不是像 var声明的变量具有函数作用域。

Object.freeze()接受一个对象作为参数，并返回一个相同的不可变的对象。这就意味着我们不能添加，删除或更改对象的任何属性。

const和Object.freeze()并不同，const是防止变量重新分配，而Object.freeze()是使对象具有不可变性。

#### 2.屏蔽sourceMap

- 待下项目开发完成。进行打包源码上线环节，需要对项目开发环节的开发提示信息以及错误信息进行屏蔽，一方面可以减少上线代码包的大小；另一方面提高系统的安全性。在vuejs项目的config目录下有三个文件dev.env.js(开发环境配置文件)、prod.env.js(上线配置文件)、index.js(通用配置文件)。vue-cli脚手架在上线配置文件会自动设置允许sourceMap打包，所以在上线前可以屏蔽sourceMap。如下所示，index.js的配置如下,通用配置文件分别对开发环境和上线环境做了打包配置分类，在build对象中的配置信息中，productionSourceMap修改成false:

#### 3.对项目代码中的JS/CSS/SVG(*.ico)文件进行gzip压缩

- 在vue-cli脚手架的配置信息中，有对代码进行压缩的配置项，例如index.js的通用配置，productionGzip设置为true，但是首先需要对compress-webpack-plugin支持，所以需要通过 npm install --save-dev compression-webpack-plugin(如果npm install出错了，就使用cnpm install安装。可能网络比较差npm install会出现频率比较大)，gzip会对js、css文件进行压缩处理；对于图片进行压缩问题，对于png，jpg，jpeg没有压缩效果，对于svg，ico文件以及bmp文件压缩效果达到50%，在productionGzipExtensions: ['js', 'css','svg']设置需要进行压缩的什么格式的文件。对项目文件进行压缩之后，需要浏览器客户端支持gzip以及后端支持gzip。下面可以查看成功支持gzip状态：

#### 4.对路由组件进行懒加载

- 在路由配置文件里，这里是router.js里面引用组件。如果使用同步的方式加载组件，在首屏加载时会对网络资源加载加载比较多，资源比较大，加载速度比较慢。所以设置路由懒加载，按需加载会加速首屏渲染。在没有对路由进行懒加载时，在Chrome里devtool查阅可以看到首屏网络资源加载情况（6requests 3.8MB transfferred Finish:4.67s DOMContentLoaded 2.61s Load 2.70s）。在对路由进行懒加载之后（7requests 800kb transffered Finish2.67s DOMContentLoaded 1.72s Load 800ms）,可以看见加载速度明显加快。但是进行懒加载之后，实现按需加载，那么项目打包不会把所有js打包进app.[hash].js里面，优点是可以减少app.[hash].js体积，缺点就是会把其它js分开打包，造成多个js文件，会有多次https请求。如果项目比较大，需要注意懒加载的效果。

  ```
  const Foo = () => import('./Foo.vue')
  const router = new VueRouter({
    routes: [
      { path: '/foo', component: Foo }
    ]
  })
  ```

  

#### 5.代码优化：

- v-if 和 v-show选择调用
  - v-show和v-if的区别是：v-if是懒加载，当状态为true时才会加载，并且为false时不会占用布局空间；v-show是无论状态是true或者是false，都会进行渲染，并对布局占据空间对于在项目中，需要频繁调用，不需要权限的显示隐藏，可以选择使用v-show，可以减少系统的切换开销。
- 为item设置唯一key值，
  - 在列表数据进行遍历渲染时，需要为每一项item设置唯一key值，方便vuejs内部机制精准找到该条列表数据。当state更新时，新的状态值和旧的状态值对比，较快地定位到diff。
- 细分vuejs组件
  - 在项目开发过程之中，第一版本把所有的组件的布局写在一个组件中，当数据变更时，由于组件代码比较庞大，vuejs的数据驱动视图更新比较慢，造成渲染比较慢。造成比较差的体验效果。所以把组件细分，比如一个组件，可以把整个组件细分成轮播组件、列表组件、分页组件等。
- 减少watch的数据
  - 当组件某个数据变更后需要对应的state进行变更，就需要对另外的组件进行state进行变更。可以使用watch监听相应的数据变更并绑定事件。当watch的数据比较小，性能消耗不明显。当数据变大，系统会出现卡顿，所以减少watch的数据。其它不同的组件的state双向绑定，可以采用事件中央总线或者vuex进行数据的变更操作。
- 内容类系统的图片资源按需加载
  - 对于内容类系统的图片按需加载，如果出现图片加载比较多，可以先使用v-lazy之类的懒加载库或者绑定鼠标的scroll事件，滚动到可视区域先再对数据进行加载显示，减少系统加载的数据。
- SSR(服务端渲染)
  - 如果项目比较大，首屏无论怎么做优化，都出现闪屏或者一阵黑屏的情况。可以考虑使用SSR(服务端渲染)，vuejs官方文档提供next.js很好的服务端解决方案，但是局限性就是目前仅支持Koa、express等Nodejs的后台框架，需要webpack支持。目前自己了解的就是后端支持方面，vuejs的后端渲染支持php，其它的不太清楚。

#### 6.用户体验优化

- better-click防止iphone点击延迟
  - 在开发移动端vuejs项目时，手指触摸时会出现300ms的延迟效果，可以采用better-click对ipone系列的兼容体验优化。

#### **7、图片资源懒加载**

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 Vue 的 vue-lazyload 插件：

链接如下：https://www.cnblogs.com/xieli26/p/9989389.html



https://blog.csdn.net/qq_37939251/article/details/100031285