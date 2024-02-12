import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { setCookie, getCookie } from "cookies-next";

const userId = getCookie("userId") || uuidv4();

setCookie("userId", userId);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const CartContext = createContext();

export function CartProvider({ children }) {
  const userId = getCookie("userId");
  const [cart, setCart] = useState({ count: 0, items: [] });
  const [removedItems, setRemovedItems] = useState([]);
  const [isResetCart, SetIsResetCart] = useState(false);

  async function CookiesUpdate() {
    const { data: data, error } = await supabase
      .from("cookies")
      .update({
        cart: cart,
      })
      .eq("id", userId)
      .select("cart");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("cookies")
          .select("cart")
          .eq("id", userId);

        if (error) {
          throw error;
        }

        // If the user ID doesn't exist, insert a new record
        if (data.length === 0) {
          await supabase.from("cookies").upsert([
            {
              id: userId,
              cart: { count: 0, items: [] },
            },
          ]);
        }

        const initialCart = data[0]?.cart || { count: 0, items: [] };
        setCart(initialCart);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (cart.items.length > 0 || removedItems.length > 0 || isResetCart) {
    CookiesUpdate();
  }

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
            CookiesUpdate();

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

  const resetCart = () => {
    setCart({ count: 0, items: [] });
    SetIsResetCart(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        calculateSubtotal,
        updateItemCount,
        undoRemove,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
