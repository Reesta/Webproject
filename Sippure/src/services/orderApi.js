import api from "../api/axios";

const ORDER_API = "/api/orders";

export const createOrder = (orderData) => {
  return api.post(ORDER_API, orderData);
};

export const getUserOrders = () => {
  return api.get(ORDER_API + "/user");
};

export const getOrderById = (id) => {
  return api.get(`${ORDER_API}/${id}`);
};

export const updateOrderStatus = (id, status) => {
  return api.put(`${ORDER_API}/${id}/status`, { status });
};
