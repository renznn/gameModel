import { httpPost } from '../utils/httpPost';

export interface DefaultData {
  code: number;
  msg: string;
}

export interface DefaultMoneyData {
  code: number;
  score: string;
}

export interface ConfigItem {
  // 数字
  num: number;
  // 奖励红钻
  red: number;
  // 蓝钻
  blue: number;
  // 电量
  flash: number;
  // 优惠券
  coupon: number;
}

export interface PageInfo {
  // 返回值
  code: number;
  // 状态（1可报名2进行中3今日已达上限）
  state: number;
  // 剩余可报名次数
  left: number;
  // 报名消耗红钻
  cost: number;
  // 刮开数字数组（-表示没刮开）
  nums: string[];
  // 当前步骤（0-5， 4的时候让用户选择连线）
  step: number;
  // 剩余可选数字
  choose: number;
  // 奖励配置数字
  config: ConfigItem[];
}
// 获取页面信息
export const GetPageInfo = (): Promise<PageInfo> => httpPost('/amu/card/info');

// 参加游戏信息
export interface JoinInInfo {
  code: number;
  // 随机刮开的位置id（1-9）
  pos: number;
  // 位置上的数字
  num: number;
}
// 参加游戏
export const JoinInGame = (): Promise<JoinInInfo> => httpPost('/amu/card/join');

export interface ChooseInfo {
  code: number;
  // 位置上的数字
  num: number;
}

// 选择数字
export const ChooseCard = (pos: number): Promise<ChooseInfo> =>
  httpPost('/amu/card/choose', { pos });

// 连线信息
export interface LineInfo {
  code: number;
  // 刮开的所有数字集合
  nums: string[];
  // 用户开奖数字
  open: string;
  // 奖励数组
  award: {
    // 奖励标志
    code: string;
    // 数量
    num: number;
  }[];
}

// 连线
export const ChooseLine = (id: number): Promise<LineInfo> =>
  httpPost('/amu/card/line', { id });

export interface LogItem {
  // 开奖数字
  open: number;
  // 日期
  time: string;
  award: {
    code: string;
    num: number;
  }[];
}
// 用户奖励日志
export interface LogInfo {
  code: number;
  list: LogItem[];
}

// 获取奖励日志
export const GetLogInfo = (page: number): Promise<LogInfo> =>
  httpPost('/amu/card/log', { page });

export interface PopInfo {
  code: number;
  list: {
    id: number;
    userName: string;
    award: string;
  }[];
  ket: string;
}

export const GetPopInfo = (): Promise<PopInfo> => httpPost('/amu/card/pop');

export default {
  GetPageInfo,
  JoinInGame,
  ChooseCard,
  ChooseLine,
  GetLogInfo,
  GetPopInfo
};
