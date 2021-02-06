// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseComponent from '../common/BaseComponent';
import { showDialog } from '../common/dialog';
import resource from '../common/resource';
import { showMsgBox } from '../common/showMsgBox';
import utils from '../utils/utils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends BaseComponent {
  // LIFE-CYCLE CALLBACKS:

  /* 事件列表 */
  eventList = [['show-message-box', this.showMessageBox]];

  onLoad() {
    /* 
      预加载资源 
      callback加载进度
      一般在加载页使用
    */
    // utils.res.loadResList(resource, (progress) => {
    //   console.log(progress);
    // });

    /* 退出是释放当前界面加载的资源 */
    // utils.res.releaseResList(resource);

    /* 注册所有监听事件 */
    this.registerAllCustomEvents(this.eventList);
    /* 注册node下所有button按钮点击事件 */
    this._registerAllBtnClickEvent(this.node);
  }

  /* 
  节点下所有按钮点击事件监听返回
  以节点名字作文区分
   */
  _onJsonBtnClickEvent(sender) {
    if (sender && sender.node) {
      /* 节点名字 */
      const name = sender.node.name;
      switch (name) {
        case 'messagebox':
          this.onBtnClickMessageBox();
          break;
        case 'dialog':
          this.onBtnClickDialog();
          break;
        default:
          break;
      }
    }
  }

  start() {
    let node = utils.node.findByName('dialog', this.node);
    /* 隐藏节点 */
    this.show(node, false);
    /* 1S后显示 */
    this.scheduleOnce(() => {
      this.show(node);
    }, 1);
    /* 节点创建 */
    this.inistantiantPrefab(this.node, resource.smiple);

    /* 资源加载 */
    utils.res.load(resource.smiple, (prefab) => {
      if (prefab) {
        /* 资源释放 */
        utils.res.release(resource.smiple, () => {});
      }
    });

    /* 图片加载替换 以及删除 */
    utils.res.load(resource.miaonei, (texture) => {
      if (texture) {
        const node = utils.node.findByName('demo', this.node);
        const sprite = node.getComponent(cc.Sprite);
        const spriteFrame = new cc.SpriteFrame(texture);
        spriteFrame.addRef();
        sprite.spriteFrame = spriteFrame;

        // 删除spriteFrame
        // spriteFrame.decRef();
        // spriteFrame = null;
      }
    });
  }

  onBtnClickMessageBox() {
    /* 事件触发 */
    this.dispatchEvent('show-message-box');
  }

  showMessageBox(event) {
    /* 显示toast */
    showMsgBox('呀哈哈哈');
  }

  onBtnClickDialog() {
    /* 显示对话框 */
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
