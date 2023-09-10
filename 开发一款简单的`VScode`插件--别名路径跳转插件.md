# 开发一款简单的`VScode`插件--别名路径跳转插件

## 前言

`vue`项目引入组件或者其他静态资源的方式多种多样，部分引入方式会导致`vscode`默认跳转到定义的功能失效，比如：

-  alias 别名引入 `import Notice from '@/components/notice'`
- 按需加载的引入`const Condition = resolve => require(['../components/condition'], resolve)`
- 路由懒加载`import('@/Foo.vue')`
- 多方式结合及其他

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/yinrufangshi.png)

针对这种需求让我们自己写一个跳转到定义的简单的`vscode`插件，来完成跳转，用眼睛找是不可能的

## 我的项目

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/alias.png)

支持任何项目包括`Vue` `React`小程序等等
目前已经更新了十几个版本，有450用户了，开源在[github](https://github.com/seolhw/alias-skip)上，欢迎使用，欢迎反馈

## 具体功能

我们的插件要完成以下功能

- 能够识别各种引入方式，`Ctrl`+左键点击跳转到目标页面
- 能够处理缺省后缀名的情况
- 能够处理目录的情况，是目录的情况下，查找目录下的默认文件

## 一些概念

`vscode`的强大得益于丰富的插件，`vscode`为插件开发封装了很多`api`，比如命令，悬停提示，语法高亮，跳转定义等等，插件开发只要正确的使用这些`api`即可

## 开发

- 安装脚手架（全局安装）

  ```javascript
  yarn global add yo generator-code // 或者 npm install yo generator-code -g
  ```

- 搭建项目

  ```javascript
  yo code // 不需要新建项目文件夹，yo会自动创建
  ```

  ![](https://minio.lihuiwang.net/notes/notes/2023/09/10/yocode.png)

  选择需要的配置，官方推荐使用`TypeScript`来开发，并且`vscode`本身就是`TS`开发的，它的文档也全是`TS`格式了，我们也选择`TS`，其他随便选择填写即可

- 项目目录

  ![](https://minio.lihuiwang.net/notes/notes/2023/09/10/hellomulu.png)

  - `src`源代码目录

  - `package`项目描述目录
  
  - `package.json`主要配置说明
  
  - `name`插件的表示，必填且唯一
  
  - `displayName`插件在插件市场中显示的名字，必填
  
  - `version`版本号，必填，`vscode`插件市场规定，更新插件，版本号也必须增加
  
  - `engines`最低兼容的`vscode`版本，低于这个版本的`vscode`客户端安装此插件，会提示不兼容
  
  - `categories`插件类型
  
  - ` activationEvents `配置激活事件，默认`onCommand:extension.helloWorld`，意思是使用`helloWorld`命令时，插件激活，可以配置为`*`，意思是启动`vscode`即可激活插件
  
  - `main`插件的主入口，在此处加载插件
  
  - `icon`图标，显示在插件市场中的图标
  
  - `contributes`插件配置项，插件的主要配置项，快捷键，命令，菜单，settings配置，代码片段等等
  
    - `configuration`，会出现在用户的`settings`配置中，我们在这里配置三个选项，路由映射规则、判断项目根目录的依据，可缺省后缀名的文件列表
  
      ```
      "contributes": {
          "configuration": {
            "type": "object",
            "title": "alias-skip",
            "properties": {
              "alias-skip.mappings": {
                "type": "object",
                "default": {
                  "@": "/src"
                },
                "description": "路径映射，例如{'@':'/src','components':'/src/components'}，/表示项目根目录"
              },
              "alias-skip.rootpath": {
                "type": "string",
                "default": "package.json",
                "description": "判断项目根目录的依据，默认为package.json，即存在该文件的目录为项目根目录"
              },
              "alias-skip.allowedsuffix": {
                "type": "array",
                "default": [
                  "js",
                  "vue",
                  "jsx",
                  "ts"
                ],
                "description": "可缺省后缀名的文件列表"
              }
            }
          }
        }
      ```
  
      - 其他配置用不到
  
- 运行项目

  ```
yarn run watch
  ```

  启动本地开发服务，这个命令可以监听`ts`文件的变化实时生成新的`js`文件

- 核心代码

  ```
  // src/extension.ts
  import * as vscode from 'vscode'; // 引入vscodeAPI库
  export function activate(context: vscode.ExtensionContext) {  // 插件激活执行此方法
  	// 注册helloworld命令
  	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
      	// 用户触发helloworld命令会执行此函数
  		vscode.window.showInformationMessage('Hello World!'); 
  	});
  	context.subscriptions.push(disposable);
  }
  export function deactivate() { // 插件卸载执行此方法
  
  }
  ```

- 调试代码

  在`vscode`中打开此项目（最好打开一个新的工作区），按`F5`进行调试（会打开一个扩展开发主机），我们在原编辑器中修改代码，在扩展开发主机中调试，扩展开发主机相当于安装了这个插件的用户端

  ![](https://minio.lihuiwang.net/notes/notes/2023/09/10/tiaoshi.png)

- 思路

  我们在`activate`函数中注册一个定义跳转的函数，当用户使用`Ctrl`+`click`，点击路径时，我们通过函数的参数拿到这个路径，先判断路径时相对路径还是别名路径，

  - 如果是别名路径，通过`workspace.getConfiguration`拿到用户填写的别名映射规则和根目录标识，将别名路径和根目录拼接成绝对路径返回即可，
  - 如果是相对路径就直接拼接上当前的目录返回即可

  当然还有一些细节也要处理，比如

  - 查找根目录，同一项目只会查找一次，查找后存入缓存中，后面的路径跳转直接在缓存中取出根目录，以优化性能
  - 拿到目标文件的绝对路径，先判断文件是否有后缀
    - 有，判断文件是否存在，存在就跳转，不存在就没有任何效果
    - 没有后缀，就是拿到用户设置的可缺省文件列表，一一加上去，直到某个文件可以打开，如果还没有存在的文件，就认为它是一个目录，默认追加上index文件，再次添加可缺省后缀，直到可以打开

  代码实现：

  ```
  // src/extension.ts
  import * as vscode from 'vscode'
  import { screeningPath, rootPath, joiningSuffix, screeningRelativePath } from './utils'
  const path = require('path')
  
  const activate = function (context: vscode.ExtensionContext) {
    const hoverHander = vscode.languages.registerDefinitionProvider([
    	// 文档选择器，即使用此功能的文件类型
      { scheme: 'file', language: 'vue' },
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'javascriptreact' }
    ], {
    	// 定义跳转函数，函数名由vscode提供，不可改
      provideDefinition(document, position, token) {
        const fileName = document.fileName; // 当前文件的绝对路径加文件名
        const workDir = path.dirname(fileName); // 当前文件的绝对路径
        const linetext = document.lineAt(position).text; // 当前行字符串
        const q = screeningPath(linetext) // 路由别名目标路径
        const z = rootPath(workDir, context) // 项目根目录
        const u = screeningRelativePath(linetext) // 相对路径的目标路径
        let targetPath = '' // 要跳转的目标路径
        if (q && z) {
          targetPath = path.resolve(z, q)
        } else if (u) {
          targetPath = path.resolve(workDir, u)
        }
        const k = joiningSuffix(targetPath) // 文件存在就返回目标文件，不存在就返回空字符串
        if (!k) return
        return new vscode.Location(vscode.Uri.file(k), new vscode.Position(0, 0))
      }
    })
    context.subscriptions.push(hoverHander)
  }
  
  const deactivate = function () {
  
  }
  
  export {
    activate, deactivate
  }
  ```

  ```
  src/utils.ts
  import * as vscode from 'vscode'
  const fs = require('fs')
  const path = require('path')
  const { mappings, rootpath: rootfile, allowedsuffix } = (<any>vscode.workspace.getConfiguration().get('alias-skip'))
  
  /**
   * 从文本中过滤出路径
   * @param {string} linetext 包含路径的字符串
   * @returns 目标路径
   */
  const screeningPath = function (linetext: string): string {
    let c = /('.+')|(".+")/
    let arr = linetext.match(c)
    if (arr) {
      let text = arr[0].substring(1, arr[0].length - 1)
      let [key, ...m] = text.split('/')
      if (mappings.hasOwnProperty(key)) {
        let e = mappings[key]
        if (e[0] === '/') {
          e = e.substring(1)
        }
        return path.join(e, ...m)
      }
    }
    return ''
  }
  /**
   * 通过当前文件的绝对路径和配置的根文件解析出根目录，并储存已获取的项目根目录
   * @param {*} presentPath 当前文件路径
   * @param {*} context 当前上下文对象
   * @returns 输出根目录
   */
  const rootPath = function (presentPath: string, context: vscode.ExtensionContext): string {
    const memento = context.workspaceState
    let rootList = memento.get('rootList', [])
    for (const item of rootList) {
      if (presentPath.indexOf(item) === 0) {
        return item
      }
    }
    let arr = presentPath.split(path.sep);
    let len = arr.length
    let base = ''
    for (let index = 0; index < len; index++) {
      let z = fs.existsSync(path.join(...arr, rootfile))
      if (z) {
        base = path.join(...arr)
        memento.update('rootList', [...rootList, base])
        return base
      } else {
        arr.pop()
      }
    }
    return base
  }
  /**
   * 通过目标的路径拼接后缀并验证该文件存在
   * @param {*} targetPath 目标路径
   * @returns 拼接上后缀名并返回
   */
  const joiningSuffix = function (targetPath: string) {
    const extname = path.extname(targetPath)
    if (!extname) {
      for (const item of allowedsuffix) {
        if (fs.existsSync(`${targetPath}.${item}`)) {
          return `${targetPath}.${item}`
        }
      }
      targetPath = path.join(targetPath, 'index')
      for (const item of allowedsuffix) {
        if (fs.existsSync(`${targetPath}.${item}`)) {
          return `${targetPath}.${item}`
        }
      }
    } else if (fs.existsSync(targetPath)) {
      return targetPath
    } else {
      return ''
    }
  }
  /**
   * 从文本中过滤出相对路径
   * @param {string} linetext 包含路径的字符串
   * @returns 目标路径的相对路径
   */
  const screeningRelativePath = function (linetext: string) {
    let arr = linetext.match(/('\..+')|("\.+")/) // 正则匹配
    let text = ''
    if (arr) {
      text = arr[0].substring(1, arr[0].length - 1)
    }
    return text
  }
  
  export {
    screeningPath,
    rootPath,
    joiningSuffix,
    screeningRelativePath
  }
  ```

## 发布

安装打包工具`vsce`，官方提供的打包工具，将插件打包成` vsix `文件，发布`vscode`市场中，这意味着我们不必开源代码，可以用来做一些公司内部工具之类的

```
yarn global add vsce
```

- [创建或登录微软账号](https://account.microsoft.com)
- [创建或登录Azure账号](https://aex.dev.azure.com/me?mkt=zh-CN)
- [进入这个页面](https://dev.azure.com/seolhw/?_a=newProject)
- 点击右上角创建token
  - ![](https://minio.lihuiwang.net/notes/notes/2023/09/10/token.png)
- 



项目地址 [github]( https://github.com/seolhw/alias-skip )

  

  

  