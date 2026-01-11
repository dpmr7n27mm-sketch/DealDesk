import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function AppShell() {
  const [viewMode, setViewMode] = useState('creator'); // 'creator' or 'buyer'
  const location = useLocation();

  const creatorNav = [
    { path: '/deals', label: 'Deals', icon: '◈' },
    { path: '/activity', label: 'Activity', icon: '◉' },
    { path: '/links', label: 'Links', icon: '◇' },
    { path: '/analytics', label: 'Analytics', icon: '▣' },
    { path: '/settings', label: 'Settings', icon: '⚙' },
  ];

  const buyerNav = [
    { path: '/store/demo', label: 'Store', icon: '◈' },
    { path: '/request/demo', label: 'Request', icon: '◇' },
    { path: '/deal/demo/action', label: 'Actions', icon: '▣' },
    { path: '/buyer', label: 'My Deals', icon: '◉' },
  ];

  const navItems = viewMode === 'creator' ? creatorNav : buyerNav;

  const currentPath = location.pathname;
  const getPageTitle = () => {
    const allItems = [...creatorNav, ...buyerNav];
    const match = allItems.find(n => currentPath === n.path || currentPath.startsWith(n.path.split('/')[1]));
    if (currentPath === '/' || currentPath === '/deals') return 'DEALS';
    if (match) return match.label.toUpperCase();
    return 'DEALDESK';
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Subtle grid background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black pointer-events-none" />

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-b border-white/5" />
          
          <div className="relative px-4 py-3 flex items-center justify-between">
            {/* View Toggle - Left */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
              <button
                onClick={() => setViewMode('creator')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-widest transition-all ${
                  viewMode === 'creator'
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                CREATOR
              </button>
              <button
                onClick={() => setViewMode('buyer')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-widest transition-all ${
                  viewMode === 'buyer'
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                BUYER
              </button>
            </div>

            {/* Page Title - Center */}
            <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-light tracking-[0.3em] text-white/60">
              {getPageTitle()}
            </h1>

            {/* User Avatar - Right */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-black text-xs font-bold">
                  KS
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-16 pb-24 px-4">
        <Outlet />
      </main>

      {/* Bottom Navigation - Glassmorphism Pill */}
      <nav className="fixed bottom-4 left-4 right-4 z-50">
        <div className="relative max-w-md mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />
          
          {/* Glass container */}
          <div className="relative bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-around px-2 py-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.path || 
                  (item.path === '/deals' && currentPath === '/') ||
                  currentPath.startsWith(item.path);
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {/* Icon with glow when active */}
                    <span className={`text-lg transition-all ${
                      isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''
                    }`}>
                      {item.icon}
                    </span>
                    
                    {/* Label */}
                    <span className={`text-[10px] font-medium tracking-wider uppercase transition-all ${
                      isActive ? 'text-cyan-400' : ''
                    }`}>
                      {item.label}
                    </span>
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
