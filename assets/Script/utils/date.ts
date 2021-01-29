declare type DateType = string | number | Date;

class DateFunc {
  private _time: Date;

  constructor(value?: DateType) {
    if (value) {
      this._time = new Date(value);
    } else {
      this._time = new Date();
    }
  }

  /**
   *
   * @function formate
   * @description 时间格式化
   * @param {string} fmt -- 格式
   * @return {string} 格式时间
   * @date: 2021-01-29 16:15:46
   *
   * @example
   *```
   * utils.date().formate('yyyy-MM-dd hh:mm:ss') // 2021-01-29 16:19:56
   *```
   */
  formate(fmt?: string): string {
    if (!fmt) {
      fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    var o = {
      'M+': this._time.getMonth() + 1, //月份
      'd+': this._time.getDate(), //日
      'h+': this._time.getHours(), //小时
      'm+': this._time.getMinutes(), //分
      's+': this._time.getSeconds(), //秒
      'q+': Math.floor((this._time.getMonth() + 3) / 3), //季度
      'S+': this._time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (this._time.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return fmt;
  }

  getTime(): number {
    return this._time.getTime();
  }

  getTimeName(): string {
    let hour = this._time.getHours();
    if (hour < 6) return '凌晨';
    else if (hour < 9) return '早上';
    else if (hour < 12) return '上午';
    else if (hour < 14) return '中午';
    else if (hour < 17) return '下午';
    else if (hour < 19) return '傍晚';
    else if (hour < 22) return '晚上';
    else return '深夜';
  }
}

/**
 *
 * @function date
 * @description 时间函数
 * @param {DateType} value -- 时间字符串|时间戳|日期
 * @date: 2020-11-27 16:39:08
 *
 * @returns {DateFunc}
 *
 * @example
 * ```
 * utils.date(1567991349000).getTime()
 * utils.date().formate('dd hh')
 * utils.date(1567991349000);
 * utils.date('2019-09-09 09:09:09');
 * utils.date(new Date());
 * ```
 */

function date(value?: DateType): DateFunc {
  return new DateFunc(value);
}

export default date;
