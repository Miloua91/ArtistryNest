import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ count: 0, items: [] });
  const [removedItems, setRemovedItems] = useState([]);

  //TODO:implemant cookies;

  const addToCart = (count, productId, productInfo) => {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    const existingRemovedItemIndex = removedItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingRemovedItemIndex !== -1) {
      const updatedRemovedItems = [...removedItems];
      updatedRemovedItems.splice(existingRemovedItemIndex, 1);
      setRemovedItems(updatedRemovedItems);
    }

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

  const updateItemCount = (productId, newCount) => {
    const updatedItems = cart.items
      .map((item) => {
        if (item.productId === productId) {
          const currentCount = item.count;
          const newTotalCount = Math.min(
            Math.max(currentCount + newCount, 0),
            10
          );
          if (newTotalCount === 0) {
            setRemovedItems((prevRemovedItems) => [...prevRemovedItems, item]);
            return null;
          }
          const updatedItem = { ...item, count: newTotalCount };
          return updatedItem;
        }
        return item;
      })
      .filter((item) => item !== null);

    const updatedCount = updatedItems.reduce(
      (total, item) => total + item.count,
      0
    );

    setCart({
      count: updatedCount,
      items: updatedItems,
    });

    const currentItem = cart.items.find((item) => item.productId === productId);
    const currentCount = currentItem ? currentItem.count : 0;
    return { updatedItems, currentCount };
  };

  const undoRemove = (productId) => {
    setRemovedItems((prevRemovedItems) => {
      const removedItemIndex = prevRemovedItems.findIndex(
        (item) => item.productId === productId
      );

      if (removedItemIndex !== -1) {
        const [removedItem] = prevRemovedItems.splice(removedItemIndex, 1);

        setCart((prevCart) => {
          const updatedItems = [...prevCart.items, removedItem];
          const updatedCount = updatedItems.reduce(
            (total, item) => total + item.count,
            0
          );

          return {
            count: updatedCount,
            items: updatedItems,
          };
        });
      }

      return [...prevRemovedItems];
    });
  };

  const calculateSubtotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        calculateSubtotal,
        updateItemCount,
        undoRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
