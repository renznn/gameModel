/**
 * 基于本地存储的缓存模块
 *
 * @param {String} key 键名
 * @param {any} data 数据
 * @param {Number} expires 有效期(秒), 0永久
 * @returns {any}
 *
 * 使用例子：
 * cacheStore('aaa', { a: 1 }); // 永久存储
 * cacheStore('bbb', { b: 2 }, 3); // 存储3秒
 * cacheStore('bbb', ''); // 删除存储
 *
 * setTimeout(function() {
 *   console.log(cacheStore('aaa'), cacheStore('bbb')); // {a: 1} {b: 2}
 * }, 1000);
 *
 * setTimeout(function() {
 *   console.log(cacheStore('aaa'), cacheStore('bbb')); // {a: 1} undefined
 * }, 4000);
 * todo // 只存储一次 取出来就删除 once('');
 */
function cacheStore(key, data?, expires = 0) {
  let localStorage = cc.sys.localStorage;
//   console.log(key, data, expires);
  // 不兼容返回空
  if (!localStorage) {
    return undefined;
  }

  var now = +new Date(); // 当前时间戳

  // 有值则存储数据
  if (data) {
    var storeData = {
      data: data,
      expires: 0 // 有效期
    };

    if (expires) {
      storeData.expires = now + expires * 1000; // 到期时间戳
    }

    // 无法存入情况
    try {
      return localStorage.setItem(key, JSON.stringify(storeData));
    } catch (er) {
      // 不做处理统一返回
    }
  } else {
    if (data === '') {
      localStorage.removeItem(key);
    } else {
      // 获取数据
      try {
        let storeData = JSON.parse(localStorage.getItem(key));

        if (storeData.expires === 0 || now <= storeData.expires) {
          return storeData.data;
        }
        return localStorage.removeItem(key); // 清理过期数据
      } catch (er) {
        // 不做处理统一返回
      }
    }
  }

  return undefined;
}

export default cacheStore;
