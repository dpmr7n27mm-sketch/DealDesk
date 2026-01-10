import React, { useState } from 'react';

// Sample buyer deals data
const buyerDeals = [
  {
    id: 1,
    type: 'Commission',
    track: '30s Brand Anthem',
    creator: { name: 'Marcus Chen', avatar: 'M' },
    status: 'In Progress',
    amount: 8500,
    submitted: 'Jan 6, 2026',
    deadline: 'Feb 1, 2026',
    nextAction: 'Awaiting draft delivery'
  },
  {
    id: 2,
    type: 'License',
    track: 'Midnight Drive',
    creator: { name: 'Sarah Waves', avatar: 'S' },
    status: 'Delivered',
    amount: 1200,
    submitted: 'Dec 15, 2025',
    deadline: 'Dec 30, 2025',
    nextAction: null
  },
  {
    id: 3,
    type: 'Custom Version',
    track: 'Neon Pulse (60s Edit)',
    creator: { name: 'Marcus Chen', avatar: 'M' },
    status: 'Waiting Payment',
    amount: 450,
    submitted: 'Jan 8, 2026',
    deadline: 'Jan 20, 2026',
    nextAction: 'Pay to start work'
  },
  {
    id: 4,
    type: 'Stems',
    track: 'Electric Dreams',
    creator: { name: 'DJ Cosmos', avatar: 'D' },
    status: 'Closed',
    amount: 300,
    submitted: 'Nov 20, 2025',
    deadline: 'Dec 1, 2025',
    nextAction: null
  },
  {
    id: 5,
    type: 'License',
    track: 'Summer Haze',
    creator: { name: 'Luna Keys', avatar: 'L' },
    status: 'Review Terms',
    amount: 2500,
    submitted: 'Jan 9, 2026',
    deadline: 'Jan 25, 2026',
    nextAction: 'Review and accept terms'
  }
];

const connectedCreators = [
  { id: 1, name: 'Marcus Chen', avatar: 'M', deals: 2, lastDeal: 'Jan 8, 2026' },
  { id: 2, name: 'Sarah Waves', avatar: 'S', deals: 1, lastDeal: 'Dec 15, 2025' },
  { id: 3, name: 'DJ Cosmos', avatar: 'D', deals: 1, lastDeal: 'Nov 20, 2025' },
  { id: 4, name: 'Luna Keys', avatar: 'L', deals: 1, lastDeal: 'Jan 9, 2026' }
];

const statusConfig = {
  'Review Terms': { bg: 'bg-purple-500', text: 'text-white' },
  'Waiting Payment': { bg: 'bg-yellow-500', text: 'text-gray-900' },
  'In Progress': { bg: 'bg-blue-500', text: 'text-white' },
  'Delivered': { bg: 'bg-emerald-500', text: 'text-white' },
  'Closed': { bg: 'bg-gray-400', text: 'text-white' }
};

const typeConfig = {
  'License': { bg: 'bg-indigo-900', text: 'text-indigo-100' },
  'Stems': { bg: 'bg-cyan-800', text: 'text-cyan-100' },
  'Commission': { bg: 'bg-fuchsia-900', text: 'text-fuchsia-100' },
  'Custom Version': { bg: 'bg-violet-800', text: 'text-violet-100' }
};

const filters = ['All', 'Action Needed', 'In Progress', 'Completed'];

