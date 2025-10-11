// single source of truth for api communication (base url, token, error handling
// call it in every components

import axios from 'axios';

const API_BASE_URL = import.meta.env.VIET_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// axios passes request throught this interceptor, before leaving fe
// to inject jwt toke into request header
api.interceptors.request.use(

    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// listen to respone comes back from be
// if 401, logout user (remove token from localstorage), go to /login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;