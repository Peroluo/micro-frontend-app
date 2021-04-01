import * as React from 'react';
import { RouteWidthTitle } from 'src/constants/common';
import * as Loadable from 'react-loadable';
import { GlobalLoading } from 'src/components/global-loading';

const MyLoadingComponent = ({ isLoading, error }:any) => {
  if (isLoading) {
    return <GlobalLoading loading />;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

export const _loadable = (loadFunc:any) => Loadable({
  loader: loadFunc,
  loading: MyLoadingComponent,
  delay: 2000,
});

export const routes:RouteWidthTitle[] = [
  {
    path: '/',
    exact: true,
    title: 'lbk-activity',
    component: _loadable(async() => (await import('./')).Entry),
  },
];
