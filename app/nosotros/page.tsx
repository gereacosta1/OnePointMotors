import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Award, 
  Leaf, 
  Zap, 
  Shield, 
  Truck, 
  Star,
  MapPin,
  Calendar,
  Target
} from 'lucide-react';
import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-[#39FF14]/10 text-[#00B347] border-[#39FF14]/20 rounded-full px-4 py-2 mb-6">
                  🌱 Founded in 2020
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-[#0B0F10] leading-tight mb-6">
                  Revolutionizing the <span className="text-gradient">Urban Mobility</span>
                </h1>
                <p className="text-lg text-[#667085] leading-relaxed">
                  At Sunrise Store, we believe the future of urban transportation must be sustainable,
                  smart, and accessible for everyone. That's why we develop electric scooters
                  that combine cutting-edge technology with premium design.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Equipo EcoRide"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-[#00B347] to-[#0F9D58]">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-3xl">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-[#39FF14] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-green-100 leading-relaxed">
                  Democratize electric mobility by offering premium-quality scooters at affordable prices, contributing to cleaner and more sustainable cities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-3xl">
              <CardContent className="p-8 text-center">
                <Leaf className="w-12 h-12 text-[#39FF14] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-green-100 leading-relaxed">
                  To be the leading electric mobility brand in Latin America,
recognized for our innovation, quality, and environmental commitment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F10] mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto">
              The principles that guide every decision and drive us toward excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'Committed to the environment and the reduction of urban emissions.'
              },
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Products designed with the highest standards of quality and durability.'
              },
              {
                icon: Users,
                title: 'Customer Orientation',
                description: 'Exceptional experience from purchase to after-sales service.'
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'Cutting-edge technology to constantly improve our products.'
              }
            ].map((value, index) => (
              <Card key={index} className="group card-hover border-0 shadow-lg rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#39FF14]/20 transition-colors duration-300">
                    <value.icon className="w-8 h-8 text-[#00B347]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0F10] mb-3">{value.title}</h3>
                  <p className="text-[#667085] text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#0B0F10]">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sunrise Store in <span className="text-gradient">Numbers</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '15,000+', label: 'Satisfied Customers' },
              { number: '50+', label: 'Covered Cities' },
              { number: '99.2%', label: 'Customer Satisfaction' },
              { number: '24/7', label: 'Technical Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F10] mb-4">
              Nuestro <span className="text-gradient">Equipo</span>
            </h2>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto">
              Profesionales apasionados por la innovación y la movilidad sostenible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ana Martínez',
                role: 'CEO & Fundadora',
                image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: '10 años en tech, especialista en movilidad urbana'
              },
              {
                name: 'Carlos Rivera',
                role: 'CTO',
                image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Ingeniero eléctrico, experto en sistemas de batería'
              },
              {
                name: 'María López',
                role: 'Head of Design',
                image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Diseñadora industrial con 8 años en mobility'
              }
            ].map((member, index) => (
              <Card key={index} className="group card-hover border-0 shadow-lg rounded-3xl overflow-hidden">
                <div className="relative w-full h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#0B0F10] mb-1">{member.name}</h3>
                  <p className="text-[#39FF14] font-semibold mb-3">{member.role}</p>
                  <p className="text-[#667085] text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F10] mb-4">
              your <span className="text-gradient">Trust</span> is our priority
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Extended Warranty',
                description: 'Up to 36 months warranty with specialized technical service throughout Latin America.'
              },
              {
                icon: Truck,
                title: 'Insured shipping',
                description: 'Free delivery with full insurance and real-time tracking.'
              },
              {
                icon: Star,
                title: '24/7 Support',
                description: 'Team of experts always available to resolve your questions and needs.'
              }
            ].map((item, index) => (
              <Card key={index} className="group card-hover border-0 shadow-lg rounded-3xl text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#39FF14]/20 transition-colors duration-300">
                    <item.icon className="w-8 h-8 text-[#00B347]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B0F10] mb-4">{item.title}</h3>
                  <p className="text-[#667085] leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#0B0F10]">
        <div className="container-max section-padding text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Do you have any questions?
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Our team is here to help you find the perfect scooter for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary text-lg px-8 py-4">
                <Link href="/contacto">Contact Team</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-[#00B347]">
                <Link href="/catalogo">See Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}