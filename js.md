# 数组中的方法

## 数据结构类型的隐式转换

### 调用Boolean（）方法的隐式转换

boolean(option)方法将option转化为true/false

~~~javascript
为false的情况：
1、0
2、''
3、null
4、undefined
5、NaN
6、false
~~~

1、if（）{}

2、三目运算符

3、||

4、&&

### 调用Number（）方法的隐式转换

1、+ - * \

注意：+是比较特殊的：+遇到字符串类型的 就不在进行运算 而是变为拼接符

~~~javascript
let z = 0
console.log("TCL: mounted -> z", z?1:2)//2
let z = ''
console.log("TCL: mounted -> z", z?1:2)//2
let z = 0
console.log("TCL: mounted -> z", z||2)//2
let z = ''
console.log("TCL: mounted -> z", z||2)//2
let z=[1,2,3]
console.log("TCL: mounted -> z", z[undefined])//undefined
let order={dept1:0,dept2:'',dept3:''}
let number={dept:(order.dept1+order.dept2+order.dept3) ||''}
console.log("TCL: mounted -> z", undefined+undefined+undefined)//NaN
console.log("TCL: mounted -> z", undefined+''+undefined)//NaN
~~~

## 创建众多数组的方法

~~~javascript
new Array(20).fill(null).map((item,index)=>{
				return {
				  name:1
				}
			}),

Array.apply(null, {length: 20}).map((item,index) => ({
				name:0
			})),

var args = new Array(3);
for (var i = 0; i < 3; ++i) {
  args[i] = {
    index:i,
    name:'哈哈'
  }
}

let arr=Array.from({ length: 2 }, (value,index) => {
  let obj={
    id:index,
    name:'haha'
  }
  return obj
})
~~~

# 浏览器问题

## 判断是哪个浏览器打开的页面

~~~javascript
if (/MicroMessenger/.test(window.navigator.userAgent)) {
    alert('微信客户端');
} else if (/AlipayClient/.test(window.navigator.userAgent)) {
    alert('支付宝客户端')
} else {
    alert('其他浏览器')
}
~~~

# 其它问题

## 联动身份证验证出生日期和性别

~~~javascript
doubleTest(){
//获取出生年月
this.formInline.borth=this.formInline.idNumber.substring(6,10)+'-'+this.formInline.idNumber.substring(10,12)+'-'+this.formInline.idNumber.substring(12,14)
//验证性别
this.formInline.sex(this.formInline.idNumber.substring(16,17)%2==0?'女':'男')
}
~~~

## 防抖和节流

~~~javascript
   <button onclick="show()">点击</button>
   /*
    防抖-定时器立即执行版
    */
	let timer=null
    function show(){
      let flag = !timer
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        timer = null
      }, 3000)
      if (flag) {
        console.log('11111')
      }
    }
    /*
    防抖-定时器延迟执行版
    */
    let timer=null
    function show(){
      if(timer){
        clearInterval(timer)
      }
      timer= setTimeout(()=>{
        console.log('111111')
      },3000)
    }
    /*
    节流-时间戳版
    */
    let oldTime=null
    function show(){
      let nowTime=+new Date()
      if(nowTime-oldTime>3000){
        console.log('111111')
        oldTime=+new Date()
      }
    }
    /*
    节流-定时器版
    */
    let flag=true
    function show(){
      if(!flag)return
      flag=false
      setTimeout(()=>{
        console.log('1111111')
        flag=true
      },3000)
    }
	/*
    节流-定时器版（封装）
    */
	const scrollJieLiu = () => {
     let timer
      return (fn) => {
        if (timer) {
          return
        }
        timer = setTimeout(() => {
          fn()
          timer = null
        }, 3000)
      }
	}

函数防抖和节流
https://www.jianshu.com/p/c8b86b09daf0
//防抖立即执行版
//立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
function debounce(fn,delay=1000){
    let timer=null
    return function(){
        let callNow=!timer  //是否执行函数
        if(timer) clearTimeout(timer)
        timer= setTimeout(()=>{
            timer=null
        },delay)
       if(callNow) fn
    }
}
//防抖非立即执行
//非立即执行版的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
function debounce(fn,delay=1000){
    let timer
    return function(){
        if(timer) clearTimeout(timer)
        timer=setTimeout(fn,delay)
	}
}

