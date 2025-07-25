import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:4000',
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth data on unauthorized response
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default api;