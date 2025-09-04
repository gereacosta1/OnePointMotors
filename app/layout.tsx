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
  title: 'EcoRide - Scooters Eléctricos Premium | Movilidad Sustentable',
  description:
    'Descubre nuestra colección de scooters eléctricos de alta calidad. Movilidad ecológica, diseño premium y tecnología avanzada para tu día a día.',
  keywords:
    'scooters eléctricos, movilidad sustentable, transporte ecológico, patinetes eléctricos',
  openGraph: {
    title: 'EcoRide - Scooters Eléctricos Premium',
    description: 'Movilidad sustentable con diseño premium y tecnología avanzada',
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
