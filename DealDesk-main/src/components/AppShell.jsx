import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

// Simple inline SVG icons
const Icons = {
  Deals: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Activity: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  Browse: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Requests: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  User: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
};

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine mode based on current path
  const isBuyerPath = location.pathname.startsWith('/buyer') || 
                      location.pathname.startsWith('/store') || 
                      location.pathname.startsWith('/request') ||
                      (location.pathname.startsWith('/deal/') && location.pathname.includes('/action'));
  
  const [isCreatorMode, setIsCreatorMode] = useState(!isBuyerPath);

  // Sync mode with route changes
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

  const creatorNavItems = [
    { path: '/', icon: Icons.Deals, label: 'Deals' },
    { path: '/activity', icon: Icons.Activity, label: 'Activity' },
    { path: '/links', icon: Icons.Links, label: 'Links' },
    { path: '/analytics', icon: Icons.Analytics, label: 'Analytics' },
    { path: '/settings', icon: Icons.Settings, label: 'Settings' },
  ];

  const buyerNavItems = [
    { path: '/buyer', icon: Icons.MyDeals, label: 'My Deals' },
    { path: '/store/browse', icon: Icons.Browse, label: 'Browse' },
    { path: '/request/new', icon: Icons.Requests, label: 'Requests' },
    { path: '/settings', icon: Icons.Settings, label: 'Settings' },
  ];

  const navItems = isCreatorMode ? creatorNavItems : buyerNavItems;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          {/* Creator/Buyer Toggle */}
          <div className="glass-toggle flex items-center p-1">
            <button
              onClick={() => handleModeToggle('creator')}
              className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-all rounded-full ${
                isCreatorMode
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Creator
            </button>
            <button
              onClick={() => handleModeToggle('buyer')}
              className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-all rounded-full ${
                !isCreatorMode
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Buyer
            </button>
          </div>

          {/* Avatar */}
          <button className="w-9 h-9 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-all">
            <Icons.User />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-28 px-4 min-h-screen">
        <div className="max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Nav Pill */}
      <nav className="fixed bottom-5 left-4 right-4 z-50 flex justify-center">
        <div className="glass-nav px-2 py-2 flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.path === '/' && location.pathname === '/deals');
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-4 py-2 min-w-[64px] rounded-full transition-all ${
                  isActive
                    ? 'text-cyan-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className={isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''}>
                  <Icon />
                </span>
                <span className={`text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap mt-1 ${
                  isActive ? 'text-cyan-400' : ''
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
