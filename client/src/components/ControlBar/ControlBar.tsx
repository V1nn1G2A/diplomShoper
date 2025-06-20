import { Button } from "@chakra-ui/react";
import type { FC } from "react";
import { useLocation } from "react-router-dom"; // или 'next/navigation' в Next.js

interface ControlBarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onSignUp: () => void;
  onLogout: () => void;
}

export const ControlBar: FC<ControlBarProps> = ({
  isLoggedIn,
  onLogin,
  onSignUp,
  onLogout,
}) => {
  const location = useLocation(); // или const pathname = usePathname() в Next.js

  if (!isLoggedIn)
    return (
      <>
        <Button
          variant={location.pathname === "/login" ? "solid" : "ghost"}
          onClick={onLogin}
          colorScheme="brand"
          mr={2}
        >
          Log In
        </Button>
        <Button
          variant={location.pathname === "/registration" ? "solid" : "ghost"}
          onClick={onSignUp}
          colorScheme="brand"
          mr={2}
        >
          Sign Up
        </Button>
      </>
    );

  return (
    <Button onClick={onLogout} colorScheme="brand" mr={2}>
      Log Out
    </Button>
  );
};
