# 一个简单的store模式

~~~javascript
<template>
  <div class="vuex">
    <button @click="change">改变</button>
    <p>{{title}}</p>
  </div>
</template>
<script>
import store from './state.js'
export default {
  data () {
    return {
      state:store.state
    }
  },
  computed: {
    title(){
      return this.state.message
    }
  },
  methods: {
    change(){
     store.setMessageAction('改变message了吖吖')
    }
  }
}
</script>
<style lang="sass">
</style>
~~~

~~~javascript
export default {
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    this.state.message = newValue
  },
  clearMessageAction () {
    this.state.message = ''
  }
}
~~~

总结：声明一个store的js文件来统一管理这些数据。

# vuex的使用步骤---以frontRegister.js为例

## vuex模块化的目录结构

![1572313850423](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-1.png)

## main.js全局引入vuex

~~~javascript
import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import '@/my-theme/element-variables.scss'
import '@/styles/main.scss'
import 'swiper/dist/css/swiper.css'
import App from './App'
import store from './store'  //dh:引入store
import router from './router'
import globals from './config/config'
import * as filters from './config/filters'
import sortList from './components/Sequencer/sequencer'
import throttle from './components/Throttle/throttle'
import delayBills from './components/DelayBills/delayBills'

Vue.use(ElementUI)
Vue.use(delayBills)
Vue.config.productionTip = false
Vue.prototype.sortList = sortList
Vue.prototype.throttle = throttle

new Vue({
  el: '#app',
  router,
  store, //	dh:全局注册store
  template: '<App/>',
  components: { App }
})
~~~

![1572314561042](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-2.png)

第一步：在store的modules文件夹下新建**frontRegister.js**文件

第二步：在store的index文件加入**frontRegister**模块

~~~javascript
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tagsView from './modules/tagsView'
import menu from './modules/menu'
import getters from './getters'
import rptCollect from './modules/rptCollect'
import frontRegister from './modules/frontRegister' //dh:引入模块

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    tagsView,
    menu,
    rptCollect,
    frontRegister//dh:注入模块
  },
  getters
})

export default store
~~~

![1572314918015](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-3.png)

第三步：在store/modules/frontRegister.js里面写state、getters、mutations、actions方法

state：vuex的数据、除state外，getters、mutations、actions都是在vuex上都是全局的，    可以直接使用。 state是分模块化的不能直接使用。

getters：类似于计算属性，可以随时监听到state的变化

mutations：修改vuex里的state数据唯一的方法（只能写同步方法，不能写异步代码）

actions:不能修改vuex的数据，包裹mutaions，使之可以异步，每个action里面必须至少有一个mutation的方法（比如：请求接口是异步的，需放在action里面）

具体的使用方法如下

