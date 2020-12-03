const { ccclass, property } = cc._decorator;

import utils from '../utils/utils';

import config from '../common/config';

import { showMsgBox } from '../common/Toast';

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Label)
  txtMoney: cc.Label = null;

  @property(cc.Label)
  txtLastResult: cc.Label = null;

  moreArea: cc.Node = null;

  onLoad() {}

  start() {
    // this.updateLastResult();
    // this.updateMoney();
  }

  updateMoney() {
    this.txtMoney && (this.txtMoney.string = `${config.money}`);
  }

  updateLastResult() {
    this.txtLastResult &&
      (this.txtLastResult.string = `上月最佳:${config.lastResult}`);
  }

  onBtnClickMore() {
    if (!this.moreArea) {
      utils.res.load('./Prefabs/MoreArea', (prefab) => {
        if (prefab) {
          this.moreArea = cc.instantiate(prefab);
          this.node.addChild(this.moreArea);
          this.moreArea.setPosition(
            (300 / 750) * cc.winSize.width,
            (385 / 1334) * cc.winSize.height
          );
        }
      });
    } else {
      this.moreArea.active = !this.moreArea.active;
    }
  }

  onBtnClearClick() {
    config.betList.fill(0);
    let node = utils.node.findByName('GameArea', this.node);
    // console.log(config.betList);
    node.children.forEach((item) => {
      item.getComponent('GameBtnBet').updateBtnStatus();
    });
  }
}
