// client/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { UserProvider } from './context/UserContext';
import { Header } from './components/Header/Header';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductPage from './pages/ProductPage/ProductPage';
import { CartPage } from './pages/CartPage/CartPage';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import AccountPage from './pages/AccountPage/AccountPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

function App() {
  return (
    <ChakraProvider >
      <Provider store={store}>
        <UserProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
            </Routes>
          </Router>
        </UserProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default App;