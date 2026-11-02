import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Wallet, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    mode,
    language,
    walletBalance,
    createOrder,
    showToast,
    setIsResellerHubOpen,
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'bkash' | 'nagad' | 'cod'>('wallet');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  // Calculate pricing based on mode
  const totalPrice = cart.reduce((sum, item) => {
    const unitPrice = mode === 'reseller' ? item.product.wholesalePrice : item.product.retailPrice;
    return sum + (unitPrice * item.quantity);
  }, 0);

  const retailEquivalentTotal = cart.reduce((sum, item) => {
    return sum + (item.product.retailPrice * item.quantity);
  }, 0);

  const resellerProfit = mode === 'reseller' ? Math.max(0, retailEquivalentTotal - totalPrice) : 0;

  const hasPhysicalGoods = cart.some(item => item.product.deliveryType === 'courier');
  const hasDigitalGoods = cart.some(item => item.product.deliveryType === 'instant');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    if (!customerPhone.trim()) {
      showToast(language === 'bn' ? 'অনুগ্রহ করে মোবাইল নম্বর প্রদান করুন!' : 'Please enter contact phone number!');
      return;
    }

    if (paymentMethod === 'wallet' && walletBalance < totalPrice) {
      showToast(language === 'bn' ? 'ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই! রিচার্জ করুন অথবা বিকাশ/নগদ নির্বাচন করুন।' : 'Insufficient wallet balance! Please top up or choose bKash.');
      setIsResellerHubOpen(true);
      return;
    }

    setIsCheckingOut(true);

    const summaryText = cart.map(i => `${i.product.nameBn} (x${i.quantity})`).join(', ');

    setTimeout(() => {
      createOrder({
        type: hasPhysicalGoods ? 'physical' : 'digital',
        itemsSummary: summaryText,
        totalAmount: totalPrice,
        profitEarned: resellerProfit,
        isResellerOrder: mode === 'reseller',
        paymentMethod: paymentMethod,
        customerInfo: {
          name: customerName || (mode === 'reseller' ? 'ড্রপশিপিং ক্লায়েন্ট' : 'সম্মানিত ক্রেতা'),
          phone: customerPhone,
          address: customerAddress,
          accountEmail: customerEmail,
        },
        deliveryDetails: {
          trackingCode: hasPhysicalGoods ? `COURIER-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
          digitalVoucher: hasDigitalGoods ? `EXP-KEY-${Math.floor(1000 + Math.random() * 9000)}-ACT` : undefined,
        },
      });

      clearCart();
      setIsCheckingOut(false);
      setIsCartOpen(false);
      showToast(language === 'bn' ? 'অর্ডার সফলভাবে কনফার্ম হয়েছে!' : 'Order placed successfully!');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl">
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              {language === 'bn' ? 'আপনার শপিং ব্যাগ' : 'Your Shopping Bag'}
            </h3>
            <span className="text-xs text-slate-400 font-mono">({cart.length})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-400">
                {language === 'bn' ? 'আপনার শপিং ব্যাগ বর্তমানে খালি রয়েছে' : 'Your bag is empty right now'}
              </p>
            </div>
          ) : (
            cart.map((item) => {
              const unitPrice = mode === 'reseller' ? item.product.wholesalePrice : item.product.retailPrice;
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.nameEn}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-white truncate">
                      {language === 'bn' ? item.product.nameBn : item.product.nameEn}
                    </h4>
                    <div className="text-[11px] font-mono text-slate-400">
                      {mode === 'reseller' ? (
                        <span className="text-amber-400 font-semibold">হোলসেল: ৳{unitPrice}</span>
                      ) : (
                        <span>৳{unitPrice}</span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white tabular-nums px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-xs font-black font-mono text-white tabular-nums">
                      ৳{(unitPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {/* Reseller Profit Box in Cart */}
          {mode === 'reseller' && cart.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>সাধারণ খুচরা মূল্য:</span>
                <span className="line-through font-mono">৳{retailEquivalentTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold border-t border-amber-900/30 pt-1">
                <span>রিসেলিং থেকে আপনার নিট লাভ:</span>
                <span className="font-mono text-sm">+৳{resellerProfit.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* Checkout Info Form */}
          {cart.length > 0 && (
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  {mode === 'reseller' 
                    ? (language === 'bn' ? 'ড্রপশিপিং কাস্টমার ডেলিভারি তথ্য' : 'Dropshipping Delivery Details')
                    : (language === 'bn' ? 'ডেলিভারি ও যোগাযোগ তথ্য' : 'Delivery & Contact Details')}
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder={language === 'bn' ? 'গ্রাহকের পুরো নাম' : 'Full Name'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
                />

                <input
                  type="tel"
                  required
                  placeholder={language === 'bn' ? 'মোবাইল নম্বর (01XXXXXXXXX)' : 'Phone Number'}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 font-mono"
                />

                {hasDigitalGoods && (
                  <input
                    type="email"
                    placeholder={language === 'bn' ? 'জিমেইল / ইমেইল (ডিজিটাল এক্টিভেশনের জন্য)' : 'Email (for digital access)'}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                )}

                {hasPhysicalGoods && (
                  <textarea
                    rows={2}
                    required
                    placeholder={language === 'bn' ? 'সম্পূর্ণ ডেলিভারি ঠিকানা (জেলা, থানা, বাসা নং)' : 'Full delivery address'}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  {language === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন:' : 'Payment Method:'}
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {mode === 'reseller' && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-2 rounded-lg border text-left flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'wallet'
                          ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span>রিসেলার ওয়ালেট</span>
                      <span className="text-[10px] font-mono">৳{walletBalance}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2 rounded-lg border text-left flex items-center justify-between cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-500 bg-pink-950/30 text-pink-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <span>bKash / বিকাশ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2 rounded-lg border text-left flex items-center justify-between cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-amber-500 bg-amber-950/30 text-amber-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <span>Nagad / নগদ</span>
                  </button>

                  {hasPhysicalGoods && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2 rounded-lg border text-left flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span>ক্যাশ অন ডেলিভারি</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Drawer Actions */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{language === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
              <span className="text-xl font-black text-white font-mono tabular-nums">
                ৳{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isCheckingOut}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'reseller'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {isCheckingOut ? (
                <span>{language === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Confirming Order...'}</span>
              ) : (
                <>
                  <span>
                    {mode === 'reseller'
                      ? (language === 'bn' ? 'রিসেলার অর্ডার সম্পন্ন করুন' : 'Confirm Wholesale Order')
                      : (language === 'bn' ? 'অর্ডার কনফার্ম করুন' : 'Proceed to Checkout')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
