import React, { useState, useEffect } from 'react';
import { Home, LayoutGrid, RotateCw, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export type NavTabId = 'home' | 'category' | 'explore' | 'cart' | 'me';

interface FuturisticBottomNavProps {
  currentPage: string;
  onNavigate: (page: string, subCategory?: string) => void;
  onRefreshExplore?: () => void;
}

export const FuturisticBottomNav: React.FC<FuturisticBottomNavProps> = ({
  currentPage,
  onNavigate,
  onRefreshExplore,
}) => {
  const {
    cart,
    setIsCartOpen,
    isCartOpen,
    b2bUser,
    setIsB2BAuthModalOpen,
    showToast,
    language,
  } = useApp();

  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Sync active tab with current page / cart drawer status
  useEffect(() => {
    if (isCartOpen) {
      setActiveTab('cart');
    } else if (
      currentPage === 'categories' ||
      currentPage === 'fashion-tech' ||
      currentPage === 'digital-subscriptions' ||
      currentPage === 'smm-panel' ||
      currentPage === 'mobile-recharge'
    ) {
      setActiveTab('category');
    } else if (currentPage === 'reseller' || currentPage === 'orders') {
      setActiveTab('me');
    } else if (currentPage === 'home') {
      // If we didn't just explicitly click Explore, keep Home as active
      if (activeTab !== 'explore') {
        setActiveTab('home');
      }
    }
  }, [currentPage, isCartOpen]);

  // Define exactly 5 navigation items in the exact required order
  const NAV_ITEMS: {
    id: NavTabId;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5 transition-transform duration-300" />,
    },
    {
      id: 'category',
      label: 'Category',
      icon: <LayoutGrid className="w-5 h-5 transition-transform duration-300" />,
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: (
        <RotateCw
          className={`w-5 h-5 transition-all duration-700 ${
            isRefreshing ? 'animate-spin text-white' : ''
          }`}
        />
      ),
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: (
        <div className="relative">
          <ShoppingCart className="w-5 h-5 transition-transform duration-300" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center ring-1 ring-slate-950 animate-pulse">
              {totalCartCount}
            </span>
          )}
        </div>
      ),
    },
    {
      id: 'me',
      label: 'Me',
      icon: <User className="w-5 h-5 transition-transform duration-300" />,
    },
  ];

  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeTab);

  const handleItemClick = (id: NavTabId) => {
    setActiveTab(id);

    switch (id) {
      case 'home':
        onNavigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'category':
        onNavigate('categories');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'explore': {
        // Special Explore Action: Debounced refresh of home content
        const now = Date.now();
        if (now - lastRefreshTime < 1000) {
          return; // Prevent accidental spam clicks
        }
        setLastRefreshTime(now);
        setIsRefreshing(true);

        onNavigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (onRefreshExplore) {
          onRefreshExplore();
        }

        showToast(
          language === 'bn'
            ? '✨ এক্সপ্লোর ফিড রিফ্রেশ হয়েছে!'
            : '✨ Explore content refreshed!'
        );

        setTimeout(() => {
          setIsRefreshing(false);
        }, 800);
        break;
      }

      case 'cart':
        setIsCartOpen(true);
        break;

      case 'me':
        if (b2bUser) {
          onNavigate('reseller');
        } else {
          setIsB2BAuthModalOpen(true);
        }
        break;
    }
  };

  return (
    <div
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-[430px] sm:max-w-[450px] pointer-events-auto select-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Outer ambient electric-blue halo glow behind the capsule */}
      <div className="absolute -inset-1 rounded-[36px] bg-blue-600/25 blur-lg pointer-events-none -z-10" />

      {/* Main Wide Horizontal Capsule Navigation Container */}
      <nav
        className="relative h-[66px] sm:h-[70px] rounded-[34px] flex items-center justify-between px-2 shadow-2xl transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, rgba(11, 23, 56, 0.92) 0%, rgba(4, 10, 26, 0.97) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(59, 130, 246, 0.45)',
          boxShadow: `
            0 14px 40px -6px rgba(0, 80, 240, 0.45),
            0 0 20px 2px rgba(14, 165, 233, 0.2),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.28),
            inset 0 -2px 6px 0 rgba(0, 30, 90, 0.5)
          `,
        }}
        aria-label="Futuristic Bottom Navigation"
      >
        {/* Active Sliding Glowing Circle Indicator (The Protruding Button) */}
        {activeIndex !== -1 && (
          <div
            className="absolute pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] -top-[16px] sm:-top-[18px] z-10"
            style={{
              left: `calc(${activeIndex * 20}% + 10% - 31px)`,
              width: '62px',
              height: '62px',
            }}
          >
            {/* Layer 1: Ambient Electric Glow Aura */}
            <div className="absolute -inset-2.5 rounded-full bg-cyan-400/40 blur-xl animate-pulse -z-10" />

            {/* Layer 2: Main Protruding Glass Sphere with Radial Electric Gradient */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 50% 28%, #38bdf8 0%, #1d4ed8 55%, #050e24 100%)',
                border: '2px solid rgba(125, 211, 252, 0.95)',
                boxShadow: `
                  0 0 24px rgba(0, 180, 255, 0.85),
                  0 0 12px rgba(56, 189, 248, 0.95),
                  inset 0 2px 4px 0 rgba(255, 255, 255, 0.7),
                  inset 0 -3px 6px 0 rgba(0, 0, 0, 0.6)
                `,
              }}
            >
              {/* Layer 3: Glossy Top Highlight Crescent */}
              <div className="absolute top-0 inset-x-0 h-[48%] rounded-t-full bg-gradient-to-b from-white/45 via-white/10 to-transparent pointer-events-none" />

              {/* Layer 4: Inner Cyan Orbit Ring */}
              <div className="absolute inset-1.5 rounded-full border border-cyan-300/30 pointer-events-none" />
            </div>
          </div>
        )}

        {/* 5 Navigation Item Buttons */}
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="relative w-1/5 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group active:scale-95 focus:outline-none z-20"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon Container with Elevation Animation */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? '-translate-y-5 text-white scale-110 drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]'
                    : 'text-slate-400 opacity-75 group-hover:text-slate-200 group-hover:opacity-100'
                }`}
              >
                {item.icon}
              </div>

              {/* Exact Text Label underneath */}
              <span
                className={`text-[10px] font-semibold tracking-wide transition-all duration-300 select-none ${
                  isActive
                    ? 'text-cyan-300 font-bold -translate-y-1 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]'
                    : 'text-slate-400/80 group-hover:text-slate-200 translate-y-0'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
