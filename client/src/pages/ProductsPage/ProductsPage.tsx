import { Box, Grid, Heading } from "@chakra-ui/react";
import { ProductCard } from "../../ui/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useLayoutEffect, useState, useEffect } from "react";
import axios from "axios";
import type { IProduct, IProductWithQuantity } from "../../models/IProduct";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [products, setProducts] = useState<IProductWithQuantity[]>([]);

  // Загрузка продуктов с сервера
  useEffect(() => {
    axios
      .get<IProduct[]>("http://localhost:5000/api/products")
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

  const handleAddToCart = (id: number, direction: "up" | "down" = "up") => {
    const product = products.find((p) => p.id === id);

    if (product) {
      const updatedProducts = products.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity:
                direction === "up"
                  ? p.quantity + 1
                  : Math.max(0, p.quantity - 1),
            }
          : p
      );

      setProducts(updatedProducts);

      if (direction === "up") {
        dispatch(addToCart({ ...product }));
      }
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
