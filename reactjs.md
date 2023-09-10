# React-01 理论知识点

## React优缺点

优点：

- （1）组件化开发
- （2）引入虚拟DOM,性能好,响应速度快
- （3）JSX语法糖
- （4）单向数据绑定 Data Flow
- （5）跨浏览器兼容
- （6）完善的生态圈和活跃的社区

缺点：

不是完整MVC框架,不适用于复杂的大型应用

## 什么是虚拟DOM结构

相当于是一个对象 当视图有更新的时候 会生成一个新的对象，并与旧的进行比较 把有区别的地方进行更新 其他的不变 这样提高了高速渲染

### react中的diff算法

diff算法是数据层面的差异比较，当使用React的时候，在某个时间点 render() 函数创建了一棵React元素树，在下一个state或者props更新的时候，render() 函数将创建一棵新的React元素树， React将对比这两棵树的不同之处，计算出如何高效的更新UI（只更新变化的地方）。

##  语法糖JSX

语法糖是指计算机语言中添加的某种语法,这种语法对语言的功能并没有影响,但是更方便程序员使用。

它主要的目的是增加程序的可读性,从而减少程序代码出错的机会。

- 这个语法不能直接被浏览器所解析 必须借助于babel文件去解析，把js和html混合使用
- 当它遇见`<>`的时候 就自动解析为html标签 如果它遇见`{}`会解析成js语法

### 在JSX语法注意事项

1. 只能有一个根元素；
2. 必须有闭合标签，如果是单标签，需要自闭合（带/号）；
3. 不能使用for，需要使用`htmlFor`；
4. 不能使用class，需要使用`className`；
5. 在input框中，默认值是使用`defaultValue`

# React-02 脚手架

## Create React App

```javascript
npx create-react-app my-app
cd my-app
npm start
```

~~~javascript
yarn global add create-react-app
yarn create-react-app my-app  
cd my-app
npm start
~~~

**注意：** 第一行的 `npx` 不是拼写错误 —— 它是 npm 5.2+ 附带的 package 运行工具。 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 path里找。如果依然找不到，就会帮你安装。

# React-03 组件 & Props

## 函数组件与calss组件

### 函数组件&props

~~~javascript
//父组件
<App name="Sara"/>
~~~

~~~javascript
//子组件
import React from 'react';
import './App.css';

function App(props) {
  return (
    <div className="App">
        <p>
          {props.name} Welcome to here
        </p>
    </div>
  );
}

export default App;
~~~

### class组件&props

~~~javascript
//父组件
<App name="Sara"/>
~~~

~~~javascript
//子组件
import React,{Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return <h1>Hello, {this.props.name},Welcome to here!</h1>;
  }
}

export default App;
~~~

# React-04 State & 生命周期

## 向class组件中添加局部的state

~~~javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
~~~

## 将生命周期方法添加到class中

~~~javascript
import React from 'react';
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  //当组件的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  //一旦组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法
  componentWillUnmount() {
    clearInterval(this.timerID)
  }

   tick(){
    this.setState({
      date: new Date()
    })
   }
  
  //state改变会重新调用 render() 方法
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
export default Clock
~~~

## 正确地使用State

1、不要直接修改state而是应该setState()

2、state的更新可是异步的

 因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数： 

~~~javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
})

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}))
~~~

3、state的更新会被合并

## 数据是向下流动的

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的 state 作为 props 向下传递到它的子组件中：

这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

# React-05 事件处理

~~~javascript
<h1 onClick={this.output.bind(this,'123')}>Hello, world!</h1
<h1 onClick={()=>this.output('123')}>Hello, world!</h1>
output=(val)=>{
  console.log(val)
}
//里面包了一个函数，导致里面的this指向可能有问题，因此在定义方法里面需要修改为箭头函数形式，如果不需要传参，则不需要修改箭头函数形式；
~~~

# React-06 条件渲染

## 元素变量

