interface ErrorResponse {
  error_code:string;
}

export type AxiosResponse<T> = import('axios').AxiosResponse<T & ErrorResponse>;
export type MlzResponse<T> = Promise<AxiosResponse<T & ErrorResponse>>;
export type ResponseList<T> = {
  limit:number;
  offset:number;
  total:number;
  items:T;
}
