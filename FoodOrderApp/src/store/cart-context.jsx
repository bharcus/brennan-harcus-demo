import {
  useReducer,
  createContext,
  useState
} from "react";
import { priceConverter } from "../helper-functions/utilityFunctions";

export const CartContext = createContext({
  cartItems: [{}],
  priceTotal: 0.00,
  productTotal: 0,
  addQuantity: () => {},
  subtractQuantity: () => {},
  addItem: () => {},
  removeItem: () => {},
  resetCart: () => {}
});

function cartHandler(cartState, action) {
  console.log("cartState before:", cartState);
  console.log("payload:", action.payload);
  let productIndex = null;
  if (action.payload.id) {
    productIndex = cartState.findIndex(
      (item) => item.id === action.payload.id
    );
  }
  let returnedCartState = [];
  console.log("action target:", action.target);
  console.log("productIndex:", productIndex);
  if (action.target === "addItem" && productIndex === -1) {
    const { id, name, price, quantity } = action.payload.newItem;
    const floatedPrice = parseFloat(price);
    returnedCartState = [
      ...cartState,
      {
        id: id,
        name: name,
        price: +floatedPrice,
        quantity: +quantity,
      },
    ];
    console.log("addedItem");
    return returnedCartState;
  } else if (
    action.target === "addQuantity" ||
    (action.target === "addItem" && productIndex > -1)
  ) {
    const { id, name, price, quantity } = cartState[productIndex];
    returnedCartState = cartState.map((cartItem) => {
      if (cartItem.id === id){
        return {id: id, name: name, price: price, quantity: quantity + 1};
      } else {
        return {...cartItem};
      }
    });
    return returnedCartState;
  } else if (
    action.target === "subtractQuantity" &&
    cartState[productIndex].quantity > 1
  ) {
    const { id, name, price, quantity } = cartState[productIndex];
    returnedCartState = cartState.map((cartItem) => {
      if (cartItem.id === id){
        return {id: id, name: name, price: price, quantity: quantity - 1};
      } else {
        return {...cartItem};
      }
    });
    return returnedCartState;
  } else if (
    action.target === "removeItem" ||
    (action.target === "subtractQuantity" && cartState[productIndex].quantity <= 1)
  ) {
    console.log('remove id', returnedCartState);
    returnedCartState = cartState.filter((cartItem) => {
      return cartItem.id !== action.payload.id;
    });
    console.log('returnedCart State', returnedCartState);
    return returnedCartState;
  } else if (action.target === "reset"){
    return [];
  }
  else {
    console.log("oldState");
    return cartState;
  }
}

export default function CartContextProvider({ children }) {
  const [priceTotal, setPriceTotal] = useState(0.00);
  const [productTotal, setProductTotal] = useState(0);
  const [currentCart, setCartDispatch] = useReducer(cartHandler, []);

  function resetCart(){
    console.log('inside reset');
    setCartDispatch({
      target: "reset",
      payload: {
        id: null,
      },
    });
    setPriceTotal(0.00);
    setProductTotal(0);
  }

  function addQuantity(item) {
    setCartDispatch({
      target: "addQuantity",
      payload: {
        id: item.id,
      },
    });
    // updatePriceTotal();
    setProductTotal((prevTotal) => {
      return prevTotal + 1;
    });
    setPriceTotal((prevTotal) => {
      return prevTotal + priceConverter(item.price);
    });
    console.log('current cart in addQuantity', currentCart);
  }

  function subtractQuantity(item) {
    setCartDispatch({
      target: "subtractQuantity",
      payload: {
        id: item.id,
      },
    });
    setProductTotal((prevTotal) => {
      return prevTotal - 1;
    });
    setPriceTotal((prevTotal) => {
      return prevTotal - priceConverter(item.price);
    });
    // updatePriceTotal();
    // updateProductTotal();
  }

  function addItem(item) {
    console.log("item here:", item);
    setCartDispatch({
      target: "addItem",
      payload: {
        id: item.id,
        newItem: {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      },
    });
    console.log('current cart in addItem', currentCart);
    // updatePriceTotal();
    // updateProductTotal();
    setProductTotal((prevTotal) => {
      return prevTotal + 1;
    });
    setPriceTotal((prevTotal) => {
      return prevTotal + priceConverter(item.price);
    });
  }

  function removeItem(item) {
    setCartDispatch({
      target: "removeItem",
      payload: {
        id: item.id,
      },
    });
    setProductTotal((prevTotal) => {
      return prevTotal - 1;
    });
    setPriceTotal((prevTotal) => {
      return prevTotal - priceConverter(item.price);
    });
    // updatePriceTotal();
    // updateProductTotal();
  }

  const cartCtx = {
    cartItems: currentCart,
    priceTotal: priceTotal,
    productTotal: productTotal,
    addQuantity: addQuantity,
    subtractQuantity: subtractQuantity,
    addItem: addItem,
    removeItem: removeItem,
    resetCart: resetCart
  };

  console.log("cartState after:", currentCart);
  console.log("priceTotal bottom", priceTotal);
  console.log("productTotal bottom", productTotal);
  console.log('------------end line---------------');

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
