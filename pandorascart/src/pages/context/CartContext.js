import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ count: 0, items: [] });

//TODO:implemant cookies;

const addToCart = (count, productId, productInfo) => {
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    const updatedItems = cart.items.map((item) =>
      item.productId === productId
        ? { ...item, count: item.count + count }
        : item
    );

    setCart({
      count: cart.count + count,
      items: updatedItems,
    });
  } else {
    setCart({
      count: cart.count + count,
      items: [
        ...cart.items,
        {
          productId,
          count,
          ...productInfo,
        },
      ],
    });
  }
};



  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, calculateSubtotal }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
