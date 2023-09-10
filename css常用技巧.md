### Css

- pointer-events:none，css属性，使元素忽略鼠标事件，让事件直接冒泡到下一层，用来解决input的disabled 属性造成无法点击也不能冒泡的情况，水印在浮在页面上，导致遮盖不能点击的问题, 阻止所有事件

- outline:none，css属性，消除input框获取焦点时的黄色边框；

- table-layout:fixed，css属性，用在table上，规定列宽由表格设定而非单元格内容；

- overflow: hidden;text-overflow:ellipsis;white-space: nowrap，css属性，强制单行单行文本，超过显示...；

- 接上一条，给其父盒子加上min-width: 0;，解决white-space: nowrap自动撑大盒子的问题

- position:absolute;top:50%;left:5直水平居中（绝对居中）；

- top:calc((100% - 70px) / 2);css3计算属性，可以计算css；

- transparent，css颜色值，透明，使用方式color:transparent；

- text-align: justify;css属性，文本两端对齐，但该属性不会处理最后一行，当文本只有一行时属于最后一行，不处理，此时使用text-align-last: justify;

- cursor: pointer;css属性，鼠标滑过变小手；

- width:100%;height:100%;transform:translate(-50%,-50%);text-glign:center;css属性，实现元素的垂直居中；

- targe.scrollIntoView();dom方法，回到顶部，此方法接受一个bool参数，默认为true，回到顶部，false回到底部；

- text-decoration:underline;css属性，给文本添加下划线，这个属性还还可以添加删除线，上划线等等；

- object-fit: cover;h5的video标签的属性，cover表示，保持原有比例，覆盖视频，可能会造成一些内容不可见；fill，拉伸视频，使之充满，不保持原有比例；contain，包含，保持原有比例，可能会出现黑边空白；

- resize: none；去掉了多行文本框的拖拽效果；

- word-wrap:break-word; 英文和数字进行折行

- :not(.is-disabled); css的not选择器，过滤掉含有某个class的元素

- content: ''attr(data-username)'';   content: ''attr(id)'';   css3attr函数动态获取html标签属性

- user-select: none; css属性，设置文字不可选中，不可复制

- letter-spacing: 2px; css属性，设置文字的字间距

- scroll-behavior: smooth;给body和html设置这个css属性，可以实现锚点的平滑滚动效果

- word-break: break-all; 设置强制换行，用来解决英文单词太长不自动换行的问题

- white-space: pre; 设置div解析换行符

- position: sticky; 吸顶效果

- -webkit-overflow-scrolling:touch; IOS平滑滚动

- background: linear-gradient(transparent 96%, black); 设置背景渐变

-  background-size: 100% 40px; 设置背景图片大小

- background-repeat:no-repeat; 设置背景图片是否重复

-  background-attachment: local;属性决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment

  ```
  fixed
  ```

  此关键属性值表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。

  ```
  local
  ```

  此关键属性值表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动， 并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含他们的边框。

  ```
  scroll
  ```

  此关键属性值表示背景相对于元素本身固定， 而不是随着它的内容滚动（对元素边框是有效的）

- 示例如下

  ![](https://minio.lihuiwang.net/notes/notes/2023/09/10/3.png)

     ```javascript
   .el-textarea {
      height: 400px;
      border: solid 1px;
      background: #ddd;
      padding: 20px;
    }
    .el-textarea__inner {
      line-height: 40px;
      background: linear-gradient(transparent 96%, black);
      background-size: 100% 40px;
      background-attachment: local;
      border: none;
      box-shadow: none;
    }
     ```

  

