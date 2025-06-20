import { api } from './axios';

export const userApi = {
  getAll: () => api.get('/users'),
  getById: (id: number) => api.get(`/users/${id}`),

  create: (data: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone: string;
    city: string;
  }) => api.post('/users', data),

  update: (
    id: number,
    data: {
      first_name: string;
      last_name: string;
      middle_name?: string;
      email: string;
      phone: string;
      city: string;
    }
  ) => api.put(`/users/${id}`, data),

  delete: (id: number) => api.delete(`/users/${id}`),
};
