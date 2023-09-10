# Redux-01  学习 Redux

## 安装

~~~javascript
npm install --save redux
~~~

## 介绍

~~~javascript
import {createStore} from 'redux'
const initialState = {
    count: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add' : return {
            ...state,
            count: action.count
        }
        default : return state
    }
}
const store = createStore(reducer)
export default store


console.log(store)
{
  dispatch(){}  // 改变内部 state 惟一方法是 dispatch 一个 action.
  subscribe(){}  // 订阅Redux的状态
  getState(){}  // 获取store的state数据
  replaceReducer(){}  //
}
~~~

# Redux-01  基础

## Action

 **Action** 是把数据从应用传到 store 的有效载荷。它是 store 数据的**唯一**来源。一般来说会通过 store.dispatch() 将 action 传到 store。 action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作 。

## Reducer

 **Reducers** 指定了应用状态的变化如何响应 actions并发送到 store 的，记住 actions 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 state。 

**注意：**

1、不要修改state。 使用` Object.assign({}, state, {visibilityFilter: action.filter})`；也可以使用 `{ ...state, ...newState }` 达到相同的目的；也可以使用`JSON.parse(JSON.stringify(state))`来进行深拷贝，来修改数据来达到相同的目的。

2、 在 default 情况下返回旧的 state

### 简易累加（减）器

**store文件夹**

store/index.js

~~~javascript
import {createStore} from 'redux'
import reducer from './reducer'
const store = createStore(reducer)
export default store
~~~

store/reducer.js

~~~javascript
import { ADD_TODO, REMOVE_TODO } from './actionTypes'
const initialState = {
  count: 0
}
const reducer =(state=initialState,action) =>{
  if(action.type ===ADD_TODO){
    return Object.assign({},state,{count:state.count+=1})
  }
  if(action.type ===REMOVE_TODO){
    return Object.assign({},state,{count:state.count-=1})
  }
  return state
}
export default reducer
~~~

store/actionTypes.js

~~~javascript
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TOD'
~~~

store/actions.js

~~~javascript
import { ADD_TODO, REMOVE_TODO } from './actionTypes'
export const addTodo=(value)=>{
  return {
    type: ADD_TODO,
  }
}
export const removeTodo=(value)=>{
  return {
    type:REMOVE_TODO,
  }
}
~~~

**使用**

~~~javascript
import React,{Component} from 'react';
import store from './store'
import {addTodo,removeTodo} from './store/actions.js'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }
  render() {
    return(
      <div>
        <div>{ this.state.count }</div>
        <button onClick={this.add}>+</button>
        <button onClick={this.sub}>-</button>
      </div>
    )
  }
  componentDidMount(){
    const unsubscribe=store.subscribe(() => {
      this.setState(store.getState())
    }) //订阅Redux的状态
    // unsubscribe() // 停止监听 state 更新
  }
  add=()=>{
    store.dispatch(addTodo())
  }
  sub=()=>{
    store.dispatch(removeTodo())
  }
}

export default App;
~~~

### 简易累加（减）器—拆分Reducer

**store文件夹**

store/index.js

~~~javascript
import {createStore} from 'redux'
import reducer from './reducer'
const store = createStore(reducer)
export default store
~~~

store/reducer.js

~~~javascript
import todos from './todos'
import count from './count'
import { combineReducers } from 'redux'
const reducer = combineReducers({
  count,
  todos
})
export default reducer
~~~

store/actionTypes.js

~~~javascript
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TOD'
~~~

store/actions.js

~~~javascript
import { ADD_TODO, REMOVE_TODO } from './actionTypes'
export const addTodo=(value)=>{
  return {
    type: ADD_TODO,
  }
}
export const removeTodo=(value)=>{
  return {
    type:REMOVE_TODO,
  }
}
~~~

store/count.js

~~~javascript
import { ADD_TODO, REMOVE_TODO } from './actionTypes'
const count=(state=0,action)=>{
  if(action.type ===ADD_TODO){
    let newState = state 
    newState+=1
    return newState
  }
  if(action.type ===REMOVE_TODO){
    let newState = state 
    newState-=1
    return newState
  }
  return state
};
export default count
~~~

store/todos.js

~~~javascript
const todos=(state=[],action)=>{
  return state
}
export default todos
~~~

store/actionTypes.js

~~~javascript
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TOD'
~~~

store/actions.js

~~~javascript
import { ADD_TODO, REMOVE_TODO } from './actionTypes'
export const addTodo=(value)=>{
  return {
    type: ADD_TODO,
  }
}
export const removeTodo=(value)=>{
  return {
    type:REMOVE_TODO,
  }
}
~~~

**使用**

~~~javascript
import React,{Component} from 'react';
import store from './store'
import {addTodo,removeTodo} from './store/actions.js'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }
  render() {
    return(
      <div>
        <div>{ this.state.count }</div>
        <button onClick={this.add}>+</button>
        <button onClick={this.sub}>-</button>
      </div>
    )
  }
  componentDidMount(){
    store.subscribe(() => {
      this.setState(store.getState())
    }) //订阅Redux的状态
  }
  add=()=>{
    store.dispatch(addTodo())
  }
  sub=()=>{
    store.dispatch(removeTodo())
  }
}

export default App;
~~~

## Store

Store 有以下职责：

- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action)方法更新 state；
- 通过 subscribe(listener)注册监听器;
- 通过 subscribe(listener)返回的函数注销监听器。

 createStore()的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。 

