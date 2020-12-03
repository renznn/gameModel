let sounds = [];

/**
 *
 * @function playSound 动态加载播放声音
 *
 * @param {string} url -- 路径
 * @param {boolean} music -- 
 * @return {}
 * @date: 2020-11-27 17:00:23
 *
 * 例子：
 */
function playSound(url: string, music: boolean = false) {
  url = 'sounds/' + url;

  var sound = this.sounds.find((r) => r.url == url);
  if (sound) {
    if (music) return;
    if (new Date().getTime() - sound.play_time < 100) return;
    sound.play_time = new Date().getTime();
    return cc.audioEngine.play(sound.data, music, 1);
  }

  cc.loader.loadRes(url, (err, data) => {
    //  var audio:cc.AudioSource= node.getComponent(cc.AudioSource);
    //  if(audio==null)
    var id = cc.audioEngine.play(data, music, 1);
    this.sounds.push({
      id: id,
      url: url,
      data: data,
      play_time: new Date().getTime(),
      music: music
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
  var sound = this.sounds.find((r) => r.music == true);

  if (!sound) return;
  this.sounds.splice(this.sounds.indexOf(sound));
  cc.audioEngine.stop(sound.id);
}

export default { playSound, stopMusic };