~~~javascript
import {
  judgeAlternative,
  totalPrice,
  getCombo
} from '@/api/frontRegister.js' //dh：接口api文件，可以忽略
import { Message } from 'element-ui' //dh:使用element-ui中的弹窗组件
:
const frontRegister = {
  state: { //dh:state数据
    instituteId: '', // 检线id
    reservationInfo: [], // 预约单列表
    newReservationInfo: { // 当前正在编辑的一张预约单
      certype: '', // 类型
      examuser: '', // 姓名
      idType: '', // 身份证类型
      idNumber: '', // 身份证号码
      married: '', // 婚姻状况
      sex: '', // 性别
      birthday: '', // 出生日期
      telephone: '', // 手机号码
      cardNumber: '', // ikang卡号
      password: '', // ikang密码---未知
      examNumber: '', // 体检号-----登记页面传递
      otherCardId: '', // 第三方卡
      sendType: '', // 寄送方式----未知
      reportAddress: '', // 寄送地址
      preRemark: '', // 前台备注---未知
      backRemak: '' // 后台备注----未知
    },
    reservationInfoIndex: -1, // 预约单列表的index
    comboSelectList: [], // 套餐列表
    comboSelectPackageCodePresent: -1, // 当前套餐PackageCode
    project: {}, // 项目信息
    checkItemList: [], // 套餐下检查项目列表
    comboAddItemList: [], // 套餐加项包列表
    addItemList: [], // 加项列表
    addItemPriceList: [], // 修改价格之后的加项列表
    certype: 0, // 客户信息中的客户类型
    examInformAtionData: {// 体检流程及套餐信息数据
      memo: '', // 备注信息-----预约单
      otherOptions: ['卡主人'], // 其它选项
      packagename: '', // 基本套餐----套餐
      seller: localStorage.loginInfo &&      				JSON.parse(localStorage.loginInfo).id, // 销售人员---套餐
      addPrice: 0,
      addPay: 0,
      photoflag: false,
      quickreportflag: false,
      sellerflag: true
    },
    searchPositionItemList: [] // 搜索定位列表数据
  },
  mutations: {//dh:mutations方法
    changeInstituteId (state, id) { // 初始化检线id
      state.instituteId = id
    },
    changeReservationInfo (state, data) { // 初始化预约单列表
      state.reservationInfo = data
    },
    changeNewReservationInfo (state, item) { // 修改预约单中未保存的信息
      Object.assign(state.newReservationInfo, item)
    },
    changeReservationInfoIndex (state, index) { // 改变预约单的index(选择预约单)
      state.reservationInfoIndex = index
      if (index !== -1) {
        state.newReservationInfo = Object.assign({}, state.reservationInfo[state.reservationInfoIndex])
        state.examInformAtionData.memo = state.reservationInfo[state.reservationInfoIndex].memo
      }
    },
    changeComboSelectList (state, data) { // 初始化项目套餐列表信息
      const {
        packageInfos,
        ...project
      } = data
      state.comboSelectList = packageInfos || []
      state.project = project
    },
    changeComboSelectPackageCodePresent (state, packagecode) { // 改变当前套餐PackageCode
      state.comboSelectPackageCodePresent = packagecode
      let packageItem = state.comboSelectList.find(e => {
        return e.packagecode === state.comboSelectPackageCodePresent
      })
      if (packageItem) {
        let packagename = packageItem.packagename
        let seller = packageItem.sellerName
        state.examInformAtionData.seller = seller
        state.examInformAtionData.packagename = packagename
      }
    },
    changeCheckItemList (state, list) { // 改变套餐下检查项目列表
      state.checkItemList = list
    },
    changeComboAddItemList (state, list) { // 初始化套餐加项列表，
      const comboAddItemList = list.filter(e => { // 筛选套餐加项包列表加入到加项列表中
        return e.pselectType === 1 && e.selectType === 1
      })
      state.comboAddItemList = list
      state.addItemList = comboAddItemList // 初始化--调接口
    },
    changeAddItemList (state, list) { // 计算加项列表中价格
      state.addItemList = list
    },
    delAddItemList (state, index) { // 加项列表退项
      state.addItemList.splice(index, 1)
    },
    addAddItemList (state, additem) { // 加项列表加项
      state.addItemList.push(additem)
    },
    changeCertype (state, type) { // 改变客户类型并改变体检流程及套餐信息数据
      state.certype = type
      if (Number(type) === 6) { // 客户类型为入职，自动勾选拍照
        if (!state.examInformAtionData.otherOptions.includes('需要拍照')) {
          state.examInformAtionData.otherOptions.push('需要拍照')
        }
        if (!state.examInformAtionData.otherOptions.includes('急等报告')) {
          state.examInformAtionData.otherOptions.push('急等报告')
        }
        state.examInformAtionData.photoflag = state.examInformAtionData.quickreportflag = true
      } else {
        state.examInformAtionData.photoflag = state.examInformAtionData.quickreportflag = false
      }
      if (Number(type) === 5) { // 客户类型为散客，可选择销售人员
        state.examInformAtionData.sellerflag = false
      } else {
        state.examInformAtionData.sellerflag = true
      }
    },
    changeExamInformAtionData (state, formData) { // 改变体检流程及套餐信息数据
      state.examInformAtionData = formData
    },
    changeSearchPositionItemList (state, list) { // 初始化搜索定位列表
      state.searchPositionItemList = list
    },
    clearAll (state) { // 初始化数据
      Object.assign(state, {
        // instituteId: '', // 检线id
        reservationInfo: [], // 预约单列表
        newReservationInfo: { // 当前正在编辑的一张预约单
          certype: '', // 类型
          examuser: '', // 姓名
          idType: '', // 身份证类型
          idNumber: '', // 身份证号码
          married: '', // 婚姻状况
          sex: '', // 性别
          birthday: '', // 出生日期
          telephone: '', // 手机号码
          cardNumber: '', // ikang卡号
          password: '', // ikang密码---未知
          examNumber: '', // 体检号-----登记页面传递
          otherCardId: '', // 第三方卡
          sendType: '', // 寄送方式----未知
          reportAddress: '', // 寄送地址
          preRemark: '', // 前台备注---未知
          backRemak: '' // 后台备注----未知
        },
        reservationInfoIndex: -1, // 预约单列表的index
        comboSelectList: [], // 套餐列表
        comboSelectPackageCodePresent: -1, // 当前套餐PackageCode
        project: {}, // 项目信息
        checkItemList: [], // 套餐下检查项目列表
        comboAddItemList: [], // 套餐加项包列表
        addItemList: [], // 加项列表
        certype: 0, // 客户信息中的客户类型
        examInformAtionData: {
          memo: '', // 备注信息
          otherOptions: ['卡主人'], // 其它选项
          packagename: '', // 基本套餐
          seller: localStorage.loginInfo && JSON.parse(localStorage.loginInfo).id, // 销售人员
          addPrice: 0,
          addPay: 0,
          photoflag: false,
          quickreportflag: false,
          sellerflag: true
        }, // 体检流程及套餐信息数据
        searchPositionItemList: [] // 搜索定位列表数据
      })
    }
  },
  getters: {//dh:getters方法
    GetReservationInfoOrder: state => { // 选中的预约单,没有选中返回undefined
      return state.reservationInfo[state.reservationInfoIndex]
    },
    ReservationInfoOrderCount: state => { // 预约单的数量
      return state.reservationInfo.length
    },
    GetReservationInfoPackageCode: state => { // 选中的预约单packagecode
      if (!state.reservationInfo[state.reservationInfoIndex]) return
      return state.reservationInfo[state.reservationInfoIndex].packagecode
    },
    GetComboSelectListInfo: state => { // 选中的套餐详情 没有选中返回undefined
      return state.comboSelectList.find(e => {
        return e.packagecode === state.comboSelectPackageCodePresent
      })
    }
  },
  actions: { //dh:actions方法
    getComboSelectList ({// 获取套餐下拉列表
      state,
      getters,
      commit
    }) {
      let order = getters.GetReservationInfoOrder
      let params = {
        servicetype: order ? order.servertype : '', // 服务类型
        hospId: state.instituteId, // 检线id
        cardNumber: order ? order.cardNumber : state.newReservationInfo.cardNumber, // 爱康卡号
        mainOrderId: order ? order.orderId : '' // 主订单号
      }
      return getCombo(params)
        .then((respose) => {
          let data = respose.data
          if (data.results && data.results.packageInfosRootResponse) {
            console.log('选中的套餐信息=>', data.results.packageInfosRootResponse)
            commit('changeComboSelectList', data.results.packageInfosRootResponse)
            let packagecode = getters.GetReservationInfoPackageCode
            if (!packagecode) {
              if (data.results.packageInfosRootResponse.packageInfos && data.results.packageInfosRootResponse.packageInfos.length > 0) {
                packagecode = data.results.packageInfosRootResponse.packageInfos[0].packagecode
              } else {
                packagecode = -1
              }
            }
            commit('changeComboSelectPackageCodePresent', packagecode)
          }
        })
    },
    pingZhang ({
      state,
      getters,
      commit
    }) { // 平账加计算全部完成
      const arr = state.addItemList
      let comboInfo = getters.GetComboSelectListInfo
      let combo = { // 套餐整理
        code: comboInfo.packagecode === 0 ? '' : comboInfo.packagecode,
        id: comboInfo.packageid,
        itemType: 2, // 2 基础套餐项目 1 加项包项目 4 单一加项项目
        chargeType: comboInfo.chargetype,
        operator: localStorage.loginInfo && JSON.parse(localStorage.loginInfo).id,
        exchangeAble: comboInfo.packagechgflag === 0 ? 1 : comboInfo.packagechgflag === 1 ? 2 : comboInfo.packagechgflag === 2 ? 5 : null,
        itemVersion: comboInfo.version
      }
      let packages = arr.filter(e => {
        return e.addOrigin === 1
      }).map(e => {
        return e.packageId
      }) // 把所有的加项包的packageid找出来
      let newpackages = Array.from(new Set(packages)).map(e => {
        let bag = arr.filter(z => { // 把属于同一个packageid的检查项找出来
          return e === z.packageId
        })
        let checkitems = bag.map(e => {
          return {
            itemCode: e.code,
            itemStatus: 1
          }
        })
        return { // 加项包参数整理
          addItemDiscount: bag[0].rebate, // ????
          chargeType: bag[0].chargetype,
          code: bag[0].packagecode,
          exchangeAble: bag[0].addreturnpro,
          id: bag[0].packageId,
          itemType: 1, // 2 基础套餐项目 1 加项包项目 4 单一加项项目 ???
          itemVersion: bag[0].packageVersion, // 加项包版本
          operator: bag[0].sellerId,
          packageType: 1, // 项目外加项包？？？
          valuationWay: bag[0].valuationway, // 是否整包定价,1为整包计价，2为累计计价
          checkitems: checkitems
        }
      })
      let single = arr.filter(e => {
        return e.addOrigin === 4
      }) // 把所有的单一加项找出来
      let newsingle = single.map(e => {
        return { // 单一加项参数整理
          addItemDiscount: e.rebate,
          changeType: 1,
          code: e.code,
          itemType: 4,
          operator: e.sellerId,
          chargeType: e.chargetype,
          whetherDiscount: e.whetherDiscount
        }
      })
      let params = {
        cardBlockId: '',
        cardNumber: state.newReservationInfo.cardNumber,
        instituteId: state.instituteId,
        orderId: getters.GetReservationInfoOrder ? getters.GetReservationInfoOrder.orderId : '',
        // 订单类型 1：主订单 2：补充订单 4:换套餐对充单 ,?????如果换了套餐4？？？
        orderType: !getters.GetReservationInfoOrder ? 1 : getters.GetReservationInfoOrder.packagecode === comboInfo.packagecode ? 2 : 4,
        pkgs: [combo, ...newpackages, ...newsingle]
      }
      return totalPrice(params)
        .then(({
          data
        }) => {
          if (data.results && data.results.lines && data.results.receives) {
            // 加项原价、加项应收
            let old = data.results.lines.slice(1)
            let now = data.results.receives.slice(1)
            let oldPrice = 0
            let nowPrice = 0
            old.forEach(item => {
              oldPrice += item.markerPrice * 100
            })
            now.forEach(item => {
              nowPrice += item.payMoney * 100
            })
            commit('changeExamInformAtionData', {
              ...state.examInformAtionData,
              addPrice: oldPrice / 100,
              addPay: nowPrice / 100
            })
            // 加项列表反填
            let obj = {}
            old.forEach(e => {
              e.checkitems.forEach(a => {
                a.addItemDiscount = e.addItemDiscount
                obj[a.id] = a
              })
            })
            let addItemList = state.addItemList
            addItemList = addItemList.map(e => {
              return {
                ...e,
                rebate: obj[e.id].addItemDiscount ? obj[e.id].addItemDiscount : e.rebate,
                marketPrice: obj[e.id].marketPrice,
                rebatePrice: obj[e.id].salePrice
              }
            })
            commit('changeAddItemList', addItemList)
          }
        })
    },
    addAddItemList ({ // 双击加项、加项互斥判断（接口的code=1 && 检查项目里没有该项 &&加项列表里没有该项）
      commit,
      dispatch,
      state
    }, additem) {
      let params = {
        checkItemId: [additem.code],
        instituteId: state.instituteId,
        packageId: additem.comboId
      }
      let isExist1 = state.addItemList.find(element => {
        return element.id === additem.id
      })
      let isExist2 = state.checkItemList.find(element => {
        return element.name === additem.name // 没有code,id为null,暂时用name代替
      })
      if (!isExist1 && !isExist2) {
        return judgeAlternative(params)
          .then(response => {
            let data = response.data
            if (data.code === 1) {
              commit('addAddItemList', additem)
              dispatch('pingZhang')
              return Promise.resolve()
            } else {
              return Promise.reject(data.message)
            }
          })
      } else {
        Message.error('此项目在套餐或者加项列表中已存在，请勿重复添加')
      }
    }
  }
}

