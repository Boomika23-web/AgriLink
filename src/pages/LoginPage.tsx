import React from 'react';
import { User, Sprout, ShoppingBag, ShieldAlert, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface LoginPageProps {
  onSelectRole: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSelectRole }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-center">
      <div className="space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <User className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">
          Select Your AgriLink Role
        </h1>
        <p className="text-xs text-zinc-500 max-w-md mx-auto">
          Experience AgriLink from the perspective of a Farmer Producer, Consumer Household, or System Administrator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Consumer Card */}
        <div
          onClick={() => onSelectRole('consumer')}
          className="bg-white rounded-3xl border-2 border-emerald-200 hover:border-emerald-600 p-6 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-700">
              Consumer Household
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Login as <strong>Priya Sundaram</strong>. Discover fresh produce from nearby farms, compare harvest freshness, run smart matching, and track orders.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Enter as Consumer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Farmer Card */}
        <div
          onClick={() => onSelectRole('farmer')}
          className="bg-white rounded-3xl border-2 border-amber-200 hover:border-amber-500 p-6 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-amber-700">
              Farmer Producer
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Login as <strong>Farmer Ramesh Kumar</strong>. List fresh harvest batches, view Unsold Product Alerts, test SymPy fair pricing, and join farmer group selling.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-amber-700">
            <span>Enter as Farmer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Admin Card */}
        <div
          onClick={() => onSelectRole('admin')}
          className="bg-white rounded-3xl border-2 border-purple-200 hover:border-purple-600 p-6 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-purple-700">
              System Admin
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Access the Tkinter desktop GUI preview, run Python Multiprocessing pool analytics, review active users, and check system health.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-purple-700">
            <span>Enter as Admin</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
