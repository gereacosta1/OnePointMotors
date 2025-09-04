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
    images: ['/IMG/scooter-electrico-3.jpeg'],
    autonomia_km: 65,
    vel_max_kmh: 45,
    potencia_w: 800,
    peso_kg: 18.5,
    bateria_ah: 15,
    garantia_meses: 24,
    stock: 15,
    destacado: true,
    description:
      'The most advanced electric scooter in our premium line. Designed for urban professionals seeking exceptional performance and cutting-edge style.',
    features: [
      'Dual 800W motor for maximum performance',
      'Long-lasting lithium battery (65 km)',
      'Regenerative braking system',
      'LCD display with Bluetooth connectivity',
      'Automatic LED lights',
      'IP65 water-resistant',
    ],
    specifications: {
      motor: 'Dual 800W brushless motor',
      bateria: 'Lithium 48V 15Ah Samsung',
      frenos: 'Front disc + rear drum',
      neumaticos: 'Tubeless 10" puncture-resistant',
      peso_max: '120 kg',
      tiempo_carga: '4–6 hours',
      certificaciones: ['CE', 'FCC', 'RoHS'],
    },
  },
  {
    id: '2',
    slug: 'scooter-electric-sport-plus',
    name: 'Scooter Electric Sport Plus',
    price: 1599,
    images: ['/IMG/scooter-electrico-2.jpeg'],
    autonomia_km: 45,
    vel_max_kmh: 35,
    potencia_w: 500,
    peso_kg: 15.2,
    bateria_ah: 10,
    garantia_meses: 18,
    stock: 25,
    destacado: true,
    description:
      'Perfect balance between performance and portability for everyday urban mobility.',
    features: [
      'Efficient 500W motor',
      'Ultra-compact foldable design',
      'Removable battery',
      'Front disc brake',
      'Companion mobile app',
    ],
    specifications: {
      motor: '500W brushless motor',
      bateria: 'Lithium 36V 10Ah LG',
      frenos: 'Front disc + rear electronic',
      neumaticos: 'Solid 8.5" maintenance-free',
      peso_max: '100 kg',
      tiempo_carga: '3–4 hours',
      certificaciones: ['CE', 'FCC'],
    },
  },
  {
    id: '3',
    slug: 'scooter-electric-sport',
    name: 'Scooter Electric Sport',
    price: 1999,
    images: ['/IMG/scooter-electrico-1.jpeg'],
    autonomia_km: 80,
    vel_max_kmh: 55,
    potencia_w: 1200,
    peso_kg: 22.8,
    bateria_ah: 20,
    garantia_meses: 36,
    stock: 8,
    destacado: true,
    description:
      'The high-performance beast for urban adventurers. Exceptional speed, power, and range.',
    features: [
      'High-power dual 1200W motor',
      'Front and rear suspension',
      'High-capacity battery',
      'Hydraulic brakes',
      'Full-color TFT display',
      'Built-in GPS',
    ],
    specifications: {
      motor: 'Dual 1200W brushless motor',
      bateria: 'Lithium 52V 20Ah Panasonic',
      frenos: 'Front and rear hydraulic',
      neumaticos: 'Tubeless 11" off-road',
      peso_max: '150 kg',
      tiempo_carga: '6–8 hours',
      certificaciones: ['CE', 'FCC', 'RoHS', 'UN38.3'],
    },
  },
  {
    id: '4',
    slug: 'electric-scooter-pro',
    name: 'Electric Scooter Pro',
    price: 2150,
    images: ['/IMG/electric-scooter-2.jpeg'],
    autonomia_km: 25,
    vel_max_kmh: 25,
    potencia_w: 300,
    peso_kg: 12.5,
    bateria_ah: 6,
    garantia_meses: 12,
    stock: 30,
    destacado: false,
    description:
      'The perfect choice for beginners and short commutes. Lightweight, affordable, and reliable.',
    features: [
      'Ultra-light and portable',
      'Ideal for beginners',
      '3-second folding',
      'Fast-charging battery',
      'Budget-friendly price',
    ],
    specifications: {
      motor: '300W brushless motor',
      bateria: 'Lithium 36V 6Ah',
      frenos: 'Electronic + rear foot brake',
      neumaticos: 'Solid 8" puncture-resistant',
      peso_max: '80 kg',
      tiempo_carga: '2–3 hours',
      certificaciones: ['CE', 'FCC'],
    },
  },
  {
    id: '5',
    slug: 'parlante-jbl-go',
    name: 'JBL Go Speaker',
    price: 350,
    images: ['/IMG/parlanteJBL3.jpeg'],
    autonomia_km: 55,
    vel_max_kmh: 40,
    potencia_w: 600,
    peso_kg: 19.8,
    bateria_ah: 12,
    garantia_meses: 24,
    stock: 12,
    destacado: false,
    description:
      'Supreme comfort for long rides. Premium suspension and an optional ergonomic seat.',
    features: [
      'Premium front suspension',
      'Optional ergonomic seat',
      'Adjustable handlebar',
      'Premium LED lights',
      'Integrated fenders',
    ],
    specifications: {
      motor: '600W brushless motor',
      bateria: 'Lithium 48V 12Ah LG',
      frenos: 'Front disc + rear drum',
      neumaticos: 'Tubeless 10" comfort',
      peso_max: '110 kg',
      tiempo_carga: '4–5 hours',
      certificaciones: ['CE', 'FCC', 'RoHS'],
    },
  },
  {
    id: '6',
    slug: 'electric-bike',
    name: 'Electric Bike',
    price: 3500,
    images: ['/IMG/bici-electric-negra.jpeg'],
    autonomia_km: 55,
    vel_max_kmh: 40,
    potencia_w: 600,
    peso_kg: 19.8,
    bateria_ah: 12,
    garantia_meses: 24,
    stock: 12,
    destacado: true,
    description:
      'Supreme comfort for long rides. Premium suspension and an optional ergonomic seat.',
    features: [
      'Premium front suspension',
      'Optional ergonomic seat',
      'Adjustable handlebar',
      'Premium LED lights',
      'Integrated fenders',
    ],
    specifications: {
      motor: '600W brushless motor',
      bateria: 'Lithium 48V 12Ah LG',
      frenos: 'Front disc + rear drum',
      neumaticos: 'Tubeless 10" comfort',
      peso_max: '110 kg',
      tiempo_carga: '4–5 hours',
      certificaciones: ['CE', 'FCC', 'RoHS'],
    },
  },
  {
    id: '7',
    slug: 'parlante-jbl',
    name: 'JBL Speaker',
    price: 300,
    images: ['/IMG/parlanteJBL.jpeg'],
    autonomia_km: 55,
    vel_max_kmh: 40,
    potencia_w: 600,
    peso_kg: 19.8,
    bateria_ah: 12,
    garantia_meses: 24,
    stock: 12,
    destacado: false,
    description:
      'Supreme comfort for long rides. Premium suspension and an optional ergonomic seat.',
    features: [
      'Premium front suspension',
      'Optional ergonomic seat',
      'Adjustable handlebar',
      'Premium LED lights',
      'Integrated fenders',
    ],
    specifications: {
      motor: '600W brushless motor',
      bateria: 'Lithium 48V 12Ah LG',
      frenos: 'Front disc + rear drum',
      neumaticos: 'Tubeless 10" comfort',
      peso_max: '110 kg',
      tiempo_carga: '4–5 hours',
      certificaciones: ['CE', 'FCC', 'RoHS'],
    },
  },
  {
    id: '8',
    slug: 'parlante-jbl-pro',
    name: 'JBL PRO Speaker',
    price: 400,
    images: ['/IMG/parlanteJBL2.jpeg'],
    autonomia_km: 55,
    vel_max_kmh: 40,
    potencia_w: 600,
    peso_kg: 19.8,
    bateria_ah: 12,
    garantia_meses: 24,
    stock: 12,
    destacado: false,
    description:
      'Supreme comfort for long rides. Premium suspension and an optional ergonomic seat.',
    features: [
      'Premium front suspension',
      'Optional ergonomic seat',
      'Adjustable handlebar',
      'Premium LED lights',
      'Integrated fenders',
    ],
    specifications: {
      motor: '600W brushless motor',
      bateria: 'Lithium 48V 12Ah LG',
      frenos: 'Front disc + rear drum',
      neumaticos: 'Tubeless 10" comfort',
      peso_max: '110 kg',
      tiempo_carga: '4–5 hours',
      certificaciones: ['CE', 'FCC', 'RoHS'],
    },
  },
  {
    id: '9',
    slug: 'ruedas-neumaticos',
    name: 'Wheels and Tires',
    price: 100,
    images: ['/IMG/ruedas.jpeg'],
    autonomia_km: 55,
    vel_max_kmh: 40,
    potencia_w: 600,
    peso_kg: 19.8,
    bateria_ah: 12,
    garantia_meses: 24,
    stock: 12,
    destacado: false,
    description:
      'Supreme comfort for long rides. Premium suspension and an optional ergonomic seat.',
    features: [
      'Premium front suspension',
      'Optional ergonomic seat',
      'Adjustable handlebar',
      'Premium LED lights',
      'Integrated fenders',
    ],
    specifications: {
      motor: '600W brushless motor',
      bateria: 'Lithium 48V 12Ah LG',
      frenos: 'Front disc + rear drum',
      neumaticos: 'Tubeless 10" comfort',
      peso_max: '110 kg',
      tiempo_carga: '4–5 hours',
      certificaciones: ['CE', 'FCC', 'RoHS'],
    },
  },
  {
    id: '10',
    slug: 'scooter-electric',
    name: 'Scooter Electric',
    price: 1000,
    images: ['/IMG/electricBike3.jpeg'],
    autonomia_km: 55,
    vel_max_kmh: 40,
    potencia_w: 600,
    peso_kg: 19.8,
    bateria_ah: 12,
    garantia_meses: 24,
    stock: 12,
    destacado: false,
    description:
      'Supreme comfort for long rides. Premium suspension and an optional ergonomic seat.',
    features: [
      'Premium front suspension',
      'Optional ergonomic seat',
      'Adjustable handlebar',
      'Premium LED lights',
      'Integrated fenders',
    ],
    specifications: {
      motor: '600W brushless motor',
      bateria: 'Lithium 48V 12Ah LG',
      frenos: 'Front disc + rear drum',
      neumaticos: 'Tubeless 10" comfort',
      peso_max: '110 kg',
      tiempo_carga: '4–5 hours',
      certificaciones: ['CE', 'FCC', 'RoHS'],
    },
  },
  {
    id: '11',
    slug: 'electric-bike',
    name: 'Electric Bike',
    price: 2500,
    images: ['/IMG/electricBike2.jpeg'],
    autonomia_km: 55,
    vel_max_kmh: 40,
    potencia_w: 600,
    peso_kg: 19.8,
    bateria_ah: 12,
    garantia_meses: 24,
    stock: 12,
    destacado: false,
    description:
      'Supreme comfort for long rides. Premium suspension and an optional ergonomic seat.',
    features: [
      'Premium front suspension',
      'Optional ergonomic seat',
      'Adjustable handlebar',
      'Premium LED lights',
      'Integrated fenders',
    ],
    specifications: {
      motor: '600W brushless motor',
      bateria: 'Lithium 48V 12Ah LG',
      frenos: 'Front disc + rear drum',
      neumaticos: 'Tubeless 10" comfort',
      peso_max: '110 kg',
      tiempo_carga: '4–5 hours',
      certificaciones: ['CE', 'FCC', 'RoHS'],
    },
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.destacado);
};
