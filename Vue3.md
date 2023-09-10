#   基础

## v-for

1、在v-for里可以使用数组、对象、整数。

2、v-for与v-if一同使用，不推荐在同一元素上使用v-if和v-for。当它们处于同一节点，v-if的优先级比v-for更高，这意味着v-if将没有权限访问v-for里的变量。可以把v-for移动到<template>标签中来修正。

3、当Vue正在更新使用v-for渲染的元素列表时，它默认使用"就地更新"的策略。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时DOM状态（例如：表单输入值）的列表渲染输出。为了给Vue一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一key。

 `key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。 

 它也可以用于强制替换元素/组件而不是重复使用它 。

##  事件处理

1、有时也需要在内联语句处理器中访问原始的DOM事件。可以用特殊变量$event把它传入方法。

2、事件处理程序中可以有多个方法，这些方法由逗号运算符分隔。

# 深入组件

## Props   

1、传入一个对象的所有property

~~~javascript
<blog-post v-bind="post"></blog-post>
等价于：
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
~~~

2、非Prop的Attribute

（1）当组件返回单个根节点时，非prop attribute将自动添加到根节点的attribute中。 同样的规则适用于事件监听器 。

（2） 如果你**不**希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`。  用 attribute 继承的常见情况是需要将 attribute 应用于根节点之外的其他元素。则可以使用 `v-bind`(传递一个对象) 缩写来完成。 

~~~javascript
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
  `
})
~~~

（3）与单个根节点组件不同，具有多个根节点的组件不具有自动 attribute 回退行为。如果未显式绑定 `$attrs`，将发出运行时警告。 

## 插槽

1、一个不带`name`的`<slot>`出口会带有隐含的名字"default"。

~~~javascript
<slot name="header"></slot>
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>
~~~

2、让插槽内容能够访问子组件中的数据

~~~javascript
// 插槽子组件
<ul>
  <li v-for="( item, index ) in items">
    <slot :item="item"></slot>
  </li>
</ul>
// 父组件
// 绑定在 <slot > 元素上的 attribute 被称为插槽 prop。现在在父级作用域中，我们可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字：可以解构插槽 Prop
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </template>
</todo-list>
~~~

3、具名插槽的缩写

v-slot也有缩写，即把参数之前的所有内容（v-slot:）替换为字符#。例如`v-slot:header`可以被重写为`#header`。 然而，和其它指令一样，该缩写只在其有参数的时候才可用 。

## 提供/注入

1、可以使用provide和inject对，来获取父组件的某些内容，不管组件有多深。

2、要访问组件实例的property，我们需要将provide转换为返回对象的函数。默认情况下， `provide/inject` 绑定*不*是被动绑定。我们可以通过将 `ref` property 或 `reactive` 对象传递给 `provide` 来更改此行为。 

~~~javascript
app.component('todo-list', {
  // 传值
  provide() {
    return {
      todoLength: Vue.computed(() => this.todos.length)
    }
  }
})

app.component('todo-list-statistics', {
  inject: ['todoLength'], // 接收
  created() {
    console.log(`Injected property: ${this.todoLength.value}`) // 使用 > Injected property: 5
  }
})
~~~

## keep-alive

用一个`<keep-alive>`元素将其动态组件包裹起来，可以使动态组件实例能够被在它们第一次被创建的时候缓存下来。

## 处理边界情况

1、强制更新：`$forceUpdate`

# 可复用&组合

## 自定义指令

1、可以注册全局、局部自定义指令 

2、指令的参数可以是动态的：动态指令参数` v-mydirective:[argument]="value" `， 获取动态指令参数(argument)的值`binding.arg`，获取指令绑定的值（value）`binding.value`。组件内 可以允许修改绑定值。

## Teleport

1、 ` teleport to="body" `： 将模态框内容渲染为 `body` 标签的子级。 

2、 如果 ` <teleport> ` 包含 Vue 组件，则它仍将是 ` <teleport> ` 父组件的逻辑子组件。

## 渲染函数

1、虚拟DOM：h()返回的其实不是一个*实际*的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为 **VNode**。 

