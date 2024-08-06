import { createContext, useState } from "react";
export const CounterContext = createContext();
const CounterProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([
    ["napolitana", 0],
    ["española", 0],
    ["salame", 0],
    ["cuatro estaciones", 0],
    ["bacon", 0],
    ["pollo picante", 0],
  ]);
  const [total, setTotal] = useState(0);

  return (
    <CounterContext.Provider value={{ carrito, setCarrito, total, setTotal }}>
      {children}
    </CounterContext.Provider>
  );
};
export default CounterProvider;
