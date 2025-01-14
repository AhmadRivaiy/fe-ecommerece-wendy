import { formatCurrency } from "@/utils/FunctionHelper"
import Image from "next/image"
import Link from "next/link"
import { RiCloseCircleLine } from "react-icons/ri"
import Counter from "./ui/counter"

export default function ProductCart({
    dataCart,
    removeProductCart,
    setCount
}: {
    dataCart: CartItem[];
    removeProductCart: (id: string, size?: string) => void;
    setCount: (data: CartItem, product: FlowerLinkImageType, c: number) => void;
}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th className="font-black text-black">Product</th>
                    <th className="font-black text-black">Price</th>
                    <th className="font-black text-black">Quantity</th>
                    <th className="font-black text-black">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataCart.map((x, i) => {
                        return (
                            <tr key={i}>
                                <th><RiCloseCircleLine className="cursor-pointer" size={30} onClick={() => removeProductCart(x.id, x?.size)} /></th>
                                <td>
                                    <Link href={'/product/' + x.detail.slug} className="flex justify-start items-center gap-5">
                                        <div className="avatar">
                                            <div className="w-20 rounded">
                                                <Image src={x.detail.imageUrl} alt={x.detail.name} width={50} height={50} />
                                            </div>
                                        </div>
                                        {x.detail.name} - {x.cutting} - {x.size}
                                    </Link>
                                </td>
                                <td>{formatCurrency(x.detail.priceAfterDiscount ?? x.detail.price, 'IDR')}</td>
                                <td><Counter onChange={(count) => setCount(x, x.detail, count)} countNow={x.quantity} /></td>
                                <td>{formatCurrency(x.sub_total, 'IDR')}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}