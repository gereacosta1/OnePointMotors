export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  autonomia_km: number;
  vel_max_kmh: number;
  potencia_w: number;
  peso_kg: number;
  bateria_ah: number;
  garantia_meses: number;
  stock: number;
  destacado: boolean;
  description: string;
  features: string[];
  specifications: {
    motor: string;
    bateria: string;
    frenos: string;
    neumaticos: string;
    peso_max: string;
    tiempo_carga: string;
    certificaciones: string[];
  };
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'scooter-electric-pro-max',
    name: 'Scooter Electric Pro Max',
    price: 1299,
    images: [
      '/IMG/scooter-electrico-3.jpeg',
    ],
    autonomia_km: 65,
    vel_max_kmh: 45,
    potencia_w: 800,
    peso_kg: 18.5,
    bateria_ah: 15,
    garantia_meses: 24,
    stock: 15,
    destacado: true,
    description: 'El scooter eléctrico más avanzado de nuestra línea premium. Diseñado para profesionales urbanos que buscan rendimiento excepcional y estilo vanguardista.',
    features: [
      'Motor dual de 800W para máximo rendimiento',
      'Batería de litio de larga duración (65km)',
      'Sistema de frenos regenerativo',
      'Pantalla LCD con conectividad Bluetooth',
      'Luces LED automáticas',
      'Resistente al agua IP65'
    ],
    specifications: {
      motor: 'Motor brushless dual 800W',
      bateria: 'Litio 48V 15Ah Samsung',
      frenos: 'Disco delantero + tambor trasero',
      neumaticos: 'Tubeless 10" anti-punctura',
      peso_max: '120 kg',
      tiempo_carga: '4-6 horas',
      certificaciones: ['CE', 'FCC', 'RoHS']
    }
  },
  {
    id: '2',
    slug: 'scooter-electric-sport-plus',
    name: 'Scooter Electric Sport Plus',
    price: 1000,
    images: [
      '/IMG/scooter-electrico-2.jpeg',
    ],
    autonomia_km: 45,
    vel_max_kmh: 35,
    potencia_w: 500,
    peso_kg: 15.2,
    bateria_ah: 10,
    garantia_meses: 18,
    stock: 25,
    destacado: true,
    description: 'Perfecto equilibrio entre rendimiento y portabilidad para la movilidad urbana diaria.',
    features: [
      'Motor de 500W eficiente',
      'Diseño plegable ultracompacto',
      'Batería extraíble',
      'Frenos de disco delanteros',
      'App móvil incluida'
    ],
    specifications: {
      motor: 'Motor brushless 500W',
      bateria: 'Litio 36V 10Ah LG',
      frenos: 'Disco delantero + eléctrico trasero',
      neumaticos: 'Sólidos 8.5" sin mantenimiento',
      peso_max: '100 kg',
      tiempo_carga: '3-4 horas',
      certificaciones: ['CE', 'FCC']
    }
  },
  {
    id: '3',
    slug: 'scooter-electric-sport',
    name: 'Scooter Electric Sport',
    price: 1599,
    images: [
      '/IMG/scooter-electrico-1.jpeg',
    ],
    autonomia_km: 80,
    vel_max_kmh: 55,
    potencia_w: 1200,
    peso_kg: 22.8,
    bateria_ah: 20,
    garantia_meses: 36,
    stock: 8,
    destacado: true,
    description: 'La bestia de alto rendimiento para aventureros urbanos. Velocidad, potencia y autonomía excepcionales.',
    features: [
      'Motor dual 1200W de alta potencia',
      'Suspensión delantera y trasera',
      'Batería de máxima capacidad',
      'Frenos hidráulicos',
      'Pantalla TFT a color',
      'GPS integrado'
    ],
    specifications: {
      motor: 'Motor brushless dual 1200W',
      bateria: 'Litio 52V 20Ah Panasonic',
      frenos: 'Hidráulicos delantero y trasero',
      neumaticos: 'Tubeless 11" off-road',
      peso_max: '150 kg',
      tiempo_carga: '6-8 horas',
      certificaciones: ['CE', 'FCC', 'RoHS', 'UN38.3']
    }
  },
  {
    id: '4',
    slug: 'electric-scooter-pro',
    name: 'Electric Scooter Pro',
    price: 1950,
    images: [
      '/IMG/electric-scooter-2.jpeg',
    ],
    autonomia_km: 25,
    vel_max_kmh: 25,
    potencia_w: 300,
    peso_kg: 12.5,
    bateria_ah: 6,
    garantia_meses: 12,
    stock: 30,
    destacado: false,
    description: 'La opción perfecta para principiantes y trayectos cortos. Ligero, asequible y confiable.',
    features: [
      'Ultraligero y portátil',
      'Ideal para principiantes',
      'Plegado en 3 segundos',
      'Batería de carga rápida',
      'Precio accesible'
    ],
    specifications: {
      motor: 'Motor brushless 300W',
      bateria: 'Litio 36V 6Ah',
      frenos: 'Eléctrico + pie trasero',
      neumaticos: 'Sólidos 8" anti-punctura',
      peso_max: '80 kg',
      tiempo_carga: '2-3 horas',
      certificaciones: ['CE', 'FCC']
    }
  },
  {
    id: '5',
    slug: 'electric-scooter',
    name: 'Electric Scootert',
    price: 1299,
    images: [
    '/IMG/electric-scooter-1.jpeg'
    ],
    autonomia_km: 55,
    vel_max_kmh: 40,
    potencia_w: 600,
    peso_kg: 19.8,
    bateria_ah: 12,
    garantia_meses: 24,
    stock: 12,
    destacado: false,
    description: 'Confort supremo para viajes largos. Suspensión premium y asiento ergonómico opcional.',
    features: [
      'Suspensión delantera premium',
      'Asiento ergonómico opcional',
      'Manillar ajustable',
      'Luces LED premium',
      'Guardabarros integrados'
    ],
    specifications: {
      motor: 'Motor brushless 600W',
      bateria: 'Litio 48V 12Ah LG',
      frenos: 'Disco delantero + tambor trasero',
      neumaticos: 'Tubeless 10" confort',
      peso_max: '110 kg',
      tiempo_carga: '4-5 horas',
      certificaciones: ['CE', 'FCC', 'RoHS']
    }
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.destacado);
};