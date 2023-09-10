# ArrayBuffer详解

> ArrayBuffer是JavaScript储存二进制数据的接口,用数组的方式方便的储存二进制数据，并使用TypedArray或者DataView来操作数据

## ArrayBuffer构造函数及原型方法

|方法或构造函数|描述|
|--|--|
|new ArrayBuffer(32)| 使用该构造函数来储存一段二进制数据，参数为内存大小，单位是字节，但注意不要超过剩余内存 |
|byteLength| 返回该实例分配的内存大小，也可以用这个值判断是是否分配成功 |
| slice |  |

