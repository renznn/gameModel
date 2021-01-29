let sounds = [];

/**
 *
 * @function playSound 动态加载播放声音
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
 * @function stopMusic 停止音乐播放
 *
 * @param {}  --
 * @return {}
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
