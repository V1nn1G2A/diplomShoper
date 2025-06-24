import { 
  Box, 
  Heading, 
  Text, 
  Stack, 
  Button, 
  Flex, 
  Input, 
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByPhone } from "../../api/auth";
import { userApi } from "../../api/userApi";
import type { IUser } from "../../models/IUser";
import { useUser } from "../../context/UserContext";

export default function AccountPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone: "",
    city: "",
  });

  const { user: userData } = useUser()

  useEffect(() => {
    const loadUser = async () => {
      try {

        if (!userData) {
          navigate("/");
          return;
        }

        const response = (await userApi.getById(userData.id)).data;

        setUser(response);
        setEditForm({
          first_name: response.first_name || "",
          last_name: response.last_name || "",
          middle_name: response.middle_name || "",
          email: response.email || "",
          phone: response.phone || "",
          city: response.city || "",
        });
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить данные пользователя",
          status: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate, toast]);

  const handleEditUser = () => {
    onOpen();
  };

  const handleSaveChanges = async () => {
    if (!user?.id) return;

    try {
      const response = await userApi.update(user.id, editForm);
      setUser(response.data);
      
      // Обновляем данные в localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      
      toast({
        title: "Успех",
        description: "Данные успешно обновлены",
        status: "success",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      console.error("Ошибка обновления:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные",
        status: "error",
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Box bg="brand.bg" minH="100vh" py="100px" px={{ base: 4, md: 10 }}>
        <Box maxW="600px" mx="auto" bg="white" p={8} borderRadius="md" boxShadow="md">
          <Text>Загрузка...</Text>
        </Box>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box bg="brand.bg" minH="100vh" py="100px" px={{ base: 4, md: 10 }}>
        <Box maxW="600px" mx="auto" bg="white" p={8} borderRadius="md" boxShadow="md">
          <Heading color="brand.primary">Пользователь не найден</Heading>
          <Button as={Link} to="/" mt={4} colorScheme="teal">
            На главную
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="brand.bg" minH="100vh" py="100px" px={{ base: 4, md: 10 }}>
      <Box
        maxW="600px"
        mx="auto"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
      >
        <Flex mb={6} align="center" justify="space-between">
          <Heading color="brand.primary">Мой аккаунт</Heading>
          <Flex gap={2}>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={handleEditUser}
            >
              Редактировать
            </Button>
            <Button
              as={Link}
              to="/"
              colorScheme="teal"
              size="sm"
              variant="outline"
            >
              Назад
            </Button>
          </Flex>
        </Flex>
        <Stack spacing={4} color="brand.secondary" fontSize="md">
          <Text><b>Фамилия:</b> {user.last_name}</Text>
          <Text><b>Имя:</b> {user.first_name}</Text>
          <Text><b>Отчество:</b> {user.middle_name || "—"}</Text>
          <Text><b>Email:</b> {user.email}</Text>
          <Text><b>Телефон:</b> {user.phone || "—"}</Text>
          <Text><b>Город:</b> {user.city || "—"}</Text>
          <Text><b>Роль:</b> {user.role || "user"}</Text>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактировать профиль</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Имя"
                value={editForm.first_name}
                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
              />
              <Input
                placeholder="Фамилия"
                value={editForm.last_name}
                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
              />
              <Input
                placeholder="Отчество"
                value={editForm.middle_name}
                onChange={(e) => setEditForm({ ...editForm, middle_name: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
              <Input
                placeholder="Телефон"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
              <Input
                placeholder="Город"
                value={editForm.city}
                onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Отмена
            </Button>
            <Button colorScheme="blue" onClick={handleSaveChanges}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}