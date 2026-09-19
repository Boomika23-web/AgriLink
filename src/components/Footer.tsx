import React from 'react';
import { Sprout, Heart, ShieldCheck, Code2, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations, getTranslation } from '../data/translations';

interface FooterProps {
  language: Language;
  onOpenArchitecture: () => void;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenArchitecture, onNavigate }) => {
  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  return (
    <footer className="bg-emerald-950 text-zinc-300 border-t border-emerald-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {t('brandName')}
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-md">
              A Smart Direct-to-Consumer Agricultural Marketplace with Fair Price Discovery, engineered for transparent producer-to-consumer trade and reduced farm waste.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onOpenArchitecture}
                className="inline-flex items-center gap-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-700 transition cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Python APP Project Architecture</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('fair-price')} className="hover:text-white hover:underline cursor-pointer">
                  Fair Price Discovery Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('smart-match')} className="hover:text-white hover:underline cursor-pointer">
                  Smart Farmer Matching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('farmer-dash')} className="hover:text-white hover:underline cursor-pointer">
                  Farmer Dashboard & Unsold Alerts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('consumer-dash')} className="hover:text-white hover:underline cursor-pointer">
                  Consumer Nearby Fresh Market
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white hover:underline cursor-pointer">
                  Tkinter Desktop Admin GUI
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Project Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              College APP Project
            </h4>
            <div className="space-y-1.5 text-xs text-emerald-200/80">
              <p className="font-semibold text-white">Advanced Programming Practice</p>
              <p>Backend: Python (Flask, SymPy, Sockets, Multiprocessing, Tkinter)</p>
              <p>Database: MySQL 8.0+</p>
              <p>Frontend: React & Tailwind CSS</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>© {new Date().getFullYear()} AgriLink. From Farm to Home. Transparent Direct Sales Channel.</p>
          <p className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
            <span>for Agricultural Empowerment</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
