import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { History, Package, Zap, Share2, Smartphone, CheckCircle, Clock } from 'lucide-react';

export const OrderHistoryModal: React.FC = () => {
  const { orders, isOrderHistoryOpen, setIsOrderHistoryOpen, language } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'physical' | 'digital' | 'smm' | 'recharge'>('all');

  if (!isOrderHistoryOpen) return null;

  const filteredOrders = filterType === 'all'
    ? orders
    : orders.filter(o => o.type === filterType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'physical': return <Package className="w-4 h-4 text-indigo-400" />;
      case 'digital': return <Zap className="w-4 h-4 text-violet-400" />;
      case 'smm': return <Share2 className="w-4 h-4 text-sky-400" />;
      case 'recharge': return <Smartphone className="w-4 h-4 text-emerald-400" />;
      default: return <Package className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              {language === 'bn' ? 'অর্ডার ট্র্যাকিং ও হিস্ট্রি' : 'Order History & Tracking'}
            </h3>
            <span className="text-xs text-slate-400 font-mono">({orders.length})</span>
          </div>

          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Filter Strip */}
        <div className="flex items-center gap-2 p-3 border-b border-slate-800 bg-slate-900/40 overflow-x-auto text-xs">
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
              className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterType === f.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              কোনো অর্ডার পাওয়া যায়নি
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(ord.type)}
                    <span className="font-mono text-white font-bold">{ord.id}</span>
                    <span className="text-slate-500 font-mono">· {ord.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-medium">
                    {ord.status === 'completed' ? (
                      <span className="text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 font-mono text-[11px]">
                        <CheckCircle className="w-3 h-3" />
                        সম্পন্ন
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40 font-mono text-[11px]">
                        <Clock className="w-3 h-3" />
                        প্রসেসিং হচ্ছে
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-slate-300 font-medium leading-relaxed">
                  {ord.itemsSummary}
                </div>

                {/* Additional Details */}
                <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                  <div>
                    <span>প্রাপক: </span>
                    <span className="text-white">{ord.customerInfo.name} ({ord.customerInfo.phone})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {ord.profitEarned ? (
                      <span className="text-amber-400 font-bold">মুনাফা: +৳{ord.profitEarned}</span>
                    ) : null}
                    <span className="text-white font-bold text-xs">মোট: ৳{ord.totalAmount}</span>
                  </div>
                </div>

                {/* Vouchers / Tracking if present */}
                {ord.deliveryDetails?.digitalVoucher && (
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono text-indigo-300 flex items-center justify-between">
                    <span>ভাউচার: {ord.deliveryDetails.digitalVoucher}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">একটিভ</span>
                  </div>
                )}
                {ord.deliveryDetails?.trackingCode && (
                  <div className="text-[10px] text-sky-400 font-mono">
                    ট্র্যাকিং কোড: {ord.deliveryDetails.trackingCode}
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
