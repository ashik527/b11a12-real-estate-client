// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
