import { Box, Heading, Text, Button, Flex, Spinner } from "@chakra-ui/react";
import { Link, useParams, type LinkProps } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IProduct } from "../../models/IProduct";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

        <Button colorScheme="teal">Добавить в корзину</Button>
      </Box>
    </Box>
  );
}
