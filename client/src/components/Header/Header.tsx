// client/src/components/Header/Header.tsx
import React, { useContext } from "react";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ControlBar } from "../ControlBar/ControlBar";
import LoginModal from "../LoginModal/LoginModal";
import { logout as logoutRequest } from "../../api/auth";
import { useUser } from "../../context/UserContext";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, logout: userLogout } = useUser();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleLoginSuccess = () => {
    // Логика успешного входа теперь обрабатывается в UserContext
  };

  const handleLogout = () => {
    logoutRequest();
    userLogout();
    navigate("/");
  };

  return (
    <Flex
      as="header"
      px="100px"
      py="4"
      alignItems="center"
      boxShadow="sm"
    >
      <Box
        fontWeight="bold"
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

      {/* Показываем кнопку Admin только для администраторов */}
      {isLoggedIn && user?.role === 'admin' && (
        <Button
          onClick={() => navigate("/admin")}
          colorScheme="brand.accent"
          variant="outline"
        >
          Admin
        </Button>
      )}

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Flex>
  );
};