# 第一章：在html中使用jsvascript

## script元素

**属性：**

- async：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或等待加载其他脚本。只对外部脚本文件有效。

- chaset：可选。表示通过src指定的代码的字符集。由于大多数浏览器会忽略它的值，因此这个属性很少有人用。

- defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。

- src：可选。表示包含要执行的外部文件

- type：可选。可以看成是language的替代属性；表示编写代码使用的脚本语言的内容类型（也称为MIME类型）。人们一直以来使用的是text/javascript,不过这个属性不是必需的，如果没有指定这个属性，则其默认值仍为text/javascript

**使用<script>元素的两种方法:**

- 直接在页面中嵌入javaScript代码

~~~javascript
 <script type="text/javascript">
    function sayhi(){
      alert('hi')
    }
  </script>
~~~

注意：包含在<script>元素内部的js代码将被从上至下依次解释。在使用<script>嵌入js代码时，记住不要在代码中的任何地方出现"<script>结束"字符串，当浏览器遇到"<script>结束"字符串时，就会认为那是结束的<script>。

- 包含外部javaScript文件

~~~javascript
 <script type="text/javascript" src="example.js"></script>
~~~

~~~javascript
<script type="text/javascript" src="http:www.somewhere.com/afile.js"></script>
~~~

注意：带用src属性的<script>不应该在其标签之间再添加额外的javascript代码。嵌入的代码会被忽略。

### 标签的位置

位置：放在body元素中页面内容的后面

- 延迟脚本：defer=“defer”（脚本在执行时不会影响页面的构造）

- 异步脚本：async属性（异步加载页面其它内容）

## noscript标签

~~~javascript
  <noscript>
    <p>本页面需要浏览器支持（启用）javascript</p>
  </noscript>
~~~

这个页面会在脚本无效的情况下向用户显示一条消息，而在启用了脚本的浏览器中，用户永远不会看到它。

# 第二章：基本概念

## 变量

定义变量时要用var操作符，如果在函数中使用var定义了一个变量，那么这个变量在函数退出后就会被销毁。

~~~javascript
function test() {
  var message = 'hi'//局部变量
}
test()
console.log(message)//message is not defined
~~~

~~~javascript
function test() {
  message = 'hi'//全局变量
}
test()
console.log(message)//hi
~~~

注意：函数内省略了var操作符，因此message就会成为全局变量

## 数据类型

基本数据类型：Undefined、Null、Boolean、Number、String

复杂数据类型：Object（Object、Array、Function）

### Undefined类型

Undefined类型只有一个值，在使用var声明变量但未对其加以初始化时，这个值就是undefined

~~~javascript
var message
console.log(message===undefined)//true
~~~

###　Null类型

Null类型只有一个值，这个特殊值是null，表示一个空对象指针（声明了一个变量，并且赋值为null），而这也正是使用typeof操作符检验null会返回“object”的原因

~~~javascript
var car=null
console.log(typeof car)//"object"
~~~

**注意：**undefined值派生于null，即null==undefined总是返回true

### Boolean类型

Boolean类型只有true和false，虽然Boolean类型的字面值只有两个，但是所有类型的值都有与这两个Boolean值等价的值。要将一个值转化为对应的Boolean值，可以调用转型函数Boolean（）

| 数据类型  | 转换为true的值               | 转换为false的值 |
| --------- | ---------------------------- | --------------- |
| Boolean   | true                         | false           |
| String    | 任何非空字符串               | ""(空字符串)    |
| Number    | 任何非零数字值（包括无穷大） | 0和NaN          |
| Object    | 任何对象                     | null            |
| Undefined | ~                            | undefined       |

**注意：**这些转换规则对理解流程控制语句（如if语句）自动执行相应的Boolean准换非常重要

### Number类型

1、浮点数值：包含一个小数点，小数点后面必须至少有一位数字；

**注意：**

（1）由于保存浮点数值需要的内存空间是保存整数的两倍，因此会不失时机地将浮点数值转换为整数值。

（2）对于那些极大或者极小的数值，可以用e表示法（即科学计数法）表示的浮点数值表示

~~~javascript
极大数值
var floatNum=3.125e7 //31250000(3.125*10^7)
极小数值
var floatNum=0.00000000000000003 //3e-17(3*10^-17)
~~~

（3）浮点数值的最高精度是17位，小数计算精度不准确（如0.1+0.2的结果不是0.3，而是0.30000000000000004）

2、数值范围

isFinite()函数：验证一个数是不是有穷的（是不是位于最小和最大的数值之间），是的话会返回true。

3、NaN

NaN，即非数值（not a number）是一个特殊的数值。

（1）任何涉及NaN的操作（例如NaN/10）都会返回NaN

（2）NaN与任何值都不相等，包括自身

（3）isNaN()函数，是否“不是数值”，在接受到一个值之后，会尝试将这个值转换为数值

~~~javascript
console.log(isNaN(NaN))//true
console.log(isNaN(10))//false
console.log(isNaN("10"))//false(可以被转换成数值10)
console.log(isNaN("blue"))//true(不能被转换成数值)
console.log(isNaN(true))//false(可以被转换成数值1)
~~~

4、数值转换

**Number():适用于任何数据类型**

- 如果是Boolean值，true和false将分别转换为1和0

- 如果是数字值，只是简单的传入和返回

- 如果是null，返回0

- 如果是undefined，返回NaN

- 如果是字符串，遵循下列规则

 ——如果字符串中只包含数字（包括前面带正负号的情况），则将其转换为十进制数值，即”1“会变成       1，”123“会变成123，而”011“会变11（注意：前导的零被忽略了）；

——如果字符串中包含有效的浮点格式，如”1.1“，则将其转换为对应的浮点数值（同样也会忽略前导零）；

——如果字符串中包含有效的十六进制格式，例如”oxf“,则将其转换为相同大小的十进制整数值；

——如果字符串是空的（不包含任何字符）,则将其转换为0；

——如果字符串中包含除上述格式之外的字符，则将其转换为NaN；

- 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值，如果转换的结果是NaN,则调用对象的toString()方法，然后再次依照前面的规则转换返回的字符串值。

**parseInt()：把字符串转化成数值（整数）**

由于Number（）函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是ParseInt（）函数。它会忽略字符串前面的空格，直至找到第一个非空格字符，如果第一个字符是数字字符，parseInt()会继续解析第二个字符，至到解析完所有后续字符或者遇到了一个非数字字符（小数点并不是有效的数字字符）。parseInt()提供第二个参数（转换时使用的基数即多少进制）

~~~javascript
var num=parseInt("0XAF",16) //175
var num1=parseInt("AF",16)//175 如果指定了16作为第二个参数，字符串可以不带前面的“0X
var num2=parseInt("AF")//NaN  第一个字符不是数字字符
~~~

**parseFloat()：把字符串转化成数值（浮点数）**

与parseInt（）函数类似，parseFloat（）也是从第一个字符（位置0）开始解析每个字符。而且也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为至。也就是说，字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略。parseFloat（）只解析十进制值，因此没有第二个参数

~~~javascript
parseFloat("0XA") //0
parseFloat("0908.5")//908.5
parseFloat("3.125e7")//31250000
~~~

### String类型

1、字符字面量

| 字面量 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| \n     | 换行                                                         |
| \t     | 制表                                                         |
| \b     | 退格                                                         |
| \r     | 回车                                                         |
| \f     | 进纸                                                         |
| \\\    | 斜杠                                                         |
| \\\'   | 单引号（’）                                                  |
| \\\"   | 双引号（”）                                                  |
| \\xnn  | 以十六进制代码nn表示的一个字符（其中n为0~F）。例如，\41表示“A” |
| \unnnn | 以十六进制代码nnnn表示的一个Unicode字符（其中n为0~F）        |

2、转换为字符串

- toString()

**null和undefined值没有这个方法**，可以传递一个参数：输出数值的基数。默认情况下以十进制格式返回数值的字符串表示。

- String()

能够将任何类型转换为字符串

### Object类型

### typeof操作符

检验给定变量的数据类型——typeof || typeof()

**返回值：**

“undefined”——未定义的值

“boolean”——布尔值

“string”——字符串

“number”——数值

“object”——对象（对象，数组）、null

“function”——函数

## 操作符

### 一元操作符

1、递增和递减操作符

后置递增和递减与前置递增和递减有一个重要的区别，即递增和递减操作是在包含他们的语句被求值之后才执行的。

~~~javascript
//前置
let num = 10
console.log(--num) //9
//后置
let num = 10
console.log(num--)//10
~~~

2、一元加和减操作符

放在数值前面，对数值不会产生任何影响，不过，在对非数值应用一元加减操作符时，该操作符会像Number（）转型函数一样对这个值执行转换。（减操作符主要用于表示负数）

### 布尔操作符

1、逻辑非!

逻辑非操作符由一个叹号（!）表示，可应用于任何值，都会返回一个布尔值。首先会将它的操作数转换为一个布尔值，然后再对其求反。同时使用两个逻辑非操作符!!，实际就会模拟Boolean()转型函数的行为，其中第一个逻辑非操作会基于无论什么操作数返回一个布尔值，而第二个逻辑非操作则对该布尔值求反，于是就得到了这个值真正对应的布尔值。

2、逻辑与

逻辑与操作符由两个和号（&&）表示，属于短路操作符

3、逻辑或

逻辑或操作符由两个竖线符号（||）表示，属于短路操作符

| 运算符           | 语法           | 说明                                              |
| ---------------- | -------------- | ------------------------------------------------- |
| 逻辑与，AND(&&)  | expr1&&expr2   | 若expr1可转换为true，则返回expr2；否则，返回expr1 |
| 逻辑或，OR(\|\|) | expr1\|\|expr2 | 若expr1可转换为true，则返回expr1；否则，返回expr2 |
| 逻辑非，NOT(!)   | !expr          | 若expr可转换为true，则返回false；否则，返回true   |

### 乘性操作符

1、乘法（*）

如果有一个操作数不是数值，则在后台调用Number（）将其转换为数值

2、除法（/）

如果有一个操作数不是数值，则在后台调用Number（）将其转换为数值

3、求模（%）

求余数：如果有一个操作数不是数值，则在后台调用Number（）将其转换为数值

### 加性操作符

1、加法

有一个操作数是字符串，那么就要应用如下规则：

如果两个操作数都是字符串，则将第二个操作数与第一个操作数拼接起来；

如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来；

2、减法

### 关系操作符

小于（<）、大于（>）、小于等于（<=）、大于等于(>=)，这几个操作符都会返回一个布尔值

两个操作数是字符串，则是从左开始一位一位的比较（第一位相同比较第二位...）。

### 相等操作符

1、相等（==）和不相等（!=）——先转换再比较

null和undefined是相等的；

NaN与任何值都不相等，包括自身；

要比较相等性之前，不能将null和undefined转换成其他任何值；

2、全等(===)和不全等(!==)——仅比较而不转换：

null和undefined是不相等的，因为它们是不同类型的值

### 条件操作符

三目运算符

### 赋值操作符

## 语句

### if语句

if语句会自动调用Boolean（）转换函数，将条件转换为一个布尔值；执行语句既可以是一行代码，也可以是一个代码块。

### do-while语句

do-while语句是一种后测试循环语句，在对条件表达式求值之前，循环体内的代码至少会被执行一次。

~~~javascript
var i = 0
do {
  i+=2
} while(i<10)
console.log(i)//10
只要变量i的值小于10，循环就会一直继续下去
~~~

### while语句

while语句属于前测试循环语句，在循环体内的代码被执行之前，就会对出口条件求值

~~~javascript
var i = 0
while (i < 10) {
  i+=2
}
只要i的值小于10，循环就会继续下去
~~~

### for语句

for语句也是一种前测试循环语句，但它具有在执行循环之前初始化变量和定义循环后要执行的代码的能力。执行语句既可以是一行代码，也可以是一个代码块。

~~~javascript
for (let i = 0; i < 10;i++) console.log(i)//0-9
只有当条件表达式（i<10）返回true的情况下才会进入for循环，如果执行了循环体中的代码，则一定会对循环体后的表达式（i++）求值，即递增i的值。
~~~

### for-in语句

for-in语句，可以用来枚举对象的属性。如果表示要迭代的对象的变量值为null或undefined。

~~~javascript
for (let property in window) {
  document.write(property)
}
~~~

### break和continue语句

break和continue语句用于在循环中精确地控制代码的执行。其中，break语句会立即退出循环，强制继续执行循环后面的语句。而continue语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行。

### switch语句

switch在比较值时，使用的是全等操作符，因此不会发生类型转换。从根本上将，switch语句就是为了让开发人员免于编写if..else if...else if...else这样的代码

~~~javascript
switch (i) { 
  case 25:
    console.log(25);
    break;
  case 35:
    console.log(35);
    break;
  case 45:
    console.log(45)
    break;
  default:
    alert("other")
}
~~~

