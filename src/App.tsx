/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FashionTechPage } from './pages/FashionTechPage';
import { DigitalSubscriptionsPage } from './pages/DigitalSubscriptionsPage';
import { SmmPanelPage } from './pages/SmmPanelPage';
import { MobileRechargePage } from './pages/MobileRechargePage';
import { ResellerDashboardPage } from './pages/ResellerDashboardPage';
import { OrdersPage } from './pages/OrdersPage';
import { CartDrawer } from './components/CartDrawer';
import { ResellerHubModal } from './components/ResellerHubModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { B2BAuthModal } from './components/B2BAuthModal';
import { Footer } from './components/Footer';
import { FuturisticBottomNav } from './components/FuturisticBottomNav';
import { Product } from './types';

export type PageRoute =
  | 'home'
  | 'categories'
  | 'fashion-tech'
  | 'digital-subscriptions'
  | 'smm-panel'
  | 'mobile-recharge'
  | 'reseller'
  | 'orders';

const MainAppContent: React.FC = () => {
  const { toastMessage } = useApp();

  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [initialSubFilter, setInitialSubFilter] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [exploreRefreshKey, setExploreRefreshKey] = useState<number>(0);

  // Sync with browser hash if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validPages: PageRoute[] = [
        'home',
        'categories',
        'fashion-tech',
        'digital-subscriptions',
        'smm-panel',
        'mobile-recharge',
        'reseller',
        'orders',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: string, subCategory: string = 'all') => {
    const target = page as PageRoute;
    setCurrentPage(target);
    setInitialSubFilter(subCategory);
    window.location.hash = target === 'home' ? '' : target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshExplore = () => {
    setExploreRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative">
      
      {/* Primary Sticky Top Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Page Routing Views with balanced bottom padding for the floating dock */}
      <main className="flex-1 w-full overflow-x-hidden pb-28 sm:pb-32">
        
        {currentPage === 'home' && (
          <HomePage
            key={`explore-home-${exploreRefreshKey}`}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToCategory={navigateTo}
          />
        )}

        {currentPage === 'fashion-tech' && (
          <FashionTechPage
            onBackToHome={() => navigateTo('home')}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            initialSubCategory={initialSubFilter}
          />
        )}

        {currentPage === 'digital-subscriptions' && (
          <DigitalSubscriptionsPage
            onBackToHome={() => navigateTo('home')}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            initialSubCategory={initialSubFilter}
          />
        )}

        {currentPage === 'smm-panel' && (
          <SmmPanelPage
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'mobile-recharge' && (
          <MobileRechargePage
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'reseller' && (
          <ResellerDashboardPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToCategory={navigateTo}
          />
        )}

        {currentPage === 'orders' && (
          <OrdersPage
            onBackToHome={() => navigateTo('home')}
          />
        )}

      </main>

      {/* Premium Futuristic Floating Bottom Navigation Bar (1st reference design) */}
      <FuturisticBottomNav
        currentPage={currentPage}
        onNavigate={navigateTo}
        onRefreshExplore={handleRefreshExplore}
      />

      {/* Global Modals & Drawers */}
      <B2BAuthModal />
      <CartDrawer />
      <ResellerHubModal />
      <OrderSuccessModal />
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Global Footer with bottom spacing */}
      <Footer onNavigate={navigateTo} />

      {/* Toast Notification positioned safely above floating navigation dock */}
      {toastMessage && (
        <div className="fixed bottom-24 right-5 z-50 bg-slate-900 text-white border border-slate-700/80 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
