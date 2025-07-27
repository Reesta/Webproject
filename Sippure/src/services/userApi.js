import axios from "axios";

const API = "http://localhost:4000/api/users";

// Create an axios instance with interceptor to add Authorization header
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getUsers = () => axiosInstance.get(API);
export const getUserById = (id) => axiosInstance.get(`${API}/${id}`);
export const createUser = (data) => axiosInstance.post(API, data);
export const updateUser = (id, data) => axiosInstance.put(`${API}/${id}`, data);
export const deleteUser = (id) => axiosInstance.delete(`${API}/${id}`);

