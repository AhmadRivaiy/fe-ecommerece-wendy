'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItemType[]>([]);

    const addProduct = (item: CartItemType) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const updateCart = (item: CartItemType) => {
        setCart((prevCart) => {
            const isItemExists = prevCart.some((cartItem) => cartItem.id === item.id && cartItem.size === item.size);
        
            if (isItemExists) {
                return prevCart.map((cartItem) =>
                  cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity}
                    : cartItem
                );
              }
        
            return [...prevCart, item];
          });
    }

    const deleteProductCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addProduct, updateCart, deleteProductCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};