import { Box, Heading, Text, Stack, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const user = {
  first_name: "Иван",
  last_name: "Иванов",
  middle_name: "Иванович",
  email: "ivan@example.com",
  phone: "89001234567",
  city: "Москва",
};

export default function AccountPage() {
  return (
    <Box bg="brand.bg" minH="100vh" py="100px" px={{ base: 4, md: 10 }}>
      <Box
        maxW="600px"
        mx="auto"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
      >
        <Flex mb={6} align="center" justify="space-between">
          <Heading color="brand.primary">Мой аккаунт</Heading>
          <Button
            as={Link}
            to="/"
            colorScheme="teal"
            size="sm"
            variant="outline"
          >
            Назад
          </Button>
        </Flex>
        <Stack spacing={4} color="brand.secondary" fontSize="md">
          <Text><b>Фамилия:</b> {user.last_name}</Text>
          <Text><b>Имя:</b> {user.first_name}</Text>
          <Text><b>Отчество:</b> {user.middle_name || "—"}</Text>
          <Text><b>Email:</b> {user.email}</Text>
          <Text><b>Телефон:</b> {user.phone || "—"}</Text>
          <Text><b>Город:</b> {user.city || "—"}</Text>
        </Stack>
      </Box>
    </Box>
  );
}
