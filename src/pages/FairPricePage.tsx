import React, { useState } from 'react';
import {
  Sparkles,
  Calculator,
  Info,
  Sliders,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Code2,
  HelpCircle,
  Clock,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Product } from '../types';
import { calculateClientFairPrice } from '../utils/fairPriceEngine';

interface FairPricePageProps {
  initialProduct?: Product | null;
  onOpenArchitecture: () => void;
}

export const FairPricePage: React.FC<FairPricePageProps> = ({
  initialProduct,
  onOpenArchitecture
}) => {
  const [productName, setProductName] = useState(initialProduct?.name || 'Country Tomatoes');
  const [productionCost, setProductionCost] = useState<number>(initialProduct?.productionCost || 28);
  const [demandLevel, setDemandLevel] = useState<'Low' | 'Medium' | 'High'>('High');
  const [supplyLevel, setSupplyLevel] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [daysSinceHarvest, setDaysSinceHarvest] = useState<number>(initialProduct?.daysSinceHarvest || 0);
  const [shelfLifeDays, setShelfLifeDays] = useState<number>(initialProduct?.shelfLifeDays || 5);
  const [quantityKg, setQuantityKg] = useState<number>(50);
  const [transportDistanceKm, setTransportDistanceKm] = useState<number>(15);

  const estimate = calculateClientFairPrice(
    productName,
    productionCost,
    demandLevel,
    supplyLevel,
    daysSinceHarvest,
    shelfLifeDays,
    quantityKg,
    transportDistanceKm
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-100/80 text-amber-900 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-300">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Python APP Requirement #4: SymPy Equilibrium Modeling</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
          Fair Price Discovery Engine
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          SymPy symbolic calculus equations formulate supply-demand elasticity, perishable freshness decay, and producer cost recovery intervals to derive a transparent <strong>Fair Price Range</strong>.
        </p>
      </div>

      {/* Interactive Calculator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Interactive Model Variables</span>
            </div>
            <button
              onClick={() => {
                setProductName('Country Tomatoes');
                setProductionCost(28);
                setDemandLevel('High');
                setSupplyLevel('Medium');
                setDaysSinceHarvest(0);
                setShelfLifeDays(5);
                setTransportDistanceKm(15);
              }}
              className="text-[11px] text-zinc-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              Target Crop / Agricultural Produce
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full text-xs font-semibold bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              placeholder="e.g. Country Tomatoes, A2 Cow Milk, Okra"
            />
          </div>

          {/* Production Cost */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-zinc-700 mb-1.5">
              <span>Farmer Production Cost (Seed, Fertilizer, Labor, Water)</span>
              <span className="text-emerald-800 font-black">₹{productionCost} / unit</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="1"
              value={productionCost}
              onChange={(e) => setProductionCost(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>₹10 (Low cost)</span>
              <span>₹150 (High cost)</span>
            </div>
          </div>

          {/* Market Demand & Local Supply Radios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Market Demand Level
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-zinc-50 p-1 rounded-xl border border-zinc-200 text-xs">
                {(['Low', 'Medium', 'High'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDemandLevel(lvl)}
                    className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      demandLevel === lvl
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Local Supply Availability
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-zinc-50 p-1 rounded-xl border border-zinc-200 text-xs">
                {(['Low', 'Medium', 'High'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSupplyLevel(lvl)}
                    className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      supplyLevel === lvl
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Perishability & Harvest Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1.5">
                <span>Days Since Harvest</span>
                <span className="text-zinc-900 font-mono">
                  {daysSinceHarvest === 0 ? 'Today (0d)' : `${daysSinceHarvest} days`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={daysSinceHarvest}
                onChange={(e) => setDaysSinceHarvest(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>0 days (Peak fresh)</span>
                <span>10 days</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1.5">
                <span>Total Crop Shelf Life</span>
                <span className="text-zinc-900 font-mono">{shelfLifeDays} days</span>
              </div>
              <input
                type="range"
                min="2"
                max="21"
                step="1"
                value={shelfLifeDays}
                onChange={(e) => setShelfLifeDays(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>2 days</span>
                <span>21 days</span>
              </div>
            </div>
          </div>

          {/* Transport Distance */}
          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1.5">
              <span>Transport Transit Distance</span>
              <span className="text-zinc-900 font-mono">{transportDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={transportDistanceKm}
              onChange={(e) => setTransportDistanceKm(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>1 km (Farm gate)</span>
              <span>50 km</span>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Recommended Price Range Box */}
          <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-emerald-500/10 rounded-3xl border-2 border-amber-300 p-6 sm:p-7 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Mathematical Equilibrium Output
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Freshness: {estimate.freshnessPercentage}%
              </span>
            </div>

            {/* Price Triad */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {/* Min Recommended */}
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">
                  Recommended Min
                </span>
                <div className="text-2xl font-black text-emerald-800 mt-1">
                  ₹{estimate.recommendedMinPrice}
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">
                  Protects Farmer Cost
                </span>
              </div>

              {/* Central Estimated */}
              <div className="bg-emerald-800 text-white p-3.5 rounded-2xl border border-emerald-700 shadow-sm ring-2 ring-emerald-500/30">
                <span className="text-[10px] font-bold text-amber-300 uppercase block">
                  Estimated Fair Price
                </span>
                <div className="text-3xl font-black text-white mt-0.5">
                  ₹{estimate.estimatedFairPrice}
                </div>
                <span className="text-[10px] text-emerald-200 mt-0.5 block">
                  Per {estimate.unit}
                </span>
              </div>

              {/* Max Recommended */}
              <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">
                  Recommended Max
                </span>
                <div className="text-2xl font-black text-amber-900 mt-1">
                  ₹{estimate.recommendedMaxPrice}
                </div>
                <span className="text-[10px] text-amber-700 font-semibold mt-0.5 block">
                  Protects Consumer
                </span>
              </div>
            </div>

            {/* SymPy Symbolic Formula Box */}
            <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-4 font-mono text-xs space-y-2 border border-zinc-800">
              <div className="flex items-center justify-between text-[11px] text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  SymPy Symbolic Form (backend/fair_price.py)
                </span>
                <button
                  onClick={onOpenArchitecture}
                  className="hover:underline text-emerald-400 cursor-pointer"
                >
                  View Code
                </button>
              </div>
              <div className="text-emerald-300 text-[11px] overflow-x-auto py-1">
                <code>{estimate.sympyFormula}</code>
              </div>
              <p className="text-[10px] text-zinc-400 font-sans">
                Equates buyer utility vs farmer cost floor + margin with exponential harvest degradation.
              </p>
            </div>
          </div>

          {/* Factor Breakdown (Prompt Requirement) */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Factor Breakdown: Why this Price Range was Suggested
            </h3>

            <div className="space-y-3">
              {estimate.factorExplanations.map((fac, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-zinc-900">{fac.factor}</span>
                    <span className="text-emerald-800 font-mono text-[11px]">{fac.value}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    {fac.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Project Disclaimer (Exact Prompt Text) */}
          <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block uppercase tracking-wider text-[10px] text-amber-800">
                Mandatory Project Notice
              </span>
              <p className="text-amber-900 leading-relaxed text-[11px]">
                {estimate.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
