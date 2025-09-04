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
              Stay up to date with <span className="text-gradient">Sunrise Store</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Get the latest product news, special offers, and sustainable mobility tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#39FF14] rounded-xl"
              />
              <Button className="btn-primary whitespace-nowrap">
                Subscribe
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
              <span className="text-xl font-bold">Sunrire Store</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing urban mobility with cutting-edge electric scooters.
              Premium quality, innovative design, and a commitment to the environment.
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
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                  Us
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Free Shipping</span>
              </li>
              <li>
                <span className="text-gray-400">Extended Warranty</span>
              </li>
              <li>
                <span className="text-gray-400">Technical Service</span>
              </li>
              <li>
                <span className="text-gray-400">Affirm Financing</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#39FF14]" />
                <span className="text-gray-400 text-sm">+1 (786) 658-8281</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#39FF14]" />
                <span className="text-gray-400 text-sm">info@ecoride.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#39FF14]" />
                <span className="text-gray-400 text-sm">821 ne 79th st Miami, FL, 33138</span>
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
              © 2025 Sunrise Store. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
               Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300">
               Privacy Policy
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