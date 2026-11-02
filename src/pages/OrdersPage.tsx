import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, History, Package, Zap, Share2, Smartphone, CheckCircle, Clock, Copy, Check, Search } from 'lucide-react';

interface OrdersPageProps {
  onBackToHome: () => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ onBackToHome }) => {
  const { orders, language, showToast } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'physical' | 'digital' | 'smm' | 'recharge'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchType = filterType === 'all' ? true : o.type === filterType;
    if (!matchType) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchSummary = o.itemsSummary.toLowerCase().includes(q);
      const matchCustomer = o.customerInfo.name.toLowerCase().includes(q) || o.customerInfo.phone.includes(q);
      return matchId || matchSummary || matchCustomer;
    }
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'physical': return <Package className="w-4 h-4 text-indigo-400" />;
      case 'digital': return <Zap className="w-4 h-4 text-violet-400" />;
      case 'smm': return <Share2 className="w-4 h-4 text-sky-400" />;
      case 'recharge': return <Smartphone className="w-4 h-4 text-emerald-400" />;
      default: return <Package className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleCopy = (key: string) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    showToast(language === 'bn' ? 'ভাউচার কি কপি করা হয়েছে!' : 'Voucher copied!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

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
            {orders.length} {language === 'bn' ? 'টি মোট অর্ডার' : 'Total Orders'}
          </div>
        </div>

        {/* Page Title Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400">
              <History className="w-4 h-4" />
              <span>{language === 'bn' ? 'অর্ডার পোর্টাল' : 'Orders & Vault'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'bn' ? 'অর্ডার ট্র্যাকিং ও ভাউচার ভল্ট' : 'Order Tracking & Digital Vault'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === 'bn'
                ? 'আপনার সম্পন্ন হওয়া এবং চলতি সকল অর্ডারের লাইভ ট্র্যাকিং স্ট্যাটাস, কুরিয়ার স্লিপ এবং এআই সাবস্ক্রিপশন ভাউচার কি দেখুন।'
                : 'View real-time status, digital license keys, courier delivery tracking and recharge receipts.'}
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'সকল অর্ডার' },
              { id: 'digital', label: 'ডিজিটাল ও এআই' },
              { id: 'smm', label: 'এসএমএম জবস' },
              { id: 'recharge', label: 'মোবাইল রিচার্জ' },
              { id: 'physical', label: 'ফ্যাশন ও টেক' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  filterType === f.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'অর্ডার আইডি বা মোবাইল নম্বর দিয়ে খুঁজুন...' : 'Search by ID or phone...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="py-20 text-center space-y-2 bg-slate-900/40 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-400">
                {language === 'bn' ? 'কোনো অর্ডার খুঁজে পাওয়া যায়নি।' : 'No orders found matching filters.'}
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      {getTypeIcon(ord.type)}
                    </div>
                    <div>
                      <div className="font-mono text-white font-bold text-sm">{ord.id}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{ord.createdAt}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    {ord.isResellerOrder && (
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                        রিসেলার অর্ডার
                      </span>
                    )}

                    {ord.status === 'completed' ? (
                      <span className="text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60 text-xs font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        সম্পন্ন
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/60 text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        প্রসেসিং হচ্ছে
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm text-white font-medium">
                  {ord.itemsSummary}
                </div>

                {/* Receiver Info & Pricing summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div>
                    <span className="text-[10px] block font-mono">কাস্টমার / গ্রাহক:</span>
                    <span className="text-white font-medium">{ord.customerInfo.name} ({ord.customerInfo.phone})</span>
                  </div>

                  <div>
                    <span className="text-[10px] block font-mono">পেমেন্ট মেথড:</span>
                    <span className="text-slate-300 uppercase font-mono">{ord.paymentMethod}</span>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-[10px] block font-mono">মোট মূল্য:</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">৳{ord.totalAmount}</span>
                    {ord.profitEarned ? (
                      <span className="text-amber-400 block text-[11px] font-mono">মুনাফা: +৳{ord.profitEarned}</span>
                    ) : null}
                  </div>
                </div>

                {/* Digital Voucher Key Box */}
                {ord.deliveryDetails?.digitalVoucher && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-indigo-900/40 flex items-center justify-between font-mono text-xs text-indigo-300">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-indigo-400" />
                      <span>লাইসেন্স ভাউচার কি: <strong className="text-white">{ord.deliveryDetails.digitalVoucher}</strong></span>
                    </div>

                    <button
                      onClick={() => handleCopy(ord.deliveryDetails?.digitalVoucher || '')}
                      className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
                    >
                      {copiedKey === ord.deliveryDetails.digitalVoucher ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">কপাইড</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>কপি করুন</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Tracking code */}
                {ord.deliveryDetails?.trackingCode && (
                  <div className="text-xs font-mono text-sky-400 flex items-center gap-2">
                    <span>ট্র্যাকিং রেফারেন্স: <strong>{ord.deliveryDetails.trackingCode}</strong></span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
