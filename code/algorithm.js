/**
 * 把[99,99,0,89,8,9,5,80,0,8,03]的0放在数组的最后面
 * 思路：先声明一个索引i
 *      用while循环，如果没有遇到0，i++;遇到0，i不变，把原数组的0截取掉，放置最后
 *      while的循环条件（arr.length-o），因为每次遇到0，会放置最后，所以可以少循环一次，用变量o记录遇到0的次数
 */
const arr = [99, 99, 0, 89, 8, 9, 5, 80, 0, 8, 03]
const resetZero1 = (arr) => {
  let index = 0 //0存在的位置
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      if (arr[index] === 0) {
        let a = arr[i]
        arr[i] = 0
        arr[index] = a
      }
      index++
    }
  }
  console.log(arr)
}
const restZero=(arr)=>{
  let j=0
  for(let i=0;i<arr.length-1-j;i++){
    if(arr[i]===0){
      arr.splice(i,1)
      arr.push(0)
      j++
    }
  }
 return arr
}
const resetZero2 = (arr) => {
  let i = 0
  let o = 0
  while (i < arr.length - o) {
    if (arr[i] === 0) {
      arr.splice(i, 1)
      arr.push(0)
      o++
    } else {
      i++
    }

  }
  console.log(arr)
}

/**
  * 比较两个对象是否相等
  * Object.is()方法只能判断这两个对象的引用地址是否一致，不能比对两个对象的内容是否相等。
  * 思路：1、先判断是否都是对象，
  *         1.1、如果不是的话，直接判断两者是否相等；
  *         1.2、如果是的话，先判断长度是否相等，不相等返回false。
  *              相等再循环其中一个obj，判断另一个obj里是否含有此属性。
  *              如果没有返回false，如果有的话，进入递归。
  *
 */
const obj1 = {
  1: 1,
  2: 2,
}
const obj2 = {
  1: 1,
  2: 2,
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
          return compire(obj1[key], obj2[key])
        }
      }
    }
    return true
  } else {
    return obj1 === obj2
  }

}
console.log(compire(obj1, obj2))

/**
  * 把下面数组按照parent_id 整理成一个树状结构
  * 思路1：filter加map递归
  * 思路2：用obj和arr来存储，
  *       循环此数组，obj里面每一项都增加一个children:[]属性
  *       循环此数组，先找到根节点添加至arr里。否则把此项添加至obj的childre里（利用指向同一个对象的栈内存，改变的是同一个对象）
 */
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

function getTrees(list, parent_id = null) {
  return list.filter((e) => parent_id ? e.parent_id === parent_id : !e.parent_id)
    .map((item) => {
      item.children = getTrees(list, item.id)
      return item
    })
};
// console.log(getTrees(data))
function getTrees1(list) {
  const arr = []
  const obj = {}
  list.forEach(e => {
    obj[e.id] = { ...e, children: [] }
  });
  list.forEach((e) => {
    const { id, parent_id } = e
    let item = obj[id]
    if (!e.parent_id) {
      arr.push(item)
    } else {
      obj[parent_id].children.push(item)
    }
  })
  return arr
};
console.log(getTrees1(data))

/**
 * 【斐波拉契数列】 【青蛙跳台阶】 【第一项是0 第一项是1 第n项是前两项之和，求第n项】
 */
function fib(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}

/**
 * 冒泡排序
 */
function sort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] === 0) {
        let a = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = a
      }
    }
  }
}
/**
 * 冒泡排序-从小到大
 */
function sort(arr){
  for(let i=0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-1-i;j++){
      if(arr[j]>arr[j+1]){
        let a=arr[j]
        arr[j]=arr[j+1]
        arr[j+1]=a
      }
    }
  }
  return arr
}

/**
 * xiaoshou-ss-sfff-fe 变为驼峰 xiaoShouSsSfffFe
 */
function getCamelCase(str) {
  const list = str.split('-')
  return list.map((e, i) => {
    if (i === 0) {
      return e
    } else {
      return e.replace(e[0], e[0].toLocaleUpperCase())
    }
  }).join('')
}
// console.log(getCamelCase('xiaoshou-ss-sfff-fe'))

