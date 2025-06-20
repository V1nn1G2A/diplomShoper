import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import type { IProduct } from "../../models/IProduct";

interface CartItemCardProps {
  cartItem: IProduct;
  quantity: number;
  onRemove: () => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  cartItem: { name, price },
  quantity = 1,
  onRemove,
}) => {
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
      <Box>
        <Text fontWeight="bold" fontSize="md" color="brand.primary" mb={1}>
          {name}
        </Text>
        <Text fontSize="sm" color="brand.secondary">
          {price.toLocaleString("ru-RU")} ₽ × {quantity}
        </Text>
      </Box>

      <Flex align="center" gap={3}>
        <Text fontWeight="semibold" color="brand.accent">
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
