import api from "../api/axios";

const CONTACT_API = "/api/contact";

export const sendContactMessage = (data) => {
  return api.post(CONTACT_API, data);
};

export const getContactMessages = () => {
  return api.get(CONTACT_API);
};

export const getContactMessageById = (id) => {
  return api.get(`${CONTACT_API}/${id}`);
};

export const updateContactMessage = (id, data) => {
  return api.patch(`${CONTACT_API}/${id}`, data);
};

export const deleteContactMessage = (id) => {
  return api.delete(`${CONTACT_API}/${id}`);
};