'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Get checkout token from URL params
    const checkoutToken = searchParams.get('checkout_token');
    
    if (checkoutToken) {
      // In a real implementation, you would call your backend to get order details
      // For now, we'll use mock data
      setOrderDetails({
        id: `ECO-${Date.now()}`,
        status: 'confirmed',
        total: 1299,
        items: [
          { name: 'EcoRide Pro Max', quantity: 1, price: 1299 }
        ]
      });
      
      // Clear the cart after successful payment
      clearCart();
    }
  }, [searchParams, clearCart]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0B0F10] mb-4">Procesando tu orden...</h1>
          <div className="w-8 h-8 border-2 border-[#39FF14] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="container-max section-padding py-16">
        <Card className="max-w-2xl mx-auto border-0 shadow-2xl rounded-3xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-[#00B347]" />
            </div>
            
            <h1 className="text-3xl font-bold text-[#0B0F10] mb-4">¡Pago Confirmado!</h1>
            <p className="text-lg text-[#667085] mb-8">
              Tu orden ha sido procesada exitosamente. Recibirás un email de confirmación en breve.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-[#0B0F10]">Número de Orden:</span>
                <span className="font-bold text-[#39FF14]">{orderDetails.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#0B0F10]">Total Pagado:</span>
                <span className="font-bold text-[#39FF14]">
                  ${orderDetails.total.toLocaleString('es-US')}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-[#667085]">
                <Package className="w-5 h-5 text-[#39FF14]" />
                <span>Tu scooter será enviado en 24-48 horas</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild className="btn-primary">
                  <Link href="/catalogo">
                    Seguir Comprando
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Volver al Inicio
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}