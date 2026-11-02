import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { activeOrderSuccess, setActiveOrderSuccess, language } = useApp();
  const [copied, setCopied] = useState(false);

  if (!activeOrderSuccess) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl text-center">
        
        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800/80 mx-auto flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">
            {language === 'bn' ? 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!' : 'Order Placed Successfully!'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'bn'
              ? 'আপনার অর্ডার আইডি এবং ডেলিভারি কনফার্মেশন নিচে দেওয়া হলো'
              : 'Here is your order summary and delivery confirmation'}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-left space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-slate-400">
            <span>{language === 'bn' ? 'অর্ডার আইডি:' : 'Order ID:'}</span>
            <span className="font-mono text-white font-bold">{activeOrderSuccess.id}</span>
          </div>

          <div className="flex justify-between items-center text-slate-400">
            <span>{language === 'bn' ? 'আইটেম বিবরণ:' : 'Items:'}</span>
            <span className="text-white font-medium text-right line-clamp-1 max-w-[200px]">
              {activeOrderSuccess.itemsSummary}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-400">
            <span>{language === 'bn' ? 'মোট পেমেন্ট:' : 'Total Amount:'}</span>
            <span className="font-mono text-emerald-400 font-bold text-sm">
              ৳{activeOrderSuccess.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>

          {activeOrderSuccess.isResellerOrder && activeOrderSuccess.profitEarned && (
            <div className="flex justify-between items-center text-amber-400 pt-1 border-t border-slate-800/80 font-semibold">
              <span>{language === 'bn' ? 'আপনার অর্জিত লাভ:' : 'Reseller Profit:'}</span>
              <span className="font-mono">+৳{activeOrderSuccess.profitEarned.toLocaleString('en-IN')}</span>
            </div>
          )}

          {/* If Digital Voucher Available */}
          {activeOrderSuccess.deliveryDetails?.digitalVoucher && (
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">
                {language === 'bn' ? 'ডিজিটাল লাইসেন্স / ভাউচার কি:' : 'Digital Voucher Key:'}
              </span>
              <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono text-indigo-300">
                <span className="truncate pr-2">{activeOrderSuccess.deliveryDetails.digitalVoucher}</span>
                <button
                  onClick={() => handleCopy(activeOrderSuccess.deliveryDetails?.digitalVoucher || '')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 shrink-0 cursor-pointer p-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* If SMM Job or Recharge Tracking */}
          {activeOrderSuccess.deliveryDetails?.trackingCode && (
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-slate-400">
              <span>{language === 'bn' ? 'ট্র্যাকিং রেফারেন্স:' : 'Tracking Ref:'}</span>
              <span className="font-mono text-sky-400 font-semibold">{activeOrderSuccess.deliveryDetails.trackingCode}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveOrderSuccess(null)}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          {language === 'bn' ? 'ধন্যবাদ, হোমপেজে ফিরে যান' : 'Continue Shopping'}
        </button>

      </div>
    </div>
  );
};
