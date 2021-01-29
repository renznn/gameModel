// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseComponent from '../common/BaseComponent';
import { showDialog } from '../common/dialog';
import { showMsgBox } from '../common/showMsgBox';
import utils from '../utils/utils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends BaseComponent {
  // LIFE-CYCLE CALLBACKS:

  eventList = [['show-message-box', this.showMessageBox]];

  onLoad() {
    this.registerAllCustomEvents(this.eventList);
  }

  start() {
    const data = utils;
    console.log(data);
  }

  onBtnClickMessageBox() {
    this.dispatchEvent('show-message-box');
  }

  showMessageBox(event) {
    showMsgBox('呀哈哈哈');
  }

  onBtnClickDialog() {
    showDialog(
      'this is a dialog',
      () => {
        console.log('sure');
      },
      () => {
        console.log('cancel');
      }
    );
  }

  // update (dt) {}
}
