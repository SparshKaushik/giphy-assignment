import axios from "axios";

const api = axios.create({
  baseURL: "https://api.giphy.com/v1/",
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: process.env.EXPO_PUBLIC_API_KEY,
  };
  return config;
});

export default api;
