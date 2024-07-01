import React, { createContext, useContext, useEffect, useState } from 'react';
import { refreshTokenIfNeeded, login, register, getUserInfo } from '../../api/auth';
import { User } from '../../model/User';

interface AuthContextType {
    isLoggedIn: boolean;
    userId: number | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, fullName: string, email: string, phone: string, password: string, gender: string) => Promise<void>;
    logout: () => void;
    getUserInfo: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    userId: null,
    login: async (username: string, password: string) => {},
    register: async (username: string, fullName: string, email: string, phone: string, password: string, gender: string) => {},
    logout: () => {},
    getUserInfo: async () => null
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            const isAuthenticated = await refreshTokenIfNeeded();
            setIsLoggedIn(isAuthenticated);

            if (isAuthenticated) {
                const userInfo = await getUserInfo();
                if (userInfo) {
                    setUserId(userInfo.userId);
                }
            }
        };

        initializeAuth();
    }, []);

    const handleLogin = async (username: string, password: string) => {
        const success = await login(username, password);
        if (success) {
            setIsLoggedIn(true);
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUserId(userInfo.userId);
            }
        } else {
            setIsLoggedIn(false);
            throw new Error('Login failed. Please check your credentials.');
        }
    };

    const handleRegister = async (username: string, fullName: string, email: string, phone: string, password: string, gender: string) => {
        const success = await register(username, fullName, email, phone, password, gender);
        if (success) {
            setIsLoggedIn(true);
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUserId(userInfo.userId);
            }
        } else {
            setIsLoggedIn(false);
            throw new Error('Registration failed. Please check your details.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login: handleLogin, register: handleRegister, logout: handleLogout, getUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
