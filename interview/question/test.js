const PENDING = 'penging';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const isFunction = (fn) => typeof fn === 'function'
class myPromise {
  constructor(handle) {
    this.status = PENDING;
    this.value = undefined;
    this.onFulfilledQueues = []
    this.onRejectedQueues = []
    if (!isFunction(handle)) throw Error('参数必须为一个函数')
    handle(this.resolve, this.reject)
  }
  resolve = (val) => {
    if (this.status !== PENDING) return
    const run = () => {
      if (val instanceof myPromise) {
        val.then((res) => {
          this.value = res
          this.status = FULFILLED
        }, (err) => {
          this.value = err
          this.status = REJECTED
        })
      } else {
        this.value = val
        this.status = FULFILLED
      }
      this.onFulfilledQueues.forEach((fn) => { fn(this.value) })
      this.onFulfilledQueues = []
    }
    setTimeout(run, 0)
  }
  reject = (err) => {
    const run = () => {
      if (this.status !== PENDING) return
      this.value = err
      this.status = REJECTED
      this.onRejectedQueues.forEach((fn) => fn(this.value))
      this.onRejectedQueues = []
    }
    setTimeout(run, 0)
  }
  then (onFulfilled, onReject) {
    return new myPromise((onFulfilledNext, onRejectNext) => {
      const resolveFn = (val) => {
        if (!isFunction(onFulfilled)) {
          onFulfilledNext(val)
        } else {
          const res = onFulfilled(val)
          if (res instanceof myPromise) {
            res.then(onFulfilledNext, onRejectNext)
          } else {
            onFulfilledNext(res)
          }
        }
      }
      const rejectFn = (err) => {
        if (!isFunction(onReject)) {
          onRejectNext(err)
        } else {
          const res = onReject(err)
          if (res instanceof myPromise) {
            res.then(onFulfilledNext, onRejectNext)
          } else {
            onFulfilledNext(res)
          }
        }
      }
      switch (this.status) {
        case PENDING:
          this.onFulfilledQueues.push(resolveFn)
          this.onRejectedQueues.push(rejectFn)
          break
        case FULFILLED:
          onFulfilled(this.value)
          break
        case REJECTED:
          onReject(this.value)
          break
      }
    })
  }
  catch (onReject) {
    this.then(undefined, onReject)
  }
  static resolve (cb) {
    if (cb instanceof myPromise) return cd
    return new myPromise((res) => { res(cb) })
  }
  static reject (cb) {
    if (cb instanceof myPromise) return cb
    return new myPromise((res, rej) => { rej(cb) })
  }
  finally (cb) {
    // 考虑cb是一个promise
    this.then(
      (val) => { myPromise.resolve(cb()).then(() => val) },
      (err) => { myPromise.reject(cb()).then(() => { throw err }) }
    )
  }
  static all (list) {
    return new myPromise((res, rej) => {
      const resList = []
      list.forEach((item, i) => {
        myPromise.resolve(item).then((res) => {
          resList.push(res)
          if (resList.length === list.length) return resList
        }, (err) => {
          rej(err)
        })
      })
    })
  }
  static any (list) {
    return new myPromise((res, rej) => {
      const resList = []
      list.forEach((item, i) => {
        myPromise.resolve(item).then((res) => {
          res(res)
        }, (err) => {
          res(err)
        })
      })
    })
  }
}

// const p1 = new myPromise((res, rej) => {
//   setTimeout(() => {
//     res('p1')
//   }, 1000)
// })
// const p2 = new myPromise((res, rej) => {
//   setTimeout(() => {
//     res(p1)
//   }, 1000)
// })
// p2.then((res) => {
//   console.log(res)
// }, () => { })
const p3 = new myPromise((res, rej) => {
  setTimeout(() => {
    rej('p3')
  }, 1000)
})
p3.then(() => { }, (err) => {
  console.log('rejected', err)
}).catch((err) => {
  console.log('catch', err)
})
