import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  dish: [],
  quantity: 1,
  total: 0,
};

export const CheckoutContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "TOTAL":
      return {
        dish: action.payload,
        quantity: (state.quantity += 1),
        total: (state.total += action.payload.cost * action.payload.quantity),
      };
    default:
      return state;
  }
};

export const CheckoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <CheckoutContext.Provider
      value={{
        quantity: state.quantity,
        total: state.total,
        dispatch,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
