import React, { useEffect, useState } from 'react';
import { Radio, X, Bell, ArrowUpRight } from 'lucide-react';
import { SocketNotification } from '../types';
import { socketSimulator } from '../utils/socketSimulator';

interface NotificationToastProps {
  onSelectOrder?: (orderId: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ onSelectOrder }) => {
  const [activeToast, setActiveToast] = useState<SocketNotification | null>(null);

  useEffect(() => {
    const unsubscribe = socketSimulator.subscribe((notif) => {
      setActiveToast(notif);
      // Auto dismiss after 6 seconds
      const timer = setTimeout(() => {
        setActiveToast((current) => (current?.id === notif.id ? null : current));
      }, 6000);
      return () => clearTimeout(timer);
    });

    return unsubscribe;
  }, []);

  if (!activeToast) return null;

  return (
    <div className="fixed top-18 right-4 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="bg-white border-2 border-emerald-500 rounded-2xl shadow-xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-emerald-600" />
              Socket Alert
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              {activeToast.timestamp}
            </span>
          </div>
          <p className="text-xs font-semibold text-zinc-900 leading-snug">
            {activeToast.message}
          </p>

          {activeToast.orderId && onSelectOrder && (
            <button
              onClick={() => {
                onSelectOrder(activeToast.orderId!);
                setActiveToast(null);
              }}
              className="mt-2 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View Order Progress</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>
        <button
          onClick={() => setActiveToast(null)}
          className="text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
