// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.ProgressBar)
  bar: cc.ProgressBar = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    // this.bar.progress = 0.8;
  }

  update(dt) {
    this.fakeLoading();
  }

  fakeLoading() {
    if (this.bar.progress < 1.0) {
      this.bar.progress += Math.random() * 0.08;
    } else {
      cc.director.preloadScene('game', () => {
        cc.director.loadScene('game');
      });
    }
  }
}
