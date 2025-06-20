import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
}

const LoginModal = ({ isOpen, onClose, onSubmit }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onSubmit(email, password);
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Вход в аккаунт</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" flexDirection="column" gap={4}>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleLogin}>
            Войти
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Отмена
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
