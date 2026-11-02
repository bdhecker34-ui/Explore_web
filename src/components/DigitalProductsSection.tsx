import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Sparkles, Bot, Palette, Film, Lock, Zap } from 'lucide-react';

interface DigitalProductsSectionProps {
  onOpenQuickView: (product: Product) => void;
  selectedSubFilter?: string;
}

export const DigitalProductsSection: React.FC<DigitalProductsSectionProps> = ({
  onOpenQuickView,
  selectedSubFilter = 'all',
}) => {
  const { mode, language } = useApp();
  const [internalSub, setInternalSub] = useState<string>(selectedSubFilter);

  const digitalProducts = PRODUCTS.filter(p => p.mainCategory === 'digital-subscriptions');

  const filtered = internalSub === 'all'
    ? digitalProducts
    : digitalProducts.filter(p => p.subCategory === internalSub);

  return (
    <section id="digital-products-section" className="py-12 border-t border-slate-900 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'bn' ? 'ক্যাটাগরি ২: এআই ও ডিজিটাল ভাউচার' : 'Category 2: AI & Digital Subscriptions'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'এআই সাবস্ক্রিপশন ও ডিজিটাল সার্ভিসেস' : 'AI Subscriptions & Digital Services'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'ChatGPT Plus, Claude 3.7 Sonnet, Gemini Advanced, DeepSeek Pro, Canva Pro এবং Netflix—১ মিনিটে নিজস্ব ইমেইলে ইনস্ট্যান্ট ডেলিভারি ও ১০০% মেয়াদ গ্যারান্টি।'
                : 'Instant 1-minute delivery on personal email with 100% replacement warranty and wholesale margin for resellers.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'bn' ? 'অটো ভাউচার ডেলিভারি সিস্টেম' : 'Instant Automated Voucher Delivery'}</span>
          </div>
        </div>

        {/* Sub-category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
          {[
            { id: 'all', labelBn: 'সকল ডিজিটাল সার্ভিস', labelEn: 'All Digital' },
            { id: 'ai-assistants', labelBn: 'এআই টুলস (ChatGPT/Claude/Gemini)', labelEn: 'AI Assistants' },
            { id: 'design-creative', labelBn: 'ডিজাইন ও ক্রিয়েটিভ (Canva Pro)', labelEn: 'Design Tools' },
            { id: 'ott-streaming', labelBn: 'ওটিটি ও এন্টারটেইনমেন্ট (Netflix)', labelEn: 'OTT Streaming' },
            { id: 'security-dev', labelBn: 'ভিপিএন ও ডেভেলপার লাইসেন্স', labelEn: 'VPN & Dev' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setInternalSub(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                internalSub === tab.id
                  ? 'bg-violet-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Digital Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>

        {/* Trust Info strip */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/30 via-slate-900 to-slate-950 border border-violet-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-white">
              {language === 'bn' ? 'ডিজিটাল প্রোডাক্ট এক্টিভেশন সহায়িকা:' : 'Digital Activation Guide:'}
            </div>
            <p className="text-slate-400">
              {language === 'bn'
                ? 'পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই অর্ডারের বিস্তারিত পাতায় ভাউচার কোড অথবা ইমেইল ইনভাইটেশন লিংক পেয়ে যাবেন।'
                : 'Instantly view your activation voucher code and setup guidelines in the order history section.'}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-violet-400 font-mono font-bold">
              {language === 'bn' ? '২৪/৭ ইনস্ট্যান্ট অটো-ইস্যু' : '24/7 Automated Delivery'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