switch语句中的没一种情形（case）的含义是：”如果表达式等于这个值，则执行后面的语句“。而break关键字会导致代码执行流跳出switch语句。如果省略break关键字，就会导致执行完当前的case后，继续执行一个case。最后default关键字则用在表达式不匹配前面任何一种情形的时候，执行机动代码。假如确实要混合几种情形，不要忘了在代码中添加注释，说明你是有意省略了break关键字，如下所示：

~~~javascript
switch (i) {
  case 25:
      /**合并两种情况 */
  case 35:
    console.log(35);
    break;
  case 45:
    console.log(45)
    break;
  default:
    alert("other")
}
~~~

## 函数

### 参数

函数的参数arguments对象只是与数组类似，并不是真正的数组。arguments的值永远与对应命名参数的值保持同步，没有传递值的命名参数将自动被赋予undefined值。

# 第三章：变量、作用域和内存问题

##　基本类型和引用类型的值

基本类型值：简单的数据段

引用类型值：可能有多个值构成的对象

### 复制变量值

**从一个变量向另一个变量复制基本类型的值：**会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。

![1](https://minio.lihuiwang.net/notes/notes/2023/09/10/1.png)

**从一个变量向另一个变量复制引用类型的值：**同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中。不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。复制操作结束后，两个变量实际上将应用同一个对象。因此，改变其中一个变量，就会影响另一个变量。

![2](https://minio.lihuiwang.net/notes/notes/2023/09/10/2.png)

### 传递参数

ECMAScript中所有函数的参数都是**按值**传递的。也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。可以把函数的参数想象成局部变量。

**基本类型值的传递：**

~~~javascript
let count = 20;
function addTen(num) {
  num+=10
}
console.log(count)//20
~~~

**引用类型值的传递：**

~~~javascript
let person = new Object();
function setName(obj) {
  obj.name = "Nicholas"
  obj = new Object()
  obj.name="Greg"
}
setName(person)
console.log(person.name)//Nicholas
~~~

这说明：即使在函数内部修改了参数的值，但原始的引用仍然保持未变。实际上当在函数内部重写obj时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被销魂

### 检测类型

工具1：typeof(检测基本数据类型的的得力助手，但在检测引用类型的值时，这个操作符的用处不大)

工具2：instanceof（检测某个变量是否为 某个对象的实例）

~~~javascript
console.log(person instanceof Object)//变量person是Object吗？
~~~

## 执行环境及作用域

**全局执行环境：**全局执行环境是最外围的一个执行环境。在web浏览器中，全局执行环境被认为是window对象，因此所有全局变量和函数都是作为window对象的属性和方法创建的。某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退出—例如关闭网页或浏览器时才会被销毁）

**作用域链：**当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。

~~~javascript
var color = "blue"
function changeColor() {
  var anotherColor = "red"
  function swapColors() {
    var temCorlor = anotherColor
    anotherColor = color
    color = temCorlor
    //这里可以访问color、anotherColor、temCorlor
  }
  //这里可以访问color和anotherColor，但不能访问temCorlor
  swapColors()
}
//这里只能访问color
changeColor()
~~~

下图是该例子的作用域链:其中，内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境的任何变量和函数。这些环境之间的联系是线性、有次序的。每个环境都可以向上搜索作用域链，以查询变量和函数名；但任何环境都不能通过向下搜索作用域链而进入另一个执行环境。

![3](https://minio.lihuiwang.net/notes/notes/2023/09/10/3.png)

### 没有块级作用域

~~~javascript
if (false) {
  var color='red'
}
console.log(color)//undefined

if (true) {
  var color='red'
}
console.log(color)//red

for (var i = 0; i < 10; i++) {
 console.log(i)//0-9
}
console.log(i)//10
~~~

javaScript中if语句中的变量声明会将变量添加到当前的执行环境（在这里是全局环境）中，在使用for语句时尤其要牢记这一差异；由for语句创建的变量i即使在for循环执行结束后，也依旧会存在与循环外部的执行环境中

1、声明变量

使用var声明的变量会自动被添加到最近的环境中。在函数内部，最接近的环境就是函数的局部环境；在with语句中，最接近的环境就是函数环境。如果初始化变量时没有使用var声明，该变量会自动被添加到全局环境。

## 垃圾收集

优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一但数据不再有用，最好通过将其值设置为null来释放其引用-------这个做法叫做解除引用。这一做法使用与大多数全局变量和全局对象的属性。局部变量会在它们离开执行环境时自动被解除引用。

# 第四章：引用类型

## Object类型

- 在使用字面量语法时，数值属性名会自动转换为字符串。

- 一般来说，访问对象属性时使用的都是点表示法，不过，在javascript也可以使用方括号表示法来访问对象的属性。在使用方括号语法时，应该将要访问的属性以字符串的形式放在方括号中。从功能上看，这两种访问对象属性的方法没有任何区别。但方括号语法的优点是可以通过变量来访问属性，如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以使用方括号表示法。

## Array类型

- 创建数组的基本方法

**第一种：**使用Array构造函数，另外，在使用Array构造函数时也可以省略new操作符。

~~~javascript
//给构造函数传递数量，该数量就会自动变成length属性的值
let arr = new Array(20)
console.log(arr)//[ <20 empty items> ]

//也可以向Array构造函数传递数组中应该包含的项
let arr = new Array(1,2,3)
console.log(arr)//[ 1, 2, 3 ]
~~~

**第二种：**使用数组字面量表示法。

- 数组的length属性

数组的length属性很有特点——它不是只读的。因此，通过设置这个属性，可以从数组的末尾移除或向数组中添加新项。

~~~javascript
var arr=[1,2,3]
arr.length=2 //移除最后一项

//如果将其length属性设置为大于数组项数的值，则新增的每一项都会取得undefined值
arr.length=4
console.log(arr)//[ 1, 2, <2 empty items> ]
console.log(arr[3])//undefined

//利用length属性也可以在数组末尾添加新项
var arr=[1,2]
arr[arr.length] = 3
console.log(arr)//[ 1, 2, 3 ]
~~~

### 检测数组

intanceof操作符：value instanceof Array；它假定只有一个全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

Array.isArray()方法：Array.isArray()；这个方法的目的是最终确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。

### 转换方法

所有的对象都具有toLocalString()、toString()和valueOf()方法

~~~javascript
var arr=[1,2,3]
//valueOf()返回的还是数组本身
console.log(arr.valueOf())//[ 1, 2, 3 ]

//toString()方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串，为了创建这个字符串会调用数组每一项的toString()方法
console.log(arr.toString())//1,2,3

///toString()方法也会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串，为了创建这个字符串会调用数组每一项的toLocaleString()方法
console.log(arr.toLocaleString())//1,2,3
~~~

join()方法

以上三种方法在默认情况下都会以逗号分隔的字符串的形式返回数组项。而如果使用join()方法，则可以使用不同的分隔符来构建这个字符串。join（）方法只接受一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串，如果不给join方法传入任何值，或者给它传入undefined，则使用逗号作为分隔符。

~~~javascript
var arr=[1,2,3]
console.log(arr.join())//1,2,3
console.log(arr.join('-'))//1-2-3
~~~

### 栈方法

栈是一种后进先出的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部。

- push():推入

push()方法可以接受任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。

- pop():弹出

pop()方法则从数组末尾移除最后一项，减少数组的length值，然后返回移除的项。

### 队列方法

队列是一种先进先出的数据结构，队列在列表的末端添加项，从列表的前端移除项。

- push():添加

- shift():从前移除

shift()方法它能够移除数组中的第一个项并返回该项，同时将数组长度减1。结合shift和push可以像队列一样使用数组。

unshift():从前添加

unshift()与shift()的用途相反，它能在数组前端添加任意个项并返回数组的长度。

### 重排序方法

- reverse():反转数组


- sort():排序

sort()方法，在默认情况下，按升序排列数组项，sort方法会调用每个数组项的toString()转型方法，然后比较得到的字符串，以确定如何排序。所以这种排序方式在很多情况下都不是最佳方案。

为了解决此问题，sort（）方法可以接收一个比较函数作为参数。比较参数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数。对于数值类型或者其valueOf()方法会返回数值类型的对象类型，可以使用一个更简单的比较函数。这个函数只要用第二个值减第一个值即可。

如果返回第一个值减去第二个则是升序排序

~~~javascript
var arr=[0,1,2,10,3]
//升序
arr.sort((value1, value2) => {
  return value1-value2
}))
~~~

### 操作方法

- concact():基于当前数组创建新数组。

concact()方法会先创建数组的当前数组的一个副本，然后将接受到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给concact()方法传递参数的情况下，它只是复制当前数组并返回副本。如果传递给concact()方法的是一个或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中。如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾。

- slice():基于当前数组中的一个或多个创建一个新数组。

silce()方法接受1个或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项但不包括结束位置的项。如果参数中有一个负数，则用数组长度加上该数来确定相应的位置。如果结束位置小于起始位置，则返回空数组。注意，slice()不会影响原始数组。

- splice():主要用途是向数组的中部插入项。但使用这种方法的方式有如下3种。

**删除：**可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数。

**插入：**可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、0(要删除的项数)和要插入的项。如果要插入多个项，可以再传入第四，第五以至任意多个项。例如，splice（2,0，"red","green"）会从当前数组的位置2开始插入字符串"red"和"green"。

**替换：**可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定3个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice(2,1,"red","green")会删除数组位置2的项，然后再从位置2开始插入字符串"red"和"green"

### 位置方法

- indexOf():从数组的开头（位置0）开始向后找查找。


- lastIndexOf():从数组的末尾开始向前查找。


这两个方法都接受两个参数：要查找的项和（可选的）表示要查找起点位置的索引。其中indexOf()方法从开始向后查找，lastIndexOf()方法则从数组的末尾开始向前查找。这两个方法都返回要查找的项在数组中的位置，或者在没有找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会使用全等操作符。

### 迭代方法

ECMAScript5为数组定义了5个迭代方法，每个方法都接受两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响this的值。传入这些方法中的函数会接受三个参数：数组项的值，该项在数组中的位置和数组对象本身。

- every():对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true。

- filter():对数组每一项运行给定函数，返回该函数会返回true的项组成的数组。

- forEach():对数组中的每一项运行给定函数。这个方法没有返回值。

- map():对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

- some():对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true。

以上方法都不会修改数组中包含的值。

### 归并方法

- reduce():迭代数组的所有项，然后构建一个最终返回的值。从数组的第一项开始，逐个遍历到最后。

- reduceRight()：迭代数组的所有项，然后构建一个最终返回的值。从数组的最后一项开始，向前遍历到第一项。

这两个方法都接受两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。传给reduce()和reduceRight()的函数接收4个参数：前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数是数组的第二项。

使用reduce()方法可以执行求数组中所有值之和的操作

~~~javascript
var values=[1,2,3,4,5]
let sum=values.reduce((pre, cur, index, array) => {
  return pre+cur
})
console.log(sum)//15
//ffffff第一次执行回调函数，pre是5，cur是4。
~~~

## Date类型

- new Date():创建日期对象。

- Date.now():返回表示调用这个方法的日期和时间的毫秒数。

- +new Date():获取Date对象的时间戳。

### 日期格式化

toDateString():以特定于实现的格式显示星期几、月、日和年；

toTimeString():以特定于实现的格式显示时、分、秒和时区；

toLocaleDateString():以特定于地区的格式显示星期几、月、日和年；

toLocalTimeString():以特定于实现的格式显示时、分、秒；

toUTCString():以特定于实现的格式完整的UTC日期。

### 日期/时间组件方法

| 方法                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| getTime()                | 返回表示时间的毫秒数；与valueOf()返回的值相同                |
| setTime(毫秒)            | 以毫秒数设置日期，会改变整个日期                             |
| getFullYear()            | 取得4位数的年份（如2007而非07）                              |
| getUTCFullYear()         | 返回UTC日期的4位数年份                                       |
| setFullYear(年)          | 设置日期的年份。传入的年份值必须是4位数（如2007而非仅07）    |
| setUTCFullYear(年)       | 设置UTC日期的年份。传入的年份值必须是4位数（如2007而非仅07） |
| getMonth()               | 返回日期中的月份，其中0表示一月，11表示十二月                |
| getUTCMonth()            | 返回UTC日期中的月份，其中0表示一月，11表示12月               |
| setMonth(月)             | 设置日期的月份。传入的月份值必须大于0，超过11则增加年份      |
| setUTCMonth(月)          | 设置UTC日期的月份。传入的月份值必须大于0，超过11则增加年份   |
| getDate()                | 返回日期月份中的天数（1到31）                                |
| getUTCDate()             | 返回UTC日期月份中的天数（1到31）                             |
| setDate(日)              | 设置日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份 |
| setUTCDate(日)           | 设置UTC日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份 |
| getDay()                 | 返回日期中星期的星期几（其中0表示星期日，6表示星期六）       |
| getUTCDay()              | 返回UTC日期中星期的星期几（其中0表示星期日，6表示星期六）    |
| getHours()               | 返回日期中的小时数（0到23）                                  |
| getUTCHours()            | 返回UTC日期中的小时数（0到23）                               |
| setHours(时)             | 设置日期中的小时数。传入的值超过了23则增加月份中的天数       |
| setUTChours(时)          | 设置UTC日期中的小时数。传入的值超过了23则增加月份中的天数    |
| getMinutes()             | 返回日期中的分钟数（0到59）                                  |
| getUTCMinutes()          | 返回UTC日期中的分钟数（0到59）                               |
| setMinutes(分)           | 设置日期中的分钟数。传入的值超过59则增加小时数               |
| setUTCMinutes(分)        | 设置UTC日期中的分钟数。传入的值超过59则增加小时数            |
| getSeconds()             | 返回日期中的秒数（0到59）                                    |
| getUTCSeconds()          | 返回UTC日期中的秒数（0到59）                                 |
| setSeconds(秒)           | 设置日期中的秒数。传入的值超过59会增加分钟数                 |
| setUTCSeconds(秒)        | 设置UTC日期中的秒数。传入的值超过59会增加分钟数              |
| getMilliseconds()        | 返回日期中的毫秒数                                           |
| getUTCMilliseconds()     | 返回UTC日期中的毫秒数                                        |
| setMilliseconds(毫秒)    | 设置日期中的毫秒数                                           |
| setUTCMilliseconds(毫秒) | 设置UTC日期中的毫秒数                                        |
| getTimezoneOffset()      | 返回本地时间与UTC时间相差的分钟数。例如，美国东部标准时间返回300.在某地进入夏令时的情况下，这个值会有所变化。 |

## RegExp类型

**字面量方式定义正则表达式**

var expression=/pattern/ flags

pattern:正则表达式；

flags：标志，用以标明正则表达式的行为。

1、g：表示全局模式；

2、i：表示不区分大小写模式；

3、m：表示多行模式；

~~~javascript
var str = 'cathhhat'
//匹配字符串中所有"at"实例
var pattern1 = /at/g
//匹配第一个"bat"或"cat",不区分大小写
var pattern2 = /[bc]at/i
//匹配所有以"at"结尾的3个字符的组合，不区分大小写
var pattern3=/.at/gi
let s=str.replace(pattern3, '123')
~~~

正则表达式中的元字符包括：（[{\^$|）?*+.]}

注意：如果想要匹配字符串中包含的这些字符，就必须对它们进行转义\。

**RegExp构造函数定义正则表达式**

RegExp接受两个参数：一个是要匹配的字符串模式，另一个是可选的标志字符串。

~~~javascript
var pattern1 = /at/i
var pattern2= new RegExp("at","i")
pattern1与pattern2是完全等价的正则表达式
~~~

注意：由于RegExp构造函数的模式参数是字符串，所以在某些情况下，如果想要匹配字符串中包含的这些字符，就必须对它们进行双重转义

### 正则中的元字符

非打印字符

| 字符             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| `\s`             | 空格：（空格、制表符、换行符）                               |
| `\S`             | 非空格                                                       |
| `\d`             | 数字                                                         |
| `\D`             | 非数字，同【^0-9】相同                                       |
| `\w`             | 字符（字母和数字及下划线）                                   |
| `\W`             | 非字符                                                       |
| `.`              | 除了换行符以外的任意字符, 加s还可以匹配换行符                |
| `n*`             | 匹配零个或多个n                                              |
| `n+`             | 匹配至少一个n的字符串                                        |
| `n?`             | 匹配零个或一个n                                              |
| `^`              | 行首匹配                                                     |
| `$`              | 行尾匹配                                                     |
| `|`              | 或者                                                         |
| `\n`             | 匹配换行符                                                   |
| `\r`             | 匹配回车字符                                                 |
| `\t`             | 匹配制表符                                                   |
| `\f`             | 换页符                                                       |
| `\b`             | 匹配一个单词边界，也就是单词和空格间的位置                   |
| `\B`             | 匹配非单词边界，与上一个例子反过来                           |
| [\u4e00-\u9fa5]  | 匹配汉字                                                     |
| [^\u4e00-\u9fa5] | 匹配非汉字                                                   |
| [\u2E80-\uFE4F]  | 比较广泛的中文汉字（包含生僻字和许多字符比如中文句号分号逗号、书名号 等等） |
| [\u3000-\u303F]  | CJK标点符号                                                  |

特殊字符

| 特别字符 | 描述                               |
| -------- | ---------------------------------- |
| ^        | 匹配输入字符串的开始位置           |
| $        | 匹配输入字符串的结尾位置           |
| *        | 匹配零次或多次                     |
| +        | 匹配前面的子表达式一次或多次       |
| .        | 匹配除换行符 \n 之外的任何单字符。 |
| [        | 标记一个中括号表达式的开始         |
| ]        | 标记一个中括号表达式的结束         |
| ?        | 匹配前面的子表达式零次或一次       |
| {        | 标记限定符表达式的开始             |
| }        | 标记限定符表达式的结束             |
| ( )      | 标记一个子表达式的开始和结束位置。 |

限定符

| 字符  | 描述                           |
| ----- | ------------------------------ |
| {0,}  | 简写`n*` 匹配零个或多个n       |
| {1,}  | 简写`n+` 匹配至少一个n的字符串 |
| {0,1} | 简写`?` 匹配零个或一个n        |
| {n}   | 匹配n次                        |
| {n,m} | 匹配n到m次，需要加边界         |
| {n,}  | 至少匹配n次                    |

### 正则中的小括号

1. ()里面的内容表示捕获分组，()会把每个分组里的匹配结果保存起来，使用$n获取；
2. `/(a)(b)(c)\1\2\3/` \1代表a和小括号a是一样的内容、\2代表b，
3. `(xyz)+` 匹配至少一个(xyz)，括号表示一体，
4. `/a(b|c)d/` 匹配abd,acd；
5. `hehe{3}` 是e匹配3次，(hehe){3}，是hehe单词匹配3次；

`\1` 或 `$1` 匹配第一个分组中的内容

`\2` 或 `$2` 匹配第二个分组中的内容

`\3` 或 `$3` 匹配第三个分组中的内容

`\n`只能用在正则表达式中，`$n`只能用在正则表达式之外的地方；

~~~javascript
'2018-02-11'.replace(/(\d{4})\-(\d{2})\-(\d{2})/g,'$1/$2/$3')  // '2018/02/11'
'18782832656'.replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3')
~~~

### 正则中的中括号

`[abc]`整体代表一个字符，内部为或的关系。

`[^abc]`：排除abc；中括号中使用^，表示排除；

`[a-z]`: 范围a-z；可以是`[e-j]`；代表一个字符

### 正则中的?= ?<= ?! ?<!

| 用法          | 描述                           |
| ------------- | ------------------------------ |
| exp1(?=exp2)  | 前瞻：查找exp2前面的exp1       |
| (?<=exp2)exp1 | 后顾：查找exp2后面的exp1       |
| exp1(?!exp2)  | 负前瞻：查找后面不是exp2的exp1 |
| (?<!exp2)exp1 | 负后顾：查找前面不是exp2的exp1 |

举例：**

"中国人".replace(/(?<=中国)人/, "rr") // 匹配中国人中的人，将其替换为rr，结果为 中国rr
"法国人".replace(/(?<=中国)人/, "rr") // 结果为 法国人，因为人前面不是中国，所以无法匹配到 

## 

### 常见的正则表达式

| 正则表达式                         | 描述             |
| ---------------------------------- | ---------------- |
| (?![\u3000-\u303F])[\u2E80-\uFE4F] | 包含生僻字的中文 |
|                                    |                  |
|                                    |                  |

### 正则中字符串的用法

| 用法                                               | 描述       |
| -------------------------------------------------- | ---------- |
| '12345678'.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') | 格式化金钱 |
| /(\d{1,3})(?=(\d{3})+(\.\d+)?$)/g                  | 千位分隔符 |
|                                                    |            |
|                                                    |            |

### RegExp实例方法

exec():返回包含第一个匹配项的数组；或者在没有匹配的情况下返回null。

~~~javascript
var pattern1 = /at/g
console.log(pattern1.exec(str))//[ 'at', index: 1, input: 'cathhhat', groups: undefined ]
~~~

对于exec()方法而言，即使在模式中设置了全局标志（g）,它每次也只会返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用exec()将始终返回第一个匹配项的信息。而在设置全局标志的情况下，在同一个字符串上多次调用exec()将始终返回第一个匹配项的信息。而在设置全局标志的情况下，每次调用exec()则都会在字符串中继续查找新匹配项。

test():在模式与该参数匹配的情况下返回true；否则，返回false。

~~~javascript
var pattern1 = /at/g
console.log(pattern1.test(str))//true
~~~

toLocaleString()和toString()方法都会返回正则表达式的字面量。

### 总结

一、创建正则表达式的两种方式

1、字面量方式

var expression=/pattern/ flags

flags：g（全局模式）、i (不区分大小写模式)、m（多行模式）

2、构造函数方式

var pattern2= new RegExp("at","i")

二、RegExp实例方法

1、exec（）：返回包含第一个匹配项的数组；或者在没有匹配的情况下返回null

2、test（）：匹配成功返回true；匹配不成功返回false

![正则总结大纲](https://minio.lihuiwang.net/notes/notes/2023/09/10/4.png)

## Function类型

**使用函数声明语法定义函数**

~~~javascript
function sum(num1, num2) {
  return num1+num2
 }
~~~

**使用函数表达式定义函数**

~~~javascript
var sum = function (num1, num2) {
  return num1+num2
}
~~~

两个相同方式定义的同名函数，后面的函数会覆盖前面的函数。同名的两个函数，一个使用函数声明语法定义的函数，一个使用函数表达式定义的函数，函数表达式会覆盖函数声明语法定义的函数。

~~~javascript
var sum = function (num1, num2) {
  return num1+num2+num1
}
function sum(num1, num2) {
  return num1+num2
}
console.log(sum(10,20))//40
~~~

### 函数声明与函数表达式

**区别：**解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解析执行。——**函数声明提升**

~~~javascript
console.log(sum(10,20))//30
function sum(num1, num2) {
  return num1+num2
}
以上代码完全可以正常运行。因为在代码开始执行之前，解析器已经通过一个名为函数声明提升的过程，读取并将函数声明添加到执行环境中。对代码求值时，JavaScript引擎在第一遍会声明函数并将它们放到源代码的顶部。所以，即使声明函数的代码在调用它的代码后面，JavaScript引擎也能把函数声明提升到顶部。
~~~

~~~javascript
console.log(sum(10,20))//报错
var sum = function (num1, num2) {
  return num1+num2
}
以上代码之所以会在运行期间产生错误，原因在于函数位于一个初始化语句中，而不是一个函数声明。换句话说，在执行函数所在的语句之前，变量sum中不会保存有对函数的引用；而且，由于第一行代码就会导致“sum is not a function”错误，实际上也不会执行到下一行。
~~~

### 作为值的函数

因为ECMAScript中的函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。

**根据年龄升序排序：**

~~~javascript
function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]
    if (value1 < value2) {
      return -1
    }
    if (value1 > value2) {
      return 1
    }
    return 0
  }
}
var data = [{ name: 'zhangsan', age: 18 }, { name: 'lisi', age: 29 }, {name:'wangwu',age:26}]

