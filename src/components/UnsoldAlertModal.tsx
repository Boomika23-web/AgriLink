import React from 'react';
import { AlertTriangle, TrendingDown, Megaphone, Users, Check, X, ShieldAlert } from 'lucide-react';
import { UnsoldProductAlert } from '../types';

interface UnsoldAlertModalProps {
  alert: UnsoldProductAlert | null;
  onClose: () => void;
  onApplyAction: (actionType: string, alert: UnsoldProductAlert) => void;
}

export const UnsoldAlertModal: React.FC<UnsoldAlertModalProps> = ({
  alert,
  onClose,
  onApplyAction
}) => {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                AI & Multiprocessing Diagnostic
              </span>
              <h3 className="text-lg font-bold text-zinc-900 mt-0.5">
                Unsold Product Alert
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-xl hover:bg-zinc-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Alert Box */}
        <div className="bg-amber-50/90 border border-amber-300/80 rounded-2xl p-4 mb-5">
          <p className="text-sm font-semibold text-amber-950 leading-relaxed">
            "{alert.alertMessage}"
          </p>
          <div className="mt-2.5 flex items-center gap-3 text-xs text-amber-800">
            <span>Product: <strong className="text-amber-950">{alert.productName}</strong></span>
            <span>•</span>
            <span>Batch Volume: <strong className="text-amber-950">{alert.currentQuantity}</strong></span>
          </div>
        </div>

        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
          Recommended Interventions to Prevent Waste:
        </p>

        {/* Suggestion Options */}
        <div className="space-y-3 mb-6">
          {alert.actionableSuggestions.map((sug, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-zinc-200 hover:border-emerald-500 bg-zinc-50/60 hover:bg-emerald-50/30 transition flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {sug.action === 'Adjust Price' && <TrendingDown className="w-4 h-4 text-emerald-700" />}
                {sug.action === 'Promote Product' && <Megaphone className="w-4 h-4 text-amber-600" />}
                {sug.action === 'Offer Group Sale' && <Users className="w-4 h-4 text-purple-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-900">{sug.action}</h4>
                  <button
                    onClick={() => onApplyAction(sug.action, alert)}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-300 hover:border-emerald-600 px-2.5 py-1 rounded-lg transition shadow-2xs cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
                <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">
                  {sug.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded-xl cursor-pointer"
          >
            Dismiss
          </button>
          <button
            onClick={() => onApplyAction('Adjust Price', alert)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
          >
            Execute Dynamic Pricing
          </button>
        </div>
      </div>
    </div>
  );
};
