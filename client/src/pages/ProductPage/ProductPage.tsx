import { Box, Heading, Text, Button, Flex, Spinner, useToast } from "@chakra-ui/react";
import { Link, useParams, type LinkProps } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IProduct } from "../../models/IProduct";
import { productApi } from "../../api/productsApi";
import { cartApi } from "../../api/cartApi";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getById(Number(id));
        setProduct(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке товара:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) {
        toast({
          title: "Ошибка",
          description: "Необходимо войти в аккаунт",
          status: "error",
          duration: 3000,
        });
        return;
      }

      await cartApi.addToCart(user.id, {
        productId: Number(id),
        quantity: 1,
      });

      toast({
        title: "Успех",
        description: "Товар добавлен в корзину",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар в корзину",
        status: "error",
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box bg="brand.bg" minH="100vh" py="100px" px={{ base: 4, md: 10 }}>
        <Box maxW="800px" mx="auto">
          <Heading color="brand.primary">Товар не найден</Heading>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="brand.bg" minH="100vh" py="100px" px={{ base: 4, md: 10 }}>
      <Box maxW="800px" mx="auto">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading color="brand.primary">{product.name}</Heading>
          <Button
            as={Link as React.ElementType<LinkProps>}
            to="/"
            colorScheme="teal"
            size="sm"
          >
            На главную
          </Button>
        </Flex>

        <Text fontSize="md" mb={4} color="brand.secondary">
          {product.description}
        </Text>

        <Text fontSize="lg" fontWeight="semibold" color="brand.accent" mb={4}>
          {product.price.toLocaleString("ru-RU")} ₽
        </Text>

        <Box mb={6}>
          <Text fontWeight="bold" mb={2} color="brand.primary">Характеристики:</Text>
          <Box fontSize="sm" color="brand.secondary">
            {Object.entries(product.characteristics).map(([key, value]) => (
              <Text key={key}>{key}: {value}</Text>
            ))}
          </Box>
        </Box>

        <Button colorScheme="teal" onClick={handleAddToCart}>
          Добавить в корзину
        </Button>
      </Box>
    </Box>
  );
}