console.log(data.sort(createComparisonFunction('age')))
// [
//   { name: 'zhangsan', age: 18 },
//   { name: 'wangwu', age: 26 },
//   { name: 'lisi', age: 29 }
// ]
~~~

### 函数内部属性

在函数内部，有两个特殊的对象：arguments和this。

 this值：当在网页的全局作用域中调用函数时，this对象引用的就是window

### 函数属性和方法

每个函数都包含两个属性：length和prototype。其中，length属性表示函数希望接受的命名参数的个数。对于ECMAScript中的引用类型而言，prototype是保存它们所有实例方法的真正所在。换句话说，诸如toString()和valueOf()等方法实际上都保存在prototype名下，只不过是通过各自对象的实例访问罢了。

每个函数都包含两个非继承而来的方法：apply()和call()。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。

apply()方法接受两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是Array的实例，也可以是arguments对象（函数的参数arguments对象只是与数组类似，并不是真正的数组）。

call()方法与apply()方法在接受参数的方式上不同。第一个参数是this，其余参数都直接传递给函数。

bind()方法会创建一个函数实例，其this值都会被绑定到传递给bind()函数的值。

它们都能扩充函数的作用域

~~~javascript
var o = { color: 'blue' }
function sayColor() {
  console.log(this.color)
}
sayColor.call(o) //bule
let resetColor=sayColor.bind(o)
resetColor.bind(o)()//blue
~~~

## 基本包装类型

为了便于操作基本类型值，ECMAScript还提供了3个特殊的引用类型：Boolean、Number和String。这些类型与本章介绍的其他引用类型相似，但同时也具有各自的基本类型相应的特殊行为。引用类型与基本包装类型的主要区别就是对象的生存期。使用new操作符创建的引用类型的实例，在执行流离开当前当前作用域之前一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这意味着我们不能在运行时为基本类型添加属性和方法。

