// src/context/CartContext.tsx
import { ProductsObj } from '@/model/Product';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


export interface CartItems extends ProductsObj {
  quantity : number
}

interface CartContextType {
  cartItems: CartItems[];
  addToCart: (product: CartItems) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CartItems) => {
    const existingItem = cartItems.find(item => item.productId === product.productId);

    if (existingItem) {
      updateQuantity(existingItem.productId, existingItem.quantity + 1);
    } else {
      const newItem: CartItems = {
        ...product,
        quantity: 1
      };
      setCartItems(prevItems => [...prevItems, newItem]);
    }
  };

  const removeItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => item.productId === productId ? { ...item, quantity } : item)
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
