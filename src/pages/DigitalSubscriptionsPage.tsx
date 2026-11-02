import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, SUB_CATEGORIES } from '../data/mockData';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowLeft, Search, Zap, ShieldCheck, Mail, ArrowUpDown, Key } from 'lucide-react';

interface DigitalSubscriptionsPageProps {
  onBackToHome: () => void;
  onOpenQuickView: (product: Product) => void;
  initialSubCategory?: string;
}

export const DigitalSubscriptionsPage: React.FC<DigitalSubscriptionsPageProps> = ({
  onBackToHome,
  onOpenQuickView,
  initialSubCategory = 'all',
}) => {
  const { mode, language } = useApp();
  const [selectedSub, setSelectedSub] = useState<string>(initialSubCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const subCategories = SUB_CATEGORIES.filter(s => s.mainCategoryId === 'digital-subscriptions');
  const allDigitalProducts = PRODUCTS.filter(p => p.mainCategory === 'digital-subscriptions');

  const filteredProducts = useMemo(() => {
    let list = allDigitalProducts;

    if (selectedSub !== 'all') {
      list = list.filter(p => p.subCategory === selectedSub);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.nameBn.toLowerCase().includes(q) || 
        p.nameEn.toLowerCase().includes(q) ||
        p.descriptionBn.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      const priceA = mode === 'reseller' ? a.wholesalePrice : a.retailPrice;
      const priceB = mode === 'reseller' ? b.wholesalePrice : b.retailPrice;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [allDigitalProducts, selectedSub, searchQuery, sortBy, mode]);

  return (
    <div className="py-8 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
          </button>

          <div className="text-xs font-mono text-slate-400">
            {mode === 'reseller' ? (
              <span className="text-amber-400 font-semibold">{language === 'bn' ? 'ডিজিটাল রিসেলার হোলসেল প্রাইস' : 'Digital Reseller Tier'}</span>
            ) : (
              <span>{language === 'bn' ? 'ইনস্ট্যান্ট ভাউচার ডেলিভারি' : 'Instant 60s Voucher'}</span>
            )}
          </div>
        </div>

        {/* Hero Banner for Digital Products */}
        <div className="bg-gradient-to-r from-slate-900 via-violet-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-400">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'bn' ? 'ক্যাটাগরি পেজ ২' : 'Category Page 2'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'ডিজিটাল প্রোডাক্ট ও এআই সাবস্ক্রিপশন' : 'AI & Digital Subscriptions Hub'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === 'bn'
                ? 'ChatGPT Plus, Claude 3.7 Sonnet, Google Gemini Advanced 2.0, DeepSeek Pro, Canva Pro এবং Netflix 4K UHD। ১ মিনিটে ইনস্ট্যান্ট এক্টিভেশন ও ফুল মেয়াদ ওয়ারেন্টি।'
                : 'Verified AI tool subscriptions, Canva Pro team invites, and OTT entertainment with 60-second delivery.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 text-xs">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-violet-400" />
              <div>
                <span className="font-bold text-white block">১ মিনিটে অ্যাক্টিভ</span>
                <span className="text-[10px] text-slate-400">অটোমেটেড ডিজিটাল ডেলিভারি</span>
              </div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-white block">ফুল মেয়াদ সাপোর্ট</span>
                <span className="text-[10px] text-slate-400">১০০% রিপ্লেসমেন্ট গ্যারান্টি</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-category Filter Tabs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
            <button
              onClick={() => setSelectedSub('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedSub === 'all'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              {language === 'bn' ? 'সকল ডিজিটাল সার্ভিস' : 'All Digital Tools'}
            </button>

            {subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSub(sub.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSub === sub.id
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                {language === 'bn' ? sub.nameBn : sub.nameEn}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'ChatGPT, Canva, Gemini ইত্যাদি খুঁজুন...' : 'Search ChatGPT, Claude, Canva...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 shrink-0 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সর্ট করুন:' : 'Sort:'}</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="featured">{language === 'bn' ? 'ফিচার্ড' : 'Featured'}</option>
                <option value="price-asc">{language === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
                <option value="price-desc">{language === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
                <option value="rating">{language === 'bn' ? 'রেটিং অনুযায়ী' : 'Top Rated'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-slate-900/30 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">
              {language === 'bn' ? 'কোনো ডিজিটাল প্রোডাক্ট খুঁজে পাওয়া যায়নি।' : 'No digital products found.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenQuickView={onOpenQuickView}
              />
            ))}
          </div>
        )}

        {/* Activation & Reseller Guide */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-violet-400" />
              <span>১. নিজস্ব ইমেইলে আপগ্রেড</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              ক্যানভা প্রো বা জেমিনির মতো সার্ভিসের ক্ষেত্রে অর্ডারের সময় আপনার জিমেইল দিলে সরাসরি অফিশিয়াল ইনভাইট পেয়ে যাবেন।
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>২. প্রাইভেট একাউন্ট ও ভাউচার কি</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              ChatGPT Plus বা DeepSeek API এর ক্ষেত্রে তাত্ক্ষণিক অ্যাক্টিভেশন ভাউচার কি অর্ডার হিস্ট্রি পেজে দেখা যায়।
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>৩. রিসেলারদের ১০০% নিরাপত্তা</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              রিসেলিং করা যেকোনো অ্যাকাউন্টে সমস্যা হলে সম্পূর্ণ মেয়াদে ফ্রি রিপ্লেসমেন্ট এবং সার্বক্ষণিক সাপোর্ট পাবেন।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
