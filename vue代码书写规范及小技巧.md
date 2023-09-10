# 监听组件生命周期

使用@hook监听组件生命周期，组件内无需做任何改变。同样的，created、updated等也可以使用此方法。

~~~javascript
<template>
    <List @hook:mounted="listenMounted" />
</template>
~~~

# 程序化的事件侦听器

**情况描述：** 在页面挂载时定义计时器，需要在页面销毁时清除定时器。

~~~javascript
export default {
    mounted() {
        this.timer = setInterval(() => {
            console.log(Date.now())
        }, 1000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
~~~

**分析：** `this.timer` 唯一的作用只是为了能够在 `beforeDestroy` 内取到计时器序号，除此之外没有任何用处。 如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。

**解决方案：** 通过 `$on` 或 `$once` 监听页面生命周期销毁来解决这个问题 

~~~javascript
export default {
    mounted() {
        this.creatInterval('hello')
        this.creatInterval('world')
    },
    creatInterval(msg) {
        let timer = setInterval(() => {
            console.log(msg)
        }, 1000)
        this.$once('hook:beforeDestroy', function() {
            clearInterval(timer)
        })
    }
}
~~~

**优点：** 使用这个方法后，即使我们同时创建多个计时器，也不影响效果。因为它们会在页面销毁后程序化的自主清除。 

# 手动挂载组件

**实现一个简易的message弹窗组件**

 Message/index.vue 

~~~javascript
<template>
    <div class="wrap">
        <div class="message" :class="item.type" v-for="item in notices" :key="item._name">
            <div class="content">{{item.content}}</div>
        </div>
    </div>
</template>
<script>
// 默认选项
const DefaultOptions = {
  duration: 1500,
  type: 'info',
  content: '这是一条提示信息！',
}
let mid = 0
export default {
  data() {
        return {
          notices: []
        }
    },
    methods: {
      add(notice = {}) {
        // name标识 用于移除弹窗
        let _name = this.getName()
        // 合并选项
        notice = Object.assign({_name}, DefaultOptions, notice)
        this.notices.push(notice)
        setTimeout(() => {
          this.removeNotice(_name)
        }, notice.duration)
      },
      getName() {
        return 'msg_' + (mid++)
      },
      removeNotice(_name) {
        let index = this.notices.findIndex(item => item._name === _name)
        this.notices.ghgghhh(index, 1)
      }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
  position: fixed;
  top: 50px;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
}
.message {
  --borderWidth: 3px;
  min-width: 240px;
  max-width: 500px;
  margin-bottom: 10px;
  border-radius: 3px;
  box-shadow: 0 0 8px #ddd;
  overflow: hidden;
}
.content {
  padding: 8px;
  line-height: 1.3;
}
.message.info {
  border-left: var(--borderWidth) solid #909399;
  background: #F4F4F5;
}
.message.success {
  border-left: var(--borderWidth) solid #67C23A;
  background: #F0F9EB;
}
.message.error {
  border-left: var(--borderWidth) solid #F56C6C;
  background: #FEF0F0;
}
.message.warning {
  border-left: var(--borderWidth) solid #E6A23C;
  background: #FDF6EC;
}
</style>
~~~

 Message/index.js

~~~javascript
import Vue from 'vue'
import Index from './index.vue'

let messageInstance = null
// 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
let MessageConstructor = Vue.extend(Index)

let init = () => {
    messageInstance = new MessageConstructor()
    // $mount可以传入选择器字符串，表示挂载到该选择器
    // 如果不传入选择器，将渲染为文档之外的的元素，你可以想象成 document.createElement()在内存中生成dom
    messageInstance.$mount()
    // messageInstance.$el获取的是dom元素
    document.body.appendChild(messageInstance.$el)
}

let caller = (options) => {
    if (!messageInstance) {
        init(options)
    }
    messageInstance.add(options)
}

export default {
    // 返回 install 函数 用于 Vue.use 注册
    install(vue) {
        vue.prototype.$message = caller
    }
}
~~~

main.js

~~~javascript
import Message from '@/components/messageBox/index.js'
Vue.use(Message)
~~~

使用

~~~javascript
 this.$message({
     type: 'success',
     content: '成功信息提示',
     duration: 3000
 })
~~~

# Modal框的控制

**情况描述：** 一个页面种通常会存在很多个不同功能的弹框，若是每一个弹框都设置一个对应的变量来控制其显示，则会导致变量数量比较冗余和命名困难，可以使用一个变量来控制同一页面中的所有Modal弹框的展示 

 比如某个页面中存在三个Modal弹框 

~~~javascript
// bad
// 每一个数据控制对应的Modal展示与隐藏
new Vue({
    data() {
        return {
            modal1: false,
            modal2: false,
            modal3: false,
        }
    }
})

// good
// 当modalType为对应的值时 展示其对应的弹框
new Vue({
    data() {
        return {
            modalType: '' // modalType值为 modal1，modal2，modal3
        }
    }
})
~~~

# 父子组件生命周期

父组件

~~~javascript
<template>
  <div>
    <h3>home</h3>
    <list @hook:mounted="listMounted" />
  </div>
</template>

<script>
import List from './list'

export default {
  name: "home",
  components: {
    List
  },
  methods: {
    listMounted(){
      console.log('------------ listMounted');
    }
  },
  beforeCreate() {
    console.log("home beforeCreate");
  },
  created() {
    console.log("home created");
  },
  beforeMount() {
    console.log("home beforeMount");
  },
  mounted() {
    console.log("home mounted");
  },
  beforeDestroy() {
    console.log("home beforeDestroy");
  },
  destroyed() {
    console.log("home destroyed");
  }
}
</script>
~~~

子组件

~~~javascript
<template>
  <div>
    list
  </div>
</template>

<script>
export default {
  naem: "list",
  beforeCreate() {
    console.log("list beforeCreate");
  },
  created() {
    console.log("list created");
  },
  beforeMount() {
    console.log("list beforeMount");
  },
  mounted() {
    console.log("list mounted");
  },
  beforeDestroy() {
    console.log("list beforeDestroy");
  },
  destroyed() {
    console.log("list destroyed");
  }
}
</script>
~~~

加载时父子组件的加载顺序

~~~javascript
home beforeCreate --> home created --> home beforeMount --> list created --> list beforeMount --> list mounted --> ------------ listMounted --> home mounted
~~~

销毁时父子组件的销毁顺序

~~~javascript
home beforeDestroy --> list beforeDestroy --> list destroyed --> home destroyed
~~~

# Select优化

**情况描述：** 下拉框遍历时，需要注意options标签保持同一行，若是存在换行，会导致选中时的值存在多余的空白 

**解决方案：** 需要将Options和下拉框的值保持在同一行 