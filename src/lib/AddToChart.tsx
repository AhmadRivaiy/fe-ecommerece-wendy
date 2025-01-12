import { v4 as uuidv4 } from 'uuid';

export const addToCart = (item: CartItem) => {
    const cart = JSON.parse(localStorage.getItem(process.env.NAME_CART || 'ws_cart') || '[]') as CartItem[];
    const existingItemIndex = cart.findIndex(cartItem => cartItem.detail.id === item.detail.id && cartItem.size === item.size);
    const _id = uuidv4();
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
        cart[existingItemIndex].sub_total += item.sub_total;
        cart[existingItemIndex].id = item.detail.id;
        item.id = _id; //BUG
    } else {
        item.addedAt = new Date().toISOString();
        item.id = _id;
        cart.push(item);
    }

    localStorage.setItem(process.env.NAME_CART || 'ws_cart', JSON.stringify(cart));
    return _id;
};

export const updateProductCart = (item: CartItem) => {
    const cart = JSON.parse(localStorage.getItem(process.env.NAME_CART || 'ws_cart') || '[]') as CartItem[];
    const existingItemIndex = cart.findIndex(cartItem => cartItem.detail.id === item.detail.id && cartItem.size === item.size);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity = item.quantity;
        cart[existingItemIndex].sub_total = item.sub_total;
        cart[existingItemIndex].id = item.detail.id;
    }

    localStorage.setItem(process.env.NAME_CART || 'ws_cart', JSON.stringify(cart));
    return item.id;
};

export const getCart = (): CartItem[] => {
    return JSON.parse(localStorage.getItem(process.env.NAME_CART || 'ws_cart') || '[]') as CartItem[];
};

export const getCount = (): number => {
    const _cart = JSON.parse(localStorage.getItem(process.env.NAME_CART || 'ws_cart') || '[]') as CartItem[];
    return _cart?.length || 0;
}

export const getTotalPrice = (): number => {
    let _total = 0;
    const _cart = JSON.parse(localStorage.getItem(process.env.NAME_CART || 'ws_cart') || '[]') as CartItem[];

    _cart.map((x) => {
        _total += x.sub_total
    })

    return _total;
}

export const removeFromCart = (itemId: string, size: string) => {
    let cart = JSON.parse(localStorage.getItem(process.env.NAME_CART || 'ws_cart') || '[]') as CartItem[];
    cart = cart.filter(cartItem => cartItem.id !== itemId && cartItem.size);
    localStorage.setItem(process.env.NAME_CART || 'ws_cart', JSON.stringify(cart));
    return size;
};