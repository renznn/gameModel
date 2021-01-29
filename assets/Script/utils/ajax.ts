import config from '../common/config';

interface AjaxOption {
  url: string;
  type?: 'POST' | 'GET';
  dataType?: 'text' | 'json';
  data?: string | { [k: string]: any };
}

function formatParams(data: object) {
  const arr: string[] = [];
  Object.keys(data).forEach((name) => {
    arr.push(`${name}=${encodeURIComponent((data as any)[name])}`);
  });
  return arr.join('&');
}

export function ajax(opts: AjaxOption) {
  let resolve: (value?: any) => void;
  let reject: (reason?: any) => void;

  const p = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const { url, type = 'GET', dataType = 'text', data = {} } = opts;

  let newUrl = url;

  const param = typeof data === 'string' ? data : formatParams(data);

  if (type === 'GET' && param) {
    newUrl += `${url.indexOf('?') > -1 ? '&' : '?'}${param}`;
  }

  // const xhr = new XMLHttpRequest();
  const xhr = cc.loader.getXMLHttpRequest();

  xhr.open(type, newUrl, true);

  xhr.setRequestHeader(
    'Content-Type',
    'application/x-www-form-urlencoded;charset=utf-8'
  );
  xhr.setRequestHeader('token', config.token);
  cc.sys.platform == cc.sys.WIN32 &&
    xhr.setRequestHeader(
      'User-Agent',
      'Cocos%20Simulator/20191216 CFNetwork/1121.1.2 Darwin/19.3.0 (x86_64)'
    );

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (dataType === 'text') {
          resolve(xhr.responseText);
        } else if (dataType === 'json') {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (err) {
            err.xhr = xhr;
            reject(err);
          }
        }
      } else {
        const err = Error(xhr.statusText);
        (err as any).xhr = xhr;
        reject(err);
      }
    }
  };

  if (type === 'GET') {
    xhr.send(null);
  } else {
    xhr.send(param);
  }

  return p;
}

/**
 * GET 请求
 * @param url 地址
 * @param data GET参数
 * @param json 是否解析 json
 */
export const get = (
  url: string,
  data: string | { [k: string]: any },
  json = false
) =>
  ajax({
    url,
    data,
    type: 'GET',
    dataType: json ? 'json' : 'text'
  });

/**
 * POST 请求
 * @param url 地址
 * @param data GET参数
 * @param json 是否解析 json
 */
export const post = (
  url: string,
  data: string | { [k: string]: any },
  json = false
) =>
  ajax({
    url,
    data,
    type: 'POST',
    dataType: json ? 'json' : 'text'
  });
