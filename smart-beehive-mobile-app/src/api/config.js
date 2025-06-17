import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { isTokenExpires } from "../utils/utils";

const baseURL = "https://smart-beehive-server.onrender.com";

let logoutFunction = null;

axios.defaults.url = baseURL;

const api = axios.create({
    withCredentials: true,
    baseURL,
});

export const setAuthInterceptors = async (logout) => {
    logoutFunction = logout;
};

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (isTokenExpires(token)) {
        await logoutFunction();
    } else {
        config.headers.Authorization = `Bearer ${token}`;
    };

    return config;
});


export default api;