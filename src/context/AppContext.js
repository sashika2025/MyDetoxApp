import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const login = (username, password) => {
    if (username === 'sashika' && password === '123') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{ user, login, logout, cart, addToCart, clearCart }}
    >
      {children}
    </AppContext.Provider>
  );
}