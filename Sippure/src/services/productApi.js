import api from "../api/axios";

const PRODUCT_API = "/api/product";

export const getProducts = () => {
  return api.get(PRODUCT_API);
};

export const getProductById = (id) => {
  return api.get(`${PRODUCT_API}/${id}`);
};

export const createProduct = (data) => {
  return api.post(PRODUCT_API, data);
};

export const updateProduct = (id, data) => {
  return api.patch(`${PRODUCT_API}/${id}`, data);
};

export const deleteProduct = (id) => {
  return api.delete(`${PRODUCT_API}/${id}`);
};

export const getProductsByCategory = (categoryId) => {
  return api.get(`${PRODUCT_API}/category/${categoryId}`);
};