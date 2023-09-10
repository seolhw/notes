## js操作

###  一、把数组的0项放置数组最后

**用例：** [0,0,0,4,5,0,6,5,4,0,6,9,0] 操作后[4, 5, 6, 5, 4, 6,9, 0, 0, 0, 0, 0,0]

**方案一：**

~~~javascript
const arr=[0,0,0,4,5,0,6,5,4,0,6,9,0]
const resetZero=(arr)=>{
 let i=0
 let t=0
 while(i<=arr.length-t){
   if(arr[i]===0){
      arr.splice(i,1)
      arr.push(0)
      t++
   }else{
    i++
   }
 }
 return arr
}
console.log(resetZero(arr))
~~~

**方案二：**

~~~javascript
const arr = [0, 0, 0, 4, 5, 0, 6, 5, 4, 0, 6, 9, 0]
const resetZero = (arr) => {
  let t=0
  for (var i = 0; i < arr.length-t; i++) {
    console.log(i)
    if(arr[i]===0){
      arr.splice(i,1)
      arr.push(0)
      i--
      t++
    }
  }

  return arr
}
console.log(resetZero(arr))
~~~

**方案三：**

~~~javascript
const arr = [0, 0, 0, 4, 5, 0, 6, 5, 4, 0, 6, 9, 0]
const resetZero = (arr) => {
  for (let i = 0; i < arr.length-1; i++) {
    for (let j = 0; j < arr.length - 1-i; j++) {
      if (arr[j] === 0) {
        const a = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = a
      }
    }
  }

  return arr
}
console.log(resetZero(arr))
~~~

> 注意点：方案二和方案三，如果循坏条件是`arr.length`的话,，后续几项都是0，会陷入死循环。所以当把0放置末尾的时候，循环条件就应该减少一个。

### 二、比较两个对象是否相等

Object.is()方法只能判断这两个对象的引用地址是否一致，不能比对两个对象的内容是否相等。

~~~javascript
const obj1 = {
  1: 1,
  2:{
    a:1
  },
  3: {
    a:1,
    b:1,
  },
}
const obj2 = {
  1: 1,
  2:{
    a:1
  },
  3: {
    a:1,
    b:2
  },
}

function compire(obj1, obj2) {
  if (obj1 instanceof Object && obj2 instanceof Object) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false
    }
    for (let key in obj1) {
      if (!obj2.hasOwnProperty(key)) {
        return false
      } else {
        if (obj1[key] !== obj2[key]) {
          if(!compire(obj1[key], obj2[key])) return false
        }
      }
    }
    return true
  } else {
    return obj1 === obj2
  }

}
console.log(compire(obj1, obj2))
~~~

> 思路：1、先判断传入的值是基础数据类型还是复杂数据类型；
>
> ​			2、如果是基础数据类型直接返回两个值是否相等；
>
> ​			3、如果是复杂数据类型，先判断两个值的长度是否相等，如果长度不相等的话直接返回false；
>
> ​			4、如果长度相等的话，循环其中一个值，判断另一个值是否有这个属性，如果没有的话，返回false。如果有的话，且两个值不相等的情况下，递归执行此函数，如果递归执行的函数是false的话，就返回false；
>
> ​			5、等所有的循坏结束后，还没有返回值的话，就返回true；

### 三、红绿灯

~~~javascript
let arr=[{light:'red',time:3},{light:'green',time:2},{light:'yellow',time:1}]
const myPromise=(time)=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res()
        },time*1000)
    })
}
const start=async(arr)=>{
    while(true){
        for(let i=0;i<arr.length;i++){
            await myPromise(arr[i].time)
            console.log(arr[i].light)
        }
    }
}
start(arr)
~~~

>  注意点：使用原生的for循环，`forEach`内部有封装，外层的`async`无法控制。

### 四、把下面数组按照parent_id 整理成一个树状结构

