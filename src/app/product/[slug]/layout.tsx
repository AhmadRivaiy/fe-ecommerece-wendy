export default function ProductLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: Promise<{ slug: string }>
}) {
    
    return (
        <section className="flex justify-center">
            <div className="container">
                {children}
            </div>
        </section>
    )
}