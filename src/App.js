import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
