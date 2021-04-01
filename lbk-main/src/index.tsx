import React from 'react';
import { registerMicroApps, setDefaultMountApp, start, RegistrableApp, ObjectType } from 'qiankun';
import ReactDOM from 'react-dom';
import { MicroAppLoader } from './micro-app-loader';
import './reset.scss';

const render = (loading:boolean) => {
  const container = document.getElementById('root');
  ReactDOM.render(<MicroAppLoader loading={loading}/>, container);
};

render(true);


const registrableApp:RegistrableApp<ObjectType>[] = window.CODEMAOCONFIG.service.map((item:any) => ({
  loader: (loading:any) => render(loading),
  entry: item.entry,
  container: '#subapp-viewport',
  activeRule: `/${item.name}`,
  name: item.name,
}));

// 注册子应用
registerMicroApps(registrableApp);

// 设置默认进入的子应用
setDefaultMountApp('/lbk-mobile');

// 启动应用
start();
