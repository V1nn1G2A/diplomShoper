import { api } from './axios';

export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id: number) => api.get(`/products/${id}`),
  create: (data: {
    name: string;
    description: string;
    price: number;
    characteristics: Record<string, any>;
  }) => api.post('/products', data),
  update: (id: number, data: {
    name: string;
    description: string;
    price: number;
    characteristics: Record<string, any>;
  }) => api.put(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`),
};
