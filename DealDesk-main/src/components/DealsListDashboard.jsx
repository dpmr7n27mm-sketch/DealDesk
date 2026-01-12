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
  'License': 'type-license',
  'Stems': 'type-stems',
  'Commission': 'type-commission',
  'Custom Version': 'type-custom',
};

const filters = ['All', 'New', 'Waiting on Me', 'Waiting on Buyer', 'Paid', 'Delivered'];

// ============================================
// MAIN COMPONENT
// ============================================

export default function DealsListDashboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  const stats = {
    active: sampleDeals.filter(d => !['Closed', 'Declined', 'Blocked', 'Expired'].includes(d.status)).length,
    needsAction: sampleDeals.filter(d => ['New', 'In Review', 'Needs Info'].includes(d.status)).length,
    pendingPayment: sampleDeals.filter(d => d.status === 'Waiting Payment').reduce((sum, d) => sum + (d.amount || 0), 0),
    thisMonth: sampleDeals.filter(d => d.status === 'Paid').reduce((sum, d) => sum + (d.amount || 0), 0)
  };

  const handleDealClick = (dealId) => {
    navigate(`/deals/${dealId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ==========================================
          STATS ROW
          ========================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass-pill px-5 py-4">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1">Active</p>
          <p className="text-2xl font-bold text-white font-mono">{stats.active}</p>
        </div>

        <div className="glass-pill px-5 py-4">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1">Action</p>
          <p className="text-2xl font-bold text-amber-400 font-mono">{stats.needsAction}</p>
        </div>

        <div className="glass-pill px-5 py-4">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1">Pending</p>
          <p className="text-2xl font-bold text-white font-mono">${stats.pendingPayment.toLocaleString()}</p>
        </div>

        <div className="glass-pill px-5 py-4">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1">Month</p>
          <p className="text-2xl font-bold text-emerald-400 font-mono">${stats.thisMonth.toLocaleString()}</p>
        </div>
      </div>

      {/* ==========================================
          DEAL PIPELINE
          ========================================== */}
      <div className="solid-panel p-4 sm:p-6 space-y-4">
        
        {/* Header with Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white tracking-tight">Deal Pipeline</h2>
          
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Pills - Glassmorphism */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase whitespace-nowrap transition-all duration-200 rounded-full ${
                activeFilter === filter
                  ? 'gradient-accent text-white shadow-lg glow-accent-subtle'
                  : 'glass-pill text-slate-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Deals List */}
        <div className="space-y-2">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => handleDealClick(deal.id)}
              className="solid-card p-4 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                
                {/* Left: Type Badge + Deal Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Type Badge - Color coded with name */}
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md flex-shrink-0 ${typeConfig[deal.type] || 'type-license'}`}>
                    {deal.type === 'Custom Version' ? 'Custom' : deal.type}
                  </span>
                  
                  {/* Deal Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                        {deal.track}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full ${statusConfig[deal.status] || 'status-closed'}`}>
                        {deal.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm truncate mt-0.5">
                      {deal.requester}
                    </p>
                  </div>
                </div>

                {/* Right: Amount + Deadline */}
                <div className="text-right flex-shrink-0">
                  <p className={`font-mono font-semibold ${deal.amount ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {deal.amount ? `$${deal.amount.toLocaleString()}` : '—'}
                  </p>
                  <p className="text-slate-600 text-xs font-mono mt-0.5">
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
            <p className="text-slate-500">No deals match your filters</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <p className="text-sm text-slate-600">
            {filteredDeals.length} of {sampleDeals.length} deals
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span className="text-xs text-slate-600 font-medium uppercase tracking-wider">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
