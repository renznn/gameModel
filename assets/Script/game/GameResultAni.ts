// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import ListView, { AbsAdapter } from '../common/ListView';

import GameResultAniItem from './GameResultAniItem';

import utils from '../utils/utils';

class ListAdapter extends AbsAdapter {
  updateView(item: cc.Node, posIndex: number) {
    let comp = item.getComponent(GameResultAniItem);
    // console.log(comp);
    if (comp) {
      comp.updateView(this.getItem(posIndex), posIndex);
    }
  }
}

@ccclass
export default class GameResultAni extends cc.Component {
  @property(ListView)
  listView: ListView = null;

  list: number[] = [];

  _adapter = null;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.showAni();
  }

  showAni() {
    let list = utils.math.randArray(18, 0, 18);
    // console.log(this.list);
    if (this._adapter) {
      this._adapter.setDataSet(list);
      this.listView.notifyUpdate();
    } else {
      this._adapter = new ListAdapter();
      this._adapter.setDataSet(list);
      this.listView && this.listView.setAdapter(this._adapter);
    }
  }

  createRandomList() {}

  // update (dt) {}
}