export default frontRegister
~~~



1、以instituteId为例介绍vuex里的state、getters、mutations、actions的使用方法（同步，不涉及actions）

（1）vue组件里需要修改instituteId

![1572316752127](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-4.png)

（2）vue组件需要使用instituteId

![1572317046889](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-5.png)

2、以comboSelectList为例介绍vuex里的state、getters、mutations、actions的使用方法（接口强求异步，涉及actions）

（1）state里定义

![1572317599495](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-6.png)

（2）mutaions里定义修改该值的方法

![1572317654522](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-7.png)

（3）通过action包裹mutation修改该值的方法

![1572317695435](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-8.png)

![1572317861709](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-9.png)

（4）在vuex组件里调用mutation方法----commit（不涉及异步代码，直接修该值的情景）

​		  在vue组件里调用action方法---dispatch（涉及异步代码，需要传参请求接口，根据后台数据修改改值的情景）

![1572318776790](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-10.png)

（5）补充computed计算属性（可以忽略不看）

![1572319010558](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-11.png)

computed和wacth的区别：computed不能在data里定义，浅监听（监听一层），内部不能调取接口，性能损耗少；watch需在data里挂载（data里定义、props传过来的值、computed的值），深监听（监听多层），内部可以调取接口，性能损耗大；一般可以用computed解决的不推荐使用watch

