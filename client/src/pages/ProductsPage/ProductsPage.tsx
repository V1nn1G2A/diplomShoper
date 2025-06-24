import { Box, Grid, Heading } from "@chakra-ui/react";
import { ProductCard } from "../../ui/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useLayoutEffect, useState, useEffect } from "react";
import axios from "axios";
import type { IProduct, IProductWithQuantity } from "../../models/IProduct";
import { cartApi } from "../../api/cartApi";
import { useUser } from "../../context/UserContext";
import { useToast } from "@chakra-ui/react";
export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const toast = useToast();
  const user = useUser()
  const userId = user.user?.id

  const [products, setProducts] = useState<IProductWithQuantity[]>([]);

  // Загрузка продуктов с сервера
  useEffect(() => {
    axios
      .get<IProduct[]>(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        const enriched = res.data.map((p) => ({ ...p, quantity: 0 }));
        setProducts(enriched);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке продуктов:", err);
      });
  }, []);

  // Синхронизация с корзиной
  useLayoutEffect(() => {
    setProducts((prev) =>
      prev.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        return {
          ...product,
          quantity: cartItem ? cartItem.quantity : 0,
        };
      })
    );
  }, [cartItems]);

  const handleAddToCart = async (id: number, direction: "up" | "down" = "up") => {
    if (!userId) {
      toast({
        title: "Необходимо авторизоваться",
        description: "Войдите в аккаунт, чтобы добавлять товары в корзину.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    const product = products.find((p) => p.id === id);
    if (!product) return;
  
    const newQuantity = direction === "up" ? product.quantity + 1 : Math.max(0, product.quantity - 1);
  
    try {
      if (newQuantity === 0) {
        await cartApi.deleteFromCart(`${userId}`, product.id);
      } else {
        const inCart = cartItems.find((item) => item.id === product.id);
  
        if (inCart) {
          await cartApi.updateCartItem(`${userId}`, { productId: product.id, quantity: newQuantity });
        } else {
          await cartApi.addToCart(`${userId}`, { productId: product.id, quantity: 1 });
        }
      }
  
      dispatch(addToCart({ ...product, quantity: newQuantity }));
  
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                quantity: newQuantity,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Ошибка при обновлении корзины:", err);
    }
  };

  return (
    <Box bg="brand.bg" minH="100vh" py="100px" px={{ base: 4, md: 10 }}>
      <Box maxW="1200px" mx="auto">
        <Heading mb={8} color="brand.primary">
          Все товары
        </Heading>

        <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={6}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              card={product}
              handleClick={handleAddToCart}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
