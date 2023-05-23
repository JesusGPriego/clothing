import { CART_ACTIONS_TYPE } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


// Helper functions to handle cartItems:
const addCartItem = ( cartItems, productToAdd ) =>
{
    const index = cartItems.findIndex( ( item ) => item.id === productToAdd.id );
    if ( index > -1 )
    {
        const itemToUpdate = { ...cartItems[ index ] };
        itemToUpdate.quantity += 1;
        const updatedCardItems = [ ...cartItems ];
        updatedCardItems[ index ] = itemToUpdate;
        return updatedCardItems;
    }
    return [ ...cartItems, { ...productToAdd, quantity: 1 } ];
};
const decreaseCartItem = ( cartItems, productToDecrease ) =>
{
    const index = cartItems.findIndex( ( item ) => item.id === productToDecrease.id );
    if ( index > -1 )
    {
        const itemToUpdate = { ...cartItems[ index ] };
        itemToUpdate.quantity -= 1;
        const updatedCardItems = [ ...cartItems ];
        updatedCardItems[ index ] = itemToUpdate;
        return updatedCardItems;
    }
};
const removeCartItem = ( cartItems, productToRemove ) =>
{
    console.log( 'cartItems al remover ->', cartItems );
    return cartItems.filter( ( item ) => item.id !== productToRemove.id );
};
export const addItemToCart = ( cartItems, productToAdd ) =>
{
    const newCartItems = addCartItem( cartItems, productToAdd );
    return createAction( CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems );
};
export const subtractItemToCart = ( cartItems, productToDecrease ) =>
{

    if ( productToDecrease.quantity > 1 )
    {
        const newCartItems = decreaseCartItem( cartItems, productToDecrease );
        return createAction( CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems );
    }
    const newCartItems = removeCartItem( cartItems, productToDecrease );
    return createAction( CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems );

};
export const removeItemFromCart = ( cartItems, productToRemove ) =>
{
    const newCartItems = removeCartItem( cartItems, productToRemove );
    return createAction( CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems );
};

export const clearCart = () =>
{
    return createAction( CART_ACTIONS_TYPE.SET_CART_ITEMS, [] );
};

export const setIsCartOpen = ( boolean ) => createAction( CART_ACTIONS_TYPE.TOGGLE_CART_OPEN, boolean );
