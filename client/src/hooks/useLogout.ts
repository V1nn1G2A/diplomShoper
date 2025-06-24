// client/src/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { logout as logoutRequest } from "../api/auth";
import { useUser } from "../context/UserContext";

export const useLogout = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { logout: userLogout, user } = useUser();

  const logout = (showNotification: boolean = true) => {
    try {
      // Очищаем localStorage
      logoutRequest();
      
      // Обновляем состояние пользователя в контексте
      userLogout();
      
      if (showNotification) {
        toast({
          title: "Успешный выход",
          description: `До свидания, ${user?.first_name || 'пользователь'}!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      
      // Перенаправляем на главную страницу
      navigate("/");
      
      return true;
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      
      if (showNotification) {
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при выходе из системы",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      
      return false;
    }
  };

  return { logout };
};