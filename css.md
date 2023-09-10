# 选择器

| 类型                             | 写法                            | 备注                                                         |
| -------------------------------- | ------------------------------- | ------------------------------------------------------------ |
| 后代选择器                       | div  p                          | 所有后代                                                     |
| 子选择器                         | #nav>p                          | 直接后代                                                     |
| 相邻同辈选择器                   | h2+p                            | 选择紧挨着h2后面的p                                          |
| 一般同辈选择器                   | h2~p                            | 选择h2后面的所有p                                            |
| 属性选择器                       | h2[title]                       | 有title属性的h2标签                                          |
| 特定属性选择器                   | h2[title="123"]                 | title属性是123的h2标签                                       |
|                                  | h2[style='height: 36px;']       | 行内样式是高36px的h2标签                                     |
| 匹配以某些字符开头的属性值       | h2[title^="1"]                  | title属性是以1开头的h2标签                                   |
| 匹配以某些字符结束的属性值       | h2[title$="1"]                  | title属性是以1结束的h2标签                                   |
| 匹配包含某些字符的属性值         | h2[title*='1']                  | title属性里包含1的h2标签                                     |
| 匹配以空格分隔的字符串中的属性值 | h2[title~="123"]                | title属性里包含前或后有空格123的字符串的h2标签               |
| 匹配属性是指定值或者指定值—      | h2[title\|=1]                   | title属性是1或者title属性是1-**的h2标签                      |
| ::first-letter伪元素             | ::first-letter                  | 选择第一个字符                                               |
| ::first-line伪元素               | ::first-line                    | 选择第一行                                                   |
| ::before伪元素                   | ::before                        | 开头添加内容（利用conten属性插入）                           |
| ::after伪元素                    | ::after                         | 结尾添加内容,content中的任何空白符，都会被渲染成一个空格。   |
| :link伪类                        | :link                           | 未访问过                                                     |
| :visited伪类                     | :visited                        | 访问过                                                       |
| :hover,:focus伪类                | :hover,:focus                   | 滑过和获取焦点                                               |
| :active伪类                      | :active                         | 活动状态时                                                   |
| 目标伪类                         | :target                         | 只有存在url指向该匹配元素时候，样式才会生效                  |
| 反选伪类                         | p:not(.page)                    | 不包括class名为page的p标签                                   |
| 结构化伪类                       | li:nth-child（1）               | 第一个li且第一个元素是li                                     |
| 结构化伪类                       | li:nth-child(odd)               | 为奇数的li                                                   |
| 结构化伪类                       | li:nth-child(even)              | 为偶数的li                                                   |
| 结构化伪类                       | li:nth-child(3n+1)              | 第4,7,10....个li                                             |
| 结构化伪类                       | li:nth-last-child()             | 和nth-child类似（倒着数）                                    |
| 结构化伪类                       | :first-child;:last-child        | 第一个和最后一个元素                                         |
| 结构化伪类                       | li:last-child:nth-child(4n - 1) | 是最后一个并且是4n-1个元素                                   |
| 结构化伪类                       | li:noly-child                   | 只有一个元素且是li的元素                                     |
| 结构化伪类                       | p:nth-of-type(4)                | nth-of-type和nth-child类似（nth-of-type会忽略非指定的元素）第四个p元素 |
| 结构化伪类                       | p:nth-last-of-type()            |                                                              |
| 结构化伪类                       | p:only-of-type                  | 只有一个p元素                                                |
| 必填表单伪类                     | input:required                  | 有required属性的input标签                                    |
| 非必填表单伪类                   | input:optional                  | 没有required属性的input标签                                  |
| 有效表单伪类                     | input[type="email"]:valid       | 如果输入框中包含有效的电子邮件地址                           |
| 无效表单伪类                     | input[type="email"]:invalid     | 如果输入框中包含无效的电子邮件地址                           |
| 只读表单伪类                     | input:read-only                 | 只读input标签                                                |
| 没有只读属性表单伪类             | input:read-write                | 没有只读属性的input标签                                      |
| 选中表单伪类                     | input[type="checkbox"]:checked  | 选中状态的复选框                                             |
| 浏览器的伪元素                   | ::webkit-validation-bubblue     | 给浏览器的错误消息添加样式                                   |
| 通配符                           | ul>*                            | ul所有的直接子元素                                           |

