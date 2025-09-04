'use client';

import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAffirmCheckout = () => {
    // Implementar integración con Affirm
    console.log('Redirecting to Affirm checkout...');
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#39FF14]" />
            <span>Your Cart ({items.length})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
              <p className="text-gray-500 text-center">Your Cart is empty.</p>
              <Button onClick={toggleCart} className="btn-primary">
                <Link href="/catalogo">Explore Products</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#0B0F10] text-sm">{item.name}</h4>
                      <p className="text-[#39FF14] font-bold">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 rounded-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 rounded-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#0B0F10]">Total:</span>
                  <span className="text-xl font-bold text-[#39FF14]">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button
                    onClick={handleAffirmCheckout}
                    className="w-full btn-primary text-base font-semibold py-3"
                  >
                    Pay with Affirm
                  </Button>
                  <Button
                    variant="outline"
                    onClick={toggleCart}
                    className="w-full rounded-xl"
                  >
                    <Link href="/catalogo" className="w-full">Continue Shopping</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    empty cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}