import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  onExploreCategory: (catId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCategory }) => {
  const { mode, setMode, language, setIsResellerHubOpen } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Context Notice */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-indigo-400 font-bold uppercase tracking-wider">Explore Platform</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{language === 'bn' ? 'বিটুসি ও বিটুবি রিসেলার প্ল্যাটফর্ম' : 'B2C & B2B Reseller Ecosystem'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400">{language === 'bn' ? '১০০% ভেরিফাইড সার্ভিস' : '100% Verified'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18] text-balance">
              {language === 'bn' ? (
                <>
                  কেনাকাটা করুন নিজের জন্য, কিংবা পাইকারি রেটে শুরু করুন <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">লাভজনক ডিজিটাল ব্যবসা</span>
                </>
              ) : (
                <>
                  Buy for yourself or launch a profitable business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">wholesale digital commerce</span>
                </>
              )}
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {language === 'bn'
                ? 'ফ্যাশন ও আধুনিক গ্যাজেট, ChatGPT/Claude/Gemini/DeepSeek এআই সাবস্ক্রিপশন, সম্পূর্ণ নন-ড্রপ এস এম এম প্যানেল এবং ইনস্ট্যান্ট মোবাইল রিচার্জ ও ড্রাইভ প্যাক—সবকিছুই এখন এক ঠিকানায়।'
                : 'Premium lifestyle fashion, high-tech gadgets, instant AI subscriptions, non-drop SMM viral growth, and instant mobile drives with direct dealer profit.'}
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onExploreCategory('fashion-tech')}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/25 flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'bn' ? 'প্রোডাক্ট এক্সপ্লোর করুন' : 'Explore Catalog'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {mode === 'customer' ? (
                <button
                  onClick={() => setMode('reseller')}
                  className="px-5 py-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>{language === 'bn' ? 'রিসেলার মোড চালু করুন (পাইকারি দাম)' : 'Switch to Reseller Mode'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsResellerHubOpen(true)}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? 'রিসেলার ড্যাশবোর্ড ও ওয়ালেট' : 'Reseller Hub & Wallet'}</span>
                </button>
              )}
            </div>

            {/* Key Platform Value Props */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'bn' ? 'ইনস্ট্যান্ট ডেলিভারি' : 'Instant Delivery'}</span>
                </div>
                <p className="text-xs text-slate-400 leading-tight">
                  {language === 'bn' ? 'এআই অ্যাকাউন্ট ও রিচার্জ ৬০ সেকেন্ডে' : 'Sub & recharge in 60s'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'পাইকারি মার্জিন' : 'Wholesale Margin'}</span>
                </div>
                <p className="text-xs text-slate-400 leading-tight">
                  {language === 'bn' ? 'রিসেলারদের জন্য ৩০% পর্যন্ত নিট লাভ' : 'Up to 30% dealer profit'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{language === 'bn' ? '১০০% গ্যারান্টি' : 'Money-Back Guarantee'}</span>
                </div>
                <p className="text-xs text-slate-400 leading-tight">
                  {language === 'bn' ? 'সম্পূর্ণ মেয়াদ সাপোর্ট ও রিপ্লেসমেন্ট' : 'Full duration replacement'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src="/src/assets/images/hero_explore_lifestyle_1793622430279.jpg"
                alt="Explore Lifestyle and Technology"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              {/* Bottom Scrim Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white tracking-wide uppercase text-[11px]">
                    {language === 'bn' ? 'ফ্ল্যাগশিপ কালেকশন' : 'Flagship Showcase'}
                  </span>
                  <span className="font-mono tabular-nums text-amber-400 font-bold">
                    {mode === 'reseller' ? 'হোলসেল মোড সক্রিয়' : 'রিটেল রেট'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {language === 'bn'
                    ? 'টেকওয়্যার ফ্যাশন, অ্যাক্টিভ নয়েজ ক্যানসেলিং অডিও এবং এআই সাবস্ক্রিপশন সরাসরি পাইকারি মূল্যে।'
                    : 'Techwear fashion, ANC high-end audio, and digital vouchers at unbeatable rates.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
