import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { IProductWithQuantity } from "../../models/IProduct";
import { useAppDispatch, useAppSelector } from "../../redux";
import { CartItemCard } from "../../ui/CartItemCard/CartItemCard";
import { removeFromCart } from "../../store/slices/cartSlice";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

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
          {cartItems.map((item: IProductWithQuantity) => {
            console.log("Rendering item:", item);
            return (
              <CartItemCard
                key={item.id}
                cartItem={item}
                quantity={item.quantity || 1}
                onRemove={() => dispatch(removeFromCart(item.id))}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};
