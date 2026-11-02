import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SMM_SERVICES } from '../data/mockData';
import { SmmService } from '../types';
import { Share2, Zap, ShieldCheck, Key, CheckCircle2, AlertCircle, Info, ExternalLink } from 'lucide-react';

export const SmmPanelSection: React.FC = () => {
  const { mode, language, walletBalance, createOrder, showToast, setIsResellerHubOpen } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'all' | 'facebook' | 'youtube' | 'instagram-tiktok' | 'telegram-x'>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SMM_SERVICES[0].id);
  const [targetLink, setTargetLink] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1000);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showApiModal, setShowApiModal] = useState<boolean>(false);

  const filteredServices = activeSubTab === 'all'
    ? SMM_SERVICES
    : SMM_SERVICES.filter(s => s.subCategory === activeSubTab);

  const selectedService: SmmService = SMM_SERVICES.find(s => s.id === selectedServiceId) || SMM_SERVICES[0];

  // Price calculations
  const currentRatePer1k = mode === 'reseller' ? selectedService.wholesaleRatePer1k : selectedService.retailRatePer1k;
  const calculatedCost = Math.round((currentRatePer1k * quantity) / 1000);
  const retailEquivalent = Math.round((selectedService.retailRatePer1k * quantity) / 1000);
  const potentialProfit = mode === 'reseller' ? (retailEquivalent - calculatedCost) : 0;

  const handleQuickQuantity = (qty: number) => {
    setQuantity(qty);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetLink.trim()) {
      showToast(language === 'bn' ? 'অনুগ্রহ করে টার্গেট লিঙ্ক দিন!' : 'Please enter target URL link!');
      return;
    }

    if (quantity < selectedService.minQuantity || quantity > selectedService.maxQuantity) {
      showToast(language === 'bn' ? `পরিমাণ ${selectedService.minQuantity} থেকে ${selectedService.maxQuantity} এর মধ্যে হতে হবে!` : `Quantity must be between ${selectedService.minQuantity} and ${selectedService.maxQuantity}`);
      return;
    }

    if (mode === 'reseller' && walletBalance < calculatedCost) {
      showToast(language === 'bn' ? 'রিসেলার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই! দয়া করে টপ-আপ করুন।' : 'Insufficient reseller balance! Please top up.');
      setIsResellerHubOpen(true);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        type: 'smm',
        itemsSummary: `${selectedService.nameBn} (${quantity.toLocaleString('en-IN')} Units)`,
        totalAmount: calculatedCost,
        profitEarned: potentialProfit,
        isResellerOrder: mode === 'reseller',
        paymentMethod: mode === 'reseller' ? 'wallet' : 'bkash',
        customerInfo: {
          name: customerName || (mode === 'reseller' ? 'রিসেলার কাস্টমার' : 'সাধারণ ক্রেতা'),
          phone: customerPhone || '01700000000',
        },
        deliveryDetails: {
          smmTargetLink: targetLink,
          trackingCode: `SMM-JOB-${Math.floor(100000 + Math.random() * 900000)}`,
        },
      });

      setIsSubmitting(false);
      setTargetLink('');
      showToast(language === 'bn' ? 'এসএমএম অর্ডার সফলভাবে সাবমিট হয়েছে!' : 'SMM Order submitted successfully!');
    }, 800);
  };

  return (
    <section id="smm-panel-section" className="py-12 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
              <Share2 className="w-4 h-4" />
              <span>{language === 'bn' ? 'ক্যাটাগরি ৩: সোশ্যাল মিডিয়া মার্কেটিং' : 'Category 3: SMM Growth Terminal'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'এক্সপ্লোর এস এম এম প্যানেল' : 'Explore SMM Growth Terminal'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'ফেসবুক, ইউটিউব, টিকটক, ইনস্টাগ্রাম ও টেলিগ্রামের ১০০% নন-ড্রপ ফলোয়ার্স, ভিউজ ও লাইক। রিসেলারদের জন্য রয়েছে বিশেষ হোলসেল রেট ও ডাইরেক্ট API কানেকশন।'
                : 'Facebook, YouTube, TikTok, IG and Telegram verified growth with non-drop guarantee and wholesale reseller API integration.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowApiModal(true)}
              className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'bn' ? 'রিসেলার API ডকুমেন্টেশন' : 'Reseller API Docs'}</span>
            </button>
          </div>
        </div>

        {/* Sub-Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
          {[
            { id: 'all', labelBn: 'সকল সার্ভিস', labelEn: 'All Services' },
            { id: 'facebook', labelBn: 'ফেসবুক সার্ভিসেস', labelEn: 'Facebook' },
            { id: 'youtube', labelBn: 'ইউটিউব প্রোমোশন', labelEn: 'YouTube' },
            { id: 'instagram-tiktok', labelBn: 'ইনস্টাগ্রাম ও টিকটক', labelEn: 'Instagram & TikTok' },
            { id: 'telegram-x', labelBn: 'টেলিগ্রাম ও টুইটার/X', labelEn: 'Telegram & X' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-sky-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Dual Layout: Interactive Order Terminal Left + Services Rate Table Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Order Terminal (Form) - 7 cols */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>{language === 'bn' ? 'তাত্ক্ষণিক নতুন অর্ডার টার্মিনাল' : 'Instant New Order Terminal'}</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {mode === 'reseller' ? (
                  <span className="text-amber-400 font-semibold">{language === 'bn' ? 'হোলসেল রেট চালু' : 'Wholesale Applied'}</span>
                ) : (
                  <span>{language === 'bn' ? 'স্ট্যান্ডার্ড রিটেল' : 'Standard Retail'}</span>
                )}
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              
              {/* Service Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {language === 'bn' ? 'সার্ভিস নির্বাচন করুন:' : 'Select Service:'}
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  {filteredServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      #{service.serviceCode} - {language === 'bn' ? service.nameBn : service.nameEn} (৳{mode === 'reseller' ? service.wholesaleRatePer1k : service.retailRatePer1k}/1K)
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Meta Specs Pill Box */}
              <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">{language === 'bn' ? 'স্পিড / গতি:' : 'Speed:'}</span>
                  <span className="text-white font-medium">{selectedService.speed}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{language === 'bn' ? 'গ্যারান্টি:' : 'Guarantee:'}</span>
                  <span className="text-emerald-400 font-medium">{selectedService.guarantee}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{language === 'bn' ? 'মিনিমাম / ম্যাক্সিমাম:' : 'Min / Max:'}</span>
                  <span className="text-slate-300 font-mono tabular-nums">
                    {selectedService.minQuantity} - {selectedService.maxQuantity.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Link Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>{language === 'bn' ? 'টার্গেট প্রোফাইল / পেজ / পোস্ট লিঙ্ক:' : 'Target Link / URL:'}</span>
                  <span className="text-[10px] text-slate-400">{language === 'bn' ? 'কোনো পাসওয়ার্ড প্রয়োজন নেই' : 'No password needed'}</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://facebook.com/your-page or video url"
                  value={targetLink}
                  onChange={(e) => setTargetLink(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Quantity Input with Quick Presets */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    {language === 'bn' ? 'পরিমাণ (Quantity):' : 'Quantity:'}
                  </label>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    {[500, 1000, 2000, 5000].map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        onClick={() => handleQuickQuantity(preset)}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer font-mono"
                      >
                        +{preset}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="number"
                  required
                  min={selectedService.minQuantity}
                  max={selectedService.maxQuantity}
                  step={50}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Reseller Extra Dropshipping Inputs */}
              {mode === 'reseller' && (
                <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                    <span>{language === 'bn' ? 'রিসেলার ক্লায়েন্ট ইনফো (অপশনাল)' : 'Client Details (Optional)'}</span>
                    <span className="text-[10px] text-amber-400/80 font-normal">{language === 'bn' ? 'আপনার ইনভয়েস ট্র্যাকিংয়ের জন্য' : 'For your bookkeeping'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder={language === 'bn' ? 'কাস্টমারের নাম' : 'Customer Name'}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-slate-950/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500"
                    />
                    <input
                      type="tel"
                      placeholder={language === 'bn' ? 'কাস্টমারের ফোন' : 'Customer Phone'}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="bg-slate-950/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* Cost Calculation Summary */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{language === 'bn' ? 'প্রতি ১,০০০ রেট:' : 'Rate per 1k:'}</span>
                  <span className="font-mono text-white">৳{currentRatePer1k}</span>
                </div>
                {mode === 'reseller' && (
                  <div className="flex items-center justify-between text-xs text-emerald-400">
                    <span>{language === 'bn' ? 'আপনার নিট লাভ (খুচরা বিক্রয়ে):' : 'Estimated Profit Margin:'}</span>
                    <span className="font-mono font-bold">+৳{potentialProfit}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-slate-800/80">
                  <span className="text-white">{language === 'bn' ? 'মোট পেমেন্ট:' : 'Total Payable:'}</span>
                  <span className="text-sky-400 font-mono text-lg tabular-nums">৳{calculatedCost}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{language === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Processing Job...'}</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {mode === 'reseller'
                        ? (language === 'bn' ? 'ওয়ালেট ব্যালেন্স থেকে ইনস্ট্যান্ট অর্ডার' : 'Order with Reseller Wallet')
                        : (language === 'bn' ? 'ইনস্ট্যান্ট অর্ডার সাবমিট করুন' : 'Confirm SMM Order')}
                    </span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* SMM Rates Catalog Table - 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'সার্ভিস রেট চার্ট' : 'Service Rate Chart'}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {filteredServices.length} {language === 'bn' ? 'টি সার্ভিস' : 'Items'}
                </span>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredServices.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => setSelectedServiceId(svc.id)}
                    className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedServiceId === svc.id
                        ? 'bg-sky-950/40 border-sky-600 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                      <span>ID #{svc.serviceCode}</span>
                      <span className="text-emerald-400 font-medium">{svc.guarantee}</span>
                    </div>

                    <div className="font-semibold text-white leading-snug line-clamp-1 mb-1.5">
                      {language === 'bn' ? svc.nameBn : svc.nameEn}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 font-mono">
                      <span className="text-slate-400">{language === 'bn' ? 'প্রতি ১K রেট:' : 'Rate/1k:'}</span>
                      <div>
                        {mode === 'reseller' ? (
                          <div className="flex items-center gap-1.5">
                            <span className="line-through text-slate-500">৳{svc.retailRatePer1k}</span>
                            <span className="text-amber-400 font-bold">৳{svc.wholesaleRatePer1k}</span>
                          </div>
                        ) : (
                          <span className="text-sky-400 font-bold">৳{svc.retailRatePer1k}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reseller Promotion Banner */}
            <div className="bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-800/40 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <Info className="w-4 h-4 text-sky-400" />
                <span>{language === 'bn' ? 'নিজের এসএমএম প্যানেল চালু করতে চান?' : 'Want to run your own SMM Panel?'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {language === 'bn'
                  ? 'এক্সপ্লোর API এর মাধ্যমে আপনার ওয়ার্ডপ্রেস বা কাস্টম প্যানেল যুক্ত করুন এবং সরাসরি পাইকারি রেটে আনলিমিটেড ক্লায়েন্ট সার্ভিস দিন।'
                  : 'Connect your own panel via Explore API v2 and resell non-drop services with automated order sync.'}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* SMM Reseller API Documentation Modal */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold">
                <Key className="w-4 h-4 text-amber-400" />
                <span>{language === 'bn' ? 'এক্সপ্লোর রিসেলার API ইন্টিগ্রেশন' : 'Explore Reseller API v2'}</span>
              </div>
              <button
                onClick={() => setShowApiModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p>
                {language === 'bn'
                  ? 'আপনার পার্সোনাল API Key দিয়ে আপনি যেকোনো SMM স্ক্রিপ্ট (যেমন SmartPanel, RentalPanel) এ সরাসরি যুক্ত করতে পারবেন।'
                  : 'Use your personal API Key to sync orders directly with SmartPanel, RentalPanel, or custom scripts.'}
              </p>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 block font-mono">API URL Endpoint:</span>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-sky-400 text-[11px] select-all">
                  https://api.explore-hub.com/v2/smm
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 block font-mono">Your Reseller API Key:</span>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-amber-400 text-[11px] select-all">
                  exp_live_8841a09d3b14e2c99a810f
                </div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px] text-slate-400">
                <div className="text-white font-semibold mb-1">Standard Parameters:</div>
                <div>key: Your API Key</div>
                <div>action: add / status / services / balance</div>
                <div>service: Service ID</div>
                <div>link: Link to target page/post</div>
                <div>quantity: Needed quantity</div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowApiModal(false);
                showToast(language === 'bn' ? 'API কী কপি করা হয়েছে!' : 'API Key copied to clipboard!');
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer"
            >
              {language === 'bn' ? 'ঠিক আছে' : 'Got it'}
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
