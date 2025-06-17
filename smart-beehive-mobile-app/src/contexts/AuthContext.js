import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";
import { isTokenExpires } from '../utils/utils';
import { setAuthInterceptors } from '../api/config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (token && !isTokenExpires(token)) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            };

        } catch (error) {
            console.error("Error checking token:", error);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        checkToken();
    }, [isAuthenticated]);

    const loginUser = async (token) => {
        setLoading(true);
        await AsyncStorage.setItem('token', token);
        setIsAuthenticated(true);
        setLoading(false);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    useEffect(() => {
        setAuthInterceptors(logout);
    });

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}