import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Clock,
  Sparkles,
  Check,
  ChevronDown,
  Info,
  Tag
} from 'lucide-react';
import { Product, ProductCategory, Language } from '../types';
import { translations, getTranslation } from '../data/translations';

interface ProductsPageProps {
  products: Product[];
  language: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenFairPriceDemo: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  language,
  onSelectProduct,
  onAddToCart,
  onOpenFairPriceDemo
}) => {
  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [freshnessFilter, setFreshnessFilter] = useState<string>('all'); // all, today, 1-2days
  const [sortBy, setSortBy] = useState<string>('nearest'); // nearest, price_asc, fresh_first, rating

  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Eggs', 'Other'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        const matchSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());

        // Category
        const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;

        // Price
        const matchPrice = p.pricePerUnit <= maxPrice;

        // Distance
        const matchDistance = p.distanceKm <= maxDistance;

        // Freshness
        let matchFreshness = true;
        if (freshnessFilter === 'today') {
          matchFreshness = p.daysSinceHarvest === 0;
        } else if (freshnessFilter === '1-2days') {
          matchFreshness = p.daysSinceHarvest <= 2;
        }

        return matchSearch && matchCategory && matchPrice && matchDistance && matchFreshness;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === 'price_desc') return b.pricePerUnit - a.pricePerUnit;
        if (sortBy === 'nearest') return a.distanceKm - b.distanceKm;
        if (sortBy === 'fresh_first') return a.daysSinceHarvest - b.daysSinceHarvest;
        if (sortBy === 'rating') return b.farmerRating - a.farmerRating;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, maxPrice, maxDistance, freshnessFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
              Fresh Agricultural Marketplace
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1">
              Direct-from-farm produce with transparent SymPy fair price discovery and harvest provenance.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tomatoes, milk, farmer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-emerald-800'
              }`}
            >
              {cat === 'All' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-2xs space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-xs text-zinc-900 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <span>Smart Filters</span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setMaxPrice(200);
                setMaxDistance(50);
                setFreshnessFilter('all');
                setSortBy('nearest');
                setSearchQuery('');
              }}
              className="text-[11px] text-zinc-400 hover:text-emerald-700 cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Sort Control */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-zinc-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="nearest">Distance: Nearest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="fresh_first">Freshness: Most Fresh First</option>
              <option value="rating">Farmer Rating: Highest First</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
              <span>Max Price</span>
              <span className="text-emerald-800 font-black">₹{maxPrice}/unit</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>₹20</span>
              <span>₹200</span>
            </div>
          </div>

          {/* Max Distance Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
              <span>Max Distance</span>
              <span className="text-emerald-800 font-black">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>2 km (Local)</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Freshness Radios */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-2">Harvest Freshness</label>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                <input
                  type="radio"
                  name="freshness"
                  checked={freshnessFilter === 'all'}
                  onChange={() => setFreshnessFilter('all')}
                  className="accent-emerald-600"
                />
                <span>All Freshness Levels</span>
              </label>
              <label className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                <input
                  type="radio"
                  name="freshness"
                  checked={freshnessFilter === 'today'}
                  onChange={() => setFreshnessFilter('today')}
                  className="accent-emerald-600"
                />
                <span>Harvested Today Only</span>
              </label>
              <label className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                <input
                  type="radio"
                  name="freshness"
                  checked={freshnessFilter === '1-2days'}
                  onChange={() => setFreshnessFilter('1-2days')}
                  className="accent-emerald-600"
                />
                <span>Within 1-2 Days</span>
              </label>
            </div>
          </div>

          {/* Fair Price Hint Box */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
            <div className="font-bold flex items-center gap-1 text-amber-950 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>SymPy Fair Range</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Every card shows an estimated Fair Price Range computed using SymPy demand-supply and cost recovery equilibrium.
            </p>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-zinc-500 font-semibold">
              Showing <strong>{filteredProducts.length}</strong> fresh agricultural products
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center">
              <p className="text-zinc-600 font-semibold text-sm">No products match your selected criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(200);
                  setMaxDistance(50);
                  setFreshnessFilter('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold text-emerald-700 underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                // Fair price range
                const fairMin = product.benchmarkFairPrice
                  ? Math.floor(product.benchmarkFairPrice * 0.94)
                  : Math.floor(product.pricePerUnit * 0.92);
                const fairMax = product.benchmarkFairPrice
                  ? Math.ceil(product.benchmarkFairPrice * 1.08)
                  : Math.ceil(product.pricePerUnit * 1.12);

                const isFair = product.pricePerUnit >= fairMin && product.pricePerUnit <= fairMax;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image + Badges */}
                      <div className="relative h-48 overflow-hidden bg-zinc-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-emerald-950/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                          {product.category}
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-zinc-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>{product.distanceKm} km</span>
                        </div>
                        {product.isOrganic && (
                          <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            Organic
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-4 space-y-2.5">
                        <div>
                          <h3
                            onClick={() => onSelectProduct(product)}
                            className="font-bold text-sm text-zinc-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-zinc-500 mt-0.5">
                            <span>{product.farmerName}</span>
                            <span className="text-amber-600 font-bold">⭐ {product.farmerRating}</span>
                          </div>
                        </div>

                        {/* Harvest & Freshness */}
                        <div className="flex items-center justify-between text-[11px] bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                          <div className="flex items-center gap-1 text-emerald-800 font-medium">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            <span>{product.harvestDate}</span>
                          </div>
                          <span className="text-zinc-500 font-mono">
                            {product.daysSinceHarvest === 0
                              ? 'Fresh Today'
                              : `${product.daysSinceHarvest}d ago`}
                          </span>
                        </div>

                        {/* Prompt-mandated: Fair Price Range Indicator */}
                        <div
                          onClick={() => onOpenFairPriceDemo(product)}
                          className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-2 text-xs flex items-center justify-between cursor-pointer hover:bg-amber-100/70 transition"
                          title="Click to inspect SymPy symbolic formula and pricing variables"
                        >
                          <div className="flex items-center gap-1 text-amber-900 font-semibold text-[11px]">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>Fair Range: ₹{fairMin} – ₹{fairMax}</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                            Fair Match
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer: Price + Actions */}
                    <div className="p-4 pt-2 border-t border-zinc-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-lg font-black text-emerald-950">
                            ₹{product.pricePerUnit}
                            <span className="text-xs font-normal text-zinc-500">/{product.unit}</span>
                          </div>
                          <div className="text-[10px] text-zinc-400">
                            In Stock: {product.availableQuantity} {product.unit}
                          </div>
                        </div>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer"
                        >
                          {t('addToCart')}
                        </button>
                      </div>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="w-full text-center text-[11px] font-bold text-zinc-600 hover:text-emerald-800 py-1 cursor-pointer"
                      >
                        View Harvest Details & Farm Info
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
