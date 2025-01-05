import ProductList from "@/components/ProductList";

export default async function Home() {
  const res = await fetch(process.env.API_URL + '/api/product');
  const _data = await res.json();

  return (
    <main className="flex justify-center">
      <div className="container">
        <ProductList initialData={_data.data} />
      </div>
    </main>
  );
}
