import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import { Product, CartItem, User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('q6_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('q6_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('q6_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('q6_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Catalog onAddToCart={handleAddToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveFromCart}
                />
              }
            />
            <Route
              path="/auth"
              element={user ? <Navigate to="/" /> : <Auth onLogin={handleLogin} />}
            />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-100 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-indigo-600 p-1.5 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Q6</span>
                </div>
                <p className="text-gray-500 max-w-sm">
                  Made by students at Avanthi institute of technology , Team Q6
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-500 text-sm">
                  <li><Link to="/" className="hover:text-indigo-600 transition-colors">Catalog</Link></li>
                  <li><Link to="/cart" className="hover:text-indigo-600 transition-colors">Cart</Link></li>
                  <li><Link to="/auth" className="hover:text-indigo-600 transition-colors">Login</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                <ul className="space-y-2 text-gray-500 text-sm">
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">Shipping Policy</a></li>
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">Returns</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-50 mt-12 pt-8 text-center text-sm text-gray-400">
              © 2026 Q6. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
