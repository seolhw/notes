const obj = {
  a: 100
}
const obj1 = obj;
let a1 = obj.a;
obj1.a = 200;
console.log(obj.a); // 200
console.log(a1);  // 100
a1 = 300;
console.log(obj.a); // 200
console.log(obj1.a); // 200

// 同步任务看先后的调用顺序,then里面的是微任务
console.log('script start') //1

async function async1 () {
  await async2()
  console.log('async1 end') //5
}

async function async2 () {
  console.log('async2 end') //2
}
async1()

setTimeout(function () {
  console.log('setTimeout') //8
}, 0)

new Promise(resolve => {
  console.log('Promise') // 3
  resolve()
})
  .then(function () {
    console.log('promise1') //6
  })
  .then(function () {
    console.log('promise2')// 7
  })

console.log('script end') // 4



// async function foo () {
//   console.log('foo'); // 3
// }
// async function bar () {
//   console.log('bar	start'); // 2
//   await foo();
//   console.log('bar	end'); //6
// }
// console.log('script	start'); //1
// setTimeout(function () {
//   console.log('setTimeout');//8
// }, 0);
// bar();
// new Promise(function (resolve) {
//   console.log('promise	executor'); //4
//   resolve();
// }).then(function () {
//   console.log('promise	then');//7
// });
// console.log('script	end'); //5



// async function async1 () {
//   console.log('2 async1 start'); //2
//   await async2();
//   console.log('6 async1 end') //6
// }
// async function async2 () {
//   console.log('3 async2') // 3
// }
// console.log('1 script start'); //1
// setTimeout(function () {
//   console.log('8 setTimeout') //8
// }, 0);
// async1();
// new Promise(function (resolve) {
//   console.log('4 promise1'); // 4
//   resolve()
// }).then(function () {
//   console.log('7 promise2') //7
// });
// console.log('5 script end') //5

// setTimeout(() => {
//   console.log('A'); //4
// }, 0);
// var obj = {
//   func: function () {
//     setTimeout(function () {
//       console.log('B') // 5
//     }, 0);
//     return new Promise(function (resolve) {
//       console.log('C'); // 1
//       resolve();
//     })
//   }
// };
// obj.func().then(function () {
//   console.log('D') // 3
// });
// console.log('E'); // 2
// // c e d a b
