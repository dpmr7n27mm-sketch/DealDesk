import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 'deals', path: '/deals', label: 'Deals', icon: '📋', badge: 12 },
    { id: 'activity', path: '/activity', label: 'Activity', icon: '🔔', badge: 3 },
    { id: 'connections', path: '/connections', label: 'Connections', icon: '🤝' },
    { id: 'links', path: '/links', label: 'Deal Links', icon: '🔗' },
    { id: 'stems', path: '/stems', label: 'Stems Codes', icon: '🎛️' },
    { id: 'analytics', path: '/analytics', label: 'Analytics', icon: '📊' },
    { id: 'invites', path: '/invites', label: 'Invites', icon: '✉️' },
    { id: 'delivery', path: '/delivery', label: 'Delivery', icon: '📦' },
    { id: 'settings', path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const currentPath = location.pathname;
  const currentNav = navItems.find(n => currentPath === n.path || currentPath.startsWith(n.path + '/'));
  const pageTitle = currentNav?.label || (currentPath === '/' ? 'Deals' : 'DealDesk');

  // Close sidebar when navigating on mobile
  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-40
        bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          <NavLink to="/" className="flex items-center gap-3" onClick={handleNavClick}>
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-slate-900 font-bold text-lg font-mono">D</span>
            </div>
            <span className="font-display text-white text-xl font-bold tracking-wide">
              DealDesk
            </span>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive || (item.path === '/deals' && location.pathname === '/')
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50 border border-transparent'
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <span className="flex-1 text-left text-sm font-semibold truncate">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-700 text-slate-300">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
              KS
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">KVNG SAUCE</p>
              <p className="text-slate-500 text-xs truncate">Trusted Creator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 px-4 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              ☰
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="font-display text-lg sm:text-xl font-bold text-white truncate tracking-tight">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <NavLink 
                to="/deals" 
                className="px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                + New Deal
              </NavLink>
              <NavLink 
                to="/activity"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 transition-colors relative flex-shrink-0"
              >
                🔔
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">3</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
