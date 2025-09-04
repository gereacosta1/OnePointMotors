'use client';

import React from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type Props = {
  title?: string;
  items?: typeof products;
};

export function ProductCarousel({ title = 'Destacados', items = products }: Props) {
  return (
    <section className="container-max section-padding">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* carrusel horizontal simple; si preferís grid, cambialo */}
      <div className="flex gap-6 overflow-x-auto pb-2">
        {items.map((p) => (
          <div key={p.id} className="min-w-[320px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
