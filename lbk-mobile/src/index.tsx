import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './public-path';
import { Root } from './root';
import { initConfig } from './utils/config';

initConfig(() => {
  if (!window.__POWERED_BY_QIANKUN__) {
    mount({});
  }
});

export async function bootstrap() {
  console.log('react app bootstraped');
}

export async function mount(props:any) {
  ReactDOM.render(<Root />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

export async function unmount(props:any) {
  ReactDOM.unmountComponentAtNode(props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

export async function update(props:any) {
  console.log('update props', props);
}