export default function BuyerDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('deals');

  const filteredDeals = buyerDeals.filter(deal => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Action Needed') return ['Review Terms', 'Waiting Payment'].includes(deal.status);
    if (activeFilter === 'In Progress') return deal.status === 'In Progress';
    if (activeFilter === 'Completed') return ['Delivered', 'Closed'].includes(deal.status);
    return true;
  });

  const stats = {
    active: buyerDeals.filter(d => !['Closed', 'Delivered'].includes(d.status)).length,
    actionNeeded: buyerDeals.filter(d => ['Review Terms', 'Waiting Payment'].includes(d.status)).length,
    totalSpent: buyerDeals.filter(d => ['Delivered', 'Closed', 'In Progress'].includes(d.status)).reduce((sum, d) => sum + d.amount, 0),
    creators: connectedCreators.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Import fonts */}
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
            </div>
            <div className="flex items-center gap-4">
              <span className="font-body text-sm text-gray-400">Buyer Account</span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-sm font-bold font-body shadow-lg">
                J
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-black text-white mb-2">Welcome back, Jordan</h1>
          <p className="font-body text-blue-200">Manage your deals and connected creators in one place.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border-l-4 border-l-blue-600 shadow-sm p-5">
            <p className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Deals</p>
            <p className="font-display text-3xl font-black text-gray-900">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg border-l-4 border-l-orange-500 shadow-sm p-5">
            <p className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1">Action Needed</p>
            <p className="font-display text-3xl font-black text-orange-600">{stats.actionNeeded}</p>
          </div>
          <div className="bg-white rounded-lg border-l-4 border-l-emerald-500 shadow-sm p-5">
            <p className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Invested</p>
            <p className="font-mono text-2xl font-semibold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg border-l-4 border-l-purple-500 shadow-sm p-5">
            <p className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1">Connected Creators</p>
            <p className="font-display text-3xl font-black text-gray-900">{stats.creators}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('deals')}
            className={`px-5 py-2.5 text-sm font-body font-semibold rounded-lg transition-all ${
              activeTab === 'deals'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            My Deals
          </button>
          <button
            onClick={() => setActiveTab('creators')}
            className={`px-5 py-2.5 text-sm font-body font-semibold rounded-lg transition-all ${
              activeTab === 'creators'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            Connected Creators
          </button>
        </div>

        {/* Deals Tab */}
        {activeTab === 'deals' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="font-display text-2xl font-bold text-gray-900">My Deals</h2>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-sm font-body font-semibold rounded-lg whitespace-nowrap transition-all ${
                      activeFilter === filter
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Deals List */}
            <div className="divide-y divide-gray-100">
              {filteredDeals.map(deal => (
                <div 
                  key={deal.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left side - Deal info */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold font-body flex-shrink-0">
                        {deal.creator.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-body font-bold uppercase tracking-wide ${typeConfig[deal.type].bg} ${typeConfig[deal.type].text}`}>
                            {deal.type}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body font-bold ${statusConfig[deal.status].bg} ${statusConfig[deal.status].text}`}>
                            {deal.status}
                          </span>
                        </div>
                        <h3 className="font-body text-lg font-semibold text-gray-900">{deal.track}</h3>
                        <p className="font-body text-sm text-gray-500">with {deal.creator.name}</p>
                        {deal.nextAction && (
                          <p className="font-body text-sm text-orange-600 font-medium mt-1 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {deal.nextAction}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right side - Amount & Date */}
                    <div className="md:text-right">
                      <p className="font-mono text-xl font-semibold text-gray-900">${deal.amount.toLocaleString()}</p>
                      <p className="font-body text-sm text-gray-500">Due: {deal.deadline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredDeals.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="font-body text-gray-500">No deals match this filter</p>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <p className="text-sm font-body text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filteredDeals.length}</span> of <span className="font-semibold text-gray-900">{buyerDeals.length}</span> deals
              </p>
            </div>
          </div>
        )}

        {/* Connected Creators Tab */}
        {activeTab === 'creators' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="font-display text-2xl font-bold text-gray-900">Connected Creators</h2>
              <p className="font-body text-sm text-gray-500 mt-1">Start new requests with creators you've worked with before.</p>
            </div>

            <div className="divide-y divide-gray-100">
              {connectedCreators.map(creator => (
                <div 
                  key={creator.id}
                  className="p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-lg font-bold font-body">
                      {creator.avatar}
                    </div>
                    <div>
                      <h3 className="font-body text-lg font-semibold text-gray-900">{creator.name}</h3>
                      <p className="font-body text-sm text-gray-500">{creator.deals} deal{creator.deals > 1 ? 's' : ''} · Last: {creator.lastDeal}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-body font-semibold text-sm rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all">
                    New Request
                  </button>
                </div>
              ))}
            </div>

            {/* Add Connection */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm font-semibold text-gray-900">Have an invite link?</p>
                  <p className="font-body text-xs text-gray-500">Paste a creator's invite link to connect</p>
                </div>
                <button className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 font-body font-semibold text-sm rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all">
                  + Add Creator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white/10 rounded-lg p-6">
          <h3 className="font-display text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="p-4 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-all group">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-emerald-500/30 transition-all">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <p className="font-body font-semibold text-white">Download Files</p>
              <p className="font-body text-sm text-blue-200">Access your delivered files</p>
            </button>

            <button className="p-4 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-all group">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-500/30 transition-all">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="font-body font-semibold text-white">View Contracts</p>
              <p className="font-body text-sm text-blue-200">See all your term sheets</p>
            </button>

            <button className="p-4 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-all group">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-500/30 transition-all">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <p className="font-body font-semibold text-white">Payment History</p>
              <p className="font-body text-sm text-blue-200">View receipts and invoices</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
