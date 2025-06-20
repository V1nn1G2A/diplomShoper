import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import React from "react";

interface CartActionButtonProps {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const CardActionButton: React.FC<CartActionButtonProps> = ({
  onAdd,
  onRemove,
  quantity = 0,
}) => {
  if (quantity === 0) {
    return (
      <Button size="sm" colorScheme="blue" onClick={onAdd}>
        Добавить в корзину
      </Button>
    );
  }

  return (
    <ButtonGroup size="sm" isAttached variant="outline" colorScheme="blue">
      <Button onClick={onRemove}>-</Button>
      <Text px={2} alignSelf="center">
        {quantity}
      </Text>
      <Button onClick={onAdd}>+</Button>
    </ButtonGroup>
  );
};
