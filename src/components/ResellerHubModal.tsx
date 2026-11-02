import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, Plus, ArrowUpRight, Award, ShieldCheck, Key, Calculator, Copy, Check, TrendingUp } from 'lucide-react';

export const ResellerHubModal: React.FC = () => {
  const {
    language,
    walletBalance,
    transactions,
    topUpWallet,
    isResellerHubOpen,
    setIsResellerHubOpen,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wallet' | 'calculator' | 'dropship-branding'>('wallet');
  const [topUpAmount, setTopUpAmount] = useState<number>(1000);
  const [method, setMethod] = useState<string>('bKash (01712345678)');
  const [trxId, setTrxId] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('আমার ডিজিটাল শপ');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Calculator states
  const [calcSubs, setCalcSubs] = useState<number>(30); // monthly AI subs sold
  const [calcDrives, setCalcDrives] = useState<number>(50); // monthly drives
  const [calcSmm, setCalcSmm] = useState<number>(20); // monthly smm orders
  const [calcPhysical, setCalcPhysical] = useState<number>(15); // monthly gadgets/hoodies

  // Estimated monthly profits
  const subProfit = calcSubs * 650; // avg 650 tk profit
  const driveProfit = calcDrives * 85; // avg 85 tk profit
  const smmProfit = calcSmm * 150; // avg 150 tk profit
  const physicalProfit = calcPhysical * 500; // avg 500 tk profit
  const totalMonthlyProjected = subProfit + driveProfit + smmProfit + physicalProfit;

  if (!isResellerHubOpen) return null;

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim()) {
      showToast(language === 'bn' ? 'সঠিক Transaction ID (TrxID) দিন!' : 'Please enter valid TrxID');
      return;
    }
    const success = topUpWallet(topUpAmount, method.split(' ')[0], trxId);
    if (success) {
      setTrxId('');
    }
  };

  const handleCopyApi = () => {
    navigator.clipboard?.writeText('exp_live_8841a09d3b14e2c99a810f');
    setCopiedKey(true);
    showToast(language === 'bn' ? 'API কী কপি হয়েছে!' : 'API key copied!');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Modal Topbar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? 'এক্সপ্লোর রিসেলার কন্ট্রোল সেন্টার' : 'Explore Reseller Hub'}
                </h3>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                  GOLD DEALER
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Reseller ID: EXP-RS-88419 · {language === 'bn' ? 'হোলসেল অ্যাক্টিভ' : 'Wholesale Tier Active'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsResellerHubOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-5 border-b border-slate-800 bg-slate-900/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab('wallet')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors cursor-pointer ${
              activeTab === 'wallet'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'bn' ? 'ওয়ালেট ও ডিপোজিট' : 'Wallet & Top-up'}
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors cursor-pointer ${
              activeTab === 'calculator'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'bn' ? 'মুনাফা ক্যালকুলেটর' : 'Profit Calculator'}
          </button>
          <button
            onClick={() => setActiveTab('dropship-branding')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors cursor-pointer ${
              activeTab === 'dropship-branding'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'bn' ? 'ড্রপশিপিং ব্র্যান্ডিং' : 'Dropship Custom Brand'}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Wallet & Deposit */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              
              {/* Wallet Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-amber-400/80 font-medium">
                    {language === 'bn' ? 'বর্তমান রিসেলার ফান্ড ব্যালেন্স' : 'Available Reseller Balance'}
                  </span>
                  <div className="text-3xl font-black text-white font-mono tabular-nums tracking-tight">
                    ৳{walletBalance.toLocaleString('en-IN')}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'bn' ? 'অর্ডার করার সাথে সাথে ইনস্ট্যান্ট পেমেন্ট সুবিধা' : 'Instant 1-click order checkout'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-right">
                    <span className="text-[10px] text-slate-400 block">{language === 'bn' ? 'সর্বমোট লাভ' : 'Lifetime Profit'}</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">+৳৭,৪২০</span>
                  </div>
                </div>
              </div>

              {/* Add Balance Form */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'ব্যালেন্স রিচার্জ / অ্যাড মানি' : 'Add Reseller Funds'}</span>
                </h4>

                <form onSubmit={handleTopUpSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Payment Method */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 block">{language === 'bn' ? 'পেমেন্ট মেথড:' : 'Payment Channel:'}</label>
                      <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="bKash (01712345678)">bKash Merchant (01712345678)</option>
                        <option value="Nagad (01889911223)">Nagad Personal (01889911223)</option>
                        <option value="Rocket (01911223344-9)">Rocket (01911223344-9)</option>
                        <option value="USDT (TRC20 Wallet)">USDT Crypto TRC20</option>
                      </select>
                    </div>

                    {/* Amount */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 block">{language === 'bn' ? 'টাকার পরিমাণ:' : 'Amount (BDT):'}</label>
                      <input
                        type="number"
                        min={100}
                        max={50000}
                        required
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                    </div>

                  </div>

                  {/* TrxID */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 block">
                      {language === 'bn' ? 'ট্রানজেকশন আইডি (TrxID):' : 'Transaction ID (TrxID):'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9X29A10L88"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white uppercase placeholder-slate-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    {language === 'bn' ? 'অটো ব্যালেন্স কনফার্ম করুন' : 'Confirm Balance Deposit'}
                  </button>
                </form>
              </div>

              {/* Transactions List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {language === 'bn' ? 'সাম্প্রতিক ওয়ালেট লেনদেন' : 'Recent Wallet Transactions'}
                </h4>
                <div className="space-y-2">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs"
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

          {/* TAB 2: Profit Calculator */}
          {activeTab === 'calculator' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-slate-300 space-y-1">
                <div className="text-indigo-400 font-bold flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>{language === 'bn' ? 'রিসেলিং ইনকাম ও মাসিক প্রফিট প্রজেকশন' : 'Monthly Reselling Profit Projection'}</span>
                </div>
                <p>
                  {language === 'bn'
                    ? 'আপনি প্রতি মাসে কতগুলো সার্ভিস বা প্রোডাক্ট রিসেল করতে চান তা সিলেক্ট করে আপনার সম্ভাব্য মাসিক আয় দেখুন।'
                    : 'Adjust the sliders to estimate your potential monthly profit across all 4 categories.'}
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">এআই সাবস্ক্রিপশন (ChatGPT/Claude/Gemini) রিসেল:</span>
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

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">মোবাইল রিচার্জ ও ড্রাইভ প্যাক রিসেল:</span>
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

                <div className="space-y-1.5">
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

                <div className="space-y-1.5">
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

              {/* Grand Total Projected Monthly Income */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-800/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">{language === 'bn' ? 'সম্ভাব্য মাসিক মোট লাভ:' : 'Total Projected Profit:'}</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
                    ৳{totalMonthlyProjected.toLocaleString('en-IN')} / মাস
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-amber-300 bg-amber-500/10 px-2 py-1 rounded font-semibold border border-amber-500/20">
                    জিরো ইনভেস্টমেন্ট রিসেলিং
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Dropship Custom Brand */}
          {activeTab === 'dropship-branding' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'হোয়াইট-লেবেল ড্রপশিপিং সেটিংস' : 'White-Label Dropshipping Settings'}
                </h4>
                <p className="text-slate-400">
                  {language === 'bn'
                    ? 'আপনি যখন কোনো কাস্টমারের জন্য কুরিয়ারে পণ্য পাঠাবেন, প্যাকেটের উপর প্রেরক হিসেবে Explore এর বদলে আপনার ব্র্যান্ডের নাম ও ফোন নাম্বার থাকবে।'
                    : 'When you place a dropship order, parcel labels will show your brand name and phone number as the sender.'}
                </p>

                <div className="space-y-1">
                  <label className="text-slate-300 block font-semibold">
                    {language === 'bn' ? 'আপনার শপ / পেজের নাম:' : 'Your Shop Name:'}
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 block font-semibold">
                    {language === 'bn' ? 'কাস্টমার কেয়ার হেল্পলাইন নম্বর:' : 'Customer Care Phone:'}
                  </label>
                  <input
                    type="tel"
                    defaultValue="01712998877"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <button
                  onClick={() => showToast(language === 'bn' ? 'ব্র্যান্ড সেটিংস সেভ করা হয়েছে!' : 'Brand settings saved!')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  {language === 'bn' ? 'ব্র্যান্ডিং ইনফো সেভ করুন' : 'Save Dropship Brand'}
                </button>
              </div>

              {/* SMM API Key Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>আপনার পার্সোনাল API Key</span>
                  </span>
                  <button
                    onClick={handleCopyApi}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    {copiedKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey ? 'কপাইড!' : 'কপি করুন'}</span>
                  </button>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg font-mono text-[11px] text-slate-300 border border-slate-800 select-all">
                  exp_live_8841a09d3b14e2c99a810f
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
