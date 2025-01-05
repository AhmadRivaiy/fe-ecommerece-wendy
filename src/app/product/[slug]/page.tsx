import ProductDetailComponent from "@/components/DetailProduct";

async function getProduct(slug: string) {
    const res = await fetch(process.env.API_URL + '/api/product/' + slug);
    if (!res.ok) throw new Error('Failed to fetch product');
    const _rest = await res.json();
    return _rest.data;
}

interface Params {
    slug: string;
}

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params;
    const product: FlowerLinkImageType = await getProduct(slug);

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            url: process.env.HOST + '/product/' + slug,
            images: [
                {
                    url: product.imageUrl, // URL gambar utama produk
                    width: 800,
                    height: 600,
                }
            ]
        }
    };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
    const { slug } = await params;
    const product: FlowerLinkImageType = await getProduct(slug);

    return (
        <ProductDetailComponent product={product} />
    );
}