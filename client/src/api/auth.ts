// client/src/api/auth.ts
import { api } from "./axios";

export const login = async (phone: string) => {
  const response = await api.post('/api/auth/login', { phone });
  return response.data;
};

export const getUserByPhone = async (phone: string) => {
  const response = await api.get(`/api/user/${phone}`);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};