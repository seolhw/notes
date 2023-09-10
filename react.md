yarn global add create-react-app  全局安装创建react-app的module

create-react-app fist-react-demo  在某个文件夹下创建fist-react-demo这个项目，但是，有可能会报错 Unexpected end of JSON input while parsing near '....0","dependencies":{"' ，假如报错，需要执行npm cache clean --force

git init 初始化git

git remote add origin https://github.com/llt0914/reactdemo2.git  跟踪远程仓库

git push -u origin master  跟踪远程分支



#### withRouter:

作用是将一个组件包裹进`Route`里面, 然后`react-router`的三个对象`history, location, match`就会被放进这个组件的`props`属性中,( 如果我们某个东西不是一个`Router`, 但是我们要依靠它去跳转一个页面, 比如点击页面的`logo`, 返回首页, 这时候就可以使用`withRouter`来做 )

```javascript
import React,{ Component } from 'react'
import { browserHistory } from 'react-router';
import {
    NavLink,
    withRouter
} from "react-router-dom"
import { matchRoutes，renderRoutes } from "react-router-config";

// 导出的是 withRouter(Nav) 函数执行

class Nav extends Component{

    handleClick = () => {
        // Route 的 三个对象将会被放进来, 对象里面的方法可以被调用
        console.log(this.props);
    }
    render() {
        return (
            <div className={'nav'}>
                <span className={'logo'} onClick={this.handleClick}>掘土社区</span>
                <li><NavLink to="/" exact>首页</NavLink></li>
                <li><NavLink to="/activities">动态</NavLink></li>
                <li><NavLink to="/topic">话题</NavLink></li>
                <li><NavLink to="/login">登录</NavLink></li>
            </div>
        );
    }
}
export default withRouter(Nav)

const branch = matchRoutes(routes, pathname);//匹配对应的路由规则
```

1. history.push(path, [state])
2. history.replace(path, [state])
3. history.go(n)
4. history.goBack()
5. history.goForword()

生命周期

mount:{

​	constructor():全局只执行一次，声明state

​	getDerivedStatesFeomProps( props,states)

​	render()

}

