在阅读这篇文章之前，我们能快速回答出以下两个问题吗？

~~~javascript
import React,{useState} from 'react'

function App() {
  const [count, setCount] = useState(0);
  window.updateNum = setCount;
  return count;
}
调用window.updateNum(1)可以将视图中的count更新为1吗
~~~

~~~javascript
const [number, setNumber] = useState<number>(0); 
function reduce () {
  setTimeout(() => {
	setNumber(number + 1)
  }, 1000);
}
在页面初始化useEffect里连续调用5次，number在页面上显示为几？
~~~

第一个问题的答案是可以，第二个问题的答案是1，和我们猜想的答案是否一致呢？其实，这两个问题本质上是在问，useState如何保存状态？useState如何更新状态？本文就从手写模拟一个简单的 useState出发，讨论一下他们是如何管理状态、以及怎么更新状态的。

### 目录

- [useState的历史](#useState的历史)
- [手写useState](#手写useState)
- [useState总结](#useState总结)

### useState的历史

useState是react用来做维护组件状态的hooks，相比类组件的setState，useState允许在函数组件内管理状态，可读性更好，更加简洁。

#### useState的使用方式

```
// 示例
import React,{useState} from 'react'

export default () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <div>{count}</div>
    </>
  )
}
```

- useState(initState)
  - const [ state , setState ] = useState(initState)
    - state：当前状态
    - setState(updater) ：修改当前状态的方法
      - updater：any - 用于更新数据
    - initState：any- 设置状态的初始值

#### 类组件的setState和useState的异步更新方式

**类组件**

- 类组件的setState() 的异步问题
  - setState() 在绝大多数情况下都是异步操作，更新 state 后无法直接获取最新的 state 值，可在setState的第2个参数回调函数获取最新的state。

~~~javascript
this.setState({ number: 8 }, () => {
  console.log(this.state.number) // 8 可获取到最新值
})
console.log(this.state.number) // 0 打印的是之前的旧值
~~~

- 对象式更新 state 的用法与函数式更新state的用法

  -  React中使用this.setState的对象用法时，不会立即改变组件中state的值

  -  setState的参数可以是函数类型，这个函数接收两个参数，第一个是当前的state，第二个是当前的props，函数返回一个对象，与之前使用this.setState的返回对象相同，代表想对state的更改。

~~~javascript
this.state = { count: 0}

// 对象式setState的用法：字面上看，调用add，应该会导致state加了3，实际上只增加了1
function add () {
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });
 }

// 函数式setState的用法：最终incrementMultiple的效果，等到render函数被重新执行时，真的就是让this.state.count变成了3
function increment(state, props) {
  return {count: state.count + 1};
}
function add () {
  this.setState(increment)
  this.setState(increment)
  this.setState(increment)
}

// 两种方式的混用：在几个函数式setState调用中插入一个对象式setState调用，会破坏掉函数式setState的积累
function add() {
  this.setState(increment);
  this.setState(increment);
  this.setState({count: this.state.count + 1});
  this.setState(increment);
}
~~~

**函数式组件**

- useState() 的异步问题
  - 调用 useState的setState()后组件不会立刻更新，无法立刻获取到最新的 state 值，可以通过useEffect来解决此类问题，监听到值变化了之后,再进行操作。
  - useLayoutEffect也可解决useState()的异步问题，但它会在所有的 DOM 变更之后同步调用 effect，推荐使用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。

~~~javascript
// useEffect解决异步问题
const [step, setStep] = useState(0)
setCount(step + 1)
console.log(step) // 0 打印的是之前的旧值
useEffect(() => {
  console.log(step) // 监控到的最新值
}, [step]) 

render(){
    return  <div>{step}</div>
}
~~~

- 普通对象式更新useState的用法与函数式更新useState的用法
  -  React中使用普通对象式更新useState的用法时，不会立即改变组件中state的值
  -  setState的参数可以是函数类型，这个函数接收一个参数，是当前的state

~~~javascript
// 普通用法：字面上看，调用reduce，应该会导致number减少3，实际上只减少了1
const [number, setNumber] = useState<number>(5); 
function reduce () {
  setNumber(number-1);
  setNumber(number-1);
  setNumber(number-1);
}
// 函数式的用法：最终reduce的效果，等到render函数被重新执行时，真的就是number减少了3
const [number, setNumber] = useState<number>(5); 
function decrement(num) {
  return num-1
}
function reduce () {
  setNumber(decrement)
  setNumber(decrement)
  setNumber(decrement)
}

~~~

### 手写useState

我们需要写一个 `useState` 方法，会返回当前状态的属性和设置状态的方法，每当状态改变之后，方法中会调用刷新视图的 `render` 方法。

```
let memoizedState;	
function useState (initialState) {	
  memoizedState = memoizedState || initialState	
  function setState (newState) {	
    memoizedState = newState	
    render()	
  }	
  return [memoizedState, setState]	
}
```

再次尝试之前的代码，依然可以正常使用，但是当多个 `useState` 存在的时候就有问题了，只能变一个状态了。

现在我们需要优化我们的 Hooks ，解决多个 `useState` 同时使用的问题，当多个状态存在的时候，我们需要使用数组保存状态。

```
                
import { render } from '../index'

let memoizedStates = []
let index = 0
const useState = (initialState) => {
    memoizedStates[index] = memoizedStates[index] || initialState
    let currentIndex = index
    function setState(newState) {
        memoizedStates[currentIndex] = newState
        index = 0
        render()
    }
    return [memoizedStates[index++], setState]
}

export { useState }

```

render 方法

```
export const render = () => {
    reactDom.render(<App />, document.getElementById('root'))
}
```

用例

```javascript
import React from 'react'
import { useState } from './hooks/index'

export default () => {
  const [count, setCount] = useState(0)
  const [doubleCount, setDoubleCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <div>{count}</div>
      <br/>
      <button onClick={() => setDoubleCount(doubleCount + 2)}>+2</button>
      <div>{doubleCount}</div>
    </>
  )
}
```

### useState总结

- useState是函数式组件使用状态的一种方式
- useSate的setState支持传入函数，进行多次调用更新
- useState的原理非常简单，利用闭包的思想，使用数组来储存状态。


### 参考资料

- https://zhuanlan.zhihu.com/p/25954470

- https://zhuanlan.zhihu.com/p/68842478

- https://juejin.cn/post/6844904128326434823
