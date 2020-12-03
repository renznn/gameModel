const { ccclass, property } = cc._decorator;
/**
 * 通用 ListView 组件.
 * 能够显示垂直/横向ListView. 具体用法见Demo
 */
@ccclass
export default class ListView extends cc.Component {
  @property(cc.Node)
  itemTemplate: cc.Node = null;

  @property(cc.ScrollView)
  scrollView: cc.ScrollView = null;
  @property
  spawnCount = 0;
  @property
  totalCount = 0;
  @property
  spacing = 0;
  @property
  bufferZone = 0;

  content = null;

  items = null;

  updateTimer = 0;

  updateInterval = 0;
  lastContentPosY = 0;

  // use this for initialization
  onLoad() {
    this.content = this.scrollView.content;
    this.items = []; // array to store spawned items
    this.initialize();
    this.updateTimer = 0;
    this.updateInterval = 0.2;
    this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
  }

  initialize() {
    this.content.height =
      this.totalCount * (this.itemTemplate.height + this.spacing) +
      this.spacing; // get total content height
    for (let i = 0; i < this.spawnCount; ++i) {
      // spawn items, we only need to do this once
      let item = cc.instantiate(this.itemTemplate);
      this.content.addChild(item);
      item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
      item.getComponent('Item').initItem(i, i);
      this.items.push(item);
    }
  }

  getPositionInView(item) {
    // get item position in scrollview's node space
    let worldPos = item.parent.convertToWorldSpaceAR(item.position);
    let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
    return viewPos;
  }

  update(dt) {
    this.updateTimer += dt;
    if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
    this.updateTimer = 0;
    let items = this.items;
    let buffer = this.bufferZone;
    let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
    let offset = (this.itemTemplate.height + this.spacing) * items.length;
    for (let i = 0; i < items.length; ++i) {
      let viewPos = this.getPositionInView(items[i]);
      if (isDown) {
        // if away from buffer zone and not reaching top of content
        if (viewPos.y < -buffer && items[i].y + offset < 0) {
          items[i].y = items[i].y + offset;
          let item = items[i].getComponent('Item');
          let itemId = item.itemID - items.length; // update item id
          item.updateItem(itemId);
        }
      } else {
        // if away from buffer zone and not reaching bottom of content
        if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
          items[i].y = items[i].y - offset;
          let item = items[i].getComponent('Item');
          let itemId = item.itemID + items.length;
          item.updateItem(itemId);
        }
      }
    }
    // update lastContentPosY
    this.lastContentPosY = this.scrollView.content.y;
  }

  scrollEvent(sender, event) {
    switch (event) {
      case 0:
        cc.log('Scroll to Top');
        break;
      case 1:
        cc.log('Scroll to Bottom');
        break;
      case 2:
        cc.log('Scroll to Left');
        break;
      case 3:
        cc.log('Scroll to Right');
        break;
      case 4:
        cc.log('Scrolling');
        break;
      case 5:
        cc.log('Bounce Top');
        break;
      case 6:
        cc.log('Bounce bottom');
        break;
      case 7:
        cc.log('Bounce left');
        break;
      case 8:
        cc.log('Bounce right');
        break;
      case 9:
        cc.log('Auto scroll ended');
        break;
    }
  }

  addItem() {
    this.content.height =
      (this.totalCount + 1) * (this.itemTemplate.height + this.spacing) +
      this.spacing; // get total content height
    this.totalCount = this.totalCount + 1;
  }

  removeItem() {
    if (this.totalCount - 1 < 30) {
      cc.error("can't remove item less than 30!");
      return;
    }

    this.content.height =
      (this.totalCount - 1) * (this.itemTemplate.height + this.spacing) +
      this.spacing; // get total content height
    this.totalCount = this.totalCount - 1;

    this.moveBottomItemToTop();
  }

  moveBottomItemToTop() {
    let offset = (this.itemTemplate.height + this.spacing) * this.items.length;
    let length = this.items.length;
    let item = this.getItemAtBottom();

    // whether need to move to top
    if (item.y + offset < 0) {
      item.y = item.y + offset;
      let itemComp = item.getComponent('Item');
      let itemId = itemComp.itemID - length;
      itemComp.updateItem(itemId);
    }
  }

  getItemAtBottom() {
    let item = this.items[0];
    for (let i = 1; i < this.items.length; ++i) {
      if (item.y > this.items[i].y) {
        item = this.items[i];
      }
    }
    return item;
  }

  scrollToFixedPosition() {
    this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
  }
}

// 数据绑定的辅助适配器
export abstract class AbsAdapter {
  private dataSet: any[] = [];

  public setDataSet(data: any[]) {
    this.dataSet = data;
  }

  public getCount(): number {
    return this.dataSet.length;
  }

  public getItem(posIndex: number): any {
    return this.dataSet[posIndex];
  }

  public _getView(item: cc.Node, posIndex: number): cc.Node {
    this.updateView(item, posIndex);
    return item;
  }

  public abstract updateView(item: cc.Node, posIndex: number);
}
