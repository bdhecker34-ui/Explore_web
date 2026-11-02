import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Headphones, RefreshCw, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, setMode } = useApp();

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs">
      
      {/* 4 Feature Value Pillars */}
      <div className="border-b border-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-900 text-indigo-400 border border-slate-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">
                {language === 'bn' ? '১০০% অফিশিয়াল সার্ভিস' : '100% Verified'}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'bn' ? 'সম্পূর্ণ মেয়াদ গ্যারান্টি ও সাপোর্ট' : 'Full warranty period support'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">
                {language === 'bn' ? 'ইনস্ট্যান্ট অটো প্রসেসিং' : 'Instant Automation'}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'bn' ? '৬০ সেকেন্ডে অটোমেটেড ডেলিভারি' : 'Voucher & recharge in 60s'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-900 text-amber-400 border border-slate-800">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">
                {language === 'bn' ? 'ড্রপশিপিং ও পাইকারি হাব' : 'Dropshipping & Wholesale'}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'bn' ? 'নিজস্ব ব্র্যান্ডে পণ্য ডেলিভারি' : 'Custom white-label shipping'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-900 text-violet-400 border border-slate-800">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">
                {language === 'bn' ? '২৪/৭ ডেডিকেটেড হেল্পলাইন' : 'Dedicated Support'}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'bn' ? 'লাইভ চ্যাট ও দ্রুত সমাধান' : 'Direct WhatsApp & ticket support'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
              E
            </div>
            <span className="text-base font-bold text-white">Explore</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            {language === 'bn'
              ? 'Explore হলো আধুনিক ফ্যাশন, টেকনোলজি গ্যাজেট, এআই সাবস্ক্রিপশন, নন-ড্রপ এস এম এম প্যানেল এবং মোবাইল রিচার্জের একটি সমন্বিত কেনাকাটা ও ব্যবসা প্ল্যাটফর্ম।'
              : 'Explore is an all-in-one platform for modern fashion, digital subscriptions, non-drop SMM panel, and instant telecom flexiload.'}
          </p>
          <div className="text-[11px] text-slate-500">
            হেল্পলাইন: +880 1712-000000 · support@explore.com
          </div>
        </div>

        {/* Categories Dedicated Pages */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">
            {language === 'bn' ? 'ক্যাটাগরি পেজ সমূহ' : 'Dedicated Pages'}
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => onNavigate('fashion-tech')} className="hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? '১. ফ্যাশন ও টেক গ্যাজেটস পেজ' : '1. Fashion & Tech Page'}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('digital-subscriptions')} className="hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? '২. এআই ও ডিজিটাল প্রোডাক্ট পেজ' : '2. AI & Digital Subscriptions Page'}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('smm-panel')} className="hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? '৩. এসএমএম প্যানেল পেজ' : '3. SMM Growth Panel Page'}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('mobile-recharge')} className="hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? '৪. মোবাইল রিচার্জ ও ড্রাইভ পেজ' : '4. Mobile Recharge & Drive Page'}
              </button>
            </li>
          </ul>
        </div>

        {/* Reseller & Business */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">
            {language === 'bn' ? 'রিসেলার ও ডিলার হাব' : 'Reseller & Business'}
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button 
                onClick={() => {
                  setMode('reseller');
                  onNavigate('reseller');
                }} 
                className="hover:text-white transition-colors cursor-pointer text-amber-400 font-medium"
              >
                {language === 'bn' ? 'রিসেলার ড্যাশবোর্ড ও ওয়ালেট' : 'Reseller Hub & Wallet'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setMode('reseller');
                  onNavigate('reseller');
                }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'ড্রপশিপিং কাস্টমার ব্র্যান্ডিং' : 'Dropship Custom Label'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setMode('reseller');
                  onNavigate('reseller');
                }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'মুনাফা প্রজেকশন ক্যালকুলেটর' : 'Profit Projection Calculator'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  onNavigate('orders');
                }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'অর্ডার হিস্ট্রি ও ট্র্যাকিং' : 'Order Tracking'}
              </button>
            </li>
          </ul>
        </div>

        {/* Security & Payment */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">
            {language === 'bn' ? 'পেমেন্ট ও নিরাপত্তা' : 'Payment & Trust'}
          </h4>
          <p className="text-slate-400 text-xs">
            {language === 'bn'
              ? 'বিকাশ, নগদ, রকেট, ব্যাংক কার্ড ও ক্রিপ্টো USDT এর মাধ্যমে অটোমেটেড নিরাপদ পেমেন্ট সাপোর্ট।'
              : 'Secure transactions supported via bKash, Nagad, Rocket, Bank Cards & USDT.'}
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-slate-300">
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">bKash</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">Nagad</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">Rocket</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">USDT</span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 py-4 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Explore Platform. All rights reserved.
      </div>
    </footer>
  );
};