/*
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
*/
function debounce(fn,delay=1000,immediate=true){
    let timer
    return function(...args){
        if(timer) clearTimeout(timer)
        if(immediate){ //立即执行
            let callNow=!timer
            tlmer=setTimeout(()=>{
				tlmer=null
            },delay)
            if(callNow) fn.apply(this,args)
			
        }else{
			timer=setTimeout(()=>{
				fn.apply(this,args)
            },delay)
        }
    }
}

//节流
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表时间戳版，false 表定时器版
 */
function throttle(fn,wait=1000,immediate=true){
	let previous = 0
    let timer
    return function(...args){
		if(immediate){
            //时间戳版函数会立即执行，并且每 wait秒 执行一次
            let now=+new Date()
			if(now-previous>wait){
				fn.apply(this,args)
                previous=now
            }
    	}else{
            //定时器版，函数不会立即执行，并且每 wait秒 执行一次，在停止触发事件后，函数还会再执行一次。
			if(!timer){
				 timer=setTimeout(()=>{
                    fn.apply(this,args)
                    timer=null
                },wait)
            }
        }
    }
    
}
~~~





### 对象的深浅拷贝

浅拷贝的方法：（**将目标对象的指针指向源对象的内存地址，所以当修改目标对象的数组的某一元素或者对象的某一属性值时，源对象也会被修改**）

- 直接赋值
- 解构赋值
- `Object.assign({}, sourceObj)`
- `jQuery.extend(sourceObj)`

深拷贝的方法：（**不让目标对象的指针指向源对象的内存地址，而是新开一块内存地址，并且将源对象的数据复制一份到目标对象，两个对象的指针指向不同，那么修改一个时将不会影响另一个。**）

- `JSON.prase(JSON.stringify(obj))`
- `jQuery.extend(true, sourceObj)`



```
var source = {

  num: 123,

  str: '1234',

  arr: ['zhangsan', 'lisi', 'wangwu'],

  obj: { age: 12, name: 'zhuanzhuan'}

};

var target = Object.assign({}, source);

target.arr[0] = '张三';

target.obj.name = '转转';



console.log(target === source);

console.log('---target', target);

console.log('---source', source);
```

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js1.jpg)

```
var source = {
  num: 123,
  str: '1234',
  arr: ['zhangsan', 'lisi', 'wangwu'],
  obj: { age: 12, name: 'zhuanzhuan'}
};
var target = {...source};
target.arr[0] = '张三';
target.obj.name = '转转';

console.log(target === source);
console.log('---source', source);
console.log('---target', target);
```

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js2.jpg)

```
var source = {

  num: 123,

  str: '1234',

  arr: ['zhangsan', 'lisi', 'wangwu'],

  obj: { age: 12, name: 'zhuanzhuan' }

}

var target = JSON.parse(JSON.stringify(source));

target.arr[0] = '张三';

target.obj.name = '转转';



console.log(target === source);

console.log('---target', target);

console.log('---source', source);
```

<img src="https://minio.lihuiwang.net/notes/notes/2023/09/10/js3.jpg"  />



为什么`JSON.parse()`和`JSON.stringify()`可以实现深拷贝呢？

`stringify()`方法可以将一个`JS`对象序列化一个`JSON`字符串，`parse()`方法可以将`JSON`字符串反序列化为一个`JS`对象。`JSON`字符串转化为`JS`对象时会建一个新对象。

那么问题就来了，如果源对象的属性值是一个`Function`对象或者`undefined `或者`null`时，会怎么样？

从以下打印的日志中可以看到，原对象的方法和`undefined`类型的键值在拷贝的过程中丢失了，原因是在序列化JS对象的过程中，所有的函数和`undefined`类型会被有意的忽略。

**通常这种方式也用在请求后端接口时需要过滤掉`undefined`类型值的时候。**

```
var source = {
  num: 123,
  str: '1234',
  arr: ['zhangsan', 'lisi', 'wangwu'],
  obj: { age: 12, name: 'zhuanzhuan'},
  fn: function () { return 'fn' },
  name: undefined,
  age: null
};
var target = JSON.parse(JSON.stringify(source));
target.arr[0] = '张三';
target.obj.name = '转转';

console.log(target === source);
console.log('---source', source);
console.log('---target', target);

```

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js4.jpg)

