import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Wallet, TrendingUp, Calculator, ShieldCheck, Key, Copy, Check, Award, Plus, Truck, DollarSign } from 'lucide-react';

interface ResellerDashboardPageProps {
  onBackToHome: () => void;
  onNavigateToCategory: (page: string) => void;
}

export const ResellerDashboardPage: React.FC<ResellerDashboardPageProps> = ({
  onBackToHome,
  onNavigateToCategory,
}) => {
  const {
    language,
    walletBalance,
    transactions,
    topUpWallet,
    orders,
    showToast,
    b2bUser,
    setIsB2BAuthModalOpen,
    logoutB2B,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'wallet' | 'calculator' | 'dropshipping' | 'api'>('overview');
  const [topUpAmount, setTopUpAmount] = useState<number>(1000);
  const [method, setMethod] = useState<string>('bKash (01712345678)');
  const [trxId, setTrxId] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('আমার ডিজিটাল শপ');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Profit Calculator States
  const [calcSubs, setCalcSubs] = useState<number>(30);
  const [calcDrives, setCalcDrives] = useState<number>(50);
  const [calcSmm, setCalcSmm] = useState<number>(20);
  const [calcPhysical, setCalcPhysical] = useState<number>(15);

  const subProfit = calcSubs * 650;
  const driveProfit = calcDrives * 85;
  const smmProfit = calcSmm * 150;
  const physicalProfit = calcPhysical * 500;
  const totalMonthlyProjected = subProfit + driveProfit + smmProfit + physicalProfit;

  // Real reseller orders stats
  const resellerOrders = orders.filter(o => o.isResellerOrder);
  const totalEarnedProfit = resellerOrders.reduce((sum, o) => sum + (o.profitEarned || 0), 0);

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim()) {
      showToast(language === 'bn' ? 'সঠিক Transaction ID (TrxID) দিন!' : 'Please enter valid TrxID');
      return;
    }
    const success = topUpWallet(topUpAmount, method.split(' ')[0], trxId);
    if (success) {
      setTrxId('');
      setActiveTab('wallet');
    }
  };

  const handleCopyApi = () => {
    navigator.clipboard?.writeText('exp_live_8841a09d3b14e2c99a810f');
    setCopiedKey(true);
    showToast(language === 'bn' ? 'API কী কপি হয়েছে!' : 'API key copied!');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="py-8 space-y-8">
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

          <div className="flex items-center gap-2 text-xs font-mono">
            {b2bUser ? (
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  {b2bUser.tier}: {b2bUser.id}
                </span>
                <button
                  onClick={logoutB2B}
                  className="text-slate-400 hover:text-rose-400 text-[11px] underline cursor-pointer"
                >
                  লগআউট
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsB2BAuthModalOpen(true)}
                className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs cursor-pointer hover:bg-amber-400 flex items-center gap-1.5 shadow-sm"
              >
                <span>Google দিয়ে B2B একাউন্ট খুলুন</span>
              </button>
            )}
          </div>
        </div>

        {/* B2B Merchant Profile Card if logged in, or Notice if not */}
        {b2bUser ? (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center font-bold text-white text-base">
                {b2bUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{b2bUser.name}</h3>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                    Google Verified ✓
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {b2bUser.email} · শপ: <span className="text-amber-300 font-medium">{b2bUser.shopName}</span>
                </div>
              </div>
            </div>

            <div className="text-right text-xs font-mono text-slate-400">
              API Key: <span className="text-indigo-400 font-semibold">{b2bUser.apiKey.slice(0, 16)}...</span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-amber-300 block">গুগল সাইনআপ আবশ্যক</span>
              <p className="text-slate-400">
                পাইকারি মূল্যে রিসেলিং করতে এবং ওয়ালেট ব্যবহার করতে আপনার গুগল একাউন্ট দিয়ে B2B একাউন্ট অ্যাক্টিভ করুন।
              </p>
            </div>
            <button
              onClick={() => setIsB2BAuthModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            >
              Google দিয়ে সাইনআপ করুন
            </button>
          </div>
        )}

        {/* Dashboard Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
              <Award className="w-4 h-4" />
              <span>{language === 'bn' ? 'এক্সপ্লোর রিসেলার কন্ট্রোল সেন্টার' : 'Explore Reseller Dashboard'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'আপনার ব্যবসা পরিচালনা ড্যাশবোর্ড' : 'Your Digital Commerce Center'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === 'bn'
                ? 'রিসেলার ওয়ালেট ম্যানেজ করুন, হোয়াইট-লেবেল ড্রপশিপিং কনফিগার করুন এবং ৪টি ক্যাটাগরির পণ্য পাইকারি মূল্যে বিক্রি করে মুনাফা অর্জন করুন।'
                : 'Manage your dealer wallet balance, white-label dropship shipping, and SMM API keys.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 text-xs">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-0.5">
              <span className="text-[10px] text-slate-400 block font-mono">উপলব্ধ ওয়ালেট ব্যালেন্স:</span>
              <span className="text-xl font-black text-emerald-400 font-mono tabular-nums">
                ৳{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-0.5">
              <span className="text-[10px] text-slate-400 block font-mono">মোট অর্জিত মুনাফা:</span>
              <span className="text-xl font-black text-amber-400 font-mono tabular-nums">
                ৳{(totalEarnedProfit + 7420).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
          {[
            { id: 'overview', labelBn: 'ওভারভিউ ও কুইক রিসেল', labelEn: 'Overview' },
            { id: 'wallet', labelBn: 'ওয়ালেট ও অ্যাড মানি', labelEn: 'Wallet & Top-up' },
            { id: 'calculator', labelBn: 'মুনাফা প্রজেকশন ক্যালকুলেটর', labelEn: 'Profit Calculator' },
            { id: 'dropshipping', labelBn: 'হোয়াইট-লেবেল ড্রপশিপিং', labelEn: 'Dropship Brand' },
            { id: 'api', labelBn: 'এসএমএম রিসেলার API', labelEn: 'SMM API' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* TAB 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 4 Quick Category Launchers for Wholesale */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3">
                {language === 'bn' ? 'পাইকারি মূল্যে অর্ডার করতে ক্যাটাগরি বেছে নিন:' : 'Select Category for Wholesale Reselling:'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'fashion-tech', name: 'ফ্যাশন ও টেক গ্যাজেট', desc: 'হুডি, টিডব্লিউএস, স্মার্টওয়াচ', profit: 'লাভ: ৳৫০০-১২০০/পিস' },
                  { id: 'digital-subscriptions', name: 'এআই ও ডিজিটাল টুলস', desc: 'ChatGPT, Claude, Canva', profit: 'লাভ: ৳২০০-৮০০/অর্ডার' },
                  { id: 'smm-panel', name: 'এস এম এম প্যানেল', desc: 'ফেসবুক, ইউটিউব, ইনস্টাগ্রাম', profit: 'লাভ: ৩০-৫০% মার্জিন' },
                  { id: 'mobile-recharge', name: 'মোবাইল রিচার্জ ও ড্রাইভ', desc: 'GP, BL, Robi, Airtel', profit: 'কমিশন: ৳৫০-১৩০/প্যাক' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigateToCategory(item.id)}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/70 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-semibold">{item.profit}</span>
                      <span className="text-amber-400 font-bold">পেজে যান →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reseller Order History */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'আপনার সাম্প্রতিক রিসেলিং অর্ডার সমূহ' : 'Recent Reseller Orders'}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {resellerOrders.length} {language === 'bn' ? 'টি অর্ডার' : 'Orders'}
                </span>
              </div>

              <div className="space-y-2">
                {resellerOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-white">{ord.itemsSummary}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {ord.id} · ক্লায়েন্ট: {ord.customerInfo.name} ({ord.customerInfo.phone})
                      </div>
                    </div>

                    <div className="flex items-center gap-4 font-mono text-right shrink-0">
                      <div>
                        <span className="text-[10px] text-slate-400 block">কেনা মূল্য</span>
                        <span className="text-white font-bold">৳{ord.totalAmount}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-400 block font-semibold">অর্জিত লাভ</span>
                        <span className="text-emerald-400 font-bold">+৳{ord.profitEarned || 0}</span>
                      </div>
                      <span className="bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded text-[10px]">
                        সম্পন্ন
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Wallet & Top-up */}
        {activeTab === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Top-up form - 7 cols */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? 'অটো ওয়ালেট ডিপোজিট' : 'Instant Wallet Top-up'}</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">০% ডিপোজিট ফি</span>
              </div>

              <form onSubmit={handleTopUpSubmit} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {language === 'bn' ? 'পেমেন্ট চ্যানেল সিলেক্ট করুন:' : 'Payment Channel:'}
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  >
                    <option value="bKash (01712345678)">bKash Merchant (01712345678) - পেমেন্ট / ক্যাশইন</option>
                    <option value="Nagad (01889911223)">Nagad Personal (01889911223) - সেন্ড মানি</option>
                    <option value="Rocket (01911223344-9)">Rocket (01911223344-9)</option>
                    <option value="USDT (TRC20 Wallet)">USDT Crypto TRC20 (Rate: $1 = ৳125)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-300">
                      {language === 'bn' ? 'রিচার্জের পরিমাণ (টাকা):' : 'Amount (BDT):'}
                    </label>
                    <span className="text-slate-400 font-mono">সর্বনিম্ন ১০০ টাকা</span>
                  </div>
                  <input
                    type="number"
                    min={100}
                    max={50000}
                    required
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base font-mono text-white"
                  />

                  <div className="flex flex-wrap gap-2 pt-1">
                    {[500, 1000, 2000, 5000, 10000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setTopUpAmount(amt)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          topUpAmount === amt
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        ৳{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {language === 'bn' ? 'ট্রানজেকশন আইডি (TrxID):' : 'Transaction ID (TrxID):'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9X29A10L88"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white uppercase placeholder-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
                >
                  {language === 'bn' ? 'ব্যালেন্স যোগ করুন' : 'Confirm Deposit'}
                </button>
              </form>
            </div>

            {/* Transactions Log - 5 cols */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">
                {language === 'bn' ? 'ওয়ালেট স্টেটমেন্ট' : 'Wallet Statement'}
              </h3>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="text-white font-medium">{tx.description}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{tx.date} · {tx.id}</div>
                    </div>
                    <div className={`font-mono font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {tx.amount > 0 ? `+৳${tx.amount}` : `-৳${Math.abs(tx.amount)}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Profit Calculator */}
        {activeTab === 'calculator' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>{language === 'bn' ? 'মাসিক সম্ভাব্য মুনাফা ক্যালকুলেটর' : 'Monthly Reseller Profit Projection'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'আপনার সেলস ভলিউম অনুযায়ী প্রতি মাসে আপনি কত টাকা মুনাফা করতে পারবেন তা স্লাইডার দিয়ে দেখে নিন।'
                  : 'Estimate your monthly net profit by adjusting sales targets across each category.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                
                <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">এআই সাবস্ক্রিপশন (ChatGPT/Claude/Gemini):</span>
                    <span className="font-mono text-white font-bold">{calcSubs} টি (লাভ: ৳{subProfit.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={150}
                    value={calcSubs}
                    onChange={(e) => setCalcSubs(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">মোবাইল রিচার্জ ও ড্রাইভ প্যাক:</span>
                    <span className="font-mono text-white font-bold">{calcDrives} টি (লাভ: ৳{driveProfit.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    value={calcDrives}
                    onChange={(e) => setCalcDrives(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

              </div>

              <div className="space-y-4">
                
                <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">এসএমএম প্যানেল সার্ভিসেস (ফলোয়ার্স/ভিউ):</span>
                    <span className="font-mono text-white font-bold">{calcSmm} টি (লাভ: ৳{smmProfit.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={calcSmm}
                    onChange={(e) => setCalcSmm(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">ফ্যাশন ও টেক গ্যাজেট ড্রপশিপিং:</span>
                    <span className="font-mono text-white font-bold">{calcPhysical} টি (লাভ: ৳{physicalProfit.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={calcPhysical}
                    onChange={(e) => setCalcPhysical(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

              </div>
            </div>

            {/* Total Callout Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-mono">সর্বমোট সম্ভাব্য মাসিক নিট ইনকাম:</span>
                <div className="text-3xl font-black text-emerald-400 font-mono tabular-nums">
                  ৳{totalMonthlyProjected.toLocaleString('en-IN')} / প্রতি মাসে
                </div>
              </div>
              <div className="text-xs text-slate-400 max-w-xs">
                কোনো অগ্রিম ইনভেন্টরি ছাড়াই সরাসরি কাস্টমারের কাছে পৌঁছে দিয়ে আপনি সম্পূর্ণ লাভ উপভোগ করতে পারেন।
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: Dropshipping White-Label Brand */}
        {activeTab === 'dropshipping' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 max-w-xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                <span>{language === 'bn' ? 'হোয়াইট-লেবেল কাস্টম ব্র্যান্ডিং' : 'White-Label Branding'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'আপনার কোনো পণ্যের ডেলিভারি প্যাকেটে Explore এর নাম থাকবে না, প্রেরক হিসেবে আপনার শপের নাম এবং হেল্পলাইন নম্বর থাকবে।'
                  : 'Courier delivery manifests will display your custom store details as sender.'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">
                  {language === 'bn' ? 'আপনার ব্র্যান্ড / শপের নাম:' : 'Your Brand/Shop Name:'}
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">
                  {language === 'bn' ? 'কাস্টমার কেয়ার হেল্পলাইন নম্বর:' : 'Support Hotline:'}
                </label>
                <input
                  type="tel"
                  defaultValue="01712998877"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <button
                onClick={() => showToast(language === 'bn' ? 'ব্র্যান্ড সেটিংস সফলভাবে আপডেট হয়েছে!' : 'Brand updated!')}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                {language === 'bn' ? 'ব্র্যান্ড তথ্য সেভ করুন' : 'Save Brand Configuration'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SMM API */}
        {activeTab === 'api' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-2xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-400" />
                <span>{language === 'bn' ? 'এস এম এম প্যানেল REST API v2' : 'SMM REST API v2'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'আপনার নিজের কোনো ওয়েবসাইট বা প্যানেল থাকলে এই API Key ব্যবহার করে সরাসরি আমাদের সাথে সিঙ্ক করতে পারেন।'
                  : 'Integrate external panels via REST endpoints.'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 block font-mono">Your Personal API Key:</span>
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-amber-400 text-xs">
                <span>exp_live_8841a09d3b14e2c99a810f</span>
                <button
                  onClick={handleCopyApi}
                  className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey ? 'কপাইড' : 'কপি'}</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-1 text-slate-400">
              <div className="text-white font-semibold">API Endpoint:</div>
              <div className="text-sky-400">POST https://api.explore-hub.com/v2/smm</div>
              <div className="pt-2 text-[11px]">Required headers: Authorization: Bearer exp_live_...</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
