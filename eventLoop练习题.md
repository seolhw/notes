~~~javascript
console.log('script start'); // 同步 1

setTimeout(() => {
  console.log('time1'); //  异步 10
}, 1 * 2000);

Promise.resolve()
  .then(function () {
    console.log('promise1'); //  异步 4
  }).then(function () {
    console.log('promise2'); // 异步 8
  });


async function foo () {
  await bar()
  console.log('async1 end') // 异步 5
}
foo()

async function errorFunc () {
  try {
    await Promise.reject('error!!!')
  } catch (e) {
    console.log(e)  // 异步  6
  }
  console.log('async1'); // 异步 7
  return Promise.resolve('async1 success')
}
errorFunc().then(res => console.log(res)) // 异步 9

function bar () {
  console.log('async2 end') //  同步 2
}

console.log('script end'); //  同步 3


/**
1、script start
2、async2 end
3、script end
4、promise1
5、async1 end
6、error!!!
7、async1
8、promise2
9、async1 success
10、time1
 */
~~~

~~~javascript
setTimeout(() => {
  console.log(1)
}, 0)

const P = new Promise((resolve, reject) => {
  console.log(2)
  setTimeout(() => {
    resolve()
    console.log(3)
  }, 0)
})

P.then(() => {
  console.log(4)
})
console.log(5)
/**
 * 2
 * 5
 * 1
 * 3
 * 4
 */
~~~

~~~javascript
var p1 = new Promise(function (resolve, reject) {
  resolve("2")
})

setTimeout(function () {
  console.log("1")
}, 10)

p1.then(function (value) {
  console.log(value)
})

setTimeout(function () {
  console.log("3")
}, 0)
/**
 * 2
 * 3
 * 1
 */
~~~

