export default function ProductSection({ title, sectionKey, allProducts }) {
  const items = allProducts.filter(p => p.sections.includes(sectionKey));
  
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-4 gap-4">
        {items.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
