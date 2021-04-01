/**
 * 基于mlz-axios的Http模块
 * 详细用法请见：https://github.com/juicecube/mlz-axios
 */

import Http from '@mlz/axios';

import { config } from 'src/utils/config';
import { errorParse } from './error-code-parse';
import { AxiosResponse } from './type';
import { RequestError, ApiError } from './error';

Http.setReqInterceptor(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
);

/**
 * 全局响应拦截 - http请求成功
 * @param res http请求成功返回的数据对象
 */
const resInterceptorSuccess = (res:AxiosResponse<any>) => {
  const { status, statusText, data } = res;
  // 接口返回状态值正常
  if (status >= 200 && status < 300) {
    // 如果返回数据不是规范的数据结构，则统一返回res，即接口请求方法和处理方式不做任何更改
    if (data && !Object.prototype.hasOwnProperty.call(data, 'code')) {
      return res;
    }
    // 如果返回正常的数据结构(code, data, success, msg)，但业务有误
    if (data && !data.success) {
      const { code, msg } = data;
      throw new ApiError(code, msg, res);
    }
    // TODO - 最终希望只返回真实数据（return res.data.data）
    // 但是目前项目中对返回值处理基本上都是[res.data.data]
    // 所以这里如果改成return res.data.data的话，项目中所有对接口的返回值处理都要改
    return res;
  }
  // 其他情况
  throw new ApiError(status, statusText, res);
};
/**
 * 全局响应拦截 - http请求失败
 * @param error http请求失败返回的错误对象
 */
const resInterceptorFaild = (error:any) => {
  const { config, code, message } = error;
  if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
    throw new RequestError('TIME_OUT', errorParse('TIME_OUT'), config);
  }
  throw new RequestError(code, message, config);
};

// 设置全局响应拦截
Http.setResInterceptor(
  resInterceptorSuccess,
  resInterceptorFaild,
);

const { api } = config();

export const apiTiger = new Http(api.tiger);
export const apiMarketingWeb = new Http(api.marketingWeb);
