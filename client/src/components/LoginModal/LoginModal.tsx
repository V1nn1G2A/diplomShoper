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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../api/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    if (!phone.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите номер телефона",
        status: "error",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await login(phone);
      
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      toast({
        title: "Успех",
        description: "Вы успешно вошли в аккаунт",
        status: "success",
        duration: 3000,
      });
      
      onLoginSuccess();
      onClose();
      setPhone("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Ошибка входа:", error);
      toast({
        title: "Ошибка",
        description: error.response?.data?.error || "Пользователь не найден",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
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
              placeholder="Номер телефона (например: 89001234567)"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={handleLogin}
            isLoading={loading}
            loadingText="Вход..."
          >
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