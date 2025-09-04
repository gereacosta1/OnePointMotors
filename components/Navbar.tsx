'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';
import LangToggle from '@/components/LangToggle';
import { useI18n } from '@/i18n/I18nProvider';

export function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { items, toggleCart } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/catalogo', label: t('nav.catalog') },
    { href: '/nosotros', label: t('nav.about') },
    { href: '/contacto', label: t('nav.contact') },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white/90 backdrop-blur-sm'
      )}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-[#39FF14] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-[#0B0F10]" />
            </div>
            <span className="text-xl font-bold text-[#0B0F10]">One Point Motors</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-300 hover:text-[#39FF14] relative',
                  pathname === link.href ? 'text-[#39FF14]' : 'text-[#0B0F10]'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#39FF14] rounded-full" />
                )}
              </Link>
            ))}

            {/* Language toggle (desktop) */}
            <LangToggle />
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative p-2 hover:bg-[#39FF14]/10 rounded-xl transition-colors duration-300"
              aria-label={t('nav.cart')}
              title={t('nav.cart')}
            >
              <ShoppingCart className="w-5 h-5 text-[#0B0F10]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#39FF14] text-[#0B0F10] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-[#39FF14]/10 rounded-xl transition-colors duration-300"
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-[#0B0F10]" /> : <Menu className="w-5 h-5 text-[#0B0F10]" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between px-2 pb-3">
              <div className="text-sm text-[#667085]">{t('nav.menu')}</div>
              {/* Language toggle (mobile) */}
              <LangToggle />
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-base font-medium transition-colors duration-300 hover:text-[#39FF14] px-2 py-1',
                    pathname === link.href ? 'text-[#39FF14]' : 'text-[#0B0F10]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
