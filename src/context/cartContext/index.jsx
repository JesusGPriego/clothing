import { createContext, useReducer } from 'react';
import { createAction } from '../../utils/reducer/reducer.utils';
const addCartItem = (cartItems, productToAdd) => {
  const index = cartItems.findIndex((item) => item.id === productToAdd.id);
  if (index > -1) {
    const itemToUpdate = { ...cartItems[index] };
    itemToUpdate.quantity += 1;
    const updatedCardItems = [...cartItems];
    updatedCardItems[index] = itemToUpdate;
    return updatedCardItems;
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const decreaseCartItem = (cartItems, productToDecrease) => {
  const index = cartItems.findIndex((item) => item.id === productToDecrease.id);
  if (index > -1) {
    const itemToUpdate = { ...cartItems[index] };
    itemToUpdate.quantity -= 1;
    const updatedCardItems = [...cartItems];
    updatedCardItems[index] = itemToUpdate;
    return updatedCardItems;
  }
};
const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

// value I want to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  subtractItemToCart: () => null,
  removeItemFromCart: () => null,
  cartCount: null,
  cartTotal: null,
});

const CART_ACTIONS_TYPE = {

  SET_CART_ITEMS: 'SET_CART_ITEMS',
  TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',

};

const cartReducer = (state, action) => {

  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTIONS_TYPE.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type '${type} in cartReducer`);
  }

};



const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

// component itself
export const CartProvider = ({ children }) => {

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const subtractItemToCart = (productToDecrease) => {

    if (productToDecrease.quantity > 1) {
      const newCartItems = decreaseCartItem(cartItems, productToDecrease);
      updateCartItemsReducer(newCartItems);
    } else {
      removeItemFromCart(productToDecrease);
    };

  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const [state, dispatch] = useReducer(cartReducer, initialState)

  const { cartItems, isCartOpen, cartCount, cartTotal } = state;

  const setIsCartOpen = (bool) => {
    dispatch(
      createAction(
        CART_ACTIONS_TYPE.TOGGLE_CART_OPEN,
        bool
      )
    );
  }

  const updateCartItemsReducer = (newCartItems) => {
    const cartCount = newCartItems ? newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    ) : 0;

    const cartTotal = newCartItems ? newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    ) : 0;

    const payload = {
      cartItems: newCartItems || [],
      cartTotal,
      cartCount,
    };

    dispatch(
      createAction(
        CART_ACTIONS_TYPE.SET_CART_ITEMS,
        payload
      )
    );

  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    subtractItemToCart,
    removeItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
