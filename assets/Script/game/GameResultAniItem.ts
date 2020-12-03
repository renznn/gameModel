// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import utils from '../utils/utils';

@ccclass
export default class GameResultAniItem extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  updateView(data: any, pos: number) {
    console.log(pos, data);

    utils.res.load(`./img/item${data}`, (data) => {
      let sprite = this.node.getComponent(cc.Sprite);
      //   console.log(pos, data);
      sprite && (sprite.spriteFrame = new cc.SpriteFrame(data));
    });
  }

  // update (dt) {}
}
