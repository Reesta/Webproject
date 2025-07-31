import api from "../api/axios";

const CATEGORY_API = "/api/category";

export const getCategories = () => {
  return api.get(CATEGORY_API);
};

export const getCategoryById = (id) => {
  return api.get(`${CATEGORY_API}/${id}`);
};

export const createCategory = (data) => {
  return api.post(CATEGORY_API, data);
};

export const updateCategory = (id, data) => {
  return api.patch(`${CATEGORY_API}/${id}`, data);
};

export const deleteCategory = (id) => {
  return api.delete(`${CATEGORY_API}/${id}`);
};
