import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

/* eslint-disable @typescript-eslint/no-unused-vars */

export default function AddressCart({
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
    }, [window])

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const formData: { [key: AddressCart[keyof AddressCart]]: any } = {};

        data.forEach((value, key) => {
            formData[key] = value;
        });

        localStorage.setItem('ws_address', JSON.stringify(formData));
        setFormValues(formData as AddressCart)
        nextStep();
    };

    return (
        <section className="container w-full flex flex-col justify-center px-5">
            <h1>Billing & Shipping</h1>
            <form className="py-3 flex flex-col gap-5 billing-shipping" onSubmit={handleForm}>
                <div className="flex flex-row w-full gap-5">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="firstname">First name</Label>
                        <Input name="firstname" defaultValue={formValues.firstname} type="text" id="firstname" placeholder="" className="w-full" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="lastname">Last name</Label>
                        <Input name="lastname" defaultValue={formValues.lastname} type="text" id="lastname" placeholder="" className="w-full" />
                    </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="address">Street Address</Label>
                    <Textarea name="street_address" defaultValue={formValues.street_address} placeholder="House number and street name" id="address" rows={3} />
                </div>
                <div className="grid w-full items-center gap-1.5 slct">
                    <Label htmlFor="state">State / Country</Label>
                    <Select name="state" defaultValue={formValues.state}>
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder="" id="state" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Indonesia</SelectLabel>
                                <SelectItem value="est">Jawa Barat</SelectItem>
                                <SelectItem value="cst">Jawa Tengah</SelectItem>
                                <SelectItem value="mst">Jawa Timur</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full items-center gap-2 slct">
                    <Label htmlFor="address">Town / City</Label>
                    <Select name="city" defaultValue={formValues.city}>
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Jawa Barat</SelectLabel>
                                <SelectItem value="est">Kota Bandung</SelectItem>
                                <SelectItem value="cst">Kota Cimahi</SelectItem>
                                <SelectItem value="mst">Bandung Barat</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select name="subcity" defaultValue={formValues.subcity}>
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Kota Cimahi</SelectLabel>
                                <SelectItem value="est">Cimahi Utara</SelectItem>
                                <SelectItem value="cst">Cimahi Tengah</SelectItem>
                                <SelectItem value="mst">Cimahi Selatan</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="postalcode">Postcode / ZIP</Label>
                    <Input name="postcode" defaultValue={formValues.postcode} type="text" id="postalcode" placeholder="" className="w-full" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input type="number" defaultValue={formValues.phone_number} min={0} id="phone" name="phone_number" placeholder="" className="w-full" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" defaultValue={formValues.email} id="email" name="email" placeholder="" className="w-full" />
                </div>
                <h1>Additional information</h1>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_notes">Order notes</Label>
                    <Textarea name="notes" defaultValue={formValues.notes} placeholder="Notes about your order, e.g. special notes for delivery." id="order_notes" rows={3} />
                </div>

                <Button type="submit">Continue to Payment</Button>
            </form>
        </section>
    )
}