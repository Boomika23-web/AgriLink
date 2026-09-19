import React, { useState } from 'react';
import {
  Sprout,
  ShoppingCart,
  Radio,
  Globe,
  User,
  ShieldAlert,
  ChevronDown,
  Menu,
  X,
  Code2,
  Sparkles
} from 'lucide-react';
import { UserRole, Language } from '../types';
import { translations, getTranslation } from '../data/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  cartCount: number;
  openCart: () => void;
  openArchitecture: () => void;
  socketConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  language,
  setLanguage,
  cartCount,
  openCart,
  openArchitecture,
  socketConnected = true
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Notification / Socket Pulse Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-medium tracking-wide">
            {socketConnected ? t('socketOnline') : 'Connecting to Socket Server...'} (Port 65432)
          </span>
          <span className="hidden sm:inline text-emerald-400 font-mono text-[11px]">| Python 3.10 + SymPy Engine Active</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="nav-arch-btn"
            onClick={openArchitecture}
            className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-200 hover:text-white px-2.5 py-0.5 rounded-full text-xs font-medium transition cursor-pointer"
            title="Inspect Python APP Architecture (SymPy, Sockets, Multiprocessing, Functional, Tkinter)"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Python APP Architecture</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-emerald-800/80 px-2 py-0.5 rounded-md text-[11px]">
            <Globe className="w-3 h-3 text-emerald-300" />
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="hover:text-white font-semibold cursor-pointer underline-offset-2 hover:underline"
            >
              {language === 'en' ? 'தமிழ் (TA)' : 'English (EN)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-emerald-950 block leading-tight">
                  {t('brandName')}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 block">
                  Smart D2C Agri Market
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-link-home"
              onClick={() => handleTabClick('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-zinc-600 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
            >
              {t('navHome')}
            </button>

            <button
              id="nav-link-products"
              onClick={() => handleTabClick('products')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'products'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-zinc-600 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
            >
              {t('navProducts')}
            </button>

            <button
              id="nav-link-fair-price"
              onClick={() => handleTabClick('fair-price')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'fair-price'
                  ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200/60'
                  : 'text-zinc-600 hover:text-amber-800 hover:bg-amber-50/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {t('navFairPrice')}
            </button>

            <button
              id="nav-link-smart-match"
              onClick={() => handleTabClick('smart-match')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'smart-match'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-zinc-600 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
            >
              {t('navSmartMatch')}
            </button>

            <button
              id="nav-link-farmer-dash"
              onClick={() => handleTabClick('farmer-dash')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'farmer-dash'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-zinc-600 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
            >
              {t('navFarmerDash')}
            </button>

            <button
              id="nav-link-consumer-dash"
              onClick={() => handleTabClick('consumer-dash')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'consumer-dash'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-zinc-600 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
            >
              {t('navConsumerDash')}
            </button>

            <button
              id="nav-link-orders"
              onClick={() => handleTabClick('orders')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'orders'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-zinc-600 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
            >
              {t('navOrders')}
            </button>

            <button
              id="nav-link-admin"
              onClick={() => handleTabClick('admin')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-purple-50 text-purple-900 font-semibold'
                  : 'text-zinc-600 hover:text-purple-800 hover:bg-purple-50/50'
              }`}
            >
              {t('navAdmin')}
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleTabClick('about')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-zinc-600 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
            >
              {t('navAbout')}
            </button>
          </nav>

          {/* Right Action Controls: Cart & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={openCart}
              className="relative p-2 text-zinc-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Role Dropdown */}
            <div className="relative">
              <button
                id="role-selector-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span className="capitalize">{userRole}</span>
                <ChevronDown className="w-3 h-3 text-emerald-600" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-emerald-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100">
                    Switch Active Role
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('consumer');
                      setRoleDropdownOpen(false);
                      setCurrentTab('consumer-dash');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                      userRole === 'consumer' ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-zinc-700'
                    }`}
                  >
                    <span>Consumer (Priya S.)</span>
                    {userRole === 'consumer' && <span className="text-emerald-600">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('farmer');
                      setRoleDropdownOpen(false);
                      setCurrentTab('farmer-dash');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                      userRole === 'farmer' ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-zinc-700'
                    }`}
                  >
                    <span>Farmer (Ramesh K.)</span>
                    {userRole === 'farmer' && <span className="text-emerald-600">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setRoleDropdownOpen(false);
                      setCurrentTab('admin');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-purple-50 cursor-pointer ${
                      userRole === 'admin' ? 'font-bold text-purple-800 bg-purple-50/50' : 'text-zinc-700'
                    }`}
                  >
                    <span>Admin Console</span>
                    {userRole === 'admin' && <span className="text-purple-600">✓</span>}
                  </button>
                  <div className="border-t border-zinc-100 my-1"></div>
                  <button
                    onClick={() => {
                      setUserRole('guest');
                      setRoleDropdownOpen(false);
                      setCurrentTab('login');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                  >
                    Role Login Portal
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-600 hover:text-emerald-800 lg:hidden rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <button
            onClick={() => handleTabClick('home')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:bg-emerald-50"
          >
            {t('navHome')}
          </button>
          <button
            onClick={() => handleTabClick('products')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:bg-emerald-50"
          >
            {t('navProducts')}
          </button>
          <button
            onClick={() => handleTabClick('fair-price')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-amber-800 hover:bg-amber-50 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            {t('navFairPrice')}
          </button>
          <button
            onClick={() => handleTabClick('smart-match')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:bg-emerald-50"
          >
            {t('navSmartMatch')}
          </button>
          <button
            onClick={() => handleTabClick('farmer-dash')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:bg-emerald-50"
          >
            {t('navFarmerDash')}
          </button>
          <button
            onClick={() => handleTabClick('consumer-dash')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:bg-emerald-50"
          >
            {t('navConsumerDash')}
          </button>
          <button
            onClick={() => handleTabClick('orders')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:bg-emerald-50"
          >
            {t('navOrders')}
          </button>
          <button
            onClick={() => handleTabClick('admin')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-50"
          >
            {t('navAdmin')}
          </button>
          <button
            onClick={() => handleTabClick('about')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:bg-emerald-50"
          >
            {t('navAbout')}
          </button>
          <div className="pt-2 border-t border-zinc-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openArchitecture();
              }}
              className="w-full py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Code2 className="w-4 h-4 text-amber-300" />
              Python APP Architecture
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
