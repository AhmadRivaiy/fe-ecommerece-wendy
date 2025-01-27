declare global {
    interface StockProduct {
        id: number;
        size: string;
        quantity: number;
    }

    interface FlowerLinkImageListType {
        id: string;
        name: string;
        imageUrl: string;
        category?: string | 'Flower';
        description?: string;
        priceAfterDiscount?: number;
        price?: number;
        inStock?: boolean;
        weight?: number;
        dimension?: string;
        slug?: string;
        list_images?: string[];
    }

    interface FlowerLinkImageType {
        id: string;
        name: string;
        imageUrl: string;
        category?: string | 'Flower';
        description?: string;
        priceAfterDiscount?: number;
        price?: number;
        inStock?: boolean;
        weight?: number;
        dimension?: string;
        slug?: string;
        list_images?: string[];
        stock: StockProduct[];
    }

    interface ListMenuLeft {
        name: string;
        url: string;
    }

    type CartItemType = {
        id: string;
        size: string;
        quantity?: number;
    };
    
    type CartContextType = {
        cart: CartItemType[];
        addProduct: (item: CartItemType) => void;
        updateCart: (item: CartItemType) => void;
        deleteProductCart: (item: CartItemType) => void;
    };

    interface CartItem {
        id: string;
        quantity: number;
        size?: string;
        cutting: string;
        addedAt?: string;
        sub_total: number;
        detail: FlowerLinkImageType
    }
    
    interface User {
      name: string;
      email: string;
    }
    
    interface AuthContextType {
      user: User | null;
      login: (userData: User) => void;
      logout: () => void;
    }

    interface AddressCart {
        [key: string]: string,
        firstname: string;
        lastname: string;
        street_address: string;
        state: string;
        city: string;
        subcity: string;
        postcode: string;
        phone_number: string;
        email: string;
        notes: string;
    }
}

export { };