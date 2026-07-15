import axios from "axios";
import { APP_CONFIG } from "../config/app";

const api = axios.create({
  baseURL: APP_CONFIG.baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});

// add token automaticaly for each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
