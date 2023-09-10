### JavaScript

1. matches()，dom方法，可以像css选择器那样返回是否满足条件，和querySelector的区别是，querySelector返回dom，而matches返回true或false，true代表这个元素满足条件，flase不满足，接收的参数都是一致的；

2. classList，dom属性，返回一个该元素的全部class的列表，但不是数组，和nodelist类似，需要转成数组；

3. document.createDocumentFragment()，dom方法，用来创建文档碎片，用来一次性加入，而不是多次更新dom；

4. DOMParser 实例的parseFromString方法可以用来直接将字符串转换为document 文档对象。有了document之后，我们就可以利用各种DOM Api来进行操作了；

5. `new Array(10).fill('')`

   > es6语法，创建特定长度的数组

6. `array.flat()`

   > es6语法，拉伸数组，接受一个数字作为参数，表示拉伸的层数，`Infinity`则表示拉伸任意层数组

7. 判断是否为空对象的方法，Object.keys(obj).length === 0

```
let dom=document.getElementById('app')
let position=window.getComputedStyle(dom).position
/*
Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问。
*/

dom.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
    DOMRect {
        bottom: 917
        height: 68
        left: 124
        right: 1411
        top: 849
        width: 1287
        x: 124
        y: 849
    }


d单独组件使用时：
async mounted () {
    await this.$nextTick()
    this.resizeHandle()
    window.addEventListener('resize', this.resizeHandle)
  },
methods:{
	resizeHandle () {
      let height = this.getOffsetTop(this.$refs.multipleTable.$el)
      if (this.height === height) return
      // console.log(bottomHeight)
      this.height = document.documentElement.offsetHeight - height
    },
    //计算DOM距顶部的距离
   	getOffsetTop (el) {
      let elParent = el.offsetParent
      if (elParent && elParent !== document.body) {
        return this.getOffsetTop(elParent) + el.offsetTop
      }
      return el.offsetTop
    }
},
 destroyed () {
    window.removeEventListener('resize', this.resizeHandle)
  }
  
  
  
 封装为指令 (方法一：)
 directives.js文件：

 export const autoHeight = {
  bind (el, binding, vnode) {
    el.resizeHandle = () => {
      resizeHandle(el, binding, vnode)
    }
    window.addEventListener('resize', el.resizeHandle)
  },
  update (el, binding, vnode) {
    resizeHandle(el, binding, vnode)
  },
  unbind (el, binding, vnode) {
    window.removeEventListener('resize', el.resizeHandle)
  }
}

let resizeHandle = (el, binding, vnode) => {
  let { componentInstance: $table } = vnode
  let { value: { hasMainContentParent } } = binding
  
  // 父组件有无padding-bottom影像其高度(此处bottom为20px)
  let parentPadding = hasMainContentParent ? 20 : 0
  
  // 计算分页的高度
  let page = document.getElementsByClassName('pagination')[0]
  let paginationHeight = page && page.clientHeight ? page.clientHeight : 0
  
  // 获取el距顶部的距离
  let height = getOffsetTop(el)
  height = window.innerHeight - height - paginationHeight - parentPadding
  $table.layout.setHeight(height)
  $table.doLayout()
}
//计算el距顶部的距离
let getOffsetTop = (el) => {
  let elParent = el.offsetParent
  if (elParent && elParent !== document.body) {
    return getOffsetTop(elParent) + el.offsetTop
  }
  return el.offsetTop
}
 
 方法二：
 
 // 获取表格自动高度
let doResize = (el, binding, vnode) => {
  let { componentInstance: $table } = vnode
  // hasMainContentParent - 父组件是否为 mainContent
  let { value: { hasMainContentParent } } = binding
  if (!$table.height) {
    throw new Error(`el-$table must set the height. Such as height='100px'`)
  }
  // maincontent 组件的padding bottom值，当其改变时修改下
  let mainContentComponentBottom = hasMainContentParent ? 20 : 0
  if (!$table) return
  // 当屏幕的可视区域变小后 表格的高度取默认值
  let height = 0
  let page = document.getElementsByClassName('pagination')[0]
  // 分页的高度
  let paginationHeight = page && parseInt(window.getComputedStyle(page).height)
  let display = page && window.getComputedStyle(page).display
  if (page && display === 'block') {
    const heightSize = window.innerHeight - el.getBoundingClientRect().top - mainContentComponentBottom - paginationHeight
    height = heightSize < 90 ? 180 : heightSize
  } else {
    const heightSize = window.innerHeight - el.getBoundingClientRect().top - mainContentComponentBottom
    height = heightSize < 90 ? 180 : heightSize
  }
  $table.layout.setHeight(height)
  $table.doLayout()
}
 


全局注册指令：（main.js）
import * as directives from './directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

组件中引用：
 <el-table :data="tableData"
              ref="multipleTable"
              height="50"
              v-autoHeight="{hasMainContentParent: true}"
              @row-click="currentRow"
              @row-dblclick="dblCurrentRow"
              :row-style="{'cursor': 'pointer', 'user-select': 'none'}">
 </el-table>
 
 
 
 
```



```
class App {
	funa(){
	
	}//原型方法
	funb=()=>{
	
	}//实例方法
	static func(){
	
	}//静态方法
}

function App(){
	this.f=function(){
	
	}//实例方法
}
App.fund=()=>{

}//静态方法
App.property.fune=()=>{

}//原型方法
```

