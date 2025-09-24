import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import GlobalStyles from "./GlobalStyles/GlobalStyles";
import MenuProvider from "./contexts/MenuContext";
import CartProvider from "./contexts/CartContext";
import FilterProvider from "./contexts/FilterContext";
import AuthProvider from "./contexts/AuthContext";
import NotifyProvider from "./contexts/NotifyContext";

import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <MenuProvider>
          <CartProvider>
            <FilterProvider>
              <NotifyProvider>
                <BrowserRouter>
                  <React.StrictMode>
                    <GlobalStyles>
                      <App />
                    </GlobalStyles>
                  </React.StrictMode>
                </BrowserRouter>
              </NotifyProvider>
            </FilterProvider>
          </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
