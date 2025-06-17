import api from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = async (phonenumber, password) => {
    try {
        const response = await api.post('/api/users', {
            phonenumber,
            password
        });

        if (response.data.token) {
            AsyncStorage.setItem('token', response.data);
        };

        return { success: true, token: response.data };
    } catch (error) {
        const errorMessage = error.response?.data?.error || "Register failed. Please try again.";
        return { success: false, error: errorMessage };
    };
};

export const login = async (phonenumber, password) => {
    try {
        const response = await api.post('/api/users/login', {
            phonenumber,
            password
        });

        const rawResponse = response.request._response;
        const parsedData = JSON.parse(rawResponse);
        const token = parsedData;
        return { success: true, token: token };
    } catch (error) {
        const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
        return { success: false, error: errorMessage };
    };
};