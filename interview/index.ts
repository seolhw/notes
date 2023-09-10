/**
 * 接受一个数组和km，返回数组中第k大的数和第m大的数的总和
 * @param arr 目标数组
 * @param k 第k大的数
 * @param m 第m大的数
 * @return 第k大的数和第m大的数的总和
 */
const findTopSum = (arr: number[], k: number, m: number):number => {
  // 对arr中的数字进行排列
  const arrSort = arr.sort((a, b) => {
    return b - a
  })
  let arrMerge: Array<Array<number>> = []
  arrSort.forEach((item,index) => {
    if (index === 0) {
      arrMerge.push([item])
      return
    }

    const arrEnd = arrMerge[arrMerge.length - 1]
    if (item === arrEnd[arrEnd.length - 1]) {
      arrEnd.push(item)
    } else {
      arrMerge.push([item])
    }

  })

  const arrK = arrMerge[k - 1]
  const arrM = arrMerge[m - 1]

  return arrK.reduce((a,b)=>a+b) + arrM.reduce((a,b)=>a+b)
}

// let a = [10, 8, 5, 10, 6, 9, 3, 2, 8]
// console.log("TCL: findTopSum(a)", findTopSum(a, 1, 2))



/**
 * 实现一个方法，可将数组中相邻的项按条件合并
 * @param arr 目标数组
 * @param condition 回调函数
 * @return 根据回调函数的结果进行相邻项合并
 */
const adjoin = (arr: number[], condition: any) => {
  let arrMerge: any[] = []
  for (const item of arr) {
    let r = condition(item)
    if (r) {
      const arrEnd = arrMerge[arrMerge.length - 1] // 合并后数组的最后一项
      if (arrEnd && typeof arrEnd === 'object') {
        arrEnd.push(item)
      } else {
        arrMerge.push([item])
      }
    } else {
      arrMerge.push(item)
    }
  }
  return arrMerge
}
// adjoin([1, 2, 3, 4, 5], item => item !== 3); // [[1, 2], 3, [4, 5]]
// console.log("TCL: adjoin([1, 2, 3, 4, 5], item => item !== 3)", adjoin([1, 2, 3, 4, 5], item => item !== 3))
// adjoin([1, 2, 3, 4], item => item < 3); // [[1, 2], 3, 4]
// console.log("TCL: adjoin([1, 2, 3, 4], item => item < 3)", adjoin([1, 2, 3, 4], item => item < 3))


/**
 *
 * 第三题，具体看ali面试题题目
 */
const EatMan = (name: string) => {
  return new _eatman(name)
}
class _eatman {
  queue: any[] = []
  constructor(name: string) {
    this.print(name)
    new Promise((reslove) => {
      reslove()
    })
    .then(() => {
      this._end()
    })
  }

  print(name: string) {
    this.queue.push(this._print.bind(this,name))
  }
  eat(name: string) {
    this.queue.push(this._eat.bind(this,name))
    return this
  }
  eatFirst(name: string) {
    this.queue.unshift(this._eat.bind(this,name))
    return this
  }

  _end() {
    for (const item of this.queue) {
      item()
    }
  }
  _print(name: string) {
    console.log(`Hi! This is ${name}!`)
  }
  _eat(name: string) {
    console.log(`Eat ${name}~`)
  }
}
// EatMan('Hank')
// EatMan('Hank').eat('dinner').eat('supper')
// EatMan('Hank').eat('dinner').eatFirst('lunch')
EatMan('Hank').eat('dinner').eatFirst('lunch').eatFirst('breakfast')
