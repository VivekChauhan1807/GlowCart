// src/screens/CartContext.js
import React, { createContext, useContext, useMemo, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // Quantity controls
  const incrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = (item.quantity || 1) - 1;
        return { ...item, quantity: next < 1 ? 1 : next };
      })
    );
  };

  // Helpers
  const getOriginal = (price, discountPercentage) => {
    const dp = Number(discountPercentage || 0);
    if (!dp || dp <= 0 || dp >= 100) return Number(price || 0);
    return Number((price / (1 - dp / 100)).toFixed(2));
  };

  // Totals
  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price || 0) * (item.quantity || 1), 0),
    [cartItems]
  );

  const totalOriginal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + getOriginal(Number(item.price || 0), item.discountPercentage) * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const totalDiscount = useMemo(() => {
    const diff = totalOriginal - totalAmount;
    return diff < 0 ? 0 : diff;
  }, [totalOriginal, totalAmount]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQty,
        decrementQty,
        totalAmount,
        totalOriginal,
        totalDiscount,
        getOriginal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);