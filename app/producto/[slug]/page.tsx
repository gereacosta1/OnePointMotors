'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product, getProductBySlug } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/store/cart';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Zap, 
  Battery, 
  Gauge, 
  Weight, 
  Calendar,
  Shield,
  Truck,
  Star,
  CheckCircle,
  Minus,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProductPage() {
  const params = useParams();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.slug) {
      const foundProduct = getProductBySlug(params.slug as string);
      setProduct(foundProduct || null);
      // Scroll to top when product loads
      window.scrollTo(0, 0);
    }
  }, [params.slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0B0F10] mb-4">Producto no encontrado</h1>
          <Button asChild className="btn-primary">
            <Link href="/catalogo">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Catálogo
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
      });
    }
    
    toast.success(`${quantity} x ${product.name} agregado al carrito`, {
      description: 'Los productos se han añadido correctamente a tu carrito.',
    });
    
    setIsLoading(false);
  };

  const handleAffirmCheckout = () => {
    // TODO: Implement Affirm checkout
    toast.info('Redirigiendo a Affirm...', {
      description: 'Serás redirigido al checkout seguro de Affirm.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="container-max section-padding py-6 border-b border-gray-200">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-[#667085] hover:text-[#39FF14] transition-colors">
            Inicio
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/catalogo" className="text-[#667085] hover:text-[#39FF14] transition-colors">
            Catálogo
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#0B0F10] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.destacado && (
                <Badge className="absolute top-6 left-6 bg-[#39FF14] text-[#0B0F10] font-semibold px-4 py-2 rounded-full text-base">
                  ⭐ Destacado
                </Badge>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'ring-2 ring-[#39FF14] shadow-lg' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} vista ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0B0F10] mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-[#39FF14]">{formatPrice(product.price)}</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded-lg px-3 py-1">
                  {product.stock} en stock
                </Badge>
              </div>
              <p className="text-lg text-[#667085] leading-relaxed">{product.description}</p>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Battery className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#0B0F10]">{product.autonomia_km}km</div>
                <div className="text-sm text-[#667085]">Autonomía</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Gauge className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#0B0F10]">{product.vel_max_kmh} km/h</div>
                <div className="text-sm text-[#667085]">Vel. Máxima</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Zap className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#0B0F10]">{product.potencia_w}W</div>
                <div className="text-sm text-[#667085]">Potencia</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Weight className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#0B0F10]">{product.peso_kg}kg</div>
                <div className="text-sm text-[#667085]">Peso</div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-[#0B0F10]">Cantidad</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-l-xl"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 rounded-r-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-[#667085]">
                  Total: <span className="font-bold text-[#39FF14]">{formatPrice(product.price * quantity)}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || product.stock === 0}
                className="w-full btn-secondary text-lg py-4 rounded-2xl"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
              </Button>
              
              <Button
                onClick={handleAffirmCheckout}
                disabled={product.stock === 0}
                className="w-full btn-primary text-lg py-4 rounded-2xl"
              >
                <span className="font-bold mr-2">Comprar con Affirm</span>
                <span className="text-sm opacity-80">| Financiación disponible</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-[#667085]">
                <Shield className="w-4 h-4 text-[#39FF14]" />
                <span>{product.garantia_meses} meses garantía</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#667085]">
                <Truck className="w-4 h-4 text-[#39FF14]" />
                <span>Envío gratuito</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#667085]">
                <CheckCircle className="w-4 h-4 text-[#39FF14]" />
                <span>30 días devolución</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-gray-100 p-1">
              <TabsTrigger value="description" className="rounded-xl">Descripción</TabsTrigger>
              <TabsTrigger value="specs" className="rounded-xl">Especificaciones</TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-xl">Envío y Devoluciones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card className="border-0 shadow-lg rounded-3xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#0B0F10] mb-6">Características Principales</h3>
                  <div className="grid gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#39FF14] mt-0.5 flex-shrink-0" />
                        <span className="text-[#667085] leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-8">
              <Card className="border-0 shadow-lg rounded-3xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#0B0F10] mb-6">Especificaciones Técnicas</h3>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#0B0F10] mb-3">Motor y Rendimiento</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Motor:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.motor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Potencia:</span>
                            <span className="text-[#0B0F10] font-medium">{product.potencia_w}W</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Velocidad máxima:</span>
                            <span className="text-[#0B0F10] font-medium">{product.vel_max_kmh} km/h</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-[#0B0F10] mb-3">Batería y Autonomía</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Batería:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.bateria}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Autonomía:</span>
                            <span className="text-[#0B0F10] font-medium">{product.autonomia_km} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Tiempo de carga:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.tiempo_carga}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#0B0F10] mb-3">Físico y Seguridad</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Peso:</span>
                            <span className="text-[#0B0F10] font-medium">{product.peso_kg} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Peso máximo:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.peso_max}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Frenos:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.frenos}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-[#0B0F10] mb-3">Certificaciones</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.specifications.certificaciones.map((cert) => (
                            <Badge key={cert} variant="outline" className="bg-[#39FF14]/10 text-[#00B347] border-[#39FF14]/30 rounded-lg">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-8">
              <Card className="border-0 shadow-lg rounded-3xl">
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B0F10] mb-4 flex items-center">
                      <Truck className="w-5 h-5 text-[#39FF14] mr-2" />
                      Envío y Entrega
                    </h3>
                    <div className="space-y-3 text-[#667085]">
                      <p>✅ <strong>Envío gratuito</strong> en pedidos superiores a $500</p>
                      <p>✅ Entrega en <strong>24-48 horas</strong> en área metropolitana</p>
                      <p>✅ Seguro de transporte incluido</p>
                      <p>✅ Seguimiento en tiempo real</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#0B0F10] mb-4 flex items-center">
                      <Shield className="w-5 h-5 text-[#39FF14] mr-2" />
                      Garantía y Devoluciones
                    </h3>
                    <div className="space-y-3 text-[#667085]">
                      <p>✅ <strong>{product.garantia_meses} meses</strong> de garantía completa</p>
                      <p>✅ <strong>30 días</strong> para devoluciones sin preguntas</p>
                      <p>✅ Servicio técnico especializado</p>
                      <p>✅ Repuestos originales disponibles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}