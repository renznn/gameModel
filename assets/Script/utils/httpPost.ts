import hex_md5 from './Md5';
import { post } from './ajax';
// import config from '../common/config';
import { showMsgBox } from '../common/showMsgBox';

const apiHost = 'http://amu.baoshixingqiu.com';
const key = 'f&*(dhgl189!nkj32789'; // 签名 key

export function signData(url, data, info) {
  const params = Object.assign(
    {},
    data,
    {
      //   versionCode: 1100,
      //   timestamp: 1586341719457,
      //   imei: utils.getIMEI() || '865166010162504',
      //   device: utils.getDeviceBrand() || 'google Pixel 2',
      //   appid: 2,
      //   sign: '',
      //   token: ''
    },
    info
  );

  const urlParams: { c: string; a: string } = { c: '', a: '' };
  url.replace(/^([^/]+)\/([^/]+)/, (m, c, a) => {
    urlParams.c = c;
    urlParams.a = a;
    return m;
  });

  // params.token = config.token;
  params.sign = hex_md5(
    urlParams.c +
      urlParams.a +
      params.timestamp +
      params.imei +
      params.device +
      key +
      params.token
  );
  return params;
}

const isDebugModel = false;
const debugSuperUserID = '17550216';

export const httpPost = (url: string, data: object = {}) => {
  //   const body = signData(url, data, {
  //     timestamp: Date.now(),
  //     imei: 865166010162504
  //   });
  const body = isDebugModel ? Object.assign(data, { debugSuperUserID }) : data;
  return post(`${apiHost}/${url}`, body, true).then((res: any) => {
    // cc.log(res);
    if (res.code == 301) {
      // todo 自动切换到登陆界面
      //   cc.director.loadScene('Login');
      // return Promise.reject(Error('ssss'));
    } else if (res.code === 10000) {
      return res;
    } else {
      showMsgBox(res.msg, 1, 1, true);
      return res;
    }
  });
};
