import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

const addToCart = (product) => {
  let added = false;

  setCartItems((prev) => {
    const exists = prev.find((item) => item.id === product.id);

    if (exists) {
      if (exists.quantity < product.stock) {
        added = true;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return prev;
      }
    } else {
      if (product.stock > 0) {
        added = true;
        return [...prev, { ...product, quantity: 1 }];
      } else {
        return prev;
      }
    }
  });

  if (added) {
    toast.success(`Item Added in the Cart`, {
      position: "top-right",
      autoClose: 3000,
    });
  } else {
    toast.error(`OUT OF STOCK`, {
      position: "top-right",
      autoClose: 3000,
    });
  }
};


  const updateQuantity = (id, change) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + change), // Prevent going below 1
          }
        : item
    )
  );
};


  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
