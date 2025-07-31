import api from "../api/axios";

const UPLOAD_API = "/api/file";

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  return api.post(`${UPLOAD_API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const getUploadedFileUrl = (filename) => {
  // Construct the URL for accessing uploaded files
  return `${api.defaults.baseURL}/uploads/${filename}`;
};