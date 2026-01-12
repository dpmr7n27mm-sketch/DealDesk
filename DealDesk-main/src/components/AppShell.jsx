import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  Link2,
  BarChart3,
  Settings,
  ShoppingBag,
  Search,
  FileText,
  User
} from 'lucide-react';

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
    { path: '/', icon: LayoutDashboard, label: 'Deals' },
    { path: '/activity', icon: Activity, label: 'Activity' },
    { path: '/links', icon: Link2, label: 'Links' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const buyerNavItems = [
    { path: '/buyer', icon: ShoppingBag, label: 'My Deals' },
    { path: '/store/browse', icon: Search, label: 'Browse' },
    { path: '/request/new', icon: FileText, label: 'Requests' },
    { path: '/settings', icon: Settings, label: 'Settings' },
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
            <User className="w-4 h-4 text-slate-300" />
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
                <Icon 
                  className={`w-5 h-5 mb-1 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap ${
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
