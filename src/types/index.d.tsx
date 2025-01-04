declare global {
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
        list_images?: string[];
    }

    interface ListMenuLeft {
        name: string;
        url: string;
    }
}

export { };