import React, { useState } from 'react';
import {
  Percent,
  SlidersHorizontal,
  Code2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShoppingCart,
  Star,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Product, MatchingWeights, RankedMatch } from '../types';
import { smartMatchProductsFunctional } from '../utils/functionalMatching';

interface SmartMatchingPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenArchitecture: () => void;
}

export const SmartMatchingPage: React.FC<SmartMatchingPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenArchitecture
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(30);
  const [maxPrice, setMaxPrice] = useState<number>(120);
  const [minRating, setMinRating] = useState<number>(4.0);

  // Weight adjustments
  const [weights, setWeights] = useState<MatchingWeights>({
    distance: 0.30,
    freshness: 0.25,
    price: 0.20,
    rating: 0.15,
    quantity: 0.10
  });

  const [showCode, setShowCode] = useState(false);

  // Run functional matching pipeline (map, filter, sorted, pure lambdas)
  const rankedMatches: RankedMatch[] = smartMatchProductsFunctional(
    products,
    selectedCategory,
    maxPrice,
    maxDistanceKm,
    minRating,
    1,
    weights
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-300">
          <Percent className="w-4 h-4 text-emerald-600" />
          <span>Python APP Requirement #1: Functional Programming</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
          Smart Farmer Matching Engine
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          Evaluates multi-factor agricultural proximity, harvest freshness, price elasticity, and farmer reputations using pure higher-order functions: <code className="text-emerald-800 font-bold">map()</code>, <code className="text-emerald-800 font-bold">filter()</code>, <code className="text-emerald-800 font-bold">sorted()</code>, and <code className="text-emerald-800 font-bold">lambda</code> closures.
        </p>
      </div>

      {/* Code Inspector Toggle Bar */}
      <div className="bg-zinc-900 text-zinc-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">
              Functional Pipeline Implementation (backend/matching.py)
            </span>
            <span className="text-zinc-400">
              Filter with predicate lambdas → Map to composite score objects → Sort via lambda key
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-emerald-300 rounded-xl text-xs font-bold transition border border-zinc-700 cursor-pointer"
          >
            {showCode ? 'Hide Pipeline Code' : 'Inspect Functional Code'}
          </button>
          <button
            onClick={onOpenArchitecture}
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Full Architecture
          </button>
        </div>
      </div>

      {/* Code snippet if expanded */}
      {showCode && (
        <div className="bg-black text-emerald-300 font-mono text-xs p-5 rounded-2xl border border-zinc-800 overflow-x-auto leading-relaxed shadow-lg">
          <div className="text-zinc-400 mb-2 font-bold text-[11px] uppercase">
            # Pure Functional Composition in Python (backend/matching.py):
          </div>
          <pre>
{`# 1. Higher-order pure closure for distance decay
compute_distance_score = lambda max_d: lambda dist: max(0.0, 1.0 - (dist / max_d))

# 2. Filtering using filter() with pure lambda predicate
filtered = list(filter(
    lambda p: (
        (cat == "All" or p["category"] == cat) and
        p["price_per_unit"] <= max_price and
        p["distance_km"] <= max_dist and
        p["farmer_rating"] >= min_rating
    ),
    products
))

# 3. Mapping using map() to evaluate composite matching weights
evaluate_match = lambda p: {
    "product": p,
    "match_score": round(
        compute_distance_score(max_dist)(p["distance_km"]) * 0.30 +
        freshness_score(p["days_since_harvest"]) * 0.25 +
        price_competitiveness(p["price_per_unit"]) * 0.20 +
        rating_score(p["farmer_rating"]) * 0.15 +
        quantity_score(p["available_quantity"]) * 0.10, 3
    ) * 100
}
scored_matches = list(map(evaluate_match, filtered))

# 4. Sorting using sorted() with lambda key comparator
ranked = sorted(scored_matches, key=lambda x: x["match_score"], reverse=True)`}
          </pre>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Functional Controls & Weights */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-zinc-200 p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Functional Filter Predicates
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">filter() inputs</span>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">Target Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs font-semibold bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-zinc-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="All">All Agricultural Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Eggs">Eggs</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Max Distance */}
          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
              <span>Max Farm Distance</span>
              <span className="text-emerald-800 font-black">{maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="3"
              max="50"
              step="1"
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Max Price */}
          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
              <span>Max Unit Price</span>
              <span className="text-emerald-800 font-black">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Min Farmer Rating */}
          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
              <span>Min Farmer Trust Rating</span>
              <span className="text-amber-700 font-black">⭐ {minRating}</span>
            </div>
            <input
              type="range"
              min="3.0"
              max="5.0"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          {/* Weight Formulation */}
          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <span className="text-xs font-bold text-zinc-800 block">
              Multi-Factor Scoring Weights:
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-zinc-600">
                <span>Distance Proximity</span>
                <span className="font-mono font-bold text-zinc-900">{(weights.distance * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span>Harvest Freshness</span>
                <span className="font-mono font-bold text-zinc-900">{(weights.freshness * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span>Fair Price Competitiveness</span>
                <span className="font-mono font-bold text-zinc-900">{(weights.price * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span>Farmer Reputation</span>
                <span className="font-mono font-bold text-zinc-900">{(weights.rating * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span>Available Volume</span>
                <span className="font-mono font-bold text-zinc-900">{(weights.quantity * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Ranked Results */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-700">
              Ranked Matches (<strong className="text-emerald-800">{rankedMatches.length}</strong> optimal producers)
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">sorted(scored, reverse=True)</span>
          </div>

          {rankedMatches.length === 0 ? (
            <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center">
              <p className="text-zinc-600 text-sm font-semibold">No farms match the strict functional predicate filter.</p>
              <p className="text-xs text-zinc-400 mt-1">Try expanding max distance or lowering the price ceiling.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rankedMatches.map(({ product, matchScore, freshnessLabel, scoreBreakdown }, rankIdx) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-zinc-200/90 p-5 shadow-2xs hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden"
                >
                  {/* Top Match Ribbon */}
                  {rankIdx === 0 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl shadow-2xs">
                      #1 Best Composite Match
                    </div>
                  )}

                  {/* Produce & Farm Info */}
                  <div className="flex items-start gap-4 min-w-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-zinc-100"
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                          {rankIdx + 1}
                        </span>
                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="font-black text-base text-zinc-900 hover:text-emerald-700 cursor-pointer truncate"
                        >
                          {product.name}
                        </h3>
                      </div>

                      <div className="text-xs text-zinc-500">
                        <span>{product.farmerName}</span> • <span className="text-amber-600 font-bold">⭐ {product.farmerRating}</span> • <span>{product.farmerLocation || product.location || 'Local Farm'}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {product.distanceKm} km away
                        </span>
                        <span className="bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {freshnessLabel}
                        </span>
                        <span className="text-emerald-950 font-black text-xs">
                          ₹{product.pricePerUnit}/{product.unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Composite Match Score Pill & Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                    <div className="text-left sm:text-right">
                      <div className="inline-flex items-center gap-1 bg-emerald-900 text-emerald-100 px-3 py-1 rounded-full text-xs font-black shadow-xs">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>{matchScore}% Match</span>
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-1">
                        Dist: {scoreBreakdown.distanceScore}% • Fresh: {scoreBreakdown.freshnessScore}%
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Basket</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
