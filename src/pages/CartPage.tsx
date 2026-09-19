import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  CreditCard,
  Banknote,
  Sparkles
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string | number, quantity: number) => void;
  onRemoveItem: (productId: string | number) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (order: Order) => void;
  onContinueShopping: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
  onContinueShopping
}) => {
  const [consumerName, setConsumerName] = useState('Priya Sundaram');
  const [address, setAddress] = useState('Flat 4B, Green Meadows, 2nd Cross, Anna Nagar, Chennai');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Cash on Delivery' | 'Card'>('UPI');
  const [deliverySlot, setDeliverySlot] = useState<string>('Today Evening (5:00 PM – 7:30 PM)');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.pricePerUnit * item.quantity, 0);
  const deliveryFee = subtotal > 150 ? 0 : 25;
  const directFarmerShare = Math.round(subtotal * 0.95);
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `AGRI-${Math.floor(1000 + Math.random() * 9000)}`,
        orderNumber: `AGRI-${Math.floor(1000 + Math.random() * 9000)}`,
        consumerId: 101,
        consumerName,
        consumerAddress: address,
        deliveryAddress: address,
        farmerName: cart[0]?.product.farmerName || 'Local Farmer Collective',
        items: cart.map((c) => ({
          productId: c.product.id,
          productName: c.product.name,
          quantity: c.quantity,
          unit: c.product.unit,
          unitPrice: c.product.pricePerUnit,
          subtotal: c.product.pricePerUnit * c.quantity,
          pricePerUnit: c.product.pricePerUnit,
          totalPrice: c.product.pricePerUnit * c.quantity,
          farmerName: c.product.farmerName
        })),
        grandTotal,
        subtotal,
        deliveryFee,
        status: 'Placed',
        paymentMethod,
        orderDate: 'Today, Just now',
        estimatedDelivery: deliverySlot,
        timeline: [
          { status: 'Placed', timestamp: 'Just now', note: 'Order placed by consumer' }
        ]
      };

      setIsProcessing(false);
      onCheckoutSuccess(newOrder);
    }, 700);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Your Agricultural Basket is Empty</h2>
        <p className="text-xs text-zinc-500 max-w-md mx-auto">
          Discover early morning harvests directly from nearby verified smallholder farms with transparent fair pricing.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Explore Fresh Produce</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Your Fresh Farm Basket</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Review fresh batches directly sourced from local farms.
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs text-zinc-400 hover:text-red-600 transition cursor-pointer"
        >
          Clear Basket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-zinc-200 p-4 flex items-center justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-zinc-100"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-zinc-900 truncate">{product.name}</h3>
                  <div className="text-[11px] text-zinc-500">
                    Farmer: {product.farmerName} • {product.farmerLocation || product.location || 'Local Farm'}
                  </div>
                  <div className="text-xs font-black text-emerald-950 mt-1">
                    ₹{product.pricePerUnit} /{product.unit}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 overflow-hidden">
                  <button
                    onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                    className="p-1.5 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 text-xs font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                    className="p-1.5 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-16">
                  <span className="text-sm font-black text-zinc-900 block">
                    ₹{product.pricePerUnit * quantity}
                  </span>
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="text-[11px] text-zinc-400 hover:text-red-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Farmer Protection Note */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Fair Price & Direct Farmer Payout Guarantee:</span>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                ₹{directFarmerShare} of this order goes directly to the smallholder farmer within 24 hours of fulfillment. No wholesale middleman discounts.
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Simulation Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200 p-6 shadow-2xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 pb-3 border-b border-zinc-100">
            Delivery & Simulated Checkout
          </h2>

          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                required
                value={consumerName}
                onChange={(e) => setConsumerName(e.target.value)}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Direct Delivery Address
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Preferred Harvest Delivery Window
              </label>
              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Today Evening (5:00 PM – 7:30 PM)">Today Evening (5:00 PM – 7:30 PM)</option>
                <option value="Tomorrow Morning (6:30 AM – 9:00 AM)">Tomorrow Morning (6:30 AM – 9:00 AM)</option>
                <option value="Direct Farm Gate Self-Pickup">Direct Farm Gate Self-Pickup</option>
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Payment Option
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                    paymentMethod === 'UPI'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Instant UPI
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Pay on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                    paymentMethod === 'Card'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Card / Netbank
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="pt-3 border-t border-zinc-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Produce Subtotal</span>
                <span className="font-semibold text-zinc-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Local Eco-Transit</span>
                <span className="font-semibold text-emerald-700">
                  {deliveryFee === 0 ? 'FREE (Orders > ₹150)' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-emerald-950 pt-2 border-t border-zinc-100">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Broadcasting to Socket Server...</span>
              ) : (
                <>
                  <span>Place Direct Order (₹{grandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
