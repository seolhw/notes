useState、useEffect、useContent和useReducer、useMemo和 useCallback、useRef

# HOOKS-01 useState

1、 useState会返回一对值：当前状态和一个让你更新它的函数。

2、在useState后面，括号里面填写默认值，可以是任意类型；

3、如果useState设置初始值需要经过复杂计算获得，可以使用一个函数；

~~~javascript
import React, { useState } from 'react';
function Example () {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* 使用 */}
      <p>You clicked {count} times</p>
      {/* 设置 */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default Example
~~~

# HOOKS-02 useEffect

1、 useEffect可看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。 

2、 如果 effect 返回一个函数，React 将会在执行清除操作时调用。 React 会在组件卸载的时候执行清除操作， React *会*在执行当前 effect 之前对上一个 effect 进行清除 。

3、 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。

~~~javascript
import React, { useState, useEffect } from 'react';
useEffect(() => {
    console.log(count)
    return () => {
       console.log('leave')
    }// // 清除订阅
}, [count]);// 仅在 count 更改时更新
~~~

# HOOKS-03 createContext和useContext

 useContext接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的  <MyContext.Provider> 的value决定。

~~~javascript
//父组件 App.js
export const ColorContext = createContext(null)
<ColorContext.Provider value={{ color, dispatch }}>
     <ShowArea />
     <Buttons />
</ColorContext.Provider>
~~~

~~~javascript
//子组件 showArea
import { ColorContext } from './App';
function ShowArea () {
  const { color } = useContext(ColorContext)
  return (<div style={{ color: color }}>字体颜色为blue</div>)
}
export default ShowArea
~~~

# HOOKS-04  useReducer

~~~javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
~~~

# HOOKS-05 useMemo和useCallback

 `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`，优化性能， 该回调函数仅在某个依赖项改变时才会更新 。

~~~javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],//依赖项
)
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
~~~

# HOOKS-06 useRef

 `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变 。

~~~javascript
const refContainer = useRef(initialValue);
~~~

 一个常见的用例便是命令式地访问子组件： 

~~~j
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
~~~

如何获取上一轮的 state（利用useRef存储值）

~~~javascript
import React, { useState, useEffect, useRef } from 'react'
function Counter () {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <>
      <h1>Now: {count}, before: {prevCount}</h1>
      <button onClick={() => setCount(count + 2)}>增加</button>
    </>
  )
}

function usePrevious (value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
export default Counter
~~~

