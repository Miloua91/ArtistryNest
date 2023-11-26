import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ count: 0, items: [] });

  //TODO:implemant cookies;

  const addToCart = (count, productId, productInfo) => {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      var existingItem = cart.items[existingItemIndex];

      var newCount = Math.min(existingItem.count + count, 10);

      const updatedItems = [...cart.items];
      updatedItems[existingItemIndex] = { ...existingItem, count: newCount };

      setCart({
        count: cart.count + (newCount - existingItem.count),
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
    return {
      newCount,
      existingItem,
    };
  };

  const calculateSubtotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
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
