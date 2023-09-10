# vue+swiper

## vue中安装swiper的指定版本

```javascript
cnpm i swiper@4.1.6  -S
```

# vue+element-ui

## element-ui单个表单验证

```javascript
this.$refs.formInline.validateField("idNumber",(val)=>{//验证提示的信息
        if(!val){
          console.log("完成")
        }
})
```

## table表格跨行合并

### 二维数据处理

第一步：写出主体框架

```javascript
<el-table :span-method="arraySpanMethod" :data="tableData1" border>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
</el-table>
```

第二步：定义数据

```javascript
colNum:'',
tableData:[{
 first:'2016-05-02',
 second:[{ name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
         { name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
         { name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}]
 },
 {
 first:'2016-05-04',
 second:[{ name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
         { name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
         { name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}]
  },
  {
  first:'2016-05-03',
  second:[{ name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          { name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
          { name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}]
}],
formData:[]
```

分析：

colNum:''  [3, 0, 0, 3, 0, 0, 3, 0, 0] 第1行合并3行，第2行合并0行，第3行合并0行......

tableData:为后台获取到的二维数据

formData：渲染table表格的数据

第三步：处理数据

```javascript
forIn(){
    let tableArr=[]
    let tableIndex=[]
    this.tableData.forEach(item=>{
        let colNum=item.second.length
        item.second.forEach((value,index)=>{
            if(index===0){
                tableIndex.push(colNum)
            }else{
                tableIndex.push(0)
            }
            let obj={
            date:item.first,
            name:value.name,
            address:value.address,
            }
            tableArr.push(obj)
            })
   })
this.formData=tableArr
this.colNum=tableIndex
}
```

第四步：在mouted里调用处理数据的方法

```javascript
mounted(){
    this.forIn()
}
```

第五步：处理合并表格

```javascript
arraySpanMethod({ row, column, rowIndex, columnIndex }){
			if (columnIndex === 0) {
				return {
                  rowspan: this.colNum[rowIndex],
                  colspan: 1
        		}
            }
}
```

### 一维数据处理

1、添加序列号

~~~javascript
data(){
    return {
      xuhao:1,
      newTable:[]
    }
}
~~~

~~~javascript
for(let i=0;i<this.tableData.length;i++){
    if(i===0){
        this.tableData[i].index=this.xuhao
    }else{
        if(this.tableData[i].workNo!==this.tableData[i-1].workNo ){
            this.xuhao+=1
        }
        this.tableData[i].index=this.xuhao
    }
}
~~~

2、处理跨行合并

```javascript
handleArr(){
      let index=0
      for(let i=0;i<this.tableData.length;i++){
        if(i===0){
          this.arrIndex.push(1)
          index=i
        }else{
          if(this.tableData[i].id===this.tableData[i-1].id){
            this.arrIndex[index]+=1
            this.arrIndex.push(0)
          }else{
            this.arrIndex.push(1)
            index=i
          }
        }
      }
    }
```

分析：

arrIndex:  [3, 0, 0, 3, 0, 0, 3, 0, 0] 第1行合并3行，第2行合并0行，第3行合并0行......

tableData:为后台获取到的一维数据

## 样式穿透

```javascript
.combo {
    width: 100%;
    margin-bottom: 20px;
    /deep/ .el-input__inner {
      text-align: center;
    }
  }
```

说明：穿透方法与使用的预处理器有关（scss穿透）

# vue(2.X)

## vue中computed计算属性

~~~javascript
<el-select v-model="selection"
             placeholder="请选择"
               class="combo">
      <el-option v-for="item in comboSelect"
                 :key="item.packageid"
                 :label="item.packagename"
                 :value="item.packageid"></el-option>
</el-select>
//data数据
newvalue: 0
computed: {
    // 选择下拉框的值
     selection: {
      get () {
        if (this.comboSelect.length > 0) {
          let a = this.comboSelect.find(item => {
            return item.packageid === this.newvalue
          })
          if (a) {
            this.changeOption(a)
            return a.packageid
          } else {
            this.changeOption(this.comboSelect[0])
            return this.comboSelect[0].packageid
          }
        } else {
          return ''
        }
      },
      set (newvalue) {
        this.newvalue = newvalue
      }
    }
  }

changeOption (item) {
      this.$emit('secletCombo', item)
    },
~~~



## vue中watch监听

~~~javascript
watch:{
    oneContent(item1){
      this.sanji.two=["1","2","3"]
    }
}
~~~

注意：oneContent必须在data数据里定义，当oneContent改变时就会

