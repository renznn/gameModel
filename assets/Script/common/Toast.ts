// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import utils from '../utils/utils';

@ccclass
export default class Toast extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property(cc.RichText)
  richText: cc.RichText = null;
  // LIFE-CYCLE CALLBACKS:
  @property(cc.Sprite)
  icon: cc.Sprite = null;

  @property(cc.Node)
  login: cc.Node = null;

  @property(cc.Label)
  loginText: cc.Label = null;

  onLoad() {
    this.node.opacity = 0;
  }

  start() {}

  showBox(msg: string, time, type) {
    this.login.active = type == 4;
    this.label.node.active = type == 1;
    this.richText.node.active = type == 2 || type == 3;
    type == 3 &&
      (this.richText.horizontalAlign = cc.macro.TextAlignment.CENTER);
    this.icon.node.active = type == 2;
    type == 1 && (this.label.string = msg);
    type == 4 && (this.loginText.string = msg);
    (type == 2 || type == 3) && (this.richText.string = msg);

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

export function showMsgBox(msg, time = 1, type = 1, isCenter: boolean = false) {
  //   cc.log(msg, time, type, isCenter);
  utils.res.load('./Prefabs/Toast', (prefab) => {
    // console.log(prefab);
    if (prefab) {
      let node = cc.instantiate(prefab);
      cc.director.getScene().addChild(node);
      node.setPosition(
        cc.winSize.width / 2,
        isCenter ? cc.winSize.height / 2 : cc.winSize.height / 10
      );
      node.getComponent(Toast).showBox(msg, time, type);
    }
  });
}
