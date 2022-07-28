import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils'


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
})

export const CartProvider = ({ children }) => {

    const [{ isCartOpen, cartCount, cartTotal, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    console.log(cartItems);

    const updateCartItemsReducer = (cartItems) => {

        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        };

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload))

    }

   
    const value = {
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartItems,
        cartCount
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};