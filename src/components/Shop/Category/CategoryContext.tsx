// CategoryContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <CategoryContext.Provider
      value={{ selectedCategories, setSelectedCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
