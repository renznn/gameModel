/**
 *
 * @interface SoundInfo
 *
 * @description 音频资源对象
 * @property {number} id  -- 音频播放序列
 * @property {string} url -- 音频地址
 * @property {any} data   -- 音频资源
 * @property {number} play_time -- 时间戳
 * @property {boolean} isLoop -- 循环播放
 *
 */
interface SoundInfo {
  id: number;
  url: string;
  data: any;
  play_time: number;
  isLoop: boolean;
}

/**
 *  @var {Array} sounds
 *
 *  @description 音频资源缓存数组
 */
let sounds = [] as SoundInfo[];

/**
 *
 * @function playSound
 *
 * @description 动态加载播放声音
 *
 * @param {string} url -- 路径
 * @param {boolean} isLoop -- 是否循环
 * @return {}
 * @date: 2020-11-27 17:00:23
 *
 * 例子：
 */
function playSound(url: string, isLoop: boolean = false) {
  // url = 'sounds/' + url;

  var sound = sounds.find((r) => r.url == url);
  if (sound) {
    if (isLoop) return;
    if (new Date().getTime() - sound.play_time < 100) return;
    sound.play_time = new Date().getTime();
    return cc.audioEngine.play(sound.data, isLoop, 1);
  }

  cc.loader.loadRes(url, (err, data) => {
    //  var audio:cc.AudioSource= node.getComponent(cc.AudioSource);
    //  if(audio==null)
    var id = cc.audioEngine.play(data, isLoop, 1);
    sounds.push({
      id: id,
      url: url,
      data: data,
      play_time: new Date().getTime(),
      isLoop: isLoop
    });
  });
}

/**
 *
 * @function stopMusic
 *
 * @description 停止音乐播放
 *
 * @date: 2020-11-27 16:59:41
 *
 * 例子：
 */
function stopMusic() {
  var sound = sounds.find((r) => r.isLoop == true);
  // console.log('停止', sound);
  if (!sound) return;
  sounds.splice(sounds.indexOf(sound));
  cc.audioEngine.stop(sound.id);
}

export default { playSound, stopMusic };
