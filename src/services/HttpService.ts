import axios, { AxiosRequestConfig } from 'axios';

// in the project should come from env
const baseUrl: string = 'https://randomuser.me';

export const axiosInstance = axios.create({ baseURL: baseUrl });

const pluckData = <T>(wrapper: { data: T }) => wrapper.data;
const throwError = (e: Error) => { throw e; };

const HttpService = {
    get: <T = unknown>(path: string, config?: AxiosRequestConfig) => axiosInstance
    .get<T>(path, config)
    .then(pluckData)
    .catch(throwError),

  post: <T = void>(path: string, data?: any) => axiosInstance
    .post<T>(path, data)
    .then(pluckData)
    .catch(throwError),

  patch: <T = void>(path: string, data?: any) => axiosInstance
    .patch<T>(path, data)
    .then(pluckData)
    .catch(throwError),

  put: <T = void>(path: string, data?: any) => axiosInstance
    .put<T>(path, data)
    .then(pluckData)
    .catch(throwError),

  delete: <T = void>(path: string, data?: any) => axiosInstance
    .delete<T>(path, data)
    .then(pluckData)
    .catch(throwError)
}

export default HttpService