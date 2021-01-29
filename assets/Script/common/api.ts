import { httpPost } from '../utils/httpPost';

export interface DefaultData {
  code: number;
  msg: string;
  data: any;
}

/**
 * @function HttpDemo
 * @description 网络请求demo
 *
 * @param {*} data -- 请求传参
 * @return {*}  {Promise<DefaultData>}
 */
export const HttpDemo = (data: any): Promise<DefaultData> =>
  httpPost('/amu/card/info', data);

export default {
  HttpDemo
};
