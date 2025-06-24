// client/src/pages/RegistrationPage/RegistrationPage.tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  FormErrorMessage,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import { useUser } from "../../context/UserContext";

interface FormData {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  city: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  city?: string;
}

const RegistrationPage = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone: "",
    city: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useUser();

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Проверка имени
    if (!formData.first_name.trim()) {
      newErrors.first_name = "Имя обязательно для заполнения";
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = "Имя должно содержать минимум 2 символа";
    }

    // Проверка фамилии
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Фамилия обязательна для заполнения";
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = "Фамилия должна содержать минимум 2 символа";
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Некорректный формат email";
    }

    // Проверка телефона
    const phoneRegex = /^[78]\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Номер телефона обязателен для заполнения";
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Некорректный формат телефона (пример: 89001234567)";
    }

    // Проверка города
    if (!formData.city.trim()) {
      newErrors.city = "Город обязателен для заполнения";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "Название города должно содержать минимум 2 символа";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибку для поля при изменении
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        middle_name: formData.middle_name.trim() || undefined,
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""),
        city: formData.city.trim(),
      });
      
      login(response.user, response.token);
      
      toast({
        title: "Успешная регистрация",
        description: "Добро пожаловать! Вы успешно зарегистрированы",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Ошибка регистрации:", error);
      toast({
        title: "Ошибка регистрации",
        description: error.response?.data?.error || "Произошла ошибка при регистрации",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={8}>
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing={6}>
          <Heading color="brand.primary">Регистрация</Heading>
          
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.first_name}>
                <FormLabel>Имя *</FormLabel>
                <Input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  placeholder="Введите ваше имя"
                />
                <FormErrorMessage>{errors.first_name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.last_name}>
                <FormLabel>Фамилия *</FormLabel>
                <Input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  placeholder="Введите вашу фамилию"
                />
                <FormErrorMessage>{errors.last_name}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Отчество</FormLabel>
                <Input
                  type="text"
                  value={formData.middle_name}
                  onChange={(e) => handleInputChange("middle_name", e.target.value)}
                  placeholder="Введите ваше отчество (необязательно)"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email *</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@mail.com"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Номер телефона *</FormLabel>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="89001234567"
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.city}>
                <FormLabel>Город *</FormLabel>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Введите ваш город"
                />
                <FormErrorMessage>{errors.city}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="100%"
                isLoading={loading}
                loadingText="Регистрация..."
              >
                Зарегистрироваться
              </Button>
            </VStack>
          </form>

          <Text fontSize="sm" color="gray.600">
            Уже есть аккаунт?{" "}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => navigate("/")}
            >
              Войти
            </Button>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default RegistrationPage;