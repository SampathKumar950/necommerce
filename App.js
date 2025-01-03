import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './Productlist';
import MoreProductsPage from './MoreProducts';  // Page for more products
import CartPage from './CartPage';
import OrdersPage from './Ordersample';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/more-products" element={<MoreProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrdersPage/>} />



      </Routes>
    </Router>
  );
}

export default App;
