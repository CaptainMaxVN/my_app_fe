import axios from "axios";
import { CachedUser } from "./context/UserContext";


export var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BE_BASE_URL,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
    }
});
axiosInstance.interceptors.request.use(config => {
    const user = CachedUser();
    if(user.accessToken){
        config.headers.Authorization = `Bearer ${user.accessToken}`
    }
    console.log(config.headers);
    return config;
}, err => {
    console.log(err);
    return Promise.reject(err);
})

axiosInstance.interceptors.response.use(response => {
    console.log(response);
    return response;
  }, error => {
    if(error.response.status === 401 && error.response.config.url !== process.env.REACT_APP_LOGIN_API) {
        alert("You are not authorized! Please login again to continue.");
        window.location = process.env.REACT_APP_LOGIN_PATH;
   }
    console.log(error.response);
    return Promise.reject(error);
  });
