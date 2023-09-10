let和const命令

## let

1、 使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”。

~~~javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
~~~

2、 不能在函数内部重新声明参数

~~~javascript
function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
~~~

##  块级作用域

1、let 新增了块级作用域:外层代码块不受内存代码块的影响

~~~javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
~~~

2、let允许块级作用域任意嵌套： 内层作用域可以定义外层作用域的同名变量 ； 每一层都是一个单独的作用域，第四层作用域无法读取第五层作用域的内部变量 ；

~~~javascript
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
~~~

3、 ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域

~~~javascript
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
~~~

## const命令

1、 const声明一个只读的常量。一旦声明，常量的值就不能改变 ； 一旦声明变量，就必须立即初始化，不能留到以后赋值 ； const的作用域与let命令相同：只在声明所在的块级作用域内有效。

2、冻结对象

~~~javascript
1、冻结对象本身
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
2、冻结对象及对象的属性
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
~~~

##  顶层对象的属性

介绍： 顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的

# 变量的解构赋值

## 数组的解构赋值

1、 模式匹配 : 只要等号两边的模式相同，左边的变量就会被赋予对应的值。

~~~javascript
let [a, b, c] = [1, 2, 3];
||
let a = 1;
let b = 2;
let c = 3;
~~~

2、与扩展运算符连用

~~~
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]
~~~

3、不完全解构

~~~javascript
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
~~~

4、只要某种数据结构具有Interator接口，都可以采用数组形式的解构赋值

~~~javascript
//报错
如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
~~~

5、设置默认值

 解构赋值允许指定默认值 ， ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效

~~~javascript
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
~~~

## 对象的解构赋值

1、基本用法

 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。  如果解构失败，变量的值等于undefined

~~~javascript
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
~~~

2、解构赋值的内部机制

 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

~~~javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
~~~

3、解构用于嵌套结构的对象

~~~javascript
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
~~~

4、设置默认值

 默认值生效的条件是，对象的属性值严格等于`undefined`

~~~javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
~~~

5、注意点

 如果要将一个已经声明的变量用于解构赋值，必须非常小心

~~~javascript
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1});
~~~

 上面代码的写法会报错，因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

## 字符串的解构赋值

1、基本用法

~~~javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o
~~~

2、对length属性，进行解构赋值

~~~javascript
let {length : len} = 'hello';
len // 5
~~~

## 数值和布尔值的结解构赋值

## 函数参数的解构赋值

1、基本用法

~~~javascript
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3
~~~

## 圆括号问题

1、不得使用圆括号的情况：变量声明语句，函数参数，赋值语句的模式

2、可以使用圆括号的情况

 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

~~~javascript
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
~~~

## 变量的解构赋值用途

1、交换变量的值:交换变量的值

~~~javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
~~~

2、遍历Map结构

~~~javascript
for...of遍历map结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
console.log(map)//Map { 'first' => 'hello', 'second' => 'world' }
for(let i of map){
  console.log(i)//[ 'first', 'hello' ] [ 'second', 'world' ]
}
~~~

 任何部署了 Iterator 接口的对象，都可以用`for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便

~~~javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [,value] of map) {
  // ...
}
~~~

3、for...in与for...of

~~~javascript
for...in遍历对象
let obj={name:'hahah',age:18}
for(let i in obj){
  console.log(i)//name age
}
for...of遍历数组
let arr=['a','b','c']
for(let i of arr){
  console.log(i)//a b c
}
for...of遍历字符串
for (let codePoint of 'foo') {
  console.log(codePoint)//"f" "o" "o"
}
~~~

# 字符串的扩展

1、字符串的遍历器接口

 ES6 为字符串添加了遍历器接口（Iterator），使得字符串可以被`for...of`循环遍历。

2、模版字符串

~~~javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
~~~

上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

~~~javascript
let greeting = `\`Yo\` World!`;
~~~

 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中

~~~javascript
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);
~~~

.trim()方法可以去掉字符串两端多余的空格

~~~javascript
let str=`   去掉空格     `
let newStr=str.trim()//去掉空格
~~~

# 字符串的新增方法

1、实例方法：includes(), startsWith(), endsWith()

1.1、 **includes()** ： 返回布尔值，表示是否找到了参数字符串。

1.2、 **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部 。

1.3、 **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部 。

 这三个方法都支持第二个参数，表示开始搜索的位置。  上面代码表示，使用第二个参数`n`时，`endsWith`的行为与其他两个方法有所不同。它针对前`n`个字符，而其他两个方法针对从第`n`个位置直到字符串结束。

~~~javascript
let s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
~~~

2、实例方法：repeat()

repeat方法返回一个新字符串，表示将原字符串重复n次，参数如果是小数，会被取整；如果是负数或者Infinity，会报错；如果参数是0到-1之间的小数，则等同于0，这是因为会进行取整运算，0到-1之间的小数，取整以后等于-0，repeat视同为0；参数NaN等同于0；参数是字符串，则会先转换成数字

