import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ProductsObj } from '@/model/Product';
import { VoucherObjbyID } from '@/model/Voucher';

export interface CartItems extends ProductsObj {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItems[];
  addToCart: (product: CartItems) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  selectedVoucher: VoucherObjbyID | null;
  setSelectedVoucher: React.Dispatch<React.SetStateAction<VoucherObjbyID | null>>;
  discountApplied: boolean;
  setDiscountApplied: React.Dispatch<React.SetStateAction<boolean>>;
  calculateSubtotal: () => number;
  calculateTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [selectedVoucher, setSelectedVoucher] = useState<VoucherObjbyID | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);

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
      setDiscountApplied(false);
      setSelectedVoucher(null);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    let total = subtotal;
    if (discountApplied && selectedVoucher) {
      total = subtotal - selectedVoucher.voucher.discount;
    }
    return Math.max(0, total);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, updateQuantity, clearCart, selectedVoucher, setSelectedVoucher, discountApplied, setDiscountApplied, calculateSubtotal, calculateTotal }}>
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
