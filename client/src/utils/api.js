/*import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Optional: attach token dynamically (if it may change)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or use your auth context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/platforms';

// Set up axios instance with auth token
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include the Keycloak token
export const setupAxiosInterceptors = (keycloak) => {
  api.interceptors.request.use((config) => {
    if (keycloak && keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  });
};

export const getPlatforms = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getPlatform = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createPlatform = async (platformData) => {
  const response = await api.post('/', platformData);
  return response.data;
};

export const updatePlatform = async (id, platformData) => {
  const response = await api.put(`/${id}`, platformData);
  return response.data;
};

export const updatePlatformResources = async (id, resourceData) => {
  const response = await api.patch(`/${id}/resources`, null, {
    params: resourceData
  });
  return response.data;
};

export const deletePlatform = async (id) => {
  await api.delete(`/${id}`);
};