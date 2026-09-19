import React, { useState } from 'react';
import {
  Monitor,
  Cpu,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  Play,
  CheckCircle2,
  Code2,
  RefreshCw,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Product, Order, UnsoldProductAlert } from '../types';
import { TkinterAdminPreview } from '../components/TkinterAdminPreview';
import {
  runMultiprocessingSimulation,
  MultiprocessingRunOutput
} from '../utils/multiprocessingSimulator';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  unsoldAlerts: UnsoldProductAlert[];
  onOpenArchitecture: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  unsoldAlerts,
  onOpenArchitecture
}) => {
  const [viewMode, setViewMode] = useState<'tkinter_preview' | 'web_analytics'>('tkinter_preview');
  const [isComputingMp, setIsComputingMp] = useState(false);
  const [mpOutput, setMpOutput] = useState<MultiprocessingRunOutput | null>(null);

  const handleTriggerMultiprocessing = async () => {
    setIsComputingMp(true);
    const output = await runMultiprocessingSimulation();
    setMpOutput(output);
    setIsComputingMp(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 text-xs font-bold px-3.5 py-1.5 rounded-full border border-purple-200">
            <Monitor className="w-4 h-4 text-purple-700" />
            <span>Python APP Requirement #5: Tkinter & Multiprocessing</span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight mt-2">
            System Administration & Analytical Engine
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1">
            Native Tkinter desktop console simulation with multi-core parallel analytics dispatcher.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
          <button
            onClick={() => setViewMode('tkinter_preview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'tkinter_preview'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Tkinter Desktop GUI Preview</span>
          </button>
          <button
            onClick={() => setViewMode('web_analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'web_analytics'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Multiprocessing Engine</span>
          </button>
        </div>
      </div>

      {/* Multiprocessing Dispatcher Card */}
      <div className="bg-gradient-to-r from-purple-950 via-zinc-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-purple-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">
                Python Multiprocessing Task Pool Dispatcher (`multiprocessing_tasks.py`)
              </h2>
            </div>
            <p className="text-xs text-purple-200/80">
              Spawns 4 concurrent CPU worker processes for non-blocking analysis: Demand Trends, Sales Ledgers, Product Velocity, and Unsold Produce Scans.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerMultiprocessing}
              disabled={isComputingMp}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className={`w-4 h-4 ${isComputingMp ? 'animate-spin' : ''}`} />
              <span>{isComputingMp ? 'Distributing across CPU cores...' : 'Dispatch Multiprocessing Batch'}</span>
            </button>
          </div>
        </div>

        {/* Results view */}
        {mpOutput && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {mpOutput.results.map((res, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-purple-500/30 rounded-2xl p-3.5 space-y-2 text-xs backdrop-blur-xs"
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-purple-300 font-bold">{res.taskName}</span>
                  <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded text-[10px]">
                    PID {res.workerPid}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {res.summary}
                </p>
                <div className="text-[10px] text-zinc-400 font-mono flex items-center justify-between border-t border-zinc-800 pt-1.5">
                  <span>Duration: {res.executionTimeSec}s</span>
                  <span className="text-emerald-400 font-semibold">Completed ✓</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main View Area */}
      {viewMode === 'tkinter_preview' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-700">
              Interactive Standalone Desktop Tkinter Window Preview:
            </span>
            <span className="text-zinc-400">
              Native GUI script located at <code className="text-zinc-600 font-mono">backend/admin_gui.py</code>
            </span>
          </div>
          <TkinterAdminPreview
            orders={orders}
            products={products}
            unsoldAlerts={unsoldAlerts}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs">
              <span className="text-xs font-bold text-zinc-500 uppercase">Verified Farmers</span>
              <div className="text-3xl font-black text-zinc-900 mt-1">42</div>
              <span className="text-[11px] text-emerald-700 font-medium">South India Network</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs">
              <span className="text-xs font-bold text-zinc-500 uppercase">Active Buyers</span>
              <div className="text-3xl font-black text-zinc-900 mt-1">186</div>
              <span className="text-[11px] text-zinc-400">Urban households</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs">
              <span className="text-xs font-bold text-zinc-500 uppercase">Gross Platform Sales</span>
              <div className="text-3xl font-black text-emerald-950 mt-1">₹1,44,600</div>
              <span className="text-[11px] text-emerald-700 font-medium">95% settled to farmers</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs">
              <span className="text-xs font-bold text-zinc-500 uppercase">Post-Harvest Waste Reduced</span>
              <div className="text-3xl font-black text-amber-900 mt-1">38%</div>
              <span className="text-[11px] text-zinc-400">via unsold alerts & groups</span>
            </div>
          </div>

          {/* Unsold Alerts Table */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Active Unsold Perishable Inventory Alerts</span>
              </h3>
              <span className="text-xs font-semibold text-zinc-400">
                Generated via `scan_unsold_product_risks()`
              </span>
            </div>

            <div className="space-y-3">
              {unsoldAlerts.map((alt) => (
                <div
                  key={alt.id}
                  className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900 text-sm">{alt.productName}</span>
                      <span className="font-mono text-zinc-500">({alt.currentQuantity})</span>
                      <span className="bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                        {alt.urgencyLevel} Urgency
                      </span>
                    </div>
                    <p className="text-zinc-600">{alt.alertMessage}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {alt.actionableSuggestions.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-zinc-200 px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-800"
                      >
                        {s.action}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
