declare global {
    interface StockProduct {
        id: number;
        size: string;
        quantity: number;
    }

    interface FlowerLinkImageType {
        id?: number;
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
}

export { };