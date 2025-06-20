import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const colors = {
  brand: {
    bg: "#F0F4F8",
    card: "#FFFFFF",
    primary: "#2B6CB0",
    secondary: "#4A5568",
    accent: "#38B2AC",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
