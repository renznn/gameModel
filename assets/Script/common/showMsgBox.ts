// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import utils from '../utils/utils';
import resource from './resource';

/**
 *  @class MessageBox
 *  @extends cc.Component
 *  @classdesc  消息提示框
 */
@ccclass
export default class MessageBox extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  onLoad() {
    this.node.opacity = 0;
  }

  start() {}

  showBox(msg: string, time: number) {
    cc.tween(this.node)
      .by(0.5, { position: cc.v3(0, 50), opacity: 255 })
      .start();
    this.scheduleOnce(() => {
      cc.tween(this.node)
        .by(0.5, { position: cc.v3(0, 50), opacity: -255 })
        .call(() => {
          this.node.removeFromParent();
          this.destroy();
        })
        .start();
    }, time);
  }

  update(dt) {}
}

/**
 *
 * @function showMsgBox
 * @description 显示消息提示框
 * @param {string} msg -- 消息
 * @param {number} time -- 显示的事件
 * @param {boolean} isCenter -- 是否显示在中间
 * @return {}
 * @date: 2021-01-29 18:44:47
 *
 * @example
 *```
 *showMsgBox('this is message box');
 *```
 */
export function showMsgBox(msg: string, time = 1, isCenter: boolean = false) {
  if (!msg) {
    return;
  }
  utils.res.load(resource.message, (prefab) => {
    if (prefab) {
      let node = cc.instantiate(prefab);
      cc.director.getScene().addChild(node, 3000);
      node.setPosition(
        cc.winSize.width / 2,
        isCenter ? cc.winSize.height / 2 : cc.winSize.height / 10
      );
      node.getComponent(MessageBox).showBox(msg, time);
    }
  });
}