![1572319567524](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-12.png)

3、getters的使用

![1572319943850](https://minio.lihuiwang.net/notes/notes/2023/09/10/vuex-13.png)

4、 mapState、mapGetters、mapMutations 、 mapActions辅助函数

~~~javascript
methods: {
    ...mapMutations({
        changeMessage:'setMessageAction'// 将 this.changeMessage()`映射为 this.$store.commit('setMessageAction')
    }),
    change(){
        this.changeMessage('hhhh')
    }
}
~~~

~~~javascript
methods: {
    ...mapMutations([
        'setMessageAction'// 将 this.setMessageAction()`映射为 this.$store.commit('setMessageAction')
    ]),
    change(){
        this.setMessageAction('hhhh')
    }
}
~~~

5、模块化加命名空间

~~~javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 关键代码开始
import one from './one'
import two from './two'
// 关键代码结束

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'Hello!'
  },
  mutations: {
    setMessageAction (state,newValue) {
      state.message = newValue
    }
  },
  actions: {
  },
  // 关键代码开始
  modules: {
    one,
    two
  }
  // 关键代码结束
})
~~~

~~~javascript
const one = {
  // 关键代码开始
  namespaced: true,
  // 关键代码结束
  state: {
    version:'1'
  },
  mutations: {
    changeVersion(state,value){
      state.version=value
    }
  },
  actions: {

  }
}
export default one
~~~

