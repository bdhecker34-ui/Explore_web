import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Briefcase, User, Wallet, History, Globe, Menu, X, Shirt, Sparkles, Share2, Smartphone } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const {
    mode,
    setMode,
    requestSwitchMode,
    b2bUser,
    language,
    setLanguage,
    walletBalance,
    cart,
    setIsCartOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePageClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Zone 1: Brand Wordmark (Goes to Home Page) */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => handlePageClick('home')}
              className="text-left group flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-base sm:text-lg tracking-wider shadow-sm shadow-indigo-500/20 shrink-0">
                E
              </div>
              <div className="truncate">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                  Explore
                </span>
                <span className="hidden md:block text-[9px] text-slate-400 font-medium -mt-1 tracking-wider uppercase">
                  {language === 'bn' ? 'মার্কেট ও রিসেলার হাব' : 'Commerce & Reseller Hub'}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links (Hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-semibold text-slate-300">
            <button
              onClick={() => handlePageClick('home')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white px-2 py-1 rounded-md ${
                currentPage === 'home' ? 'text-indigo-400 font-bold bg-slate-900' : 'text-slate-300'
              }`}
            >
              {language === 'bn' ? 'হোম' : 'Home'}
            </button>
            <button
              onClick={() => handlePageClick('fashion-tech')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white px-2 py-1 rounded-md ${
                currentPage === 'fashion-tech' ? 'text-indigo-400 font-bold bg-slate-900' : 'text-slate-300'
              }`}
            >
              {language === 'bn' ? 'ফ্যাশন ও টেক' : 'Fashion & Tech'}
            </button>
            <button
              onClick={() => handlePageClick('digital-subscriptions')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white px-2 py-1 rounded-md ${
                currentPage === 'digital-subscriptions' ? 'text-violet-400 font-bold bg-slate-900' : 'text-slate-300'
              }`}
            >
              {language === 'bn' ? 'ডিজিটাল ও এআই' : 'Digital & AI'}
            </button>
            <button
              onClick={() => handlePageClick('smm-panel')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white px-2 py-1 rounded-md ${
                currentPage === 'smm-panel' ? 'text-sky-400 font-bold bg-slate-900' : 'text-slate-300'
              }`}
            >
              {language === 'bn' ? 'এসএমএম প্যানেল' : 'SMM Panel'}
            </button>
            <button
              onClick={() => handlePageClick('mobile-recharge')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white px-2 py-1 rounded-md ${
                currentPage === 'mobile-recharge' ? 'text-emerald-400 font-bold bg-slate-900' : 'text-slate-300'
              }`}
            >
              {language === 'bn' ? 'মোবাইল রিচার্জ' : 'Mobile Recharge'}
            </button>
          </nav>

          {/* Zone 3: Controls (Carefully sized to NEVER overflow even on 320px mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Desktop Mode Switcher */}
            <div className="hidden sm:flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => requestSwitchMode('customer')}
                className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  mode === 'customer'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="নিজের কেনাকাটার জন্য ক্রেতা মোড"
              >
                <User className="w-3 h-3" />
                <span>{language === 'bn' ? 'ক্রেতা' : 'Retail'}</span>
              </button>
              <button
                onClick={() => requestSwitchMode('reseller')}
                className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  mode === 'reseller'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm font-bold'
                    : 'text-amber-400/90 hover:text-amber-300'
                }`}
                title={b2bUser ? 'ব্যবসা করার জন্য রিসেলার মোড' : 'Google দিয়ে B2B একাউন্ট খুলুন'}
              >
                <Briefcase className="w-3 h-3" />
                <span>{language === 'bn' ? (b2bUser ? 'রিসেলার' : 'B2B একাউন্ট') : 'B2B'}</span>
              </button>
            </div>

            {/* Mobile Compact Mode Toggle Icon */}
            <div className="sm:hidden flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => requestSwitchMode(mode === 'customer' ? 'reseller' : 'customer')}
                className={`p-1.5 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                  mode === 'reseller'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200'
                }`}
                title={mode === 'reseller' ? 'রিসেলার মোড সক্রিয়' : (b2bUser ? 'ক্রেতা মোড সক্রিয়' : 'Google দিয়ে B2B খুলুন')}
              >
                {mode === 'reseller' ? (
                  <>
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="text-[10px]">B2B</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5" />
                    <span className="text-[10px]">খুচরা</span>
                  </>
                )}
              </button>
            </div>

            {/* Reseller Wallet Button (Desktop) */}
            {mode === 'reseller' && (
              <button
                onClick={() => handlePageClick('reseller')}
                className={`hidden md:flex items-center gap-1 px-2 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer border ${
                  currentPage === 'reseller'
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                    : 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60 hover:bg-emerald-900/40'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span className="tabular-nums font-semibold">৳{walletBalance.toLocaleString('en-IN')}</span>
              </button>
            )}

            {/* Order History (Desktop) */}
            <button
              onClick={() => handlePageClick('orders')}
              className={`hidden sm:flex p-2 rounded-lg transition-colors cursor-pointer relative ${
                currentPage === 'orders' ? 'text-indigo-400 bg-slate-900' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
              title="অর্ডার হিস্ট্রি ও ট্র্যাকিং"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Language Switcher - Fixed compact width so it never causes layout shift */}
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="w-11 h-8 sm:h-8 text-[11px] font-bold text-slate-200 hover:text-white rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer shrink-0"
              title="ভাষা পরিবর্তন (Bangla / English)"
              aria-label="Language Switcher"
            >
              <span>{language === 'bn' ? 'বাং' : 'EN'}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-sm shadow-indigo-600/30 shrink-0"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center tabular-nums ring-1 ring-slate-950">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer shrink-0"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-400" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Fullscreen Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/98 px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Mode Switch Card in Mobile Drawer */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  {mode === 'reseller' ? (b2bUser ? `${b2bUser.shopName} (B2B)` : 'রিসেলার মোড (B2B)') : 'সাধারণ ক্রেতা মোড'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {mode === 'reseller' ? 'পাইকারি রেট ও হোলসেল সুবিধা সক্রিয়' : 'খুচরা মূল্যে কেনাকাটা'}
                </span>
              </div>
              <button
                onClick={() => {
                  requestSwitchMode(mode === 'customer' ? 'reseller' : 'customer');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'reseller'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {mode === 'reseller' ? 'ক্রেতা মোডে যান' : (b2bUser ? 'রিসেলার মোড অন' : 'Google দিয়ে B2B একাউন্ট')}
              </button>
            </div>

            {/* Reseller Wallet pill if in reseller mode */}
            {mode === 'reseller' && (
              <div
                onClick={() => handlePageClick('reseller')}
                className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Wallet className="w-4 h-4 text-amber-400" />
                  <span>রিসেলার ওয়ালেট ব্যালেন্স:</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  ৳{walletBalance.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {/* Category Page Links */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-1">
                {language === 'bn' ? 'ক্যাটাগরি পেজ সমূহ' : 'Category Pages'}
              </span>

              <button
                onClick={() => handlePageClick('home')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentPage === 'home' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{language === 'bn' ? 'হোম পেজ' : 'Home'}</span>
                <span className="text-slate-500 text-[10px]">সকল ক্যাটাগরি</span>
              </button>

              <button
                onClick={() => handlePageClick('fashion-tech')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentPage === 'fashion-tech' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-indigo-400" />
                  <span>{language === 'bn' ? '১. ফ্যাশন ও টেক গ্যাজেটস' : '1. Fashion & Tech'}</span>
                </div>
                <span className="text-slate-500 text-[10px]">হুডি, টিডব্লিউএস</span>
              </button>

              <button
                onClick={() => handlePageClick('digital-subscriptions')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentPage === 'digital-subscriptions' ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>{language === 'bn' ? '২. ডিজিটাল ও এআই সাবস্ক্রিপশন' : '2. Digital & AI Subscriptions'}</span>
                </div>
                <span className="text-slate-500 text-[10px]">ChatGPT, Canva</span>
              </button>

              <button
                onClick={() => handlePageClick('smm-panel')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentPage === 'smm-panel' ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-sky-400" />
                  <span>{language === 'bn' ? '৩. এস এম এম প্যানেল টার্মিনাল' : '3. SMM Growth Terminal'}</span>
                </div>
                <span className="text-slate-500 text-[10px]">FB, YT, IG, TT</span>
              </button>

              <button
                onClick={() => handlePageClick('mobile-recharge')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentPage === 'mobile-recharge' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? '৪. মোবাইল রিচার্জ ও ড্রাইভ প্যাক' : '4. Mobile Recharge & Drives'}</span>
                </div>
                <span className="text-slate-500 text-[10px]">অটো রিচার্জ</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <button
                onClick={() => handlePageClick('reseller')}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-amber-400 hover:bg-slate-900 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>{language === 'bn' ? 'রিসেলার ড্যাশবোর্ড ও ওয়ালেট' : 'Reseller Dashboard'}</span>
              </button>

              <button
                onClick={() => handlePageClick('orders')}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-900 flex items-center gap-2"
              >
                <History className="w-4 h-4" />
                <span>{language === 'bn' ? 'অর্ডার হিস্ট্রি ও ট্র্যাকিং' : 'Order History & Tracking'}</span>
              </button>
            </div>

          </div>
        )}
      </header>
    </>
  );
};
