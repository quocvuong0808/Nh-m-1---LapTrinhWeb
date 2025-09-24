import { createContext, useState } from "react";

export const NotifyContext = createContext();
function NotifyProvider({ children }) {
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(false);
  return (
    <NotifyContext.Provider value={(message, setMessage, active, setActive)}>
      {children}
    </NotifyContext.Provider>
  );
}

export default NotifyProvider;
