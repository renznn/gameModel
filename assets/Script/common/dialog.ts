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

@ccclass
export default class Dialog extends PopLayer {
  @property(cc.Label)
  tips: cc.Label = null;

  sureCallback: Function = null;

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

export function showDialog(
  msg: string,
  sureCb?: Function,
  cancelCb?: Function
) {
  //   cc.log(msg, time, type, isCenter);
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
