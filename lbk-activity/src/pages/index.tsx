import React from 'react';
import './index.scss';

export const Entry = () => (
  <>
    <img
      styleName="logo"
      src={require('src/assets/entry/noComplete.png')} />
    <div
      styleName="text-title"
      onClick={() => {
        window.history.pushState({}, '', '/lbk-mobile');
      }}>lbk-activity</div>
  </>
);
