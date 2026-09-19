import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ProductDetailsModal } from './pages/ProductDetailsModal';
import { AddProductModal } from './pages/AddProductModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { FairPricePage } from './pages/FairPricePage';
import { SmartMatchingPage } from './pages/SmartMatchingPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { ConsumerDashboard } from './pages/ConsumerDashboard';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';

// Data & Types
import { Product, Order, CartItem, UserRole, Language, UnsoldProductAlert, FarmerGroupBatch } from './types';
import {
  initialMockProducts,
  initialMockOrders,
  initialUnsoldAlerts,
  initialFarmerGroups
} from './data/mockData';
import { socketSimulator } from './utils/socketSimulator';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('consumer');
  const [language, setLanguage] = useState<Language>('en');

  // Core Data Collections
  const [products, setProducts] = useState<Product[]>(initialMockProducts);
  const [orders, setOrders] = useState<Order[]>(initialMockOrders);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [unsoldAlerts, setUnsoldAlerts] = useState<UnsoldProductAlert[]>(initialUnsoldAlerts);
  const [farmerGroups, setFarmerGroups] = useState<FarmerGroupBatch[]>(initialFarmerGroups);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fairPriceDemoProduct, setFairPriceDemoProduct] = useState<Product | null>(null);
  const [addProductModalOpen, setAddProductModalOpen] = useState<boolean>(false);
  const [architectureModalOpen, setArchitectureModalOpen] = useState<boolean>(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | number | undefined>(undefined);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    // Small socket notification alert
    socketSimulator.emitNotification(
      'cart_updated',
      `Added ${quantity} ${product.unit} of ${product.name} to your agricultural basket.`,
      'consumer'
    );
  };

  const handleUpdateCartQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string | number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckoutSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setActiveTrackingOrderId(newOrder.id);
    setCurrentTab('orders');

    // Emit live socket event
    socketSimulator.emitNotification(
      'order_placed',
      `New order #${newOrder.orderNumber} placed for ${newOrder.items[0]?.productName || 'produce'} (Total: ₹${newOrder.grandTotal})`,
      'all',
      newOrder.orderNumber
    );
  };

  const handleUpdateOrderStatus = (orderId: string | number, nextStatus: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const prevTimeline = ord.timeline || [
            { status: ord.status, timestamp: ord.placedAt || 'Earlier', note: 'Initial status' }
          ];
          const updatedTimeline = [
            ...prevTimeline,
            { status: nextStatus as any, timestamp: 'Just now', note: `Status updated to ${nextStatus}` }
          ];
          return {
            ...ord,
            status: nextStatus as any,
            timeline: updatedTimeline
          };
        }
        return ord;
      })
    );

    // Broadcast socket notification
    socketSimulator.emitNotification(
      'status_advanced',
      `Order #${orderId} status progressed to "${nextStatus}".`,
      'all',
      String(orderId)
    );
  };

  const handleAddNewProduct = (newProductData: Omit<Product, 'id'>) => {
    const newId = Date.now();
    const newProduct: Product = {
      id: newId,
      ...newProductData
    };
    setProducts((prev) => [newProduct, ...prev]);

    socketSimulator.emitNotification(
      'new_harvest_listed',
      `Farmer Ramesh Kumar listed fresh ${newProduct.name} (₹${newProduct.pricePerUnit}/${newProduct.unit})`,
      'all'
    );
  };

  const handleAdjustProductPrice = (productId: number, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, pricePerUnit: newPrice } : p))
    );

    // Also update unsold alert if matches
    const updatedProd = products.find((p) => p.id === productId);
    if (updatedProd) {
      setUnsoldAlerts((prev) => prev.filter((a) => a.productName !== updatedProd.name));
    }

    socketSimulator.emitNotification(
      'price_adjusted',
      `Dynamic price adjusted to ₹${newPrice} to stimulate consumer clearance.`,
      'all'
    );
  };

  const handleJoinGroupBatch = (groupId: string | number, contribution: number) => {
    setFarmerGroups((prev) =>
      prev.map((grp) => {
        if (grp.id === groupId) {
          const newPooled = grp.currentPooledQuantity + contribution;
          return {
            ...grp,
            currentPooledQuantity: newPooled,
            status: newPooled >= grp.targetQuantity ? 'fulfilled' : 'open',
            members: [
              ...grp.members,
              { farmerId: 1, farmerName: 'Ramesh Kumar', contribution, location: 'Madurai' }
            ]
          };
        }
        return grp;
      })
    );

    socketSimulator.emitNotification(
      'group_batch_pooled',
      `Farmer Ramesh added +${contribution}kg to group selling collective!`,
      'all'
    );
  };

  const handleOpenFairPriceForProduct = (product: Product) => {
    setFairPriceDemoProduct(product);
    setCurrentTab('fair-price');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-zinc-900 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Real-Time Socket Toast Alerts */}
      <NotificationToast
        onSelectOrder={(orderId) => {
          setActiveTrackingOrderId(orderId);
          setCurrentTab('orders');
        }}
      />

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        language={language}
        setLanguage={setLanguage}
        cartCount={totalCartCount}
        openCart={() => setCurrentTab('cart')}
        openArchitecture={() => setArchitectureModalOpen(true)}
        socketConnected={true}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            products={products}
            language={language}
            onExplore={() => setCurrentTab('products')}
            onJoinFarmer={() => {
              setUserRole('farmer');
              setCurrentTab('farmer-dash');
            }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'products' && (
          <ProductsPage
            products={products}
            language={language}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onOpenFairPriceDemo={(p) => handleOpenFairPriceForProduct(p)}
          />
        )}

        {currentTab === 'fair-price' && (
          <FairPricePage
            initialProduct={fairPriceDemoProduct}
            onOpenArchitecture={() => setArchitectureModalOpen(true)}
          />
        )}

        {currentTab === 'smart-match' && (
          <SmartMatchingPage
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onOpenArchitecture={() => setArchitectureModalOpen(true)}
          />
        )}

        {currentTab === 'farmer-dash' && (
          <FarmerDashboard
            products={products}
            orders={orders}
            unsoldAlerts={unsoldAlerts}
            farmerGroups={farmerGroups}
            onOpenAddProduct={() => setAddProductModalOpen(true)}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAdjustProductPrice={handleAdjustProductPrice}
            onJoinGroupBatch={handleJoinGroupBatch}
          />
        )}

        {currentTab === 'consumer-dash' && (
          <ConsumerDashboard
            products={products}
            orders={orders}
            language={language}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onOpenCart={() => setCurrentTab('cart')}
            onOpenOrders={() => setCurrentTab('orders')}
            onOpenSmartMatch={() => setCurrentTab('smart-match')}
            onOpenFairPrice={(p) => handleOpenFairPriceForProduct(p)}
          />
        )}

        {currentTab === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onCheckoutSuccess={handleCheckoutSuccess}
            onContinueShopping={() => setCurrentTab('products')}
          />
        )}

        {currentTab === 'orders' && (
          <OrdersPage
            orders={orders}
            selectedOrderId={activeTrackingOrderId}
            onUpdateStatus={handleUpdateOrderStatus}
            onContinueShopping={() => setCurrentTab('products')}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            products={products}
            orders={orders}
            unsoldAlerts={unsoldAlerts}
            onOpenArchitecture={() => setArchitectureModalOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            language={language}
            onOpenArchitecture={() => setArchitectureModalOpen(true)}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'login' && (
          <LoginPage
            onSelectRole={(role) => {
              setUserRole(role);
              if (role === 'farmer') setCurrentTab('farmer-dash');
              else if (role === 'consumer') setCurrentTab('consumer-dash');
              else if (role === 'admin') setCurrentTab('admin');
            }}
          />
        )}
      </main>

      {/* Global Modals */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onOpenFairPriceDemo={(p) => handleOpenFairPriceForProduct(p)}
      />

      <AddProductModal
        isOpen={addProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
        onAddProduct={handleAddNewProduct}
      />

      <ArchitectureModal
        isOpen={architectureModalOpen}
        onClose={() => setArchitectureModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        language={language}
        onOpenArchitecture={() => setArchitectureModalOpen(true)}
        onNavigate={(tab) => setCurrentTab(tab)}
      />
    </div>
  );
}
