import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Truck, Star, CheckCircle, Users, Award, Leaf } from 'lucide-react';
import { ProductCarousel } from '@/components/ProductCarousel';
import { getFeaturedProducts } from '@/data/products';
import Image from 'next/image';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-[#39FF14]/10 text-[#00B347] border-[#39FF14]/20 hover:bg-[#39FF14]/20 text-sm font-medium px-4 py-2 rounded-full">
                  ⚡ New Generation 2025
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Electric{' '}
                  <span className="text-gradient">Mobility</span>
                  <br />
                  of the Future
                </h1>
                <p className="text-lg md:text-xl text-[#667085] leading-relaxed max-w-lg">
                  Discover a new era of urban transportation with our state-of-the-art electric scooters. Premium design, advanced technology, and environmental commitment.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-primary text-lg px-8 py-4">
                  <Link href="/catalogo">
                    See Catalog
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="text-lg px-8 py-4 rounded-2xl border-2 border-[#00B347] text-[#00B347] hover:bg-[#00B347] hover:text-white">
                  <Link href="/contacto">Contact</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src= "./img/scooter-electrico-1.jpeg"
                  alt="EcoRide Scooter Eléctrico"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#39FF14] rounded-full flex items-center justify-center shadow-xl">
                <Zap className="w-16 h-16 text-[#0B0F10]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F10] mb-4">
               Why choose<span className="text-gradient">Sunrise Store</span>?
            </h2>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto">
              We combine technological innovation with premium design to offer you the best electric mobility experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Advanced Technology',
                description: 'Latest-generation brushless motors with superior energy efficiency.'
              },
              {
                icon: Shield,
                title: 'Premium Guarantee',
                description: 'Up to 36 months of full warranty with specialized technical service.'
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'Free delivery within 24-48 hours with insurance included throughout the peninsula..'
              },
              {
                icon: Leaf,
                title: '100% Ecological',
                description: 'Sustainable mobility with zero emissions and recyclable materials.'
              }
            ].map((benefit, index) => (
              <Card key={index} className="group card-hover border-0 shadow-lg rounded-3xl bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#39FF14]/20 transition-colors duration-300">
                    <benefit.icon className="w-8 h-8 text-[#00B347]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B0F10] mb-3">{benefit.title}</h3>
                  <p className="text-[#667085] leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F10] mb-4">
              Products <span className="text-gradient">Featured</span>
            </h2>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto">
              Discover our selection of the most popular electric scooters, designed for different lifestyles.
            </p>
          </div>
          
          <ProductCarousel products={featuredProducts} />
          
          <div className="text-center mt-12">
            <Button asChild className="btn-primary text-lg px-8 py-4">
              <Link href="/catalogo">
               See All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0B0F10]">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
             What our   <span className="text-gradient">customers</span>say
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Thousands of people have already transformed their mobility with Sunrise Store
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                role: 'IT Professional',
                comment: 'My EcoRide Pro Max has revolutionized my daily commute. 65km of range and zero traffic worries..',
                rating: 5
              },
              {
                name: 'Carlos Mendoza',
                role: 'Delivery Rider',
                comment: 'With Sunrise, my delivery business has grown by 40%. Power, capacity, and fuel savings..',
                rating: 5
              },
              {
                name: 'Ana Rodríguez',
                role: 'student',
                comment: 'The Urban is perfect for college. Foldable, lightweight, and with incredible battery life. I highly recommend it!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 rounded-3xl group hover:border-[#39FF14]/30 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#39FF14] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.comment}"</p>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-[#667085] mb-8">Trusted technology</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              {['Samsung', 'LG Energy', 'Panasonic', 'Bosch', 'Continental'].map((brand) => (
                <div key={brand} className="text-2xl font-bold text-[#0B0F10] hover:opacity-100 transition-opacity duration-300">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#00B347] to-[#0F9D58]">
        <div className="container-max section-padding text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
             Ready for the electric revolution?
            </h2>
            <p className="text-xl text-green-100 leading-relaxed">
             Join the EcoRide community and discover a new way to get around the city.
              Sustainable, efficient, and full of style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#39FF14] text-[#0B0F10] hover:bg-[#2EE610] text-lg px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <Link href="/catalogo">
                  Explore Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-[#00B347]">
                <Link href="/contacto">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}