import platformInfo from './platform';
import date from './date';
import string from './string';
import cacheStorage from './storage';
import math from './math';
import sounds from './sounds';
import res from './res';
import node from './node';
import { httpPost } from './httpPost';
import url from './url';

/**
 *
 * @const utils
 * @description 工具类
 * @property {platformInfo} platformInfo 平台判断
 * @property {date} date 时间函数
 * @property {string} string 字符串处理
 * @property {cacheStorage} cacheStorage 存储函数
 * @property {math} math 数学函数
 * @property {sounds} sounds 声音处理
 * @property {res} res 资源处理
 * @property {node} node 节点处理
 * @property {httpPost} httpPost 网络请求
 * @property {url} url url处理
 * @date: 2021-01-29 16:21:54
 *
 * @example
 *```
 *
 *```
 */
const utils = {
  platformInfo,
  date,
  string,
  cacheStorage,
  math,
  sounds,
  res,
  node,
  httpPost,
  url
};
export default utils;
