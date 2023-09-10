| 方法或属性                          | 描述                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| prototype                           | 指向实例的原型对象                                           |
| assign()                            | 将所有可枚举属性从一个或多个源对象复制到目标对象             |
| create()                            | 创建一个新的对象                                             |
| Object.defineProperties(obj, props) | 直接在一个对象上定义新的属性或修改现有属性，并返回该对象<br />第一个参数是obj，第二个参数是用来修改对象属性的描述（是否可写/是否可删除/是否可枚举/值/getter/setter）(详见下代码块A) |
| delete obj.gender                   | 删除对象的属性                                               |
|                                     |                                                              |
|                                     |                                                              |
|                                     |                                                              |
|                                     |                                                              |

```
A：
Object.defineProperties(obj, props)
let obj = {};
    Object.defineProperties(obj, {
      telephone: {
        configurable: true,
        enumerable: true,
        get() {
          return this._phone;
        },
        set(v) {
          v = v.toString();
          let reg = /^1[3-9]\d{9}$/;
          if (reg.test(v)) {
            this._phone=v.substring(0,3)+'-'+v.substring(3,7)+'-'+v.substring(7,11)
          }else {
            throw new Error('手机号码格式不正确')
          }
        }
      }
    });
    //  delete obj.gender  //删除对象的某个属性
    obj.telephone = '13345678912';
    console.log(obj.telephone);
```

