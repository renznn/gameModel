const _temp = [
  // 名字 倍率 图片地址
  ['农业', '1.95', 'img'],
  ['项目保险', '100', 'img'],
  ['工业', '1.95', 'img'],

  ['种植业', '3.9', 'img'],
  ['大豆', '11.7', 'img'],
  ['青菜', '11.7', 'img'],
  ['水稻', '11.7', 'img'],

  ['畜牧业', '3.9', 'img'],
  ['猪', '11.7', 'img'],
  ['羊', '11.7', 'img'],
  ['鸡', '11.7', 'img'],

  ['制造业', '3.9', 'img'],
  ['汽车', '11.7', 'img'],
  ['口罩', '11.7', 'img'],
  ['家具', '11.7', 'img'],

  ['建筑业', '3.9', 'img'],
  ['园林', '11.7', 'img'],
  ['房屋', '11.7', 'img'],
  ['桥梁', '11.7', 'img']
];

const config = {
  remianTime: 30,
  project: _temp,
  betRate: [0, 100, 1000, 10000, 100000],
  betChosen: 100,
  betList: new Array(18).fill(0),
  money: 0,
  lastResult: '火车',
  musicOn: true
};

cc.game.setFrameRate(60);
export default config;