~~~javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
'na'.repeat(2.9) // "nana"
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError
'na'.repeat(-0.9) // ""
'na'.repeat(NaN) // ""
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
~~~

3、自动补全方法：padStart（）、padEnd()

 ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

padStart()和padEnd()一共接收两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

（1）如果原字符串的长度、等于或大于最大长度，则字符串补全不生效，返回原字符串.

（2）如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

（3）如果省略第二个参数，默认使用空格补全长度

~~~javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

'abc'.padStart(10, '0123456789')// '0123456abc'

'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
~~~

*padStart()的常见用途是为数值补全指定位数。如：生成10位的数值字符串

~~~javascript
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
~~~

*提示字符串格式

~~~javascript
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
~~~

4、去掉空格方法：trim()、trimStart()、trimEnd()

 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效

 浏览器还部署了额外的两个方法，`trimLeft()`是`trimStart()`的别名，`trimRight()`是`trimEnd()`的别名。

5、matchAll()

 matchAll()方法返回一个正则表达式在当前字符串的所有匹配

# 正则的扩展

## 字符串的正则方法

1、match（）

~~~javascript
var str = 'aaaaaaaa'
var reg1 = /a/;  str.match(reg1)
var reg2 = /a/g; str.match(reg2)
console.log(str.match(reg1))
// 结果为：["a", index: 0, input: "aaaaaaaa"]
console.log(str.match(reg2))
// 结果为：["a", "a", "a", "a", "a", "a", "a", "a"]

'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]
//单单一个y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配。
~~~

2、replace（）

~~~javascript
const REGEX = /a/gy;
'aaxa'.replace(REGEX, '-') // '--xa'
~~~

上面代码中，最后一个`a`因为不是出现在下一次匹配的头部，所以不会被替换。

单单一个`y`修饰符对`match`方法，只能返回第一个匹配，必须与`g`修饰符联用，才能返回所有匹配。

3、search（）

4、split（）

# 数值的扩展

1、Number.isFinite()、Number.isNaN()

（1）Number.isFinite()用来检查一个数值是否为有限的（finite）

参数类型不是数值，Number.isFinite一律返回false

~~~javascript
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false
~~~

（2）Number.isNaN()用来检查一个值是否是NaN

如果参数类型不是NaN,Number.isNaN一律返回false

~~~javascript
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
~~~

 它们与传统的全局方法`isFinite()`和`isNaN()`的区别在于，传统方法先调用`Number()`将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，`Number.isFinite()`对于非数值一律返回`false`, `Number.isNaN()`只有对于`NaN`才返回`true`，非`NaN`一律返回`false`。

~~~javascript
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false
~~~

2、Number.parseInt()、Number.parseFloat()

 ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。

~~~javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
~~~

3、Number.isInteger()

用来判断一个数值是否为整数

整数和浮点数采用的是同样的储存方法，所以25和25.0被视为同一值

如果参数不是数值，Number.isInteger返回false

~~~javascript
Number.isInteger(25) // true
Number.isInteger(25.1) // false
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false
~~~

4、Math.trunc()

Math.trunc方法用于去除一个数的小数部分，返回整数部分

对于非数值，Math.trunc内部使用Number方法将其先转为数值

对于空值和无法截取整数的值，返回NaN

~~~javascript
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0

Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
~~~

5、Math.sign()

Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

它会返回五种值：

- 参数为正数，返回`+1`；
- 参数为负数，返回`-1`；
- 参数为 0，返回`0`；
- 参数为-0，返回`-0`;
- 其他值，返回`NaN`。

# 函数的扩展

## 普通函数

1、基本用法：设置参数的默认值

~~~javascript
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point()
~~~

2、与解构赋值默认值结合使用

~~~j
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
~~~

3、函数的name属性

~~~javascript
function foo() {}
foo.name // "foo"
~~~

## 箭头函数

1、基本用法

如果箭头函数的代码块只用一条语句，不需要使用大括号将它们括起来，会自动作为return语句返回。

 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回。

 2、不适用箭头函数的场合

2.1、定义对象的方法，且该方法内部包括this

~~~javascript
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
~~~

 上面代码中，`cat.jumps()`方法是一个箭头函数，这是错误的。调用`cat.jumps()`时，如果是普通函数，该方法内部的`this`指向`cat`；如果写成上面那样的箭头函数，使得`this`指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致`jumps`箭头函数定义时的作用域就是全局作用域。

2.2、需要动态this的时候

~~~javascript
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
~~~

 上面代码运行时，点击按钮会报错，因为`button`的监听函数是一个箭头函数，导致里面的`this`就是全局对象。如果改成普通函数，`this`就会动态指向被点击的按钮对象。

## 尾调用优化

1、概念

 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

~~~javascript
function f(x){
  return g(x);
}
~~~

 上面代码中，函数`f`的最后一步是调用函数`g`，这就叫尾调用

2、不属于尾调用的情况

