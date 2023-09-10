// 模拟new
function myNew(fn, ...args) {
  const obj = {}
  obj.__proto__ = fn.prototype
  fn.apply(obj, args)
  return obj
}
// 模拟allply
Function.prototype.myAllply = function (context,...args) {
  context.fn = this
  context.fn(args)
  delete context.fn
}
// 模拟call
Function.prototype.myCall = function (context, ...args) {
  context.fn = this
  context.fn(...args)
  delete context.fn
}
// 比较两个版本号的大小
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
// 判断字符串是否是这样组成的，第一个必须是字母，后面可以是字母、数字、下划线，总长度为5-20
const str='A234a3_3P4.43'
function testStr(str){
  const reg= /^[a-zA-Z][a-zA-Z_0-9]{4,19}$/
  return reg.test(str)
}
console.log(testStr(str))

// 查找字符串出现最多的字符和个数
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
// 实现instanceof
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
//实现事件触发器
const EventEmitter1 = () => {
  const events = {}
  return {
    on(type, fn) {
      if(!events[type]){
        events[type] = []
      }
      events[type].push(fn)
    },
    emit(type, ...args) {
      if(events[type]){
        events[type].forEach(fn => fn(...args))
      }
    }
  }
}
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

// 生成随机数
function random(max,min){
  return Math.floor(Math.random()*(max-min+1)+min)
}

/**
 * 实现一个LazyMan
 * 看起来是链式调用并且有流程控制其中sleepFisrt要在所有函数之前执行。大致的思路是创建一个任务队列，将每一项任务（输出名字、吃饭、睡觉）都放进队列里按顺序执行。代码如下：
*/
class LazyMan{
  constructor(name){
    this.queues=[]
    this.sayHi(name)
  }
  sayHi=(name)=>{
    this.queues.push(()=>{
      console.log(`Hi! This is ${name}`)
      this.next()
    })
  }
  eat=(food)=>{
    this.queues.push(()=>{
      console.log(`Eat ${food}`)
      this.next()
    })
    return this
  }
  sleep=(second)=>{
    this.queues.push(()=>{
      setTimeout(()=>{
        console.log(`wake  up after ${second }秒`)
        this.next();
      },second*1000)
    })
    return this
  }
  sleepFirst=(second)=>{
    this.queues.unshift(()=>{
      setTimeout(()=>{
        console.log(`wake  up after ${second }秒`)
        this.next();
      },second*1000)
    })
    return this
  }
  next=()=>{
    let cb=this.queues.shift()
    cb && cb()
  }
}
function creatMan(name){
  const huaman=new LazyMan(name)
  setTimeout(()=>{
    huaman.next()
  })
  return huaman
}
// creatMan('kakao').eat("apple").eat("banana")
// creatMan("kakao").sleep(3).eat("apple")
// creatMan("kakao").sleepFirst(3).eat("apple")


// 实现一个九九乘法表
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

// 1-10的阶乘和
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
// console.log(sum(4))
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
// console.log(jieChen(4))

// 猴子第一天摘下若干个桃子，当即吃了一半，还不过瘾，又多吃了一个。第二天早上又将剩下的桃子吃掉一半，又多吃了一个。以后每天早上都吃了前一天剩下的一半零一个。到第十天早上在想吃时，就只剩一个桃子了。求第一天共摘了多少个桃子?
function getNumber(num){
  if(num===1){
    return 1
  }
  return getNumber(num-1)*2+1
}
// console.log(getNumber(10))
function getsum(num){
  let sum=1
  for(let i=1;i<num;i++){
    sum=sum*2+1
  }
  return sum
}
// console.log(getsum(10))

/**
 * 判断类型
 */
function getType(val){
  const typeString=Object.prototype.toString.call(val).split(" ")[1]
  return typeString.slice(0,typeString.length-1)
}
console.log(getType('a'))


// 实现一个简单的模板引擎
const template = (str, data) => {
  const reg = /\{\{(.*?)\}\}/g
  return str.replace(reg, (m, $1) => data[$1])
}

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


