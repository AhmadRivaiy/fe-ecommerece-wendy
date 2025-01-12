
import { Suspense } from 'react'
export default function ProductCartLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <Suspense>
            {children}
        </Suspense>
    )
}