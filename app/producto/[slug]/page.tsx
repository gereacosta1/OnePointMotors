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
          <h1 className="text-2xl font-bold text-[#0B0F10] mb-4">Product not found</h1>
          <Button asChild className="btn-primary">
            <Link href="/catalogo">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
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
    
    toast.success(`${quantity} x ${product.name} added to cart`, {
      description: 'Items were successfully added to your cart.',
    });
    
    setIsLoading(false);
  };

  const handleAffirmCheckout = () => {
    // TODO: Implement Affirm checkout
    toast.info('Redirecting to Affirm...', {
      description: "You'll be redirected to Affirm's secure checkout.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="container-max section-padding py-6 border-b border-gray-200">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-[#667085] hover:text-[#39FF14] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/catalogo" className="text-[#667085] hover:text-[#39FF14] transition-colors">
            Catalog
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
                  ⭐ Featured
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
                      alt={`${product.name} view ${index + 1}`}
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
                  {product.stock} in stock
                </Badge>
              </div>
              <p className="text-lg text-[#667085] leading-relaxed">{product.description}</p>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Battery className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#0B0F10]">{product.autonomia_km}km</div>
                <div className="text-sm text-[#667085]">Range</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Gauge className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#0B0F10]">{product.vel_max_kmh} km/h</div>
                <div className="text-sm text-[#667085]">Top speed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Zap className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#0B0F10]">{product.potencia_w}W</div>
                <div className="text-sm text-[#667085]">Power</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Weight className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#0B0F10]">{product.peso_kg}kg</div>
                <div className="text-sm text-[#667085]">Weight</div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-[#0B0F10]">Quantity</label>
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
                {isLoading ? 'Adding...' : 'Add to Cart'}
              </Button>
              
              <Button
                onClick={handleAffirmCheckout}
                disabled={product.stock === 0}
                className="w-full btn-primary text-lg py-4 rounded-2xl"
              >
                <span className="font-bold mr-2">Buy with Affirm</span>
                <span className="text-sm opacity-80">| Financing available</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-[#667085]">
                <Shield className="w-4 h-4 text-[#39FF14]" />
                <span>{product.garantia_meses}-month warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#667085]">
                <Truck className="w-4 h-4 text-[#39FF14]" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#667085]">
                <CheckCircle className="w-4 h-4 text-[#39FF14]" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-gray-100 p-1">
              <TabsTrigger value="description" className="rounded-xl">Description</TabsTrigger>
              <TabsTrigger value="specs" className="rounded-xl">Specifications</TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-xl">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card className="border-0 shadow-lg rounded-3xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#0B0F10] mb-6">Key Features</h3>
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
                  <h3 className="text-2xl font-bold text-[#0B0F10] mb-6">Technical Specifications</h3>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#0B0F10] mb-3">Motor & Performance</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Motor:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.motor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Power:</span>
                            <span className="text-[#0B0F10] font-medium">{product.potencia_w}W</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Top speed:</span>
                            <span className="text-[#0B0F10] font-medium">{product.vel_max_kmh} km/h</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-[#0B0F10] mb-3">Battery & Range</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Battery:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.bateria}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Range:</span>
                            <span className="text-[#0B0F10] font-medium">{product.autonomia_km} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Charging time:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.tiempo_carga}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#0B0F10] mb-3">Physical & Safety</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Weight:</span>
                            <span className="text-[#0B0F10] font-medium">{product.peso_kg} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Max load:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.peso_max}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667085]">Brakes:</span>
                            <span className="text-[#0B0F10] font-medium">{product.specifications.frenos}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-[#0B0F10] mb-3">Certifications</h4>
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
                      Shipping & Delivery
                    </h3>
                    <div className="space-y-3 text-[#667085]">
                      <p>✅ <strong>Free shipping</strong> on orders over $500</p>
                      <p>✅ Delivery within <strong>24–48 hours</strong> in metro areas</p>
                      <p>✅ Shipping insurance included</p>
                      <p>✅ Real-time tracking</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#0B0F10] mb-4 flex items-center">
                      <Shield className="w-5 h-5 text-[#39FF14] mr-2" />
                      Warranty & Returns
                    </h3>
                    <div className="space-y-3 text-[#667085]">
                      <p>✅ <strong>{product.garantia_meses} months</strong> full warranty</p>
                      <p>✅ <strong>30 days</strong> no-questions-asked returns</p>
                      <p>✅ Expert technical service</p>
                      <p>✅ Original spare parts available</p>
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
