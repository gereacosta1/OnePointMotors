'use client';

import React from 'react';
import { products as defaultProducts } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type Product = (typeof defaultProducts)[number];

type Props = {
  /** Section title */
  title?: string;
  /** Preferred prop name (nuevo) */
  items?: Product[];
  /** Alias para compatibilidad: permite <ProductCarousel products={...} /> */
  products?: Product[];
};

export function ProductCarousel({
  title = 'Featured',
  items,
  products: productsProp,
}: Props) {
  const list: Product[] = items ?? productsProp ?? defaultProducts;

  if (!list?.length) return null;

  return (
    <section className="container-max section-padding">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* carrusel horizontal simple */}
      <div className="flex gap-6 overflow-x-auto pb-2">
        {list.map((p) => (
          <div key={p.id} className="min-w-[320px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
