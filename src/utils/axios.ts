// see line number 36
import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const axiosServices = axios.create({ baseURL: process.env.NEXT_APP_API_URL });

// Dummy token for testing
const DUMMY_TOKEN = 'Bearer dummy-token-for-testing';

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

/**
 * Request interceptor to add Authorization token to request
 */
axiosServices.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    
    // Use session token if available, otherwise use the dummy token
    config.headers['Authorization'] = session?.token?.accessToken 
      ? `Bearer ${session.token.accessToken}`
      : DUMMY_TOKEN;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      // Redirect to login or handle the error
      // window.location.pathname = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
};

export const fetcherPost = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });

  return res.data;
};
