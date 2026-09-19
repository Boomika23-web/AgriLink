import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, AlertCircle, Sprout, Check } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { calculateClientFairPrice } from '../utils/fairPriceEngine';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Vegetables');
  const [availableQuantity, setAvailableQuantity] = useState<number>(50);
  const [unit, setUnit] = useState<'kg' | 'liter' | 'bunch' | 'dozen' | 'pack'>('kg');
  const [pricePerUnit, setPricePerUnit] = useState<number>(40);
  const [productionCost, setProductionCost] = useState<number>(28);
  const [harvestDate, setHarvestDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [shelfLifeDays, setShelfLifeDays] = useState<number>(5);
  const [location, setLocation] = useState<string>('Madurai, Tamil Nadu');
  const [description, setDescription] = useState<string>('');
  const [isOrganic, setIsOrganic] = useState<boolean>(true);

  // Live SymPy fair price calculation preview
  const fairEstimate = calculateClientFairPrice(
    name || 'Produce',
    productionCost,
    'High',
    'Medium',
    0,
    shelfLifeDays,
    availableQuantity,
    15
  );

  useEffect(() => {
    // Set default recommended price when production cost changes
    if (fairEstimate && !pricePerUnit) {
      setPricePerUnit(fairEstimate.estimatedFairPrice);
    }
  }, [productionCost]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddProduct({
      name: name.trim(),
      category,
      availableQuantity,
      unit,
      pricePerUnit,
      productionCost,
      harvestDate,
      daysSinceHarvest: 0,
      shelfLifeDays,
      farmerId: 1,
      farmerName: 'Ramesh Kumar',
      farmerLocation: location,
      location,
      farmerRating: 4.9,
      status: 'active',
      distanceKm: 3.2,
      description: description.trim() || `Fresh ${name} harvested direct from our natural farm in ${location}.`,
      imageUrl:
        category === 'Dairy'
          ? 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80'
          : category === 'Fruits'
          ? 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&auto=format&fit=crop&q=80'
          : category === 'Eggs'
          ? 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      isOrganic,
      benchmarkFairPrice: fairEstimate.estimatedFairPrice
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-emerald-100 animate-in zoom-in-95 duration-150">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900">List New Harvest Produce</h2>
              <p className="text-xs text-zinc-500">Provide harvest specifications & calculate fair pricing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-xl hover:bg-zinc-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Product Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Country Tomatoes, Okra, Fresh A2 Milk"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Eggs">Eggs</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Available Quantity *
              </label>
              <input
                type="number"
                min="1"
                required
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(Number(e.target.value))}
                className="w-full text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Unit of Measurement *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="liter">Liter (L)</option>
                <option value="bunch">Bunch</option>
                <option value="dozen">Dozen</option>
                <option value="pack">Pack</option>
              </select>
            </div>
          </div>

          {/* Costs & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Farmer Production Cost (₹/{unit}) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={productionCost}
                onChange={(e) => setProductionCost(Number(e.target.value))}
                className="w-full text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
              <span className="text-[10px] text-zinc-400 mt-1 block">
                Includes seed, fertilizer, water, labor & packing
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Your Listing Price (₹/{unit}) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full text-xs font-bold bg-white border-2 border-emerald-600 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-emerald-950"
              />
              <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
                Direct payout to farmer: ₹{Math.round(pricePerUnit * 0.95)}/{unit}
              </span>
            </div>
          </div>

          {/* Live SymPy Fair Price Box */}
          <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-amber-950">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>SymPy Fair Price Recommendation</span>
              </div>
              <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                ₹{fairEstimate.recommendedMinPrice} – ₹{fairEstimate.recommendedMaxPrice} /{unit}
              </span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Based on your ₹{productionCost} production cost floor + transport logistics. Setting your price inside this band maximizes both fair earnings and fast consumer clearance.
            </p>
          </div>

          {/* Harvest Date & Shelf Life */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Harvest Date *
              </label>
              <input
                type="date"
                required
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Estimated Shelf Life (Days) *
              </label>
              <input
                type="number"
                min="1"
                max="60"
                required
                value={shelfLifeDays}
                onChange={(e) => setShelfLifeDays(Number(e.target.value))}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Location & Organic Checkbox */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Farm Origin / Village *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                <span className="text-xs font-bold text-zinc-800">
                  Grown naturally / Certified Organic
                </span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              Short Description / Harvest Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Early morning harvested country tomatoes, pesticide-free, rich in flavor."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Publish Harvest Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
