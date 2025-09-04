'use client';

import { useState, useMemo, useEffect } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, Filter } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

export default function CatalogoPage() {
  const { t } = useI18n();

  // 🔝 Topes dinámicos
  const maxPrice = useMemo(() => {
    const m = Math.max(...products.map(p => p.price || 0));
    return Math.max(5000, Math.ceil(m / 100) * 100); // al menos 5000
  }, []);

  const maxAutonomy = useMemo(() => {
    const m = Math.max(...products.map(p => p.autonomia_km || 0));
    return Math.max(200, Math.ceil(m / 10) * 10);
  }, []);

  const maxPower = useMemo(() => {
    const m = Math.max(...products.map(p => p.potencia_w || 0));
    return Math.max(3000, Math.ceil(m / 100) * 100);
  }, []);

  // Estado
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [autonomyRange, setAutonomyRange] = useState<[number, number]>([0, maxAutonomy]);
  const [powerRange, setPowerRange] = useState<[number, number]>([0, maxPower]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // 🔄 Sincronizar rangos cuando cambian los topes
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  useEffect(() => {
    setAutonomyRange([0, maxAutonomy]);
  }, [maxAutonomy]);

  useEffect(() => {
    setPowerRange([0, maxPower]);
  }, [maxPower]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      product.autonomia_km >= autonomyRange[0] &&
      product.autonomia_km <= autonomyRange[1] &&
      product.potencia_w >= powerRange[0] &&
      product.potencia_w <= powerRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'autonomy':
        filtered.sort((a, b) => b.autonomia_km - a.autonomia_km);
        break;
      case 'power':
        filtered.sort((a, b) => b.potencia_w - a.potencia_w);
        break;
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        filtered.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    }

    return filtered;
  }, [priceRange, autonomyRange, powerRange, sortBy]);

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setAutonomyRange([0, maxAutonomy]);
    setPowerRange([0, maxPower]);
    setSortBy('featured');
  };

  const hasActiveFilters =
    priceRange[0] > 0 || priceRange[1] < maxPrice ||
    autonomyRange[0] > 0 || autonomyRange[1] < maxAutonomy ||
    powerRange[0] > 0 || powerRange[1] < maxPower;

  const fmt = (n: number) => n.toLocaleString('en-US');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="container-max section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B0F10] mb-4">
              {t('catalog.title')}
            </h1>
            <p className="text-lg text-[#667085] leading-relaxed">
              {t('catalog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="container-max section-padding py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24 border-0 shadow-lg rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#0B0F10] flex items-center">
                    <SlidersHorizontal className="w-5 h-5 mr-2 text-[#39FF14]" />
                    {t('filters.title')}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden rounded-xl"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Price Filter */}
                  <div>
                    <label className="text-sm font-medium text-[#0B0F10] mb-3 block">
                      {t('filters.price')}: ${fmt(priceRange[0])} - ${fmt(priceRange[1])}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={(v) => setPriceRange(v as [number, number])}
                      max={maxPrice}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  {/* Range Filter */}
                  <div>
                    <label className="text-sm font-medium text-[#0B0F10] mb-3 block">
                      {t('filters.range')}: {autonomyRange[0]}km - {autonomyRange[1]}km
                    </label>
                    <Slider
                      value={autonomyRange}
                      onValueChange={(v) => setAutonomyRange(v as [number, number])}
                      max={maxAutonomy}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Power Filter */}
                  <div>
                    <label className="text-sm font-medium text-[#0B0F10] mb-3 block">
                      {t('filters.power')}: {powerRange[0]}W - {powerRange[1]}W
                    </label>
                    <Slider
                      value={powerRange}
                      onValueChange={(v) => setPowerRange(v as [number, number])}
                      max={maxPower}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  {/* Reset Filters */}
                  {hasActiveFilters && (
                    <Button
                      onClick={resetFilters}
                      variant="outline"
                      className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t('button.clear')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <p className="text-[#667085]">
                  {filteredAndSortedProducts.length} {t('toolbar.count')}
                </p>
                {hasActiveFilters && (
                  <Badge variant="outline" className="bg-[#39FF14]/10 text-[#00B347] border-[#39FF14]/30 rounded-lg">
                    {/* Podés agregar t('filters.active') a tu diccionario si querés traducir este badge */}
                    Active filters
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 rounded-xl">
                    <SelectValue placeholder={t('sort.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{t('sort.featured')}</SelectItem>
                    <SelectItem value="newest">{t('sort.newest')}</SelectItem>
                    <SelectItem value="price-low">{t('sort.priceLow')}</SelectItem>
                    <SelectItem value="price-high">{t('sort.priceHigh')}</SelectItem>
                    <SelectItem value="autonomy">{t('sort.autonomy')}</SelectItem>
                    <SelectItem value="power">{t('sort.power')}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex rounded-xl border border-gray-200 p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-lg"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-lg"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredAndSortedProducts.length === 0 ? (
              <Card className="border-0 shadow-lg rounded-3xl">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SlidersHorizontal className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0B0F10] mb-2">
                    {t('empty.title')}
                  </h3>
                  <p className="text-[#667085] mb-6">
                    {t('empty.subtitle')}
                  </p>
                  <Button onClick={resetFilters} className="btn-primary">
                    {t('button.clear')}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