~~~javascript
import React from 'react';
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={()=>this.handleLogoutClick()} />;
    } else {
      button = <LoginButton onClick={()=>this.handleLoginClick()} />;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
}
export default LoginControl
~~~

## 与运算符 &&

~~~javascript
{unreadMessages.length > 0 &&
   <h2>
     You have {unreadMessages.length} unread messages.
   </h2>
}
~~~

## 三目运算符

~~~javascript
The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
~~~

## 阻止组件渲染

 在极少数情况下，可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。 

~~~javascript
function LoginButton(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
~~~

# React-07 列表&Key

~~~javascript
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
~~~

# React-08 表单

## input和textarea标签

~~~javascript
<input type="text" value={this.state.value} onChange={this.handleChange} />
<textarea value={this.state.value} onChange={this.handleChange} />
~~~

## select标签

~~~javascript
import React from 'react';

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'}
  }

  handleChange=(event)=>{
    this.setState({value: event.target.value});
  }

  handleSubmit=(event)=>{
    alert('你喜欢的风味是: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
export default FlavorForm
~~~

# React-09 状态提升

**需求：**  创建一个用于计算水在给定温度下是否会沸腾的温度计算器 ，在已有摄氏温度输入框的基础上，提供华氏度的输入框，并保持两个输入框的数据同步。

父组件：App.js

~~~javascript
import React from 'react';
import TemperatureInput from './TemperatureInput'
import BoilingVerdict from './BoilingVerdict'
//转换为摄氏温度
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

//转换为华氏度
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

//封装一个函数，使用它来依据一个输入框的值计算出另一个输入框的值
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
  }
 
  handleCelsiusChange=(temperature)=> {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange=(temperature)=> {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const {scale, temperature}=this.state
    //摄氏温度
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    //华氏度
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        {/* 摄氏温度输入框 */}
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        {/* 华氏度的输入框 */}
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        {/* 是否会沸腾的温度计算器 */}
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
export default Calculator
~~~

子组件：TemperatureInput.js

~~~javascript
import React from 'react';
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  handleChange=(e)=>{
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const {temperature,scale}=this.props
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
export default TemperatureInput
~~~

子组件：BoilingVerdict.js

~~~javascript
import React from 'react';
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
export default BoilingVerdict
~~~

# React-10 组合vs继承

## 包含关系

### 使用children

有些组件无法提前知晓它们的子组件的具体内容（公共弹窗）。建议这些组件使用一个特殊的props.children来将他们的子组件传递到渲染结果中。

~~~javascript
import React from 'react';
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
export default FancyBorder
~~~

这使得别的组件可以通过JSX嵌套，将任意组件作为子组件传递给它们。

~~~javascript
import React from 'react';
import FancyBorder from './FancyBorder'
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      {/* 子组件渲染内容开始 */}
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
      {/* 子组件渲染内容结束 */}
    </FancyBorder>
  );
}
export default WelcomeDialog

//JSX 标签中的所有内容都会作为一个 children prop 传递给 FancyBorder 组件。因为 FancyBorder 将 {props.children} 渲染在一个 <div> 中，被传递的这些子组件最终都会出现在输出结果中。
~~~

### 自行约定 

少数情况下，你可能需要在一个组件中预留出几个“洞”。这种情况下，我们可以不使用 `children`，而是自行约定：将所需内容传入 props，并使用相应的 prop。

 ~~~javascript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
 ~~~

## 特例关系

 有些时候，我们会把一些组件看作是其他组件的特殊实例，比如 SignUpDialog可以说是 Dialog的特殊实例。  在 React 中，我们也可以通过组合来实现这一点。“特殊”组件可以通过 props 定制并渲染“一般”组件： 

~~~javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
~~~

## 继承

在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。

Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。

# React-other 其它知识点

**纯函数：**因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。 





嵌套路由、主要成分（路由器、路线匹配器）、钩子（useHistory、useLocation、useParams、useRouteMatch）、<BrowserRouter>(basename、getUserConfirmation、forceRefresh、keyLength、children)、Route（[children、component、render]、path、sensitive、exact）、

# React Router-01 嵌套路由

路由嵌套需要在父级组件里写二级路由。

~~~javascript
let {path, url} = useRouteMatch()
 <Switch>
        <Route path={`${path}/me`} component={MyProfile}></Route>
        <Route path={`${path}/:id`} component={OthersProfile}></Route>
 </Switch>
//path:指的是当前的路由
~~~

# React Router-02 路由封装

创建路由静态文件routes.js

~~~javascript
import React from 'react'
function Home () {
  return (
    <div>
      Home
    </div>
  )
}
function About (props) {
  return (
    <div>
      About
      {props.routeView}
    </div>
  )
}
function My () {
  return (
    <div>
      My
    </div>
  )
}
const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    component: About,
    children: [
      {
        path: '/about/my',
        component: My
      },
      {
        redirect: '/about/me'
      }
    ]
  }
]
export default routes
~~~

