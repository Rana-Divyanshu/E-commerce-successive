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
    case "loginSignUpLoading": {
      return {
        ...state,
        loginSignUpLoading: action.payload,
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
    case "payId": {
      return {
        ...state,
        payId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const AppContextProvider = ({ children }) => {
  // const tempCart = [
  //   {
  //     id: 23,
  //     title: "Courage the cowardly Dog Funky Black T-shirt",
  //     rating: 4.5,
  //     price: 999,
  //     description:
  //       "Give your closet an instant upgrade by opting for the trendy cwc styled or your own Styled T-shirt. It features a distinctive graphic pattern and is designed in a black hue. This T-shirt is made from soft yet durable cotton material and features a crew and half sleeves.",
  //     category: "Men's Clothing",
  //     subCategory: "",
  //     tags: ["list", "cartoon"],
  //     showTags: ["list", "cartoon"],
  //     size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  //     quantity: 1,
  //   },
  //   {
  //     id: 24,
  //     title: "Itachi Uchiha Anime White T-shirt",
  //     rating: 4.5,
  //     price: 1299,
  //     description:
  //       "Give your closet an instant upgrade by opting for the trendy cwc styled or your own Styled T-shirt. It features a distinctive graphic pattern and is designed in a black hue. This T-shirt is made from soft yet durable cotton material and features a crew and half sleeves.",
  //     category: "Men's Clothing",
  //     subCategory: "",
  //     tags: ["list", "anime"],
  //     showTags: ["list", "anime"],
  //     size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  //     quantity: 1,
  //   },
  //   {
  //     id: 25,
  //     title: "Courage the cowardly Dog classic pale green T-shirt",
  //     rating: 4.5,
  //     price: 1299,
  //     description:
  //       "Give your closet an instant upgrade by opting for the trendy cwc styled or your own Styled T-shirt. It features a distinctive graphic pattern and is designed in a black hue. This T-shirt is made from soft yet durable cotton material and features a crew and half sleeves.",
  //     category: "Men's Clothing",
  //     subCategory: "",
  //     tags: ["list", "cartoon"],
  //     showTags: ["list", "cartoon"],
  //     size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  //     quantity: 1,
  //   },
  // ];
  const [appData, dispatch] = useReducer(reducer, {
    currLang: "English",
    loginSignUpLoading: false,
    windowWidth: 0,
    productsGrid: null,
    productsList: null,
    productsView: "list",
    eachProductDetail: {},
    // cartItems: tempCart,
    cartItems: [],
    productData: [],
    payId: null,
  });

  useEffect(() => {
    const languageData = {
      English: dataEnglish,
      Hindi: dataHindi,
      Arabic: dataArabic,
    };
    const payload = languageData[appData.currLang] || dataEnglish;
    dispatch({ type: "productsData", payload });
  }, [appData.currLang]);

  return (
    <AppContext.Provider value={{ appData, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