`jQuery.extend( [deep ], target, object1 [, objectN ] )`，其中`deep`为`Boolean`类型，如果是`true`，则进行深拷贝。以下面两段代码为例：

```javascript
var source = {
    num: 123,
    str: '1234',
    arr: ['zhangsan', 'lisi', 'wangwu'],
    obj: { age: 12, name: 'zhuanzhuan'},
    fn: function () { return 'fn' }
};
var target = $.extend(true, source); // 深拷贝
var target = $.extend(source); // 浅拷贝
```

### 深拷贝

1、 Lodash 的 merge方法 

~~~javascript
import merge from 'lodash/object/merge'
merge({}, state, action.entities.comments.byId)
~~~

2、JSON

~~~javascript
JSON.parse(JSON.stringify(state))
~~~

##  根据另一个数组更改当前数组

~~~javascript
let old= [
    {
      id:1,
      checkitems:[
        {
          id:6
        }
      ]
    },
    {
      id:2,
      checkitems:[
        {
          id:3,
        },
        {
          id:4,
          s:0
        },
        {
          id:5
        },
        {
          id:6,
          n:9
        }
      ]
    }
  ]
  let arr=[]
  old.forEach(e=>{
    arr.push(...e.checkitems)
  })
let obj={}
arr.forEach(e=>{
  obj[e.id]=e
})
console.log(obj)
~~~



## js iframe打印

~~~javascript

* 创建iframe并实现iframe打印1
let iframe = document.createElement('iframe')
iframe.setAttribute('src', pdfUrl)
iframe.style.display = 'none'
document.querySelector('body').appendChild(iframe)
iframe.onload = () => {
    iframe.contentWindow.print()
}
*创建iframe并实现iframe打印2
iframe = document.createElement('iframe');
iframe.src = '';
document.body.appendChild(iframe)
iframe.style.display = 'none'
iframe.onload=()=>{
    iframe.contentWindow.print()
}
*打开打印对话框打印当前文档
window.print()

*打印当前部分内容，并返回原页面
 function printSomething() {
      // 获取当前页面html代码
      var currentHtml = window.document.body.innerHTML
      // 设置打印开始位置
      var start = '<!--startprint-->'
      // 设置打印结束位置
      var end = '<!--endprint-->'
      // 获取到要打印部分的代码
      var printHtml = currentHtml.substring(currentHtml.indexOf(start) + start.length, currentHtml.indexOf(end))

      // 也可以通过id获取
      //var printHtml = document.getElementById('main').innerHTML

      // 打印
      window.document.body.innerHTML = printHtml
      window.print()
      // 返回原界面
      window.document.body.innerHTML = currentHtml
    }

