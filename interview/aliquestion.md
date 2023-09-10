```js
/**
 * 找出数组中第k大和第m大的数字相加之和
 * 说明：实现一个方法，找出数组中第k大的和第m大的数字相加之和
 * 示例：
 *   let arr = [1,2,4,4,3,5], k = 2, m = 4
 *   findTopSum(arr, k, m); // 第2大的数是4，出现2次，第4大的是2，出现1次，所以结果为10
 */
function findTopSum(arr, k, m) {
  /** 代码实现 */
}


/**
 * 按条件合并相邻项
 * 说明：实现一个方法，可将数组中相邻的项按条件合并
 * 示例：
 *   adjoin([1, 2, 3, 4, 5], item => item !== 3); // [[1, 2], 3, [4, 5]]
 *   adjoin([1, 2, 3, 4], item => item < 3); // [[1, 2], 3, 4]
 */
function adjoin(arr, condition) {
  /* 代码实现 */
}



/**
 * 实现一个EatMan
 * 说明：实现一个EatMan，EatMan可以有以下一些行为
 * 示例：
 *  1. EatMan(“Hank”)输出:
 *   Hi! This is Hank!
 *  2. EatMan(“Hank”).eat(“dinner”).eat(“supper”)输出
 *   Hi This is Hank!
 *   Eat dinner~
 *   Eat supper~
 *  3. EatMan(“Hank”).eat('dinner').eatFirst(“lunch”)输出
 *   Eat lunch~
 *   Hi This is Hank!
 *   Eat supper~
 *  4. EatMan(“Hank”).eat('dinner').eatFirst(“lunch”).eatFirst("breakfast")输出
 *   Eat breakfast~
 *   Eat lunch~
 *   Hi This is Hank!
 *   Eat supper~
*/

function EatMan(name){
　　return new _eatman(name);
}
function _eatman(name) {
 /** 代码实现 */
}
```
