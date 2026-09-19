import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Sparkles,
  Search,
  ShoppingCart,
  CheckCircle2,
  Navigation,
  ArrowRight,
  TrendingUp,
  Percent,
  Compass
} from 'lucide-react';
import { Product, Order, Language } from '../types';
import { translations, getTranslation } from '../data/translations';

interface ConsumerDashboardProps {
  products: Product[];
  orders: Order[];
  language: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenSmartMatch: () => void;
  onOpenFairPrice: (product: Product) => void;
}

export const ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({
  products,
  orders,
  language,
  onSelectProduct,
  onAddToCart,
  onOpenCart,
  onOpenOrders,
  onOpenSmartMatch,
  onOpenFairPrice
}) => {
  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  const [maxDistanceRadius, setMaxDistanceRadius] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'nearby' | 'fresh' | 'organic'>('nearby');

  // Consumer's active orders
  const consumerOrders = orders.filter((o) => o.consumerName.includes('Priya') || o.consumerId === 101);

  // Filter nearby products within radius
  const nearbyProducts = products.filter((p) => {
    if (activeTab === 'nearby') return p.distanceKm <= maxDistanceRadius;
    if (activeTab === 'fresh') return p.daysSinceHarvest <= 1;
    if (activeTab === 'organic') return p.isOrganic;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-900/60 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-600">
            <Compass className="w-3.5 h-3.5" />
            <span>Hyperlocal Fresh Market Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome, Priya Sundaram!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            You are connected to <strong>14 verified smallholder farms</strong> within 15 km of Anna Nagar, Chennai. Enjoy morning harvests delivered same-day.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpenSmartMatch}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-zinc-950" />
            <span>Run Smart Matching</span>
          </button>
          <button
            onClick={onOpenOrders}
            className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold rounded-xl border border-emerald-600 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>My Active Orders ({consumerOrders.length})</span>
          </button>
        </div>
      </div>

      {/* Active Orders Tracker Card if any */}
      {consumerOrders.length > 0 && (
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3 border-b border-zinc-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-sm font-bold text-zinc-900">
                Live Order in Progress: {consumerOrders[0].orderNumber}
              </h3>
            </div>
            <button
              onClick={onOpenOrders}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Track All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-bold">Farmer / Origin</span>
              <span className="text-xs font-bold text-zinc-900">{consumerOrders[0].farmerName}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-bold">Total Amount</span>
              <span className="text-xs font-bold text-emerald-950">₹{consumerOrders[0].grandTotal} ({consumerOrders[0].paymentMethod})</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-bold">Current Pipeline Status</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                {consumerOrders[0].status}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-bold">Estimated Delivery</span>
              <span className="text-xs font-bold text-zinc-700">{consumerOrders[0].estimatedDelivery}</span>
            </div>
          </div>
        </div>
      )}

      {/* Discover Nearby Produce Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Discover Fresh Farm Produce</h2>
            <p className="text-xs text-zinc-500">Filter by farm proximity radius, harvest freshness, or natural practices.</p>
          </div>

          {/* Quick Tabs */}
          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('nearby')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'nearby' ? 'bg-white text-emerald-800 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Nearest Farms
            </button>
            <button
              onClick={() => setActiveTab('fresh')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'fresh' ? 'bg-white text-emerald-800 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Harvested ≤24h
            </button>
            <button
              onClick={() => setActiveTab('organic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'organic' ? 'bg-white text-emerald-800 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Certified Organic
            </button>
          </div>
        </div>

        {activeTab === 'nearby' && (
          <div className="bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold">
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>Distance Radius: <strong>{maxDistanceRadius} km</strong> from your home</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-60">
              <span className="text-[10px] text-zinc-400">2 km</span>
              <input
                type="range"
                min="2"
                max="25"
                step="1"
                value={maxDistanceRadius}
                onChange={(e) => setMaxDistanceRadius(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <span className="text-[10px] text-zinc-400">25 km</span>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyProducts.map((prod) => {
            const fairMin = prod.benchmarkFairPrice
              ? Math.floor(prod.benchmarkFairPrice * 0.94)
              : Math.floor(prod.pricePerUnit * 0.92);
            const fairMax = prod.benchmarkFairPrice
              ? Math.ceil(prod.benchmarkFairPrice * 1.08)
              : Math.ceil(prod.pricePerUnit * 1.12);

            return (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div
                    className="relative h-44 overflow-hidden bg-zinc-100 cursor-pointer"
                    onClick={() => onSelectProduct(prod)}
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-emerald-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {prod.category}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-zinc-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{prod.distanceKm} km away</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3
                      onClick={() => onSelectProduct(prod)}
                      className="font-bold text-sm text-zinc-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                    >
                      {prod.name}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>{prod.farmerName}</span>
                      <span className="text-amber-600 font-bold">⭐ {prod.farmerRating}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                      <div className="flex items-center gap-1 text-emerald-800">
                        <Clock className="w-3 h-3" />
                        <span>{prod.harvestDate}</span>
                      </div>
                      <span className="text-zinc-500 font-mono">
                        {prod.daysSinceHarvest === 0 ? 'Picked Today' : `${prod.daysSinceHarvest}d ago`}
                      </span>
                    </div>

                    {/* Fair price indicator */}
                    <div
                      onClick={() => onOpenFairPrice(prod)}
                      className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-xs flex items-center justify-between cursor-pointer hover:bg-amber-100/80"
                    >
                      <span className="text-amber-900 font-semibold text-[11px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        Fair: ₹{fairMin} – ₹{fairMax}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">Details</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-zinc-100 flex items-center justify-between mt-3">
                  <div>
                    <div className="text-base font-black text-emerald-950">
                      ₹{prod.pricePerUnit}
                      <span className="text-xs font-normal text-zinc-500">/{prod.unit}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      Avail: {prod.availableQuantity} {prod.unit}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(prod)}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
