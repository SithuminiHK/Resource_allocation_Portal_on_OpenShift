import axios from 'axios';

const API_BASE_URL = 'https://resource-portal-poc-cs-resource-utilization-portal.apps.openshift-01.akaza.lk/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const setupAxiosInterceptors = (keycloak) => {
  api.interceptors.request.use((config) => {
    if (keycloak?.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  });
};

export default api;

export const getPlatforms = async () => {
  const response = await api.get('/platforms');
  return response.data;
};

export const getPlatform = async (id) => {
  const response = await api.get(`/platforms/${id}`);
  return response.data;
};

export const createPlatform = async (platformData) => {
  const response = await api.post('/platforms', platformData);
  return response.data;
};

export const updatePlatform = async (id, platformData) => {
  const response = await api.put(`/platforms/${id}`, platformData);
  return response.data;
};

export const updatePlatformResources = async (id, resourceData) => {
  const response = await api.patch(`/platforms/${id}/resources`, null, {
    params: resourceData
  });
  return response.data;
};

export const deletePlatform = async (id) => {
  await api.delete(`/platforms/${id}`);
};
