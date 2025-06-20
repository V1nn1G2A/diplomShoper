import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import type { IUser } from "../../models/IUser";
import type { IProduct } from "../../models/IProduct";
import users from "../../data/userData.json";
import axios from "axios";

export const AdminPanel: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [formState, setFormState] = useState({
    name: "",
    price: "",
    description: "",
  });

  const resetForm = () => {
    setFormState({ name: "", price: "", description: "" });
    setEditingProduct(null);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      toast({ title: "Ошибка загрузки продуктов", status: "error" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product?: IProduct) => {
    if (product) {
      setEditingProduct(product);
      setFormState({
        name: product.name,
        price: String(product.price),
        description: product.description,
      });
    } else {
      resetForm();
    }
    onOpen();
  };

  const handleSaveProduct = async () => {
    const newProduct: IProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formState.name,
      price: parseFloat(formState.price),
      description: formState.description,
      characteristics: {},
    };

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, newProduct);
        toast({ title: "Товар обновлён", status: "success" });
      } else {
        await axios.post("http://localhost:5000/api/products", newProduct);
        toast({ title: "Товар добавлен", status: "success" });
      }
      fetchProducts();
      onClose();
      resetForm();
    } catch (error) {
      toast({ title: "Ошибка при сохранении", status: "error" });
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast({ title: "Товар удалён", status: "success" });
      fetchProducts();
    } catch (error) {
      toast({ title: "Ошибка при удалении", status: "error" });
    }
  };

  return (
    <Box px="100px" py={8}>
      <Heading mb={6} color="brand.primary">
        Панель администратора
      </Heading>

      <Tabs index={tabIndex} onChange={setTabIndex} colorScheme="teal">
        <TabList>
          <Tab>Пользователи</Tab>
          <Tab>Товары</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading size="md" mb={4}>Все пользователи</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ФИО</Th>
                  <Th>Email</Th>
                  <Th>Роль</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user: IUser) => (
                  <Tr key={user.id}>
                    <Td>{user.last_name} {user.first_name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Flex justify="space-between" mb={4}>
              <Heading size="md">Все товары</Heading>
              <Button colorScheme="teal" onClick={() => handleOpenModal()}>
                Добавить товар
              </Button>
            </Flex>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Название</Th>
                  <Th>Цена</Th>
                  <Th>Описание</Th>
                  <Th>Действия</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>{product.name}</Td>
                    <Td>{product.price.toLocaleString("ru-RU")} ₽</Td>
                    <Td maxW="250px" overflow="hidden" textOverflow="ellipsis">
                      {product.description}
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        <Button size="sm" colorScheme="blue" onClick={() => handleOpenModal(product)}>
                          Изменить
                        </Button>
                        <Button size="sm" colorScheme="red" onClick={() => handleDeleteProduct(product.id)}>
                          Удалить
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={() => { onClose(); resetForm(); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingProduct ? "Редактировать товар" : "Добавить товар"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Название"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
              <Input
                placeholder="Цена"
                type="number"
                value={formState.price}
                onChange={(e) => setFormState({ ...formState, price: e.target.value })}
              />
              <Input
                placeholder="Описание"
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => { onClose(); resetForm(); }}>
              Отмена
            </Button>
            <Button colorScheme="teal" onClick={handleSaveProduct}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