~~~javascript
<template>
  <div class="vuex">
    <button @click="change">改变</button>
    <p>{{title}}</p>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    title(){
      return this.$store.state.one.version
    }
  },
  methods: {
    ...mapMutations(
      // 关键代码开始
      {setMessageAction:'one/changeVersion'}
      // 关键代码开结束
    ),
    change(){
      this.setMessageAction('hhhh')
    }
  }
}
</script>
<style lang="sass">
</style>
~~~



## vuex数据持久化

vuex优势：相比sessionStorage，存储数据更安全，sessionStorage可以在控制台被看到。

vuex劣势：在F5刷新页面后，vuex会重新更新state，所以，存储的数据会丢失。

 解决刷新后数据会消失：可以结合本地存储做到数据持久化，也可以通过插件-vuex-persistedstate

**1.手动利用HTML5的本地存储**

vuex的state在localStorage或sessionStorage或其它存储方式中取值 在mutations,定义的方法里对vuex的状态操作的同时对存储也做对应的操作。这样state就会和存储一起存在并且与vuex同步

**2.利用vuex-persistedstate插件**

```javascript
npm install vuex-persistedstate --save
```

在store下的index.js中

```javascript
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
 // ...
 plugins: [createPersistedState()]
})
```

**想要存储到sessionStorage，配置如下**

