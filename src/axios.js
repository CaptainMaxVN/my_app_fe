import axios from "axios";
import { config } from "./config";
import { CachedUser } from "./context/UserContext";


export var axiosInstance = axios.create({
    baseURL: config.BACKEND_URL,
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
})