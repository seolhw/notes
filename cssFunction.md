## 前后伪类

~~~javascript
 div:before{
          content: '';
          width: 4px;
          height: 4px;
          display: inline-block;
          background: #3F94FC;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          position: relative;
          top: -2px;
          right: 2px;
   }
~~~

说明：div前面加个小圆点。

## css的计算属性

~~~javascript
width: calc(100% - 210px - 60px);
~~~

## 禁止点击样式

~~~javascript
cursor: not-allowed;//禁止点击
cursor:point;//变手形
cursor：help;//变问号
user-select: none//不允许选择复制
~~~

## 过渡和动画

**过渡只是从开始到结束变化**

~~~javascript
<body>
    <p>盒子的多个属性一起动画: width, height, background-color, transform. 将光标悬停在盒子上查看动画。</p>
    <div class="box"></div>
</body>
~~~

~~~javascript
.box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 100px;
    height: 100px;
    background-color: #0000FF;
    -webkit-transition:width 2s, height 2s,
        background-color 2s, -webkit-transform 2s;
    transition:width 2s, height 2s, background-color 2s, transform 2s;
}
.box:hover {
    background-color: #FFCCCC;
    width:200px;
    height:200px;
    -webkit-transform:rotate(180deg);
    transform:rotate(180deg);
}
~~~

说明：盒子的多个属性一起动画: width, height, background-color, transform. 将光标悬停在盒子上查看动画。

```css
transition: <property> <duration> <timing-function> <delay>
transition：属性 过渡时间  过渡函数 延迟时间
```

## 修改滚动条样式：

```javascript

<style>
    .innerbox{
      height: 500px;
      overflow-y: scroll;
    }
    .innerbox::-webkit-scrollbar {
      width: 6px;
      background: rgba(117, 180, 253, 0.2);
      box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(1, 69, 132, 0.5);
      border-radius: 4px;
    }
      /*全部滚动条样式设置*/
    .innerbox::-webkit-scrollbar-track {
      background-color: transparent;
    }
    /*活跃滚动条样式*/
    .innerbox::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: rgba(138, 191, 253, 1);
      box-shadow: 0px 1px 3px 0px rgba(44, 47, 49, 0.4);
    }
    /*滚动条的上下两端的按钮*/
    .innerbox::-webkit-scrollbar-button {
      height: 0px;
    }
    li{
      height: 100px;
    }
    /*
    ::-webkit-scrollbar — 整个滚动条.
    ::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头).
    ::-webkit-scrollbar-thumb — 滚动条上的滚动滑块.
    ::-webkit-scrollbar-track — 滚动条轨道.
    ::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分.
    ::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分.
    ::-webkit-resizer — 某些元素的corner部分的部分样式(例:textarea的可拖动按钮).
    */
  </style>

	<ul class="innerbox">
      <li>加大开发框架</li>
      <li>计划的接口是否</li>
      <li>的机会是德国</li>
      <li>偶iuiui话剧户籍</li>
      <li>的设计课程的数据库</li>
      <li>的设计课程的数据库</li>
      <li>的设计课程的数据库</li>
      <li>的设计课程的数据库</li>
      <li>的设计课程的数据库</li>
      <li>的设计课程的数据库</li>
      <li>的设计课程的数据库</li>
      <li>的设计课程的数据库</li>
    </ul>
```

##  input框实现点点点点，划过显示全部文字

~~~javascript
<input type="text" value="123" class="ctl" onmouseover="this.title=this.value">
.ctl{
    color: red;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space: nowrap;
    padding:2px
    }
~~~

## 媒体查询

~~~javascript
//在不同的屏幕宽度，input框展示不同的宽度
.userSearch {
  /deep/ .el-form-item__label {
    color: #000000;
  }
  .el-select,
  .el-input {
    @media screen and (max-width:1028px){ //屏幕宽度在1028之下
     width: 500px;
    }
    @media screen and (min-width:1028px) and (max-width:1800px){//屏幕宽度在1028-1800之间
     width: 200px;
    }
    @media screen and (min-width:1800px) {//屏幕宽度在1800之上
  ，
  }
  /deep/ .word_limit {
    .el-input__inner {
      padding-right: 54px;
    }
  }
}
~~~

## 实现水平布局以及垂直对齐

### 行内块

~~~javascript
  ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 400px;
      font-size: 0;//解决行内块元素换行增加空格问题
    }

    li {
      display: inline-block;
      width: 25%;
      box-sizing: border-box;
      border: 1px solid red;
      text-align: center;
      font-size: 16px;
    }
~~~

### 浮动

~~~javascript
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 400px;
      overflow: hidden;
    }

    li {
      width: 25%;
      box-sizing: border-box;
      border: 1px solid red;
      text-align: center;
      font-size: 16px;
      float: left;
    }
~~~

### 表格显示模式

~~~javascript
ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 400px;
      display: table;
      table-layout: fixed;//列宽由第一行决定
    }
li {
      width: 25%;
      box-sizing: border-box;
      border: 1px solid red;
      vertical-align: middle;
      font-size: 16px;
      display: table-cell;
    }
~~~

###　flex布局

~~~javascript
  ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 400px;
      display: flex;
    }

    li {
      width: 25%;
      box-sizing: border-box;
      border: 1px solid red;
      text-align: center;
      font-size: 16px;
      flex: 1;
    }
~~~

总结：浮动需要清除浮动，以及在被之前更高的浮动元素卡住时，可能会头痛；行内块元素有空白符问题，但可以解决；表格显示模式，仅支持不会换行的内容，无法给它们应用外边距；Flexbox可能会更简单一点；

## 通过css获取元素的定位信息和宽高等信息

1、获取浏览器的宽高：window.innerHeight/window.innerWidth

2、 获取某个元素相对于视窗的位置集合 ：el.getBoundingClientRect().top

3、获取某个元素的style属性：window.getComputedStyle(page)

4、获取某个元素被卷起来的高度：el.scrollTop()/el.scrollLeft()

5、鼠标的坐标：e.clientX/clientY

## 设置属性

1、e.setAttribute('data-id', (i + 1))

## 修改元素的样式属性

1、el.style.setProperty('height','0px')

## 小技巧

- 想让行内块元素沿上方对齐，设置verttical-align：top
- 想要两个元素的内容垂直对齐，先把它们都转化为行内快，再对它们应用vertical-algin:middle;
- 行内块元素换行造成的空白问题，1、不换行；2、给包裹的父元素设置font-size:0,然后在每个行内块元素上重新设置字体大小；3、利用table属性布局，给包裹的父元素设置display:table,table-layout：fixed（列宽不再是自动的，由表格的第一行决定，如果显示不完会折行或者益处）给行内块元素设置display:table-cell
- 容器里只有一个元素时，并想要元素居中，只要将容器设置为flex，再将需要居中的元素外边距设置为margin:auto;