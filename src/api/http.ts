import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8888/api/v1';

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (req) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        req.headers.Authorization = accessToken;
      }
      return req;
    },
    (err) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const { isLogin, setIsLoggedIn } = useAuthStore();

      if (isLogin && err.response?.status === 401) {
        const originalRequest = err.config;
        try {
          const result = await axios.post(`${BASE_URL}/users/refresh`);
          const newAccessToken = result.data.accessToken;

          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            originalRequest.headers.Authorization = newAccessToken;
          }
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          setIsLoggedIn(false);
          localStorage.removeItem('accessToken');
          toast.info('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
          window.location.href = '/users/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();