~~~javascript
const data = [
  {
    id: "1897e132-e98e-4d33-9ca4-b884d4079567",
    name: "分组-1",
    parent_id: null,
  },
  {
    id: "fb88c694-df36-42db-9890-429b58674877",
    name: "分组-2",
    parent_id: null,
  },
  {
    id: "685a99b5-f8dd-427f-a6df-e43766358e68",
    name: "分组-1-1",
    parent_id: "1897e132-e98e-4d33-9ca4-b884d4079567",
  },
  {
    id: "7c93d559-8c20-4480-83aa-c9fc51c066f0",
    name: "分组-3",
    parent_id: null,
  },
  {
    id: "703faaa2-c3ae-49a4-9ebd-c152adc6f91c",
    name: "分组-1-2",
    parent_id: "1897e132-e98e-4d33-9ca4-b884d4079567",
  },
  {
    id: "b22a266d-9e6a-4ab4-ab6d-4d3fad1e41f0",
    name: "分组-1-3",
    parent_id: "1897e132-e98e-4d33-9ca4-b884d4079567",
  },
  {
    id: "08b7bf26-51f9-43f6-bb46-892397d5f210",
    name: "分组-1-1-1",
    parent_id: "685a99b5-f8dd-427f-a6df-e43766358e68",
  },
];
~~~

**方案一：**

~~~javascript

function getTrees(arr,id){
  return arr.filter((item)=>id?item.parent_id===id:!item.parent_id)
  .map((item)=>({...item,children:getTrees(arr,item.id)}))
}
~~~

**方案二：**

~~~javascript
function getTrees(data,id){
  let arr=[]
  let obj={}
  data.forEach(e => {
    obj[e.id]={...e,children:[]}
  });
  data.forEach(e=>{
    if(!e.parent_id){
      arr.push(obj[e.id])
    }else{
      obj[e.parent_id].children.push(obj[e.id])
    }
  })
  return arr
}
console.log(getTrees(data))
~~~

> 注意点：利用指向同一个对象的栈内存，改变的是同一个对象

### 五、[斐波拉契数列] [青蛙跳台阶] [第一项是0 第一项是1 第n项是前两项之和，求第n项]

~~~javascript
function fib(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}
~~~

### 六、冒泡排序

~~~javascript
const arr=[1,3,2,4,0,9,7,5]
function sort(arr) {
  for(let i=0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-1-i;j++){
      if(arr[j+1]<arr[j]){
        const a=arr[j+1]
        arr[j+1]=arr[j]
        arr[j]=a
      }
    }
  }
  return arr
}
console.log(sort(arr))
~~~

> 注意：因为当循坏到倒数第二项的时候，已经与最后一项做了比较，所以终止条件为`arr.length-1`;每一次循环结束后，都会把最大的数放在后面，所以可以少循环`i`次。

### 七、猴子第一天摘下若干个桃子，当即吃了一半，还不过瘾，又多吃了一个。第二天早上又将剩下的桃子吃掉一半，又多吃了一个。以后每天早上都吃了前一天剩下的一半零一个。到第十天早上在想吃时，就只剩一个桃子了。求第一天共摘了多少个桃子?

**方案一：**

~~~javascript
function getNumber(num){
  if(num===1){
    return 1
  }
  return getNumber(num-1)*2+1
}
console.log(getNumber(10))
~~~

**方案二：**

~~~javascript
function getsum(num){
  let sum=1
  for(let i=1;i<num;i++){
    sum=sum*2+1
  }
  return sum
}
console.log(getsum(10))
~~~

### 八、拉平数组

**方案一：**

~~~javascript
const arr = [1, 3, [1, 3, 4, [3, [5]]], [8, 9]]
function flat(arr){
  let list=arr
  while(list.some(e=>e instanceof Array)){
    list= [].concat(...list)
  }
  return list
}
console.log(flat(arr))
~~~

**方案二：**

~~~javascript
const arr = [1, 3, [1, 3, 4, [3, [5]]], [8, 9]]
function flat(arr){
  let list=[]
  arr.forEach(e => {
    if(e instanceof Array){
      list.push(...flat(e))
    }else{
      list.push(e)
    }
  });
  return list
}
console.log(flat(arr))
~~~

### 九、实现input的输入到output的输出

