import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================
// MOCK DATA
// ============================================

const sampleDeals = [
  {
    id: 1,
    type: 'License',
    requester: 'sarah.chen@universalmusic.com',
    track: 'Midnight Drive',
    status: 'New',
    amount: null,
    submitted: '2 hours ago',
    deadline: 'Jan 15, 2026'
  },
  {
    id: 2,
    type: 'Stems',
    requester: 'dj.nova@gmail.com',
    track: 'Neon Pulse',
    status: 'Offer Sent',
    amount: 450,
    submitted: '1 day ago',
    deadline: 'Jan 20, 2026'
  },
  {
    id: 3,
    type: 'Commission',
    requester: 'creative@nike.com',
    track: '30s Brand Anthem',
    status: 'Paid',
    amount: 8500,
    submitted: '3 days ago',
    deadline: 'Feb 1, 2026'
  },
  {
    id: 4,
    type: 'Custom Version',
    requester: 'editor@netflix.com',
    track: 'Midnight Drive (60s Edit)',
    status: 'Waiting Payment',
    amount: 1200,
    submitted: '4 days ago',
    deadline: 'Jan 18, 2026'
  },
  {
    id: 5,
    type: 'License',
    requester: 'sync@spotifyads.com',
    track: 'Summer Haze',
    status: 'In Review',
    amount: null,
    submitted: '5 days ago',
    deadline: 'Jan 25, 2026'
  },
  {
    id: 6,
    type: 'Stems',
    requester: 'remix.artist@proton.me',
    track: 'Electric Dreams',
    status: 'Delivered',
    amount: 300,
    submitted: '1 week ago',
    deadline: 'Jan 10, 2026'
  },
  {
    id: 7,
    type: 'Commission',
    requester: 'podcast@gimletmedia.com',
    track: 'Intro Theme',
    status: 'Needs Info',
    amount: null,
    submitted: '1 week ago',
    deadline: 'Jan 30, 2026'
  },
  {
    id: 8,
    type: 'License',
    requester: 'blocked.user@spam.com',
    track: 'Neon Pulse',
    status: 'Declined',
    amount: null,
    submitted: '2 weeks ago',
    deadline: 'Jan 5, 2026'
  }
];

// ============================================
// STATUS & TYPE CONFIGURATIONS
// ============================================

const statusConfig = {
  'New': 'status-new',
  'In Review': 'status-review',
  'Needs Info': 'status-info',
  'Offer Sent': 'status-offer',
  'Waiting Payment': 'status-waiting',
  'Paid': 'status-paid',
  'Delivered': 'status-delivered',
  'Closed': 'status-closed',
  'Declined': 'status-declined',
  'Blocked': 'status-blocked',
};

const typeConfig = {
  'License': { class: 'type-license', icon: '◈' },
  'Stems': { class: 'type-stems', icon: '◉' },
  'Commission': { class: 'type-commission', icon: '▣' },
  'Custom Version': { class: 'type-custom', icon: '◇' },
};

const filters = ['All', 'New', 'Waiting on Me', 'Waiting on Buyer', 'Paid', 'Delivered'];

// ============================================
// MAIN COMPONENT
// ============================================

