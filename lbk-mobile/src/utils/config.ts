
/*
 * @Author       : urnotzane
 * @Github       : https://github.com/urnotzane
 * @LastAuthor   : urnotzane
 * @CreateTime   : 2020-06-01 20:29:11
 * @LastTime     : 2020-06-02 15:45:16
 * @FilePath     : /codemaster_lbk_mobile/src/utils/config.ts
 */
let cfg:{
  env:'prod'|'staging'|'test'|'dev'|'local';
  api:{
    tiger:string;
    codecamp:string;
    mock:string;
    rocketApp:string;
    marketing:string;
    ezbuy:string;
    openService:string;
    marketingWeb:string;
  }; // 后端地址
  host:{
    mobile:string;
    eventTrack:string; // 埋点
    lbkMobile:string;
    bcm:string; // bcm作品试玩
    marketing:string;
    lbkCourseMobile:string;
  }; // 其他项目的host
  wechat:{
    host:string;
    appid:string;
  };
  zhaoshang:{
    corpNo:string; // 招商的商户号
  };
  childrenDay:{
    dbRedirect:string;
  };
};

export const initConfig = (cb:any) => {
  if (typeof cfg !== 'undefined') {
    return;
  }

  if ((window as any).CODEMAOCONFIG) {
    cfg = (window as any).CODEMAOCONFIG;
    cb();
  } else {
    console.error(`
      Tried to get config before it was loaded. This should never happen.
      Ensure your code is not run before the index.ts init function has been called.
    `);
  }
};

export const config = () => {
  if (!cfg) {
    console.error(`
      Tried to get config before it was loaded. This should never happen.
      Ensure your code is not run before the index.ts init function has been called.

      Be aware that the config is not accessible from within the WHITEPAW Runtime.
    `);
    return cfg;
  }
  return cfg;
};
