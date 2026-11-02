import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Star, ShieldCheck, Zap, Truck, Check, Share2 } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const { mode, language, addToCart, setIsCartOpen, showToast } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentPrice = mode === 'reseller' ? product.wholesalePrice : product.retailPrice;
  const profit = product.retailPrice - product.wholesalePrice;
  const marginPct = Math.round((profit / product.retailPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Product Image Showcase */}
        <div className="md:w-1/2 bg-slate-950 relative min-h-[260px] md:min-h-full">
          <img
            src={product.image}
            alt={product.nameEn}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent md:hidden" />
          
          <div className="absolute top-3 left-3">
            <span className="bg-slate-900/90 text-slate-200 border border-slate-700/80 px-2.5 py-1 rounded-md text-xs font-semibold backdrop-blur-sm">
              {product.deliveryType === 'instant' ? '⚡ ইনস্ট্যান্ট অ্যাক্টিভেশন' : '📦 কুরিয়ার ডেলিভারি'}
            </span>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Module */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold font-mono">{product.rating}</span>
                <span className="text-slate-500 font-mono">({Math.floor(product.rating * 42)} রিভিউ)</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <h3 className="text-lg font-bold text-white leading-snug">
              {language === 'bn' ? product.nameBn : product.nameEn}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn' ? product.descriptionBn : product.descriptionEn}
            </p>

            {/* Feature Bullet Points */}
            <div className="space-y-1.5 pt-1">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Price Box */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">
                    {mode === 'reseller' ? 'পাইকারি রিসেলার রেট:' : 'খুচরা বিক্রয় মূল্য:'}
                  </span>
                  <div className="text-2xl font-black text-white font-mono tabular-nums">
                    ৳{currentPrice.toLocaleString('en-IN')}
                  </div>
                </div>

                {mode === 'reseller' && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">সম্ভাব্য নিট মুনাফা:</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">
                      +৳{profit.toLocaleString('en-IN')} ({marginPct}%)
                    </span>
                  </div>
                )}
              </div>

              {product.warrantyText && (
                <div className="text-[11px] text-indigo-300 flex items-center gap-1.5 pt-1 border-t border-slate-800/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{product.warrantyText}</span>
                </div>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">পরিমাণ:</span>
              <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-400 hover:text-white text-xs"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-mono font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white text-xs"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {added ? <Check className="w-4 h-4 text-emerald-400" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{added ? 'কার্টে যোগ হয়েছে' : 'কার্টে যোগ করুন'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  mode === 'reseller'
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                <span>{mode === 'reseller' ? 'রিসেল অর্ডার করুন' : 'এখনই কিনুন'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