### Boolean类型

布尔表达式中的所有对象都会被转换为true

~~~javascript
let result = new Boolean(false) && true
console.log(result)//true
~~~

### Number类型

除了继承的方法之外，Number类型还提供了一些用于将数值格式化为字符串的方法。

toFixed():按照指定的小数位返回数值的字符串表示。

toExponential():返回以指数表示法（也称e表示法）表示的字符串形式。

### String类型

1、字符方法

charAt()：以单字符字符串的形式返回给定位置的那个字符。

charCodeAt()：以单字符编码的形式返回给定位置的那个字符。

2、字符串操作方法

concat():用于将一或多个字符串拼接起来，返回拼接得到的新字符串。但实践中使用更多的还是加号操作符（+），在大多数情况下都比使用concat()方法要简便易行。不会改变原始字符串。

slice()、substr()、substring():返回被操作字符串的一个子字符串。第一个参数指定子字符串的开始位置，第二个参数（在指定的情况下）表示子字符串到哪里结束。具体来说，slice()和substring()的第二个参数指定的是子字符串最后一个字符后面的位置，substring()方法会将较小的数作为开始位置，将较大的数作为结束位置，而substr()的第二个参数指定的则是返回字符的个数。如果没有给这些方法传递第二个参数，则将字符串的末尾作为结束位置。在传递给这些方法的参数是负数的情况下，slice()方法会将传入的负值与字符串的长度相加，substr()方法将负的第一个参数加上字符串的长度而将负的第二个参数转换为0。substring()方法会将所有的负值都转换为0。不会改变原始字符串。

3、字符串位置方法

indexOf():返回字符串的位置，如果没有找到该字符串，则返回-1，第二个参数表示从字符串的那个位置开始搜索，从开头向后搜索。

lastIndexOf():返回字符串的位置，如果没有找到该字符串，则返回-1，第二个参数表示从字符串的那个位置开始搜索，从结尾向前搜索。

**实例:**找到所有匹配的字符串的位置

~~~javascript
let str = 'Lorem ipsum dolor sit amet,consecteur adipisicing elit'
let positoins = []
let pos = str.indexOf('e')
while (pos > -1) {
  positoins.push(pos)
  pos=str.indexOf('e',pos+1)
}
console.log(positoins)//[ 3, 24, 31, 34, 50 ]
~~~

4、trim()方法

trim():这个方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。

5、字符串大小写转换方法

toLowerCase():转换为小写。

toUpperCase():转换为大写。

toLocalLowerCase():针对特定地区转换为小写。

toLocalUpperCase():针对特定地区转换为大写。

6、字符串的模式匹配方法

match():只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象，返回一个包含匹配项的数组。

search():只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象，返回字符串中第一个匹配项的索引，如果没有找到匹配项，则返回-1，而且，search()方法始终是从字符串开头向后查找模式。

replace():替换字符串，这个方法接受两个参数：第一个参数可以是一个RegExp对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个字符串。想要替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（g）标志。

split():可以基于指定的分隔符将一个字符串分隔成多个子字符串，并将结果放在一个数组中。可以接受第二个参数，用于指定数组的大小。

7、localCompare()方法

localCompare():比较两个字符串，并返回下列值中的一个：

如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况下是-1）

如果字符串等于字符串参数，则返回0；

如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况下是1）

8、fromCharCode()方法

接受一或多个字符编码，然后将它们转换成一个字符串。

## 单体内置对象

### Global对象

1、URI编码方法

encodeURI():对uri进行编码，不会对特殊字符进行编码，例如冒号、正斜杆、问号和井字号。

decodeURI():只能对使用encodeURI()替换的字符进行解码。

encodeURIComponent():会对它发现的任何非标准字符进行编码。

decodeURLComponent():能够解码使用encodeURIComponent()编码的所有字符。

2、eval()方法

eval():就像是一个完整的ECMAScript解析器，它只接受一个参数，即要执行的ECMAScript(或javaScript)字符串，在eval()中创建的任何变量或函数都不会被提升，因为在解析代码的时候，它们被包含在一个字符串中；它们只在eval()执行的时候创建。

3、Global对象的属性

| 属性           | 说明                                           |
| -------------- | ---------------------------------------------- |
| undefined      | 特殊值undefined                                |
| NaN            | 特殊值NaN                                      |
| Infinity       | 特殊值Infinity                                 |
| Object         | 构造函数Object                                 |
| Array          | 构造函数Array                                  |
| Function       | 构造函数Function                               |
| Boolean        | 构造函数Boolean                                |
| String         | 构造函数String                                 |
| Number         | 构造函数Number                                 |
| Date           | 构造函数Date                                   |
| RegExp         | 构造函数RegExp                                 |
| Error          | 构造函数Error                                  |
| EvalError      | 构造函数EvalError                              |
| RangeError     | 构造函数RangeError                             |
| ReferenceError | 构造函数ReferenceError                         |
| SyntaxError    | 构造函数SyntaxError                            |
| TypeError      | 构造函数TypeError（类型错误：var a='123',a()） |
| URIError       | 构造函数URIError                               |

**错误类型：**

undefined:未定义

~~~javascript
var a
console,log(a)
Undefined类型只有一个值，在使用var声明变量但未对其加以初始化时，这个值就是undefined
解析：声明了变量a，但是没有赋值，所以抛出undefined 
~~~

SyntaxError ：语法错误

ReferenceError：引用错误

~~~javascript
console.log(b)
解析：b未声明，无法引用变量b，所以抛出ReferenceError
~~~

TypeError：类型错误

~~~javascript
var a='123'
a()
解析：a是String类型，执行时把它当作Function类型，所以抛出TypeError
~~~

4、window对象

在全局作用域中声明的所有变量和函数，就都成为了window对象的属性。

### Math对象

1、Math对象的属性

| 属性         | 说明                             |
| ------------ | -------------------------------- |
| Math.E       | 自然对数的底数，即常量e的值      |
| Math.LN10    | 10的自然对数                     |
| Math.LN2     | 2的自然对数                      |
| Math.LOG2E   | 以2为底e的对数                   |
| Math.LOG10E  | 以10为底e的对数                  |
| Math.PI      | π的值                            |
| Math.SQRT1-2 | 1/2的平方根（即2的平方根的倒数） |
| Math.SQRT2   | 2的平方根                        |

2、min()和max()方法

Math.min()：用于确定一组数值中的最小值。

Math.max():用于确定一组数值中的最大值。

Math.min.apply(Math,values):找到数组中的最大值，等同于Math.min(...values)。

Math.max.apply(Math,values):找到数组中的最大值，等同于Math.max(...values)。

3、舍入为整数的方法

Math.ceil():执行向上舍入，即它总是将数值向上舍入为最接近的整数；

Math.floor():执行向下舍入，即它总是将数值向下舍入为最接近的整数；

Math.round():执行标准舍入，即它总是将数值四舍五入为最接近的整数（四舍五入）

4、random()方法

Math.random():返回大于等于0小于1的一个随机数

值=Math.floor(Math.random()*可能值的总数+第一个可能的值)：从某个整数范围内随机选择一个值

~~~javascript
1到10之间的随机的整数
var num=Math.floor(Math.random()*10+1)
2到10之间的随机整数
var num=Math.floor(Math.random()*9+2)
~~~

**实例：**编写一个函数返回介于任意两个数之间的一个数值

~~~javascript
function selecFrom(lowerValue, upperValue) {
  var choices = upperValue - lowerValue + 1//可能值的总数
  return Math.floor(Math.random()*choices+lowerValue)
}
console.log(selecFrom(2,10))
~~~

5、其它方法

| 方法                | 说明                |
| ------------------- | ------------------- |
| Math.abs(num)       | 返回num的绝对值     |
| Math.exp(num)       | 返回Math.E的num次幂 |
| Math.log(num)       | 返回num的自然数对   |
| Math.pow(num,power) | 返回num的power次幂  |
| Math.sqrt(num)      | 返回num的平方根     |
| Math.acos(x)        | 返回x的反余弦值     |
| Math.asin(x)        | 返回x的反正弦值     |
| Math.atan(x)        | 返回x的反正切值     |
| Math.atan2(y,x)     | 返回y/x的反正切值   |
| Math.cos(x)         | 返回x的余弦值       |
| Math.sin(x)         | 返回x的正弦值       |
| Math.tan(x)         | 返回x的正切值       |

# 第六章：面向对象的程序设计

## 理解对象

### 属性类型

#### 数据属性

1、Configurable:表示能否通过delete删除属性从而定义属性，能否修改属性的特性，或者能否吧属性修改为访问器属性。

2、Enumerable：表示能否通过for-in循环返回属性。

3、Writable:表示能否修改熟悉的值。

4、Value：包含这个属性的数据值。

要修改属性默认的特性，必须使用ECMAScript5的Object.defineProperty()方法

~~~javascript
var person = {}
Object.defineProperty(person, "name", {
  writable: false,
  value:'haha'
})
console.log(person.name)//haha
~~~

#### 访问器属性

访问器属性不包含数据值；它们包含一对儿getter和setter函数

1、Configurable:表示能否通过delete删除属性从而定义属性，能否修改属性的特性，或者能否吧属性修改为访问器属性。

2、Enumerable：表示能否通过for-in循环返回属性。

3、Get：在读取属性时调用的函数，默认值为undefined。

4、Set：在写入属性时调用的函数，默认值为undefined。

访问器属性不能直接定义，必须使用Object.definedProperty()来定义。

~~~javascript
var person = {}
Object.defineProperty(person, 'age', {
  get() {
    return this.age
  },
  set(val) {
    this.name='haha' //不能再设置this.name的值否则会陷入死循环
   }
})
person.age=10
console.log(person.name)
~~~

### 定义多个属性

Object.defineProperties():一次性给对象定义多个属性，这个方法接受两个参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应。

~~~javascript
var person = {}
Object.defineProperties(person, {
  age: {
    value: 20,
    writable:true
  },
  name: {
    get() {
      return 'zhangsan'
    },
    set(val) {
      this.age = 30
    }
  }
})
person.name='wangwu'
console.log(person.name,person.age)//zhangsan 30
~~~

### 读取属性的特性

Object.getOwnPropertyDescriptor():可以取得给定属性的描述符。

~~~javascript
var person = {age:13}
console.log(Object.getOwnPropertyDescriptor(person,"age"))
//{ value: 13, writable: true, enumerable: true, configurable: true }
~~~

## 创建对象

### 工厂模式

~~~javascript
function createPerson(name,age,job) {
  var O = new Object()
  O.name = name
  O.age = age
  O.job = job
  O.sayName = function () {
    console.log(this.name)
  }
  return O
}
var person = createPerson('haha', 29, 'engineer')
console.log(person)
//{ name: 'haha', age: 29, job: 'engineer', sayName: [Function] }
~~~

### 构造函数模式

~~~javascript
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
}
 var person=new Person('haha',29,'engineer')
console.log(person)
//Person { name: 'haha', age: 29, job: 'engineer', sayName: [Function] }
~~~

按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头，要创建构造函数的新实例，必须使用new操作符。以这种方式调用构造函数实际上会经历以下4个步骤：

（1）、创建一个新对象

（2）、将构造函数的作用域赋给新对象（因此this就指向了这个新对象）

（3）、执行构造函数中的代码（为这个新对象添加属性）

（4）、返回新对象

1、将构造函数当作函数

构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不存在定义构造函数的特殊语法，只要通过new操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过new操作符来调用，那它跟普通函数也不会有什么两样。

~~~javascript
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
 }
//当作构造函数使用
var person = new Person('haha', 29, "engineer")
person.sayName()//haha
//当作普通函数调用
Person('haha', 29, "engineer")
window.sayName()//haha
//在另一个对象的作用域中调用
var o = new Object()
Person.call(o, "wuwu", 25, 'engineer')
o.sayName()//wuwu
~~~

### 原型模式

每一个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。

~~~javascript
function Person() {
 }
Person.prototype.name = 'haha'
Person.prototype.age = 29
Person.prototype.job = 'engineer'
Person.prototype.sayName = function () {
  console.log(this.name)
}
var person1 = new Person()
person1.sayName()//haha
var person2 = new Person()
person2.sayName()//haha
console.log(person1.sayName===person2.sa1yName)//true
~~~

1、理解原型对象

只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个prototype属性指向该函数的原型对象。在默认情况下，所有原型对象都会自动获得一个constructor属性，这个属性指向该函数。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（__proto__），指向构造函数的原型对象。

**总结：**

Person是构造函数，person是Person的实例。Person.prototype是一个对象，默认会有一个constructor的属性，Person.prototype.constructor指向Person。`person.__proto`__指向Person.prototype。

`Person.prototype.constructor===Person`

`person.__proto__===Person.prototype`

**多个实例对象共享原型所保存的属性和方法的基本原理：**

