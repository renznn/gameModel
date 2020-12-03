// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import PopLayer from '../common/PopLayer';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameAreaMore extends PopLayer {
  public updateView(...[]: any[]) {
    throw new Error('Method not implemented.');
  }
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  touchEnd(e) {
    console.log(e);
  }

  start() {}

  // update (dt) {}

  onBtnClickHistory() {
    console.log('click history');
  }

  onBtnClickRules() {
    console.log('click rules');
  }

  onBtnClickMusic() {
    console.log('click music');
  }
}
