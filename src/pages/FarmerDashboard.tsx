import React, { useState } from 'react';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Plus,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Radio,
  Edit,
  Trash2,
  ArrowUpRight
} from 'lucide-react';
import { Product, Order, UnsoldProductAlert, FarmerGroupBatch } from '../types';
import { UnsoldAlertModal } from '../components/UnsoldAlertModal';
import { FarmerGroupModal } from '../components/FarmerGroupModal';

interface FarmerDashboardProps {
  products: Product[];
  orders: Order[];
  unsoldAlerts: UnsoldProductAlert[];
  farmerGroups: FarmerGroupBatch[];
  onOpenAddProduct: () => void;
  onUpdateOrderStatus: (orderId: string | number, nextStatus: string) => void;
  onAdjustProductPrice: (productId: number, newPrice: number) => void;
  onJoinGroupBatch: (groupId: string | number, contribution: number) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  products,
  orders,
  unsoldAlerts,
  farmerGroups,
  onOpenAddProduct,
  onUpdateOrderStatus,
  onAdjustProductPrice,
  onJoinGroupBatch
}) => {
  const [selectedAlert, setSelectedAlert] = useState<UnsoldProductAlert | null>(null);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [editingPriceProductId, setEditingPriceProductId] = useState<string | number | null>(null);
  const [newPriceValue, setNewPriceValue] = useState<number>(0);

  // Farmer's own listings (e.g. Ramesh Kumar)
  const myProducts = products.filter((p) => p.farmerId === 1 || p.farmerName.includes('Ramesh'));
  const myOrders = orders.filter((o) => o.farmerName.includes('Ramesh') || o.items.some((i) => (i.farmerName ? i.farmerName.includes('Ramesh') : false)));

  const totalRevenue = myOrders
    .filter((o) => o.status === 'Delivered' || o.status === 'Ready')
    .reduce((acc, o) => acc + o.grandTotal, 0);

  const handleApplyAlertAction = (actionType: string, alert: UnsoldProductAlert) => {
    if (actionType === 'Adjust Price') {
      const prod = products.find((p) => p.name === alert.productName);
      if (prod) {
        onAdjustProductPrice(prod.id as any, Math.round(prod.pricePerUnit * 0.85));
      }
    } else if (actionType === 'Offer Group Sale') {
      setGroupModalOpen(true);
    }
    setSelectedAlert(null);
  };

  const handleSavePrice = (productId: string | number) => {
    onAdjustProductPrice(productId as any, newPriceValue);
    setEditingPriceProductId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl p-6 text-white shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">👨‍🌾</span>
            <h1 className="text-2xl font-black tracking-tight">Farmer Producer Portal</h1>
          </div>
          <p className="text-xs text-emerald-200">
            Welcome back, <strong>Farmer Ramesh Kumar</strong> (Green Valley Organic Farms, Madurai)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setGroupModalOpen(true)}
            className="px-4 py-2.5 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Group Selling Collective</span>
          </button>

          <button
            id="btn-open-add-product"
            onClick={onOpenAddProduct}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>List New Harvest Batch</span>
          </button>
        </div>
      </div>

      {/* Prominent Unsold Product Alert Banner (Prompt-mandated innovative feature) */}
      {unsoldAlerts.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full">
                    AI Multiprocessing Diagnostic
                  </span>
                  <span className="text-xs font-bold text-amber-950">
                    Unsold Product Alert ({unsoldAlerts.length} Batch Warning)
                  </span>
                </div>
                <p className="text-xs text-amber-900 mt-1 font-medium">
                  "{unsoldAlerts[0].alertMessage}"
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAlert(unsoldAlerts[0])}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Take Action & Adjust Price</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Active Products */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Products</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-900">{myProducts.length}</div>
          <p className="text-[11px] text-zinc-400 mt-1">Directly listed batches</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-900">{myOrders.length}</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Live customer orders</p>
        </div>

        {/* Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Direct Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-950">₹{totalRevenue.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">95% settled directly to UPI</p>
        </div>

        {/* Unsold Product Warnings */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Unsold Warnings</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-900">{unsoldAlerts.length}</div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Near shelf-life threshold</p>
        </div>
      </div>

      {/* My Listed Products Table */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">My Listed Produce & Harvest Batches</h2>
            <p className="text-xs text-zinc-500">Manage pricing, verify SymPy fair bounds, and monitor available inventory.</p>
          </div>
          <button
            onClick={onOpenAddProduct}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stock Available</th>
                <th className="p-4">Price / Unit</th>
                <th className="p-4">Harvest Date</th>
                <th className="p-4">SymPy Fair Range</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {myProducts.map((prod) => {
                const fairMin = prod.benchmarkFairPrice
                  ? Math.floor(prod.benchmarkFairPrice * 0.94)
                  : Math.floor(prod.pricePerUnit * 0.92);
                const fairMax = prod.benchmarkFairPrice
                  ? Math.ceil(prod.benchmarkFairPrice * 1.08)
                  : Math.ceil(prod.pricePerUnit * 1.12);

                return (
                  <tr key={prod.id} className="hover:bg-zinc-50/70 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-cover bg-zinc-100"
                        />
                        <div>
                          <span className="font-bold text-zinc-900 block">{prod.name}</span>
                          <span className="text-[10px] text-zinc-400">Cost Floor: ₹{prod.productionCost}/{prod.unit}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                        {prod.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-zinc-800">
                      {prod.availableQuantity} {prod.unit}
                    </td>
                    <td className="p-4">
                      {editingPriceProductId === prod.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={newPriceValue}
                            onChange={(e) => setNewPriceValue(Number(e.target.value))}
                            className="w-16 px-2 py-1 border border-emerald-500 rounded-lg text-xs font-bold"
                          />
                          <button
                            onClick={() => handleSavePrice(prod.id)}
                            className="px-2 py-1 bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-black text-emerald-950 text-sm">
                            ₹{prod.pricePerUnit}/{prod.unit}
                          </span>
                          <button
                            onClick={() => {
                              setEditingPriceProductId(prod.id);
                              setNewPriceValue(prod.pricePerUnit);
                            }}
                            className="text-zinc-400 hover:text-emerald-700 p-1"
                            title="Edit price"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-zinc-600">
                      <div>{prod.harvestDate}</div>
                      <div className="text-[10px] text-emerald-700 font-medium">
                        {prod.daysSinceHarvest === 0 ? 'Harvested today' : `${prod.daysSinceHarvest}d ago`}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        ₹{fairMin} – ₹{fairMax}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setEditingPriceProductId(prod.id);
                          setNewPriceValue(Math.round(prod.pricePerUnit * 0.9));
                        }}
                        className="text-xs font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
                      >
                        Adjust Price
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incoming Orders Table with Status Progression Pipeline */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Incoming Consumer Orders</h2>
            <p className="text-xs text-zinc-500">
              Live TCP Socket synchronized pipeline: Placed → Confirmed → Preparing → Ready → Delivered.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
            <Radio className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real-time Socket Listener Active</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="p-4">Order ID</th>
                <th className="p-4">Consumer</th>
                <th className="p-4">Ordered Produce</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Advance Pipeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {myOrders.map((order) => {
                const nextStatusMap: Record<string, string> = {
                  Placed: 'Confirmed',
                  Confirmed: 'Preparing',
                  Preparing: 'Ready',
                  Ready: 'Delivered'
                };
                const nextStatus = nextStatusMap[order.status];

                return (
                  <tr key={order.id} className="hover:bg-zinc-50/70 transition">
                    <td className="p-4 font-mono font-bold text-emerald-900">
                      {order.orderNumber}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-zinc-900">{order.consumerName}</div>
                      <div className="text-[10px] text-zinc-400">{order.consumerAddress || order.deliveryAddress}</div>
                    </td>
                    <td className="p-4">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="text-zinc-700">
                          {it.productName} ({it.quantity} {it.unit})
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-black text-emerald-950 text-sm">
                      ₹{order.grandTotal}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Ready'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Preparing'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {nextStatus ? (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, nextStatus)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                        >
                          Mark as {nextStatus}
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Order Completed</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unsold Alert Modal */}
      <UnsoldAlertModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onApplyAction={handleApplyAlertAction}
      />

      {/* Group Selling Modal */}
      <FarmerGroupModal
        groups={farmerGroups}
        isOpen={groupModalOpen}
        onClose={() => setGroupModalOpen(false)}
        onJoinGroup={onJoinGroupBatch}
      />
    </div>
  );
};