~~~javascript
watch:{
    '$route':{
      immediate: true,
      deep:true,
      handler(val){
        console.log(val）
      }
    }
  }
~~~

注意：设置了deep：true表示深监听， immediate: true表示第一次绑定也会触发handler这个函数。

监听对象中的某个属性变化

~~~javascript
  watch: {
    'formInline.certype': {
      immediate: true,
      handler (val) {
        bus.$emit('autoPhoto', val)
      }
    }
  },
~~~

[watch监听链接][https://www.imooc.com/article/70010?block_id=tuijian_wz]

## vue中的滚动条滚动事件

[vue中滚动条滚动事件链接][http://www.czl.mobi/a/qianduankuangjia/Vue/121.html]

~~~
 //
 mounted () {
    this.$nextTick().then(() => {
        window.addEventListener('scroll', this.handleScroll, true)
      })
  },
  destroyed (e) {
    window.removeEventListener('scroll', this.handleScroll, true)
  }

/**
* 顶部信息栏收缩---节流函数
*/
   handleScroll (e) {
      if (!this.jieliuFlag) return
      this.jieliuFlag = false
      setTimeout(() => {
       //确定触发的事件源
        if (e.target === document.querySelector('#main-scroll')) {
          const dom = this.$refs.information.$el
          const top = this.$refs.topinformation.$el.offsetHeight
          const scrollTop = (e.target.scrollTop ||        document.body.scrollTop || document.documentElement.scrollTop) // 滚动条被卷起来的高度
          const h = this.getElementTop(dom) + dom.offsetHeight - top - 100
          if (scrollTop > h && !this.scrollFlag) {
            this.scrollFlag = true
          } else if (scrollTop <= h && this.scrollFlag) {
            this.scrollFlag = false
          }
        }
        this.jieliuFlag = true
      }, 100)
    },

~~~



## vue中v-if、v-else-if、v-else的使用

~~~javascript
<template slot-scope="scope">
    <span v-if="scope.row.handle=='退项'">{{scope.row.handle}}</span>
    <span v-else-if="scope.row.handle=='恢复'">{{scope.row.handle}}</span>
    <span v-else>{{scope.row.handle}}</span>
</template>
~~~

## vue中调取子组件的数据和方法

~~~javascript
updated () {
    console.log(this.$refs.clientInformation.formInline)
},
~~~

[调取子组件方法和属性链接说明][https://www.jb51.net/article/131163.htm]

## vue中全局注册组件

~~~javascript
import queryShrink from './components/QueryShrink/index'
Vue.component('queryShrink', queryShrink)
~~~

## vue中自动保存格式化语法

~~~！
{
  "window.zoomLevel": 0,
  "emmet.triggerExpansionOnTab": true,
  "editor.tabSize": 2,
  "breadcrumbs.enabled": true, //每次保存自动格式化
  "files.associations": {
    "*.html": "html",
    "*.js": "javascript"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features" //让函数(名)和后面的括号之间加个空格
  },
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true, //让函数(名)和后面的括号之间加个空格
  "vetur.format.defaultFormatter.html": "js-beautify-html", //格式化.vue中htm
  "vetur.format.defaultFormatter.js": "vscode-typescript", //让vue中的js按编辑器自带的ts格式进行格式化
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false,
      "singleQuote": true,
      "eslintIntegration": true,
      "bracketSpacing": true
    },
    "js-beautify-html": {
      "wrap_attributes": "force-aligned" //属性强制折行对齐
    }
  },
  "emmet.includeLanguages": {
    "vue-html": "html",
    "javascript": "javascriptreact"
  },
  "explorer.confirmDelete": false,
  "workbench.editor.showTabs": true,
  "[vue]": {},
  "editor.detectIndentation": false,
  "editor.insertSpaces": true,
  "explorer.confirmDragAndDrop": false,
  "gitlens.advanced.messages": {
    "suppressShowKeyBindingsNotice": true
  },
  "window.menuBarVisibility": "default",
  "editor.wordWrapColumn": 380,
  "html.format.wrapLineLength": 320,
  "gitlens.views.fileHistory.enabled": true,
  "gitlens.views.lineHistory.enabled": true,
  "markdown.preview.breaks": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "html",
    "vue",
  ],
  "beautify.config": {
    "newline_between_rules": false,
    "selector_separator_newline": false,
    "space_around_combinator": true,
    "indent_size": 2
  },
  "editor.fontSize": 16,
  "workbench.iconTheme": "vscode-icons",
  "editor.fontFamily": "'Cascadia code',Consolas, 'Courier New', monospace",
  "editor.fontLigatures": false,
  "files.autoSave": "off",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "todo-tree.tree.showScanModeButton": false,
  "tabnine.experimentalAutoImports": true,
  "files.insertFinalNewline": true,
  "editor.formatOnSave": true,
  "workbench.colorTheme": "Visual Studio Dark",
  "workbench.colorCustomizations": {}, // VS代码也插入最终的新行
  "alias-skip.allowedsuffix": [
    "js",
    "vue",
    "jsx",
    "ts"
  ],
  "alias-skip.mappings": {
    "@": "/src",
  }

~~~

分析：这个写到settings.json里面

## 处理边界情况

### 访问根实例:

this.$root

~~~javascript
子组件：console.log(this.$root.num)//项目中是指app那个实例 为1
~~~

~~~javascript
根组件（main.js）：
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  data:{
    num:1
  }
}).$mount('#app')
~~~