/**
 * 拉平数组
 */
const arr1 = [1, 3, [1, 3, 4, [3, [5]]], [8, 9]]
function flat(arr) {
  const newArr = []
  arr.forEach(e => {
    if (e instanceof Array) {
      newArr.push(...flat(e))
    } else {
      newArr.push(e)
    }
  });
  return newArr
}
console.log(flat(arr1))
/**
 *  截取字符串中的abcdefg中的efg
 */
const str = 'abcdefg'
function findStr(str, target) {
  let reg = new RegExp(target)
  if (reg.test(str)) {
    const index = str.indexOf(target)
    a = str.substr(index, target.length)
  }
}
findStr('abcdefg', 'efg')

/**
 * （a==1 && a==2 && a==3）可能为true吗；
 *  方案一：当因为object与number比较时，会尝试调用toString、valueOf方法
 *  方案二：利用获取某个值时会调用get方法
 *  方案三：打印数组时会调用toString，数组调用toString会隐式调用Array.join
 */
// const a={
//   i:1,
//   toString(){
//     return a.i++
//   }
// }

// var val=1
// Object.defineProperty(global,'a',{
//   get(){
//     console.log(val)
//     return val++
//   }
// })

var a = [1, 2, 3];
a.join = a.shift

console.log(a == 1 && a == 2 && a == 3)


/**
 * 实现一个无限累加的函数 add(1)(2)(4)(5) //12
 * 因为打印函数时会自动调用toString()方法，因此实现方法如下：
 */
function add(a) {
  function sum(b) {
    return add(a + b)
  }
  sum.valueOf = sum.toString = function () {
    return a;
  }
  return sum;
}
/**
 * 写一个函数，输入一个数组a，找到里面是否存在三个不同的元素，
 * 使得a[i]+a[j]==a[k]，如果能找到输出true，找不到输出false
 */
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

/**
 * 二分查找法，查找出目标元素
 * 二分查找法的前提是数字是有序排列的
 */
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
    } else if (arr[mid]) {
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
    } else if (arr[m] === key) {
      l = m + 1
    }
  }
  if (r < 0 || arr[r] !== key) {
    return -1
  }
  return r
}
console.log(findRightKey(numarr, 4))


/**
 * 实现input的输入到output的输出
 */
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
function fn(input) {
  return input.reduce((sum, cur) => {
    if (!sum.length) {
      return cur.types.map((e) => ({ [cur.id]: e }))
    }
    let res = []
    sum.forEach(item => {
      res = res.concat(cur.types.map((e) => ({ ...item, [cur.id]: e })))
    });
    return res
  }, [])
}
console.log(fn(input))


/**
 * 数组结构：连续的，高效的查询数据。删除和插入时需要进行大量的数据移动补位消耗大量的时间
 * 链表结构
 * 非连续非顺序的结构
 * 每一个节点有两部分组成（数据+指针：下一个节点的引用）
 */
class neNode {
  constructor(data) {
    this.data = data;
    this.next = null
  }
}

class singleLinkedList {
  constructor() {
    this.head = null;
  }
  // 添加节点
  add(data) {
    let node = new neNode(data)
    if (this.head === null) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
  }
  // 插入节点
  insert(data, target) {
    let node = new neNode(data)
    let current = this.head
    while (current.next) {
      if (current.data === target) {
        node.next = current.next
        current.next = node
        break
      }
      current = current.next
    }
  }
  // 查找节点
  find(data) {
    let current = this.head
    while (current) {
      if (current.data === data) {
        return current
      }
      current = current.next;
    }
    return null
  }
  // 删除节点
  remove(data) {
    let current = this.head
    let previous = null
    while (current) {
      if (current.data === data) {
        if (previous === null) {
          this.head = current.next;
        } else {
          previous.next = current.next;
        }
        return true
      }
      previous=current
      current=current.next
    }
    return false
  }
}
const list=new singleLinkedList()
list.add(1)
list.add(2)
list.add(3)
console.dir(list,{depth: null})

