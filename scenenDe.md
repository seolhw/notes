# 监听元素的滚动事件

第一步：设置样式

~~~javascript
 .el-table__body-wrapper{
      height: calc(87vh - 55px - 52px - 40px - 10px);
      overflow-y: auto; //竖向滚动条
      &::-webkit-scrollbar{
        display: none;//隐藏滚动条
      }
 }
~~~

第二步：在mounted生命周期里，监听元素的滚动高度

~~~javascript
const scrollElement = document.getElementsByClassName('el-table__body-wrapper')[0]
scrollElement.onscroll = () => {
     this.scrollTop = scrollElement.scrollTop//实时获取滚动条的高度
  }
~~~

思路：（1）把每个子元素顶部（min）和底部(max)距离滚动元素顶部的距离，存在每个渲染的对象里；（2）点击左侧悬浮小菜单（绑定的是每个渲染的对象），获取点击对象里的顶部高度(min)，赋值给滚动条；（3）滚动滚动条，判断滚动条的高度在那个对象的min-max范围内，动态显示。【可以computed里循环每个对象，检验滚动条的高度在那个对象的最小和最大高度范围内】【可以用动态class执行方法，检验滚动条的高度在那个对象的最小和最大高度范围内，返回true，否则返回false】