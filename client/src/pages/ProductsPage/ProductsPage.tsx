// client/src/pages/ProductsPage/ProductsPage.tsx
import { 
  Box, 
  Grid, 
  Heading, 
  Input, 
  InputGroup, 
  InputLeftElement,
  Text,
  VStack
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ProductCard } from "../../ui/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useLayoutEffect, useState, useEffect, useMemo } from "react";
import axios from "axios";
import type { IProduct, IProductWithQuantity } from "../../models/IProduct";
import { cartApi } from "../../api/cartApi";
import { useUser } from "../../context/UserContext";
import { useToast } from "@chakra-ui/react";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const toast = useToast();
  const user = useUser();
  const userId = user.user?.id;

  const [products, setProducts] = useState<IProductWithQuantity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Фильтрация продуктов по поисковому запросу
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    });
  }, [products, searchQuery]);

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
        <VStack spacing={6} align="stretch">
          <Heading color="brand.primary">
            Все товары
          </Heading>

          {/* Поисковая строка */}
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
              _focus={{ borderColor: "brand.primary", boxShadow: "0 0 0 1px brand.primary" }}
            />
          </InputGroup>

          {/* Результаты поиска */}
          {searchQuery.trim() && (
            <Text color="gray.600" fontSize="sm">
              {filteredProducts.length > 0 
                ? `Найдено товаров: ${filteredProducts.length}`
                : "По вашему запросу ничего не найдено"
              }
            </Text>
          )}

          {/* Сетка товаров */}
          {filteredProducts.length > 0 ? (
            <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={6}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  card={product}
                  handleClick={handleAddToCart}
                />
              ))}
            </Grid>
          ) : searchQuery.trim() ? (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color="gray.500">
                По запросу "{searchQuery}" товары не найдены
              </Text>
              <Text fontSize="sm" color="gray.400" mt={2}>
                Попробуйте изменить поисковый запрос
              </Text>
            </Box>
          ) : (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color="gray.500">
                Товары загружаются...
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}