is：类型谓词【`parameterName is Type`】缩小类型。

!：非空断言【shape.radius!】来表示`radius`肯定存在。

never：`never`类型来表示不应该存在的状态。

｜：当联合中的每个类型都包含具有文字类型的公共属性时，TypeScript 认为这是一个可*区分的联合*，并且可以缩小联合的成员范围。

type：类型别名。

函数类型表达式语法不允许声明属性。如果我们想用属性描述可调用的东西，我们可以在对象类型中编写【调用签名】：

~~~javascript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
~~~

JavaScript 函数也可以通过`new`操作符调用。TypeScript 将它们称为*构造函数*，因为它们通常会创建一个新对象。您可以通过在调用签名前添加关键字来编写构造签名：【`new`】

~~~javascript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
~~~

类的相关修饰符

public：可以`public`在任何地方访问成员

protected：成员仅对声明它们的类的子类可见

private: 对派生类不可见，对实例是否可以访问，不同的语言有歧义

static：这些成员不与类的特定实例相关联。它们可以通过类构造函数对象本身访问