每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。搜索首先从实例对象实例本身开始。如果在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象，在原型对象对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回该属性的值。也就是说，在我们调用person1.sayName()的时候，会先后执行两次搜索。首先，解析器会问："实例person1有sayName属性吗？"答："没有。"然后，它继续搜索，再问："person的原型有sayName属性吗？"答："有"。于是，它就读取那个保存在原型对象中的函数。当我们调用person2.sayName（）时，将会重现相同的搜索过程，得到相同的结果。

~~~javascript
ECMAScript5的Object.getOwnPropertyDescriptor()方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用Object.getOwnPropertyDescriptor()方法。
~~~

2、原型与in操作符

2.1、in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在与实际中还是原型中。返回值为true或false

~~~javascript
console.log("name" in person1)//true
console.log("hhh" in person1)//false
~~~

例如:确定该属性到底是存在于对象中，还是存在于原型中,存在于原型中返回true，存在于对象中返回false

~~~javascript
function hasPrototypeProperty(object, name) {
  return !Object.hasPrototypeProperty(name) && (name in object)
}
~~~

2.2、在使用for-in循环时，返回的是所有能够通过对象访问的、可枚举的属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。Object.keys()和Object.getOwnPropertyNames()都可以用来代替for-in循环。

`Object.keys():取的对象上所有可枚举的实例属性。`

`Object.getOwnPropertyNames():取的对象的所有属性，无论它是否可枚举。`

## 继承

### 原型链

~~~javascript
function SuperType() {
  this.property=true
}
SuperType.prototype.getSuperValue = function () {
  return  this.property
}
function SubType() {
  this.subproperty=false
}
//继承了SuperType
SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function () {
  return this.subproperty
}
var instance = new SubType()
console.log(instance.getSuperValue())//true
~~~

在上面的代码中，没有使用SubType默认提供的原型，而是给它换了一个新原型；这个新原型就是SuperType的实例。于是，新原型不仅具有作为一个SuperType的实例所拥有的全部属性和方法，而且其内部还有一个指针，指向了SuperType的原型。最终结果就是这样的：instance指向SubType的原型，SubType的原型又指向SuperType的原型。getSuperValue()方法仍然还在SuperType.prototype中，但property则位于SubType.prototype中。这是因为property是一个实例属性，而getSuperValue()则是一个原型方法。既然SubType.prototype现在是SuperType的实例，那么property当然就位于该实例中了。此外，要注意instance.construcor现在指向的是SuperType，这是因为原来SubType.prototype中的constructor被重写了的缘故。

当以读取模式访问一个实例属性时，首先会在实例中搜索该属性。如果没有找到该属性，则会继续搜索实例的原型。在通过原型链实现继承的情况下，搜索过程就得以沿着原型链继续向上。就拿上面的例子来说，调用instance.getSuperValue()会经历三个搜索步骤：1)搜索实例；2）搜索SubType.prototype; 3)搜索SuperType.prototype,最后一步才会找到该方法。在找不到属性或方法的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。

1、别忘记默认的原型

所有引用类型默认都继承了Object，而这个继承也是通过原型链实现的。所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object.prototype。这也是所有自定义类型都会继承toString()、valueOf()等默认方法的根本原因。

2、确定原型和实例的关系

可以通过两种方式来确定原型和实例之间的关系。

1）instanceof操作符，只要用这个操作符来测试实例与原型链中出现过的构造函数，结果就会返回true。

2）isPrototypeOf()方法。同样，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此isPrototypeOf()方法也会返回true。

~~~javascript
Object.prototype.isPrototypeOf(instance) //true
~~~

3、谨慎地定义方法

子类型有时候需要覆盖超类型中的某个方法，或者需要添加超类型中不存在的某个方法。但不管怎样，给原型添加方法的代码一定要放在替换原型的语句之后。

4、原型链的问题

第一个问题：引用类型的原型，所有的实例共享原型，改变一个实例的原型会影响其他实例的原型。第二个问题：在创建子类型的实例时，不能向超类型的构造函数中传递参数。

### 借用构造函数

**借用构造函数：**基本思想是在子类型构造函数的内部调用超类型构造函数。

~~~javascript
function SuperType() {
  this.colors=["red","blue","green"]
}
function SubType() {
  SuperType.call(this)
}
var instance1 = new SubType()
instance1.colors.push("black")
console.log(instance1.colors)//[ 'red', 'blue', 'green', 'black' ]
var instance2 = new SubType()
console.log(instance2.colors)//[ 'red', 'blue', 'green' ]
~~~

相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中向超类型构造函数传递参数。如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在点的问题——方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。考虑到这些问题，借用构造函数的技术也是很少单独使用的。

### 组合继承

**组合继承：**有时候也叫做伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。

~~~javascript
function SuperType(name) {
  this.name=name
  this.colors=["red","blue","green"]
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}
function SubType(name, age) {
  SuperType.call(this, name)
  this.age=age
}
//继承方法
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
  console.log(this.age)
}
var instance1 = new SubType("Nicholsa", 29)
instance1.colors.push("black")
console.log(instance1.colors)//[ 'red', 'blue', 'green', 'black' ]
instance1.sayName()//Nicholsa
var instance2 = new SubType("Greg", 27)
console.log(instance2.colors)//[ 'red', 'blue', 'green' ]
instance2.sayName()//Greg
instance2.sayAge()//27
~~~

# 第七章：函数表达式

常见函数的两种方式：

第一种：函数声明，它的一个重要特征就是**函数声明提升**，意思是在执行代码之前会先读取函数声明。

~~~javascript
sayHi()//不会抛错，因为在代码执行之前会先读取函数声明
function sayHi(){
    console.log('hi'
}
~~~

第二种：函数表达式，函数表达式与其他表达式一样，在使用前必须先赋值。

~~~javascript
sayHi()//错误：函数还不存在
var sayHi=function(){
    console.log('hi')
}
~~~

## 递归

递归函数是在一个函数通过名字调用自身的情况下构成的，如下所示。这是一个经典的递归阶乘函数。

~~~javascript
function factorial(num) {
  if (num <= 1) {
    return 1
  }
  return num*factorial(num-1)
}
~~~

## 闭包

**闭包**是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数。如下所示。

~~~javascript
function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    //突出的两行代码开始
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]
    //突出的两行代码结束
    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else { 
      return 0
    }
  }
}
~~~

在这个例子中，突出的那两行代码是内部函数（一个匿名函数）中的代码，这两行代码访问了外部函数中的变量propertyName。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可以访问变量propertyName。之所以还能访问这个变量，是因为内部函数的作用域链中包含createComparisonFunction()的作用域。

~~~javascript
var compare = createComparisonFunction("name")
var result = compare({name:'Nicholas'}, {name:'Greg'})
~~~

在匿名函数从createComparisonFunction（）中被返回后，它的作用域链被初始化为包含createComparisonFunction（）函数的活动对象和全局变量对象。这样，匿名函数就可以访问在createComparisonFunction（）中定义的所有变量。更为重要的是，createComparisonFunction（）函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。换句话说，当createComparisonFunction（）函数返回后，其执行环境的作用域会被销毁，但它的活动对象仍然会留在内存中；直到匿名函数被销毁后，createComparisonFunction（）的活动对象才会被销毁。

~~~javascript
//创建函数
var compareNames = createComparisonFunction("name")
//调用函数
var result = compareNames({ name: 'Nicholas' }, { name: 'Greg' })
//解除对匿名函数的引用（以便释放内存）
compareNames=null
~~~

首先，创建的比较函数被保存在变量compareNames中。而通过将compareNames设置为等于null解除该函数的引用，就等于通知垃圾回收例程将其清除。随着匿名函数的作用域链被销毁，其他作用域（除了全局作用域）也都可以安全地销毁了。

### 闭包与变量

作用域链的这种配置机制引出了一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最后一个值。别忘了闭包所保存的是整个变量对象，而不是某个特殊的变量。下面的这个例子可以清晰地说明这个问题。

~~~javascript
function createFunctions() {
  var result = new Array()
  for (var i = 0; i < 10; i++) {
    result[i] = function () {
      return i
    }
  }
  return result
}
~~~

**问题分析：**表面上看，似乎每个函数都应该返自己的索引值，但实际上每个函数都返回10。因为每个函数的作用域链中都保存着createFunctions()函数的活动对象，所以它们引用的都是同一个变量i。当createFunctions（）函数返回后，变量i的值是10，此时每一个函数都引用着保存变量i的同一个变量对象，所以在每个函数内部i的值都是10。但是，我们可以通过创建另一个匿名函数强制让闭包的行为符合预期，如下所示。

~~~javascript
function createFunctions() {
  var result = new Array()
  for (var i = 0; i < 10; i++) {
    result[i] = function (num) {
      return function () {
        return num
      }
    }(i)
  }
  return result
}
~~~

### 关于this对象

this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window，而当函数被作为某个对象的方法调用时，this等于那个对象。不过，匿名函数的执行环境具有全局性，因此其this对象通常指向window。

### 内存泄漏

由于IE9之前的版本对JScript对象和COM对象使用不同的垃圾收集例程，因此闭包在IE的这些版本中会导致一些特殊的问题。具体来说，如果闭包的作用域链中保存着一个HTML元素，那么就意味着该元素无法被销毁。来看下面的例子。

~~~javascript
function assignHandler() {
  var elment = document.getElementById("someElement")
  elment.onclick = function () {
    console.log(elment.id)
  }
}
~~~

由于匿名函数保存了一个对assignHandler()的活动对象的引用，因此就会导致无法减少elment的引用数。只要匿名函数存在，elment的引用数至少也是1，因此它所占用的内存就永远不会被回收。不过，这个问题可以通过稍微改写一下代码来解决，如下所示。

~~~javascript
function assignHandler() {
  var elment = document.getElementById("someElement")
  var id=elment.id
  elment.onclick = function () {
    console.log(id)
  }
  elment=null
}
~~~

## 模仿块级作用域

JavaScript没有块级作用域的概念。这意味着在块语句中定义的变量，实际上实在包含函数中而非语句中创建的，模仿块级作用域的方式是给它加一对圆括号。

## 私有变量

任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。私有变量包括函数的参数、局部变量和在函数内部定义的其他函数。我们把有权访问私有变量和私有函数的公有方法称为**特权方法**。在构造函数中定义特权方法也有一个缺点，那就是你必须使用构造函数模式来达到这个目的。构造函数模式的缺点是针对每个实例都会创建同样一组新方法，而使用静态私有变量来实现特权方法就可以避免这个问题。

# 第八章：BOM

## window对象

BOM的核心对象是window，它表示浏览器的一个实例。在浏览器中，window对象有双重角色，它既是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。这意味着在网页中定义的任何一个对象、变量和函数，都以window作为其Global对象，因此有权访问parseInt()等方法。

### 全局作用域

所有在全局作用域中申明的变量、函数都会变成window对象的属性和方法。使用var语句添加的window属性有一个名为[[Configrable]]的特性，这个特性的值被设置为false，因此这样定义的属性不可以通过delete操作符删除。

### 导航和打开窗口

window.open()：既可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。

~~~javascript
window.open("http://www.wrox.com/")
//等同于
<a href="http://www.wrox.com/"></a>
~~~

## location对象

location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象是很特别的一个对象，因为它既是window对象的属性，也是document对象的属性；换句话说，window.location和document.location引用的是同一个对象。location对象的用处不只表现在它保存着当前文档的信息，还表现在它将URL解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。

| 属性名   | 例子                  | 说明                                                         |
| -------- | --------------------- | ------------------------------------------------------------ |
| hash     | "#contents"           | 返回URL中的hash(#号后跟零或多个字符)，如果URL中不包含散列，则返回空字符串 |
| host     | "www.wrox.com:80"     | 返回服务器名称和端口号（如果有）                             |
| hostname | "www.wrox.com"        | 返回不带端口号的服务器名称                                   |
| href     | "http://www.wrox.com" | 返回当前加载页面的完整URL。而location对象的toString()方法也返回这个值 |
| pathname | "/WileyCDA"           | 返回URL中的目录和（或）文件名                                |
| port     | "8080"                | 返回URL中指定的端口号。如果URL中不包含端口号，则这个属性返回空字符串 |
| protocol | "http:"               | 返回页面使用的协议。通常是http：或https：                    |
| search   | "?q=javascript"       | 返回URL的查询字符串。这个字符串以问号开头1、                 |

1、立即打开新的URL并在浏览器的历史记录中生成一条记录。

~~~
location.assign("http://www.wrox.com")
//等同于
window.location="http://www.wrox.com"
//等同于
location.href="http://www.wrox.com" //最常用
~~~

2、修改location对象的其他属性也可以改变当前加载的页面。如：search、hostname、pathname和port属性。当通过这种方式修改URL之后，浏览器的历史记录中就会生成一条新记录，因此用户通过单击"后退"按钮都会导航到前一个页面。要禁止这种行为，可以使用replace()方法。这个方法只接受一个参数，即要导航到的URL；结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记录。在调用replace()方法之后，用户不能回到前一个页面。

3、重新加载当前显示的页面

~~~javascript
location.reload()        //重新加载（有可能从缓存中加载）
location.reload(true)    //重新加载（从服务器重新加载）
~~~

位于reload()调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素。为此，最好将reload()放在代码的最后一行。

## navigator对象

navigator对象：浏览器中的属性和方法

### 检测插件

~~~javascript
//检测插件（在IE中无效）
function hasPlugin(name) {
  name = name.toLowerCase()
  for (var i = 0; i < navigator.plugins.length; i++) {
    if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
      return true
    }
  }
  return false
}
console.log(hasPlugin("Native Client"))
~~~

