'use client';

import { formatCurrency } from '@/utils/FunctionHelper';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Image from 'next/image';
import Link from 'next/link';

const queryClient = new QueryClient();

export default function ListProduct({ initialData }: { initialData: FlowerLinkImageType[] }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <UserList initialData={initialData} />
            </QueryClientProvider>
        </>
    );
}

function UserList({ initialData }: { initialData: FlowerLinkImageType[] }) {
    const { data, isPending } = useQuery({
        queryKey: ['products'],
        initialData,
    });

    return (
        <>
            {isPending && <p className="py-8">Loading...</p>}
            <div className="min-h-screen">
                <div className="max-w-7x py-6">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-8">
                            {data && data.map((image, index) => (
                                <div
                                    key={index + '-img-gallery'}
                                >
                                    <div
                                        className="relative overflow-hidden rounded-lg shadow-lg"
                                    >
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.name}
                                            width={300}
                                            height={200}
                                            className="w-full h-96 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                        />
                                        <Link href={`/product/${image.slug}`}>
                                            <div
                                                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                            >
                                                <p className="text-white text-lg font-semibold transition-opacity duration-300">
                                                    {image.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-lg font-normal text-center">{image.name}</p>
                                        <span className="flex justify-center gap-3">
                                            {image.priceAfterDiscount ? <p className="text-sm text-gray-500 text-center line-through">{formatCurrency(image.price, 'IDR')}</p> : <></>}
                                            <p className="text-sm text-gray-500 font-semibold text-center">{formatCurrency(image.priceAfterDiscount ? image.priceAfterDiscount : image.price, 'IDR')}</p>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}