## 插件

1、 如果插件是一个对象，就会调用 `install` 方法。如果是一个 `function`，则函数本身将被调用。它都会收到两个参数：由 Vue 的 `createApp` 生成的 `app` 对象和用户传入的选项。 

~~~javascript
/ 插件
// plugins/i18n.js
export default {
  install: (app, options) => {
      // Plugin code goes here
      app.config.globalProperties.$translate=(value)=>{
        ...  
      }
    
  }
}

/ 使用
// main.js
import i18nPlugin from './plugins/i18n'
const i18nStrings = {
  greetings: {
    hi: 'Hallo!'
  }
}
app.use(i18nPlugin, i18nStrings)

/ 组件内使用
this.$translate('hi')
~~~

# 高阶指南

## 响应性

1、 Proxy 是一个包含另一个对象或函数并允许你对其进行拦截的对象。 可以这样使用它` new Proxy(target, handler) `。此外，Proxy 还提供了另一个特性，`target[prop]===Reflect.get(...arguments)`

2、为了有一个API能够在某些内容发生变化时更新最终值，我们必须在内容发生变化时设置新的值。我们在处理器，一个名为track的函数中执行此操作，该函数可以传入target和key两个参数。Vue 在内部跟踪所有已被设置为响应式的对象，因此它始终会返回同一个对象的 proxy 版本。从响应式 proxy 访问嵌套对象时，该对象在返回之前*也*被转换为 proxy：

~~~javascript
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    const value = Reflect.get(...arguments)
    if (isObject(value)) {
      return reactive(value)
    } else {
      return value
    }
  },
  set(target, key, value, receiver) {
    trigger(target, key)
    return Reflect.set(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)
~~~

3、可以使用`reactive`方法，为JavaScript对象创建响应式状态。可以使用`ref`方法，为JavaScript的一个独立的原始值，让它变成响应式的。可以使用`toRefs`来解构大型响应式对象的一些property。

## 组合式API

~~~javascript
<template> 
  <div ref="root">This is a root element</div>
</template>

// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs, computed, provide } from 'vue'

// in our component
setup (props) {
  // 使用 `toRefs` 创建对 props 中的 `user` property 的响应式引用
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // 更新 `props.user ` 到 `user.value` 访问引用值
    repositories.value = await fetchUserRepositories(user.value)
  }
  
  // 生命周期钩子注册内部setup
  onMounted(()=>{
      getUserRepositories()
      // DOM元素将在初始渲染后分配给ref
      console.log(root.value) //  <div>这是根元素</div>
  })

  // watch响应式更改 ：在用户 prop 的响应式引用上设置一个侦听器
  watch(user, getUserRepositories)
  // 独立的computed属性
  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(
      repository => repository.name.includes(searchQuery.value)
    )
  })
  
  // 获得对模版内元素或组件实例的引用
  const root = ref(null)
  // 使用Provide
  provide('location', 'North Pole')
  provide('geolocation', {
        longitude: 90,
        latitude: 135
  })
  return {
    repositories,
    getUserRepositories,
    searchQuery,
    repositoriesMatchingSearchQuery,
    root
  }
}
~~~

~~~javascript
// 使用注入
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')

    return {
      userLocation,
      userGeolocation
    }
  }
}
</script>
~~~

# 从Vue 2 迁移

1、setUp：组合式API

2、 Teleport：允许我们控制在 DOM 中哪个父节点下呈现 HTML，而不必求助于全局状态或将其拆分为两个组件。 

3、允许片段，不需要根节点

4、触发组件选项： 可以通过 `emits` 选项在组件上定义已发出的事件

5、v-model用法更改

6、`<template v-for>`和非`v-for`节点上key用法已更改

 7、在同一元素上使用的v-if和v-for优先级已更改 

8、`v-bind="object"`现在排序敏感

9、`v-on:event.native`修饰符已移除

10、v-for中的ref不再注册ref数组

11、destroyed生命周期选项被重命名为unmounted

12、beforeDestory生命周期选项被重命为beforeUnmount