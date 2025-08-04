import React, { createContext, useState } from "react";

export const CategoryContext = createContext();

const initialCategories = [
  { id: 1, name: "Art Market" },
  { id: 2, name: "Beach" },
  { id: 3, name: "Cultural Park" },
];

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};