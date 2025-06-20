import { api } from './axios';

export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id: number) => api.get(`/products/${id}`),

  create: (data: {
    title: string;
    description: string;
    price: number;
    characteristics: string;
  }) => api.post('/products', data),

  update: (
    id: number,
    data: {
      title: string;
      description: string;
      price: number;
      characteristics: string;
    }
  ) => api.put(`/products/${id}`, data),

  delete: (id: number) => api.delete(`/products/${id}`),
};
