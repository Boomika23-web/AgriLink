import React from 'react';
import {
  Sprout,
  ShieldCheck,
  Code2,
  Cpu,
  Radio,
  Sparkles,
  Monitor,
  Heart,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { FarmToHomeFlow } from '../components/FarmToHomeFlow';
import { Language } from '../types';

interface AboutPageProps {
  language: Language;
  onOpenArchitecture: () => void;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  language,
  onOpenArchitecture,
  onNavigate
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>Project Purpose & Academic Background</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
          About AgriLink
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
          A Smart Direct-to-Consumer Agricultural Marketplace with Fair Price Discovery, engineered as a college Advanced Programming Practice (APP) capstone project.
        </p>
      </div>

      {/* Farm to home visual flow */}
      <FarmToHomeFlow language={language} />

      {/* Purpose & Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Why AgriLink Exists</h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            In traditional agricultural supply chains, smallholder farmers often receive less than 25–30% of the retail price paid by end consumers, with the remainder captured by multiple intermediary trading layers and transport handling fees. Perishable food also deteriorates during prolonged warehouse layovers.
          </p>
          <p className="text-xs text-zinc-600 leading-relaxed">
            AgriLink was conceived to provide an <strong>additional direct sales channel</strong> where farmers can list early morning harvests, discover fair mathematical price bounds, and connect directly with conscious nearby households.
          </p>
          <div className="pt-2 border-t border-zinc-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Over 95% of consumer spend goes directly to the farmer.</span>
          </div>
        </div>

        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 border border-emerald-800">
          <h2 className="text-xl font-bold text-white">College APP Curriculum Alignment</h2>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Unlike standard CRUD web projects, AgriLink deliberately weaves together 5 fundamental advanced Python concepts to demonstrate engineering depth:
          </p>
          <ul className="space-y-2 text-xs text-emerald-200">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span><strong>Functional Programming:</strong> Declarative map/filter/lambda pipeline</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span><strong>Socket Programming:</strong> Multi-threaded TCP live notification engine</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span><strong>Multiprocessing:</strong> Parallel non-blocking analytical pool</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span><strong>SymPy:</strong> Symbolic price curve equilibrium equations</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span><strong>Tkinter:</strong> Standalone native desktop management GUI</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={onOpenArchitecture}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Inspect Full Code & Architecture</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
