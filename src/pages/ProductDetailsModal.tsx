import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenFairPriceDemo: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenFairPriceDemo
}) => {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const fairMin = product.benchmarkFairPrice
    ? Math.floor(product.benchmarkFairPrice * 0.94)
    : Math.floor(product.pricePerUnit * 0.92);
  const fairMax = product.benchmarkFairPrice
    ? Math.ceil(product.benchmarkFairPrice * 1.08)
    : Math.ceil(product.pricePerUnit * 1.12);

  const handleAdd = () => {
    onAddToCart(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-emerald-100 animate-in zoom-in-95 duration-150">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-xs transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="bg-emerald-900/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
              {product.category}
            </span>
            {product.isOrganic && (
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Certified Natural/Organic
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div>
              <h2 className="text-2xl font-black text-zinc-900">{product.name}</h2>
              <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                <span>By <strong>{product.farmerName}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {product.farmerLocation || product.location || 'Local Farm'} ({product.distanceKm} km away)
                </span>
                <span>•</span>
                <span className="text-amber-600 font-bold">⭐ {product.farmerRating}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-emerald-950">
                ₹{product.pricePerUnit}
                <span className="text-xs font-normal text-zinc-500">/{product.unit}</span>
              </div>
              <div className="text-[11px] text-zinc-400">
                {product.availableQuantity} {product.unit} in stock
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed">
            {product.description}
          </p>

          {/* SymPy Fair Price Banner */}
          <div className="bg-amber-50/90 border border-amber-300/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Fair Price Discovery Range: ₹{fairMin} – ₹{fairMax} /{product.unit}</span>
              </div>
              <button
                onClick={() => onOpenFairPriceDemo(product)}
                className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950 cursor-pointer"
              >
                Inspect SymPy Equation
              </button>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Derived from farmer production cost baseline (₹{product.productionCost}/unit), current market supply-demand elasticity, and freshness degradation decay.
            </p>
          </div>

          {/* Freshness & Origin Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Harvest Timestamp</span>
              <span className="font-semibold text-zinc-800 mt-0.5 block">{product.harvestDate}</span>
              <span className="text-[10px] text-emerald-700 font-bold">
                {product.daysSinceHarvest === 0 ? 'Today' : `${product.daysSinceHarvest} days ago`}
              </span>
            </div>

            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Shelf Life</span>
              <span className="font-semibold text-zinc-800 mt-0.5 block">{product.shelfLifeDays} Days</span>
              <span className="text-[10px] text-zinc-500">Store cool & dry</span>
            </div>

            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 col-span-2 sm:col-span-1">
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Transit Logistics</span>
              <span className="font-semibold text-zinc-800 mt-0.5 block">Direct Farm Route</span>
              <span className="text-[10px] text-emerald-700 font-bold">Under 3 hours transit</span>
            </div>
          </div>

          {/* Quantity selector and Add to Cart */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-700">Quantity ({product.unit}):</span>
              <div className="flex items-center border border-zinc-300 rounded-xl bg-zinc-50 overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-zinc-200 text-zinc-700 transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-zinc-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.availableQuantity, q + 1))}
                  className="p-2 hover:bg-zinc-200 text-zinc-700 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block">Total Price:</span>
                <span className="text-lg font-black text-emerald-950">₹{product.pricePerUnit * qty}</span>
              </div>
              <button
                onClick={handleAdd}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
