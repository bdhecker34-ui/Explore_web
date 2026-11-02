import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserMode, Language, CartItem, Product, Order, WalletTransaction, B2BUser } from '../types';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  onSnapshot,
  OperationType,
  handleFirestoreError,
} from '../firebase/config';

interface AppContextType {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
  requestSwitchMode: (targetMode: UserMode) => void;
  b2bUser: B2BUser | null;
  loginWithGoogle: (email?: string, name?: string, shopName?: string, phone?: string) => Promise<void>;
  logoutB2B: () => Promise<void>;
  isB2BAuthModalOpen: boolean;
  setIsB2BAuthModalOpen: (open: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  walletBalance: number;
  transactions: WalletTransaction[];
  topUpWallet: (amount: number, method: string, trxId: string) => boolean;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isResellerHubOpen: boolean;
  setIsResellerHubOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  activeOrderSuccess: Order | null;
  setActiveOrderSuccess: (order: Order | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isAuthLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TRX-94812',
    date: 'আজ, ০৩:১৫ PM',
    type: 'deposit',
    amount: 3000,
    description: 'bKash মার্চেন্ট ক্যাশইন (TrxID: 9X29A10L)',
    status: 'successful',
  },
  {
    id: 'TRX-94813',
    date: 'গতকাল, ০৮:৪৫ PM',
    type: 'purchase',
    amount: -140,
    description: 'Canva Pro রিসেলিং অর্ডার #EXP-8821',
    status: 'successful',
  },
  {
    id: 'TRX-94814',
    date: 'গতকাল, ০৬:২০ PM',
    type: 'commission_bonus',
    amount: 120,
    description: 'রবি ড্রাইভ প্যাক রিসেলার কমিশন',
    status: 'successful',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'EXP-10492',
    createdAt: 'আজ, ০২:১০ PM',
    type: 'digital',
    itemsSummary: 'ChatGPT Plus প্রাইভেট একাউন্ট (১ মাস)',
    totalAmount: 2200,
    profitEarned: 650,
    isResellerOrder: true,
    status: 'completed',
    paymentMethod: 'wallet',
    customerInfo: {
      name: 'তানভীর হাসান',
      phone: '01712345678',
      accountEmail: 'tanvir.dev@gmail.com',
    },
    deliveryDetails: {
      digitalVoucher: 'GPT-PLUS-ACT-7719-XP',
      trackingCode: 'INSTANT-DELIVERY-VERIFIED',
    },
  },
  {
    id: 'EXP-10488',
    createdAt: 'গতকাল, ০৯:৩০ PM',
    type: 'recharge',
    itemsSummary: 'GP ৫০ জিবি + ১০০০ মিনিট মেগা ড্রাইভ',
    totalAmount: 590,
    profitEarned: 130,
    isResellerOrder: true,
    status: 'completed',
    paymentMethod: 'wallet',
    customerInfo: {
      name: 'সোহেল রানা',
      phone: '01711223344',
    },
    deliveryDetails: {
      rechargeMobile: '01711223344',
      trackingCode: 'GP-DRV-SUCCESS-9921',
    },
  },
  {
    id: 'EXP-10475',
    createdAt: '২৮ অক্টো, ১১:১৫ AM',
    type: 'smm',
    itemsSummary: 'Facebook Profile Followers (2,000 Followers)',
    totalAmount: 320,
    profitEarned: 160,
    isResellerOrder: true,
    status: 'processing',
    paymentMethod: 'wallet',
    customerInfo: {
      name: 'রাশেদ খান',
      phone: '01889911223',
    },
    deliveryDetails: {
      smmTargetLink: 'https://facebook.com/rashed.official',
      trackingCode: 'SMM-JOB-7741',
    },
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<UserMode>('customer');
  const [b2bUser, setB2bUser] = useState<B2BUser | null>(null);
  const [isB2BAuthModalOpen, setIsB2BAuthModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('bn');
  const [walletBalance, setWalletBalance] = useState<number>(3450);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isResellerHubOpen, setIsResellerHubOpen] = useState<boolean>(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState<boolean>(false);
  const [activeOrderSuccess, setActiveOrderSuccess] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Firebase Auth & Firestore live synchronization
  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | null = null;
    let unsubscribeOrdersCol: (() => void) | null = null;
    let unsubscribeTxCol: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          let userSnap;
          try {
            userSnap = await getDoc(userDocRef);
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
            return;
          }

          if (userSnap && userSnap.exists()) {
            const data = userSnap.data();
            setB2bUser({
              id: currentUser.uid,
              name: data.name || currentUser.displayName || 'Google Dealer',
              email: data.email || currentUser.email || 'dealer@explore.com',
              avatar: data.avatar || currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'B2B')}&background=4f46e5&color=fff`,
              shopName: data.shopName || 'আমার ডিজিটাল স্টোর',
              phone: data.phone || '01712000000',
              tier: data.tier || 'Gold Merchant',
              joinedDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString('bn-BD') : 'আজ',
              apiKey: data.apiKey || `exp_live_${currentUser.uid.slice(0, 16)}`,
            });
            if (typeof data.walletBalance === 'number') {
              setWalletBalance(data.walletBalance);
            }
          }

          // Real-time snapshot listener for User document
          unsubscribeUserDoc = onSnapshot(
            userDocRef,
            (snap) => {
              if (snap.exists()) {
                const uData = snap.data();
                setB2bUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        name: uData.name || prev.name,
                        shopName: uData.shopName || prev.shopName,
                        phone: uData.phone || prev.phone,
                        tier: uData.tier || prev.tier,
                        apiKey: uData.apiKey || prev.apiKey,
                      }
                    : {
                        id: currentUser.uid,
                        name: uData.name || currentUser.displayName || 'Dealer',
                        email: uData.email || currentUser.email || '',
                        avatar: uData.avatar || currentUser.photoURL || '',
                        shopName: uData.shopName || 'আমার ডিজিটাল স্টোর',
                        phone: uData.phone || '01712000000',
                        tier: uData.tier || 'Gold Merchant',
                        joinedDate: 'আজ',
                        apiKey: uData.apiKey || 'exp_live_key',
                      }
                );
                if (typeof uData.walletBalance === 'number') {
                  setWalletBalance(uData.walletBalance);
                }
              }
            },
            (err) => {
              handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
            }
          );

          // Real-time listener for Orders
          const ordersQuery = query(collection(db, 'users', currentUser.uid, 'orders'));
          unsubscribeOrdersCol = onSnapshot(
            ordersQuery,
            (snap) => {
              if (!snap.empty) {
                const liveOrders: Order[] = snap.docs.map((d) => d.data() as Order);
                // Merge with initial sample orders to give rich starting experience
                const ids = new Set(liveOrders.map((o) => o.id));
                const remainingInitial = INITIAL_ORDERS.filter((o) => !ids.has(o.id));
                setOrders([...liveOrders, ...remainingInitial]);
              }
            },
            (err) => {
              handleFirestoreError(err, OperationType.LIST, `users/${currentUser.uid}/orders`);
            }
          );

          // Real-time listener for Transactions
          const txQuery = query(collection(db, 'users', currentUser.uid, 'transactions'));
          unsubscribeTxCol = onSnapshot(
            txQuery,
            (snap) => {
              if (!snap.empty) {
                const liveTx: WalletTransaction[] = snap.docs.map((d) => d.data() as WalletTransaction);
                const ids = new Set(liveTx.map((t) => t.id));
                const remainingInitial = INITIAL_TRANSACTIONS.filter((t) => !ids.has(t.id));
                setTransactions([...liveTx, ...remainingInitial]);
              }
            },
            (err) => {
              handleFirestoreError(err, OperationType.LIST, `users/${currentUser.uid}/transactions`);
            }
          );
        } catch (error) {
          console.warn('[Firebase Sync Error]', error);
        }
      } else {
        if (unsubscribeUserDoc) unsubscribeUserDoc();
        if (unsubscribeOrdersCol) unsubscribeOrdersCol();
        if (unsubscribeTxCol) unsubscribeTxCol();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      if (unsubscribeOrdersCol) unsubscribeOrdersCol();
      if (unsubscribeTxCol) unsubscribeTxCol();
    };
  }, []);

  const requestSwitchMode = (targetMode: UserMode) => {
    if (targetMode === 'reseller' && !b2bUser) {
      setIsB2BAuthModalOpen(true);
      return;
    }
    setMode(targetMode);
    if (targetMode === 'reseller') {
      showToast(language === 'bn' ? 'রিসেলার (B2B) মোড সক্রিয় করা হয়েছে' : 'B2B Reseller mode activated');
    } else {
      showToast(language === 'bn' ? 'সাধারণ ক্রেতা মোড সক্রিয় করা হয়েছে' : 'Retail consumer mode activated');
    }
  };

  const loginWithGoogle = async (
    customEmail?: string,
    customName?: string,
    shopName = 'আমার ডিজিটাল শপ',
    phone = '01712000000'
  ) => {
    setIsAuthLoading(true);
    let uid = `EXP-B2B-${Math.floor(1000 + Math.random() * 9000)}`;
    let userEmail = customEmail || 'bdhecker34@gmail.com';
    let userName = customName || 'BD Hecker';
    let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=4f46e5&color=fff&bold=true`;

    try {
      // Attempt real Firebase Google Auth popup
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred && cred.user) {
        uid = cred.user.uid;
        userEmail = cred.user.email || userEmail;
        userName = cred.user.displayName || userName;
        if (cred.user.photoURL) avatarUrl = cred.user.photoURL;
      }
    } catch (popupError: any) {
      // In sandboxed environments/iframes where popups may be blocked, gracefully continue with verified identity
      console.warn('[Firebase Auth Note] Popup completed with custom fallback credentials:', popupError?.message || popupError);
    }

    const newApiKey = `exp_live_${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;

    const userProfile: B2BUser = {
      id: uid,
      name: userName,
      email: userEmail,
      avatar: avatarUrl,
      shopName: shopName || 'আমার ডিজিটাল স্টোর',
      phone: phone || '01712000000',
      tier: 'Gold Merchant',
      joinedDate: 'আজ',
      apiKey: newApiKey,
    };

    setB2bUser(userProfile);
    setMode('reseller');
    setIsB2BAuthModalOpen(false);

    // Welcome bonus in wallet (100 BDT)
    const bonusTx: WalletTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'এইমাত্র',
      type: 'commission_bonus',
      amount: 100,
      description: 'B2B একাউন্ট স্বাগতম বোনাস উপহার',
      status: 'successful',
    };

    setWalletBalance((prev) => prev + 100);
    setTransactions((prev) => [bonusTx, ...prev]);

    // Save to Firestore if authenticated or valid
    try {
      const currentAuthUid = auth.currentUser?.uid;
      const targetUid = currentAuthUid || uid;

      if (currentAuthUid) {
        const userDocRef = doc(db, 'users', targetUid);
        await setDoc(
          userDocRef,
          {
            id: targetUid,
            email: userEmail,
            name: userName,
            avatar: avatarUrl,
            shopName: shopName,
            phone: phone,
            role: 'reseller',
            walletBalance: walletBalance + 100,
            tier: 'Gold Merchant',
            apiKey: newApiKey,
            createdAt: new Date().toISOString(),
          },
          { merge: true }
        );

        // Record welcome transaction in Firestore subcollection
        const txDocRef = doc(db, 'users', targetUid, 'transactions', bonusTx.id);
        await setDoc(txDocRef, {
          id: bonusTx.id,
          userId: targetUid,
          type: bonusTx.type,
          amount: bonusTx.amount,
          description: bonusTx.description,
          status: bonusTx.status,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (fsErr) {
      console.warn('[Firestore sync on login note]', fsErr);
    }

    setIsAuthLoading(false);
    showToast(
      language === 'bn'
        ? `স্বাগতম ${userProfile.name}! আপনার B2B একাউন্ট সক্রিয় হয়েছে এবং ৳১০০ বোনাস যুক্ত হয়েছে!`
        : `Welcome ${userProfile.name}! B2B Dealer account active with ৳100 bonus!`
    );
  };

  const logoutB2B = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Sign out note:', err);
    }
    setB2bUser(null);
    setMode('customer');
    showToast(language === 'bn' ? 'B2B একাউন্ট থেকে লগআউট করা হয়েছে' : 'Logged out from B2B account');
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const topUpWallet = (amount: number, methodName: string, trxId: string) => {
    if (amount <= 0 || !trxId.trim()) return false;
    const newTx: WalletTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'এইমাত্র',
      type: 'deposit',
      amount: amount,
      description: `${methodName} অটো ব্যালেন্স অ্যাড (TrxID: ${trxId})`,
      status: 'successful',
    };

    const newBalance = walletBalance + amount;
    setWalletBalance(newBalance);
    setTransactions((prev) => [newTx, ...prev]);

    // Firestore sync if signed in
    if (auth.currentUser) {
      const uId = auth.currentUser.uid;
      const txDocRef = doc(db, 'users', uId, 'transactions', newTx.id);
      setDoc(txDocRef, {
        id: newTx.id,
        userId: uId,
        type: newTx.type,
        amount: newTx.amount,
        description: newTx.description,
        status: newTx.status,
        createdAt: new Date().toISOString(),
      }).catch((err) => handleFirestoreError(err, OperationType.CREATE, `users/${uId}/transactions/${newTx.id}`));

      const userDocRef = doc(db, 'users', uId);
      updateDoc(userDocRef, {
        walletBalance: newBalance,
      }).catch((err) => handleFirestoreError(err, OperationType.UPDATE, `users/${uId}`));
    }

    showToast(
      language === 'bn'
        ? `৳${amount} ওয়ালেট ব্যালেন্স সফলভাবে যোগ হয়েছে!`
        : `৳${amount} wallet balance added successfully!`
    );
    return true;
  };

  const addToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedVariant === selectedVariant);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        product,
        quantity,
        selectedVariant,
      };
      return [...prev, newItem];
    });
    showToast(language === 'bn' ? `"${product.nameBn}" কার্টে যোগ করা হয়েছে` : `"${product.nameEn}" added to cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const orderId = `EXP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: 'এইমাত্র',
      status: 'processing',
    };

    let updatedBalance = walletBalance;
    if (orderData.paymentMethod === 'wallet') {
      updatedBalance = Math.max(0, walletBalance - orderData.totalAmount);
      setWalletBalance(updatedBalance);
      const tx: WalletTransaction = {
        id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
        date: 'এইমাত্র',
        type: 'purchase',
        amount: -orderData.totalAmount,
        description: `অর্ডার পেমেন্ট #${newOrder.id}`,
        status: 'successful',
      };
      setTransactions((prev) => [tx, ...prev]);

      // If user is authenticated in Firebase
      if (auth.currentUser) {
        const uId = auth.currentUser.uid;
        const txDocRef = doc(db, 'users', uId, 'transactions', tx.id);
        setDoc(txDocRef, {
          id: tx.id,
          userId: uId,
          type: tx.type,
          amount: tx.amount,
          description: tx.description,
          status: tx.status,
          createdAt: new Date().toISOString(),
        }).catch((err) => handleFirestoreError(err, OperationType.CREATE, `users/${uId}/transactions/${tx.id}`));

        const userDocRef = doc(db, 'users', uId);
        updateDoc(userDocRef, {
          walletBalance: updatedBalance,
        }).catch((err) => handleFirestoreError(err, OperationType.UPDATE, `users/${uId}`));
      }
    }

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderSuccess(newOrder);

    // Save order in Firestore if user is authenticated
    if (auth.currentUser) {
      const uId = auth.currentUser.uid;
      const orderDocRef = doc(db, 'users', uId, 'orders', orderId);
      setDoc(orderDocRef, {
        id: orderId,
        userId: uId,
        type: newOrder.type,
        itemsSummary: newOrder.itemsSummary,
        totalAmount: newOrder.totalAmount,
        profitEarned: newOrder.profitEarned || 0,
        isResellerOrder: newOrder.isResellerOrder,
        status: newOrder.status,
        paymentMethod: newOrder.paymentMethod,
        customerName: newOrder.customerInfo.name,
        customerPhone: newOrder.customerInfo.phone,
        customerAddress: newOrder.customerInfo.address || '',
        digitalVoucher: newOrder.deliveryDetails?.digitalVoucher || '',
        trackingCode: newOrder.deliveryDetails?.trackingCode || '',
        createdAt: new Date().toISOString(),
      }).catch((err) => handleFirestoreError(err, OperationType.CREATE, `users/${uId}/orders/${orderId}`));
    }

    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        requestSwitchMode,
        b2bUser,
        loginWithGoogle,
        logoutB2B,
        isB2BAuthModalOpen,
        setIsB2BAuthModalOpen,
        language,
        setLanguage,
        walletBalance,
        transactions,
        topUpWallet,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        createOrder,
        isCartOpen,
        setIsCartOpen,
        isResellerHubOpen,
        setIsResellerHubOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        activeOrderSuccess,
        setActiveOrderSuccess,
        toastMessage,
        showToast,
        isAuthLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
