/**
 * error code parse
 */
import * as iris from '@cmao/iris';
type CodeParse = {
  [key:string]:string;
};

const codeParse:CodeParse = {
  'A_0': '未知错误',
  'A_5': '验证码错误',

  'AC_0': '账号不存在，可使用短信验证码快速登录',
  'AC_1': '密码错误，请重试',
  'AC_5': '请使用当前绑定的手机发送验证码',
  'AC_9': '该账号不存在，可使用短信验证码快速登录',
  'AC_12': '无效的pid',
  'AC_39': '手机验证超时，请返回上一步验证手机',

  'AC3_1': '手机号暂未注册',
  'AC3_18': '不合法的ticket',
  'AC3_13': '校检验证码失败',
  'AC3_23': '操作频繁，请稍后再试',
  'AC3_26': '该手机号已经被其他账号绑定',
  'AC3_24': '不合法的pid',

  'AC3_11': '初始密码只能设置一次',
  'AC3_12': '需存在主账号(至少包含邮箱、用户名、手机其一)',
  'AC3_5': '不能重复设置用户名',
  'AC3_6': '该用户名已经存在',

  'B_1': '验证码发送频繁，请稍后再试',
  'B_2': '操作频繁，请稍候再试',
  'B_3': '验证码发送失败，请重试',
  'B_4': '验证码错误，请重新输入',

  'N_0': '网络超时',
  'N_1': '网络错误',

  [iris.ERROR.INVALID_PHONE_NUMBER]: '请输入正确的手机号码',
  [iris.ERROR.INVALID_CAPTCHA]: '请正确输入短信验证码',
  [iris.ERROR.INVALID_PASSWORD]: '请设置6~20位字母+数字组合密码',
  [iris.ERROR.INVALID_USERNAME]: '请正确输入用户名',
  [iris.ERROR.INVALID_NICKNAME]: '请正确输入昵称',
  [iris.ERROR.INVALID_FULLNAME]: '请正确输入全名',
  [iris.ERROR.INVALID_DESCRIPTION]: '请正确输入个人描述',
  [iris.ERROR.INVALID_SEX]: '请正确输入性别',
  [iris.ERROR.INVALID_BIRTHDAY]: '请正确输入生日时间',
  [iris.ERROR.PWD_IS_NOT_EQUAL_TO_CONFIRMED_PWD]: '密码与确认密码不一致',
  [iris.ERROR.NO_TOKEN]: '登录状态已过期',

  [iris.ERROR.REQUEST_TIMEOUT]: '请求超时',
  [iris.ERROR.REQUEST_ERROR]: '请求出错',
  [iris.ERROR.PHONE_REGISTERED]: '手机号已注册',
  [iris.ERROR.PHONE_UNREGISTERED]: '手机号暂未注册',
  [iris.ERROR.USER_NOT_EXIST_OR_PWD_WRONG]: '账号/密码错误',
  [iris.ERROR.USER_NOT_EXIST]: '账号不存在',
  [iris.ERROR.CANNOT_SET_FUTURE_DATE]: '不能设置未来的日期',
  [iris.ERROR.CANNOT_SET_USERNAME_REPEATEDLY]: '不能重复设置用户名',
  [iris.ERROR.USERNAME_EXIST]: '该用户名已经存在',
  [iris.ERROR.NEED_TO_BIND_PHONE]: '用户需要绑定手机',
  [iris.ERROR.USE_BOUND_PHONE_TO_RECEIVE_CAPTCHA]: '需要用当前绑定手机发验证码',
  [iris.ERROR.WRONG_OLD_PWD]: '旧密码错误',
  [iris.ERROR.PWDS_DO_NOT_MATCH]: '密码不一致',
  [iris.ERROR.INIT_PWD_CAN_SET_ONLY_ONCE]: '初始密码只能设置一次',
  [iris.ERROR.NEED_PRIMARY_ACCOUNT]: '需存在主账号(至少包含邮箱、用户名、手机其一)',
  [iris.ERROR.VERIFY_CAPTCHA_FAIL]: '验证码错误',
  [iris.ERROR.USER_PHONE_BOUND]: '用户已经绑定过手机',
  [iris.ERROR.OLD_PHONE_WRONG]: '原手机号不正确',
  [iris.ERROR.ILLEGAL_OPERATION]: '非法操作',
  [iris.ERROR.CANNOT_BIND_OLD_PHONE]: '不能绑定原手机号',
  [iris.ERROR.ILLEGAL_OAUTH_TICKET]: '不合法的oauth_ticket',
  [iris.ERROR.ILLEGAL_AUTHORIZATION_CATEGORY]: '不合法的授权类别',
  [iris.ERROR.THIRD_PARTY_ACCOUNT_BOUND]: '该微信已绑定其他账号',
  [iris.ERROR.AUTHORIZATION_ACCOUNT_BOUND]: '账号已经绑定同类型授权账号',
  [iris.ERROR.BIND_PHONE_OR_SET_USERNAME_AND_PWD]: '请先绑定手机或者设置用户名及密码',
  [iris.ERROR.SEND_CAPTCHA_TOO_FRUQUENTLY]: '发送验证码过于频繁',
  [iris.ERROR.ILLEGAL_PID]: '不合法的pid',
  [iris.ERROR.NICKNAME_EXIST]: '已经存在相同的昵称',
  [iris.ERROR.PHONE_BOUND_BY_OTHER_ACCOUNT]: '该手机号已被其他帐号绑定',
  [iris.ERROR.QQ_ERROR_RECEIVED]: '使用QQ登录的时候接收到错误',
  [iris.ERROR.WECHAR_ERROR_RECEIVED]: '使用微信登录的时候接收到错误',
  [iris.ERROR.TOKEN_INVALID]: 'access token 不合法',
  [iris.ERROR.REFRESH_TOKEN_INVALID]: '登录异常，请刷新重试',
  [iris.ERROR.WRONG_TICKET]: '错误的ticket',

  'User-Can-Not-Repeat-Setting-Username-Exception@Codecamp-Service': '用户名已使用过，不可重复设置',
  'Existed-Same-Username-Exception@Codecamp-Service': '用户名已存在',
  'Password-Not-Set-For-Account-Exception@Codecamp-Service': '微信账号未设置密码',
  'Assets-On-Both-Accounts-Exception@Codecamp-Service': '两个账号均存在资产',
  // 整合落地页
  'Package-Not-Pay@Codecamp-Service': '未购买课程包',
  'Package-Not-Found@Codecamp-Service': '课程包不存在',
  'OrderId-Is-Invalid@Codecamp-Service': '订单无效',

  // 向日葵返现活动
  100312003: '您已申请了返现，无需再次申请',
  100312004: '您的账号未参加返现活动',
  100312005: '您的账号未达到返现标准',
  100312006: '姓名输入错误，请重新输入',
  100312007: '返现申请失败：未知异常，请截图并联系您的班主任',
  100314001: '请您稍后再试',
  100313001: '没有找到返现活动',

  // 课包
  '100318001': '课包不存在',
  '100318002': '课包已下线',
  '100318003': '该课包下无课期',
  '100318004': '该课包下无任何班级',

  // 接口请求状态码提示
  '401': '登录状态已过期，请重新登录',
  'Network Error': '网络错误',
  'TIME_OUT': '网络延迟，请稍后再试',
};

export const errorParse = (errCode:string):string => codeParse[errCode] || '编程猫开小差了，请稍后再试';
