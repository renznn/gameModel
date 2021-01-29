/**
 *
 * @const platformInfo
 * @description 平台类型
 *
 * @property {string} userAgent -- 用户平台
 * @property {boolean} isAndroid -- 判断android
 * @property {boolean} isIphone -- 判断iphone
 * @property {boolean} isIpad -- 判断pad
 * @property {boolean} isWeixin -- 判断微信
 * @date: 2021-01-29 16:36:43
 *
 * @example
 *```
 *  utils.platformInfo.isAndroid // true
 *```
 */
const platformInfo = {
  userAgent: () => navigator.userAgent.toLowerCase(),
  isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
  isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
  isIpad: Boolean(navigator.userAgent.match(/ipad/gi)),
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi))
};

export default platformInfo;
