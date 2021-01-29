// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import utils from '../utils/utils';
import PopLayer from './PopLayer';
import resource from './resource';

const { ccclass, property } = cc._decorator;

/**
 *  @class Dialog
 *  @extends PopLayer
 *  @classdesc  对话框
 */
@ccclass
export default class Dialog extends PopLayer {
  /**
   * @property {cc.Label} tips -- 对话框文本
   * @memberof Dialog
   */
  @property(cc.Label)
  tips: cc.Label = null;

  /**
   * @property {Function} sureCallback -- 确定按钮回调
   * @memberof Dialog
   */
  sureCallback: Function = null;

  /**
   * @property {Function} cancelCallback -- 取消按钮回调
   * @memberof Dialog
   */
  cancelCallback: Function = null;

  public updateView(msg: string, sureCb?: Function, cancelCb?: Function) {
    msg && (this.tips.string = msg);
    this.sureCallback = sureCb;
    this.cancelCallback = cancelCb;
  }

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  onBtnClickSure() {
    if (this.sureCallback) {
      this.sureCallback();
    }
    this._onDestory();
  }

  onBtnClickCanel() {
    // console.log('canca');
    this.cancelCallback && this.cancelCallback();
    this._onDestory();
  }

  onBtnClickClose() {
    this._onDestory();
  }

  // update (dt) {}
}

/**
 *
 * @function showDialog
 * @description 显示对话框
 * @param {string} msg -- 对话框信息
 * @param {Function} sureCb -- 确认回调
 * @param {Function} cancelCb -- 取消回调
 * @return {}
 * @date: 2021-01-29 19:02:22
 *
 * @example
 *```
 *showDialog(
      'this is a dialog',
      () => {
        console.log('sure');
      },
      () => {
        console.log('cancel');
      }
    );
 *```
 */
export function showDialog(
  msg: string,
  sureCb?: Function,
  cancelCb?: Function
) {
  if (!msg) {
    return;
  }
  utils.res.load(resource.dialog, (prefab) => {
    // console.log(prefab);
    if (prefab) {
      let node = cc.instantiate(prefab);
      cc.director.getScene().addChild(node, 2000);
      node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
      node.getComponent(Dialog).updateView(msg, sureCb, cancelCb);
    }
  });
}
