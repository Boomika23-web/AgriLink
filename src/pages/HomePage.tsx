import React from 'react';
import {
  Sprout,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Percent,
  Leaf
} from 'lucide-react';
import { Product, Language } from '../types';
import { translations, getTranslation } from '../data/translations';
import { FarmToHomeFlow } from '../components/FarmToHomeFlow';

interface HomePageProps {
  products: Product[];
  language: Language;
  onExplore: () => void;
  onJoinFarmer: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  language,
  onExplore,
  onJoinFarmer,
  onSelectProduct,
  onAddToCart,
  onNavigate
}) => {
  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  const featured = products.slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-emerald-50/40 to-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Direct-to-Consumer Agricultural Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1]">
              <span className="block text-emerald-950">{t('heroTitle1')}</span>
              <span className="block text-emerald-700">{t('heroTitle2')}</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Action Buttons matching prompt */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExplore}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-700/20 hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>{t('exploreProducts')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-join-farmer-btn"
                onClick={onJoinFarmer}
                className="px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm rounded-xl border-2 border-emerald-700 transition flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>{t('joinAsFarmer')}</span>
              </button>

              <button
                onClick={() => onNavigate('fair-price')}
                className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Fair Price Demo</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-emerald-200/60 max-w-lg">
              <div>
                <div className="text-2xl font-black text-emerald-900">100%</div>
                <div className="text-xs text-zinc-500 font-medium">Fresh Farm Sourced</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-900">₹0</div>
                <div className="text-xs text-zinc-500 font-medium">Hidden Markups</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-900">4.8★</div>
                <div className="text-xs text-zinc-500 font-medium">Verified Farmer Trust</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image / Illustration Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500 to-amber-300 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80"
                  alt="Farmer harvesting fresh crops in rural field"
                  className="w-full h-80 sm:h-96 object-cover"
                />

                {/* Floating Badge 1: Fresh Pick */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-emerald-100 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    🌱
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">Early Harvest</span>
                    <span className="text-xs font-black text-zinc-900">Country Tomatoes (₹40/kg)</span>
                  </div>
                </div>

                {/* Floating Badge 2: SymPy Fair Price */}
                <div className="absolute bottom-4 right-4 bg-emerald-900/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-2xl shadow-lg border border-emerald-700">
                  <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3 h-3" />
                    <span>SymPy Fair Price Engine</span>
                  </div>
                  <div className="text-sm font-black">
                    Recommended: ₹38 – ₹46/kg
                  </div>
                  <div className="text-[10px] text-emerald-200">
                    Production cost floor: ₹30/kg
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Flow: From Farm to Home */}
      <FarmToHomeFlow language={language} />

      {/* Section: WHY AGRILINK? (5 Pillars from prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <span>Core Innovations</span>
          </div>
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            Purpose-built technology addressing fair price realization, food miles, and post-harvest wastage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* 1. Direct Farmer Connection */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs hover:shadow-md transition text-left flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 border border-emerald-100">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5">
                1. {t('directFarmerConnection')}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {t('directFarmerDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <span>95% to Farmer</span>
            </div>
          </div>

          {/* 2. Fair Price Discovery */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200/70 shadow-2xs hover:shadow-md transition text-left flex flex-col justify-between ring-1 ring-amber-200/50">
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3 border border-amber-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5">
                2. {t('fairPriceDiscovery')}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {t('fairPriceDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <span>SymPy Calculus</span>
            </div>
          </div>

          {/* 3. Nearby Products */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs hover:shadow-md transition text-left flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 border border-emerald-100">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5">
                3. {t('nearbyProducts')}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {t('nearbyProductsDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <span>Hyperlocal 2-5 km</span>
            </div>
          </div>

          {/* 4. Smart Matching */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs hover:shadow-md transition text-left flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 border border-emerald-100">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5">
                4. {t('smartMatching')}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {t('smartMatchingDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <span>Functional map/filter</span>
            </div>
          </div>

          {/* 5. Reduce Food Waste */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs hover:shadow-md transition text-left flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 border border-emerald-100">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5">
                5. {t('reduceFoodWaste')}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {t('reduceFoodWasteDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <span>Unsold Alerts & Groups</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fresh Harvests Catalog Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <span>Today's Fresh Picks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              Harvested Directly From Local Farms
            </h2>
          </div>
          <button
            onClick={onExplore}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All {products.length} Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-zinc-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-emerald-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                    {product.category}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-white/90 text-zinc-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    {product.distanceKm} km away
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-sm text-zinc-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="text-[11px] text-zinc-500 flex items-center justify-between">
                    <span>{product.farmerName}</span>
                    <span className="text-amber-600 font-bold">⭐ {product.farmerRating}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{product.harvestDate}</span>
                  </div>

                  <p className="text-[11px] text-zinc-500 line-clamp-2 pt-1">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-zinc-100 flex items-center justify-between mt-3">
                <div>
                  <div className="text-base font-black text-emerald-900">
                    ₹{product.pricePerUnit}
                    <span className="text-xs font-normal text-zinc-500">/{product.unit}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Avail: {product.availableQuantity} {product.unit}
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer"
                >
                  {t('addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Are you a farmer in Tamil Nadu or South India?
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Join AgriLink to connect directly with conscious buyers nearby. Set fair prices with our SymPy engine, sell batch surpluses via group selling, and eliminate middleman price depreciation.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onJoinFarmer}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Join as a Verified Farmer
              </button>
              <button
                onClick={() => onNavigate('smart-match')}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl border border-emerald-600 transition cursor-pointer"
              >
                Try Smart Farmer Matching
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