* export导出（data为后台返回的文档流）
var blob = new Blob([data], {
          type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        //var blob = new Blob([data], { type: 'application/pdf' })
        let elink = document.createElement('a')
        elink.download = '文件名' +  '.csv'
        // elink.download = '文件名' + '.pdf'
        elink.style.display = 'none'
        elink.href = window.URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)

~~~

## export导出文件

### 导出excel

~~~javascript
//导出excel表格
function sexport() {
  var blob = new Blob(['hahhaha'], {//需要导出的数据
    type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  let elink = document.createElement('a')
  elink.download = '今日导出数据'+ '.csv'
  elink.style.display = 'none'
  elink.href = window.URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
}
~~~

### 导出pdf

~~~javascript
//导出pdf表格
function sexport() {
  var blob = new Blob(['hhhh'], { type: 'application/pdf' })
  let elink = document.createElement('a')
  elink.download = '哈哈哈'+ '.pdf'
  elink.style.display = 'none'
  elink.href = window.URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
}
~~~

利用a标签下载文件

~~~javascript
<a href="/myw3schoolimage.jpg" download="w3logo">


let url = window.URL.createObjectURL(data)//data是文件的链接地址
if (url) {
    const link = document.createElement('a')
    link.href = url
    link.download = key//下载的文件名
    link.target = "_blank"
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
~~~

## 转base64流

~~~javascript
getBase64 (file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
~~~

# 上传图片

## 利用file类型的input上传文件

~~~javascript
<input onchange="uploadChange(this)" multiple type="file" accept="image/gif,image/jpeg,image/png">
<canvas id='mycanvas' width="500" height="500"></canvas>

function uploadChange(event){
  let file=event.files[0]
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
  const pic = reader.result;//ArrayBuferr对象
  var mycanvas = document.getElementById('mycanvas')
	var ctx = mycanvas.getContext('2d')
  var img = new Image()
  img.onload = function() {
    ctx.drawImage(img,0,0)
  }
  img.src = pic
};
}
~~~

~~~javascript
//图片裁剪
<input style="display: none"
               ref="fileInput"
               type="file"
               accept="image/jpeg,image/jpg,image/png"
               @change="fileChange"/>
                   
    fileChange (e) {
          let event = e || window.event
          if (event.target.files.length > 0) {
            let file = event.target.files[0]
            // 图片不能超过2M
            if (file.size / 1024 > 2 * 1024) {
              this.$message.error('图片不能大于2M')
              return
            }
            this.imgUrl = this.getObjectURL(event.target.files[0])
            this.dialogFormVisible = true
            // 清除 input filses
            this.$refs.fileInput.value = ''
          }
        }

	/**
     * 获取上传图片Url
     */
    getObjectURL (file) {
      let url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    }

 <cropper :imgUrl="imgUrl"
               @getcropperImgUrl="getcropperImgUrl"
               :dialogFormVisible.sync="dialogFormVisible"></cropper>

<div class="cropper">
    <div class="cropper-box">
      <VueCropper autoCrop
                  :img="imgUrl"
                  ref="cropper"
                  centerBox
                  :outputSize="0.98"></VueCropper>
    </div>
    <div class="btn-div">
      <el-button type="primary" @click="saveBtn">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
import { VueCropper } from 'vue-cropper'
  props: ['imgUrl'],
saveBtn () {
      this.$refs.cropper.getCropData(data => {
        this.$emit('getcropperImgUrl', data)
        this.$emit('update:dialogFormVisible', false)
      })
    },
    cancel () {
      this.$emit('update:dialogFormVisible', false)
    }
~~~



## js全屏

```javascript
/**
 * 实现全屏
 */
function fullScreen () {
  let fullscreenElement = document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullScreenElement ||
        document.webkitFullscreenElement || null
  if (fullscreenElement) {
    let exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen
    if (exitMethod) {
      exitMethod.call(document)
    } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
      let wscript = new window.ActiveXObject('WScript.Shell')
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    }
  } else if (!fullscreenElement) {
    let el = document.documentElement// 当前页面
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
    if (rfs) {
      rfs.call(el)
    } else if (typeof window.ActiveXObject !== 'undefined') {
      // for IE，这里模拟了按下键盘的F11，使浏览器全屏
      let wscript = new window.ActiveXObject('WScript.Shell')
      if (wscript != null) {
        wscript.SendKeys('{F11}')
      }
    }
  }
}

/**
 * F11键实现全屏
 */
document.onkeydown = (e) => {
  e = e || window.event
  if (e.keyCode === 122) {
    e.preventDefault()
    if (e.repeat) return
    fullScreen()
  }
}
```

## 解决input框调起手机软键盘页面被顶到底部再关闭软键盘页面底部留白的问题

```javascript
 <input type="text"
 		placeholder="请输入手机号"
        @blur.prevent="inputLoseFocus"
        v-model="phone"
        @keyup="layoutPhone">
        
  inputLoseFocus () {
     setTimeout(() => {
     	window.scrollTo(0, 0)
     }, 100)
  },
```

## 解决弹层鼠标滚动时带动下层页面滑动问题

```javascript
//监听弹层显示与否
watch: {
    dialogFormVisible(newvalue){
      if(newvalue){
        this.$root.$el.style.height = '100vh'
        this.$root.$el.style.overflowY = 'hidden'
      }else{
        this.$root.$el.style.height = null
        this.$root.$el.style.overflowY = null
      }
    }
  }
```

## 解决接口跨域问题

```javascript
//congif/index文件中
proxyTable: {
       '/v1/userQuestionnaireInfo/getUserQuestionnaireInfo': { //跨域的接口
         target: 'http://10.105.18.206:8078',//后端的ip
         changeOrigin: true  //是否跨域
       },
        "/v1/statistical/checkRpt2/download": { 
            target: 'http://10.105.18.61:8073',
         	changeOrigin: true
        }
    }

api接口调用时：
export const queryCheckRpt = (data) => getData(`http://localhost:8085/v1/statistical/queryCheckRpt`, data, 'post')
```

# Git 生成SSH Key 

https://blog.csdn.net/weixin_42522655/article/details/81241532

## 获取内网IP

```javascript
//（不引进第三方，有的浏览器获取到的是IPv4地址，有的是IPv6地址）

mounted() {
     this.getUserIP((ip) => {
         this.ip = ip;
     });
 }

getUserIP(onNewIP) {
        let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        let pc = new MyPeerConnection({
            iceServers: []
          });
        let noop = () => {
          };
        let localIPs = {};
        let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
        let iterateIP = (ip) => {
          if (!localIPs[ip]) onNewIP(ip);
          localIPs[ip] = true;
        };
        pc.createDataChannel('');
        pc.createOffer().then((sdp) => {
          sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });
          pc.setLocalDescription(sdp, noop, noop);
        }).catch((reason) => {
        });
        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
      }
    },
```



# 在浏览器地址栏中输入URL后发生了什么

- **URL解析**

1. 地址解析：首先判断你输入的是一个合法的 URL 还是一个待搜索的关键词，并且根据你输入的内容进行自动完成、字符编码等操作。
2. https:由于安全隐患，会使用 HSTS 强制客户端使用 HTTPS 访问页面。
3. 其它操作：浏览器还会进行一些额外的操作，比如安全检查、访问限制（之前国产浏览器限制 996.icu）。

- **解析域名（DNS解析）**

1. 将输入域名解析成IP地址，具体步骤：
2. 先查找浏览器缓存（即浏览器里的书签和历史记录），如果有就直接推给你
3. 查找系统缓存（即本地hosts文件），如果hosts文件中有指定IP就解析这个IP地址
4. 查找本地DNS服务器。本地DNS服务器会先查找缓存，如果缓存中存在就返回IP，如果没有本地DNS就向根DNS服务器发起请求。
5. 根DNS服务器不会存储域名和IP的对应关系，而是告诉本地DNS可以去.com域服务器上查询，而且会给.com出域服务器的地址。
6. 域服务器上同样也不会存储域名和IP的对应关系，而是告诉本地DNS可以去域名解析服务器上查询，会给出域名解析服务器的地址。
7. 最后，本地DNS想域名解析服务器发起请求，最终就会得到该域名对应的IP地址。本地DNS在获取到IP地址之后，不光会返回到浏览器里，还会保存在缓存中，下次就可以直接在缓存中读取。

-DNS查找过程为：
-浏览器缓存->系统缓存->路由器缓存->ISP DNS缓存->递归搜索
-递归搜索过程为：从根域名服务器到顶级域名服务器到你查询的域名服-务器。

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js5.jpg)

- **建立TCP链接**

1. 三次握手建立链接，即客户端发送链接请求，服务端收到请求后返回给客户端，最后客户端在回传一个数据给服务端。三次握手之所以要链接三次，就是为了保证客户端和服务端既能保证自己能正常发送消息，又能确保对方能正常收到信息。

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js6.png)

客户端发送一个带有SYN标志的数据包给服务端，服务端收到后，回传一个带有SYN/ACK标志的数据包以示传达确认信息，最后客户端再回传一个带ACK标志的数据包，代表握手结束，连接成功。

通俗点理解三次握手：

　　　客户端：老弟我要跟你链接

　　　服务端：好的，同意了

　　　客户端：好嘞

- **浏览器想web服务器发起http请求**

　　　建立TCP连接之后，发起HTTP请求，请求一般分为三部分

　　　请求方法URI协议/版本

　　　请求头(Request Header)

　　    请求正文

　　　下面是完整的请求示意图：

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js7.png)

- **服务器端处理**

　　　服务器端收到请求后的由web服务器（准确说应该是http服务器）处理请求，诸如Apache、Ngnix、IIS等。web服务器解析用户请求，知道了需要调度哪些资源文件，再通过相应的这些资源文件处理用户请求和参数，并调用数据库信息，最后将结果通过web服务器返回给浏览器客户端。

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js8.png)

- **关闭TCP链接**

　　　为了避免服务器与客户端双方的资源占用和损耗，当双方没有请求或响应传递时，任意一方都可以发起关闭请求。与创建TCP连接的3次握手类似，关闭TCP连接，需要4次握手。

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js9.png)

通俗点理解四次握手：

　　　客户端：老弟，我这边没数据要传了，咱们关闭链接吧

　　　服务端：好的，接收到了，我看看我这边还有没有要传的

　　　服务端：我这边也没有了，关闭吧

　　　客户端：好嘞

- **浏览器解析资源**

　　　对于获取到的HTML、CSS、JS、图片等等资源。

　　　浏览器通过解析HTML，生成DOM树，解析CSS，生成CSS规则树，然后通过DOM树和CSS规则树生成渲染树。渲染树与DOM树不同，渲染树中并没有head、display为none等不必显示的节点。

　　　在解析CSS的同时，可以继续加载解析HTML，但在解析执行JS脚本时，会停止解析后续HTML，这就会出现阻塞问题，关于JS阻塞相关问题，这里不过多阐述。

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js10)

-  **浏览器布局渲染**

　　　根据渲染树布局，计算CSS样式，即每个节点在页面中的大小和位置等几何信息。

　　　HTML默认是流式布局的，CSS和js会打破这种布局，改变DOM的外观样式以及大小和位置。这时就要提到两个重要概念：repaint和reflow。

　　　repaint：屏幕的一部分重画，不影响整体布局，比如某个CSS的背景色变了，但元素的几何尺寸和位置不变。

　　　eflow： 意味着元件的几何尺寸变了，我们需要重新验证并计算渲染树。是渲染树的一部分或全部发生了变化。这就是Reflow，或是Layout。

　　　有些情况下，比如修改了元素的样式，浏览器并不会立刻 reflow 或 repaint 一次，而是会把这样的操作积攒一批，然后做一次 reflow，这又叫异步 reflow 或增量异步 reflow。

　　　有些情况下，比如 resize 窗口，改变了页面默认的字体等。对于这些操作，浏览器会马上进行 reflow。



参考文章：https://www.cnblogs.com/yuanzhiguo/p/8119470.html

## JS中的「import」和「require 」

#### $ 对模块化的理解

  模块化是一种将系统分离成独立功能部分的方法，一个模块是为完成一个功能的一段程序或子程序。"模块"是系统中**功能单一**且**可替换**的部分。
   模块化思想是从java上衍生过来的，他将所需要的功能封装成一个类，哪里需要就在哪里调用，JS中没有类的说法，但它引入了这种思想，在js中用对象或构造函数来模拟类的封装实现模块化，而在html上，则使用`import`和`require`

#### $ 所属规范

**require/exports** 是 CommonJS/AMD 中为了解决模块化语法而引入的
 **import/export** 是ES6引入的新规范，因为浏览器引擎兼容问题，需要在node中用`babel`将ES6语法编译成ES5语法

#### $ 调用时间

**require** 是运行时调用，所以理论上可以运作在代码的任何地方
**import** 是编译时调用，所以必须放在文件的开头

#### $ 本质

**require** 是赋值过程，其实`require`的结果就是对象、数字、字符串、函数等，再把结果赋值给某个变量。它是普通的值拷贝传递。
 **import** 是解构过程。使用`import`导入模块的属性或者方法是引用传递。且`import`是`read-only`的，值是单向传递的。`default`是ES6 模块化所独有的关键字，`export default {}` 输出默认的接口对象，如果没有命名，则在`import`时可以自定义一个名称用来关联这个对象

**主流模块规范**

在es6以前，还没有提出一套官方的规范,从社区和框架推广程度而言，目前通行的javascript模块规范有两种：CommonJS 和 AMD（Asynchronous Module Definition）

**CommonJS规范**

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js11.png)

2009年，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程。

这标志”Javascript模块化编程”正式诞生。前端的复杂程度有限，没有模块也是可以的，但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。

node编程中最重要的思想之一就是模块，而正是这个思想，让JavaScript的大规模工程成为可能。模块化编程在js界流行，也是基于此，随后在浏览端，requirejs和seajs之类的工具包也出现了，可以说在对应规范下，require统治了ES6之前的所有模块化编程，即使现在，在ES6 module被完全实现之前，还是这样。

在CommonJS中,暴露模块使用`module.exports`和`exports`，很多人不明白暴露对象为什么会有两个,后面会介绍区别。

在CommonJS中，有一个全局性方法`require()`，用于加载模块。假定有一个数学模块math.js，就可以像下面这样加载

```
var math = require('math');
math.add(2,3); // 5
```

正是由于CommonJS 使用的require方式的推动，才有了后面的AMD、CMD 也采用的require方式来引用模块的风格。

**AMD规范**

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js11.png)

有了服务器端模块以后，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。

但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。还是上一节的代码，如果在浏览器中运行，会有一个很大的问题

```
var math = require('math');
math.add(2, 3);
```

第二行math.add(2, 3)，在第一行require(‘math’)之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于”假死”状态。

因此，浏览器端的模块，不能采用”同步加载”（synchronous），只能采用”异步加载”（asynchronous）。这就是AMD规范诞生的背景。

AMD是”Asynchronous Module Definition”的缩写，意思就是”异步模块定义”。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

模块必须采用特定的define()函数来定义。

```javascript
define(id?, dependencies?, factory)
//id:字符串，模块名称(可选)
//dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。注意是数组格式
//factory: 工厂方法，返回一个模块函数
```

如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。

```
// math.js
　　define(function (){
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
　　　　return {
　　　　　　add: add
　　　　};
　　});
```

如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。

```
 define (['Lib'], function(Lib){
    　　　　function foo(){
    　　　　　　Lib.doSomething();
    　　　　}
    　　　　return {
    　　　　　　foo : foo
    　　　　};
    　　});
```

当require()函数加载上面这个模块的时候，就会先加载Lib.js文件。

AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：

```
require([module], callback);
```

第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：

```
require(['math'], function (math) {
　math.add(2, 3);
});
```

math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，*AMD比较适合浏览器环境*。

目前，主要有两个Javascript库实现了AMD规范：`require.js`和`curl.js`。

**CMD规范**

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js13.png)

CMD (Common Module Definition), 是seajs推崇的规范，CMD则是依赖就近，用的时候再require。它写起来是这样的：

```
define(function(require, exports, module) {
var clock = require('clock');
clock.start();
});
```

CMD与AMD一样，也是采用特定的define()函数来定义，用require方式来引用模块

```javascript
define(id?, dependencies?, factory)
//id:字符串，模块名称(可选)
//dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。注意是数组格式
//factory: 工厂方法，返回一个模块函数
       
 define('hello', ['jquery'], function(require, exports, module) {
 
	// 模块代码
 
});
// 如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。
define(function(require, exports, module) {
// 模块代码
});
```

*注意：带 id 和 dependencies 参数的 define 用法不属于 CMD 规范，而属于 Modules/Transport 规范。*

**CMD与AMD区别**

AMD和CMD最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。

AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；

而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。

**现阶段的标准**

![](https://minio.lihuiwang.net/notes/notes/2023/09/10/js14.png)

ES6标准发布后，module成为标准，标准使用是以`expor`t指令导出接口，以`import`引入模块，但是在我们一贯的node模块中，我们依然采用的是CommonJS规范，使用require引入模块，使用module.exports导出接口

**export导出模块**

export语法声明用于导出函数、对象、指定文件（或模块）的原始值。

export有两种模块导出方式：命名式导出（名称导出）和默认导出（定义式导出），命名式导出每个模块可以多个，而默认导出每个模块仅一个。

**mport引入模块**
import语法声明用于从已导出的模块、脚本中导入函数、对象、指定文件（或模块）的原始值。

import模块导入与export模块导出功能相对应，也存在两种模块导入方式：命名式导入（名称导入）和默认导入（定义式导入）。

import的语法跟require不同，而且import必须放在文件的最开始，且前面不允许有其他逻辑代码，这和其他所有编程语言风格一致。





require/exports 的用法只有以下三种简单的写法：

```
const fs = require('fs')
exports.fs = fs
module.exports = fs
```

而 import/export 的写法就多种多样：

```
import a from './d';
// 等效于，或者说就是下面这种写法的简写，是同一个意思
import {default as a} from './d';


import fs from 'fs'
import { newFs as fs } from 'fs';  // ES6语法, 将fs重命名为newFs, 命名冲突时常用
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

//default关键字
export default function() {}
// 等效于：
function a() {};
export {a as default};


export const fs
export function readFile
export {readFile, read}
export * from 'fs'

```

https://blog.csdn.net/qq_36595013/article/details/83341236

https://www.jianshu.com/p/f1e54dde30c8