import React from 'react';
import { useApp } from '../context/AppContext';
import { MainCategory } from '../types';
import { MAIN_CATEGORIES, SUB_CATEGORIES } from '../data/mockData';
import { Shirt, Sparkles, Share2, Smartphone, Search } from 'lucide-react';

interface CategoryNavProps {
  selectedMainCategory: MainCategory | 'all';
  onSelectMainCategory: (cat: MainCategory | 'all') => void;
  selectedSubCategory: string | 'all';
  onSelectSubCategory: (subCat: string | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedMainCategory,
  onSelectMainCategory,
  selectedSubCategory,
  onSelectSubCategory,
  searchQuery,
  onSearchChange,
}) => {
  const { language, mode } = useApp();

  const getCategoryIcon = (id: MainCategory) => {
    switch (id) {
      case 'fashion-tech':
        return <Shirt className="w-5 h-5 text-indigo-400" />;
      case 'digital-subscriptions':
        return <Sparkles className="w-5 h-5 text-violet-400" />;
      case 'smm-panel':
        return <Share2 className="w-5 h-5 text-sky-400" />;
      case 'mobile-recharge':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
    }
  };

  // Subcategories belonging to the active main category (if one is selected)
  const currentSubCategories = selectedMainCategory === 'all'
    ? []
    : SUB_CATEGORIES.filter(sub => sub.mainCategoryId === selectedMainCategory);

  return (
    <div className="py-6 space-y-6">
      
      {/* Category Selection Grid - 4 Main Pillars */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Product Categories'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'bn'
                ? 'পছন্দের ক্যাটাগরি বেছে নিন এবং সাব-ক্যাটাগরির বিস্তৃত অপশন দেখুন'
                : 'Select a primary category to view dedicated sub-categories and services'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={language === 'bn' ? 'যেকোনো প্রোডাক্ট বা সার্ভিস খুঁজুন...' : 'Search products, tools, services...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MAIN_CATEGORIES.map((cat) => {
            const isSelected = selectedMainCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectMainCategory(isSelected ? 'all' : cat.id);
                  onSelectSubCategory('all');
                }}
                className={`relative text-left p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-indigo-500 ring-1 ring-indigo-500/30 shadow-lg shadow-indigo-950/40'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                {/* Background ambient thumbnail preview */}
                <div className="absolute right-0 top-0 bottom-0 w-24 opacity-15 pointer-events-none overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.nameEn}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {SUB_CATEGORIES.filter(s => s.mainCategoryId === cat.id).length} {language === 'bn' ? 'সাব-ক্যাটাগরি' : 'Subs'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {language === 'bn' ? cat.nameBn : cat.nameEn}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {language === 'bn' ? cat.taglineBn : cat.taglineEn}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 mt-3 flex items-center justify-between text-[11px] relative z-10">
                  <span className="text-slate-400">
                    {mode === 'reseller' 
                      ? (language === 'bn' ? 'রিসেলার পাইকারি রেট' : 'Wholesale Dealer Rates')
                      : (language === 'bn' ? 'রিটেল শপ' : 'Retail Store')}
                  </span>
                  <span className={`font-medium ${isSelected ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
                    {isSelected ? (language === 'bn' ? 'সিলেক্টেড ✓' : 'Active') : (language === 'bn' ? 'দেখুন →' : 'View →')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategory Filter Bar (Segmented Interactive Control) */}
      {selectedMainCategory !== 'all' && currentSubCategories.length > 0 && (
        <div className="bg-slate-900/70 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 pl-2 shrink-0">
            {language === 'bn' ? 'সাব-ক্যাটাগরি:' : 'Sub-categories:'}
          </span>

          <button
            onClick={() => onSelectSubCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedSubCategory === 'all'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {language === 'bn' ? 'সব সাব-ক্যাটাগরি' : 'All Sub-categories'}
          </button>

          {currentSubCategories.map((sub) => {
            const isSubSelected = selectedSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubCategory(sub.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSubSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {language === 'bn' ? sub.nameBn : sub.nameEn}
              </button>
            );
          })}
        </div>
      )}

      {/* Reset Filter Banner when filtered */}
      {(selectedMainCategory !== 'all' || selectedSubCategory !== 'all' || searchQuery.trim().length > 0) && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div>
            <span>
              {language === 'bn' ? 'ফিল্টার সক্রিয় রয়েছে' : 'Active filters applied'}
            </span>
          </div>
          <button
            onClick={() => {
              onSelectMainCategory('all');
              onSelectSubCategory('all');
              onSearchChange('');
            }}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            {language === 'bn' ? 'ফিল্টার রিসেট করুন (সব দেখুন)' : 'Clear filters (View All)'}
          </button>
        </div>
      )}

    </div>
  );
};
