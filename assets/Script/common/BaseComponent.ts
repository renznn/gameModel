// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import utils from '../utils/utils';

const { ccclass, property } = cc._decorator;

/**
 *  @class BaseComponent
 *  @extends cc.Component
 *  @classdesc  基类
 */
@ccclass
export default class BaseComponent extends cc.Component {
  /**
   * @property {Array | null} _eventList -- 监听对象列表
   * @memberof BaseComponent
   */
  _eventList = null;

  /**
   * @property {Object} _create -- 对象创建列表
   * @memberof BaseComponent
   */
  _create = {};

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.loadResource();
  }

  start() {}

  /**
   *
   * @function loadResource
   * @description 加载资源
   * @date: 2021-01-29 18:01:00
   */
  loadResource() {
    // cc.log(this.node.getComponent(cc.Sprite))
    // this._registerAllBtnClickEvent(this.node);
    this._initWidget();
  }

  /**
   *
   * @function _initWidget
   * @description 初始化组件操作 -- 子类继承重写
   * @date: 2021-01-29 18:01:55
   */
  _initWidget() {}

  /**
   *
   * @function _registerAllBtnClickEvent
   * @description 注册指定节点下所有按钮点击事件
   *
   * @param {cc.Node} node -- 指定节点对象
   * @date: 2021-01-29 18:03:32
   */
  _registerAllBtnClickEvent(node?: cc.Node) {
    if (!node) {
      return;
    }
    let btn = node.getComponent(cc.Button);
    if (btn) {
      btn.node.on('click', this._onBtnClickCallback, this);
    }
    let arrayRootChidden = node.children;
    for (let i = 0; i < arrayRootChidden.length; i++) {
      this._registerAllBtnClickEvent(arrayRootChidden[i]);
    }
  }

  /**
   *
   * @function _onBtnClickCallback
   * @description 按钮点击事件回调
   * @param {*} sender -- 点击事件
   * @return {}
   * @date: 2021-01-29 18:04:41
   */
  _onBtnClickCallback(sender) {
    this._onJsonBtnClickEvent(sender);
  }

  /**
   *
   * @function _onJsonBtnClickEvent
   * @description 子控件重写此方法获取回调
   * @param {*} sender -- 点击事件
   * @date: 2021-01-29 18:05:37
   */
  _onJsonBtnClickEvent(sender) {}

  /**
   *
   * @function registerAllCustomEvents
   * @description 注册所有自定义事件
   * @param {array} array -- 注册事件列表
   * @date: 2021-01-29 18:06:41
   */
  registerAllCustomEvents(array: any[]) {
    this._eventList = this._eventList || [];
    // return;
    for (let i = 0; i < array.length; i++) {
      if (!array[i][0] || !array[i][1] || typeof array[i][1] !== 'function') {
        continue;
      }

      if (typeof array[i][0] !== 'string') {
        array[i][0] = String(array[i][0]);
      }

      this._eventList.push(array[i]);

      this.node.on(array[i][0], array[i][1], this);
    }
  }

  /**
   *
   * @function  unregisterAllCustomEvents
   * @description 注销所有自定义事件
   * @date: 2021-01-29 18:12:54
   */
  unregisterAllCustomEvents() {
    if (!this._eventList) {
      return;
    }
    this._eventList.forEach((element) => {
      this.node.off(element[0], element[1], this);
    });
    this._eventList = null;
  }

  /**
   *
   * @function dispatchEvent
   * @description 触发监听事件
   * @param {string} name -- 注册监听事件的名字
   * @param {any} data -- 传送的数据
   * @param {boolean} isBubbling -- 是否向上冒泡
   * @return {}
   * @date: 2021-01-29 18:14:27
   *
   * @example
   *```
   *this.dispatchEvent('show-layer')
   *```
   */
  dispatchEvent(name: string, data?: any, isBubbling = true) {
    const event = new cc.Event.EventCustom(name, isBubbling);
    if (data) {
      event.setUserData(data);
    }
    this.node.dispatchEvent(event);
  }

  //
  /**
   *
   * @function  show
   * @description 显示节点
   * @param {cc.Node} node -- 节点
   * @param {boolean} isShow -- 显示/小时
   * @param {Function} callBack -- 回调函数
   * @return {}
   * @date: 2021-01-29 18:16:30
   *
   * @example
   *```
   *
   *```
   */
  show(node: cc.Node, isShow: boolean, callBack?: Function) {
    if (!node) {
      return;
    }
    isShow ? utils.node.fade_in(node) : utils.node.fade_out(node, 0.3, false);
    if (callBack) callBack();
  }

  /**
   *
   * @function inistantiantPrefab
   * @description 创建节点
   * @param {cc.Node} node  -- 添加节点对象
   * @param {string} path   -- 创建对象的路径
   * @param {number} zIndex -- 层级
   * @param {Function} callback -- 回调函数
   * @memberof BaseComponent
   * @date: 2021-01-29 18:18:13
   */
  inistantiantPrefab(
    node: cc.Node,
    path: string,
    zIndex: number,
    callback?: Function
  ) {
    console.log(this);
    if (this._create[path]) {
      cc.log('防止重复创建');
      return;
    }
    this._create[path] = true;
    utils.res.load(path, (prefab) => {
      if (prefab) {
        const com = cc.instantiate(prefab);
        node.addChild(com, zIndex);
        this.show(com, true);
        this._create[path] = null;
        callback && callback(com);
      }
    });
  }

  onDisable() {}

  onDestroy() {
    this.unregisterAllCustomEvents();
  }

  update(dt) {}
}
