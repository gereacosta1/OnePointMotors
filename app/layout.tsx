import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Toaster } from '@/components/ui/sonner';
import { I18nProvider } from '@/i18n/I18nProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sunrise Store',
  description:
    'Discover our collection of high-quality electric scooters. Eco-friendly mobility, premium design, and advanced technology for your everyday life..',
  keywords:
    'electric scooters, sustainable mobility, eco-friendly transport, electric scooters',
  openGraph: {
    title: 'Sunrise Store',
    description: 'Sustainable mobility with premium design and advanced technology',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 👇 Todo lo que usa useI18n debe ir adentro */}
        <I18nProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
