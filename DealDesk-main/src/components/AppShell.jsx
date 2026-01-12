import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

// ============================================
// ICON COMPONENTS
// ============================================

const Icons = {
  Deals: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Activity: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Links: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  MyDeals: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Store: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  Request: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
};

// ============================================
// NAVIGATION CONFIGURATION
// ============================================

const creatorNavItems = [
  { path: '/', icon: Icons.Deals, label: 'Deals' },
  { path: '/activity', icon: Icons.Activity, label: 'Activity' },
  { path: '/links', icon: Icons.Links, label: 'Links' },
  { path: '/analytics', icon: Icons.Analytics, label: 'Analytics' },
  { path: '/settings', icon: Icons.Settings, label: 'Settings' },
];

const buyerNavItems = [
  { path: '/buyer', icon: Icons.MyDeals, label: 'My Deals' },
  { path: '/store/demo', icon: Icons.Store, label: 'Store' },
  { path: '/request/demo', icon: Icons.Request, label: 'Request' },
  { path: '/settings', icon: Icons.Settings, label: 'Settings' },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isBuyerPath = 
    location.pathname.startsWith('/buyer') || 
    location.pathname.startsWith('/store') || 
    location.pathname.startsWith('/request') ||
    (location.pathname.startsWith('/deal/') && location.pathname.includes('/action'));
  
  const [isCreatorMode, setIsCreatorMode] = useState(!isBuyerPath);

  useEffect(() => {
    setIsCreatorMode(!isBuyerPath);
  }, [isBuyerPath]);

  const handleModeToggle = (mode) => {
    if (mode === 'creator' && !isCreatorMode) {
      setIsCreatorMode(true);
      navigate('/');
    } else if (mode === 'buyer' && isCreatorMode) {
      setIsCreatorMode(false);
      navigate('/buyer');
    }
  };

  const navItems = isCreatorMode ? creatorNavItems : buyerNavItems;

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/deals';
    }
    return location.pathname.startsWith(path);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/' || path === '/deals') return 'Deals';
    if (path.startsWith('/deals/')) return 'Deal Details';
    if (path === '/activity') return 'Activity';
    if (path === '/links') return 'Deal Links';
    if (path === '/stems') return 'Stems Codes';
    if (path === '/analytics') return 'Analytics';
    if (path === '/invites') return 'Invites';
    if (path === '/connections') return 'Connections';
    if (path === '/delivery') return 'Delivery';
    if (path === '/settings') return 'Settings';
    if (path === '/email-preview') return 'Email Preview';
    
    if (path === '/buyer') return 'My Deals';
    if (path.startsWith('/store/')) return 'Store';
    if (path.startsWith('/request/')) return 'New Request';
    if (path.includes('/action')) return 'Deal Portal';
    
    return 'DealDesk';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ==========================================
          FIXED HEADER
          ========================================== */}
      <header className="fixed top-0 left-0 right-0 z-header px-4 py-3 safe-area-top">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          
          {/* Creator/Buyer Toggle */}
          <div className="glass-toggle flex items-center p-1 gap-0.5">
            <button
              onClick={() => handleModeToggle('creator')}
              className={`px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase transition-all duration-200 rounded-full ${
                isCreatorMode
                  ? 'gradient-accent text-white shadow-lg glow-accent-subtle'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Creator
            </button>
            <button
              onClick={() => handleModeToggle('buyer')}
              className={`px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase transition-all duration-200 rounded-full ${
                !isCreatorMode
                  ? 'gradient-accent text-white shadow-lg glow-accent-subtle'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Buyer
            </button>
          </div>

          {/* Page Title - centered on mobile */}
          <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-300 tracking-wide uppercase hidden sm:block">
            {getPageTitle()}
          </h1>

          {/* Avatar - Purple-Red Gradient with Glass */}
          <button className="w-9 h-9 rounded-full glass-avatar flex items-center justify-center text-white font-bold text-xs hover:scale-105 transition-transform">
            KS
          </button>
        </div>
      </header>

      {/* ==========================================
          MAIN CONTENT AREA
          ========================================== */}
      <main className="flex-1 pt-16 pb-24 px-4 min-h-screen">
        <div className="max-w-screen-xl mx-auto">
          {/* Mobile Page Title */}
          <h1 className="text-lg font-bold text-white tracking-tight mb-4 sm:hidden">
            {getPageTitle()}
          </h1>
          
          {/* Route Content */}
          <Outlet />
        </div>
      </main>

      {/* ==========================================
          BOTTOM NAVIGATION PILL
          ========================================== */}
      <nav className="fixed bottom-4 left-4 right-4 z-nav flex justify-center pb-safe">
        <div className="glass-nav px-3 py-2 flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-4 py-2 min-w-[60px] rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-violet-400'
                    : 'text-slate-500 hover:text-slate-300 active:scale-95'
                }`}
                style={isActive ? { filter: 'drop-shadow(0 0 8px rgba(109, 40, 217, 0.6))' } : {}}
              >
                <span className={`transition-all duration-200 ${isActive ? 'scale-110' : ''}`}>
                  <Icon />
                </span>
                <span className={`text-[9px] font-semibold tracking-wider uppercase mt-1`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full mt-0.5 gradient-accent shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
