import api from "../api/axios";

const USER_API = "/api/users";

export const getUsers = () => api.get(USER_API);
export const getUserById = (id) => api.get(`${USER_API}/${id}`);
export const createUser = (data) => api.post(USER_API, data);
export const updateUser = (id, data) => api.put(`${USER_API}/${id}`, data);
export const deleteUser = (id) => api.delete(`${USER_API}/${id}`);

