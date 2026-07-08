import React from "react";
import { ProductCard } from "./ProductCard";

export default function ProductSection({
  title,
  sectionKey,
  allProducts,
  activeCategory,
  className = "",
}) {
  const items = allProducts.filter((p) => {
    const inSection = p.sections.includes(sectionKey);
    const inCategory =
      activeCategory === "All Products" ||
      p.category === activeCategory;

    return inSection && inCategory;
  });

  if (items.length === 0) return null;

  return (
    <section className={`rounded-b-4xl py-12 px-10 ${className}`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl font-sans font-bold text-primary">
          {title}
        </h2>

        <button className="text-xl text-primary hover:underline">
          See All
        </button>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
          />
        ))}
      </div>
    </section>
  );
}
