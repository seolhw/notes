// 模拟new
function myNew(fn, args) {
  const obj = {}
  obj._proto_ = fn.prototype
  fn.bind(obj, ...args)
  return obj
}
// 模拟apply
function myApply(context, [...args]) {
  context.fn = this
  context.fn(...args)
  delete context.fn
}
// 模拟call
function myCall(context, ...args) {
  context.fn = this
  context.fn(...args)
  delete context.fn
}
// 比较两个版本的大小
function compaireVersion(v1, v2) {
  const version1 = v1.split('.')
  const version2 = v2.split('.')
  while (version1.length || version2.length) {
    const a = version1.shift()
    const b = version2.shift()
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
  }
  return 0
}
//查找字符串里出现最多的字符和个数
const str = 'AGGGHHHHHCDSFREFHHFH'
// function findMaxCode(str){
//   const code=''
//   const max=0
//   str.replace(/(\w)\1+/,(group,chart)=>{
//     if(group?.length>max){
//       code=chart
//       max=group?.length
//     }
//   })
//   return {code,max}
// }
function findMaxCode(str) {
  const code = ''
  const max = 0
  str.replace(/(\w)\1+/, (group, chart) => {
    if (group?.length > max) {
      code = chart
      max = group?.length
    }
  })
  return { code, max }
}
// 实现intanceof
function intanceof(intance,obj){
  const left=intance._proto_
  const right=obj.prototype
  while(left){
    if(left===right){
      return true
    }
    left=left._proto_
  }
  return false

}
// 事件触发器
class emit{
  constructor(){
    queues={}
  }
  emit(key,...args){
    if(!this.queues[key])return
    this.queues[key].forEach(element => {
      element(...args)
    });
    this.queues=[]
  }
  on(key,fn){
    if(!this.queues[key]){
      this.queues[key]=[]
    }
    this.queues[key].push(fn)
  }
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
// 防抖和节流
function jieLiu(){
  let timer=null
  return (fn,delay)=>{
    if(timer) return
    timer=setTimeout(()=>{
      fn()
      timer=null
    },delay)
  }
}
function fangdou(){
  let timer=null
  return (fn,delay)=>{
    let flag=!timer
    if(timer)clearTimeout(timer)
    timer=setTimeout(()=>{
      timer=null
    },delay)
    if(timer)fn()
  }

}