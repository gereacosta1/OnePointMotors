'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type Dict = Record<string, string>;

const en: Dict = {
  // Navbar
  'nav.home': 'Home',
  'nav.catalog': 'Catalog',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.cart': 'Cart',
  'nav.menu': 'Menu',

  // Catalog page
  'catalog.title': 'Electric Scooters Catalog',
  'catalog.subtitle':
    'Explore our full collection of premium electric scooters. From urban models to high performance for every lifestyle.',
  'filters.title': 'Filters',
  'filters.price': 'Price',
  'filters.range': 'Range',
  'filters.power': 'Power',
  'filters.clear': 'Clear Filters',
  'sort.placeholder': 'Sort by',
  'sort.featured': 'Featured',
  'sort.newest': 'Newest',
  'sort.priceLow': 'Price: Low to High',
  'sort.priceHigh': 'Price: High to Low',
  'sort.autonomy': 'Highest Range',
  'sort.power': 'Highest Power',
  'toolbar.count': 'products found',
  'empty.title': 'No products found',
  'empty.subtitle': 'Try adjusting the filters to see more options.',
  'button.clear': 'Clear Filters',
};

// Por ahora, español = inglés (querés todo en inglés)
const es: Dict = { ...en };

type Lang = 'en' | 'es';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const dicts: Record<Lang, Dict> = { en, es };

  const t = (key: string, params?: Record<string, string | number>) => {
    // Fallback: si falta en el idioma activo, usa EN; si no existe, muestra la clave
    let str = dicts[lang][key] ?? en[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`{${k}}`, 'g'), String(v));
      }
    }
    return str;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