~~~javascript
let input = [
  { "id": "17", "caption": "颜色", "types": ["黑", "棕"] },
  { "id": "23", "caption": "材质", "types": ["牛皮"] },
  { "id": "24", "caption": "尺码", "types": ["40", "41", "42"] }
]
let output = [
  { "17": "黑", "23": "牛皮", "24": "40" },
  { "17": "黑", "23": "牛皮", "24": "41" },
  { "17": "黑", "23": "牛皮", "24": "42" },
  { "17": "棕", "23": "牛皮", "24": "40" },
  { "17": "棕", "23": "牛皮", "24": "41" },
  { "17": "棕", "23": "牛皮", "24": "42" }
]
function fn(input){
  return input.reduce((sum,cur)=>{
    if(!sum.length){
      return cur.types.map(e => ({[cur.id]:e}));
    }
    let output=[]
    sum.forEach(e => {
      output=output.concat(cur.types.map(item=>({
        ...e,
        [cur.id]:item
      })))
    });
    return output
  },[])
}
console.log(fn(input))
~~~

> 注意：`concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

### 十、`a==1 && a==2 && a==3`可能为true吗

**方案一：**

~~~javascript
const a = {
  num: 1,
  toString() {
    return  a.num++
  }
}
console.log(a == 1 && a == 2 && a == 3)
~~~

> 注意：当因为object与number比较时，会尝试调用`toString`、`valueOf`方法

**方案二：**

~~~javascript
let num=1
Object.defineProperty(global,'a',{
  get(){
    return num++
  }
})
console.log(a == 1 && a == 2 && a == 3)
~~~

> 注意：利用获取某个值时会调用get方法

**方案三：**

~~~javascript
const a=[1,2,3]
a.join=a.shift
console.log(a == 1 && a == 2 && a == 3)
~~~

> 注意：打印数组时会调用`toString`，数组调用`toString`会隐式调用`Array.join`

### 十一、实现一个无限累加的函数` add(1)(2)(4)(5)`

**方案一：**

~~~javascript
const add=(n)=>{
  function sum(num){
    return add(n+num)
  }
  sum.toString=sum.valueOf=()=>{
    return n
  }
  return sum
}
console.log(add(1)(2)(4)(5).valueOf())
~~~

**方案二：**

~~~javascript
function add(i){
  let sum=0
  sum+=i
  function fn(b){
    sum+=b
    return fn
  }
  fn.toString=()=>{
    return sum
  }
  return fn
}
console.log(add(1)(2)(3).toString())
~~~

### 十二、找数组里面是否存在三个不同的元素，使得`a[i]+a[j]==a[k]`，如果能找到输出true，找不到输出false

~~~javascript
const a1 = [1, 5, 10, 25, 9, 17, 100]
function fn(a1) {
  for (let i = 0; i < a1.length; i++) {
    for (let j = i + 1; j < a1.length; j++) {
      const index = a1.findIndex((e) => a1[i] + a1[j] === e)
      if (index > j) return true
    }
  }
  return false
}
console.log(fn(a1))

function fn(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let s = arr.indexOf(arr[i] + arr[j]);
      if (s > j) return true;
    }
  }
  return false;
}
~~~

### 十三、二分查找法，查找出目标元素

~~~javascript
 const numarr = [1, 2, 3, 4, 5, 6, 7, 8]
 // 查找第一次出现目标元素的位置
 function findLeftKey(arr, key) {
   let left = 0;
   let right = arr.length;
   while (left <= right) {
     let mid = left + Math.floor((right - left) / 2)
     if (arr[mid] < key) {
       left = mid + 1
     } else if (arr[mid] > key) {
       right = mid - 1
     } else if (arr[mid]===key) { // 收缩右边界限
       right = mid - 1
     }
   }
   if (left >= arr.length || arr[left] !== key) {
     return -1
   }
   return left
 }
 // 查找最后一次出现目标元素的位置
 function findRightKey(arr, key) {
   let l = 0;
   let r = arr.length
   while (l <= r) {
     let m = l + Math.floor((r - l) / 2)
     if (arr[m] < key) {
       l = m + 1
     } else if (arr[m] > key) {
       r = m - 1
     } else if (arr[m] === key) { // 收缩左边界
       l = m + 1
     }
   }
   if (r < 0 || arr[r] !== key) {
     return -1
   }
   return r
 }
 console.log(findRightKey(numarr, 4))
~~~

> 注意：二分查找法的前提是数字是有序排列的

### 十四、1-10的阶乘和

**方案一：**

~~~javascript
function jieChen(count) {
  function sum(num) {
    if (num === 1) {
      return 1
    }
    return num * sum(num - 1)
  }
  let num = 0
  for (let i = 1; i <= count; i++) {
    num += Number(sum(i))
  }
  return num
}
~~~

**方案二：**

~~~javascript
function sum(num) {
  let sum = 0
  for (let i = 1; i <= num; i++) {
    let loop = i
    for (let j = 1; j < i; j++) {
      loop *= j
    }
    sum += loop
  }
  return sum
}
~~~

### 十五、数组乱序

**方案一：**

~~~javascript
const arr = [1, 2, 3, 4, 5, 6]
function reset(arr) {
  for (let i = 0; i < arr.length; i++) {
    let index = i + Math.floor(Math.random() * (arr.length-i));
    [arr[i],arr[index]] = [arr[index],arr[i]]
  }
  return arr
}
console.log(reset(arr))
~~~

**方案二：**

~~~javascript
const arr = [1, 2, 3, 4, 5, 6]
function reset(arr) {
 const newArr=[]
 while(arr.length){
   const index=Math.floor(Math.random()*arr.length)
   newArr.push(arr.splice(index,1)[0])
 }
 return newArr
}
console.log(reset(arr))
~~~

**方案三：**

~~~javascript
const arr = [1, 2, 3, 4, 5, 6]
function reset(arr) {
 arr.sort(()=>Math.random()-0.5)
 return arr
}
console.log(reset(arr))
~~~

### 十六、查找替换变量

~~~javascript
const obj={
  a:'123',
  b:{
    c:'456'
  }
}
function fn(str,obj){
  return str.replace(/\{(\w|\.)+\}/g,(a)=>{
    const arr=a.substr(1,a.length-2).split('.')
    let val=obj
    arr.forEach((e,i) => {
      if(i) val=val[e]
    });
    if(val){
      return val
    }
    return a
  })

}
console.log(fn('a{a.b.c}jjjj{a.a}{a.f}',obj)) //a456jjjj123{a.f}
~~~

### 十七、数组去重

~~~javascript
function unique(arr){
  var obj={}
  return arr.filter(function(item){
    return obj[item]?false:obj[item]=true
  })
}
const arr=[1,"true",null,null,{},{},false,false]
console.log(unique(arr))
~~~

## js源码实现

### 一、模拟new

~~~javascript
function myNew(fn, ...args) {
  const obj = {}
  obj.__proto__ = fn.prototype
  fn.apply(obj, args)
  return obj
}
~~~

### 二、模拟apply

~~~javascript
Function.prototype.myAllply = function (context,args) {
  context.fn = this
  context.fn(...args)
  delete context.fn
}
~~~

### 三、模拟call

~~~javascript
Function.prototype.myCall = function (context, ...args) {
  context.fn = this
  context.fn(...args)
  delete context.fn
}
~~~

### 四、实现instanceof

~~~javascript
const isInstanceOf = (obj, constructor) => {
  let proto = obj.__proto__
  while(proto){
    if(proto === constructor.prototype){
      return true
    }
    proto = proto.__proto__
  }
  return false
}
~~~

### 五、实现事件触发器

~~~javascript
class EventEmitter{
  constructor(){
    this.events = {}
  }
  on(type, fn){
    if(!this.events[type]){
      this.events[type] = []
    }
    this.events[type].push(fn)
  }
  emit(type, ...args){
    if(this.events[type]){
      this.events[type].forEach(fn => fn(...args))
    }
  }
}
~~~

### 六、生成随机数

~~~javascript
function random(max,min){
  return Math.floor(Math.random()*(max-min+1)+min)
}
~~~

### 七、判断类型

~~~javascript
function getType(val){
  const typeString=Object.prototype.toString.call(val).split(" ")[1]
  return typeString.slice(0,typeString.length-1)
}
console.log(getType('a'))
~~~

### 八、实现一个九九乘法表

~~~javascript
function multiplicationTable(){
  const table=document.createElement('table')
  for(let i=1;i<10;i++){
    const tr=document.createElement('tr')
    for(let j=1;j<=i;j++){
      const td=document.createElement('td')
      td.innerText=`${j}*${i}`
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  document.getElementById("page").appendChild(table)
}
~~~

### 九、比较两个版本号的大小

**方案一：**

~~~javascript
const compareVersion1=(v1, v2)=> {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
~~~

**方案二：**

~~~javascript
const compareVersion2=(v1, v2)=> {
  const v1Arr = v1.split('.')
  const v2Arr = v2.split('.')
  while(v1Arr.length || v2Arr.length){
    const v1Num = parseInt(v1Arr.shift())
    const v2Num = parseInt(v2Arr.shift())
    if(v1Num > v2Num){
      return 1
    }else if(v1Num < v2Num){
      return -1
    }
  }
  return 0
}
~~~

### 十、判断字符串是否是这样组成的，第一个必须是字母，后面可以是字母、数字、下划线，总长度为5-20

~~~javascript
const str='A234a3_3P4.43'
function testStr(str){
  const reg= /^[a-zA-Z][a-zA-Z_0-9]{4,19}$/
  return reg.test(str)
}
console.log(testStr(str))
~~~

### 十一、查找字符串出现最多的字符和个数

**方案一：**

~~~javascript
const findMaxChar = (str) => {
  const obj = {}
  for(let i = 0; i < str.length; i++){
    if(obj[str[i]]){
      obj[str[i]]++
    }else{
      obj[str[i]] = 1
    }
  }
  let max = 0
  let maxChar = ''
  for(let key in obj){
    if(obj[key] > max){
      max = obj[key]
      maxChar = key
    }
  }
  return {
    maxChar,
    max
  }
}
~~~

**方案二：**

~~~javascript
const findMaxChar2 = (str) => {
  let maxChar
  let max=0
  const newStr = str.split('').sort().jon('')
  newStr.replace(/(\w)\1*/g, (m, $1) => {
    if(m.length > max){
      max = m.length
      maxChar = $1
    }
  })
  return {
    maxChar,
    max
  }
}
~~~

### 十二、实现一个Lazymen

~~~javascript
class Lazymen {
  constructor(name) {
    this.name = name
    this.queues = []
    this.sayHello()
  }
  sayHello() {
    this.queues.push(() => {
      console.log(`hello,my name is ${this.name}`)
    })
    setTimeout(()=>this.run(),0)
  }
  sleep(time) {
    this.queues.push(()=>new Promise((res, rej) => {
      setTimeout(() => {
        console.log(`wake  up after ${time}`)
        res()
      }, time * 1000)
    }))
    return this
  }
  eat(food) {
    this.queues.push(() => {
      console.log(`Eat ${food}`)
    })
    return this
  }
  sleepFirst(time) {
    this.queues.unshift(()=>new Promise((res, rej) => {
      setTimeout(() => {
        console.log(`wake  up after ${time}`)
        res()
      }, time * 1000)
    }))
    return this
  }
  async run() {
    while (this.queues.length) {
      const cb = this.queues.shift()
      await cb()
    }
  }
}

new Lazymen("kakao").sleepFirst(3).eat("apple").sleep(3)
~~~

### 十三、`xiaoshou-ss-sfff-fe` 变为驼峰` xiaoShouSsSfffFe`

~~~javascript
function getCamelCase(str){
  const arr=str.split('-')
  return arr.map(((e,i)=>i===0?e:e.replace(e[0],e[0].toUpperCase()))).join('')
}
console.log(getCamelCase('xiaoshou-ss-sfff-fe'))
~~~

### 十四、截取字符串中的`abcdefg`中的`efg`

~~~javascript
const getString=(str,key)=>{
  const reg=new RegExp(key)
  if(reg.test(str)){
    console.log(str.substr(str.indexOf(key),key.length))
  }
}
getString('abcdefg','efg')
~~~

### 十五、实现一个简单的React的useState

~~~javascript
const memoizedStats=[]
const index=0
const useState = (initState) => {
  memoizedStats[index] = memoizedStats[index] ||initState
  const currentIndex = index
  const setState = (newState) => {
    memoizedStats[currentIndex] = newState
    index=0
    render()
  }
  return[memoizedStats[index++],setState]
}
~~~