~~~javascript
//检测IE中的插件
function hasIEPlugin(name) {
  try {
    new ActiveXObject(name)
    return true
  } catch (ex) {
    return false
  }
}
//检测Flash，Flash的标识符COM标识符是ShockwaveFlash.ShockwaveFlash
console.log(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"))
~~~

~~~javascript
//检测所有浏览器中的Flash插件
function hasFlash() {
  var result = hasPlugin("Flash")
  if (!result) {
    result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash")
  }
  return result
}
~~~

**注意：**plugins集合有一个名叫refresh()的方法，用于刷新plugins以及反映最新安装的插件。这个方法接收一个参数：表示是否应该重新加载页面的一个布尔值。如果将这个值设为true，则会重新加载包含插件的所有页面；否则，只更新plugins集合，不重新加载页面。

## screen对象

screen.width：屏幕的宽度

screen.height：屏幕的高度

window.resizeTo(screen.availWidth,screen.availHeight):使其占用屏幕的可用空间

## history对象

history.go(-1):后退1页

history.go(1):前进1页

history.back():后退1页

history.forward():前进1页

history.length===0:检测当前页面是不是用户历史记录中的第一个页面

# 第十章：DOM

## 节点层次

### Node类型

1、操作节点

appendChild(newNode):用于向childNodes列表的末尾添加一个节点。返回新增的节点

insertBefore(newNode,null/someNode.firstChild):用于插入节点

replaceChild(newNode,oldNode):用于替换节点

removeChild(someNode.firstChild):用于移除节点

2、其他方法

cloneNode(Boolean):克隆节点，接受一个布尔值参数，表示是否执行深复制。 

### Document类型

JavaScript通过Document类型表示文档。在浏览器中，document对象是HTMLDocument（继承自Document类型）的一个实例，表示整个HTML页面。而且，document对象是window对象的一个属性，因此可以将其作为全局对象来访问。

1、文档的子节点

document.documentElement：该属性始终指向HTML页面中的<html>元素。

document.childNodes[0]:指向<html>元素。

document.firstChild:指向<html>元素。

document.body:指向<body>元素

2、文档信息

document.title:文档标题

3、查找元素

document.getElmentById("one")   

document.getElmentByTagName("img") //NodeList

4、文档写入

document.write("<strong>"+(new *Date*().toString())+"</strong>")：会原样写入

document.writeln():则会在字符串的末尾加一个换行符（\n）

document.write("<script type=\"text/javascript\" src=\"file.js\"><\/script>"):动态地包含外部资源

### Element类型

nodeName/tagName:访问元素的标签名

1、HTML元素

每个HTML元素中都存在下列标准特性

id：元素在文档中的唯一标识符。

title：有关元素的附加说明信息，一般通过工具提示条显示出来。

lang：元素内容的语言代码，很少使用。

dir：语言的方向，值为（ltr/rtl）。

className：即为元素指定的CSS类。

2、取得特性

getAttribute("id")：取得特性

注意：根据HTML5规范，自定义特性应该加上data-前缀以便验证；style和onclick通过属性名访问，和通过getAttribute()访问时，返回的值不一样，所以开发人员不经常使用getAttribute()。

3、设置特性

setAttribute()：这个方法接受两个参数：要设置的特性名和值。如果特性已经存在，setAttribute()会以指定的值替换现有的值；如果特性不存在，setAttribute()则创建该属性并设置相应的值。

removeAttribute():彻底删除元素的特性。

4、创建元素

document.createElment("div"):创建元素。

document.createElement("<div class=\"box\"></div>")

# 第十一章：DOM扩展

## 选择符API

### querySelector()方法

querySelector()方法接受一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回null。

~~~javascript
document.body.querySelector("img.button") //取得类为"button"的第一个图像元素
~~~

### querySelectorAll()方法

querySelectorAll()方法接受的参数与querySelector()方法一样，都是一个css选择器，但返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个NodeList的实例。

### matchesSelector()方法

matchesSelector()。这个方法接受一个参数，即CSS选择符，如果调用元素与该选择符匹配，返回true；否则返回false。

## 元素遍历

childElementCount:返回子元素（不包括文本节点和注释）的个数。

firstElementChild：指向第一个子元素；firstChild的元素版。

lastElementChild：指向最后一个子元素；lastChild的元素版。

previousElementSibling:指向前一个同辈元素；previousSibling的元素版。

nextElementSibling:指向后一个同辈元素；nextSibling的元素版。

## HTML5

### 与类相关的扩充 

1、getElementsByClassName()方法

2、classList属性

div.classList.add(value):将给定的字符串添加到列表中。如果值已经存在，就不添加了。

div.classList.contains(value):表示列表中是否存在给定的值，如果存在则返回true，否则返回false。

div.classList.remove(value):从列表中删除给定的字符串。

div.classList.toggle(value):如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。

### 焦点管理

document.activeElment:这个属性始终会引用DOM中当前获得了焦点的元素。

默认情况下，文档刚刚加载完成时，document.activeElment中保存的是document.body元素的引用。文档加载期间，document.activeElement的值为null。另外就是新增了document.hasFocus()方法，这个方法用于确定文档是否获得了焦点。

### HTMLDocument的变化

1、readyState属性

Document的readyState属性有两个可能的值：

1.1、loading:正在加载文档；

1.2、complete：已经加载完文档。

~~~javascript
if(document.readyState=='complete'){
    //执行操作
}
~~~

2、head属性

document.head || document.getElementsByTagName("head")[0]:获取引用文档的<head>元素。

### 字符集属性

charset属性表示文档中实际使用的字符集，也可以用来指定新字符集。

~~~javascript
console.log(document.charset) //"UTF-16"
document.charset="UTF-8"
~~~

defaultCharset属性，表示根据浏览器及操作系统的设置，当前文档默认的字符集应该是什么。

### 自定义数据属性

HTML5规定可以为元素添加非标准的属性，但要添加前缀data-,目的是为元素提供与渲染无关的信息，或者提供语义信息。这些属性可以任意添加、随便命名，只要以data-开头即可。添加了自定义属性之后，可以通过元素的dataset属性访问自定义属性的值。

~~~javascript
 <div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
//获取元素
var div=document.getElementById("myDiv")
//获得自定义属性的值
var appId=div.dataset.appId
//设置值
div.dataset.appId=456
~~~

### 插入标记

1、innerHTML属性

在读模式下，innerHTML属性返回与调用元素的所有子节点（包括元素、注释和文本节点）对应的HTML标记。在写模式下，innerHTML会根据指定的值创建新的DOM树，然后用这个DOM数完全替换调用元素原先的所有子节点。

2、outerHTML属性

在读模式下，outerHTML返回调用它的元素及所有子节点的HTML标签。在写模式下，outerHTML会根据指定的HTML字符串创建新的DOM子树，然后用这个DOM子数完全替换调用元素。

3、insertAdjacentHTML()方法

插入标记的最后一个新增方式是insertAdjacentHTML()方法。

~~~javascript
//作为前一个同辈元素插入
element.insertAdjacentHTML("beforebegin","<p>hello world</p>")
//作为第一个子元素插入
element.insertAdjacentHTML("afterbegin","<p>hello world</p>")
//作为最后一个子元素插入
element.insertAdjacentHTML("beforeend","<p>hello world</p>")
//作为后一个同辈元素插入
element.insertAdjacentHTML("afterend","<p>hello world</p>")
~~~

### scrollIntoView()方法

scrollIntoView()可以在所有HTML元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。如果给这个方法传入true作为参数，或者不传入任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。如果传入false作为参数，调用元素会尽可能全部出现在视口中，（可能的话，调用元素的底部会与视口平齐。）不过不一定平齐。

~~~javascript
//让表单元素可见
document.forms[0].scrollIntoView()
~~~

## 专有扩展

### contains()方法

contains()方法用来判断某个节点是不是另外一个节点的后代。调用contains()方法的应该是祖先节点，也就是搜索开始的节点，这个方法接受一个参数，即要检测的后代节点。如果被检测的节点是后代节点，该方法返回true，否则返回false。

~~~javascript
document.documentElement.contains(document.body)
~~~

# 第十二章 DOM2和DOM3

## 样式

### DOM样式属性和方法

"DOM2级样式"规范还为style对象定义了一些属性和方法。

- cssText:通过它能够访问到style特性中的css代码。


- length:应用给元素的CSS属性的数量。


- parentRule:表示CSS信息的CSSRule对象。


- getPropertyCSSValue(propertyName):返回包含给定属性值的CSSValue对象。


- getPropertyPriority(propertyName):如果给定的属性使用了!important设置，则返回“!important”;否则返回空字符串。


- getPropertyValue(propertyName):返回给定属性的字符串值。


- item(index):返回给定位置的CSS属性的名称。


- removeProperty(propertyName):从样式中删除给定属性。


- setProperty(propertyName,value,priority):将给定属性设置为相应的值，并加上优先权标志（"important"或者一个空字符串）

### 元素大小

1、偏移量

偏移量：包括元素在屏幕上占用的所有可见的空间。元素的可见大小由其高度、宽度决定，包含所有内边距、滚动条和边框大小。

- offsetHeight：元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、（可见的）水平滚动条的高度、上边框高度和下边框高度。

- offsetWidth：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂直滚动条的宽度、左边框宽度和右边框宽度。

- offsetLeft：元素的左外边框至包含元素的左内边框之间的像素距离(等价于getElementLeft())。

- offsetTop：元素的上外边框至包含元素的上内边框之间的像素距离(等价于getElementTop())。

其中，offsetLeft和offsetTop属性与包含元素有关，包含元素的引用保存在offsetParent属性中，offsetParent属性不一定与parentNode的值相等。（例如：table和td）

**获取某个元素在页面的偏移量**

~~~javascript
function getElmentLeft(elment) {
  var actualLeft = elment.offsetLeft
  var current = elment.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current=current.offsetParent
  }
  return actualLeft
}

function getElmentTop(elment) {
  var actualTop = elment.offsetTop
  var current = elment.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current=current.offsetParent
  }
  return actualTop
}
~~~

2、客户区大小

客户区大小：指的是元素内容及其内边距所占据的空间大小。有关客户区大小的属性有两个。

clientWidth：元素内容区宽度加上左右内边距宽度。

clientHeight：元素内容区高度加上上下内边距高度。

**获取浏览器视口大小**

~~~javascript
document.boby.clientWidth
document.boby.clientHeight
document.documentElement.clientWidth
document.documentElement.clientHeight
~~~

3、滚动大小

滚动大小：指的是包含滚动内容的元素大小。

scrollHeight：在没有滚动条的情况下，元素内容的总高度。

scrollWidth：在没有滚动条的情况下，元素内容的总宽度。

scroollLeft：被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。

scrollTop：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。

**重置元素的滚动位置**

~~~javascript
function scrollToTop(element) {
  if (element.scrollTop !== 0) {
    element.scrollTop=0
  }
}
~~~

4、确定元素大小

el.getBoundingClientRect()：元素相对于视口位置。包含四个属性:left、top、right、bottom 

# 第十三章 事件

## 事件流

### 时间冒泡

由内向外，沿DOM树向上传播，在每一级节点都会发生，直至传播到document对象。

### 时间捕获

在事件捕获过程中，document对象首先接收到click事件，然后事件沿DOM树依次向下，一直传播到事件的实际目标。

### DOM事件流

'DOM2级事件'规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和时间冒泡阶段。

## 事件处理程序

### DOM2 级事件处理程序

 “DOM2级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()。所有DOM节点中都包含这两个方法，并且它们都接受3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序。

~~~javascript
var btn = document.getElementById('myBtn')
let handler=function () {
  alert(this.id)
}
btn.addEventListener('click', handler, false)
btn.removeEventListener('click', handler,false)
~~~

### IE事件处理程序

IE实现了与DOM中类似的两个方法：attachEvent()和detachEvent()。这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。由于IE8及更早版本只支持时间冒泡，所以通过attachEvent()添加的事件处理程序都会被添加到冒泡阶段。

~~~javascript
var btn = document.getElementById('myBtn')
let handler=function () {
  alert(this.id)
}
btn.attachEvent('onclick', handler, false)
btn.detachEvent('onclick', handler,false)
~~~

## 事件对象

### DOM中的事件对象

event对象

