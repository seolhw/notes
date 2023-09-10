## TypeScript 预置的高级类型

#### Record 

源码定义：

~~~tsx
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
~~~

以typeof格式快速创建一个类型，此类型包含一组指定的属性且都是必填。

~~~tsx
type Coord = Record<'x' | 'y', number>;

// 等同于
type Coord = {
	x: number;
	y: number;
}
~~~

具体的复杂业务场景中，一般会接口 `Pick` 、`Partial` 等组合使用，从而过滤和重组出新的类型定义。

#### Partial

源码定义：

~~~tsx
type Partial<T> = {
    [P in keyof T]?: T[P];
};
~~~

将类型定义的所有属性都修改为可选。

~~~tsx
type Coord = Partial<Record<'x' | 'y', number>>;

// 等同于
type Coord = {
	x?: number;
	y?: number;
}
~~~

#### Readonly

源码定义：

~~~tsx
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
~~~

不管是从字面意思，还是定义上都很好理解：将所有属性定义为自读。

~~~tsx
type Coord = Readonly<Record<'x' | 'y', number>>;

// 等同于
type Coord = {
    readonly x: number;
    readonly x: number;
}

// 如果进行了修改，则会报错：
const c: Coord = { x: 1, y: 1 };
c.x = 2; // Error: Cannot assign to 'x' because it is a read-only property.
~~~

#### Pick

源码定义：

~~~tsx
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
~~~

从类型定义的属性中，选取指定一组属性，返回一个新的类型定义。

```tsx
type Coord = Record<'x' | 'y', number>;
type CoordX = Pick<Coord, 'x'>;

// 等用于
type CoordX = {
	x: number;
}
```

#### Required

源码定义：

~~~tsx
type Required<T> = {
    [P in keyof T]-?: T[P];
};
~~~

与 `Partial<T>` 程序类型的作用相反，将类型属性都变成必填。

~~~tsx
type Coord = Required<{ x: number, y?:number }>;

// 等同于
type Coord = {
	x: number;
	y: number;
}
~~~

#### Exclude

源码定义：

```tsx
type Exclude<T, U> = T extends U ? never : T;
```

排除一个 **联合类型** 中指定的子类型。

~~~tsx
type T0 = Exclude<'a' | 'b' | 'c', 'b'> // 'a' | 'c'
type T1 = Exclude<string | number | boolean, boolean> // string | number
~~~

#### Extract

源码定义：

```tsx
type Extract<T, U> = T extends U ? T : never;
```

与 `Exclude<T, U>` 完全相反的功能，用于提取指定的 **联合类型**，如果不存在提取类型，则返回never。可以用在判断一个复杂的 联合类型 中是否包含指定子类型：

```tsx
type T0 = Extract<'a' | 'b' | 'c', 'a'> // 'a'
type T1 = Extract<string | number | boolean, boolean> // boolean
```

#### Omit

源码定义：

```tsx
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

排除**接口**中指定的属性：

```tsx
interface I1 {
	a: number;
	b: string;
	c: boolean;
}

type AC = Omit<I1, 'b'>;     // { a:number; c:boolean } 
type C = Omit<I1, 'a' |'b'>  // { c: boolean }
```

#### NonNullable

源码定义：

```tsx
type NonNullable<T> = T extends null | undefined ? never : T;
```

过滤掉 联合类型 中的 `null` 和 `undefined` 类型：

```tsx
type T1 = NonNullable<string | null | undefined>; // string
```

#### Parameters

源码定义：

```tsx
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

获取函数的全部参数类型，以 **元组类型** 返回：

```tsx
type F1 = (a: string, b: number) => void;

type F1ParamTypes = Parameters(F1);  // [string, number]
```

#### ConstructorParameters

源码定义：

```tsx
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
```

同上面的类型很相似，只是这里获取的是 **构造函数** 的全部参数。关于构造函数声明，以及如何使用此 高级类型 的方式：

```tsx
interface IEntity {
    count?: () => number
}

interface IEntityConstructor {
    new (a: boolean, b: string): IEntity;
}

class Entity implements IEntity {
    constructor(a: boolean, b: string) { }
}

type EntityConstructorParamType = ConstructorParameters<IEntityConstructor>; // [boolean, string]
```

这里的 `IEntityConstructor` 接口用来干什么的呢，当基于 创建实例函数 时就派上了用场：

~~~tsx
function createEntity(ctor: IEntityConstructor, ...arg: EntityConstructorParamType): IEntity {
    return new ctor(...arg);
}

const entity = createEntity(Entity, true, 'a');
~~~

#### ReturnType

源码定义：

```tsx
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

接收函数声明，返回函数的返回值类型，如果多个类型则以 联合类型 方式返回：

```tsx
type F1 = () => Date;

type F1ReturnType = ReturnType<F1>; // Date
```

#### InstanceType

源码定义：

```tsx
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```

获取 构造函数 的返回类型，如果是多个就以 联合类型 的方式返回，我们借用上面的定义：

```tsx
type EntityType = InstanceType<IEntityConstructor>; // IEntity
```

#### ThisParameterType

源码定义：

```tsx
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;
```

获取函数中 `this` 的数据类型，如果没有则返回 `unknown` 类型：

```tsx
interface Foo {
    x: number
};

function fn(this: Foo) {}

type Test = ThisParameterType<typeof fn>; // Foo
```

因为可以在 TS 声明函数的 `this` ，此方法用于获取此声明，具体的使用：

```tsx
fn.bind({ x: 1 });   // 正常

fn.bind({ x: '1' }); // Error: ...Type 'string' is not assignable to type 'number'...
复制代码
```

#### OmitThisParameter

源码定义：

```tsx
type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;
```

移除函数中的 `this` 数据类型：

```tsx
interface Foo {
    x: number
};

type Fn = (this: Foo) => void

type NonReturnFn = OmitThisParameter<Fn>; // () => void
```

声明此类的函数类型效果如下：

```tsx
function f(this: void) {} // 此声明在函数内不可使用 this
```

## 自定义一个高级类型

#### RequireKey

定义：

~~~tsx
declare type RequireKey<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P]
}
~~~

将类型定义中指定的可选属性变为必选属性：

~~~javascript
interface I1 {
	a?: number;
	b?: string;
	c: boolean;
}

type AC = RequireKey<I1, 'a'>;     // { a:number; b?: string; c:boolean } 
type C = Omit<I1, 'a' |'b'>  // { a:number; b?: string; c:boolean }
~~~

过程解析(以type AC为例)：

将`I1`传入的泛型`T`，`'a'`传入泛型K

keyof  T：通过索引查询操作符，返回`T`的键名组成的新类型`'a'|'b'|'c'`

通过extends继承操作符，限制泛型K是`'a'|'b'|'c'`的子集。

然后通过预置的高级类型删除掉`T`类型中的属性`'a'`，变为以下类型。

~~~javascript
{
	b?: string;
	c: boolean;
}
~~~

然后再通过in操作符循环遍历`'a'|'b'|'c`'，通过`-`前缀来删除`'a'`的可选属性将可选属性变为必填属性，并保留以前的类型。

~~~javascript
{ a:number; b?: string; c:boolean } 
~~~


## 总结

官方提供的高级类型，可以让我们在开发中更加效率。有些高级类型可能并不会用到，但简单过一遍，知道 TS 预置了那些类型，当某些开放场景想起时，总会带来惊喜。