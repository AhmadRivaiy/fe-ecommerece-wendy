import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";

export default async function Home() {
  const res = await fetch(process.env.HOST + '/api/product');
  const _data = await res.json();

  return (
    <div className="font-[family-name:var(--font-poppins-sans)]">
      <Navbar />
      <main className="flex justify-center pt-16">
        <div className="container">
          <ProductList initialData={_data.data}/>
        </div>
      </main>
    </div>
  );
}