| 属性/方法                  | 类型         | 读/写 | 说明                                                         |
| -------------------------- | ------------ | ----- | ------------------------------------------------------------ |
| bubbles                    | Boolean      | 只读  | 表明事件是否冒泡                                             |
| cancelable                 | Boolean      | 只读  | 表明是否可以取消事件的默认行为                               |
| currentTarget              | Element      | 只读  | 其事件处理程序当前正在处理事件的那个元素                     |
| defaultPrevented           | Boolean      | 只读  | 为true表示已经调用了preventDefault()                         |
| detail                     | Integer      | 只读  | 与事件相关的细节信息                                         |
| eventPhase                 | Integer      | 只读  | 调用事件处理程序的阶段；1表示捕获阶段，2表示“处入目标”，3表示冒泡阶段 |
| preventDefault()           | Function     | 只读  | 取消事件的默认行为。如果cancelable是true，则可以使用这个方法 |
| stopImmediatePropagation() | Function     | 只读  | 取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用   |
| stopPropagation()          | Function     | 只读  | 取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法 |
| target                     | Element      | 只读  | 事件的目标                                                   |
| trusted                    | Boolean      | 只读  | 为true表示事件是浏览器生成的。为false表示事件是由开发人员通过JavaScript创建的 |
| type                       | String       | 只读  | 被触发事件的类型                                             |
| view                       | AbstractView | 只读  | 与事件有关的抽象视图。等同于发生事件的window对象             |

### IE中的事件对象								

| 属性/方法    | 类型    | 读/写 | 说明                                                         |
| ------------ | ------- | ----- | ------------------------------------------------------------ |
| cancelBubble | Boolean | 读/写 | 默认值为false，但将其设置为true就可以取消事件冒泡（与DOM中的stopPropagation()方法的作用相同） |
| returnValue  | Boolean | 读/写 | 默认值为true，但将其设置为false就可以取消事件的默认行为（与DOM中的preventDefault()方法的作用相同） |
| srcElement   | Element | 只读  | 事件的目标（与DOM中的target属性相同）                        |
| type         | String  | 只读  | 被触发的事件的类型                                           |

## 事件类型

### UI事件

load：当页面完全加载后在window上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在<img>元素上面触发，或者当嵌入的内容加载完毕时在<object>元素上面触发。

unload：当页面完全卸载后在window上面触发，当所有框架都卸载后在框架集上面触发，或者当嵌入的内容卸载完毕后在<object>元素上面触发。

abort：在用户停止下载过程中，如果嵌入的内容没有加载完，则在<object>元素上面触发。

error：当发生JavaScript错误时在window上面触发，当无法加载图像时在<img>元素上面触发，当无法加载嵌入内容时在<object>元素上面触发，或者当有一或多个框架无法加载时在框架集上面触发。

select：当用户选择文本框（<input>或<texterea>中的一或多个字符时触发。

resize：当用户滚动带滚动条的元素中的内容时，在该元素上面触发。<body>元素中包含所加载页面的滚动条。

### 焦点事件

blur:在元素失去焦点时触发。这个事件不会冒泡；所有浏览器都支持它。

DOMFocusIn：在元素获得焦点时触发。这个事件与HTML事件focus等价，但它冒泡。只有Opera支持这个事件。DOM3级事件废弃了DOMFocusIn，选择了focusin。

DOMFocusOut：在元素失去焦点时触发。这个事件是HTML事件blur的通用版本。只有Opera支持这个事件。DOM3级事件废弃了DOMFocusOut，选择了focusout。

focus：在元素获得焦点时触发。这个事件不会冒泡；所有浏览器都支持它。

focusin：在元素获得焦点时触发。

focusout：在元素失去焦点时触发。

### 鼠标与滚轮事件

click：在用户单击鼠标按钮（一般是左边的按钮）或者按下回车键时触发。

dblclick：在用户双击主鼠标按钮（一般是左边的按钮）时触发。

mousedown：在用户按下了任意鼠标按钮时触发。

mouseenter：在鼠标光标从元素外部首次移动到元素范围之内时触发。

mouseleave：在位于元素上方的鼠标移动到元素范围之外时触发。

mousemove：当鼠标指针在元素内部 移动时重复地触发。

mouseout：在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。

mouseover：在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。

mouseup：在用户释放鼠标按钮时触发。

1、客户区坐标位置：clientX、clientY

2、页面坐标位置：pageX、pageY

3、屏幕坐标位置：scrennX、screenY

4、鼠标滚轮事件：mousewheel

### 键盘与文本事件

keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。

keypreess：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。

keyup：当用户释放键盘上的键时触发。

1、键码：keyCode

2、字符编码：在取得了字符编码之后，就可以使用String.fromCharCode()将其转换成实际的字符。

### 触摸与手势变化

1、触摸事件

touchstart:当手指触摸屏幕时触发。

touchmove：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()可以阻止滚动。

touchend：当手指从屏幕上移开时触发。

touchancel：当系统停止跟踪触摸时触发。

除了常见的DOM属性外，触摸事件还包含下列三个用于跟踪触摸的属性。

touches：表示当前跟踪的触摸操作的Touch对象的数组。

targetTouches：特定于事件目标的Touch对象的数组。

changeTouches：表示自上次触摸以来发生了什么改变的Touch对象的数组。

每个Touch对象包含下列属性。

clientX：触摸目标在视口中的x坐标。

clentY：触摸目标在视口中的y坐标。

identitifer：标识触摸的唯一ID。

pageX：触摸目标在页面中的x坐标。

pageY：触摸目标在页面中的y坐标。

screenX：触摸目标在屏幕中的x坐标。

screenY：触摸目标在屏幕中的y坐标。

target：触摸的DOM节点目标。

2、手势事件

gesturestart：当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。

gesturechange：当触摸屏幕的任何一个手指的位置发生变化时触发。

gestureend：当任何一个手指从屏幕上面移开时触发。

## 内存和性能

### 事件委托

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。也就是把子组件要做的事情交给父组件。

~~~javascript
var list = document.getElementById("myLinks")
EventUtil.addHandler(list, "click", function (event) {
  event = EventUtil.getEvent(event)
  var target = EventUtil.getTarget(event)
  switch (target.id) {
    case "doSomething":
      document.title = "I changed the document's title";
      break;
    case "goSomewhere":
      location.href = "http://www.wrox.com";
      break;
    case "sayHi":
      alert("hi");
      break
  }
 })
~~~

### 移除事件处理程序

当按钮被从页面中移除时，它还带着一个事件处理程序。有的浏览器（尤其是IE）在这种情况下不会做出恰当地处理，它们很有可能会将对元素和对事件处理程序的引用都保存在内存中。

~~~javascript
btn.onclick=null
~~~

# 第十四章 表单脚本

## 表单的基础知识

### 提交表单

1、使用<input>或<button>来定义提交按钮，以这种方式提交表单时，浏览器会在将请求发送给服务器之前触发submit事件

~~~javascript
  <!-- 通过提交按钮 -->
  <input type="submit" value="submit From"></input>
  <!-- 自定义提交按钮 -->
  <button type="submit">Submit Form</button>
  <!-- 图像按钮 -->
  <input type="image" src="grap.gif">
~~~

2、调用submit()方法提交表单

~~~javascript
from.submit()
~~~

### 重置表单

1、使用type特性值为"reset"的<input>或<button>都可以创建重置按钮。

~~~javascript
<!-- 通用重置按钮 -->
<input type="reset" value="reset Form">
<!-- 自定义重置按钮 -->
<button type="reset">Reset Form</button>
~~~

2、重置表单

~~~javascript
form.reset()
~~~

### 表单字段

1、共有的表单字段属性

disabled：布尔值，表示当前字段是否被禁用。

form：指向当前字段所属表单的指针；只读。

name：当前字段的名称。

readOnly：布尔值，表示当前字段是否只读。

tabIndex：表示当前字段的切换（tab）序号。

type：当前字段的类型，如"checkbox"、"radio"，等等。

value：当前字段将被提交给服务器的值。对文件字段来说，这个属性是只读的，包含着文件在计算机中的路径。2、共有的表单字段方法：focus()和blur()

3、共有的表单字段事件

blur：当前字段失去焦点时触发。

change：对于<input>和<textarea>元素，在它们失去焦点且value值改变时触发；对于<select>元素，在其选项改变时触发。

focus：当前字段获得焦点时触发。

## 文本框脚本

单行文本框：将<input>元素的type特性设置为"text"。而通过设置size特性，可以指定文本框中能够显示的字符数。通过value特性，可以设置文本框的初始值，而maxlength特性则用于指定文本框可以接受的最大字符数。

多行文本框：<textarea>元素则始终会呈现为一个多行文本框。要指定文本框的大小，可以使用rows和cols特性，与<input>元素不同，<textarea>的初始值必须要放在<texrarea>和</textarea>之间。不能指定最大字符数。使用value读取或设置文本框的值。

### 选择脚本

select()：这个方法用于选择文本框中的所有文本。

1、选择事件

2、取得选择的文本

selectionStart和selectionEnd这两个属性中保存的是基于0的数值，表示所选择文本的范围。

3、选择部分文本

setSelectionRange():这个方法接收两个参数，要选择的第一个字符的索引和要选择的最后一个字符之后的索引

### HTML5约束验证API

1、必填字段：required

2、其他输入类型：emial、url

3、数值范围：min、max、setp

4、输入模式：pattern属性，这个属性的值是一个正则表达式，用于匹配文本框中的值

5、检测有效性：checkValidity()可以检测表单中的某个字段是否有效，返回true和false

6、禁用验证：novalidate属性

## 选择框脚本

- add(newOption,relOption):向控件中插入新<option>元素，其位置在相关项（relOption）之前。


- multiple：布尔值，表示是否允许多项选择；等价于HTML中的multiple特性。


- options：控件中所有<option>元素的HTMLCollection


- remove(index)：移除给定位置的选项


- selectedIndex：基于0的选中项的索引，如果没有选中项，则值为-1。对于支持多选的控件，只保持选中项中第一项的索引。


- size：选中框中可见的行数；等价于HTML中的size特性。


# 第十五章 使用Canvas绘图

## 2D上下文

~~~javascript
 <canvas id="drawing" width="200" height="200">A drawing of something.</canvas>

var drawing=document.getElementById('drawing')
if(drawing){//确定浏览器支持<canvas>元素
    var context=drawing.getContext("2d")//取得绘图上下文，传入“2d”，就可以取得2D上下文
    context.strokeStyle="red"//设置描边色为红色
    context.fillStyle="skyblue"//设置填充色为天蓝色
    context.fillRect(10,10,50,50)//矩形的x坐标、y坐标、宽度和高度
    //获取图像的数据URL
    var imgURL=drawing.toDataURL("image/png")
    //显示图像
    var image=document.createElement("img")
    image.src=imgURL
    document.body.appendChild(image)
}
~~~

### 绘制矩形

- fillRect():绘制矩形


- strokeRect():绘制描边矩形


- clearRect():清除画布上的矩形区域


### 绘制路径

- arc(x,y,radius,startAngle,countercolorwise):以(x,y)为圆心绘制一条线，弧线半径为radius，起始和结束角度（用弧度表示）分别为startAngle和endAngle。最后一个参数表示startAngle和endAngle是否按逆时针方向计算，值为false表示按顺时针方向计算。


- arcTo(x1,y1,x2,y2,radius):从上以点开始绘制一条弧线，到(x2,y2)为止，并且以给定的半径radius穿过(x1,y1)。


- bezierCurveTo(c1x,c1y,c2x,c2y,x,y):从上一点开始绘制一条曲线，到（x,y）为止，并且以（c1x,c1y）和（c2x,c2y）为控制点。


- lineTo(x,y):从上一点开始绘制一条直线，到（x,y）为止。


- moveTo(x,y):将绘图游标移动到(x,y)，不画线。


- quadraticCurveTo(cx,cy,x,y):从上一点开始绘制一条二次曲线，到(x,y)为止，并且以（cx，cy）作为控制点。


- rect(x,y,width,height):从点(x,y)开始绘制一个矩形，宽度和高度分别由width和height指定。这个方法绘制的是矩形路径，而不是strokeRect()和fillRect()所绘制的独立的形状。


### 绘制文本

- fillText()：绘制文本


- strokeText()：绘制描边文本


- font：表示文本样式、大小及字体，用CSS中指定字体的格式来指定，例如："10px Arial"。


- textAlign：表示文本对齐方式。


- textBaseline：表示文本的基线。


**绘制路径和绘制文本结合绘制时钟**

~~~javascript
var context=drawing.getContext("2d")//取得绘图上下文，传入“2d”，就可以取得2D上下文
//开始路径
context.beginPath()
//绘制外圆
context.arc(100,100,99,0,2*Math.PI,false)
//绘制内圆
context.moveTo(194,100)
context.arc(100,100,94,0,2*Math.PI,false)
//绘制分针
context.moveTo(100,100)
context.lineTo(100,15)
//绘制时针
context.moveTo(100,100)
context.lineTo(35,100)
//描边路径
context.stroke()
//设置字体
context.font="bold 14px Arial"
//设置水平对齐方式
context.textAlign="center"
//设置垂直对齐方式
context.textBaseline="middle"
//绘制文本
context.fillText("12",100,20)
~~~

