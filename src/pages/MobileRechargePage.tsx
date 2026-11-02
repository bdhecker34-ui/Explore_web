import React from 'react';
import { useApp } from '../context/AppContext';
import { MobileRechargeSection } from '../components/MobileRechargeSection';
import { ArrowLeft, Smartphone, Zap, Percent, ShieldCheck } from 'lucide-react';

interface MobileRechargePageProps {
  onBackToHome: () => void;
}

export const MobileRechargePage: React.FC<MobileRechargePageProps> = ({ onBackToHome }) => {
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
              <span className="text-emerald-400 font-semibold">{language === 'bn' ? 'টেলিকম কমিশন মোড সক্রিয়' : 'Dealer Commission Active'}</span>
            ) : (
              <span>{language === 'bn' ? 'ইনস্ট্যান্ট রিচার্জ মোড' : 'Instant Flexiload Mode'}</span>
            )}
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Smartphone className="w-4 h-4" />
              <span>{language === 'bn' ? 'ক্যাটাগরি পেজ ৪' : 'Category Page 4'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'মোবাইল রিচার্জ ও ড্রাইভ প্যাক হাব' : 'Mobile Recharge & Drive Pack Portal'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === 'bn'
                ? 'গ্রামীণফোন, বাংলালিংক, রবি, এয়ারটেল ও টেলিটকে ৬০ সেকেন্ডে অটোমেটিক রিচার্জ। রিসেলারদের জন্য সর্বোচ্চ ৩.৫% কমিশন ও বড় ড্রাইভ প্যাক লাভ।'
                : 'Instant automated telecom flexiload & high-margin drive packs with up to 3.5% commission.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 text-xs">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-white block">৬০ সেকেন্ডে রিচার্জ</span>
                <span className="text-[10px] text-slate-400">অটোমেটেড সার্ভার এপিআই</span>
              </div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <Percent className="w-4 h-4 text-amber-400" />
              <div>
                <span className="font-bold text-white block">৩.৫% পর্যন্ত কমিশন</span>
                <span className="text-[10px] text-slate-400">প্রতি ড্রাইভে নগদ লাভ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Telecom Section */}
        <MobileRechargeSection />

      </div>
    </div>
  );
};
