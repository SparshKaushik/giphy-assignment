import axios from "axios";
import { isAPILimitExhausted } from "./states";
import { ToastAndroid } from "react-native";

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 429) {
      ToastAndroid.show("API Limit Exceeded", ToastAndroid.SHORT);
      isAPILimitExhausted.setState({
        state: true,
      });
    }
    return Promise.reject(error);
  },
);

export default api;
