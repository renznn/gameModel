// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Canvas extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.opacity = 0;
    cc.tween(this.node).to(1, { opacity: 255 }).start();
  }

  start() {}

  // update (dt) {}

  onDestroy() {
    this.node.opacity = 255;
    cc.tween(this.node).to(1, { opacity: 0 }).start();
  }
}
