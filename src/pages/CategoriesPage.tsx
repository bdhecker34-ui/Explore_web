import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, LayoutGrid, Shirt, Sparkles, Share2, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CategoriesPageProps {
  onBackToHome: () => void;
  onNavigateToCategory: (page: string, subCategory?: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onBackToHome,
  onNavigateToCategory,
}) => {
  const { language, mode } = useApp();

  const CATEGORIES = [
    {
      id: 'fashion-tech',
      titleBn: '১. ফ্যাশন ও টেক গ্যাজেটস',
      titleEn: '1. Fashion & Tech Gadgets',
      descBn: 'হুডি, টিশার্ট, ANC ব্লুটুথ ইয়ারবাডস, মেকানিক্যাল কিবোর্ড ও প্রিমিয়াম গ্যাজেট।',
      descEn: 'Apparel, Active Noise Cancellation TWS, Smartwatches & Gear.',
      icon: <Shirt className="w-6 h-6 text-indigo-400" />,
      badgeBn: 'কুরিয়ার ডেলিভারি',
      badgeEn: 'Courier Shipping',
      color: 'from-indigo-600/20 via-slate-900 to-indigo-950/40',
      borderColor: 'border-indigo-500/30 hover:border-indigo-400',
      subCategories: [
        { id: 'apparel', nameBn: 'প্রিমিয়াম হুডি ও পোশাক', nameEn: 'Apparel' },
        { id: 'tws', nameBn: 'ANC ইয়ারবাডস ও হেডফোন', nameEn: 'Audio & TWS' },
        { id: 'smartwatch', nameBn: 'স্মার্টওয়াচ ও ট্র্যাকার', nameEn: 'Smartwatches' },
        { id: 'desk-gear', nameBn: 'মেকানিক্যাল কিবোর্ড ও লাইট', nameEn: 'Desk Gear' },
      ],
      wholesaleProfitBn: 'রিসেলিং লাভ: ৳৪০০-১২০০/পিস',
      wholesaleProfitEn: 'Wholesale Profit: ৳400-1200/item',
    },
    {
      id: 'digital-subscriptions',
      titleBn: '২. ডিজিটাল ও এআই সাবস্ক্রিপশন',
      titleEn: '2. AI & Digital Subscriptions',
      descBn: 'ChatGPT Plus, Claude 3.7 Sonnet, Gemini Advanced, DeepSeek ও Canva Pro তাত্ক্ষণিক অ্যাক্টিভেশন।',
      descEn: 'Instant automated delivery of ChatGPT Plus, Claude, Canva & streaming keys.',
      icon: <Sparkles className="w-6 h-6 text-violet-400" />,
      badgeBn: 'তাত্ক্ষণিক ভাউচার',
      badgeEn: 'Instant Key',
      color: 'from-violet-600/20 via-slate-900 to-violet-950/40',
      borderColor: 'border-violet-500/30 hover:border-violet-400',
      subCategories: [
        { id: 'ai-llm', nameBn: 'ChatGPT Plus ও Claude AI', nameEn: 'AI Pro Models' },
        { id: 'design-creativity', nameBn: 'Canva Pro ও ডিজাইন কিট', nameEn: 'Design Tools' },
        { id: 'cloud-dev', nameBn: 'Google Gemini ও DeepSeek API', nameEn: 'Dev APIs' },
        { id: 'entertainment', nameBn: 'Netflix ও প্রাইম একাউন্ট', nameEn: 'Streaming' },
      ],
      wholesaleProfitBn: 'রিসেলিং লাভ: ৳২০০-৮৫০/অর্ডার',
      wholesaleProfitEn: 'Wholesale Profit: ৳200-850/order',
    },
    {
      id: 'smm-panel',
      titleBn: '৩. এস এম এম প্যানেল টার্মিনাল',
      titleEn: '3. SMM Growth Panel Terminal',
      descBn: 'ফেসবুক ফলোয়ার্স, ইউটিউব ওয়াচটাইম, ইনস্টাগ্রাম ও টিকটক ভিউজের লাইভ রেট টার্মিনাল ও REST API।',
      descEn: 'Automated social media expansion with live rates and API access.',
      icon: <Share2 className="w-6 h-6 text-sky-400" />,
      badgeBn: 'লাইভ টার্মিনাল',
      badgeEn: 'Live Terminal',
      color: 'from-sky-600/20 via-slate-900 to-sky-950/40',
      borderColor: 'border-sky-500/30 hover:border-sky-400',
      subCategories: [
        { id: 'facebook', nameBn: 'Facebook ফলোয়ার্স ও রিয়্যাকশন', nameEn: 'Facebook Services' },
        { id: 'youtube', nameBn: 'YouTube সাবস্ক্রাইবার ও ওয়াচটাইম', nameEn: 'YouTube Services' },
        { id: 'instagram-tiktok', nameBn: 'Instagram ও TikTok ভিউজ', nameEn: 'IG & TikTok' },
        { id: 'telegram-x', nameBn: 'Telegram মেম্বার্স ও X এনগেজমেন্ট', nameEn: 'Telegram & X' },
      ],
      wholesaleProfitBn: 'রিসেলিং লাভ: ৩৫%-৬০% মার্জিন',
      wholesaleProfitEn: 'Wholesale Profit: 35%-60% Margin',
    },
    {
      id: 'mobile-recharge',
      titleBn: '৪. মোবাইল রিচার্জ ও ড্রাইভ প্যাক',
      titleEn: '4. Mobile Recharge & Drive Packs',
      descBn: 'গ্রামীণফোন, রবি, বাংলালিংক, এয়ারটেল ও টেলিটকে অটো রিচার্জ এবং উচ্চ কমিশনের ড্রাইভ প্যাক।',
      descEn: 'Auto flexiload with 2.8%-3.5% commission and high cash-margin drive bundles.',
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      badgeBn: 'অটো রিচার্জ',
      badgeEn: 'Auto Recharge',
      color: 'from-emerald-600/20 via-slate-900 to-emerald-950/40',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400',
      subCategories: [
        { id: 'drive-packs', nameBn: 'মেগা ড্রাইভ প্যাক (ইন্টারনেট + মিনিট)', nameEn: 'Mega Drive Packs' },
        { id: 'flexiload', nameBn: 'অটো ব্যালেন্স রিচার্জ (সকল অপারেটর)', nameEn: 'Auto Flexiload' },
        { id: 'internet', nameBn: 'ইন্টারনেট ডাটা বান্ডেল', nameEn: 'Data Bundles' },
        { id: 'minute', nameBn: 'টকটাইম মিনিট অফার', nameEn: 'Voice Bundles' },
      ],
      wholesaleProfitBn: 'কমিশন: ৳৫০-১৫০ প্রতি ড্রাইভ',
      wholesaleProfitEn: 'Commission: ৳50-150 per pack',
    },
  ];

  return (
    <div className="py-8 space-y-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
          </button>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
            <span>৪টি মূল ক্যাটাগরি</span>
          </div>
        </div>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400">
              <LayoutGrid className="w-4 h-4" />
              <span>{language === 'bn' ? 'ক্যাটাগরি ডিরেক্টরি' : 'Category Directory'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'সকল প্রডাক্ট ও সার্ভিস ক্যাটাগরি' : 'All Product & Service Categories'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === 'bn'
                ? 'আপনার প্রয়োজনীয় ক্যাটাগরি বেছে নিন এবং পাইকারি অথবা খুচরা মূল্যে দ্রুত অর্ডার সম্পন্ন করুন।'
                : 'Browse our full catalog across fashion, gadgets, subscriptions, SMM, and mobile recharge.'}
            </p>
          </div>
        </div>

        {/* 4 Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-2xl p-6 bg-gradient-to-br ${cat.color} border ${cat.borderColor} transition-all space-y-5 shadow-lg flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        {language === 'bn' ? cat.titleBn : cat.titleEn}
                      </h2>
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40 mt-1 inline-block">
                        {language === 'bn' ? cat.badgeBn : cat.badgeEn}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'bn' ? cat.descBn : cat.descEn}
                </p>

                {/* Subcategory Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {language === 'bn' ? 'সাব-ক্যাটাগরি সমূহ:' : 'Sub-categories:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.subCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onNavigateToCategory(cat.id, sub.id)}
                        className="text-left px-3 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:text-white transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <span className="truncate">{language === 'bn' ? sub.nameBn : sub.nameEn}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-1 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Reseller margin and action */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {mode === 'reseller' ? (language === 'bn' ? cat.wholesaleProfitBn : cat.wholesaleProfitEn) : '✓ ১০০% ভেরিফাইড কোয়ালিটি'}
                </span>

                <button
                  onClick={() => onNavigateToCategory(cat.id)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shrink-0"
                >
                  <span>{language === 'bn' ? 'ক্যাটাগরি দেখুন' : 'View Catalog'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
