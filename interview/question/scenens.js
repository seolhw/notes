// 模拟new ，new的结果是返回一个新对象，所以我们也要建立一个新对象
function myNew(fn, ...args) {
  const obj = {}
  obj.__proto__ = fn.prototype
  fn.apply(obj, args) // 使obj具有fn构造函数里的属性
  return obj
}

// 模拟new，假如构造函数有返回值
function myNewReturn(fn, ...args) {
  const obj = {}
  obj.__proto__ = fn.prototype
  let res = fn.apply(obj, args) // 使obj具有fn构造函数里的属性
  return typeof res === 'object' ? res : obj
}

// 模拟allply
Function.prototype.myAllply = function (context,...args) {
  //参数可以传 null，当为 null 的时候，视为指向 window
  let context = context || window
  // 首先要获取调用call的函数，用this可以获取
  context.fn = this //将函数设为对象的属性
  context.fn(args) //执行该函数
  delete context.fn //删除该函数
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
    const v1Num = parseInt(v1Arr.shift() || 0)
    const v2Num = parseInt(v2Arr.shift() || 0)
    if(v1Num > v2Num){
      return 1
    }else if(v1Num < v2Num){
      return -1
    }
  }
  return 0
}
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
  newStr.replace(/(\w)\1+/g, (m, $1) => {
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
// 实现一个简单的模板引擎
const template = (str, data) => {
  const reg = /\{\{(.*?)\}\}/g
  return str.replace(reg, (m, $1) => data[$1])
}
// 模拟useState
// const memoizedStats=[]
// const useState = (initState) => {
//   const index = memoizedStats.length
//   memoizedStats.push(initState)
//   return [
//     () => memoizedStats[index],
//     (newState) => {
//       memoizedStats[index] = newState
//     }
//   ]
// }

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
//  冒泡排序
// for(let i=0;i<arr.length-1;i++){
//   for(let j=0;j<arr.length-i-1;j++){
//     if(arr[j]===0){
//       let a=arr[j]
//       arr[j]=arr[j+1]
//       arr[j+1]=a
//     }
//   }
// }

