import { Base64 } from 'js-base64';
import { config } from './config';
/** 跳转登录页
 * url：登录成功后跳回的页面
 * name:值跳转过来页面的名字用于埋点上报
 * pageType: 跳到登录页是展示登录界面还是绑定界面
 * */
export function jumpLoginPage(url:string, name:string, pageType?:string) {
  const _pageType = pageType ? `pageType=${pageType}` : '';
  const type = url.indexOf('?') === -1 ? '?' : '&';
  const loginBack = Base64.encode(url + type + _pageType);
  const _url = `${config().host.lbkMobile}/children-day/login?loginBack=${loginBack}&reportName=${name}&${_pageType}`;
  location.href = _url;
}
