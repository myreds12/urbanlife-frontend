import React, { createContext, useState } from "react";

export const TypeAkomodasiContext = createContext();

const initialCategories = [
  { id: 1, name: "Art Market" },
  { id: 2, name: "Beach" },
  { id: 3, name: "Cultural Park" },
];

export const TypeAkomodasiProvider = ({ children }) => {
  const [typeAkomodasi, setTypeAkomodasi] = useState(initialCategories);

  return (
    <TypeAkomodasiContext.Provider value={{ typeAkomodasi, setTypeAkomodasi }}>
      {children}
    </TypeAkomodasiContext.Provider>
  );
};