创建路由搭建文件Root.js

~~~javascript
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import WrapRouter from './WrapRouter'
import routes from './routes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.renderRoutes = null
  }

  // 循环引入路由
  renderRoute = (routes) => {
    return (
      routes.map(({ children, ...route }) => {
        let routeView = null
        if(children) {
          routeView = (
            <Switch>
              {this.renderRoute(children)}
            </Switch>
          )
        }

        if(route.redirect) {
          return (
            <Redirect key={route.redirect} to={route.redirect} />
          )
        } else {
          return (
            <WrapRouter
              {...route}
              routeView={routeView}
              key={route.path}
            />
          )
        }
      })
    )
  }

  render() {
    // 避免重复循环渲染, 加入判断
    if(!this.renderRoutes) {
      this.renderRoutes = this.renderRoute(routes)
    }
    return (
      <Switch>
        {this.renderRoutes}
        <Redirect to='/' />
      </Switch>
    )
  }
}

export default App

//   return (
//     <Switch>
//       <Route path="/" exact component={Home}></Route>
//       <Route path="/about" render={() => {
//         return (
//           <About routeView={
//             <Switch>
//               <Route path="/about/my" component={My}></Route>
//               <Redirect to='/about/my' />
//             </Switch>
//           }></About>
//         )
//       }}></Route >
//       <Redirect to='/' />
//     </Switch >
//   )
~~~

 创建WrapRouter，用于拦截路由 

~~~javascript
import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

const WrapRouter = ({ component: Component, routeView, ...rest }) => {
  useEffect(() => {
    // 父组件也会使用, 仅仅对比最后的路由即可;
    if(rest.path === window.location.pathname && rest.meta.title) {
      document.title = rest.meta.title
    }
  }, [ rest ])

  return (
    <Route
      {...rest}
      exact
      render={routerProps =>
        <Component {...routerProps} routeView={routeView} />
      }
    />
  )
}

export default WrapRouter
~~~

修改入口文件index.js

~~~javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
~~~

# React Router-03 编程式导航

~~~javascript
props.history.push() 跳转链接
props.history.replace() 替换当前链接，不能返回
props.history.go(-1) 返回
~~~

~~~javascript
let history = useHistory()
history.push("/home")
~~~

# React Router-04 路由传参

1、动态路由

（1）传值：  /detail/:id    

（2）取值： props.match.params.id        

（1）传值： {pathname:'/detail',query:{id:1}} 

（2）取值： props.location.query.id 

（1）传值： '/home?name=hny&age=18' 

（2）取值：  props.location.search

当读取不到时的解决方法

~~~javascript
// 第一种方式
const params = new URLSearchParams(props.location.search)
console.log(params.get('name'))

// 第二种方式
import querystring from 'querystring'
const params = querystring.parse(props.location.search)
console.log(params.name)
~~~

编程式导航

~~~javascript
<button onClick={()=>this.props.history.push('/detail'+item.id)}
~~~





