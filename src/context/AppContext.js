import { createContext, useReducer, useEffect } from "react";
import { dataArabic, dataEnglish, dataHindi } from "../utils/data";
export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "lang": {
      return {
        ...state,
        currLang: action.payload,
      };
    }
    case "user": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "productsData": {
      return {
        ...state,
        productData: action.payload,
      };
    }
    case "SET_WINDOW_WIDTH": {
      return {
        ...state,
        windowWidth: action.payload,
      };
    }
    case "productsView": {
      return {
        ...state,
        productsView: action.payload,
      };
    }
    case "productsGrid": {
      return {
        ...state,
        productsGrid: action.payload,
      };
    }
    case "productsList": {
      return {
        ...state,
        productsList: action.payload,
      };
    }
    case "eachProductDetail": {
      return {
        ...state,
        eachProductDetail: action.payload,
      };
    }
    case "cartItems": {
      return {
        ...state,
        cartItems: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const AppContextProvider = ({ children }) => {
  const [appData, dispatch] = useReducer(reducer, {
    currLang: "English",
    user: null,
    windowWidth: 0,
    productsGrid: null,
    productsList: null,
    productsView: "list",
    eachProductDetail: {},
    cartItems: [],
    productData: [],
  });

  useEffect(() => {
    if (appData.currLang === "English") {
      dispatch({ type: "productsData", payload: dataEnglish });
    } else if (appData.currLang === "Hindi") {
      dispatch({ type: "productsData", payload: dataHindi });
    } else if (appData.currLang === "Arabic") {
      dispatch({ type: "productsData", payload: dataArabic });
    } else {
      dispatch({ type: "productsData", payload: [] });
    }
  }, [appData.currLang]);

  return (
    <AppContext.Provider value={{ appData, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
