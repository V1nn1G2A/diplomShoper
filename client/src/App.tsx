import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import { Header } from "./components/Header/Header";
import AccountPage from "./pages/AccountPage/AccountPage";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel";
import { CartPage } from "./pages/CartPage/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
