export async function GET(
    request: Request,
    { params }: any
) {
    const _params = await params;
    const _data = [
        {
            name: "Rose",
            category: "Flower",
            price: 25000,
            priceAfterDiscount: 20000,
            stock: [
                {
                    id: 1,
                    size: "S",
                    quantity: 10,
                },
                {
                    id: 2,
                    size: "M",
                    quantity: 20,
                },
                {
                    id: 3,
                    size: "L",
                    quantity: 30,
                },
            ],
            list_images: [
                "https://picsum.photos/id/1/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/1/1280/1920",
            slug: "rose-flower",
        },
        {
            name: "Lily",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/2/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/2/1280/1920",
            slug: "lily-flower",
        },
        {
            name: "Sunflower",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/3/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/3/1280/1920",
            slug: "sunflower-flower",
        },
        {
            name: "Tulip",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/4/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/4/1280/1920",
            slug: "tulip-flower",
        },
        {
            name: "Daisy",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/5/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/5/1280/1920",
            slug: "daisy-flower",
        },
        {
            name: "Orchid",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/6/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/6/1280/1920",
            slug: "orchid-flower",
        },
        {
            name: "Dahlia",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/7/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/7/1280/1920",
            slug: "dahlia-flower",
        },
        {
            name: "Peony",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/8/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/8/1280/1920",
            slug: "peony-flower",
        },
        {
            name: "Hydrangea",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/9/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/9/1280/1920",
            slug: "hydrangea-flower",
        },
        {
            name: "Iris",
            category: "Flower",
            price: 25000,
            list_images: [
                "https://picsum.photos/id/10/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/10/1280/1920",
            slug: "iris-flower",
        },
        {
            name: "Peony",
            category: "Flower 3",
            price: 25000,
            weight: 500,
            dimension: "10x10x10",
            list_images: [
                "https://picsum.photos/id/18/1280/1920",
                "https://picsum.photos/id/19/1280/1920",
                "https://picsum.photos/id/20/1280/1920",
                "https://picsum.photos/id/21/1280/1920",
                "https://picsum.photos/id/22/1280/1920",
            ],
            imageUrl: "https://picsum.photos/id/18/1280/1920",
            slug: "peony-flower-3",
        },
    ];
    
    function searchProduct(slug: string) {
        const products = _data.find((item) => item.slug === slug) ?? null;
        return products;
    }

    const product = searchProduct(_params.slug);

    return Response.json({
        status: true,
        message: "Success",
        data: product,
    });
}