import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosAdapterUniapp from 'axios-adapter-uniapp';
import errorCodeRes from './helper/errorCodeRes';
import errorCodeHttp from './helper/errorCodeHttp';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  adapter: axiosAdapterUniapp,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const noTokenUrl: string[] = [];
// request拦截器
instance.interceptors.request.use(
  (config) => {
    // console.log("[info] interceptors.request :>> ", config);
    // let data = filterObjectNullVal(config.data);
    // if (config.method === 'get') {
    //   config.params = data;
    //   delete config.data;
    // }
    // if (config.method === 'post') {
    //   if (isUploadFile(config)) {
    //     data = filterObjectNullVal(config.formData);
    //     config.formData = data;
    //   }
    // }
    if (!config.headers) {
      config.headers = {};
    }
    const token = uni.getStorageSync('token');
    if (token && noTokenUrl.indexOf(config.url || '') === -1) {
      config.headers.loginToken = token;
    }
    return config;
  },
  (error) => {
    // console.error("interceptors.request.catch: ", error);
    Promise.reject(error);
  },
);

// response拦截器
instance.interceptors.response.use(
  (response) => {
    // console.log('interceptors.response :>> ', response);
    // 服务端返回的状态码不等于200，则reject()
    if (response.status !== 200) {
      uni.$emit('z-paging-error-emit');
      return Promise.reject(response);
    }
    if (typeof response.data === 'string') {
      response.data = JSON.parse(response.data);
    }

    // TODO: 可以在这里提前处理各自项目接口返回格式
    const isInvalidResult = response.data.code !== 200;
    if (isInvalidResult) {
      uni.$emit('z-paging-error-emit');
      return Promise.reject(errorCodeRes(response));
    }

    return response.data.content;
  },

  // HTTP 状态码 错误处理
  (error) => {
    if (axios.isCancel(error)) {
      console.log('[request] interceptors.response.catch::Request canceled', error);
      Promise.reject(error);
    } else {
      uni.$emit('z-paging-error-emit');
      Promise.reject(errorCodeHttp(error));
    }
  },
);

export default instance;

// 兼容 openapi-gen
export function request<T>(url: string, params: AxiosRequestConfig): Promise<any> {
  return instance.request({
    url,
    ...params,
  });
}
