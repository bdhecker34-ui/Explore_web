import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DRIVE_PACKS } from '../data/mockData';
import { DrivePack } from '../types';
import { Smartphone, Zap, Check, ArrowRight, Percent, Award, PhoneCall, Wifi, Gift } from 'lucide-react';

export const MobileRechargeSection: React.FC = () => {
  const { mode, language, walletBalance, createOrder, showToast, setIsResellerHubOpen } = useApp();

  const [activeTab, setActiveTab] = useState<'flexi' | 'drive'>('flexi');
  const [operator, setOperator] = useState<'gp' | 'bl' | 'robi' | 'airtel' | 'teletalk'>('gp');
  const [phone, setPhone] = useState<string>('');
  const [simType, setSimType] = useState<'prepaid' | 'postpaid'>('prepaid');
  const [amount, setAmount] = useState<number>(100);
  const [driveFilter, setDriveFilter] = useState<'all' | 'internet' | 'minute' | 'combo'>('all');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Auto-detect operator from prefix
  const handlePhoneChange = (val: string) => {
    setPhone(val);
    const clean = val.replace(/\D/g, '');
    if (clean.startsWith('017') || clean.startsWith('013')) setOperator('gp');
    else if (clean.startsWith('019') || clean.startsWith('014')) setOperator('bl');
    else if (clean.startsWith('018')) setOperator('robi');
    else if (clean.startsWith('016')) setOperator('airtel');
    else if (clean.startsWith('015')) setOperator('teletalk');
  };

  const getOperatorDetails = (op: typeof operator) => {
    switch (op) {
      case 'gp':
        return { name: 'Grameenphone', color: 'from-blue-600 to-sky-500', commissionRate: 2.8 };
      case 'bl':
        return { name: 'Banglalink', color: 'from-orange-600 to-amber-500', commissionRate: 3.2 };
      case 'robi':
        return { name: 'Robi Axiata', color: 'from-rose-600 to-red-500', commissionRate: 3.0 };
      case 'airtel':
        return { name: 'Airtel', color: 'from-red-600 to-rose-500', commissionRate: 3.5 };
      case 'teletalk':
        return { name: 'Teletalk', color: 'from-emerald-600 to-teal-500', commissionRate: 3.5 };
    }
  };

  const opInfo = getOperatorDetails(operator);

  // Commission calculation for flexiload
  const resellerCommissionAmount = mode === 'reseller' ? Math.round((amount * opInfo.commissionRate) / 100) : 0;
  const netFlexiCost = mode === 'reseller' ? (amount - resellerCommissionAmount) : amount;

  const handleFlexiSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const clean = phone.replace(/\D/g, '');
    if (clean.length !== 11) {
      showToast(language === 'bn' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন!' : 'Please enter valid 11-digit mobile number!');
      return;
    }

    if (amount < 10 || amount > 1000) {
      showToast(language === 'bn' ? 'রিচার্জের পরিমাণ ১০ থেকে ১০০০ টাকার মধ্যে হতে হবে!' : 'Amount must be between 10 and 1000 BDT');
      return;
    }

    if (mode === 'reseller' && walletBalance < netFlexiCost) {
      showToast(language === 'bn' ? 'রিসেলার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই! রিচার্জের জন্য ব্যালেন্স যোগ করুন।' : 'Insufficient reseller balance for recharge.');
      setIsResellerHubOpen(true);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      createOrder({
        type: 'recharge',
        itemsSummary: `${opInfo.name} ৳${amount} ${simType === 'prepaid' ? 'প্রিপেইড' : 'পোস্টপেইড'} অটো রিচার্জ`,
        totalAmount: netFlexiCost,
        profitEarned: resellerCommissionAmount,
        isResellerOrder: mode === 'reseller',
        paymentMethod: mode === 'reseller' ? 'wallet' : 'bkash',
        customerInfo: {
          name: mode === 'reseller' ? 'রিসেলার রিচার্জ' : 'সাধারণ রিচার্জ',
          phone: clean,
        },
        deliveryDetails: {
          rechargeMobile: clean,
          trackingCode: `FLX-${Math.floor(100000 + Math.random() * 900000)}`,
        },
      });

      setIsProcessing(false);
      showToast(language === 'bn' ? `৳${amount} রিচার্জ সফলভাবে সম্পন্ন হয়েছে!` : `৳${amount} recharge completed successfully!`);
    }, 700);
  };

  const handleDriveOrder = (pack: DrivePack) => {
    const targetCost = mode === 'reseller' ? pack.wholesalePrice : pack.offerPrice;

    if (mode === 'reseller' && walletBalance < targetCost) {
      showToast(language === 'bn' ? 'ড্রাইভ প্যাক কেনার জন্য ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই।' : 'Insufficient wallet balance for this drive.');
      setIsResellerHubOpen(true);
      return;
    }

    const recipient = phone.trim() ? phone : '01712000000';

    createOrder({
      type: 'recharge',
      itemsSummary: `${pack.titleBn}`,
      totalAmount: targetCost,
      profitEarned: mode === 'reseller' ? pack.commission : 0,
      isResellerOrder: mode === 'reseller',
      paymentMethod: mode === 'reseller' ? 'wallet' : 'bkash',
      customerInfo: {
        name: mode === 'reseller' ? 'রিসেলার ড্রাইভ কাস্টমার' : 'ড্রাইভ ইউজার',
        phone: recipient,
      },
      deliveryDetails: {
        rechargeMobile: recipient,
        trackingCode: `DRV-${Math.floor(100000 + Math.random() * 900000)}`,
      },
    });

    showToast(language === 'bn' ? `ড্রাইভ প্যাক "${pack.titleBn}" অর্ডার সফল হয়েছে!` : `Drive pack order placed successfully!`);
  };

  const filteredDrives = DRIVE_PACKS.filter((p) => {
    const matchOp = operator === 'gp' ? p.operator === 'gp' : p.operator === operator;
    const matchType = driveFilter === 'all' ? true : p.type === driveFilter;
    return matchOp && matchType;
  });

  return (
    <section id="mobile-recharge-section" className="py-12 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Smartphone className="w-4 h-4" />
              <span>{language === 'bn' ? 'ক্যাটাগরি ৪: টেলিকম ও রিচার্জ' : 'Category 4: Mobile Top-Up & Drive Packs'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'মোবাইল রিচার্জ ও ড্রাইভ প্যাক হাব' : 'Mobile Recharge & Drive Pack Hub'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'গ্রামীণফোন, বাংলালিংক, রবি, এয়ারটেল ও টেলিটকে ৬০ সেকেন্ডে অটো রিচার্জ। রিসেলারদের জন্য রয়েছে সর্বোচ্চ ৩.৫% ক্যাশব্যাক এবং প্রতি ড্রাইভ প্যাকে ৫০-১৩০ টাকা পর্যন্ত নগদ লাভ।'
                : 'Instant automated telecom flexiload & high-margin drive packs with up to 3.5% auto commission.'}
            </p>
          </div>

          {/* Mode Switch within recharge */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('flexi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'flexi'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ইনস্ট্যান্ট অটো রিচার্জ' : 'Auto Flexiload'}</span>
            </button>
            <button
              onClick={() => setActiveTab('drive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'drive'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ড্রাইভ প্যাক ও অফার' : 'Drive Packs'}</span>
            </button>
          </div>
        </div>

        {/* Operator Selector Row */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 block">
            {language === 'bn' ? 'অপারেটর নির্বাচন করুন:' : 'Select Telecom Operator:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { id: 'gp', name: 'Grameenphone', prefix: '017 / 013', color: 'border-sky-500/50 bg-sky-950/20 text-sky-300' },
              { id: 'bl', name: 'Banglalink', prefix: '019 / 014', color: 'border-amber-500/50 bg-amber-950/20 text-amber-300' },
              { id: 'robi', name: 'Robi', prefix: '018', color: 'border-red-500/50 bg-red-950/20 text-rose-300' },
              { id: 'airtel', name: 'Airtel', prefix: '016', color: 'border-rose-500/50 bg-rose-950/20 text-red-300' },
              { id: 'teletalk', name: 'Teletalk', prefix: '015', color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300' },
            ].map((op) => {
              const isSelected = operator === op.id;
              return (
                <button
                  key={op.id}
                  onClick={() => setOperator(op.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? `ring-2 ring-emerald-500 bg-slate-900 border-transparent shadow-lg`
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm text-white flex items-center justify-between">
                    <span>{op.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    {op.prefix}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Instant Flexiload Terminal */}
        {activeTab === 'flexi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Flexi Form - 7 cols */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? 'সরাসরি অটো রিচার্জ' : 'Direct Auto Flexiload'}</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  {opInfo.name} ({mode === 'reseller' ? `${opInfo.commissionRate}% কমিশন` : 'ইনস্ট্যান্ট'})
                </div>
              </div>

              <form onSubmit={handleFlexiSubmit} className="space-y-4">
                
                {/* Phone Number Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>{language === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট):' : 'Mobile Number (11 digits):'}</span>
                    <span className="text-[10px] text-slate-400 font-mono">অটো অপারেটর ডিটেক্টেড</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* SIM Type Switcher */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {language === 'bn' ? 'সিম টাইপ:' : 'SIM Type:'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSimType('prepaid')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        simType === 'prepaid'
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {language === 'bn' ? 'প্রিপেইড (Prepaid)' : 'Prepaid'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimType('postpaid')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        simType === 'postpaid'
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {language === 'bn' ? 'পোস্টপেইড (Postpaid)' : 'Postpaid'}
                    </button>
                  </div>
                </div>

                {/* Amount with Presets */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">
                      {language === 'bn' ? 'রিচার্জের পরিমাণ (টাকা):' : 'Recharge Amount (BDT):'}
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">১০ - ১০০০ টাকা</span>
                  </div>
                  <input
                    type="number"
                    required
                    min={10}
                    max={1000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base font-mono text-white focus:outline-none focus:border-emerald-500"
                  />

                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[20, 50, 100, 200, 300, 500].map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        onClick={() => setAmount(preset)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          amount === preset
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        ৳{preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cost & Reseller Commission Summary */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{language === 'bn' ? 'রিচার্জ অ্যামাউন্ট:' : 'Amount:'}</span>
                    <span className="font-mono text-white tabular-nums">৳{amount}</span>
                  </div>
                  {mode === 'reseller' && (
                    <div className="flex items-center justify-between text-xs text-emerald-400">
                      <span>{language === 'bn' ? `রিসেলার কমিশন (${opInfo.commissionRate}%):` : 'Reseller Margin:'}</span>
                      <span className="font-mono font-bold tabular-nums">+৳{resellerCommissionAmount}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-slate-800/80">
                    <span className="text-white">{language === 'bn' ? 'আপনার খরচ:' : 'Payable Net:'}</span>
                    <span className="text-emerald-400 font-mono text-lg tabular-nums">৳{netFlexiCost}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>{language === 'bn' ? 'রিচার্জ সম্পন্ন হচ্ছে...' : 'Executing Flexiload...'}</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>
                        {mode === 'reseller'
                          ? (language === 'bn' ? `৳${netFlexiCost} তে রিচার্জ সম্পন্ন করুন` : `Complete with Wallet (৳${netFlexiCost})`)
                          : (language === 'bn' ? `৳${amount} রিচার্জ করুন` : `Recharge ৳${amount} Now`)}
                      </span>
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* Quick Benefits Sidebar - 5 cols */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Percent className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? 'টেলিকম কমিশন রেট কার্ড' : 'Telecom Commission Rates'}</span>
                </h3>

                <div className="space-y-2 text-xs">
                  {[
                    { name: 'Banglalink', rate: '৩.২%', tag: 'সর্বোচ্চ লাভ' },
                    { name: 'Airtel & Teletalk', rate: '৩.৫%', tag: 'স্পেশাল রেট' },
                    { name: 'Robi Axiata', rate: '৩.০%', tag: 'অটো প্রসেসিং' },
                    { name: 'Grameenphone', rate: '২.৮%', tag: 'ইনস্ট্যান্ট' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300 font-medium">{item.name}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-emerald-400 font-bold">{item.rate}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">{item.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                  {language === 'bn'
                    ? '💡 রিসেলার মোডে রিচার্জ করলে কমিশন সরাসরি আপনার ওয়ালেটে ইনস্ট্যান্ট অ্যাডজাস্ট হয়ে যায়।'
                    : '💡 Reseller commissions are deducted instantly from the payable amount.'}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Drive Packs Browser */}
        {activeTab === 'drive' && (
          <div className="space-y-6">
            
            {/* Filter by Drive Type */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">{language === 'bn' ? 'প্যাক টাইপ:' : 'Pack Type:'}</span>
              {[
                { id: 'all', labelBn: 'সব ড্রাইভ প্যাক', labelEn: 'All Packs' },
                { id: 'internet', labelBn: 'ইন্টারনেট ড্রাইভ', labelEn: 'Internet Only' },
                { id: 'minute', labelBn: 'মিনিট বান্ডেল', labelEn: 'Minute Packs' },
                { id: 'combo', labelBn: 'কম্বো মেগা অফার', labelEn: 'Combo Bundles' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setDriveFilter(filter.id as any)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    driveFilter === filter.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {language === 'bn' ? filter.labelBn : filter.labelEn}
                </button>
              ))}
            </div>

            {/* Drives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDrives.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 uppercase tracking-wider">{pack.validity}</span>
                      {pack.tag && (
                        <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {pack.tag}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {language === 'bn' ? pack.titleBn : pack.titleEn}
                    </h4>

                    {/* Price Comparison */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>{language === 'bn' ? 'অফিশিয়াল টেলকো রেগুলার:' : 'Official Telco Price:'}</span>
                        <span className="line-through font-mono">৳{pack.regularPrice}</span>
                      </div>
                      <div className="flex items-center justify-between text-white font-medium">
                        <span>{language === 'bn' ? 'এক্সপ্লোর অফার মূল্য:' : 'Explore Offer Price:'}</span>
                        <span className="font-mono text-emerald-400 font-bold">৳{pack.offerPrice}</span>
                      </div>
                      {mode === 'reseller' && (
                        <div className="flex items-center justify-between text-amber-400 pt-1 border-t border-slate-800 font-semibold">
                          <span>{language === 'bn' ? 'রিসেলার ডিলার রেট:' : 'Wholesale Dealer:'}</span>
                          <span className="font-mono font-bold text-sm">৳{pack.wholesalePrice}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reseller Profit Callout */}
                  {mode === 'reseller' && (
                    <div className="bg-emerald-950/40 border border-emerald-800/40 p-2 rounded-lg text-xs flex items-center justify-between text-emerald-300">
                      <span>{language === 'bn' ? 'আপনার নগদ কমিশন/লাভ:' : 'Direct Dealer Profit:'}</span>
                      <span className="font-mono font-bold text-emerald-400">+৳{pack.commission}</span>
                    </div>
                  )}

                  {/* Order Button */}
                  <button
                    onClick={() => handleDriveOrder(pack)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      mode === 'reseller'
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <span>
                      {mode === 'reseller'
                        ? (language === 'bn' ? `৳${pack.wholesalePrice} তে সেল করুন (লাভ ৳${pack.commission})` : `Resell for ৳${pack.wholesalePrice}`)
                        : (language === 'bn' ? `৳${pack.offerPrice} তে কিনুন` : `Buy for ৳${pack.offerPrice}`)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
