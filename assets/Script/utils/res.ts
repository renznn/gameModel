import nodeFunc from './node';

/**
 *
 * @function loadRes 加载资源
 *
 * @param {string} path -- 路径
 * @param {Function} callback -- 回调
 * @return {}
 * @date: 2020-11-27 16:51:57
 *
 * 例子：
 */
function loadRes(path: string, callback: Function = null) {
  cc.loader.loadRes(path, (error, data) => {
    if (error) return console.error(error);
    callback(data);
  });
}

/**
 *
 * @function loadImg 动态改变img
 *
 * @param {cc.Node} node -- 节点
 * @param {string} path -- 路径
 * @param {Function} callback -- 回调
 * @return {}
 * @date: 2020-11-27 16:52:57
 *
 * 例子：
 */
function loadImg(node: cc.Node, path: string, callback: Function = null) {
  cc.loader.loadRes(path, (err, data) => {
    if (err) return console.error(err);

    node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(data);
    if (callback) callback(node);
  });
}

/**
 *
 * @function loadUrlImg 动态加载远程img
 *
 * @param {cc.Node} node -- 节点
 * @param {string} url -- 地址
 * @param {string} type -- 图片类型
 * @return {}
 * @date: 2020-11-27 16:54:16
 *
 * 例子：
 */
function loadUrlImg(node: cc.Node, url: string, type: string = 'png') {
  cc.loader.load({ url: url, type: type }, (err, data) => {
    node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(data);
  });
}

/**
 *
 * @function loadPrefab 动态加载pref
 *
 * @param {cc.Node} parent -- 节点
 * @param {string} path -- 路径
 * @param {Function} callback -- 回调
 * @param {cc.Vec2} position -- 坐标
 * @param {number} freeTime -- 消失时间
 * @return {}
 * @date: 2020-11-27 16:56:26
 *
 * 例子：
 */
function loadPrefab(
  parent: cc.Node,
  path: string,
  callback: Function = null,
  position: cc.Vec2 = cc.Vec2.ZERO,
  freeTime: number = 0
) {
  loadRes('prefabs/' + path, (data) => {
    var child: cc.Node = cc.instantiate(data);

    child.setPosition(position);
    if (parent) parent.addChild(child);

    if (callback) callback(child);
    this.fade_in(child, 0.1);
    if (freeTime > 0)
      setTimeout(() => {
        nodeFunc.fade_out(child, 0.1, true);
      }, freeTime * 1000);
  });
}

/**
 *
 * @function playMovie 动态加载播放动画
 *
 * @param {cc.Node} node -- 节点
 * @param {string} path -- 路径
 * @return {}
 * @date: 2020-11-27 16:58:39
 *
 * 例子：
 */
function playMovie(node: cc.Node, path: string) {
  //console.log(sound);
  // var url = cc.url.raw("resources/mp3/baojing.mp3");
  // cc.audioEngine.play("resources/sounds/"+sound+".mp3",false,1);
  loadRes('prefabs/' + path, (data) => {
    var animation: cc.Animation = node.getComponent(cc.Animation);
    if (animation == null) var animation = node.addComponent(cc.Animation);
    animation.addClip(data);
    animation.defaultClip = data;
    animation.play();
  });
}

let res = {};

function load(path: string, callback?: Function) {
  if (!path) return cc.error('no path');
  // cc.log(res);
  if (res[path]) return (callback && callback(res[path])) || res[path];

  cc.resources.load(path, (err, data) => {
    if (err) {
      cc.log(err);
      return false;
    }
    res[path] = data;
    // cc.log('--', res);
    callback && callback(data);
  });
}

export default { loadRes, loadImg, loadUrlImg, loadPrefab, playMovie, load };
