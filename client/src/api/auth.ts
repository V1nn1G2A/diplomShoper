// client/src/api/auth.ts
import { api } from "./axios";

export const login = async (phone: string) => {
  const response = await api.post('/auth/login', { phone });
  return response.data;
};

export const register = async (userData: {
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  phone: string;
  city: string;
}) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getUserByPhone = async (phone: string) => {
  const response = await api.get(`/user/${phone}`);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};