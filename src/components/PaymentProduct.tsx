import { useEffect, useState } from "react";
import { Button } from "./ui/button";

/* eslint-disable @typescript-eslint/no-unused-vars */

export default function PaymentProduct({
    dataCart,
    removeProductCart,
    setCount,
    nextStep
}: {
    dataCart: CartItem[];
    removeProductCart: (id: string, size?: string) => void;
    setCount: (data: CartItem, product: FlowerLinkImageType, c: number) => void;
    nextStep: () => void
}) {
    const [formValues, setFormValues] = useState<AddressCart>({
        firstname: "",
        lastname: "",
        street_address: "",
        state: "",
        city: "",
        subcity: "",
        postcode: "",
        phone_number: "",
        email: "",
        notes: ""
    });

    useEffect(() => {
        const ws_address = localStorage.getItem('ws_address');
        if (ws_address) {
            setFormValues(JSON.parse(ws_address));
        }
    }, [window]);

    return (
        <section className="container w-full flex flex-col justify-center px-5">
            <h1>Billing & Shipping</h1>
            
            <Button type="submit">Confirm Order</Button>
        </section>
    )
}