import React from 'react';
import { useApp } from '../context/AppContext';
import { CleanImageSlider } from '../components/CleanImageSlider';
import { ArrowRight, Sparkles, TrendingUp, Shirt, Share2, Smartphone } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, subCategory?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { mode, requestSwitchMode, b2bUser, language } = useApp();

  return (
    <div className="space-y-10 pb-16 overflow-x-hidden">
      
      {/* 16:9 5-Slide Clean Banner (No overlaid text or buttons) */}
      <section className="pt-4">
        <CleanImageSlider />
      </section>

      {/* Brief Value Statement & Dual Mode Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {language === 'bn' ? (
                <>
                  Explore - <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">কেনাকাটা ও লাভজনক ব্যবসার হাব</span>
                </>
              ) : (
                <>
                  Explore - <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">Commerce & Reseller Hub</span>
                </>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {language === 'bn'
                ? 'ফ্যাশন ও টেক গ্যাজেট, এআই সাবস্ক্রিপশন, এসএমএম প্যানেল এবং মোবাইল রিচার্জের সম্পূর্ণ আলাদা ডেডিকেটেড পেজ।'
                : 'Standalone dedicated pages for Fashion & Tech, AI Subscriptions, SMM Growth and Mobile Recharge.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2.5">
            {mode === 'customer' ? (
              <button
                onClick={() => requestSwitchMode('reseller')}
                className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'bn' ? (b2bUser ? 'রিসেলার মোড সক্রিয় করুন' : 'গুগল দিয়ে B2B একাউন্ট খুলুন') : 'Activate B2B Mode'}</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('reseller')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'রিসেলার ড্যাশবোর্ড' : 'Reseller Dashboard'}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4 Dedicated Page Entry Gateways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {language === 'bn' ? 'মূল ক্যাটাগরি পেজ সমূহ' : 'Primary Category Pages'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'bn'
              ? 'নিচের যেকোনো ক্যাটাগরিতে ক্লিক করে তার সম্পূর্ণ আলাদা পেজে প্রবেশ করুন'
              : 'Select any category below to visit its standalone dedicated page'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Card 1: Fashion & Tech */}
          <div 
            onClick={() => onNavigate('fashion-tech')}
            className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-indigo-500/80 transition-all p-5 sm:p-6 flex flex-col justify-between cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-indigo-950/20"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none overflow-hidden">
              <img
                src="/src/assets/images/category_fashion_tech_1793622431458.jpg"
                alt="Fashion Tech"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-indigo-400">
                  <Shirt className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">পেজ ১</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {language === 'bn' ? '১. ফ্যাশন, টেকনোলজি ও ভ্যারাইটিজ' : '1. Fashion, Tech & Varieties'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-sm">
                  {language === 'bn'
                    ? 'প্রিমিয়াম হুডি, স্মার্টওয়াচ, টিডব্লিউএস ইয়ারবাডস, মেকানিক্যাল কিবোর্ড এবং লাইফস্টাইল ভ্যারাইটিজ।'
                    : 'Streetwear hoodies, ANC earbuds, AMOLED smartwatches, and custom keyboards.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['পোশাক ও ফ্যাশন', 'স্মার্ট গ্যাজেটস', 'কম্পিউটার গিয়ার', 'লাইফস্টাইল'].map((sub, i) => (
                  <span key={i} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 relative z-10">
              <span>{language === 'bn' ? 'ফ্যাশন ও টেক পেজে প্রবেশ করুন' : 'Open Fashion & Tech Page'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Digital Subscriptions */}
          <div 
            onClick={() => onNavigate('digital-subscriptions')}
            className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-violet-500/80 transition-all p-5 sm:p-6 flex flex-col justify-between cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-violet-950/20"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none overflow-hidden">
              <img
                src="/src/assets/images/category_digital_ai_1793622431820.jpg"
                alt="Digital AI"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-800/60 text-violet-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">পেজ ২</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                  {language === 'bn' ? '২. ডিজিটাল প্রোডাক্ট ও এআই সাবস্ক্রিপশন' : '2. Digital & AI Subscriptions'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-sm">
                  {language === 'bn'
                    ? 'ChatGPT Plus, Claude 3.7 Sonnet, Gemini Advanced, DeepSeek Pro, Canva Pro এবং Netflix।'
                    : 'ChatGPT, Gemini, Claude, DeepSeek, Canva Pro, Netflix & VPN accounts with 1-min delivery.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['এআই অ্যাসিস্ট্যান্টস', 'ক্যানভা ও অ্যাডোবি', 'ওটিটি নেটফ্লিক্স', 'ভিপিএন লাইসেন্স'].map((sub, i) => (
                  <span key={i} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:text-violet-300 relative z-10">
              <span>{language === 'bn' ? 'ডিজিটাল প্রোডাক্ট পেজে প্রবেশ করুন' : 'Open Digital Products Page'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: SMM Panel */}
          <div 
            onClick={() => onNavigate('smm-panel')}
            className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-sky-500/80 transition-all p-5 sm:p-6 flex flex-col justify-between cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-sky-950/20"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none overflow-hidden">
              <img
                src="/src/assets/images/category_smm_growth_1793622432908.jpg"
                alt="SMM Growth"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">পেজ ৩</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {language === 'bn' ? '৩. এস এম এম প্যানেল টার্মিনাল' : '3. SMM Growth Terminal'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-sm">
                  {language === 'bn'
                    ? 'ফেসবুক, ইউটিউব, ইনস্টাগ্রাম, টিকটক ও টেলিগ্রামের ১০০% নন-ড্রপ গ্রোথ সার্ভিস ও রিসেলার REST API।'
                    : 'Facebook, YouTube, TikTok, IG viral services with instant order terminal and Reseller API.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['ফেসবুক গ্রোথ', 'ইউটিউব মনিটাইজেশন', 'ইনস্টাগ্রাম ও টিকটক', 'টেলিগ্রাম মেম্বার্স'].map((sub, i) => (
                  <span key={i} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300 relative z-10">
              <span>{language === 'bn' ? 'এসএমএম প্যানেল পেজে প্রবেশ করুন' : 'Open SMM Panel Page'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Mobile Recharge & Drive Packs */}
          <div 
            onClick={() => onNavigate('mobile-recharge')}
            className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-emerald-500/80 transition-all p-5 sm:p-6 flex flex-col justify-between cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-emerald-950/20"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none overflow-hidden">
              <img
                src="/src/assets/images/category_telecom_recharge_1793622431644.jpg"
                alt="Telecom Recharge"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">পেজ ৪</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? '৪. মোবাইল রিচার্জ ও ড্রাইভ প্যাক হাব' : '4. Mobile Recharge & Drive Hub'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-sm">
                  {language === 'bn'
                    ? 'গ্রামীণফোন, বাংলালিংক, রবি, এয়ারটেল ও টেলিটক ৬০ সেকেন্ডে অটো রিচার্জ ও সর্বোচ্চ ৩.৫% কমিশন।'
                    : 'Instant automated telco recharge with up to 3.5% commission & discounted drive packs.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['ইনস্ট্যান্ট ফ্ল্যাক্সিলোড', 'ইন্টারনেট ড্রাইভ প্যাক', 'মিনিট বান্ডেল', 'স্পেশাল কম্বো'].map((sub, i) => (
                  <span key={i} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 relative z-10">
              <span>{language === 'bn' ? 'মোবাইল রিচার্জ পেজে প্রবেশ করুন' : 'Open Mobile Recharge Page'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Reseller Banner Gateway */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">
              B2B RESELLER & DROPSHIPPING
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {language === 'bn' ? 'নিজের শপ বা পেজ থেকে বিক্রি করতে চান?' : 'Want to resell from your own brand?'}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              {language === 'bn'
                ? 'রিসেলার ড্যাশবোর্ড থেকে ওয়ালেট ব্যালেন্স যোগ করুন, হোয়াইট-লেবেল ড্রপশিপিং সেটআপ করুন এবং পাইকারি রেটে বিক্রি শুরু করুন।'
                : 'Deposit funds into your reseller wallet and ship orders directly to your customers.'}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => {
                requestSwitchMode('reseller');
                if (b2bUser) {
                  onNavigate('reseller');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
            >
              {language === 'bn' ? (b2bUser ? 'রিসেলার ড্যাশবোর্ড খুলুন →' : 'গুগল দিয়ে B2B ডিলার জয়েন করুন →') : 'Open Reseller Hub →'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
