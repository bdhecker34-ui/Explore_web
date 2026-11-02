import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Zap, Check, ArrowRight, Store, Phone, Mail } from 'lucide-react';

export const B2BAuthModal: React.FC = () => {
  const {
    isB2BAuthModalOpen,
    setIsB2BAuthModalOpen,
    loginWithGoogle,
    language,
    isAuthLoading,
  } = useApp();

  const [email, setEmail] = useState('bdhecker34@gmail.com');
  const [name, setName] = useState('BD Hecker');
  const [shopName, setShopName] = useState('Hecker Digital Commerce');
  const [phone, setPhone] = useState('01712000000');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showAccountSelector, setShowAccountSelector] = useState(false);

  if (!isB2BAuthModalOpen) return null;

  const handleGoogleAuth = async () => {
    setIsSigningIn(true);
    try {
      await loginWithGoogle(email, name, shopName, phone);
    } catch (err) {
      console.warn('Google auth error', err);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-800/80 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? 'B2B রিসেলার অ্যাকাউন্ট তৈরি' : 'Create B2B Dealer Account'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {language === 'bn' ? 'পাইকারি দামে ব্যবসা করার প্ল্যাটফর্ম' : 'Unlock Wholesale Reseller Portal'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsB2BAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          
          {/* Explanation Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/30 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-amber-300 block">
              {language === 'bn' ? '🔒 B2B মোড অ্যাক্সেস নিরাপত্তা:' : '🔒 B2B Access Verification:'}
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'খুচরা ক্রেতা থেকে বি টু বি (B2B) মোডে যেতে গুগল দিয়ে আপনার রিসেলার একাউন্ট খুলুন। একাউন্ট খোলার সাথে সাথেই ৳১০০ ওয়ালেট বোনাস পেয়ে যাবেন।'
                : 'Sign up with your Google account to unlock wholesale pricing and receive a ৳100 welcome dealer bonus.'}
            </p>
          </div>

          {/* Primary Action: Continue with Google Button */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleAuth}
              disabled={isSigningIn}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md shadow-white/10 cursor-pointer disabled:opacity-60"
            >
              {/* Authentic Google "G" SVG Logo */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>
                {isSigningIn 
                  ? (language === 'bn' ? 'গুগল ভেরিফিকেশন হচ্ছে...' : 'Verifying Google Account...')
                  : (language === 'bn' ? 'Google দিয়ে সাইনআপ ও B2B একাউন্ট খুলুন' : 'Sign up & Continue with Google')}
              </span>
            </button>

            {/* Quick account details toggle */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowAccountSelector(!showAccountSelector)}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                {showAccountSelector ? 'শপ ও যোগাযোগ তথ্য লুকান' : 'আপনার শপ ও ফোন নাম্বার কাস্টমাইজ করুন ▾'}
              </button>
            </div>
          </div>

          {/* Optional Shop & Contact Customizer */}
          {showAccountSelector && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs animate-in fade-in duration-150">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Mail className="w-3 h-3 text-indigo-400" />
                  <span>Google Email:</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Store className="w-3 h-3 text-amber-400" />
                  <span>আপনার শপ / পেজের নাম:</span>
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="যেমন: My Digital Store"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>মোবাইল নম্বর:</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* B2B Exclusive Features List */}
          <div className="space-y-2 pt-1 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'bn' ? 'B2B ডিলারদের বিশেষ সুবিধা:' : 'B2B Dealer Benefits:'}
            </span>

            {[
              { textBn: 'সব প্রোডাক্ট ও ডিজিটাল সার্ভিসে সর্বোচ্চ ৩০% পাইকারি ডিসকাউন্ট', textEn: 'Up to 30% wholesale dealer discounts' },
              { textBn: 'হোয়াইট-লেবেল ড্রপশিপিং (পার্সেলের গায়ে আপনার শপের নাম)', textEn: 'White-label custom sender shipping' },
              { textBn: 'এস এম এম প্যানেল REST API v2 সরাসরি ব্যবহারের অনুমতি', textEn: 'Direct SMM API v2 access key' },
              { textBn: '১ ক্লিকে ওয়ালেট পেমেন্ট ও তাত্ক্ষণিক অর্ডার কনফার্মেশন', textEn: 'Instant 1-click reseller checkout' },
            ].map((b, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{language === 'bn' ? b.textBn : b.textEn}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
