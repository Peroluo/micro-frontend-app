import React from 'react';
import './index.scss';

export type GlobalLoadingProps = {
  loading?:boolean;
}
/** 小电视 */
export const GlobalLoading:React.FC<GlobalLoadingProps> = (props) => {
  const { children, loading } = props;
  return (
    <>
      {loading ? <div styleName="loading">
        <img src="https://static.codemao.cn/loading.gif" />
        <p>加载中...</p>
      </div> : (!!children && children) }
    </>
  );
};
