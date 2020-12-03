// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import config from '../common/config';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameBtnBet extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;
  // LIFE-CYCLE CALLBACKS:

  @property
  idx: number = 0;

  onLoad() {}

  start() {}

  // update (dt) {}
  onclick(event, data) {
    if (config.betList[this.idx]) {
      config.betList[this.idx] += config.betChosen;
    } else {
      config.betList[this.idx] = config.betChosen;
    }
    this.updateBtnStatus();
  }

  updateBtnStatus() {
    this.label.node.active = config.betList[this.idx] > 0;
    this.label.string = `${config.betList[this.idx]}`;
  }
}
