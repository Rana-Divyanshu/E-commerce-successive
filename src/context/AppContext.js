import { createContext, useReducer } from "react";
export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "user": {
      return {
        ...state,
        user: action.payload,
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
  let tempCart = [
    {
      id: 23,
      title: "Courage the cowardly Dog Funky Black T-shirt",
      rating: 4.5,
      price: 999,
      description:
        "Give your closet an instant upgrade by opting for the trendy cwc styled or your own Styled T-shirt. It features a distinctive graphic pattern and is designed in a black hue. This T-shirt is made from soft yet durable cotton material and features a crew and half sleeves.",
      category: "Men's Clothing",
      subCategory: "",
      tags: ["list", "cartoon"],
      size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
      quantity: 1,
    },
  ];
  // {
  //   id: 24,
  //   title: "Itachi Uchiha Anime White T-shirt",
  //   rating: 4.5,
  //   price: 1299,
  //   description:
  //     "Give your closet an instant upgrade by opting for the trendy cwc styled or your own Styled T-shirt. It features a distinctive graphic pattern and is designed in a black hue. This T-shirt is made from soft yet durable cotton material and features a crew and half sleeves.",
  //   category: "Men's Clothing",
  //   subCategory: "",
  //   tags: ["list", "anime"],
  //   size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  //   quantity: 1,
  // },
  // {
  //   id: 25,
  //   title: "Courage the cowardly Dog classic pale green T-shirt",
  //   rating: 4.5,
  //   price: 1299,
  //   description:
  //     "Give your closet an instant upgrade by opting for the trendy cwc styled or your own Styled T-shirt. It features a distinctive graphic pattern and is designed in a black hue. This T-shirt is made from soft yet durable cotton material and features a crew and half sleeves.",
  //   category: "Men's Clothing",
  //   subCategory: "",
  //   tags: ["list", "cartoon"],
  //   size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  //   quantity: 1,
  // },
  // {
  //   id: 26,
  //   title: "Engineer Girl T-shirt",
  //   rating: 4.5,
  //   price: 1199,
  //   description:
  //     "Give your closet an instant upgrade by opting for the trendy cwc styled or your own Styled T-shirt. It features a distinctive graphic pattern and is designed in a black hue. This T-shirt is made from soft yet durable cotton material and features a crew and half sleeves.",
  //   category: "Women's Clothing",
  //   subCategory: "",
  //   tags: ["list", "engineering"],
  //   size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  //   quantity: 1,
  // },
  const [appData, dispatch] = useReducer(reducer, {
    user: null,
    windowWidth: 0,
    productsGrid: null,
    productsList: null,
    productsView: "list",
    eachProductDetail: {},
    cartItems: [],
    // cartItems: tempCart,
  });

  return (
    <AppContext.Provider value={{ appData, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
