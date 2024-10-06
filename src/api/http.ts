import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8000";

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  return axiosInstance;
};

export const httpClient = createClient();
