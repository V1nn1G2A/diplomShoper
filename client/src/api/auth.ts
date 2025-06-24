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
  const response = await api.post('/auth/registration', userData);
  return response.data;
};

export const getUserByPhone = async (phone: string) => {
  const response = await api.get(`/user/${phone}`);
  return response.data;
};

export const logout = () => {
  // Очищаем все данные пользователя из localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
  // Можно добавить дополнительную логику, например:
  // - Уведомление сервера о выходе
  // - Очистка других данных сессии
  console.log("Пользователь вышел из системы");
};