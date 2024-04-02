import React, { createContext, useContext, useState } from "react";

const AsideContext = createContext({
  open: false,
  closeAside: () => {},
  openAside: () => {},
});
const AsideProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const closeAside = () => {
    setOpen(false);
  };
  const openAside = () => {
    setOpen(true);
  };

  return (
    <AsideContext.Provider
      value={{
        closeAside,
        openAside,
        open,
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};
export const useAsideContext = () => useContext(AsideContext);

export default AsideProvider;
