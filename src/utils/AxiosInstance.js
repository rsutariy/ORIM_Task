import axios from "axios";

export const API_ROOT = "https://raw.githubusercontent.com/rsutariy/ORIM_Task/master/server/data/";
const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    config.url = `${API_ROOT}${config.url}`;
    console.log(config.url);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;