import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: async (username: string, password: string) => {},
    logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: React.ReactNode; 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('auth/user/login', {
                userNameOrEmailOrPhone: username,
                password: password
            });
            const { access_token, refresh_token } = response.data;
            Cookies.set('accessToken', access_token, { expires: 1 }); 
            Cookies.set('refreshToken', refresh_token, { expires: 15 });
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed', error);
            throw new Error('Login failed. Please check your credentials.');
        }
    };

    const logout = () => {
        Cookies.remove('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