目标伪类

~~~javascript
<a href="#WC">WC</a>
<P id="WC" class="WC">PC3</P>

.WC:target {
      background: red;
 }

上述代码的效果是当点击a链接，链接跳转到P的时候，P的背景色为红色
~~~

# 选择器属性

元素：

- background-color:rgba(0,0,0,0.8);设置背景色透明
- box-sizing:border-box;width和height的属性值包括padding和border 
- box-sizing:content-box;默认

------

文本：

- text-transform:uppercase;英文字母大写
- text-transform:lowercase；英文字母小写
- text-transform:capitalize；每个单词的首字母变大写
- text-transform:none；默认
- word-spacing/letter-spacing:10px;控制字间距
- word-break:break-all;允许长单词折行
- word-warp:break-word;允许长单词换到下一行
- text-align:justify;两端对齐
- text-align-last：auto | start | end | left | right | center | justify；最后一行的对齐方式。
- text-indent:2em;缩进两个字符
- columns:300px/3;文字分栏，栏的最小宽度（以下两个属性的简写形式）
- column-count:3；栏的的数量
- column-width:200px;栏的宽度
- colum-gap:20px;栏与栏之间的距离
- column-span:all;跨栏属性
- column-span:none;关闭跨栏属性
- text-shadow:10px 10px 2px #ccc;x轴的偏移量；y轴的偏移量；模糊距离；颜色值
- user-select: none | auto |text | all;双击或上下文单击，是否可以选择文本
-  pointer-events: none;  不接受鼠标事件 ，不可点击

------

背景图片：

