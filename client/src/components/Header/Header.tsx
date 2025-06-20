import React from "react";
import { Box, Button, Flex, Spacer, useTheme } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ControlBar } from "../ControlBar/ControlBar";
import LoginModal from "../LoginModal/LoginModal";
import { login as loginRequest, logout as logoutRequest } from "../../api/auth";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Проверка токена при загрузке
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password);
      localStorage.setItem("token", data.token); // или data.accessToken
      setIsLoggedIn(true);
    } catch (err) {
      alert("Неверный логин или пароль");
    }
  };

  const handleLogout = () => {
    logoutRequest();
    setIsLoggedIn(false);
  };

  return (
    <Flex
      as="header"
      bg={theme.colors.brand.bg}
      px="100px"
      py="4"
      alignItems="center"
      boxShadow="sm"
    >
      <Box
        fontWeight="bold"
        color={theme.colors.brand.primary}
        cursor="pointer"
        onClick={() => navigate("/")}
      >
        Computer Shop
      </Box>
      <Spacer />

      <Button
        onClick={() => navigate("/cart")}
        variant={location.pathname === "/cart" ? "solid" : "ghost"}
        colorScheme="brand.primary"
        mr={2}
      >
        Корзина
      </Button>

      <ControlBar
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsModalOpen(true)}
        onLogout={handleLogout}
        onSignUp={() => navigate("/registration")}
      />

      <Button
        onClick={() => navigate("/admin")}
        colorScheme="brand.accent"
        variant="outline"
      >
        Admin
      </Button>

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleLogin}
      />
    </Flex>
  );
};
