// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import config from '../common/config';

import { showMsgBox } from '../common/Toast';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCountDown extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property(cc.ProgressBar)
  bar: cc.ProgressBar = null;

  time: number = 0;

  intervalTime = 1;

  isShowMsgBox = false;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.time = config.remianTime;
    this.intervalTime = 1;
    this.updateLabel();
  }

  update(dt) {
    if (this.intervalTime >= 0) {
      this.intervalTime -= dt;
    } else {
      this.intervalTime = 1;
      this.time -= 1;
      this.updateLabel();
    }
  }

  updateLabel() {
    if (this.time >= 0) {
      this.label.string = `正在投资${this.time} 天`;
      this.bar.progress = (config.remianTime - this.time) / config.remianTime;
      if (this.time <= 3 && !this.isShowMsgBox) {
        showMsgBox('投资即将终止', 3, 1, true);
        this.isShowMsgBox = true;
      }
    } else {
    }
  }
}
