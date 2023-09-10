
const PENDING = 'pending'
const FULFILED = 'fulfilled'
const REJECTED = 'rejected'

const isFun = (val) => typeof val === 'function'

class myPromise {
  stautus = PENDING
  value
  fulfilledQueues = []
  rejectedQueues = []

  constructor(handle) {
    this.stautus = PENDING
    this.value = undefined
    if (!isFun(handle)) throw new Error('参数必须是函数')
    handle(this.resolve, this.reject)
  }

  resolve=(val)=> {
    if (this.stautus !== PENDING) return
    const run = () => {
      if (val instanceof myPromise) {
        val.then((val) => {
          this.value = val
          this.stautus = FULFILED
        }, (err) => {
          this.stautus = REJECTED
          this.value = err
        })
      } else {
        this.value = val
        this.stautus = FULFILED
      }
      this.fulfilledQueues.forEach(fn => fn(this.value))
      this.fulfilledQueues = []

    }
    setTimeout(run, 0);
    this.stautus = FULFILED
    this.value = val
  }
  reject=(err)=> {
    if (this.stautus !== PENDING) return
    const run = () => {
      this.stautus = REJECTED
      this.value = err
      this.fulfilledQueues.forEach(fn => fn(err))
      this.fulfilledQueues = []
    }
    setTimeout(run, 0)
  }
  then(onFulfilled?:Function, onRejected?:Function) {
    return new myPromise((onFulfilledNext, onRejectedNext) => {
      const resolveFn = (val) => {
        if (!isFun(onFulfilled)) {
          onFulfilledNext(val)
        } else {
          const res = onFulfilled(val)
          if (res instanceof myPromise) {
            res.then(onFulfilledNext, onRejectedNext)
          } else {
            onFulfilledNext(res)
          }
        }
      }
      const rejectFn = (err) => {
        if (!isFun(onRejected)) {
          onRejectedNext(err)
        } else {
          const res = onRejected(err)
          if (res instanceof myPromise) {
            res.then(onFulfilledNext, onRejectedNext)
          } else {
            onRejectedNext(res)
          }
        }
      }
      switch (this.stautus) {
        case PENDING:
          this.fulfilledQueues.push(resolveFn)
          this.rejectedQueues.push(rejectFn)
          break
        case FULFILED:
          onFulfilled(this.value)
          break
        case REJECTED:
          onRejected(this.value)
          break
      }
    })
  }

  static resolve() {

  }
}


const p1 = new myPromise((res, rej) => {
  setTimeout(() => {
    res('p1')
  }, 1000)
})
const p2 = new myPromise((res, rej) => {
  setTimeout(() => {
    res('p2')
  }, 1000)
})
p2.then((res) => {
  console.log(res)
  return 1
})
  .then((r) => {
    console.log('uuuuuu', r)
  })





