# mongo shell批量生成数据

```javascript
/**
 * 生成随机姓名
 */
function getName() {
  let surname = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王"];
  let name = [
    "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
    "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
    "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
    "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
    "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
    "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
    "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
    "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
    "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
    "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
  ];
  return surname[randomNum(0,7)] + name[randomNum(0,100)];
}
/**
 * 生成随机手机号
 */
function getMoble() {
  var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
  var i = parseInt(10 * Math.random());
  var prefix = prefixArray[i];
  for (var j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10);
  }
  return prefix
}
/**
 * 生成随机性别
 */
function getGender() {
  let arr = ["男", "女", "未知"]
  return arr[randomNum(0, 2)]
}
/**
 * 生成随机数
 */
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      //或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
      break;
    default:
      return 0;
      break;
  }
}
/**
 * 生成UUID
 */
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
/**
 * 生成随机职业
 */
function getProfessional() {
  let arr = ["前端", "后端", "大数据", "算法", "AI", "UI", "测试", "PM"]
  return arr[randomNum(0, 7)]
}

let dataList = []
for (let index = 0; index < 1000000; index++) {
  dataList.push({
    name: getName(),
    age: Math.round(Math.random() * 100),
    gender: getGender(),
    employeesNumber: uuid(),
    professional: getProfessional(),
    salary: randomNum(10000, 100000),
    phone: getMoble()
  })
}

db.million.insert(dataList)

```

> 在mongo shell中可以执行js代码，通过js代码批量生成数据，需要注意的是执行过一次脚本后，shell会记住声明过的变量

