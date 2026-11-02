import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Star, Zap, Shield, Eye, ArrowUpRight, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuickView }) => {
  const { mode, language, addToCart } = useApp();
  const [addedAnim, setAddedAnim] = useState(false);

  const profitAmount = product.retailPrice - product.wholesalePrice;
  const marginPercent = Math.round((profitAmount / product.retailPrice) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <div 
      onClick={() => onOpenQuickView(product)}
      className="group relative bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-slate-950/60"
    >
      
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.nameEn}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Subtle Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

        {/* Top Badges / Metadata */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-medium">
          {product.deliveryType === 'instant' ? (
            <span className="bg-violet-950/90 text-violet-300 border border-violet-800/70 px-2 py-0.5 rounded flex items-center gap-1 font-semibold backdrop-blur-sm">
              <Zap className="w-3 h-3 text-violet-400" />
              {language === 'bn' ? '১ মিনিটে ডেলিভারি' : 'Instant 60s'}
            </span>
          ) : (
            <span className="bg-slate-900/90 text-slate-300 border border-slate-700/60 px-2 py-0.5 rounded backdrop-blur-sm">
              {language === 'bn' ? 'কুরিয়ার ডেলিভারি' : 'Express Courier'}
            </span>
          )}

          <div className="flex items-center gap-1 bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800 text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="font-mono tabular-nums text-xs font-semibold">{product.rating}</span>
          </div>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white hover:bg-slate-800 text-xs flex items-center gap-1"
            title="বিস্তারিত দেখুন"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[11px]">{language === 'bn' ? 'বিস্তারিত' : 'View'}</span>
          </button>
        </div>

      </div>

      {/* Card Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
            {product.warrantyText || (language === 'bn' ? '১০০% অফিশিয়াল' : '100% Genuine')}
          </div>
          <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors leading-snug">
            {language === 'bn' ? product.nameBn : product.nameEn}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {language === 'bn' ? product.descriptionBn : product.descriptionEn}
          </p>
        </div>

        {/* Dynamic Pricing Box: Customer vs Reseller Mode */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          
          {mode === 'customer' ? (
            /* Customer View */
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'bn' ? 'মূল্য' : 'Price'}</span>
                <span className="text-lg font-black text-white font-mono tabular-nums">
                  ৳{product.retailPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                {language === 'bn' ? 'স্টকে আছে ✓' : 'In Stock'}
              </div>
            </div>
          ) : (
            /* Reseller B2B View */
            <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{language === 'bn' ? 'পাইকারি কেনা:' : 'Wholesale Cost:'}</span>
                <span className="text-amber-400 font-black font-mono tabular-nums text-sm">
                  ৳{product.wholesalePrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-amber-900/30 pt-1">
                <span className="text-emerald-400 font-medium">{language === 'bn' ? 'আপনার সম্ভাব্য লাভ:' : 'Reseller Profit:'}</span>
                <span className="text-emerald-400 font-bold font-mono tabular-nums">
                  +৳{profitAmount.toLocaleString('en-IN')} ({marginPercent}%)
                </span>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAdd}
              className={`flex-1 py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                addedAnim
                  ? 'bg-emerald-600 text-white'
                  : mode === 'reseller'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {addedAnim ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'যোগ হয়েছে!' : 'Added!'}</span>
                </>
              ) : mode === 'reseller' ? (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'হোলসেলে নিন' : 'Order Wholesale'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Bag'}</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenQuickView(product);
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="বিস্তারিত"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
