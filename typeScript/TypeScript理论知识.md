# 基本概念

## any、unknow、never区别

`any` （允许任何类型）、[`unknown`](https://www.typescriptlang.org/play#example/unknown-and-never) （确保使用此类型的人声明类型是什么）、 [`never`](https://www.typescriptlang.org/play#example/unknown-and-never) （这种类型不可能发生）和 `void` （返回 `undefined` 或没有返回值的函数）。

never：是所有类型的子类型

## 交叉类型：&

同名类型会进行合并，同名基础类型属性的合并返回：never，同名非基础类型属性可以正常合并。

## extends关键字

`A extends B`，是指类型**`A`可以分配给类型`B`**，而不是说类型`A`是类型`B`的子集。

~~~javascript
type Human = {
   name: string;
}
type Duck = {
   name: string;
}
type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'yes'
~~~

~~~javascript
type Human = {
   name: string;
   occupation: string;
}
type Duck = {
   name: string;
}
type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'no'
~~~

使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用`分配律`计算最终的结果。分配律是指，`将联合类型的联合项拆成单项`，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。

`适用分配律`：第一，参数是泛型类型，第二，代入参数的是联合类型

~~~javascript
type P<T> = T extends 'x' ? string : number;
type A3 = P<'x' | 'y'>  // A3的类型是 string | number
~~~

- 特殊的never

实际上，这里还是条件分配类型在起作用。**never被认为是空的联合类型**，也就是说，没有联合项的联合类型，所以还是满足上面的分配律，然而因为没有联合项可以分配，所以`P<T>`的表达式其实根本就没有执行，所以A2的定义也就类似于永远没有返回的函数一样，是never类型的。

~~~javascript
// never是所有类型的子类型
type A1 = never extends 'x' ? string : number; // string
 
type P<T> = T extends 'x' ? string : number;
type A2 = P<never> // never
~~~

- ##### 防止条件判断中的分配

在条件判断类型的定义中，将泛型参数使用`[]`括起来，即可阻断条件判断类型的分配，此时，传入参数T的类型将被当做一个整体，不再分配。

~~~javascript
type P<T> = [T] extends ['x'] ? string : number;
type A1 = P<'x' | 'y'> // number
type A2 = P<never> // string
~~~

### 在高级类型中的应用

- **Exclude**

Exclude是TS中的一个高级类型，其作用是从第一个联合类型参数中，将第二个联合类型中出现的联合项全部排除，只留下没有出现过的参数。

示例：

~~~~javascript
type A = Exclude<'key1' | 'key2', 'key2'> // 'key1'
~~~~


Exclude的定义是

~~~javascript
type Exclude<T, U> = T extends U ? never : T
~~~

这个定义就利用了条件类型中的分配原则，来尝试将实例拆开看看发生了什么：

~~~javascript
type A = `Exclude<'key1' | 'key2', 'key2'>`
// 等价于
type A = `Exclude<'key1', 'key2'>` | `Exclude<'key2', 'key2'>`
// =>
type A = ('key1' extends 'key2' ? never : 'key1') | ('key'2 extends 'key2' ? never : 'key2')
// =>
// never是所有类型的子类型
type A = 'key1' | never = 'key1'
~~~

- **Extract**

高级类型Extract和上面的Exclude刚好相反，它是将第二个参数的联合项从第一个参数的联合项中提取出来，当然，第二个参数可以含有第一个参数没有的项。

下面是其定义和一个例子，有兴趣可以自己推导一下

~~~javascript
type Extract<T, U> = T extends U ? T : never
type A = Extract<'key1' | 'key2', 'key1'> // 'key1'
// 等价于
type A=`Extract<'key1', 'key1'>` | `Extract<'key2', 'key1'>`
// =>
type A=('key1' extends 'key1'? 'key1':never) | ('key2' extends 'key1'? 'key1':never)
// =>
// never是所有类型的子类型
type A= 'key1' | never = 'key1'
~~~

- Pick

extends的条件判断，除了定义条件类型，还能在泛型表达式中用来约束泛型参数

~~~javascript
// 高级类型Pick的定义
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
 
interface A {
    name: string;
    age: number;
    sex: number;
}
 
type A1 = Pick<A, 'name'|'age'>
// 报错：类型“"key" | "noSuchKey"”不满足约束“keyof A”
type A2 = Pick<A, 'name'|'noSuchKey'>
~~~

Pick的意思是，从接口T中，将联合类型K中涉及到的项挑选出来，形成一个新的接口，其中K extends keyof T则是用来约束K的条件，即，传入K的参数必须使得这个条件为真，否则ts就会报错，也就是说，K的联合项必须来自接口T的属性。

## 非空断言运算符：!

~~~javascript
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
~~~

## typeof操作符

`typeof`操作符用于获取变量的类型，因此操作符后面接的始终是一个变量。

### 基本用法

~~~javascript
const p = {
  name: 'CJ',
  age: 18
};

type Person = typeof p;

// 等同于
type Person = {
  name: string;
  age: number;
}
~~~

### 从嵌套对象获取类型

~~~javascript
const p = {
  name: 'CJ',
  age: 18,
  address: {
    city: 'SH'
  }
};

type Person = typeof p;

// 相当于
type Person = {
  name: string;
  age: number;
  address: {
    city: string;
  };
};
~~~

### 从数组获取类型

~~~javascript
const data = ['hello', 'world'] as const;
type Greeting = typeof data[number];
// type Greeting = "hello" | "world"


export const locales = [
  {
    locale: 'se',
    language: 'Swedish'
  },
  {
    locale: 'en',
    language: 'English'
  }
] as const;

type Locale = typeof locales[number]['locale'];
~~~

## infer 关键字

[`infer`](https://zhuanlan.zhihu.com/p/402541135)关键字用于条件中的类型推导。

~~~javascript
type ArrayElementType<T> = T extends (infer E)[] ? E : T;
// type of item1 is `number`
type item1 = ArrayElementType<number[]>;
// type of item1 is `{name: string}`
type item2 = ArrayElementType<{ name: string }>;
~~~

`infer` 关键字让我们拥有深入展开泛型的结构，并 Pick 出其中任何位置的类型，并作为临时变量用于最终返回类型的能力。

## 索引签名

语法：

~~~javascript
{[key:KeyType]:ValueType}
~~~

示例：

~~~javascript
interface User {
  name: string;
  sex?: string;
  [propName: string]: any; // Index Signatures
}
// 添加其他任意属性,TypeScript 编译器不会提示错误
let user: User = {
  name: "Bytefer",
  sex: "male",
  age: 30,
  email: "bytefer@gmail.com"
};

~~~



## 模板文本类型

[`模板文本类型`](https://blog.csdn.net/ZY_FlyWay/article/details/120060839)建立在字符串文本类型的基础上，并且能够通过联合扩展为许多字符串。

`eg:`侦听事件、内在字符串操作类型(每个字符大写操作、每个字符小写操作)

