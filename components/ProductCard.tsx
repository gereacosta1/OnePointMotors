'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/store/cart';
import { ShoppingCart, Eye, Zap, Battery, Gauge } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
    
    toast.success(`${product.name} agregado al carrito`, {
      description: 'The product has been successfully added to your shopping cart.',
    });
    
    setIsLoading(false);
  };

  return (
    <Card className="group card-hover border-0 shadow-lg rounded-3xl overflow-hidden bg-white">
      <Link href={`/producto/${product.slug}`}>
        <div className="relative">
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {product.destacado && (
            <Badge className="absolute top-4 left-4 bg-[#39FF14] text-[#0B0F10] font-semibold px-3 py-1 rounded-full">
              ⭐ outstanding
            </Badge>
          )}
          
          {product.stock < 10 && (
            <Badge className="absolute top-4 right-4 bg-red-500 text-white font-semibold px-3 py-1 rounded-full">
              Last units!
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-[#0B0F10] mb-2 group-hover:text-[#00B347] transition-colors duration-300">
            <Link href={`/producto/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="text-2xl font-bold text-[#39FF14]">{formatPrice(product.price)}</p>
        </div>

        {/* Specs Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs border-[#00B347]/30 text-[#00B347] rounded-lg px-2 py-1">
            <Battery className="w-3 h-3 mr-1" />
            {product.autonomia_km}km
          </Badge>
          <Badge variant="outline" className="text-xs border-[#00B347]/30 text-[#00B347] rounded-lg px-2 py-1">
            <Gauge className="w-3 h-3 mr-1" />
            {product.vel_max_kmh} km/h
          </Badge>
          <Badge variant="outline" className="text-xs border-[#00B347]/30 text-[#00B347] rounded-lg px-2 py-1">
            <Zap className="w-3 h-3 mr-1" />
            {product.potencia_w}W
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button asChild variant="outline" className="flex-1 rounded-xl hover:bg-[#39FF14]/10 hover:border-[#39FF14]">
            <Link href={`/producto/${product.slug}`}>
              <Eye className="w-4 h-4 mr-2" />
              See more
            </Link>
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || product.stock === 0}
            className="flex-1 btn-secondary rounded-xl"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}