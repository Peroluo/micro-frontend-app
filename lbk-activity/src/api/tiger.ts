import { config } from 'src/utils/config';
import { pid } from 'src/utils/iris-config';
import { apiTiger } from './index-cookie';
import { MlzResponse } from './type';

/**
 * type
 */

/** existed=true时有auth和userInfo */
export interface WechatAuthApi {
  auth?:AuthTiger;
  existed:boolean;
  oauth_ticket?:string;
  user_info?:UserInfoTiger;
}
export interface ThirdPartyData {
	user_info:UserInfoTiger;
	auth:AuthTiger;
}

export interface AuthTiger {
	token:string;
	email:string;
	phone_number:string;
	has_password:boolean;
}

export interface UserInfoTiger {
	id:string;
	nickname:string;
	avatar_url:string;
	fullname:string;
	sex:number;
	birthday:number;
	qq:string;
	description:string;
}
export interface RegisterParamsApi {
  phone_number?:string;
  captcha:string;
  pid?:string;
  oauth_ticket?:string;
}
export type RegisterSilenceRes = {
	user_info:RegisterSilenceUserInfo;
	auth:RegisterSilenceAuth;
	is_first_login:boolean;
}

export type RegisterSilenceAuth = {
	token:string;
	email:string;
	phone_number:string;
	has_password:boolean;
}

export type RegisterSilenceUserInfo = {
	id:number;
	nickname:string;
	avatar_url:string;
	fullname:string;
	sex:number;
	birthday:number;
	qq:string;
	description:string;
}
export interface LoginrParamsApi {
  phone_number:string;
  captcha:string;
  pid:string;
  auth_version?:string;
}

export interface CaptchaLoginApi {
  phone_number:string;
  oauth_ticket?:string;
}

export interface GetJsSdkParams {
  js_api_list:string[];
  url:string;
}

export interface GetJsSdkRes {
  appId:string;
  timestamp:number;
  nonceStr:string;
  signature:string;
}

export interface SendCommonCaptchaApi {
  phone_number:string;
  pid?:string;
}
export interface CheckCommonCaptchaApi {
  phone_number:string;
  captcha:string;
}

export interface ZhaoshangAuthApi {
	timestamp:string;
	nonceStr:string;
	sign:string;
}

export interface ZhaohangaLoginApi {
  cmb_body:string;
  crypt_type:string;
  pid:string;
}
/**
 * api
 */

export async function getWechatAuth(code:string):MlzResponse<WechatAuthApi>{
  return await apiTiger.post('/tiger/v3/web/accounts/oauth/wechat', {
    appid: config().wechat.appid,
    code,
    pid,
  });
}

export async function getJsSdk(params:GetJsSdkParams):MlzResponse<GetJsSdkRes> {
  return apiTiger.post('/tiger/wechat/config/js_sdk', params);
}

export async function getWechatThirdOauth(oauthTicket:string):MlzResponse<ThirdPartyData>{
  return await apiTiger.post('/tiger/v3/web/accounts/oauth/third-party', { oauth_ticket: oauthTicket });
}

export async function phoneLoginSilence(params:RegisterParamsApi):MlzResponse<RegisterSilenceRes> {
  return await apiTiger.post('/tiger/v3/web/accounts/phone/login/silence', params);
}

/** 通过验证码激活或登录 */
export async function captchaOauthThird(params:RegisterParamsApi) {
  return await apiTiger.post('/tiger/v3/web/accounts/oauth/third-party', params);
}

/** 获取验证码，验证验证码后默认注册 */
export async function captchaLoginSilence(params:CaptchaLoginApi, ticket:string) {
  return await apiTiger.post('/tiger/v3/web/accounts/captcha/login/silence',
    params,
    { headers: { 'X-Captcha-Ticket': ticket } },
  );
}

export async function AccountCaptcha(params:CaptchaLoginApi) {
  return await apiTiger.post('/tiger/v3/web/accounts/captcha/oauth', params);
}

// 通用验证码发送
export async function sendCommonCaptcha(params:SendCommonCaptchaApi, ticket:string) {
  return await apiTiger.post('/tiger/v3/web/accounts/captcha/common', params, { headers: { 'X-Captcha-Ticket': ticket } });
}
// 通用验证码校验
export async function checkCommonCaptcha(params:CheckCommonCaptchaApi) {
  return await apiTiger.post('/tiger/v3/web/accounts/captcha/common/check', params);
}
// 招行授权登录-生成签名
export async function getZhaoshagnAuth():MlzResponse<ZhaoshangAuthApi> {
  return await apiTiger.get('tiger/v3/web/accounts/oauth/cmb/generate-auth-info');
}

// 招行授权登录
export async function getZhaoshagnLogin(params:ZhaohangaLoginApi) {
  return await apiTiger.post('/tiger/v3/web/accounts/oauth/cmb', params);
}


// 这两个接口配对使用
/** 发送登录验证码，只用于登录，验证码具有实效性，10分钟内有效 */
export async function captchaLogin(params:any, ticket:string) {
  return await apiTiger.post('/tiger/v3/web/accounts/captcha/login', params, { headers: { 'X-Captcha-Ticket': ticket } });
}
/** 手机登录，需要携带手机号及验证码，新的逻辑需要带上auth_version */
export async function phoneLogin(params:LoginrParamsApi) {
  return await apiTiger.post('/tiger/v3/web/accounts/phone/login', params);
}
/** 退出登录 */
export async function accountLogOut() {
  return await apiTiger.post('/tiger/v3/web/accounts/logout');
}
/** 获取平台用户信息接口 */
export async function getAccountInfo() {
  return await apiTiger.get('/tiger/account');
}
