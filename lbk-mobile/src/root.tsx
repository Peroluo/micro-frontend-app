import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { RouteWidthTitle } from 'src/constants/common';
import { routes } from './pages/router';
import './assets/styles/reset';

const App = () => {
  const location = useLocation();
  useEffect(() => {
    const routers = routes.find((item:RouteWidthTitle) => item.path === location.pathname);
    document.title = routers ? routers.title : '编程猫 - 分销系统';
  }, [location]);

  return (
    <Switch>
      {
        routes.map((val, key) => (
          <Route
            {...val}
            key={`route-${key}`}
          />
        ))
      }
    </Switch>
  );
};


export const Root = () => (
  <React.StrictMode>
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/lbk-mobile' : '/lbk-mobile'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
