// BrandContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BrandContextProps {
  selectedBrand: string[];
  setSelectedBrand: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrandContext = createContext<BrandContextProps | undefined>(undefined);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
};

interface BrandProviderProps {
  children: ReactNode;
}

export const BrandProvider: React.FC<BrandProviderProps> = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);

  return (
    <BrandContext.Provider value={{ selectedBrand, setSelectedBrand }}>
      {children}
    </BrandContext.Provider>
  );
};
