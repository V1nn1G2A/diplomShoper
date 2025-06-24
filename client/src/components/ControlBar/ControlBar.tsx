// client/src/components/ControlBar/ControlBar.tsx
import { Button } from "@chakra-ui/react";
import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutButton } from "../LogoutButton/LogoutButton";

interface ControlBarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onSignUp: () => void;
  onLogout: () => void;
  onAccount?: () => void;
}

export const ControlBar: FC<ControlBarProps> = ({
  isLoggedIn,
  onLogin,
  onSignUp,
  // onLogout теперь не используется, так как LogoutButton сам управляет выходом
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!isLoggedIn)
    return (
      <>
        <Button
          variant={location.pathname === "/login" ? "solid" : "ghost"}
          onClick={onLogin}
          colorScheme="brand"
          mr={2}
        >
          Войти
        </Button>
        <Button
          variant={location.pathname === "/registration" ? "solid" : "ghost"}
          onClick={onSignUp}
          colorScheme="brand"
          mr={2}
        >
          Регистрация
        </Button>
      </>
    );

  return (
    <>
      <Button 
        variant={location.pathname === "/account" ? "solid" : "ghost"}
        onClick={() => navigate("/account")} 
        colorScheme="brand" 
        mr={2}
      >
        Аккаунт
      </Button>
      <LogoutButton 
        variant="ghost"
        colorScheme="brand"
        showConfirmation={true}
      />
    </>
  );
};