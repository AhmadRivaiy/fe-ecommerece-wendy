'use client';

import React, { useState } from "react";
import { formatCurrency, toUpperCase } from "@/utils/FunctionHelper";
import Image from "next/image";
import Link from "next/link";
import StrippedLine from "./ui/stripped-line";
import Counter from "./ui/counter";

export default function ProductDetailComponent({ product }: { product: FlowerLinkImageType }) {
    const [selectedStock, setSelectedStock] = useState<StockProduct | null>(null);
    const [count, setCount] = useState(1);

    return (
        <section>
            <div className="my-5">
                <Link href="/">
                    Close
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <div>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={700}
                        height={400}
                        className="aspect-square"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-light">{toUpperCase(product.name)}</h1>
                    <span className="flex gap-2">
                        {product.priceAfterDiscount ? <p className="text-sm text-gray-500 line-through">{formatCurrency(product.price, 'IDR')}</p> : <></>}
                        <p className="text-sm text-gray-500 font-semibold">{formatCurrency(product.priceAfterDiscount ? product.priceAfterDiscount : product.price, 'IDR')}</p>
                    </span>
                    <div className="flex gap-2">
                        {
                            product.stock.map((stock) => (
                                <div
                                    key={stock.id}
                                    className={`border border-gray-300 p-3 rounded-md cursor-pointer hover:bg-gray-100 ${selectedStock?.id === stock.id ? 'bg-gray-400' : ''} ${stock.quantity === 0 ? 'bg-red-300' : ''}`}
                                    onClick={() => setSelectedStock(stock.quantity === 0 ? null : (selectedStock?.id === stock?.id ? null : stock))}
                                >
                                    <p className="text-center min-w-8">{stock.size}</p>
                                </div>
                            ))
                        }
                    </div>
                    <StrippedLine className="w-full mt-3" style={{ borderWidth: 1.5 }}/>
                    {
                        selectedStock ? (
                            <p className="font-thin"><span className="text-green-600">{selectedStock?.quantity}</span> in stock</p>
                        ) : <></>
                    }
                   <div className="mt-2 flex gap-2">
                        <Counter onChange={(count) => setCount(count)} />
                        <button className="bg-slate-600 text-white rounded-md p-2" onClick={() => console.log('Add to cart', selectedStock, count)}>Add to cart</button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </section>
    );
};