~~~javascript
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp, window.STATE_FROM_SERVER)
~~~

 ## 数据流

 **严格的单向数据流**是 Redux 架构的设计核心。

 Redux应用中数据的生命周期遵循下面4个步骤

1、调用store.dispatch(action)。

2、Redux store调用传入的reducer函数。

3、根reducer应该把多个子reducer输出合并成一个单一的state树。

4、Redux store保存了根reducer返回的完整state树。

## React-redux中的Provider和connect

 技术上讲你可以直接使用 store.subscribe() 来编写容器组件。但不建议这么做的原因是无法使用 React Redux 带来的性能优化。也因此，不要手写容器组件，而使用 React Redux 的 connect() 方法来生成， 这个方法做了性能优化来避免很多不必要的重复渲染。 

### 安装

 Redux 默认并不包含 React 绑定库，需要单独安装。 

~~~javascript
 npm install --save react-redux
~~~

### 使用

 1、Provider的使用方法

 组件 <Provider>来让所有容器组件都可以访问 store，而不必显式地传递它。只需要在渲染根组件时使用即可 ，需要修改index.js入口文件。

~~~javascript
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    document.getElementById('root')
)
~~~

2、connect使用方法

connect第一个小括号接收参数，第二个小括号接收组件 

~~~javascript
import {connect} from 'react-redux'  
const mapStateToProps=state=>{
  return{
    count:state.count,
    todos:state.todos
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    add(){
      dispatch(addTodo())
      dispatch(addList('刷牙'))
    },
    sub(){
      dispatch(removeTodo())
    },
    removeList(index){
      dispatch(deleteList(index))
      dispatch(removeTodo())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
~~~

# Redux-02 高级

## 异步处理方案—redux-thunk

### 安装

~~~javascript
npm i redux-thunk -S
~~~

### 注册

使用 applyMiddleware()引入Redux Thunk middleware

~~~javascript
import {createStore,applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk';
const loggerMiddleware = createLogger()
const store = createStore(reducer,applyMiddleware(
    thunk,// 允许我们 dispatch() 函数
    loggerMiddleware //一个很便捷的 middleware，用来打印 action 日志
    )
)
export default store
~~~

### 使用

~~~javascript
//注意这个函数接收dispatch和getState() 方法
export const getList=(params)=>async (dispatch, getState)=>{
  console.log('当前state值: ',getState())
  let {data} =await axios.get('https://wyy.heny.vip/login/cellphone',{params})
  dispatch(addList(data.message))
}
~~~

## 异步数据流

默认情况下，createStore()所创建的 Redux store 没有使用 middleware，所以只支持同步数据流。可以使用 applyMiddleware() 来增强 createStore()。虽然这不是必须的，但是它可以帮助你用简便的方式来描述异步的 action。 像 redux-thunk或 redux-promise这样支持异步的 middleware 都包装了 store 的 dispatch()方法，以此来让你 dispatch 一些除了 action 以外的其他内容，例如：函数或者 Promise。 

## 搭配React Router

 另外，在我们的 Redux 应用中，我们仍将使用  `<Provider />`  是由 React Redux 提供的高阶组件，用来让你将 Redux 绑定到 React 。  我们将用  `<Provider />` 包裹 ，以便于路由处理器可以store。 

~~~javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
     <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>,
document.getElementById('root')
)
~~~

# Redux-03 技巧

## Reducer逻辑复用

 例如，假设想在程序中追踪多个计数器，分别命名为 A，B，和 C。定义初始的 `counter` reducer，然后使用 `combineReducers` 去设置状态。  

**使用高阶 Reducer 来定制行为**

创建特定的 reducer 有两种最常见的方式，一个是使用给定的前缀或者后缀生成新的 action 常量，另一个是在 action 对象上附加额外的信息。下面是它们大概的样子： 

~~~javascript
//使用给定的前缀或者后缀生成新的 action 常量
function createCounterWithNamedType(counterName = '') {
  return function counter(state = 0, action) {
    switch (action.type) {
      case `INCREMENT_${counterName}`:
        return state + 1
      case `DECREMENT_${counterName}`:
        return state - 1
      default:
        return state
    }
  }
}

//在 action 对象上附加额外的信息
function createCounterWithNameData(counterName = '') {
  return function counter(state = 0, action) {
    const { name } = action
    if (name !== counterName) return state
    switch (action.type) {
      case `INCREMENT`:
        return state + 1
      case `DECREMENT`:
        return state - 1
      default:
        return state
    }
  }
}
~~~

~~~javascript
const rootReducer = combineReducers({
  counterA: createCounterWithNamedType('A'),
  counterB: createCounterWithNamedType('B'),
  counterC: createCounterWithNamedType('C')
})

//使用
store.dispatch({ type: 'INCREMENT_B' })
console.log(store.getState())
// {counterA : 0, counterB : 1, counterC : 0}
~~~

 我们在某种程度上也可以改变这个方法，创建一个更加通用的高阶 reducer，它可以接收一个给定的 reducer，一个名字或者标识符： 

~~~javascript
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

function createNamedWrapperReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { name } = action
    const isInitializationCall = state === undefined
    if (name !== reducerName && !isInitializationCall) return state

    return reducerFunction(state, action)
  }
}

const rootReducer = combineReducers({
  counterA: createNamedWrapperReducer(counter, 'A'),
  counterB: createNamedWrapperReducer(counter, 'B'),
  counterC: createNamedWrapperReducer(counter, 'C')
})
~~~

