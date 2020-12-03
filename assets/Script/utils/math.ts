//获取两点角度
function getRotation(x1, y1, x2, y2): number {
  return (180 / Math.PI) * Math.atan2(y2 - y1, x2 - x1);
}

//根据两点获取长度
function getLength(x1, y1, x2, y2): number {
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}

//根据长度获取旋转点
function getAnglePoint(x1, y1, x2, y2, length) {
  var rotation = getRotation(x1, y1, x2, y2);
  var point: any = {};
  point.x = x1 + length * Math.cos((rotation * Math.PI) / 180); //(x2 - x1)*Math.cos(angle) - (y2 - y1)*Math.sin(angle) + x1 ;

  point.y = y1 + length * Math.sin((rotation * Math.PI) / 180); //(x2 - x1)*Math.sin(angle) + (y2 - y1)*Math.cos(angle) + y1 ;
  //console.log("x1:"+x1,"y1:"+y1,"x2:"+point.x,"y2:"+point.y);
  return point;
}
//根据长度获取旋转点
function getPointByRotation(x1, y1, rotation, length) {
  var point: any = {};
  point.x = x1 + length * Math.cos((rotation * Math.PI) / 180); //(x2 - x1)*Math.cos(angle) - (y2 - y1)*Math.sin(angle) + x1 ;

  point.y = y1 - length * Math.sin((rotation * Math.PI) / 180); //(x2 - x1)*Math.sin(angle) + (y2 - y1)*Math.cos(angle) + y1 ;
  //console.log("x1:"+x1,"y1:"+y1,"x2:"+point.x,"y2:"+point.y);
  return point;
}

//随机获取数组中内容
function randomArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
//随机获取整形
function randomInt(value) {
  return Math.floor(Math.random() * value);
}

// 生成随机数组
function randArray(len, min, max) {
  return Array.from(
    { length: len },
    (v) => Math.floor(Math.random() * (max - min)) + min
  );
}

export default {
  getRotation,
  getLength,
  getAnglePoint,
  getPointByRotation,
  randomArr,
  randomInt,
  randArray
};
