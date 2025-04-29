import axios from 'axios';

// Base URL for API
const API_URL = import.meta.env.REACT_APP_API_URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Client API calls
export const clientAPI = {
  getAll: () => api.get('/clients'),
  get: (id) => api.get(`/clients/${id}`),
  create: (data) => api.post('/clients', data),
  update: (id, data) => api.put(`/clients/${id}`, data),
  delete: (id) => api.delete(`/clients/${id}`),
  search: (query) => api.get(`/clients/search?query=${query}`),
};

// Program API calls
export const programAPI = {
  getAll: () => api.get('/programs'),
  get: (id) => api.get(`/programs/${id}`),
  create: (data) => api.post('/programs', data),
  update: (id, data) => api.put(`/programs/${id}`, data),
  delete: (id) => api.delete(`/programs/${id}`),
};

// Enrollment API calls
export const enrollmentAPI = {
  getAll: () => api.get('/enrollments'),
  get: (id) => api.get(`/enrollments/${id}`),
  create: (data) => api.post('/enrollments', {
    clientId: data.clientId,
    programId: data.programId,
    enrollmentDate: data.enrollmentDate,
    status: data.status,
    notes: data.notes
  }),
  update: (id, data) => api.put(`/enrollments/${id}`, data),
  delete: (id) => api.delete(`/enrollments/${id}`),
  getByClientId: (clientId) => api.get(`/enrollments/client/${clientId}`),
};

export default api;
