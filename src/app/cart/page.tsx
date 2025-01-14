'use client';

import React, { useEffect, useState } from "react";
import { useAuthApp } from "@/context/AuthContext";
import { removeFromCart, getCart, updateProductCart, getTotalPrice } from '@/lib/AddToChart';
import { formatCurrency } from "@/utils/FunctionHelper";
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCart from "@/components/ProductCart";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
    const searchParams = useSearchParams();
    const route = useRouter();

    const { user } = useAuthApp();
    const { cart, updateCart, deleteProductCart } = useCart();
    const [isLogined, setIsLogined] = useState<User | null>(null);
    const [dataCart, setDataCart] = useState<CartItem[]>([]);
    const [stepNow, setStep] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setIsLogined(user);
        if (isLogined) {

            // Ambil Dari Server
            setDataCart([]);
        } else {
            setDataCart(getCart());
        }
    }, [user]);

    useEffect(() => {
        setDataCart(getCart());
        setTotalPrice(getTotalPrice())
    }, [cart]);

    useEffect(() => {
        const step = searchParams.get('step') || '1';
        setStep(parseInt(step));
    }, [searchParams]);

    const setCount = (data: CartItem, product: FlowerLinkImageType, c: number) => {
        const _id = updateProductCart({
            id: data.id,
            quantity: c,
            size: data.size,
            detail: product,
            cutting: data.cutting,
            sub_total: product.priceAfterDiscount ? product.priceAfterDiscount * c : (product.price || 0) * c
        });
        updateCart({ id: _id ?? '-', quantity: c, size: data.size ?? '-' });
    }

    const removeProductCart = (id: string, size?: string) => {
        removeFromCart(id, size ?? '-');
        deleteProductCart({ id: id, quantity: 0, size: size ?? '-' });
    }

    const nextStep = () => {
        route.push('/cart?step=' + (stepNow + 1));
    }

    const previousStep = () => {
        route.push('/cart?step=' + (stepNow - 1));
    }

    const renderCartComponent = (step: number) => {
        if(step === 1){
            return <ProductCart dataCart={dataCart} setCount={setCount} removeProductCart={removeProductCart} />
        } else if (step === 2){
            return <div>Address</div>
        } else if (step === 3){
            return <div>Payment</div>
        }

        return <div>Cart</div>;
    }

    return (
        <main className="flex justify-center">
            <div className="container flex flex-col gap-10 pt-10">
                <div className="w-full flex justify-center">
                    <ul className="steps steps-horizontal">
                        <li className="step step-info">Cart</li>
                        <li className={`step ${stepNow === 2 ? 'step-info' : ''}`}>Address</li>
                        <li className="step">Details</li>
                        <li className="step">Order Complete</li>
                    </ul>
                </div>
                <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="overflow-x-auto md:col-span-2 col-span-1">
                        {
                            renderCartComponent(stepNow)
                        }
                    </div>
                    <div className="flex w-full justify-center items-center md:col-span-1 col-span-2">
                        <Card className="w-full order-last">
                            <CardHeader>
                                <CardTitle>CART TOTALS</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <div className="flex flex-row justify-between">
                                    <div>ADDRESS</div>
                                    <div>-</div>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div>SUBTOTAL</div>
                                    <div>{formatCurrency(totalPrice, 'IDR')}</div>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div>DISCOUNT</div>
                                    <div>{formatCurrency(0, 'IDR')}</div>
                                </div>
                                <hr/>
                                <div className="flex flex-row justify-between">
                                    <div>SHIPPING</div>
                                    <div>{formatCurrency(0, 'IDR')}</div>
                                </div>
                                <hr/>
                                <div className="flex flex-row justify-between">
                                    <div>TOTAL</div>
                                    <div>{formatCurrency(totalPrice, 'IDR')}</div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-5">
                                <div className="w-full flex flex-row gap-3">
                                    <Input placeholder="COUPON"/>
                                    <Button className="w-full" variant={'secondary'}>APPLY</Button>
                                </div>
                                <Button className="w-full uppercase" onClick={nextStep}>Checkout</Button>
                                {
                                    stepNow > 1 && (<Button className="w-full uppercase" onClick={previousStep}>BACK</Button>)
                                }
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}