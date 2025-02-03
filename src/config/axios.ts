import { useLoginData } from '@/features/auth/store/login-data';
import axios, { AxiosRequestConfig } from 'axios';

export class AxiosInstanceError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'AxiosInstanceError';
  }
}

const axiosConfig: AxiosRequestConfig = {
  // Timeout is set to 60 seconds
  timeout: 60_000,
  // Default headers
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the access token from the Zustand store
    const { accessToken } = useLoginData.getState();

    // If an access token is available, add it to the request headers.
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // If the request was successful, return the response.
    return response;
  },
  (error) => {
    // If the request was not successful, log the error and return a rejected promise.
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('[AXIOS_RESPONSE_ERROR]:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('[AXIOS_REQUEST_ERROR]:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('[AXIOS_ERROR]', error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
