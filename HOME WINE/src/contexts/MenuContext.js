import { createContext, useState } from "react";

 
export const MenuContext = createContext();
function MenuProvider({ children }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <MenuContext.Provider
      value={{ openMenu, openSearch, setOpenMenu, setOpenSearch }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
