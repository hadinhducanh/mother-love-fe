// src/context/WishlistContext.tsx
import { ProductsObj } from '@/model/Product';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


export interface WishlistItem extends ProductsObj {
   
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: ProductsObj) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: ProductsObj) => {
    const existingItem = wishlistItems.find(item => item.productId === product.productId);

    if (!existingItem) {
      const newItem: WishlistItem = {
        ...product,
       
      };
      setWishlistItems(prevItems => [...prevItems, newItem]);
    }
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
