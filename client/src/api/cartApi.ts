// client/src/api/cartApi.ts
import { api } from './axios';

export const cartApi = {
  getCart: (userId: string) => api.get(`/cart/${userId}`),
  
  addToCart: (userId: string, data: { productId: number; quantity: number }) =>
    api.post(`/cart/${userId}`, data),

  updateCartItem: (userId: string, data: { productId: number; quantity: number }) =>
    api.put(`/cart/${userId}`, data),

  deleteFromCart: (userId: string, productId: number) =>
    api.delete(`/cart/${userId}/${productId}`),
};