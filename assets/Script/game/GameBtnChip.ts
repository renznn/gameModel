// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import config from '../common/config';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameBtnChip extends cc.Component {
  @property
  type: number = 0;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {}

  start() {}

  // update (dt) {}

  onclick(event, data) {
    // console.log(data);
    config.betChosen = config.betRate[data];
    // console.log(config.betChosen);
  }
}
