/**
 * 定义各种类型的错误类，方便划分处理
 * 同时结合Sentry上报
 */
import { AxiosResponse, AxiosRequestConfig } from 'axios';
// import * as Sentry from '@sentry/browser';
interface UsualErrorType extends Error {
  code:number;
  name:string;
  message:string;
  config:AxiosRequestConfig;
  status:number;
  statusText:string;
  response:AxiosResponse;
}

/**
 * Http请求错误
 */
class RequestError extends Error {
  public code:number|string;
  public name:string;
  public message:string;
  public config:AxiosRequestConfig;
  constructor(code:number|string, message:string, config:AxiosRequestConfig) {
    super();
    this.code = code;
    this.name = 'RequestError';
    this.message = message;
    this.config = config;
  }
}

/**
 * 接口返回数据错误
 */
class ApiError extends Error {
  public name:string;
  public code:number;
  public status:number;
  public statusText:string;
  public message:string;
  public response:AxiosResponse;
  public config:AxiosRequestConfig;
  constructor(status:number, statusText:string, response:AxiosResponse) {
    super();
    const { msg } = response.data;
    this.name = 'ApiError';
    this.code = status;
    this.status = status;
    this.statusText = statusText || msg;
    this.response = response;
    this.config = response.config;
    this.message = `${status} - ${this.statusText}`;
  }
}

/**
 * 通用错误处理
 * @param error
 */
const errorHandle = (error:UsualErrorType) => {
  const { code, name, message, config } = error;
  // TODO - 结合Sentry针对不同错误类型进行不同方式的上报
  if (error instanceof RequestError || error instanceof ApiError) {
    switch (name) {
      case 'RequestError':
        // Http请求异常上报
        // 接口请求超时，错误级别：[warning]
        if (String(code) === 'TIME_OUT') {
          console.log(`[warning] TIME_OUT - 访问接口超过：${config?.timeout} 毫秒未响应`);
        } else {
          // 其他类型，错误级别：[warning]
          console.log(`[warning] ${code} - 接口请求错误: ${ message || error }`);
        }
        break;
      case 'ApiError':
        if (code === 500) {
          // 内部服务异常上报，错误级别：[error]
          console.log('[Error] 服务返回500');
        } else if (code !== 401) {
          // 接口返回异常上报，错误级别：[info]
          console.log(`[info] 业务异常: ${ message || error }`);
        }
        break;
    }
    return error;
  }
  // 其他异常
  return {
    code: code || 65535,
    name: name,
    message: error.message,
  };
};

/**
 * 将原业务代码中的tryCatch通过高阶函数的方式进行封装，
 * 并对捕捉到的异常进行集中处理
 * @param handle 错误处理方法
 * @param fn api请求方法
 */
const handleTryCatch = (handle:(e:Error) => any = errorHandle) => (fn:(...args:any[]) => Promise<{}>) => async(...args:any[]) => {
  try {
    return [null, await fn(...args)];
  } catch(e) {
    return [handle(e)];
  }
};

const usualHandleTryCatch = handleTryCatch(errorHandle);

export { RequestError, ApiError, usualHandleTryCatch };
