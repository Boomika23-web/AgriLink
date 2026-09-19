import React, { useState } from 'react';
import { Users, X, Check, Layers, PlusCircle, ArrowRight } from 'lucide-react';
import { FarmerGroupBatch } from '../types';

interface FarmerGroupModalProps {
  groups: FarmerGroupBatch[];
  isOpen: boolean;
  onClose: () => void;
  onJoinGroup: (groupId: string | number, contribution: number) => void;
}

export const FarmerGroupModal: React.FC<FarmerGroupModalProps> = ({
  groups,
  isOpen,
  onClose,
  onJoinGroup
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | number>(groups[0]?.id || 1);
  const [myContribution, setMyContribution] = useState<number>(10);
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];

  const handleJoin = () => {
    onJoinGroup(selectedGroupId, myContribution);
    setJoinedSuccess(true);
    setTimeout(() => {
      setJoinedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-purple-100 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-purple-700 uppercase bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Co-operative Collective
              </span>
              <h3 className="text-lg font-bold text-zinc-900 mt-0.5">
                Farmer Group Selling
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

        <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
          Allows multiple nearby farmers to combine fractional harvests to fulfill high-volume institutional and bulk consumer orders that no single smallholder could supply alone.
        </p>

        {/* Example Banner matching college prompt */}
        <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-3.5 mb-5 text-xs text-purple-900">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-purple-950">
            <Layers className="w-3.5 h-3.5" />
            <span>Example Batch Pooling Architecture:</span>
          </div>
          <div className="font-mono text-[11px] grid grid-cols-4 gap-2 bg-white/70 p-2 rounded-xl border border-purple-100 text-center">
            <div>Farmer A: <strong>20 kg</strong></div>
            <div>Farmer B: <strong>15 kg</strong></div>
            <div>Farmer C: <strong>25 kg</strong></div>
            <div className="text-purple-700 font-bold bg-purple-100 rounded-lg">Combined = 60 kg</div>
          </div>
        </div>

        {/* Group Selector */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-zinc-700 mb-1.5">
            Select Active Collective Batch:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {groups.map((grp) => (
              <button
                key={grp.id}
                onClick={() => setSelectedGroupId(grp.id)}
                className={`text-left p-3 rounded-xl border transition cursor-pointer ${
                  selectedGroupId === grp.id
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-400/20'
                    : 'border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-bold text-zinc-900 mb-1">
                  <span>{grp.targetCrop}</span>
                  <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded-full ${
                    grp.status === 'fulfilled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {grp.status}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  Target: {grp.targetQuantity} {grp.unit} (Pooled: {grp.currentPooledQuantity} {grp.unit})
                </div>
                {/* Progress bar */}
                <div className="w-full bg-zinc-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (grp.currentPooledQuantity / grp.targetQuantity) * 100)}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Members in selected group */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-zinc-700 mb-2">
            Participating Farmers in {currentGroup?.groupName}:
          </h4>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {currentGroup?.members.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs bg-zinc-50 border border-zinc-100 px-3 py-2 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-800">{m.farmerName}</span>
                    <span className="text-zinc-400 text-[10px] ml-1.5">({m.location})</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-purple-900">
                  +{m.contribution} {currentGroup.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contribute Section */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5 mb-5 flex items-center justify-between gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-800">
              Contribute Available Produce:
            </label>
            <span className="text-[11px] text-zinc-500">
              Enter quantity you can supply ({currentGroup?.unit})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="50"
              value={myContribution}
              onChange={(e) => setMyContribution(Math.max(1, Number(e.target.value)))}
              className="w-20 px-3 py-1.5 text-center text-sm font-bold bg-white border border-zinc-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
            />
            <span className="text-xs font-semibold text-zinc-700">{currentGroup?.unit}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            disabled={joinedSuccess}
            className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {joinedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Collective!</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Contribute to Collective</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
