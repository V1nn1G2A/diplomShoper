import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, VStack, useToast, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { IProduct } from "../../models/IProduct";
import { CartItemCard } from "../../ui/CartItemCard/CartItemCard";
import { cartApi } from "../../api/cartApi";

interface CartItem extends IProduct {
  quantity: number;
  cart_id: number;
}

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        toast({
          title: "Ошибка",
          description: "Необходимо войти в аккаунт",
          status: "error",
          duration: 3000,
        });
        navigate("/");
        return;
      }

      const user = JSON.parse(userData);
      const response = await cartApi.getCart(user.id);
      setCartItems(response.data);
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить корзину",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemoveItem = async (productId: number) => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      await cartApi.deleteFromCart(user.id, productId);
      
      setCartItems(prev => prev.filter(item => item.id !== productId));
      
      toast({
        title: "Успех",
        description: "Товар удален из корзины",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить товар",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      
      if (newQuantity <= 0) {
        await handleRemoveItem(productId);
        return;
      }

      await cartApi.updateCartItem(user.id, {
        productId,
        quantity: newQuantity,
      });
      
      setCartItems(prev => 
        prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Ошибка обновления количества:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить количество",
        status: "error",
        duration: 3000,
      });
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <Box px="100px" py={8} minH="60vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box px="100px" py={8}>
      <Heading mb={6} color="brand.primary">
        Корзина
      </Heading>

      {cartItems.length === 0 ? (
        <VStack spacing={4}>
          <Text>Корзина пуста.</Text>
          <Button onClick={() => navigate("/")} colorScheme="teal">
            На главную
          </Button>
        </VStack>
      ) : (
        <Box>
          <VStack spacing={4} mb={6}>
            {cartItems.map((item: CartItem) => (
              <CartItemCard
                key={item.id}
                cartItem={item}
                quantity={item.quantity}
                onRemove={() => handleRemoveItem(item.id)}
                onUpdateQuantity={(newQuantity) => handleUpdateQuantity(item.id, newQuantity)}
              />
            ))}
          </VStack>
          
          <Box 
            bg="brand.card" 
            p={4} 
            borderRadius="lg" 
            boxShadow="sm"
            mb={4}
            textAlign="right"
          >
            <Text fontSize="xl" fontWeight="bold" color="brand.primary">
              Итого: {totalAmount.toLocaleString("ru-RU")} ₽
            </Text>
          </Box>

          <VStack spacing={4}>
            <Button colorScheme="teal" size="lg" w="full">
              Оформить заказ
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" colorScheme="teal">
              Продолжить покупки
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};