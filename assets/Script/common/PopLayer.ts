// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseComponent from './BaseComponent';

const { ccclass, property } = cc._decorator;

/**
 *  @class PopLayer
 *  @extends BaseComponent
 *  @classdesc  弹出层基类
 */
@ccclass
export default abstract class PopLayer extends BaseComponent {
  /**
   * @abstract
   * @description 渲染当前弹出界面
   * @param {*} []
   * @memberof PopLayer
   */
  public abstract updateView(...[]);

  _onDestory() {
    let temp = this.node;
    temp.removeFromParent();
    temp.destroy();
  }

  clickBack() {
    // this._onDestory()
  }

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this.loadResource();
  }

  touchStart(e) {
    // console.log(e)
    e.stopPropagation();
  }

  /**
   * @description 触摸屏蔽添加
   *
   * @memberof PopLayer
   */
  touchEnd(e) {
    //判断是否在界面外
    //this.node替换成对应的判断node
    if (!this.node.getBoundingBoxToWorld().contains(e.getLocation())) {
      this.closePopLayer();
    }
    // console.log(e)
    e.stopPropagation();
  }

  /**
   *
   * @function closePopLayer
   * @description 子类重写此方法关闭弹出页
   * @date: 2021-01-29 18:49:26
   */
  closePopLayer() {
    console.log('close');
  }

  onDestroy() {
    this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  }
}