- background-image:url(img/cat.jpg);设置背景图片
- background-repeat:no-repeat/repeat-y/repeat-x;图片重复方向
- background-position:50% 50%;背景图片定位（百分比相对于图片大小而言）
- background-clip:border-box/padding-box/content-box;背景图片裁剪
- background-origin:border-box/padding-box/content-box;控制背景图片原点的位置
- background-attachment:scroll;默认：背景图随元素的移动而移动
- background-attachment:fixed;页面滚动时“粘”在页面上
- background-attachment:local;让背景图片相对于元素的内容固定
- background-size:100% auto;设置背景图片大小（宽度100%，高度自动）
- background-size:contain;尽可能的保持图片最大化，同时不改变图片的宽高比，可以避免被裁剪
- bakcground-size:cover;图片会缩放完全覆盖
- background-size:100% 40px;设置背景图片大小（宽度100%，高度40px）
- background-image:url((img/cat1.jpg),url((img/cat2.jpg);设置多张背景图，用逗号隔开
- *background-image*: linear-gradient(to bottom, red 0%, yellow 100%);线性渐变
- *background-image*: linear-gradient(45deg, red 0%, yellow 100%);线性渐变
- *background-image*: linear-gradient(red, yellow 100px);0至100px是红黄渐变，100px以后是黄色
- *background-image*: radial-gradient(circle 20px at 20% 30%, red, yellow);放射线渐变：圆形渐变，半径为20排序，中心点为x轴方向20%，y轴方向30%；圆周内部红黄渐变，圆周外部由黄色覆盖
- *background-image*: radial-gradient(red, yellow);椭圆形渐变；
- *background-image*: repeating-linear-gradient(red, yellow 20px);重复性线性渐变；
- background-image: repeating-radial-gradient(red, yellow 20px);重复的放射渐变；

calc()函数：

- width:calc(50% + 20px*4 - 1em);计算数值，加减乘除都可以（需在加号和减号两侧加空格）

------


边框：

- border-radius:50%;圆形(正方形)

- border-radius:999em;任意大的值，胶囊（长方形）

- border-image:url(picture-frame.png) 40;边框图片：第二个值指定切片参考线的位置（没有px)

------


盒阴影：

- box-shadow:10px 10px 10px 10px #eee;同text-shadow，第四个值，为扩展半径，用于扩展阴影的大小

- *box-shadow*: inset 10px 10px 10px 10px #eee;内阴影
- *box-shadow*: 0 0 0 10px red, 0 0 0 20px;多阴影，用逗号隔开

------

弹性盒子：

``` javascript
display: flex;
display: -webkit-flex;
display: -ms-flex;
display: -moz-flex;
```

​        display: -webkit-flex;

​        display: -ms-flex;

​        display: -moz-flex;

（父元素）

flex-direction:

- row  从左向由排列；
- row-reverse 从右向左排列；
- column  主轴为垂直方向，起点在上沿;
- column-reverse主轴为垂直方向，起点在下沿

flex-wrap

- nowrap 不允许换行排列
-  wrap 允许换行排列,第一行在上方。
-  wrap-reverse反转垂直排布的方向，让第一行从底部开始，然后向上折行(第一行在下方)

——主轴 **justify-content**

- justify-content:flex-start;起点对齐
- justify-conten:flex-end;终点对齐
- justify-conten:center;居中对齐
- justify-content:space-around;两端对齐（ 两边留有一半的间隔空间 ）
- justify-content:space-between;两端对齐（紧挨两边对齐）

——辅轴 **align-items**

- align-items:stretch;子项默认拉伸，以填满可用空间
- align-items:flext-start;起点对齐
- align-items:flex-end;终点对齐
- align-items:center;居中对齐
- align-items:baseline;将子项中文本的基线与容器基线对齐

**---align-content属性** (属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用)

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。

（子元素）

——主轴

- *margin-right*: auto;如果容器里还有空间，那么该外边距就会扩展占据可用空间
- flex:1;所占比例，如果只有一个子元素设置此属性会占满剩余空间（flex-grow，flex-shrink，flex-basis）的简写，代表flex-grow:1、flex-shrink：1、flex-basis：auto； 

- --flex-basis:80px/20%;确定假想的主尺寸；
- --flex-grow:1;占剩余空间的几份；
- --flex-shrink:1;超出容器宽度时的收缩比例（自己的flex-shrink与flex-basis乘积除以每一项的flex-shrink*flex-basis乘积之和，最后再拿得到的比例系数去乘以超出的宽度，从而得到该项目要收缩的空间数量）；
- order:-1;调整项目次序（标题和图片可以分别是-99和-6，正负都可以，默认值为0，越大位置越靠后）

——辅轴

- align-self:flex-start;指定个别项的对齐方式

  ```css
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
  ```

  

  flex : http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

------

表格：

border-collapse:collapse;相邻单元会共享边框

table-layout:auto;默认值，按照单元格的内容来确定单元格的宽度

table-layout:fixed;单元格的宽度会基于表格第一行中的每个单元格的宽度确定

------

网格布局：

 display: grid;网格容器

 grid-template-rows: 100px 300px;行数&行高

 grid-template-columns: 1fr 1fr 1fr 1fr;列数&列宽

------

表单：

cursor:pointer;变手型

-webkit-appearance:none;去掉weblit浏览器仍然会显示烦人内阴影

*outline*: 0;去掉轮廓

resize:vertical/horizontal/none/both;缩放文本区的方向

------

变化、过渡、与动画：

二维变换

| 写法                                          | 备注                             |
| --------------------------------------------- | -------------------------------- |
| transform:rotate(45deg)                       | 旋转45度                         |
| transform:translate（10px,10px）              | x轴平移10px；y轴平移10px         |
| transform-origin:100% 100%                    | 变换原点为元素的右下角           |
| transform:translate（10px,10px）rotate(45deg) | 解决规则覆盖问题                 |
| transform：scale(2,2)                         | 同时沿x轴和y轴放大一倍           |
| transform:skewX(15deg)                        |                                  |
| transition：all 2s ease-in                    | 过渡的属性、过渡的时间、过渡曲线 |

```javascript
-webkit-transform: translate(-50%, -50%);
-moz-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
-o-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
```



css关键帧动画

~~~javascript
@keyframes roll{//创建动画
      from{
        transform: translateX(-100%);
        animation-timing-function: ease-in-out;
      }
      20%{
        transform: translateX(-100%) skew(15deg);
      }
      70%{
        transform: translateX(-100%) rotate(90deg) skewY(0deg);
      }
      to{
        transform: translateX(-100%) rotate(90deg);
      }
    }
    .box-inner{//应用动画
      //animation: name duration timing-function delay iteration-count direction fill-mode;
      animation: roll 2s ease-in-out 3/infinite
    }
~~~

特效：

*shape-outside*: circle()/ellipse()/polygon()/inset();产生文本流环绕的效果圆形/椭圆形/多边形/嵌入在盒子内边界的矩形；

~~~javascript
<div class="box">
        <i class="icon ikcon iconlishibaogao ikcon-iconfont"></i>
</div>
.box{
    position: relative;
    i{
      font-size:28px;
    }
    &::before{
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 10px;
      width: 10px;
      border-radius:50%;
      background:rgba(0,0,0,0);
    }
    &:hover::before{
      height: 40px;
      width: 40px;
      background:rgba(0,0,0,0.1);
      transition:all 0.2s;
    }
  }
~~~



# 标签

~~~javascript
<fieldset>
      <legend>个人信息</legend>
</fieldset>
~~~

![filedset标签样式](https://minio.lihuiwang.net/notes/notes/2023/09/10/2.png)

# 标签属性

所有标签：

- title：划过展示提示内容

img：

~~~javascript
<img src="img1.png" srcset="img2.png 1.5x" alt="">
srcset： 让默认分辨率或不支持的浏览器加载600像素*300像素的图片，但在像素比高的时候加载两倍大的图片
~~~

~~~javascript
<img src="img/xsmall.png" alt=""
    srcset="img/xsmall.png 300w,
            img/small.png 400w,
            img/medium.png 600w,
            img/large.png 800w,
            img/xlarge.png 1200w"
    sizes="(min-width:70em) 12.6875em,
           (min-width:50em) clac(25vw*0.95-2.75em),
           (min-width:35em) clac(95vw/2-4.125em),
           clac(95vw-1.375em)">
srcset属性的值是一组图片URL加一个实际像素宽度（不是css像素）。这个宽度后面加w字母的语法叫宽度描述符。接下来要告诉浏览器怎么使用这些图片。只需在sizes中对应着给出一组宽度值即可，每个值开头可以加上（或不加）媒体条件，就像css媒体查询中一样，它的顺序是从前往后，找到匹配就退出，所以这里先申明最宽的媒体条件，最后一个宽度不需要条件，只是作为匹配最小屏幕之后兜底的值。
~~~

# 层叠和继承

级别：行内样式>!important>id>class>标签>

继承：字体、颜色、字体大小

# 盒模型

![盒模型](https://minio.lihuiwang.net/notes/notes/2023/09/10/1.png) 

# 响应式web设计

1、配置视口

~~~javascript
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
~~~

含义：使用当前设备的理想尺寸（device-width）作为视口宽度的基准,initial-scale=1其作用是设置与理想视口匹配的缩放级别。

2、媒体类型，指定在那些设备上应用相关样式

通过给link元素添加media属性，可以指定在那些设备上应用相关样式，比如：将相关样式用于打印

~~~javascript
<link ref="stylesheet" href="main.css" media="print">
~~~

在css文件中指定，使用@media语法

~~~javascript
@media print{
    .wrapper{
        font-size: 30px;
    }
 }
~~~

3、媒体查询

- 在link元素中，媒体查询可以这样写

~~~javascript
<link ref="stylesheet" href="main.css" media="screen and (min-width:600px)">
~~~

这样就声明了main.css应该用于屏幕媒体，而且媒体条件是视口至少600css像素宽

- 在css文件中通过@media规范写成如下格式

~~~javascript
@media screen and (min-width:600px){
    /*这里写样式*/
}
~~~

这里的and关键字负责把媒体类型与测试的条件连接起来，可以同时用and关键字连接多个测试条件；多个媒体查询可以把测试条件写成一连串，用逗号分隔，逗号相当与'或'。

屏幕方向改变

~~~javascript
@media(orientation:portrait){
    /*竖屏时的样式*/
}
~~~

视口匹配最小宽高比时应用规则

~~~javascript
@media(min-aspect-ratio:16/9){
    /*宽高比至少为16:9时应用*/
}
~~~

# 函数

| 名称   | 用法                             | 意义             |
| ------ | -------------------------------- | ---------------- |
| calc() | width: calc(100% - 210px - 60px) | 计算属性函数     |
| attr() | content:attr(data-label)         | 获取标签的属性值 |

# 样式穿透

 less使用  **/deep/** 

~~~javascript
<style scoped lang="less">
.content /deep/ .el-button {
	 height: 60px;
}
</style>
~~~

 scss使用 **::v-deep** 

~~~javascript
<style scoped lang="scss">
.content ::v-deep .el-button {
  height: 60px;
}
</style>
~~~

 stylus使用 **>>>** 

~~~javascript
<style scoped ang="stylus">
外层 >>> .custon-components{
  height: 60px;
}
</style>
~~~

# css小技巧

## 巧用flex布局

### flex布局最后一行列表左对齐的N种方式

**问题描述：**flex布局中，如果每一行列数是固定的，怎样实现最后一行左对齐。

方法一：不使用justify-content：space-between声明在模拟两端对齐效果。中间的间隙使用margin进行控制。

~~~javascript
.container {
    display: flex;
    flex-wrap: wrap;
}
.list {
    width: 24%; height: 100px;
    background-color: skyblue;
    margin-top: 15px;
}
.list:not(:nth-child(4n)) {
    margin-right: calc(4% / 3);//平分剩下的距离
}
      
<div class="container">
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
</div>
~~~

方法二：根据个数动态设置最后一个元素的margin

~~~javascript
.container {
    display: flex;
    /* 两端对齐 */
    justify-content: space-between;
    flex-wrap: wrap;
}
.list {
    width: 24%;
    height: 100px;
    background-color: skyblue;
    margin-top: 15px;
}
/* 如果最后一行是3个元素，最后一个元素并且是第4n-1个元素 */
.list:last-child:nth-child(4n - 1) {
    margin-right: calc(24% + 4% / 3);
}
/* 如果最后一行是2个元素，最后一个元素并且是第4n-2个元素 */
.list:last-child:nth-child(4n - 2) {
    margin-right: calc(48% + 8% / 3);
}
~~~

**问题描述：**每一个flex子项的宽度都是不固定的，列数不固定，怎样实现最后一行左对齐。

方法一：最后一项margin-right:auto

~~~javascript
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
/*每一个fles子项的宽度不固定*/
.list {
    background-color: skyblue;
    margin: 10px;
}
/* 最后一项margin-right:auto */
.list:last-child {
    margin-right: auto;
}
~~~

方法二：创建伪元素并设置flex:auto或flex:1

~~~javascript
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
/*每一个fles子项的宽度不固定*/
.list {
    background-color: skyblue;
    margin: 10px;
}
/* 使用伪元素辅助左对齐 */
.container::after {
    content: '';
    flex: auto;    /* 或者flex: 1 */
}
~~~

**问题描述：**如果每一行的列数不固定，怎样实现最后一行左对齐？

方法：利用和最多列数相等的高度为0空白标签进行占位。

问题描述：如果列数不固定HTML又不能调整。

方法：使用Grid布局，Grid布局天然有gap间隙，且天然格子对齐排布，因此，实现最后一行左对齐可以认为是天生的效果。

~~~javascript
.container {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 10px;
}
.list {
    width: 100px; height:100px;
    background-color: skyblue;
    margin-top: 5px;
}
~~~

**方法点评：**

首先最后一行需要左对齐的布局更适合使用CSS grid布局实现，但是，函数兼容性有些要求，IE浏览器并不支持。如果项目需要兼容IE，则此方法需要斟酌。然后，适用范围最广的方法是使用空的元素进行占位，此方法不仅适用于列表个数不固定的场景，对于列表个数固定的场景也可以使用这个方法。但是有些人代码洁癖，看不惯这种空的占位的html标签，则可以试试一开始的两个方法，一是动态计算margin，模拟两端对齐，另外一个是根据列表的个数，动态控制最后一个列表元素的margin值实现左对齐。

### flex布局实现只有一行文字时，文字居中显示，多行文字时左对齐。

~~~javascript
  .li{
    width:  190px;
    height: 200px;
    background: skyblue;
    margin-top: 10px;
    /* 利用flex布局中，justify-content属性可以控制子项的水平对齐方式 */
    display: flex;
    justify-content:center;
  }

  <div class="li">我是一行内容</div>
  <div class="li">我是多行内容，我是多行内容，我是多行内容，我是多行内容，</div>
~~~

### flex三栏布局，中间自适应

~~~javascript
<template>
<div class="flex">
  <div class="father">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {}
  },
}
</script>
<style scoped>
.father{
  width:600px;
  height:500px;
  border: 1px solid red;
  display:flex;
  overflow: auto;
}
.left,.right{
  max-width: 200px;
  background:red;
  flex-shrink: 0;/**超出容器宽度时不收缩 */
}
.center{
  background:yellow;
  flex:1; /**占容器剩余空间的一份 */
  overflow: hidden;/**防止内容过多，元素被撑开 */
}
</style>
~~~

