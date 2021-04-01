import React from 'react';
import './index.scss';
interface MicroAppLoaderProps {
    loading:boolean;
}
export const MicroAppLoader:React.FC<MicroAppLoaderProps> = ({ loading }) => <>
  {loading && <div styleName="loading">
    <img src="https://static.codemao.cn/loading.gif" />
  </div>}
  <div id="subapp-viewport" />
</>;
