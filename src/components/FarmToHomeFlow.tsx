import React from 'react';
import { ArrowDown, ArrowRight, UserCheck, ShieldCheck, Home, CheckCircle2, Info } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';

interface FarmToHomeFlowProps {
  language: Language;
}

export const FarmToHomeFlow: React.FC<FarmToHomeFlowProps> = ({ language }) => {
  const t = (key: any) => getTranslation(language, key);

  return (
    <section className="bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/40 py-12 px-4 sm:px-6 lg:px-8 border-y border-emerald-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <span>Direct Connection Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            {t('fromFarmToHome')}
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            A transparent agricultural marketplace providing an additional direct sales channel between rural producers and urban households.
          </p>
        </div>

        {/* Visual Flow Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-center relative">
          {/* 1. FARMER */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200/80 shadow-xs text-center relative hover:shadow-md transition">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4 shadow-inner">
              <span className="text-2xl">👨‍🌾</span>
            </div>
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase block mb-1">
              Origin
            </span>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">
              {t('flowFarmer')}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed mb-3">
              Farmers list produce harvested fresh that morning, input production costs, and retain 95%+ of final consumer payments.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Price Control</span>
            </div>
          </div>

          {/* Flow Connector Desktop */}
          <div className="hidden md:flex flex-col items-center justify-center absolute left-[31%] top-1/2 -translate-y-1/2 z-10">
            <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* 2. AgriLink (Core Engine) */}
          <div className="bg-emerald-800 text-white rounded-2xl p-6 border border-emerald-700 shadow-md text-center relative ring-2 ring-emerald-500/30">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-700 text-emerald-100 flex items-center justify-center font-bold mb-4 shadow-inner">
              <span className="text-2xl">🌱</span>
            </div>
            <span className="text-xs font-black tracking-widest text-emerald-300 uppercase block mb-1">
              Technology Core
            </span>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('flowAgriLink')}
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed mb-3">
              Calculates SymPy Fair Price bounds, runs functional smart matching by proximity & freshness, and triggers real-time socket alerts.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-200 bg-emerald-900/60 px-2.5 py-1 rounded-full border border-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparent Price Discovery</span>
            </div>
          </div>

          {/* Flow Connector Desktop */}
          <div className="hidden md:flex flex-col items-center justify-center absolute left-[64%] top-1/2 -translate-y-1/2 z-10">
            <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* 3. CONSUMER */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200/80 shadow-xs text-center relative hover:shadow-md transition">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4 shadow-inner">
              <span className="text-2xl">🏡</span>
            </div>
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase block mb-1">
              Destination
            </span>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">
              {t('flowConsumer')}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed mb-3">
              Discovers fresh nearby crops, verifies harvest timing, pays fair calculated prices, and receives farm-fresh orders same-day.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Peak Freshness & Fair Price</span>
            </div>
          </div>
        </div>

        {/* Responsible Disclaimer Box */}
        <div className="mt-8 bg-amber-50/90 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-amber-900 text-xs">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">
              Project Transparency Note (College APP Requirement):
            </p>
            <p className="text-amber-800 leading-relaxed">
              AgriLink is engineered as an <strong>additional direct sales channel</strong> designed to improve farmer price realization and reduce perishable food waste. AgriLink operates cooperatively alongside existing transport logistics and does not claim to completely eliminate all middlemen or replace wholesale food distribution infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