```javascript
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
 // ...
 plugins: [createPersistedState({
  storage: window.sessionStorage
 })]
})
```

**想使用cookie同理**

默认持久化所有state

**指定需要持久化的state,配置如下**

```javascript
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
 // ...
 plugins: [createPersistedState({
  storage: window.sessionStorage,
  reducer(val) {
   //val = {
    //   user: {},
    //   tagsView: {},
    //   menu: {},
    //   rptCollect: {},
    //   frontRegister: {},
    //   addItem: {},
    //   readConfig: {},
    //   offsetWidth: 0
  	// }
   return {
   // 只储存state中的readConfig
      readConfig: val.readConfig
  }
  }
 })]
```

**vuex引用多个插件的写法**

譬如：vuex提示的插件和持久化的插件一起使用，配置如下

```javascript
import createPersistedState from "vuex-persistedstate"
import createLogger from 'vuex/dist/logger'
// 判断环境 vuex提示生产环境中不使用
const debug = process.env.NODE_ENV !== 'production'
const createPersisted = createPersistedState({
 storage: window.sessionStorage
})
export default new Vuex.Store({
  state: {
    offsetWidth: 0
  },
  mutations: {
    changeOffsetWidth (state, num) {
      state.offsetWidth = num
    }
  },
  modules: {
    user,
    tagsView,
    menu,
    rptCollect,
    frontRegister,
    addItem,
    readConfig
  },
 plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
})
```

plugins要是一个一维数组不然会解析错误

#### API:

createPersistedState([options])使用给定的选项创建插件的新实例。可以提供以下选项来配置您的特定需求的插件：

key <String>：存储持久状态的键。（默认：vuex）

paths <Array>：部分持续状态的任何路径的数组。如果没有路径给出，完整的状态是持久的。（默认：[]）

reducer <Function>：一个函数，将被调用来基于给定的路径持久化的状态。默认包含这些值。

subscriber <Function>：一个被调用来设置突变订阅的函数。默认为store => handler => store.subscribe(handler)

storage <Object>：而不是（或与）getState和setState。默认为localStorage。

getState <Function>：将被调用以重新水化先前持久状态的函数。默认使用storage。

setState <Function>：将被调用来保持给定状态的函数。默认使用storage。

filter <Function>：将被调用来过滤将setState最终触发存储的任何突变的函数。默认为() => true