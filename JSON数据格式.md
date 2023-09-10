# 介绍

是一种**轻量级**的数据交换格式，**JSON** 是一种语法，用来序列化**对象**、**数组**、**数值**、**字符串**、**布尔值**和**null** 。它基于 JavaScript 语法，但与之不同：**JavaScript不是JSON，JSON也不是JavaScript**

#  JavaScript 与 JSON 的区别

![1574143024541](https://minio.lihuiwang.net/notes/notes/2023/09/10/JSON-1.png)

# 方法

## JSON.stringify（）

JSON.stringify()方法将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串

1、语法

```
JSON.stringify(value[, replacer [,space]])
```

2、参数

- value:必选，将要序列化成 一个 JSON 字符串的值。

  描述：

  ![1574213959883](https://minio.lihuiwang.net/notes/notes/2023/09/10/JSON-2.png)

- replacer：可选，array||function||null

如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化；

描述：（1）array：数组的值代表将被序列化成JSON字符串的属性名

​			（2）null：对象的所有属性都将被序列化

​			（3）function（key，value）{}  ：过滤转换函数必须要retrun有返回值

​						key ：js对象的键名

​						value：js对象的键值

​						注意：第一次循环key是'',value是整个js对象；

![1574217511083](https://minio.lihuiwang.net/notes/notes/2023/09/10/JSON-3.png)

- space：可选，缩进空格数；数字|| 字符串 || \t ||null

指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

3、返回值

一个表示给定值的JSON字符串

##  JSON.parse()

JSON.parse()方法用来解析JSON字符串，将一个JSON 字符串转换为一个 JavaScript 值（对象）

1、语法

```
JSON.parse(text[, reviver])
```

2、参数

text：必选，要被解析成JavaScript值的字符串

reviver:可选，转换器：如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在parse函数返回之前，用法同JSON.stringify的第二次参数function一样

3、返回值

Object类型，对应给定JSON文本的对象、值

4、异常

若传入的字符串不符合JSON规范，则会抛出SyntaxError异常

## toJSON方法

如果一个被序列化的对象拥有 `toJSON` 方法，那么该 `toJSON` 方法就会覆盖该对象默认的序列化行为：不是该对象被序列化，而是调用 `toJSON` 方法后的返回值会被序列化，toJSON方法必须要有返回值要retrun

~~~javascript
let obj = {
  name: 'lemo',
  sex: 0,
  toJSON() {
    console.log(this)//{ name: 'lemo', sex: 0, toJSON: [Function: toJSON] }
    return {
      age: 19
    }
  }
}
let str=JSON.stringify(obj)
console.log(str)//{"age":19}
~~~

特殊情况使用方法举例：如果想传输时间或者正则表达式

~~~javascript
let obj={
  name:'lemo',
  color:'yellow',
  reg:/xxx/,
  time:new Date(),
  toJSON() {
    return {
      ...this,
      reg:String(this.reg)
    }
  }
}
let str=JSON.stringify(obj,(key,value)=>{
  if(key==='time') return new Date(value).getTime()
  return value
})
let Obj= JSON.parse(str,(key,value)=>{
  if(key==='time') return new Date(value)
  if(key==='reg')  return new RegExp(value.substring(1,value.length-1))
  return value
})
~~~

