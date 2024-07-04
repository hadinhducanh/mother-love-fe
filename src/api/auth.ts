import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { User } from '../model/User';

const isAccessTokenExpired = (accessToken: string): boolean => {
    try {
        const decodedToken: { exp: number } = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();
        return currentTime > expirationTime;
    } catch (error) {
        console.error('Error decoding access token:', error);
        return true;
    }
};

export const refreshTokenIfNeeded = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isAccessTokenExpired(accessToken)) {
        try {
            const response = await axios.post('/auth/refresh_token', {
                refresh_token: localStorage.getItem('refreshToken')
            });
            const newAccessToken = response.data.access_token;
            localStorage.setItem('accessToken', newAccessToken);
            console.log('Refreshed access token successfully');
            return true;
        } catch (error) {
            console.error('Failed to refresh access token:', error);
            return false;
        }
    }
    return true;
};

export const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post('/auth/user/login', {
            userNameOrEmailOrPhone: username,
            password: password
        });
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        console.log('Login successful');
        return true;
    } catch (error) {
        console.error('Login failed', error);
        return false;
    }
};

export const getUserInfo = async (): Promise<User | null> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || isAccessTokenExpired(accessToken)) {
            throw new Error('Access token is missing or expired');
        }
        const response = await axios.get('/auth/user/info', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data as User;
    } catch (error) {
        console.error('Failed to get user info:', error);
        return null;
    }
};

export const register = async (username: string, fullName: string, email: string, phone: string, password: string, gender: string): Promise<boolean> => {
    try {
        const response = await axios.post('/auth/register/member', {
            username,
            fullName,
            email,
            phone,
            password,
            gender
        });
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        console.log('Registration successful');
        return true;
    } catch (error) {
        console.error('Registration failed', error);
        return false;
    }
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || isAccessTokenExpired(accessToken)) {
            throw new Error('Access token is missing or expired');
        }
        await axios.post('/auth/change-password', {
            oldPassword,
            newPassword
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('Password changed successfully');
        return true;
    } catch (error) {
        console.error('Failed to change password:', error);
        return false;
    }
}
