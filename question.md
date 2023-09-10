# http、websokect

### http2.0



# js

### 事件循环

### 原型链

### 作用域

# node

### 事件循环

# Es6

1、权限系统设计：用户、角色、权限

常见的是RBACO模型（Role-Based Access Control：基于角色的访问控制。主要目的是对不同的人访问资源进行权限的控制，避免因权限控制缺失或操作不当引发的风险问题。

~~~javascript
// 替换路由
router.matcher = new Router({
   routes: constantRouterMap
}).matcher
router.addRoutes(routes)
// 刷新页面、重新请求路由权限、添加路由
router.onReady(() => {
  if () {
      store.dispatch('getMenuData')
      .then(() => {
          router.addRoutes(store.state.menu.newItems)
      })
  }
})
~~~

### Vue

~~~javascript
data() {
      return {
         a:0,
         b:0
      }
   },
   watch{
      a(){
         this.b=1
      }

   },
   mounted() {
      this.a=1
      consolo.log(a,b)
   },
~~~

测试使用哦 124

~~~javascript
moment(contractDate[0]).format('YYYY-MM-DD');
      const startTimeDate = new Date(startTime)
      const endTimeDate = new Date(startTime)
      endTimeDate.setMonth(endTimeDate.getMonth() + val)
      const year = endTimeDate.getFullYear() - startTimeDate.getFullYear()
      if (endTimeDate.getMonth() + 12 * year - startTimeDate.getMonth() > val) {
        // 跨月的情况下，设置setDate(0)，来返回到上个月的最后一天，这是产品的逻辑，
        // 比如1月31号起租，租期一个月，则止租日期为2月28号，直接设置setDate + 1，会导致跨月问题，故作此逻辑
        endTimeDate.setDate(0)
      } else {
        endTimeDate.setDate(endTimeDate.getDate() - 1)
      }
      console.log(moment(endTimeDate).format('YYYY-MM-DD'))
      const data = [moment(startTime), moment(endTimeDate)]
~~~