缺点：对于 demo 或非常小型的有少量组件的应用来说这是很方便的。不过这个模式扩展到中大型应用来说就不然了。因此在绝大多数情况下，我们强烈推荐使用 [Vuex](https://github.com/vuejs/vuex) 来管理应用的状态。

### 访问父组件实例

this.$parent

~~~javascript
console.log(this.$parent.index)//父组件中的index数值
~~~

~~~j
父组件：
export default {
  name: 'home',
  components: {Index,Page1,Page2},
  data(){
    return {
      num:1,
      index:1,
    }
  },
  methods:{
    add(){
      this.num+=1
    }
  },
  mounted(){
  }
}
~~~

缺点：在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是当你变更了父级组件的数据的时候。当我们稍后回看那个组件的时候，很难找出那个变更是从哪里发起的

### 访问子组件实例或子组件元素

this.$refs.名称

~~~javascript
父组件：
console.log(this.$refs.page1)//子组件实例
this.$refs.page1.$el//子组件的dom结构
<Page1 v-if="index===1" ref="page1"></Page1>//父组件中引入的子组件
~~~

缺点：`$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。

### 依赖注入

provide:传值或者方法

inject：接收值或者方法（可隔代使用）

~~~javascript
祖先组件：
  provide(){
    return {
      get:this.get
    }
  },
  methods:{
    get(){
      console.log(this.$refs.page1)
    }
  },
~~~

~~~javascript
后代组件：
export default {
  inject:['get'],//接收祖先组件传过来的方法
  name: 'page1',
  data(){
    return {
      num:1
    }
  },
  methods:{
    add(){
      this.num+=1
      console.log(this.$parent.index)
      this.get()//执行祖先组件中的方法
    }
  }
}
~~~

缺点：

然而，依赖注入还是有负面影响的。它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。同时所提供的属性是非响应式的。这是出于设计的考虑，因为使用它们来创建一个中心化规模化的数据跟[使用 `$root`](https://cn.vuejs.org/v2/guide/components-edge-cases.html#访问根实例)做这件事都是不够好的。如果你想要共享的这个属性是你的应用特有的，而不是通用化的，或者如果你想在祖先组件中更新所提供的数据，那么这意味着你可能需要换用一个像 [Vuex](https://github.com/vuejs/vuex) 这样真正的状态管理方案了。

![1572245187036](https://minio.lihuiwang.net/notes/notes/2023/09/10/vue-1.png)

## 模板定义的替代品

内联模板：inline-template

~~~javascript
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
内联模板需要定义在 Vue 所属的 DOM 元素内。
~~~

缺点：不过，`inline-template` 会让模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择 `template` 选项或 `.vue` 文件里的一个 `<template>` 元素来定义模板。

## 控制更新

1、强制更新：$forceUpdate

## 过渡 & 动画

### css过渡

~~~javascript
<button @click="show = !show">
      Toggle
</button>
<transition name="fade">
    <p v-show="show">hello</p>
</transition>
~~~

~~~javascript
data(){
    return {
      show:true
    }
}
~~~

~~~javascript
//只有透明度变化
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
~~~

### css动画

~~~javascript
<button @click="show = !show">
      Toggle
</button>
<transition name="fade">
    <p v-show="show">hello</p>
</transition>
~~~

~~~javascript
<button @click="show = !show">
      Toggle
</button>
<transition name="fade">
    <p v-show="show">hello</p>
</transition>
~~~

~~~javascript
.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-in .5s reverse;
}
@keyframes fade-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(3);
  }
  100% {
    transform: scale(1);
  }
}
~~~

### 结合animate.css自定义过渡的类名

~~~javascript

~~~

~~~javascript
<button @click="show = !show">
      Toggle
</button>
<transition name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight">
     <p v-if="show">hello</p>
</transition>
~~~

## 可复用性&组合

### 混入（mixin）

作用：多个组件可以共用方法和数据，一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

1、基本使用

第一步：先建一个myMixin.js文件

~~~javascript
// 定义一个混入对象
export default  {
  data(){
    return {
      list:[1,2,3,4,5],
      number:6
    }
  },
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
~~~

第二步：在需要使用mixin的vue组件内，引入myMixin.js文件，并使用

~~~javascript
<template>
  <div class="mixin">
    我是米星
  </div>
</template>
<script>
`import mixin from '@/components/myMixin.js'`
export default {
  name: 'mixin',
  `mixins: [mixin]`,
  data(){
    return {
      number:5
    }
  },
  methods:{
  },
  mounted(){
    console.log(this)//可以获得组件本身和mixin的数据和方法
  }
}
</script>
~~~

**注意：** （1）当组件和混入对象含有同名选项时 ， 在发生冲突时以组件数据优先。（2） 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子**之前**调用。 （3） 值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

## 渲染函数&jsx

### 渲染函数

例如： 要生成不同的标题

**常规做法：**

第一步：编写组件，内容如下

~~~javascript
<template>
  <div class="title1">
    <h1 v-if="level === 1">
      <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
      <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
      <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
      <slot></slot>
    </h4>
    <h5 v-else-if="level === 5">
      <slot></slot>
    </h5>
    <h6 v-else-if="level === 6">
      <slot></slot>
    </h6>
  </div>
</template>

<script>
export default {
  name: 'title1',
  props: ['level'],
  data(){
    return {
    }
  },
  methods:{
  },
  mounted(){
  }
}
</script>
~~~

第二步：引入组件并使用

~~~javascript
<Title :level="1">h1</Title>
~~~

**利用render函数重新编写组件：**

~~~javascript
<script>
export default {
  name: 'newTitle',
  render(createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组（传递不带 v-slot 指令的子节点时；带有v-slot指令时为this.$slots.指令名）
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
</script>
~~~

~~~javascript
render函数也可以直接返回html代码
<script>
export default {
  name: 'newTitle',
  render() {
    <div>{this.blogTitle}</div>
  },
}
</script>
~~~

### createElement函数

createElement（first,【,second】【,third】）

- first<String>|<Object>|<Function>

  ( 一个 HTML 标签名、组件选项对象，或者resolve 了上述任何一种的一个 async 函数。必填项)

- second<Object>

  ( 一个与模板中属性对应的数据对象,可选，包括添加class名、style、id等属性)

- third<String>|<Array>

  ( 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，也可以使用字符串来生成“文本虚拟节点”。可选。 )

~~~javascript
createElement(
      'h1',      // 标签名称
      {          //数据对象（如给标签添加class名）
        class:{
          foo:true,
          bar:false
        }
      },
       '一则头条' // 文本内容
    )
生成结果：<h1 class="foo">rend函数渲染出来的函数</h1>
~~~

~~~javascript
createElement(MyComponent, {//数据对象
      props: {
        someProp: 'foobar'
      }
})
~~~

**createElement函数完整的实例：**

~~~javascript
<script>
var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text //文本内容
  }).join('')
}
export default {
  name: 'newTitle',
  render(createElement) {
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^-|-$)/g, '')
    return createElement(
      'h' + this.level,
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }                                                               }
}
</script>
~~~

**约束：**VNode必须唯一

~~~javascript
//错误
render: function (createElement) {
  var myParagraphVNode = createElement('p', 'hi')
  return createElement('div', [
    // 错误 - 重复的 VNode
    myParagraphVNode, myParagraphVNode
  ])
}
//正确
render: function (createElement) {
  return createElement('div',
    Array.apply(null, { length: 20 }).map(function () {
      return createElement('p', 'hi')
    })
  )
}
~~~

可以通过this.$slots访问静态插槽的内容，每一个插槽都是一个VNode数组

可以通过this.$scopedSlots访问作用域插槽，每个作用域插槽都是一个返回若干VNode的函数

### JSX


~~~javascript
render: function (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的。从 Vue 的 Babel 插件的 3.4.0 版本开始，我们会在以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中 (不是函数或箭头函数中) 自动注入 const h = this.$createElement，这样你就可以去掉 (h) 参数了。对于更早版本的插件，如果 h 在当前作用域中不可用，应用会抛错。
~~~

### 函数式组件

~~~javascript
<script>
export default {
  name: 'newTitle',
  functional: true,//添加此属性之后，增加context参数，
  render(createElement,context) {
    return createElement(
      'h' + context.props.level,
      context.children
    )
  },
}
</script>
//context:上下文，它是一个包括如下字段的对象，将 this.$slots.default 更新为 context.children，然后将 this.level 更新为 context.props.level。
【props、children、slots、scopedSlots、data、parent、listeners、injections】
~~~

函数式组件只是函数，所以渲染开销也低很多。

## 事件修饰符

### sync修饰符

作用：在子组件里也可以直接修改父组件的数据，使父子组件的数据统一

~~~javascript
父组件
<TipsAndFun :tips.sync="tips"></TipsAndFun>
子组件
this.$emit('update:tips', '')//把tips的值修改为''值
~~~

## vue的全局方法

### 全局混入

~~~javascript
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    console.log('11111')//会多次触发，影响每个单独创建的 Vue 实例
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
~~~

### 添加实例方法

~~~javascript
Vue.prototype.$myfunction=()=>{
  console.log('我是全局的方法')
}
组件内使用：this.$myfunction()
~~~

### 注册全局的自定义指令

如：输入框自动获取焦点

第一步：在main.js文件下,注册一个全局自定义组件

1、基本用法

~~~javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  //只调用一次，指令第一次绑定到元素时调用
  bind:()=>{},
  // 当被绑定的元素插入到 DOM 中时……
  inserted: (el,binding,vnode,oldVnode)=> {
    console.log(el)//指令所绑定的元素，可以用来直接操作 DOM
    console.log(binding)//一个对象，包含以下属性(指令名，指令绑定的值)
    console.log(vnode)//Vue 编译生成的虚拟节点
    console.log(oldVnode)//上一个虚拟节点，仅在update和componentUpdated钩子中可用。
    // 聚焦元素
    el.focus()
  },
  //所在组件的 VNode 更新时调用
  update:()=>{},
  //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  componentUpdated:()=>{},
  //只调用一次，指令与元素解绑时调用
  unbind:()=>{}
})
~~~

2、函数简写:想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子

~~~javascript
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
~~~

第二步：在具体的元素上使用

1、基本的使用

~~~javascript
<input type="text" v-focus="foucs">//focus:data里定义的，也可以是对象
~~~

2、与动态指令参数结合使用

~~~javascript
<input type="text" v-focus:yes="focus">//添加动态指令参数
~~~

**获取动态指令参数：**binding.arg值为yes，利用动态指令参数可以做一写些逻辑判断（如：让元素靠顶部固定定位，还是靠左侧固定定位）

**实例：**elemnt-ui的table表格自适应高度

~~~javascript
/**
 * 表格自适应高度(
 *    hasMainContentParent - 父组件是否为 mainContent
 *    hasTableCell - 表格是否有 padding-bottom 16px
 *    hasOtherHeight-表格是否需要减去其它额外的高度（{hasOtherHeight:200}）
 *    isUsable 该功能是否启动， true为启动，false为关闭此功能
 * )
 */
import Vue from 'vue'
var elementResizeDetectorMaker = require('element-resize-detector')
let erd = elementResizeDetectorMaker()
let formDom
export const elHeightAdaptiveTtable = {
  bind (el, binding, vnode) {
    let { value: { isUsable } } = binding
    if (isUsable === false) return
    el.resizeListener = () => {
      doResize(el, binding, vnode)
    }
    Vue.nextTick().then(() => {
      formDom = document.querySelector('form')
      // 搜索表单的展开收缩也能让表格自适应
      if (formDom) {
        erd.listenTo(formDom, el.resizeListener)
      }
      window.addEventListener('resize', el.resizeListener)
    })
  },
  update (el, binding, vnode) {
    let { value: { isUsable } } = binding
    if (isUsable === false) return
    doResize(el, binding, vnode)
  },
  unbind (el, binding) {
    let { value: { isUsable } } = binding
    if (isUsable === false) return
    if (formDom) {
      erd.removeAllListeners(formDom)
    }
    window.removeEventListener('resize', el.resizeListener)
  }
}

// 获取表格自动高度
let doResize = (el, binding, vnode) => {
  let { componentInstance: $table } = vnode
  // hasMainContentParent - 父组件是否为 mainContent
  // hasTableCell - 表格是否有 padding-bottom 16px
  // hasOtherHeight - 是否需要给表格减去额外的高度 值为数字
  let { value: { hasMainContentParent, hasTableCell, hasOtherHeight } } = binding
  if (!$table.height) {
    throw new Error(`el-$table must set the height. Such as height='100px'`)
  }
  // maincontent 组件的padding bottom值，当其改变时修改下
  let mainContentComponentBottom = hasMainContentParent ? 20 : 0
  let tablePaddingBottom = hasTableCell ? 16 : 0
  let otherHeight = hasOtherHeight || 0
  if (!$table) return
  setTimeout(() => {
    // 当屏幕的可视区域高度变小后 表格的高度取默认值
    let height = 0
    let page = document.getElementsByClassName('pagination')[0]
    let mainScroll = document.getElementById('main-scroll')
    // 分页的高度
    let paginationHeight = page && parseInt(window.getComputedStyle(page).height)
    let display = page && window.getComputedStyle(page).display
    // 判断页面中是否有横向滚动条
    let scrollX = mainScroll.clientWidth < mainScroll.offsetHeight ? 17 : 0
    let heightSize = window.innerHeight - el.getBoundingClientRect().top - mainContentComponentBottom - tablePaddingBottom - otherHeight - scrollX
    if (page && display === 'block') {
      height = heightSize - paginationHeight < 90 ? 180 : heightSize - paginationHeight
    } else {
      height = heightSize < 90 ? 180 : heightSize
    }
    $table.layout.setHeight(height)
    $table.doLayout()
  }, 0)
}
~~~

实例：某个dom元素的高度自适应

~~~javascript
/**
 * 元素自适应高度(
 *  isUsable是否启动元素自适应高度，true为启动，false为关闭此功能，默认为true
 *  hasOtherHeight-表格是否需要减去其它额外的高度（{hasOtherHeight:200}）
 * )
 */
const autoHeight = {
  bind (el, binding, vnode) {
    let {value: {isUse}} = binding
    if (isUse === false) return
    el.resizeListener = () => {
      domResize(el, binding, vnode)
    }
    window.addEventListener('resize', el.resizeListener)
  },
  update (el, binding, vnode) {
    let {value: {isUse}} = binding
    if (isUse === false) return
    domResize(el, binding, vnode)
  },
  unbind (el, binding) {
    let {value: {isUse}} = binding
    if (isUse === false) return
    window.removeEventListener('resize', el.resizeListener)
  }
}
let domResize = (el, binding, vnode) => {
  let {value: {hasOtherHeight}} = binding
  let mainScroll = document.querySelectorAll('.main-session')
  let scrollX = mainScroll.clientHeight < mainScroll.scrollHeight ? 17 : 0
  let otherHeight = Number(hasOtherHeight) || 0
  let height = window.innerHeight - el.getBoundingClientRect().top - scrollX - otherHeight
  // 找到绑定自定义指令的dom元素
  let {elm: dom} = vnode
  // 给改元素设置高度
  dom.style.setProperty('height', height + 'px')
}
~~~

## vue响应式原理

 当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty把这些属性全部转为 getter/setter。 每个组件实例都对应一个 watcher实例，它会在组件渲染的过程中把“接触”过的数据属性记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

**注意事项：**

1、 使用 `Object.assign()` 或 `_.extend()`，为已有对象赋值对个新属性，这样添加到对象上的新属性不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的属性一起创建一个新的对象。

~~~javascript
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
~~~

**异步更新队列：**

Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。 在组件内使用 `this.$nextTick()` 实例方法特别方便，因为它不需要全局 `Vue`，并且回调函数中的 `this` 将自动绑定到当前的 Vue 实例上：

# vue常用api

### 全局配置

- keyCodes

**用法:**

~~~javascript
//配置(key是自定义键位别名)
Vue.config.keyCodes = {
  s: 86,
  f1: 112,
  "media-play-pause": 179,
  up: [38, 87]
}
//使用
<input type="text" @keyup.s="keyupMethods">
~~~

### 全局api

v-html：<String>更新元素的innerHTML

~~~javascript
<h1 v-html="message">page2</h1>
message:"<h3>i am not ......</h3>",
~~~

### 指令(v-bind)

动态地绑定一个（单一值）或多个attribute（对象）,或一个组件prop到表达式（函数）

**缩写：**：

示例：

~~~javascript
//动态绑定一个属性
<img v-bind:src="img" alt=""> 等价于<img v-bind="{src:img}">

//动态绑定有多个属性的对象
<img v-bind="{src:img,title:img}">等价于<img :src="img" :alt="img">
img:'http://dmimg.5054399.com/allimg/pkm/pk/22.jpg'

//通过 prop 修饰符绑定 DOM 属性
<div v-bind:text-content.prop="text"></div>//text可以正常渲染
<div :text-content="text"></div>//text不可以正常渲染
~~~

### 实例属性（vm.$attrs）

包含了父组件向子组件传值时，子组件未用props接收的属性值（对象形式）。

**场景:**当有多级组件时，我们希望最底层组件能够获取顶层数据时，如果使用prop来获取，那显得非常繁琐，需要一级一级的prop。利用vue提供的 `v-bind="$attrs"`，子组件添加`v-bind="$attrs"`,子孙组件通过 $attrs就能获取到想要的属性。

示例：孙组件使elment-ui中的table组件，只想要拿到父组件的tableData、stripe属性，再传递给elment-ui。常规做法：父传子（props：一个一个接受）再子（v-bind一个属性一个属性的传递）传孙（再用:data、：stripe传递）,下面是利用$attrs属性来实现同等效果。

~~~javascript
父组件：
<template>
  <div class="attar">
    <TableList v-bind={tableData,stripe}></TableList>
  </div>
</template>
<script>
import TableList from '@/components/TableList.vue'
export default {
  name:'upload',
  components:{TableList},
  data(){
    return {
       tableData: [],
      stripe:true
    }
  }
}
</script>


子组件：
<template>
  <div class="tableList">
     <!-- 通过 $attrs 将父组件的props属性 一起传给子组件 -->
     <Table v-bind="$attrs"></Table>
  </div>
</template>
<script>
import Table from './Table.vue'
export default {
  name:'tableList',
  components:{Table},
  data(){
    return {}
  },
  mounted(){
    console.log('tableList',this.$attrs)//获得未用props接受的父组件传递的数据
  }
}
</script>
—— 等价于——
子组件：
<template>
  <div class="tableList">
    <!-- 通过 $props 将父组件的 props 一起传给子组件,事先需通过props接收 -->
    <Table  v-bind="$props"></Table>
  </div>
</template>
<script>
import Table from './Table.vue'
export default {
  name:'tableList',
  components:{Table},
  props:['tableData','stripe'],
  data(){
    return {}
  },
  mounted(){
    console.log('tableList',this.$attrs)//{}
  }
}
</script>

孙组件
<template>
  <div class="table">
    <el-table
      v-bind="{data:$attrs.tableData,...$attrs}"
      //等价于 :data="tableList" :stripe="stripe"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name:'tab',
  data(){
    return {
    }
  },
}
</script>
~~~

### 实例属性（vm.$listeners）

包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

示例：在父组件中直接处理table组件单击行事件

~~~javascript
孙组件：
<template>
  <div class="table">
    <el-table
      v-bind="{data:$attrs.tableData,...$attrs}"
      v-on="$listeners"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table>
  </div>
</template>
<script>
export default {
  name:'tab',
  data(){
    return {
    }
  },
  mounted(){
    console.log(this.$listeners)//{cell-click: ƒn}
  }
}
</script>

子组件
<template>
  <div class="tableList">
    <Table v-bind="$attrs" v-on="$listeners"></Table>
  </div>
</template>
<script>
import Table from './Table.vue'
export default {
  name:'tableList',
  components:{Table},
  data(){
    return {}
  },
}
</script>

父组件
<template>
  <div class="attar">
	<!-- 注意命名统一 （cell-click）-->
    <TableList v-bind={tableData,stripe}
               @cell-click="dianji"></TableList>/
  </div>
</template>
<script>
import TableList from '@/components/TableList.vue'
export default {
  name:'upload',
  components:{TableList},
  methods:{
    dianji(){//处理孙组件的点击行事件：点击行出打印出dijian
      console.log('danji')
    }
  }
}
</script>
~~~

# Vue Router

## 路由动态匹配

| 模式（路由设计）      | 传参                                                         | 匹配路径     | 接参                  |
| --------------------- | ------------------------------------------------------------ | ------------ | --------------------- |
| **path**(/user/:id)   | /user/123                                                    | /user/123    | this.$route.params.id |
| **params**(/user/:id) | this.$router.push({ name: user, params: { id: '123' }})      | /user/123    | this.$route.params.id |
| **query**(/user)      | **命名路由：**                                                this.$router.push({ name: user, query: {id: 123} })                                                                                                                                                                                                                  **路径路由**：                 this.$router.push({path:'/user', query:{id:123}}) | /user?id=123 | this.$route.query.id  |

### 响应路由参数的变化

**问题：**当使用路由参数时，例如从/user/foo导航到user/bar,原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。意味着组件的生命周期（destroyed）的钩子不会被调用。

**方案一：**

~~~javascript
watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
~~~

**方案二：**

~~~javascript
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
~~~

## 嵌套路由

第一步：在一级路由组件里添加一个<router-view>，来渲染二级路由组件

~~~javascript
 <div class="router">
    <h1>router</h1>
    <router-view></router-view>
  </div>
~~~

第二步：在VueRouter的参数中使用children配置

~~~javascript
{
    path:'/router',
    name:'router',
    component:()=>import("../views/router"),
    children: [
      {
        // 当 /router/api 匹配成功，
        // Api 会被渲染在 router 的 <router-view> 中
        path: 'api',
        name:'api',
        component: ()=>import("../views/Api")
      },
      {
        // 当 /user/vthml 匹配成功
        // Vhtml 会被渲染在 router 的 <router-view> 中
        path: 'vthml',
        name:'Vhtml',
        component: ()=>import("../views/Vhtml")
      },
      {
        // 当 /router 匹配成功
        //render会被渲染在 router 的 <router-view> 中
        path: '',
        name:'render',
        component: ()=>import("../views/render")
      },
    ]
  }
~~~

**注意：**以/开头的嵌套路径会被当作根路径。

## 编程式导航

### this.$router.push()

this.$router.push()该方法的参数可以是一个字符串路径，或者一个描述地址的对象。

类似window.history.pushState()

~~~javascript
// 字符串
this.$router.push('home')

// 对象
this.$router.push({ path: 'home' })
this.$router.push({ path: `/user/${userId}` })// -> /user/123

// 命名的路由
this.$router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' }})
~~~

**注意：**

（1）如果提供了path，params会被忽略， 此时如果支持 Promise，router.push 或 router.replace 将返回一个 Promise。

（2）如果目的地和当前路由相同，只有参数发生了变化（users/1-->users/2）,需要使用beforeRouteUpdate来响应这个变化。

### this.$router.push()

this.$router.replace()和this.$router.push()很像，唯一的不同就是，它不会向history添加新记录，只是替换掉当前的history记录。类似window.history.replaceState()

### this.$router.go()

这个方法的参数是一个整数，意思是在history记录中向前或者后退多少步，类似window.history.go(n)

~~~javascript
// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)

// 后退一步记录，等同于 history.back()
this.$router.go(-1)

// 前进 3 步记录
this.$router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
this.$router.go(-100)
this.$router.go(100)
~~~

## 命名视图

同时展示多个视图，可以再界面中拥有多个单独命名的视图，而不是只有一个单独的出口。

路由配置：

~~~javascript
 {
    path:'/Namedview',
    name:'namedview',
    component:()=>import("../views/Namedview"),
    children:[
      {
        path:'/Namedview/index',
        components:{ 
          default: ()=>import("../views/upload"),
          flex:()=>import("../views/flex"),
          vhtml: ()=>import("../views/Vhtml")
        }
      }
    ]
  }
~~~

视图配置：

~~~javascript
<template>
  <div class="namedview">
    <h2>默认视图</h2>
    <router-view></router-view>
    <h2>flex视图</h2>
    <router-view name="flex"></router-view>
    <h2>vhtml视图</h2>
    <router-view name="vhtml"></router-view>
  </div>
</template>
~~~

## 重定向和别名

### 重定向

redirect:重定向，当用户访问/a时，URL将会被替换成/b,然后匹配路由为/b。有以下三种用法。

~~~javascript
  {
    path:'/Namedview',
    name:'namedview',
    <!-- 关键代码开始 -->
    redirect:'/Namedview/index',
    redirect:{name:'namedHome'},
    redirect:to=>{
      console.log('to=>',to)//目标路由
      // return 重定向的 字符串路径/路径对象
      return '/Namedview/index'
    },
    <!-- 关键代码结束 -->
    component:()=>import("../views/Namedview"),
    children:[
      {
        path:'/Namedview/index',
        name:'namedHome',
        components:{
          default: ()=>import("../views/upload"),
          flex:()=>import("../views/flex"),
          vhtml: ()=>import("../views/Vhtml")
        }
      }
    ]
  }
~~~

### 别名

~~~javascript
 {
    path:'/a',
    alias:'/b',
    component:()=>import("../views/flex")
  }
说明：/a的别名是/b，意味着，当用户访问/b时，URl会保持为/b,但是路由匹配则为/a,就像用户访问/a一样。
~~~

## 路由组件传参

~~~javascript
路由：
{
   path:'/flex/:id',
   component:()=>import("../views/flex")
}
组件内使用：
<h1>{{this.$route.params.id}}</h1>

使用props将组件和路由解耦
1、如果被设置为true，route.params将会被设置为组件属性。
`将路由的props属性设置为true后，组件内可通过props接收到params`
路由：
{
   path:'/flex/:id',
   component:()=>import("../views/flex"),
   props: true //是否允许通过props解耦
 }
组件内使用：
<h1>{{id}}</h1>
props:['id']

2、如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
路由：
{
    path:'/flex/:id',
    component:()=>import("../views/flex"),
    props: {index:999}
}
组件内使用
<h1>{{index}}</h1>
props:['index']

3、也可以创建一个函数返回 props。这样便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。
路由：
{
   path:'/flex/:id',
   component:()=>import("../views/flex"),
   props: (route) => {
      console.log('route=>',route)//目标路由信息
      return  {params: route.params.id}
   }
}
组件内使用：
<h1>{{params}}</h1>
props:['params']
~~~

## 路由守卫

### 全局前置守卫

beforeEach

~~~javascript
/**
 * 全局路由守卫
 */
router.beforeEach((to,from,next)=>{
  console.log(to,from,next)
  //当前的导航被中断，然后进行一个新的导航
  //当跳转路径是'/upload',则跳至'/flex'页面
  if(to.path==='/upload'){
    next({path:'/flex'})
    next({path:'/flex',query:{id:3}})
  // 中断当前的导航, URL地址会重置到 from 路由对应的地址。
  // 当跳转路径是'/api',不会发生跳转
  }else if(to.path==='/api'){
    next(false)
  //导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
  //当跳转路径是'/vhtml',则后台会报错
  }else if(to.path==='/vhtml'){
    next(new Error('不能跳转'))
  }else{
    next()
  }
})
to:Route:即将要进入的目标路由对象
from：Route：当前导航正要离开的路由
next：Function：一定要调用该方法来resolve这个钩子。执行效果依赖next方法的调用参数。
~~~

### 全局解析守卫

router.beforeResolve2.5.0新增，和router.beforeEach类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

### 全局后置钩子

afterEach

和守卫不同，这些钩子不会接受next函数也不会改变导航本身。

~~~javascript
router.afterEach((to, from) => {
  // ...
})
~~~

### 路由独享的守卫

beforeEnter

~~~javascript
{
    path:'/flex',
    component:()=>import("../views/flex"),
    beforeEnter: (to, from, next) => {
      console.log(to,from,next)
    }
  }
~~~

### 组件内的守卫

可以在路由组件内直接定义以下路由导航守卫：

beforeRouteEnter

beforeRouteUpdate(2.2新增)

beforeRouteLeave

```js
beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    //可以通过传一个回调给next来访问组件实例，在导航被确认的时候执行回调，并且把组       件实例作为回调方法的参数。
    next(vm => {
       // 通过 `vm` 访问组件实例
    })
},
beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
},
beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
}
注意：beforeRouteEnter是支持给next传递回调的唯一守卫。对于beforeRouteUpdate和beforeRouteLeave来说，this已经可用了，所以不支持传递回调，因为没有必要了。
```

**离开守卫适用场景：**这个离开守卫通常用来禁止用户在还未保存修改前突然离开，该导航可以通过next(false)来取消。

~~~javascript
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('离开前请保存!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
~~~

### 总结+完整的导航解析流程

**总结：**

1、全局路由守卫

beforeEach

beforeResolve

afterEach

2、路由独享守卫

beforeEnter

3、组件内的守卫

beforeRouteEnter

beforeRouteUpdate

beforeRouteLeave

**导航解析流程：**

1、导航被触发。

2、在失活的组件里调用离开守卫。

3、调用全局的beforeEach守卫。

4、在重用的组件里调用beforeRouteUpdate守卫。

5、在路由配置里调用beforeEnter。

6、解析异步路由组件。

7、在被激活的组件里调用beforeRouteEnter。

8、调用全局的beforeResolve守卫。

9、导航被确认。

10、调用全局的afterEach钩子。

11、触发DOM更新。

12、用创建好的实例调用beforeRouteEnter守卫中传给next的回调函数。

## 路由元信息

定义路由的时候可以配置meta字段：

~~~javascript
//设置meta
{
    path:'/flex',
    component:()=>import("../views/flex"),
    meta:{title:'弹性盒子',requiresAuth:true}
}
//使用meta
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    next({
      path: '/upload',
      query: { redirect: to.fullPath }
    })
  }else{
    next()
  }
})
~~~

## 过渡动效

可以使用<transition>组件给<router-view>动态组件添加一些过渡效果。transition的所有功能在这里同样适用。

## 数据获取

**导航完成之后获取：**先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。

**导航完成之前获取：**导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

## 滚动行为

**需求：**使用前端路由，当切换到新路由时，想要页面滚动到顶部，或者保持原先的滚动位置，就像重新加载页面那样，当创建一个Router实例，可以提供一个scrollBehavior方法，它可以自定义路由切换时页面如何滚动。

~~~javascript
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 对于所有路由导航，简单地让页面滚动到顶部。
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
~~~

1、 scrollBehavior 的第三个参数savedPosition当且仅当popstate导航（通过浏览器的前进/后退 按钮触发）时才可用。

2、return返回滚动位置的对象信息，长这样：

 `{ x: number, y: number } `

 `{ selector: string, offset? : { x: number, y: number }}` (offset 只在 2.6.0+ 支持) 

## 总结

### Router构建选项

####  routes:路由配置

~~~javascript
interface RouteConfig = {
  path: string,//路由
  component?: Component,//组件
  name?: string, // 命名路由
  components?: { [name: string]: Component }, // 命名视图组件
  redirect?: string | Location | Function,//重定项
  props?: boolean | Object | Function,//路由组件传参
  alias?: string | Array<string>,//别名
  children?: Array<RouteConfig>, // 嵌套路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void,
  meta?: any, //路由独享守卫
  // 2.6.0+
  caseSensitive?: boolean, // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object // 编译正则的选项
}
~~~

#### mode：路由模式

配置路由模式：

 `hash`: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器 

 `history`: 依赖 HTML5 History API 和服务器配置。 

 `abstract`: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。**如果发现没有浏览器的 API，路由会自动强制进入这个模式。** 

#### base：基路径

类型：string

默认值："/"

 应用的基路径。例如，如果整个单页应用服务在 `/app/` 下，然后 `base` 就应该设为 `"/app/"` 

#### linkActiveClass：激活的class

类型：string

默认值："router-link-active"

 全局配置 `<router-link>` 默认的精确激活的 class 

#### fallback:控制路由是否应该回退到hash模式

类型：boolean

当浏览器不支持 `history.pushState` 控制路由是否应该回退到 `hash` 模式。默认值为 `true`。

在 IE9 中，设置为 `false` 会使得每个 `router-link` 导航都触发整页刷新。它可用于工作在 IE9 下的服务端渲染应用，因为一个 hash 模式的 URL 并不支持服务端渲染。

### Router实例属性

router.app:配置了router的Vue根实例

router.mode:路由使用的模式

router.currentRoute:当前路由对应的路由信息对象

### Router实例方法

**router.beforeEach:**全局前置守卫

**router.beforeResolve:**全局解析守卫

**router.afterEach:**全局后置钩子

**router.push:**路由跳转

**router.replace:**路由跳转

**router.go:**路由前进跳转

**router.back:**路由后退跳转

**router.forward:**路由前进

```js
router.beforeEach((to, from, next) => {
  /* 必须调用 `next` */
})
router.beforeResolve((to, from, next) => {
  /* 必须调用 `next` */
})
router.afterEach((to, from) => {})
router.push(location, onComplete?, onAbort?)
router.push(location).then(onComplete).catch(onAbort)
router.replace(location, onComplete?, onAbort?)
router.replace(location).then(onComplete).catch(onAbort)
router.go(n)
router.back()
router.forward()
```

 **router.getMatchedComponents：**返回当前路由匹配的组件数组

~~~javascript
router.getMatchedComponents('/Namedview/index')
~~~

**router.resolve:**解析目标位置，返回目标路由的详细信息

~~~javascript
router.resolve('/flex')
~~~

**router.addRoutes:**动态添加更多的路由规则。参数必须是一个符合routes选项要求的数组（权限路由）。

**router.onReady:** 在路由完成初始导航时调用回调函数。

~~~javascript
router.onReady(()=>{
  console.log('路由初始化完成')
})
~~~

router.onError:注册一个回调，改回调会在路由导航过程中出错时被调用。

~~~javascript
router.onError(callback)
~~~

### 路由对象

 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 。

$route.path:当前路由的路径(string)

$route.params:路由参数(object)

$route.query:url查询参数（object）

$route.hash:当前路由的hash值带#（string）

$route.fullPath:完成解析后的URL，包含查询参数和hash的完整路径（string）

$route.matched:一个数组，包含当前路由的所有嵌套路径片段的路由记录。

$route.name:当前路由的名称（string）

$route.redirectedFrom: 如果存在重定向，即为重定向来源的路由的名字 (string)

### 补充

~~~javascript
// 替换现有router的routes
router.matcher = new VueRouter({
  routes: newRoutes
}).matcher
对router.matcher属性做修改，即新的routes就会替换老的routes, 其实就是replaceRoutes()的含义（但是官方没有提供这个API）
~~~