export default function DealsListDashboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter deals based on search and filter
  const filteredDeals = sampleDeals.filter(deal => {
    const matchesSearch = searchQuery === '' || 
      deal.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.track.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'New') matchesFilter = deal.status === 'New';
    else if (activeFilter === 'Waiting on Me') matchesFilter = ['New', 'In Review', 'Needs Info'].includes(deal.status);
    else if (activeFilter === 'Waiting on Buyer') matchesFilter = ['Offer Sent', 'Waiting Payment'].includes(deal.status);
    else if (activeFilter === 'Paid') matchesFilter = deal.status === 'Paid';
    else if (activeFilter === 'Delivered') matchesFilter = deal.status === 'Delivered';
    
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    active: sampleDeals.filter(d => !['Closed', 'Declined', 'Blocked', 'Expired'].includes(d.status)).length,
    needsAction: sampleDeals.filter(d => ['New', 'In Review', 'Needs Info'].includes(d.status)).length,
    pendingPayment: sampleDeals.filter(d => d.status === 'Waiting Payment').reduce((sum, d) => sum + (d.amount || 0), 0),
    thisMonth: sampleDeals.filter(d => d.status === 'Paid').reduce((sum, d) => sum + (d.amount || 0), 0)
  };

  // Handle deal click
  const handleDealClick = (dealId) => {
    navigate(`/deals/${dealId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ==========================================
          STATS ROW - Glassmorphism Pills
          ========================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Active Deals */}
        <div className="glass-pill px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-400 text-lg">📋</span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Active</p>
            <p className="text-xl font-bold text-white font-mono">{stats.active}</p>
          </div>
        </div>

        {/* Needs Action */}
        <div className="glass-pill px-4 py-3 flex items-center gap-3 border-amber-500/30">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-400 text-lg">⚡</span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Action</p>
            <p className="text-xl font-bold text-amber-400 font-mono">{stats.needsAction}</p>
          </div>
        </div>

        {/* Pending Payment */}
        <div className="glass-pill px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-cyan-400 text-lg">💰</span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Pending</p>
            <p className="text-xl font-bold text-cyan-400 font-mono">${stats.pendingPayment.toLocaleString()}</p>
          </div>
        </div>

        {/* This Month */}
        <div className="glass-pill px-4 py-3 flex items-center gap-3 border-emerald-500/30">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-400 text-lg">✓</span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Month</p>
            <p className="text-xl font-bold text-emerald-400 font-mono">${stats.thisMonth.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* ==========================================
          DEAL PIPELINE SECTION
          ========================================== */}
      <div className="glass-card-strong p-4 sm:p-6 space-y-4">
        
        {/* Header with Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-white tracking-tight">Deal Pipeline</h2>
          
          {/* Search - Glassmorphism Pill */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full sm:w-64 pl-10 pr-4 py-2.5 text-sm"
            />
            <svg 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase whitespace-nowrap transition-all duration-200 rounded-full ${
                activeFilter === filter
                  ? 'bg-cyan-500 text-slate-900 shadow-lg glow-cyan-subtle'
                  : 'glass-pill text-slate-400 hover:text-white hover:border-white/25'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Deals List */}
        <div className="space-y-3">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => handleDealClick(deal.id)}
              className="glass-card p-4 hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Left: Type Icon + Deal Info */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Type Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeConfig[deal.type]?.class || 'bg-slate-700'}`}>
                    <span className="text-lg">{typeConfig[deal.type]?.icon || '📋'}</span>
                  </div>
                  
                  {/* Deal Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold truncate group-hover:text-cyan-300 transition-colors">
                        {deal.track}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full ${statusConfig[deal.status] || 'status-closed'}`}>
                        {deal.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm truncate mt-0.5">
                      {deal.requester.split('@')[0]}
                      <span className="text-slate-600">@{deal.requester.split('@')[1]}</span>
                      <span className="text-slate-600"> · </span>
                      <span className="text-slate-500">{deal.type}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Amount + Deadline */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1 flex-shrink-0 pl-13 sm:pl-0">
                  <p className="text-emerald-400 font-bold font-mono text-lg">
                    {deal.amount ? `$${deal.amount.toLocaleString()}` : '—'}
                  </p>
                  <p className="text-slate-500 text-xs font-mono">
                    {deal.deadline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-slate-400 font-medium">No deals match your filters</p>
            <p className="text-slate-600 text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <p className="text-sm text-slate-500">
            Showing <span className="text-slate-300 font-semibold">{filteredDeals.length}</span> of <span className="text-slate-300 font-semibold">{sampleDeals.length}</span> deals
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-glow"></span>
            <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
