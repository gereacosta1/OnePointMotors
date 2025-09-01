import Link from 'next/link';
import { Zap, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-[#0B0F10] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-max section-padding py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Mantente al día con <span className="text-gradient">EcoRide</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Recibe las últimas noticias sobre productos, ofertas especiales y consejos de movilidad sustentable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#39FF14] rounded-xl"
              />
              <Button className="btn-primary whitespace-nowrap">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#39FF14] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#0B0F10]" />
              </div>
              <span className="text-xl font-bold">EcoRide</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolucionando la movilidad urbana con scooters eléctricos de última generación. 
              Calidad premium, diseño innovador y compromiso con el medio ambiente.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-[#39FF14]/10 rounded-xl">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-[#39FF14]" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-[#39FF14]/10 rounded-xl">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-[#39FF14]" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-[#39FF14]/10 rounded-xl">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-[#39FF14]" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Envío Gratuito</span>
              </li>
              <li>
                <span className="text-gray-400">Garantía Extendida</span>
              </li>
              <li>
                <span className="text-gray-400">Servicio Técnico</span>
              </li>
              <li>
                <span className="text-gray-400">Financiación Affirm</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#39FF14]" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#39FF14]" />
                <span className="text-gray-400 text-sm">info@ecoride.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#39FF14]" />
                <span className="text-gray-400 text-sm">Miami, FL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-max section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 EcoRide. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                Términos de Servicio
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}