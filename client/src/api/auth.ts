import axios from "axios";

const API_URL = "http://localhost:5000"; // или твой актуальный адрес

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  return response.data; // должен содержать токен/пользователя
};

export const logout = () => {
  localStorage.removeItem("token");
};
