// client/src/components/LogoutButton/LogoutButton.tsx
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useLogout } from "../../hooks/useLogout";

interface LogoutButtonProps {
  variant?: string;
  colorScheme?: string;
  size?: string;
  showConfirmation?: boolean;
  mr?: number;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = "ghost",
  colorScheme = "brand",
  size = "md",
  showConfirmation = true,
  mr = 2,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout(true);
    onClose();
  };

  const handleClick = () => {
    if (showConfirmation) {
      onOpen();
    } else {
      logout(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant={variant}
        colorScheme={colorScheme}
        size={size}
        mr={mr}
      >
        Выйти
      </Button>

      {showConfirmation && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Подтверждение выхода
              </AlertDialogHeader>

              <AlertDialogBody>
                Вы уверены, что хотите выйти из аккаунта?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Отмена
                </Button>
                <Button colorScheme="red" onClick={handleLogout} ml={3}>
                  Выйти
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
};