/**
 *
 * @function formateMoney
 * @description 格式化钱 ( $ _ $ )
 * @param {number | string} num -- 金额
 * @return {string}
 * @date: 2020-11-27 16:45:39
 *
 * @example
 * 例子：
 * ```
 * utils.string.formateMoney(100000)  //100,000
 * ```
 */
function formateMoney(num?: number | string): string {
  if (!num) return '0';
  num = `${num}`;
  return String(num.replace(/(\d)(?=(\d{3})+$)/g, '$1,'));
}

/**
 *
 * @function formateUsername
 *
 * @description 用户名隐藏
 *
 * @param {string} name -- 用户名
 * @param {number} length -- 长度
 * @return {string}
 * @date: 2020-11-27 16:50:07
 *
 * @example
 * 例子：
 * ```
 * utils.string.formateUsername('此处用户名6个字') // 此处用户**
 * ```
 */
function formateUsername(name: string, length: number = 4): string {
  name = String(name);
  if (name === '' && /^-+$/.test(name)) {
    return '--';
  }
  const re = new RegExp(`^([\x00-\xff]{7}|[^\x00-\xff]{${length}}|.{5}).+$`);
  return name.replace(re, '$1**');
}

/**
 *
 * @function intToStr
 *
 * @description 整形转换为指定位数字符串
 *
 * @param {number} num -- 数字
 * @param {number} count -- 位数
 * @return {string}
 * @date: 2020-11-27 16:42:19
 *
 * @example
 * 例子：
 * ```
 * ```
 */
function intToStr(num: number, count: number = 2): string {
  var result: string = num.toString();
  for (var i: number = 0; i < count - num.toString().length; i++)
    result = '0' + result;

  return result;
}

/**
 *
 * @function labelTxtOverFunc
 *
 * @description 文本过长隐藏 (cocos 指定)
 *
 * @param {cc.Label} label -- label节点
 * @param {string} s -- 字符串
 * @param {string} char -- 缺省符号
 * @return {}
 * @date: 2020-11-27 16:43:11
 *
 * @example
 * 例子：
 * ```
 * ```
 */
function labelTxtOverFunc(
  label: cc.Label = null,
  s: string = '',
  char: string = '.'
) {
  if (!label) {
    return;
  }
  // s = s+"1234856978941"
  let fontNum = (label.node.width / label.fontSize) * 2 - 4;
  let len = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 127 || s.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
    if (len >= fontNum) {
      s = s.slice(0, i) + char.repeat(3);
      break;
    }
  }
  label.string = s;
  // console.log(label.node.width, label.fontSize, fontNum)
}

export default { formateMoney, formateUsername, intToStr, labelTxtOverFunc };