### 变换

- rotate(angle)：围绕原点旋转angle弧度。

- scale(scaleX,scaleY)：缩放图像，在x方向乘以scaleX，在y方向乘以scaleY。scaleX和scaleY的默认值都是1.0。

- translate(x,y)：将坐标原点移动到(x,y)。执行这个变换之后，坐标(0,0)会变成之前由(x,y)表示的点。

**变换原点，绘制表针并旋转**

~~~javascript
var context=drawing.getContext("2d")//取得绘图上下文，传入“2d”，就可以取得2D上下文
//开始路径
context.beginPath()
//绘制外圆
context.arc(100,100,99,0,2*Math.PI,false)
//绘制内圆
context.moveTo(194,100)
context.arc(100,100,94,0,2*Math.PI,false)
//变换原点
context.translate(100,100)
//旋转表针
context.rotate(1)
//绘制分针
context.moveTo(0,0)
context.lineTo(0,-85)
//绘制时针
context.moveTo(0,0)
context.lineTo(-65,0)
//描边路径
context.stroke()
~~~

- save()：把更多的设置保存到栈结构中。保存的只是对绘图上下文的设置和变换，不会保存绘图上下文的内容。

- restore()：一级一级返回。

~~~javascript
var context=drawing.getContext("2d")//取得绘图上下文，传入“2d”，就可以取得2D上下文
context.fillStyle="#ff0000"
context.save()
context.fillStyle="#00ff00"
context.translate(100,100)
context.save()
context.fillStyle="#0000ff"
//从点（100,100）开始绘制蓝色矩阵
context.fillRect(0,0,100,200)
context.restore()
//从点（110，110）开始绘制绿色矩阵
context.fillRect(10,10,100,200)
context.restore()
//从点（0，0）开始绘制红色矩阵
context.fillRect(0,0,100,200)
~~~

### 绘制图像

- drawImage()：绘制图像。可传入九个参数：要绘制的图像、源图像的x坐标、源图像的y坐标、源图像的宽度、源图像的高度、目标图像的x坐标、目标图像的y坐标、目标图像的宽度、目标图像的高度。这样调用drawImage()可以获得更多的控制。
- toDataURL()：获得操作的结果。

**把一幅图像绘制到画布上**

~~~javascript
var context=drawing.getContext("2d")//取得绘图上下文，传入“2d”，就可以取得2D上下文
var image=document.images[0] 
//起点为（0,0）绘制到画布上的图像大小与原始大小一样
context.drawImage(image,0,0)
~~~

### 阴影

shadowColor：用CSS颜色格式表示的阴影颜色，默认为黑色。

shadowOffsetX：形状或路径x轴方向的阴影偏移量，默认为0。

shadowOffsetY：形状或路径y轴方向的阴影偏移量，默认为0。

shadowBlur：模糊的像素数，默认0，即不模糊。

~~~javascript
var context=drawing.getContext("2d")//取得绘图上下文，传入“2d”，就可以取得2D上下文
context.shadowOffsetX=5
context.shadowOffsetY=5
context.shadowBlur=4
context.shadowColor="rgba(0,0,0,0.5)"
//绘制红色矩阵
context.fillStyle="#ff0000"
context.fillRect(10,10,50,50)
//绘制蓝色矩阵
context.fillStyle="rgba(0,0,255,1)"
context.fillRect(30,30,50,50)
~~~

### 渐变

createLinearGradient()：创建一个新的新的线性渐变，这个方法接受四个参数：起点的x坐标、起点的y坐标、终点的x坐标、终点的y坐标。

addColorStop()：来指定色标。这个方法接受两个参数：色标位置和CSS颜色值。色标位置是一个0（开始的颜色）到1（结束的颜色）之间的位置。

createRadialGradient()：这个方法接受6个参数，对应两个圆的圆心和半径。

### 模式

createPattern()：重复的图像，用来填充或描边图形。传入两个参数：一个HTML<img>元素和一个表示如何重复图像的字符串。第二个参数的值与CSS的background-repeat属性值相同，包括"repeat"、"repeat-x"、"repeat-y"和"no-repeat"。第一个参数也可以是一个<video>元素，或者另一个<canvas>元素。

~~~javascript
var context=drawing.getContext("2d")//取得绘图上下文，传入“2d”，就可以取得2D上下文
var image=document.images[0]
pattern=context.createPattern(image,"repeat")
context.fillStyle=pattern
context.fillRect(10,10,1050,1050)
~~~

### 使用图像数据

getImageData()：取得原始图像数据。这个方法接受4个参数：要取得其数据的画面区域的x和y坐标以及该区域的像素宽度和高度。

# 第16章 HTML5脚本编辑器

### 历史状态管理

history.pushState({name:"Nicholas"},"Nicholas'page","nicholas.html")：能够在不加载新页面的情况下改变浏览器的URL。该方法接受三个参数：状态对象、新状态的标题和可选的相对URL。执行此方法后，新的状态信息就会被加入历史状态栈，而浏览器地址也会变成新的相对URL。pushState()会创建新的历史状态，按下"后退"按钮，会触发window对象的popstate事件，popstate事件的事件对象有一个state属性，这个属性就包含着当初以第一个参数传递给pushState()的状态对象。

history.replaceState()：更新当前状态，传入的参数与pushState()的前两个参数相同。调用这个方法不会在历史状态栈中创建状态，只会重写当前状态。

# 第17章 错误处理与调试

## 错误处理

### try-catch

~~~javascript
try {
  //可能会导致错误的代码
} catch (err) {
  //在错误发生时怎么处理
}
~~~

1、finally子句

只要代码中包含finally子句，则无论try或catch语句块中包含什么代码—甚至return语句，都不会阻止finally子句的执行。如果提供finally子句，则catch子句就成了可选的（catch和finally有一个即可）

~~~javascript
try {
  //可能会导致错误的代码
} catch (err) {
  //在错误发生时怎么处理
} finally { 
  //最终执行的代码
}
~~~

2、错误类型

Error：Error是基类型，其他错误类型都继承自该类型。这个基类型的主要目的是供开发人员抛出自定义错误。

EvalError：会在使用eval()函数而发生异常时被抛出。

RangeError：会在数值超出相应范围时触发。

ReferenceError：在找不到对象的情况下，会发生这种错误。通常，在访问不存在的变量时，就会发生这种错误。

SyntaxError：把语法错误的JavaScript字符串传入eval()函数时，就会导致此类型错误。

TypeError：在变量中保存着意外的类型时，或者访问不存在的方法时，都会导致这种错误。归根结底还是由于在执行特定于类型的操作时，变量的类型不符合要求所致。

URIError：在使用encodeURI()或decodeURI(),而URI格式不正确时，就会导致URIError错误。

要想知道错误的类型，可以在try-catch语句中使用instanceof操作符

### 抛出错误

throw:用于随时抛出自定义错误，抛出错误时，必须要给throw操作符指定一个值。

~~~javascript
throw new Error("Something bad happened.")
~~~

### 处理错误的策略

通讯错误，对于查询字符串，应该使用encodeURIComponent()方法。

## 调试技术

可以通过console对象向JavaScript控制台中写入消息，这个对象具有下列方法。

error(message)：将错误消息记录到控制台

info(message)：将信息性消息记录到控制台

log(message)：将一般消息记录到控制台

warn(message)：将警告消息记录到控制台

# 第20章 JSON

stringify()：把JavaScript对象序列化为JSON字符串

parse()：把JSON字符串解析为原生JavaScript值

在序列化JavaScript对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。此外，值为undefined的任何属性也都会被跳过。结果中最终都是值为有效JSON数据类型的实例属性。

## 序列化选项

JSON.stringify()除了要序列化的JavaScript对象外，还可以接收另外两个参数，这两个参数用于指定以不同的方式序列化JavaScript对象。第一个参数是个过滤器，可以是一个数组，也可以是函数；第二个参数是一个选项，表示是否在JSON对象串中保留缩进。有时候，JSON.stringify()还是不能满足对某些对象进行自定义序列化的需求。在这些情况下，可以给对象定义toJSON()方法，返回其自身的JSON数据格式。

假设把一个对象传入JSON.stringify(),序列化该对象的顺序如下。

（1）如果存在toJSON()方法而且能通过它取得有效的值，则调用该方法。否则，返回对象本身。

（2）如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第（1）步返回的值。

（3）对第（2）步返回的每个值进行相应的序列化。

（4）如果提供了第三个参数，执行相应的格式化

 # 第21章 Ajax与Comet

## XMLHttpRequest

检测XHR对象的readyState属性，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下。

0：未初始化。尚未调用open()方法。

1：启动。已经调用open()方法，但尚未接收到响应。

2：发送。已经调用send()方法，但尚未接收到响应。

3：接收。已经接收到部分响应数据。

4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

只要readyState属性的值由一个值变成另一个值。通常，我们只对readyState值为4的阶段感兴趣，因为这事所有的数据都已经就绪。不过，必须在调用open()之前指定onreadystatechange事件处理程序才能确保跨浏览器兼容性。

~~~javascript
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
  if (xhr.readyState) {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      alert(xhr.responesText)
    } else {
      alert(xhr.status)
    }
  }
}
xhr.open("get", "example.txt", true)
xhr.send()
~~~

**Web Socket**：目标是在一个单独的持久连接上提供双工双向通讯。

1、**Web Socket API**

要创建Web Sokect，先实例一个WebSokect对象并传入要连接的URL

var sokect=new WebSocket("ws://www.example.com/server.php")

WebSocket也有一个表示当前状态的readyState属性。

0：正在建立连接

1：已经建立连接

2：正在关闭连接

3：已经关闭连接

要关闭Web Sokect连接，可以在任何时候调用close()方法。

2、**发送和接收数据**

sokect.send('hello')

sokect.onmessage=function(event){

 var data=event.data

}

3、**其他事件**

open：在成功建立连接时触发

error：在连接发生错误时触发

close：在连接关闭时触发

sokect.onerror=function(){

alert("Connection error.")

}

# 第22章 高级技巧

## 函数防抖

函数节流背后的基本思想是指，某些代码不可以在没有间断的情况连续执行。第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作就没有任何意义。然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器。目的是只有在执行函数的请求停止了一段事件之后才执行。

~~~javascript
function action() {
  clearTimeout(timeoutId)
  let timeoutId = setTimeout(() => { 
    // 执行的代码 
  },100)
}
~~~

~~~javascript
function throllle(method, context) {
  clearTimeout(method.tId)
  method.tId = setTimeout(() => {
    method.call(context)
  },100)
}
throllle()函数接受两个参数：要执行的函数以及在那个作用域中执行，如果没有给出第二个参数，那么就会在全局作用域内执行该方法。
~~~

# 第25章 新兴的API

## 页面可见性api

1、document.hidden：表示页面是否隐藏的布尔值。

2、document.visibilityState：表示下列4个可能状态值

页面在后台标签页面中或浏览器最小化。

页面在前台标签页中。

实际的页面已经隐藏，但用户可以看到页面的预览。

visibilitychange事件：当文档从可变为不可见或从不卡见变为可见是，触发该事件。

## 地理定位api

navigator.geolocation对象，可以能够访问到用户的当前位置信息。

## file Api

每个file对象都有下列只读属性

name：本地文件系统中的文件名。

size：文件的字节大小

lastModifiedDate：字符串，文件上一次被修改的时间。

### FileReader类型

**三个方法：**

readAsText(file,encoding)：以纯文本形式读取文件，将读取到的文本保存在result属性中。第二个参数用于指定编码类型，是可选的。

readAsDataURL(file)：读取文件并将文件以数据URL的形式保存在result属性中。

readAsBinaryString(file)：读取文件并将一个字符串保存在result属性中，字符串中的每个字符表示一字节。

readAsArrayBuffer(file)：读取文件并将一个包含文件内容的ArrayBuffer保存在result属性中。

**三个事件：**

progress：表示是否又读取了新数据

error：是否发生了错误（1表示未找到文件、2表示安全性错误、3表示读取中断、4表示文件不可读）

load：是否已经读完了整个文件。

~~~javascript
let reader = new FileReader()
reader.readAsDataURL(file)
reader.onload = function () {
  let imgResult = reader.result
}
reader.onerror=function(){
    let code=reader.error.code
}
reader.onprogress=function(event){
    let percent=event.loaded+'/'+event.total
}
~~~

如果想中断读取过程，可以调用abort()方法，这样就会触发abort事件。在触发load、error或abort事件后，会触发另一个事件loadend。loadend事件发生就意味着已经读取完整个文件，或者读取时发生了错误，或者读取过程被中断。

### 读取部分内容

file.slice(startByte,length)：起始字节及要读取的字节数。这个方法返回一个Bold的实例，Blob是File类型的父类型。Bold类型有一个size属性和一个type属性，而且它也支持slice()方法，以便进一步切割数据。通过FileReader也可以从Blob中读取数据。

### 对象URL