~~~javascript
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
~~~

## toString()方法

 返回一模一样的原始代码

~~~javascript
function /* foo comment */ foo () {}

foo.toString()
// "function /* foo comment */ foo () {}"
~~~

## catch命令的参数省略

 JavaScript 语言的`try...catch`结构，以前明确要求`catch`命令后面必须跟参数，接受`try`代码块抛出的错误对象。 上面代码中，`catch`命令后面带有参数`err`。

很多时候，`catch`代码块可能用不到这个参数。但是，为了保证语法正确，还是必须写。[ES2019](https://github.com/tc39/proposal-optional-catch-binding) 做出了改变，允许`catch`语句省略参数。

~~~javascript
//改变前
try {
  // ...
} catch (err) {
  // 处理错误
}

try {
  throw new Error('哈哈哈')
} catch (err) {
  console.log(err)//哈哈哈
}

//改变后
try {
  // ...
} catch {
  // ...
}
~~~

# 数组的扩展

## 扩展运算符的应用

1、复制数组

~~~javascript
//a2都是a1的克隆
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
~~~

2、合并数组

~~~javascript
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
~~~

3、与解构赋值结合

~~~javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
~~~

 **注意：**如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错

~~~javascript
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
~~~

4、扩展运算符可以将字符串转为真正的数组

~~~javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
~~~

5、实现了Iterator接口的对象

 任何定义了遍历器**Iterator**接口的对象，都可以用扩展运算符转为真正的数组。

Iterator接口：Map和Set结构，Generator函数, 字符串

 但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用**Array.from**方法将转为真正的数组。

 Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

~~~javascript
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
~~~

## Array.from()

 Array.from方法用于将两类对象转为真正的数组：类似数组的对象（ 所谓类似数组的对象，本质特征只有一点，即必须有length属性 ）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

1、类似数组的对象

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

 2、 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象

~~~javascript
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
~~~

3、 Array.from还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组 。

~~~javascript
let arrayLike={
  0:1,
  1:2,
  2:3,
  length:3,
}
let arr=Array.from(arrayLike,x=>x*x);
console.log(arr) //[1,4,9]
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
~~~

4、形成数量众多数组方法。

~~~javascript
//Array.from()可以将各种值转为真正的数组，并且还提供map功能
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']

let arr=Array.from({ length: 2 }, (value,index) => {
  let obj={
    id:index,
    name:'haha'
  }
  return obj
})
console.log(arr)//[ { id: 0, name: 'haha' }, { id: 1, name: 'haha' } ]
~~~

## Array.of()

1、基本用法：将一组值，转换为数组

~~~javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
~~~

## 数组实例的copywithin()

在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。使用这个方法，会修改当前数组。

三个参数：

- target（必需）：从该位置开始**替换**数据。如果为负值，表示倒数。
- start（可选）：从该位置开始**读取**数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前**停止读取**数据，默认等于数组长度。如果为负值，表示从末尾开始计算

```javascript
//从第0位开始替换数据，从第3位开始读取数据，读取到最后一位结束，复制到第0位
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```

 ## 数组实例的find()和findIndex()

1、find（）： 用于找出第一个符合条件的数组成员 ，找到返回true，没有找到返回undefined

回调的三个参数：

- value：当前值
- index：当前位置
- arr：原数组

~~~javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
~~~

2、findIndex（）： 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

~~~javascript
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
let age=[10, 12, 26, 15].find(f, person);
console.log(age)//26
~~~

## fill（）初始化空数组

1、fill方法使用给定值，填充一个数组，形成众多的数组

~~~javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
~~~

三个参数：第一个参数，填充的值；fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

~~~javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
//上面代码表示，fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。
~~~

**注意：** 如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

~~~javascript
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
~~~

## entries(),keys()和values()

 entries()，keys()和values()用于遍历数组。它们都返回一个**遍历器对象**可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

~~~javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
~~~

 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。

~~~javascript
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
~~~

## includes（）

includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。

~~~javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
~~~

该方法的第二个参数表示搜索的起始位置，默认为0。 如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

```javascript
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

## flat(), flatMap()

### flat():拉平数组

1、拉平一层

数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

~~~javascript
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
~~~

2、拉平多层

~~~javascript
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
flat()的参数为2，表示要“拉平”两层的嵌套数组
~~~

3、拉平N层: 可以用Infinity关键字作为参数

~~~javascript
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
~~~

4、如果原数组有空位，flat（）方法会跳过空位

~~~javascript
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
~~~

### flatMap(）

 flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。 flatMap()只能展开一层数组。

~~~javascript
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
~~~

# 对象的扩展



## 属性的可枚举性和遍历

### 可枚举性

 对象的每个属性都有一个描述对象，用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象 。

~~~javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
~~~

### 属性的遍历

ES6一共有5种方法可以遍历对象的属性

1、for...in

 for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）

2、Object.keys(obj)

 Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的**键名**。

3、Object.getOwnPropertyNames(obj)

 Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的**键名**。

4、 Object.getOwnPropertySymbols(obj)

 Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

5、 Reflect.ownKeys(obj)

 Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

## 对象的扩展运算符

### 解构赋值

1、基本用法

~~~javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
~~~

2、解构赋值要求等号右边是一个对象

~~~javascript
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误
~~~

3、解构赋值必须是最后一个参数，否则会报错

~~~javascript
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
~~~

4、解构赋值是浅拷贝， 扩展运算符的解构赋值，不能复制继承自原型对象的属性

### 扩展运算符

1、基本用法

~~~javascript
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
~~~

2、由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组

~~~javascript
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}
~~~

3、对象的扩展运算符等同于使用Object.assign()方法

~~~javascript
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
~~~

4、完整克隆一个对象+对象原型的属性

 Object.setPrototypeOf ()方法 用来设置一个对象的prototype对象，返回参数对象本身

Object.getPrototypeOf(obj)方法返回指定对象的原型

 Object.prototype.__proto__()方法读取或设置当前对象的 prototype 对象

 Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

 Object.getOwnPropertyDescriptors()方法用来获取一个对象的所有自身属性的描述符

~~~javascript
Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作。
~~~

~~~javascript
let obj={
  name:'haha',
  age:'18',
  description:'貌美如花'
}
obj.__proto__={yuanwang:'facai'}
let proto=Object.getPrototypeOf(obj)
console.log(proto) //{ yuanwang: 'facai' }

// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};
clone1//{ name: 'haha', age: '18', description: '貌美如花' }
clone1.__proto__//{ yuanwang: 'facai' }
// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
~~~

5、覆盖同名属性，修改现有对象部分属性

如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

~~~javascript
let newVersion = {
  ...previousVersion,
  name: 'New Name' // Override the name property
}
~~~

6、如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值

~~~javascript
let aWithDefaults = { x: 1, y: 2, ...a };
~~~

7、 对象的扩展运算符后面可以跟表达式

~~~javascript
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};
~~~

8、 链判断运算符 ?.  [[ES2020](https://github.com/tc39/proposal-optional-chaining) ]

~~~javascript
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value
~~~

 上面代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为`null`或undefined。如果是的，就不再往下运算，而是返回undefined

 链判断运算符的三种用法

~~~javascript
obj?.prop // 对象属性
obj?.[expr] // 同上
func?.(...args) // 函数或对象方法的调用
~~~

9、Null判断运算符??  [ES2020]

 只有运算符左侧的值为null或undefined时，才会返回右侧的值。

~~~javascript
const animationDuration = response.settings.animationDuration ?? 300;
~~~

# 对象的新增方法

## Object.is()

 Object.is用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

## Object.assign()

 Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target），实行的是浅拷贝 。

 第一个参数是目标对象，后面的参数都是源对象 ，

 **注意：**

1、如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性 。

2、 如果该参数不是对象，则会先转成对象，然后返回 。

3、 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错

~~~javascript
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
~~~

### Object.assign方法的常见用处

1、为对象添加属性

~~~javascript
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
~~~

2、为对象添加方法

~~~javascript
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
~~~

3、克隆对象

~~~javascript
Object.assign({}, origin)
~~~

4、合并多个对象

~~~javascript
const merge =(target, ...sources) => Object.assign(target, ...sources);
const merge =(...sources) => Object.assign({}, ...sources);
~~~

5、Object.getOwnPropertyDescritors()方法配合Object.defineProperty()方法，就可以实现正确拷贝

~~~javascript
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);
~~~

## Object.setPrototypeOf()

 Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身

##  Object.keys()

 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

~~~javascript
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
~~~

## Object.values()

 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

~~~javascript
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
~~~

## Object.entries()

 Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组 ， 将对象转为真正的Map结构 。

~~~javascript
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
~~~

## Reflect.ownEntries()

 返回对象自身的所有属性。

## Object.fromEntries()

 Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。

~~~javascript
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
~~~

~~~javascript
// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }
~~~

# symbol

## 概述

 ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）

 注意：Symbol 值不能与其他类型的值进行运算，会报错 ； Symbol 值可以显式转为字符串 ； Symbol 值也可以转为布尔值，但是不能转为数值。

1、基本使用

~~~javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
~~~

## Symbol.prototype.description

~~~javascript
const sym = Symbol('foo');

sym.description // "foo"
~~~

## 作为属性名的Symbol

 **注意: **Symbol 值作为对象属性名时，不能用点运算符 , 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。  如果`s`不放在方括号中，该属性的键名就是字符串`s`，而不是`s`所代表的那个 Symbol 值

~~~javascript
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
~~~

## 属性名的遍历

 Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。  但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

 另一个新的 API，`Reflect.ownKeys()`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

~~~javascript
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
~~~

## Symbol.for()，Symbol.keyFor()

### Symbol.for()

 Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。  Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。

~~~javascript
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false
~~~

### Symbol.keyFor()

 Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key

~~~javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
~~~

# set和Map数据结构

## set

1、基本用法

 它类似于数组，但是成员的值都是唯一的，没有重复的值 ,去除数组重复成员的方法。

~~~javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4

// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56
~~~

2、set实例的属性和方法

Set.prototype.constructor:构造函数，默认就是set函数。

Set.prototype.size:返回set实例的成员总数。

操作方法实例：

Set.prototype.add(value):添加某个值，返回Set结构本身

 Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功

Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员

 Set.prototype.clear()：清除所有成员，没有返回值。

遍历方法实例：

Set.prototype.keys()：返回键名的遍历器

Set.prototype.values()：返回键值的遍历器

Set.prototype.entries()：返回键值对的遍历器

Set.prototype.forEach()：使用回调函数遍历每个成员

~~~javascript
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
~~~

3、遍历Set

~~~javascript
//扩展运算符
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']

//数组去重
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]

//map和filter方法
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6} [...ser]、Array.from(set)可转化为真正的数组
let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
~~~

两个set的并集、交集和差集

~~~javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
~~~

两个数组的并集、交集和差集

~~~javascript
let obj1=[1,2,3,4]
let obj2=[4,3,6,7]
//并集
let add=[...obj1,...obj2]
//交集
let sum=obj2.filter(e=>obj1.includes(e))
//差集
let reduce=obj2.filter(e=>!obj1.includes(e))
~~~

## map

1、map的基本用法

~~~javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
console.log(map)//Map { 'first' => 'hello', 'second' => 'world' }
使用：map.get('first') //hello

const actions = new Map([
  [1, ['processing','IndexPage']],
  [2, ['fail','FailPage']],
  [3, ['fail','FailPage']],
  [4, ['success','SuccessPage']],
  [5, ['cancel','CancelPage']],
  ['default', ['other','Index']]
])
console.log(actions)
Map {
  1 => [ 'processing', 'IndexPage' ],
  2 => [ 'fail', 'FailPage' ],
  3 => [ 'fail', 'FailPage' ],
  4 => [ 'success', 'SuccessPage' ],
  5 => [ 'cancel', 'CancelPage' ],
  'default' => [ 'other', 'Index' ] }
使用：actions.get(1)  // [ 'processing', 'IndexPage' ]
	actions.get(6) || actions.get(default) //[ 'other', 'Index' ]

//执行函数
const map=new Map([
  [1,()=>{console.log(1)}],
  [2,()=>{console.log(2)}],
  [3,()=>{console.log(3)}]
])
console.log(map.get(1)())
~~~

2、实例的属性和操作方法

（1）size属性：返回Map结构的成员总数

~~~javascript
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
~~~

（2）set()方法： 设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键 ， set方法返回的是当前的Map对象，因此可以采用链式写法。

~~~javascript
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
~~~

（3）get()方法: 读取key对应的键值，如果找不到key，返回undefined

~~~javascript
const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!
~~~

(4) has()方法：返回一个布尔值，表示某个键是否在当前 Map 对象之中

~~~javascript
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
~~~

(5)delet()方法： 删除某个键，返回true。如果删除失败，返回false。

~~~javascript
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false
~~~

(6) clear()方法： 清除所有成员，没有返回值。

~~~javascript
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
~~~

3、遍历方法

（1）Map.prototype.keys()：返回键名的遍历器。

（2）Map.prototype.values()：返回键值的遍历器。

（3）Map.prototype.entries()：返回所有成员的遍历器。

（4）Map.prototype.forEach()：遍历 Map 的所有成员。

~~~javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
~~~

4、 Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。

~~~javascript
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
~~~

5、 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）

~~~javascript
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
~~~

~~~javascript
//forEach方法
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
~~~

## WeakMap

1、含义： WeakMap结构与Map结构类似，也是用于生成键值对的集合。

 WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。

 WeakMap的键名所指向的对象，不计入垃圾回收机制。 它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

~~~javascript
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"

const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
~~~

 上面代码中，如果将数值1和Symbol值作为 WeakMap 的键名，都会报错。

# Proxy

## 概述

~~~javascript
var proxy = new Proxy(target, handler);
~~~

 Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

1、基本用法：拦截读取属性行为

~~~javascript
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
~~~

~~~javascript
let handler={
  get: function(target, propKey) {
    return 35;
  }
}
var object = { proxy: new Proxy(target, handler) };
console.log(object.proxy.name)//35
~~~

~~~javascript
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
~~~

同一个拦截器函数，可以设置拦截多个操作

~~~javascript
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
~~~

## Proxy实例的方法

### get（）

get方法用于拦截某个属性的读取操作， 可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

~~~javascript
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
~~~

###  set()

 set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选 。 严格模式下，set代理返回false或者undefined，都会报错。

~~~j
//使用Proxy保证age的属性值符合要求
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
~~~

~~~javascript
//结合get和set方法，做到防止内部属性被外部读写
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property

上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
~~~

### apply()

 apply方法拦截函数的调用、call和apply操作 。

 apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

~~~javascript
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"

var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
~~~

### has()

 has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。

 has方法可以接受两个参数，分别是目标对象、需查询的属性名。

~~~javascript
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
~~~

### construct()

 construct方法用于拦截new命令，下面是拦截对象的写法。

 construct方法返回的必须是一个对象，否则会报错。

 construct方法可以接受两个参数。

- target：目标对象
- args：构造函数的参数对象
- newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）

~~~javascript
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// "called: 1"
// 10
~~~

### deleteProperty()

 deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。

```javascript
//deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
```

 # Reflect

## 概述

 Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个 。

（1）  将Object对象的一些明显属于语言内部的方法

（2）  修改某些Object方法的返回结果，让其变得更合理

 Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false

~~~javascript
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
~~~

（3)让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

~~~javascript
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
~~~

(4) Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

~~~javascript
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
~~~

 上面代码中，Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

~~~javascript
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
~~~

~~~javascript
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
~~~

# promise

##  基本用法

~~~javascript
const promise = new Promise(function(resolve, reject) {
  let boolean=false
  if (boolean){
    resolve('成功');
  } else {
    reject('错误');
  }
});
promise.then((res)=>{//resolved状态的回调
  console.log(res)
},(err)=>{//rejected状态的回调
  console.log(err)
}).catch((err)=>{
  console.log(err)
})
~~~

## Promise新建后会立即执行

~~~javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');//会立即执行
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
~~~

 上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

异步加载图片

```
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

## resolve函数的参数还可以是另一个Promise实例

 **注意：** 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

  上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

 注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。

~~~javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
~~~

 上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

## resolve或reject并不会终结Promise的参数函数的执行

~~~javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2

//正确写法
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
~~~

## Promise.prototype.then()

then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。  then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

~~~javascript
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
~~~

## Promise.prototype.catch()

 如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。

 如果 Promise 状态已经变成resolved，再抛出错误是无效的

~~~javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
~~~

 Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

~~~javascript
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
//上面代码中，一共有三个 Promise 对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。
~~~

**注意**： 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法

 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。  这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

```
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

 **注意**： 一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。

## Promise.prototype.finally()

 finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作， finally方法的回调函数**不接受任何参数**，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

~~~javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···})
~~~

## Promise.all()

all方法用于将多个Promise实例， 包装成一个新的 Promise 实例， 接受一个数组作为参数 ， 另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

~~~javascript
const p = Promise.all([p1, p2, p3]);
~~~

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

## Promise.race()

 Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例 , 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

~~~javascript
const p = Promise.race([p1, p2, p3])
~~~

## Promise.allSettled()

 Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected

~~~javascript
let promisesList=list.map(e=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          if(e===2){
           reject(e)
          }else{
           resolve(e)
          }
        },10000)
      })
    })
Promise.allSettled(promisesList).then((e)=>{
    console.log('每个项目状态===>',JSON.stringify(e,null,4))
})
~~~



~~~javascript
[
    {
        "status": "fulfilled",
        "value": 1
    },
    {
        "status": "rejected",
        "reason": 2
    },
    {
        "status": "fulfilled",
        "value": 3
    }
]
~~~



## Promise.any()

 Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

## Promise.resolve()

 将现有对象转为 Promise 对象 ,该实例的状态为resolved。

```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

  Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象， 需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，即：在本轮事件循环的末尾执行。而不是在下一轮“事件循环”的开始时。

```
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

  上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。

 Promise.resolve方法的参数分成四种情况

1、参数是一个Promise实例

 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

2、 参数是一个thenable对象

 thenable对象指的是具有then方法的对象，比如下面这个对象。

~~~javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
}
~~~

 Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

~~~javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
~~~

3、 参数不是具有then方法的对象，或根本就不是对象

 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

~~~javascript
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
~~~

4、不带有任何参数

 Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

 所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。

~~~javascript
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
~~~



## Promise.reject()

 Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

~~~javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
~~~

## Promise.try()

~~~javascript
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
~~~

# Generator函数

1、 Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数

~~~javascript
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
~~~

 上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。

**注意：**yield表达式只能用在Generator函数里面，用在其他地方都会报错

2、与Iterator接口的关系，可以被...运算符遍历,此时不需要调用next方法

~~~javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
~~~

3、next方法的参数

 yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作**上一个**yield表达式的返回值。

~~~javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
~~~

 **注意:**由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的

4、for...of循环

 for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。

~~~javascript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
~~~

 上面代码使用for...of循环，依次显示 5 个yield表达式的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。

5、Generator.prototype.throw()

~~~javascript
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
~~~

 上面代码中，遍历器对象i连续抛出两个错误。第一个错误被 Generator 函数体内的catch语句捕获。i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。

 如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。

~~~javascript
var g = function* () {
  while (true) {
    yield;
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a
~~~

**注意：** 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。

 **注意：**throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。

6、Generator.prototype.return()

 Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数

~~~javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
~~~

 上面代码中，遍历器对象g调用return方法后，返回值的value属性就是return方法的参数foo。并且，Generator 函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true。

 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。

~~~javascript
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
~~~

 上面代码中，调用return()方法后，就开始执行finally代码块，不执行try里面剩下的代码了，然后等到finally代码块执行完，再返回return()方法指定的返回值。

# async函数

## 含义

 async是 Generator 函数的语法糖 ， async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await。 async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

## 基本用法

 async函数返回一个` Promise 对象`，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

 async函数内部return语句返回的值，会成为then方法回调函数的参数。

 async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

 async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

~~~javascript
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
~~~

## await命令

### 前一个异步操作失败，会中断后面的异步操作

 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。 另一种情况，await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于Promis对象。

 await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。  任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

~~~javascript
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
~~~

 ### 即使前一个异步操作失败，也不中断后面的异步操作

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。  另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。

~~~javascript
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
~~~

## 错误处理

 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject，防止出错的方法，也是将其放在try...catch代码之中

```javascript
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
```

 ## 使用注意点

**第一点：**任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。 所以最好把await命令放在try...catch代码块中

~~~javascript
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法
async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}
~~~

**第二点：**多个await命令后面的异步操作，如果不存在继发关系，最好让他们同时触发

**第三点：**await命令只能用在async函数之中，如果用在普通函数之中就会报错

多个请求并发执行，可以使用Promise.all方法。当三个请求都会resolved时，下面两种写法效果相同

~~~javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}
//实际用法
let {data} = await alieegPdf({ 'reportType': 7, 'workNo': this.rowTableData.workNo })
let textPromises = data.map(async (url) => {
   const {data} = await alieegPdfStream({'workNo': this.rowTableData.workNo, 'url': url})
          return window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' 		}))
 })       
 let results = await Promise.all(textPromises)
 urls.push(...results)
]

// 或者使用下面的写法
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
//实际用法
 let {data} = await alieegPdf({ 'reportType': 7, 'workNo': this.rowTableData.workNo })
 let textPromises = data.map(async url => {
   const {data} = await alieegPdfStream({'workNo': this.rowTableData.workNo, 'url': url})
   return window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
  })
 for (const textPromise of textPromises) {
    let urlAli = await textPromise
    urls.push(urlAli)
  }
~~~

第四点：**async函数可以保留运行堆栈

~~~javascript
const a = async () => {
  await b();
  c();
}
~~~

 上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。

# class的基本语法

## 简介

1、传统方法：通过构造函数来生成实例对象

~~~javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
~~~

2、通过class关键字，来定义类

 ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已 。

 构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，**类的所有方法都定义在类的prototype属性上面** ， **在类的实例上面调用方法，其实就是调用原型上的方法**。

~~~javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
  toValue() {}
}
//等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
~~~

 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。

~~~javascript
class Point {
  constructor(){
    // ...
  }
}
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
~~~

 prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的

## 类的实例

 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）

~~~javascript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
~~~

 上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。这些都与 ES5 的行为保持一致。

与ES5一样，类的所有实例共享一个原型对象

~~~javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
~~~

上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，所以`__proto__`属性是相等的。这也意味着，可以通过实例的`__proto__`属性为“类”添加方法, 使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。

## 取值函数（getter）和存值函数（setter）

~~~javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
~~~

## Class表达式

1、与函数一样，类也可以使用表达式的形式定义

~~~javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
}
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
~~~

 上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。  Me只在 Class 内部有定义。

~~~javascript
const MyClass = class { /* ... */ };
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
~~~

 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式, 上面代码中，person是一个立即执行的类的实例。

## 静态方法和静态属性

 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，**加上`static`关键字，就表示该方法不会被实例继承**，而是直接通过类来调用，这就称为“静态方法”。  ES6 明确规定，Class 内部只有静态方法，没有静态属性。  父类的静态方法，也会被子类继承 ,不会被实例继承。

~~~javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
~~~

 父类的静态方法，可以被子类继承。

~~~javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
~~~

实例想调用父类的静态方法，可以从super对象上调用。

~~~javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
~~~

## 实例属性的新写法

 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。 以下两种方式是相同的。

~~~javascript
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

class IncreasingCounter {
  _count = 0; //不需要加this
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
~~~

## 私有方法和私有属性

前缀#表示私有方法，前缀#x表示私有属性

# Class的继承

## 简介

 ~~~javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
 ~~~

 上面代码中，constructor方法和toString方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。 在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字

 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。

##   Object.getPrototypeOf()

 Object.getPrototypeOf方法可以用来从子类上获取父类 ， 可以使用这个方法判断，一个类是否继承了另一个类。

~~~javascript
Object.getPrototypeOf(ColorPoint) === Point
// true
~~~

## super关键字

 ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。

~~~javascript
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
~~~

## 类的 prototype 属性和`__proto__`属性

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类prototype属性的`__proto__`属性，表示方法的继承，总是指向父类的prototype属性。

~~~javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
~~~

 上面代码中，子类B的`__proto__`属性指向父类`A`，子类`B`的`prototype`属性的`__proto__`属性指向父类`A`的`prototype`属性。

## 实例的 __proto__ 属性

 子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

~~~javascript
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
~~~

# Module 的语法

## export命令

 模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

~~~javascript
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
//更推荐以下写法
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export { firstName, lastName, year };
~~~

 通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。

~~~javascript
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
};
~~~

## import命令

 使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

~~~javascript
import { firstName, lastName, year } from './profile.js'
~~~

 如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

~~~javascript
import { lastName as surname } from './profile.js';
~~~

**注意：** import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

~~~javascript
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
~~~

 **注意：**import命令具有提升效果，会提升到整个模块的头部，首先执行。

~~~javascript
foo();
import { foo } from 'my_module';
~~~

## 模块的整体加载

 除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面

~~~javascript
export function area(radius) {
  return Math.PI * radius * radius;
}
export function circumference(radius) {
  return 2 * Math.PI * radius;
}

import * as circle from './circle'; //整体加载的写法
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
~~~

## export default命令

 从前面的例子可以看出，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。  为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。 其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

~~~javascript
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo
~~~

## export与import的复合写法

1、正常使用

~~~javascript
export { foo, bar }
import { foo, bar } from 'my_module';
~~~

2、整体输出,,整体引入

~~~javascript
var a = {};
export default a;
import customName from 'my_module';
~~~

## 模块的继承

 假设有一个circleplus模块，继承了circle模块。

~~~javascript
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
~~~

 上面代码中的export *，表示再输出circle模块的所有属性和方法。注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。

## import()

| 名称        | 区别                                                         |
| ----------- | ------------------------------------------------------------ |
| import      | import命令会被JavaScript引擎静态分析，先于模块的其他语句执行，import和export命令只能在模块的顶层，不能在代码块之中。无法在运行时加载模块，无法动态加载。 |
| require（） | 运行时加载模块，动态加载，**同步加载**。                     |
| import（）  | 动态加载模块，**异步加载**，什么时候运行到这一句，就会加载指定的模块。返回一个Promise对象。 |

### 适用场合

1、按需加载

~~~javascript
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
~~~

2、条件加载

import（）可以放在if代码块，根据不同的情况，加载不同的模块。

~~~javascript
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
~~~

3、动态的模块路径

import（）允许模块路径动态生成

~~~javascript
import(f())
.then(...);
~~~

 上面代码中，根据函数`f`的返回结果，加载不同的模块。

### 注意点

1、import（）加载模块成功以后，这个模块会作为一个对象，当做then方法的参数，可以使用对象的解构赋值

~~~javascript
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
~~~

2、如果模块有default输出接口，可以用参数直接获得

~~~javascript
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
~~~

3、import（）也可以再async函数之中

~~~javascript
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([      //同时加载多个模块
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
~~~

# module的加载实现

## 浏览器加载

1、传统方法

 HTML 网页中，浏览器通过<script>标签加载 JavaScript 脚本 ,默认情况下，浏览器是同步加载JavaScript脚本，即渲染引擎遇到<script>标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

两种异步加载的语法

| 语法                                              | 区别                                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| <script src="path/to/myModule.js" defer></script> | **渲染完再执行**：等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行。如果有多个，会按照顺序加载。 |
| <script src="path/to/myModule.js" async></script> | **下载完就执行**：一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。如果有多个不能保证加载顺序。 |

## ES6模块与CommonJS模块的差异

| 模块     | 区别                                                 |
| -------- | ---------------------------------------------------- |
| CommonJS | 模块输出的是值的拷贝，模块内部的变化就影响不到这个值 |
| ES6      | 模块输出的是值的引用，动态引用                       |

1、CommonJS模块

~~~javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
~~~

~~~javascript
// main.js
var mod = require('./lib');
console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
~~~

 CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值 ,想要得到内部变动，需写成一个函数。

~~~javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() { //取值器函数
    return counter
  },
  incCounter: incCounter,
};
~~~

2、ES6模块

~~~javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}
~~~

~~~javascript
// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
~~~

 ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。 如果是输出变量obj，可以对obj添加属性，但是重新赋值就会报错。因为变量obj指向的地址是只读的，不能重新赋值， export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。

# 编程风格

- let取代var
- 建议优先使用const
- 静态字符串一律使用单引号，动态字符串使用反引号
- Module：import取代require；export取代module.exports

# ArrayBuffer

 **`ArrayBuffer`对象**：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

将一个二进制数据类型的文件，读取为ArrayBuffer对象

~~~javascript
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];//二进制文件
const reader = new FileReader();
reader.readAsArrayBuffer(file);//转ArrayBuferr
reader.onload = function () {
  const arrayBuffer = reader.result;//ArrayBuferr对象
  // ···

    
    
    
~~~