**方法点评：**利用flex的布局方式，给左边和右边的子项目设置超出容器宽度时不收缩（flex-shrink：0），给中间的子项目设置占满剩余空间和防止内容过多时，元素被撑开（flex:1；overflow: hidden）就能实现中间根据两侧内容自适应的效果。

### flex布局切换子项目时实现平滑的过渡效果

~~~javascript
<template>
<div class="flex">
  <button @click="show('one')">点击1</button>
  <button @click="show('two')">点击2</button>
  <button @click="show('three')">点击3</button>
  <div class="home">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods:{
    show(val){
      const d = document.querySelectorAll('.'+val)[0] // 选择滚动元素
      const dom = d.parentNode //选择滚动元素的父元素
      dom.scrollTo({
        left: d.offsetLeft,
        behavior: 'smooth'
      })
    }
  },
}
</script>
<style scoped>
.home{
  width:600px;
  height:500px;
  border: 1px solid red;
  display:flex;
  overflow: auto;
  position:relative;
}
.one,.two,.three{
  border:1px solid black;
  /*占剩余空间的1份、 超出容器宽度时的收缩比列(0是不收缩)、占容器的100% */
  /* flex:1 0 100%;  */
  flex-basis:100%;
  flex-grow: 1;
  flex-shrink: 0;
  box-sizing: border-box;
}
.one{
  background:pink;
}
.two{
  background:blue;
}
.three{
  background:skyblue;
}
</style>
~~~

**方法点评：**（1）给容器设置position:relative;利用flex的布局方式，给每一个子项目设置（ flex:1 0 100%），保证子项目和容器的大小一致，缩小容器时不进行收缩，容器有剩余时占一份；（2）点击切换子项目时，选中需要滚动的元素即子项目，然后选中滚动的父元素即容器，利用dom.scrollTo(）的方法让其平缓的滚动到对应的位置。

# 踩过的坑

**问题描述：**::before和::after的content属性如果是中文的话，有的浏览器会发生乱码

**解决方法：**把中文转化为unicode码

# 资源

重置浏览器默认样式：CSS Reset和Normalize.css

