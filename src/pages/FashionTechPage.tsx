import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, SUB_CATEGORIES } from '../data/mockData';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Shirt, ArrowLeft, Search, Filter, Truck, ShieldCheck, ArrowUpDown } from 'lucide-react';

interface FashionTechPageProps {
  onBackToHome: () => void;
  onOpenQuickView: (product: Product) => void;
  initialSubCategory?: string;
}

export const FashionTechPage: React.FC<FashionTechPageProps> = ({
  onBackToHome,
  onOpenQuickView,
  initialSubCategory = 'all',
}) => {
  const { mode, language } = useApp();
  const [selectedSub, setSelectedSub] = useState<string>(initialSubCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const subCategories = SUB_CATEGORIES.filter(s => s.mainCategoryId === 'fashion-tech');
  const allFashionProducts = PRODUCTS.filter(p => p.mainCategory === 'fashion-tech');

  const filteredProducts = useMemo(() => {
    let list = allFashionProducts;

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

    // Sort
    return [...list].sort((a, b) => {
      const priceA = mode === 'reseller' ? a.wholesalePrice : a.retailPrice;
      const priceB = mode === 'reseller' ? b.wholesalePrice : b.retailPrice;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [allFashionProducts, selectedSub, searchQuery, sortBy, mode]);

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
              <span className="text-amber-400 font-semibold">{language === 'bn' ? 'হোলসেল রেট ও মার্জিন ভিউ' : 'Wholesale Dealer Mode'}</span>
            ) : (
              <span>{language === 'bn' ? 'খুচরা গ্রাহক মোড' : 'Consumer Retail'}</span>
            )}
          </div>
        </div>

        {/* Page Title & Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400">
              <Shirt className="w-4 h-4" />
              <span>{language === 'bn' ? 'ক্যাটাগরি পেজ ১' : 'Category Page 1'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'ফ্যাশন, টেকনোলজি ও ভ্যারাইটিজ' : 'Fashion, Tech & Varieties Hub'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === 'bn'
                ? 'প্রিমিয়াম কোয়ালিটি টেকওয়্যার হুডি, হাইব্রিড ANC ইয়ারবাডস, অ্যামোলেড স্মার্টওয়াচ এবং মেকানিক্যাল ডেস্ক গিয়ার।'
                : 'Browse curated lifestyle apparel, smart wearables, noise-canceling audio and computer peripherals.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 text-xs">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-white block">সারা দেশে কুরিয়ার</span>
                <span className="text-[10px] text-slate-400">২-৩ দিনে হোম ডেলিভারি</span>
              </div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="font-bold text-white block">অফিশিয়াল ওয়ারেন্টি</span>
                <span className="text-[10px] text-slate-400">৭ দিনের রিটার্ন গ্যারান্টি</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Toolbar: Subcategories + Search + Sort */}
        <div className="space-y-4">
          
          {/* Sub-category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
            <button
              onClick={() => setSelectedSub('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedSub === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              {language === 'bn' ? 'সব সাব-ক্যাটাগরি' : 'All Sub-categories'}
            </button>

            {subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSub(sub.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSub === sub.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                {language === 'bn' ? sub.nameBn : sub.nameEn}
              </button>
            ))}
          </div>

          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'ফ্যাশন ও টেক প্রোডাক্ট খুঁজুন...' : 'Search fashion & tech...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 shrink-0 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সর্ট করুন:' : 'Sort by:'}</span>
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
              {language === 'bn' ? 'কোনো প্রোডাক্ট খুঁজে পাওয়া যায়নি।' : 'No products found.'}
            </p>
            <button
              onClick={() => {
                setSelectedSub('all');
                setSearchQuery('');
              }}
              className="text-xs text-indigo-400 hover:underline cursor-pointer"
            >
              {language === 'bn' ? 'ফিল্টার ক্লিয়ার করুন' : 'Reset filters'}
            </button>
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

      </div>
    </div>
  );
};
