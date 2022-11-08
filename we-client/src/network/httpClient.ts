import axios, { AxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    'Authorization': createAuthHeader()
  }
  return config
})

function createAuthHeader() {
  const token = JSON.parse(String(localStorage.getItem('token')))
  return `Bearer ${token}`;
};

export default axiosClient