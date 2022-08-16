import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CheckoutContextProvider } from "./context/CheckoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CheckoutContextProvider>
        <App />
      </CheckoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
