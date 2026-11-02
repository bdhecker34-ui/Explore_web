import React from 'react';
import { useApp } from '../context/AppContext';
import { SmmPanelSection } from '../components/SmmPanelSection';
import { ArrowLeft, Share2, Key, Zap, ShieldCheck } from 'lucide-react';

interface SmmPanelPageProps {
  onBackToHome: () => void;
}

export const SmmPanelPage: React.FC<SmmPanelPageProps> = ({ onBackToHome }) => {
  const { mode, language } = useApp();

  return (
    <div className="py-8 space-y-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
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
              <span className="text-amber-400 font-semibold">{language === 'bn' ? 'রিসেলার হোলসেল রেট সক্রিয়' : 'Reseller Wholesale Active'}</span>
            ) : (
              <span>{language === 'bn' ? 'স্ট্যান্ডার্ড রিটেল গ্রোথ' : 'Standard Growth Order'}</span>
            )}
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400">
              <Share2 className="w-4 h-4" />
              <span>{language === 'bn' ? 'ক্যাটাগরি পেজ ৩' : 'Category Page 3'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'এস এম এম প্যানেল টার্মিনাল' : 'SMM Growth Terminal'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === 'bn'
                ? 'ফেসবুক, ইউটিউব, টিকটক, ইনস্টাগ্রাম ও টেলিগ্রামের ১০০% নন-ড্রপ সার্ভিস। লাইভ ইনস্ট্যান্ট অর্ডার প্লেসমেন্ট এবং রিসেলারদের নিজস্ব প্যানেলের জন্য REST API।'
                : 'Facebook, YouTube, TikTok, IG and Telegram verified growth with non-drop refill guarantee and wholesale REST API.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 text-xs">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-sky-400" />
              <div>
                <span className="font-bold text-white block">ইনস্ট্যান্ট স্টার্ট</span>
                <span className="text-[10px] text-slate-400">অর্ডারের ৫-১০ মিনিটে শুরু</span>
              </div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-white block">লাইফটাইম নন-ড্রপ</span>
                <span className="text-[10px] text-slate-400">ফ্রি অটো-রিফিল বাটন</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive SMM Terminal Component */}
        <SmmPanelSection />

      </div>
    </div>
  );
};
