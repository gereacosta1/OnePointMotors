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
                  ⚡ Nueva Generación 2025
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Movilidad{' '}
                  <span className="text-gradient">Eléctrica</span>
                  <br />
                  del Futuro
                </h1>
                <p className="text-lg md:text-xl text-[#667085] leading-relaxed max-w-lg">
                  Descubre la nueva era de transporte urbano con nuestros scooters eléctricos 
                  de última generación. Diseño premium, tecnología avanzada y compromiso ambiental.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-primary text-lg px-8 py-4">
                  <Link href="/catalogo">
                    Ver Catálogo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="text-lg px-8 py-4 rounded-2xl border-2 border-[#00B347] text-[#00B347] hover:bg-[#00B347] hover:text-white">
                  <Link href="/contacto">Contacto</Link>
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
              ¿Por qué elegir <span className="text-gradient">EcoRide</span>?
            </h2>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto">
              Combinamos innovación tecnológica con diseño premium para ofrecerte la mejor experiencia de movilidad eléctrica.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Tecnología Avanzada',
                description: 'Motores brushless de última generación con eficiencia energética superior.'
              },
              {
                icon: Shield,
                title: 'Garantía Premium',
                description: 'Hasta 36 meses de garantía completa con servicio técnico especializado.'
              },
              {
                icon: Truck,
                title: 'Envío Gratuito',
                description: 'Entrega gratuita en 24-48h con seguro incluido en toda la península.'
              },
              {
                icon: Leaf,
                title: '100% Ecológico',
                description: 'Movilidad sostenible con cero emisiones y materiales reciclables.'
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
              Productos <span className="text-gradient">Destacados</span>
            </h2>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto">
              Descubre nuestra selección de scooters eléctricos más populares, diseñados para diferentes estilos de vida.
            </p>
          </div>
          
          <ProductCarousel products={featuredProducts} />
          
          <div className="text-center mt-12">
            <Button asChild className="btn-primary text-lg px-8 py-4">
              <Link href="/catalogo">
                Ver Todos los Productos
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
              Lo que dicen nuestros <span className="text-gradient">clientes</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Miles de personas ya han transformado su movilidad con EcoRide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                role: 'Profesional IT',
                comment: 'Mi EcoRide Pro Max ha revolucionado mi commute diario. 65km de autonomía y cero preocupaciones por el tráfico.',
                rating: 5
              },
              {
                name: 'Carlos Mendoza',
                role: 'Delivery Rider',
                comment: 'Con el EcoRide Cargo, mi negocio de delivery ha crecido un 40%. Potencia, capacidad y ahorro en combustible.',
                rating: 5
              },
              {
                name: 'Ana Rodríguez',
                role: 'Estudiante',
                comment: 'El Urban es perfecto para la universidad. Plegable, ligero y con una autonomía increíble. ¡Lo recomiendo 100%!',
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
            <h3 className="text-xl font-semibold text-[#667085] mb-8">Tecnología de confianza</h3>
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
              ¿Listo para la revolución eléctrica?
            </h2>
            <p className="text-xl text-green-100 leading-relaxed">
              Únete a la comunidad EcoRide y descubre una nueva forma de moverte por la ciudad. 
              Sostenible, eficiente y llena de estilo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#39FF14] text-[#0B0F10] hover:bg-[#2EE610] text-lg px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <Link href="/catalogo">
                  Explorar Productos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-[#00B347]">
                <Link href="/contacto">Hablar con Experto</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}