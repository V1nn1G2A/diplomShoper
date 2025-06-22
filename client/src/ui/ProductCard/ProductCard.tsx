import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { IProductWithQuantity } from "../../models/IProduct";
import { CardActionButton } from "../CardActionButton/CardActionButton";

interface ProductCardProps {
  card: IProductWithQuantity;
  handleClick: (id: number, direction: "up" | "down") => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  card: { id, name, description, price, characteristics, quantity },
  handleClick,
}) => {
  return (
    <Box
      p={5}
      bg="brand.card"
      borderRadius="lg"
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{ boxShadow: "md", transform: "translateY(-4px)" }}
      display="flex"
      flexDirection={{ base: "column" }}
      justifyContent="space-between"
      minH="400px"
    >
      <Box>
        <Link to={`/product/${id}`}>
          <Text fontWeight="bold" fontSize="lg" color="brand.primary" mb={2}>
            {name}
          </Text>
        </Link>

        <Box mb={3}>
          <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDItVRptC5139xw0LhV44p-bIkn5OCW9VEpg&s"
            }
            alt={name}
            width="100%"
            height="120px"
            objectFit="cover"
            borderRadius="md"
          />
        </Box>

        <Text fontSize="sm" color="brand.secondary" mb={3} noOfLines={2}>
          {description}
        </Text>

        <Text fontWeight="semibold" fontSize="lg" color="brand.accent" mb={3}>
          {price.toLocaleString("ru-RU")} ₽
        </Text>

        <Box fontSize="xs" color="brand.secondary" mb={4}>
          {Object.entries(characteristics || {}).slice(0, 3).map(([key, value]) => (
            <Text key={key} noOfLines={1}>
              {key}: {value}
            </Text>
          ))}
        </Box>
      </Box>

      <CardActionButton
        quantity={quantity}
        onAdd={() => handleClick(id, "up")}
        onRemove={() => handleClick(id, "down")}
      />
    </Box>
  );
};