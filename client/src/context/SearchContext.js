// import { createContext, useReducer } from "react";

// const INITIAL_STATE = {
//   city: undefined,
//   dates: [],
//   options: {
//     adult: undefined,
//     children: undefined,
//     room: undefined,
//   },
// };

// //~create context
// export const SearchContext = createContext(INITIAL_STATE);

// //~reducer
// const SearchReducer = (state, action) => {
//   switch (action.type) {
//     case "NEW_SEARCH":
//       return action.payload;
//     case "RESET_SEARCH":
//       return INITIAL_STATE;
//     default:
//       return state;
//   }
// };

// //~Actions

// export const SearchContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

//   return (
//     <SearchContext.Provider
//       value={{
//         city: state.city,
//         dates: state.dates,
//         options: state.options,
//         dispatch,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };
