import React, { useState, useEffect } from "react";
import {
  Box, Button, Flex, Heading, Table, Thead, Tbody, Tr,
  Th, Td, Tab, TabList, TabPanel, TabPanels, Tabs,
  VStack, Input, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, useToast,
} from "@chakra-ui/react";
import type { IUser } from "../../models/IUser";
import type { IProduct } from "../../models/IProduct";
import users from "../../data/userData.json";
import { productApi } from "../../api/productsApi"; // <-- используем централизованный API

export const AdminPanel: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    price: "",
    description: "",
    characteristics: "",
  });

  const resetForm = () => {
    setFormState({ name: "", price: "", description: "", characteristics: "" });
    setEditingProduct(null);
  };

  const fetchProducts = async () => {
    try {
      const res = await productApi.getAll();
      setProducts(res.data);
    } catch {
      toast({ title: "Ошибка загрузки продуктов", status: "error" });
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleOpenModal = (product?: IProduct) => {
    if (product) {
      setEditingProduct(product);
      setFormState({
        name: product.name,
        price: String(product.price),
        description: product.description,
        characteristics: JSON.stringify(product.characteristics || {}, null, 2),
      });
    } else resetForm();
    onOpen();
  };

  const handleSaveProduct = async () => {
    setIsSaving(true);
    const payload: IProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formState.name,
      price: parseFloat(formState.price),
      description: formState.description,
      characteristics: JSON.parse(formState.characteristics || "{}"),
    };

    try {
      if (editingProduct) {
        await productApi.update(editingProduct.id, payload);
        toast({ title: "Товар обновлён", status: "success" });
      } else {
        await productApi.create(payload);
        toast({ title: "Товар добавлен", status: "success" });
      }
      await fetchProducts();
      onClose();
      resetForm();
    } catch {
      toast({ title: "Ошибка при сохранении", status: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await productApi.delete(id);
      toast({ title: "Товар удалён", status: "success" });
      fetchProducts();
    } catch {
      toast({ title: "Ошибка при удалении", status: "error" });
    }
  };

  return (
    <Box px="100px" py={8}>
      <Heading mb={6} color="brand.primary">Панель администратора</Heading>
      <Tabs index={tabIndex} onChange={setTabIndex} colorScheme="teal">
        <TabList><Tab>Пользователи</Tab><Tab>Товары</Tab></TabList>
        <TabPanels>
          <TabPanel>
            <Heading size="md" mb={4}>Все пользователи</Heading>
            <Table variant="simple">
              <Thead><Tr><Th>ФИО</Th><Th>Email</Th><Th>Роль</Th></Tr></Thead>
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
              <Button colorScheme="teal" onClick={() => handleOpenModal()}>Добавить товар</Button>
            </Flex>
            <Table variant="simple">
              <Thead><Tr><Th>Название</Th><Th>Цена</Th><Th>Описание</Th><Th>Действия</Th></Tr></Thead>
              <Tbody>
                {products.map(prod => (
                  <Tr key={prod.id}>
                    <Td>{prod.name}</Td>
                    <Td>{prod.price.toLocaleString("ru-RU")} ₽</Td>
                    <Td maxW="250px" overflow="hidden" textOverflow="ellipsis">{prod.description}</Td>
                    <Td>
                      <Flex gap={2}>
                        <Button size="sm" colorScheme="blue" onClick={() => handleOpenModal(prod)}>Изменить</Button>
                        <Button size="sm" colorScheme="red" onClick={() => handleDeleteProduct(prod.id)}>Удалить</Button>
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
              <Input placeholder="Название" value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })} />
              <Input placeholder="Цена" type="number" value={formState.price}
                onChange={e => setFormState({ ...formState, price: e.target.value })} />
              <Input placeholder="Описание" value={formState.description}
                onChange={e => setFormState({ ...formState, description: e.target.value })} />
              <Input placeholder='{"ОЗУ": "16Гб", "Процессор": "Intel Core i7"}' value={formState.characteristics}
                onChange={e => setFormState({ ...formState, characteristics: e.target.value })} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => { onClose(); resetForm(); }}>Отмена</Button>
            <Button colorScheme="teal" isLoading={isSaving} onClick={handleSaveProduct}>Сохранить</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
