/**
 *
 * @function fade_out
 *
 * @description 淡出_释放
 *
 * @param {cc.Node} node -- 节点
 * @param {number} time -- 时常
 * @param {boolean} free -- 是否释放
 * @date: 2020-11-27 16:36:54
 *
 * 例子：
 */
function fade_out(node: cc.Node, time: number = 0.5, free: boolean = true) {
  node.stopAllActions();
  var action = cc.fadeOut(time);

  var finished = cc.callFunc(() => {
    if (free) node.destroy();
    else node.active = false;
  });
  action = cc.sequence(action, finished);
  node.runAction(action);
}

/**
 *
 * @function fade_in
 *
 * @description 淡入
 *
 * @param {cc.Node} node -- 节点
 * @param {number} time -- 时常
 * @date: 2020-11-27 16:33:33
 *
 * 例子：
 */
function fade_in(node: cc.Node, time: number = 0.5) {
  node.active = true;
  node.opacity = 0;
  var action = cc.fadeIn(time);
  node.runAction(action);
}

/**
 * @function findByName
 * @description 查找节点
 *
 * @param {string} name 节点名字
 * @param {cc.Node} ele 节点
 * @param {boolean} isChild 是否找子节点
 * @returns {cc.Node | null}
 *
 * 使用例子：
 * utils.node.findByName('name') // 遍历所有节点查找
 * utils.node.findByName('name', node) // 遍历node节点查找
 * utils.node.findByName('button', node, false) // 从node节点开始查找父节点
 */

function findByName(
  name: string,
  ele?: cc.Node,
  isChild: boolean = true
): cc.Node | null {
  if (!name) {
    return null;
  }
  if (!ele) {
    ele = cc.director.getScene();
  }
  if (ele.name && ele.name === name) {
    return ele;
  }
  if (isChild) {
    if (ele.children.length > 0) {
      for (let i = 0; i < ele.children.length; i += 1) {
        let node = findByName(name, ele.children[i]);
        if (node) {
          return findByName(name, ele.children[i]);
        }
      }
    }
  } else {
    let node = ele.getParent();
    if (node) {
      return findByName(name, node, false);
    }
  }
  return null;
}

export default { fade_out, fade_in, findByName };
