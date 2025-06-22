import { Box, Text, Flex, IconButton, Button, ButtonGroup } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import type { IProduct } from "../../models/IProduct";

interface CartItemCardProps {
  cartItem: IProduct;
  quantity: number;
  onRemove: () => void;
  onUpdateQuantity?: (newQuantity: number) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  cartItem: { name, price },
  quantity = 1,
  onRemove,
  onUpdateQuantity,
}) => {
  const handleQuantityChange = (direction: "increase" | "decrease") => {
    if (!onUpdateQuantity) return;
    
    const newQuantity = direction === "increase" ? quantity + 1 : quantity - 1;
    onUpdateQuantity(newQuantity);
  };

  return (
    <Flex
      bg="brand.card"
      borderRadius="lg"
      boxShadow="sm"
      p={4}
      align="center"
      justify="space-between"
      w="100%"
    >
      <Box flex="1">
        <Text fontWeight="bold" fontSize="md" color="brand.primary" mb={1}>
          {name}
        </Text>
        <Text fontSize="sm" color="brand.secondary">
          {price.toLocaleString("ru-RU")} ₽ за единицу
        </Text>
      </Box>

      <Flex align="center" gap={4}>
        {onUpdateQuantity && (
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button onClick={() => handleQuantityChange("decrease")}>
              -
            </Button>
            <Button pointerEvents="none">
              {quantity}
            </Button>
            <Button onClick={() => handleQuantityChange("increase")}>
              +
            </Button>
          </ButtonGroup>
        )}
        
        <Text fontWeight="semibold" color="brand.accent" minW="100px" textAlign="right">
          {(price * quantity).toLocaleString("ru-RU")} ₽
        </Text>
        
        <IconButton
          aria-label="Удалить товар"
          icon={<DeleteIcon />}
          size="sm"
          variant="ghost"
          colorScheme="red"
          onClick={onRemove}
        />
      </Flex>
    </Flex>
  );
};