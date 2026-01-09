import React, { useState } from 'react';

// Sample deal data
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
  'New': { bg: 'bg-blue-600', text: 'text-white' },
  'In Review': { bg: 'bg-amber-500', text: 'text-white' },
  'Needs Info': { bg: 'bg-orange-500', text: 'text-white' },
  'Offer Sent': { bg: 'bg-purple-600', text: 'text-white' },
  'Waiting Payment': { bg: 'bg-yellow-500', text: 'text-gray-900' },
  'Paid': { bg: 'bg-emerald-500', text: 'text-white' },
  'Delivered': { bg: 'bg-teal-500', text: 'text-white' },
  'Closed': { bg: 'bg-gray-400', text: 'text-white' },
  'Declined': { bg: 'bg-red-600', text: 'text-white' },
  'Blocked': { bg: 'bg-red-800', text: 'text-white' },
  'Expired': { bg: 'bg-gray-300', text: 'text-gray-600' }
};

const typeConfig = {
  'License': { bg: 'bg-indigo-900', text: 'text-indigo-100' },
  'Stems': { bg: 'bg-cyan-800', text: 'text-cyan-100' },
  'Commission': { bg: 'bg-fuchsia-900', text: 'text-fuchsia-100' },
  'Custom Version': { bg: 'bg-violet-800', text: 'text-violet-100' }
};

const filters = ['All', 'New', 'Waiting on Me', 'Waiting on Buyer', 'Paid', 'Delivered'];

export default function DealsListDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Import 80s Wall Street fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', -apple-system, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-4 border-emerald-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="font-display text-2xl font-black text-white tracking-tight">
                DEAL<span className="text-emerald-400">DESK</span>
              </h1>
              <div className="hidden md:flex items-center gap-1">
                <button className="px-4 py-2 text-sm font-body font-semibold text-emerald-400 bg-gray-800 rounded border border-emerald-500/30">
                  Deals
                </button>
                <button className="px-4 py-2 text-sm font-body font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                  Links
                </button>
                <button className="px-4 py-2 text-sm font-body font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold font-body shadow-lg">
                M
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border-l-4 border-l-blue-600 shadow-sm p-5">
            <p className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Deals</p>
            <p className="font-display text-3xl font-black text-gray-900">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg border-l-4 border-l-orange-500 shadow-sm p-5">
            <p className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1">Needs Action</p>
            <p className="font-display text-3xl font-black text-orange-600">{stats.needsAction}</p>
          </div>
          <div className="bg-white rounded-lg border-l-4 border-l-yellow-500 shadow-sm p-5">
            <p className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending Payment</p>
            <p className="font-mono text-2xl font-semibold text-gray-900">${stats.pendingPayment.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg border-l-4 border-l-emerald-500 shadow-sm p-5">
            <p className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1">Closed This Month</p>
            <p className="font-mono text-2xl font-semibold text-emerald-600">${stats.thisMonth.toLocaleString()}</p>
          </div>
        </div>

        {/* Deals Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-gray-900">Deal Pipeline</h2>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-72 pl-10 pr-4 py-2.5 text-sm font-body border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                />
                <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-body font-semibold rounded-lg whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-blue-700 to-cyan-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Deals Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="text-left text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Type</th>
                  <th className="text-left text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Requester</th>
                  <th className="text-left text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Track / Project</th>
                  <th className="text-left text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-right text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Amount</th>
                  <th className="text-right text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((deal, index) => (
                  <tr 
                    key={deal.id}
                    onClick={() => setSelectedDeal(deal.id)}
                    className={`border-b border-gray-100 cursor-pointer transition-all ${
                      selectedDeal === deal.id 
                        ? 'bg-blue-50 border-l-4 border-l-blue-700' 
                        : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-body font-bold uppercase tracking-wide ${typeConfig[deal.type].bg} ${typeConfig[deal.type].text}`}>
                        {deal.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-body font-semibold text-gray-900">{deal.requester.split('@')[0]}</p>
                        <p className="text-xs font-body text-gray-500">@{deal.requester.split('@')[1]}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-body font-medium text-gray-900">{deal.track}</p>
                      <p className="text-xs font-body text-gray-400">{deal.submitted}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-bold ${statusConfig[deal.status].bg} ${statusConfig[deal.status].text}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-mono text-sm font-semibold text-gray-900">
                        {deal.amount ? `$${deal.amount.toLocaleString()}` : '—'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-body font-medium text-gray-600">{deal.deadline}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredDeals.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="font-body text-gray-500">No deals match your filters</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex items-center justify-between">
            <p className="text-sm font-body text-gray-500">
              Showing <span className="font-semibold text-gray-900">{filteredDeals.length}</span> of <span className="font-semibold text-gray-900">{sampleDeals.length}</span> deals
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-body text-emerald-600">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Live
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Click feedback toast */}
      {selectedDeal && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-gray-700">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
            <span className="font-display font-bold">#{selectedDeal}</span>
          </div>
          <div>
            <p className="text-sm font-body font-semibold">Deal Selected</p>
            <p className="text-xs font-body text-gray-400">Case file view coming next →</p>
          </div>
          <button 
            onClick={() => setSelectedDeal(null)}
            className="ml-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
