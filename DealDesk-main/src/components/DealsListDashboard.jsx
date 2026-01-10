import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sampleDeals = [
  { id: 'DD-2024-0892', type: 'License', requester: 'sarah.chen@universalmusic.com', track: 'Midnight Drive', status: 'New', amount: null, submitted: '2 hours ago', deadline: 'Jan 15, 2026' },
  { id: 'DD-2024-0893', type: 'Stems', requester: 'dj.nova@gmail.com', track: 'Neon Pulse', status: 'Offer Sent', amount: 450, submitted: '1 day ago', deadline: 'Jan 20, 2026' },
  { id: 'DD-2024-0894', type: 'Commission', requester: 'creative@nike.com', track: '30s Brand Anthem', status: 'Paid', amount: 8500, submitted: '3 days ago', deadline: 'Feb 1, 2026' },
  { id: 'DD-2024-0895', type: 'Custom Version', requester: 'editor@netflix.com', track: 'Midnight Drive (60s)', status: 'Waiting Payment', amount: 1200, submitted: '4 days ago', deadline: 'Jan 18, 2026' },
  { id: 'DD-2024-0896', type: 'License', requester: 'sync@spotifyads.com', track: 'Summer Haze', status: 'In Review', amount: null, submitted: '5 days ago', deadline: 'Jan 25, 2026' },
  { id: 'DD-2024-0897', type: 'Stems', requester: 'remix.artist@proton.me', track: 'Electric Dreams', status: 'Delivered', amount: 300, submitted: '1 week ago', deadline: 'Jan 10, 2026' },
  { id: 'DD-2024-0898', type: 'Commission', requester: 'podcast@gimlet.com', track: 'Intro Theme', status: 'Needs Info', amount: null, submitted: '1 week ago', deadline: 'Jan 30, 2026' },
];

const statusConfig = {
  'New': 'bg-cyan-500/20 text-cyan-400',
  'In Review': 'bg-amber-500/20 text-amber-400',
  'Needs Info': 'bg-orange-500/20 text-orange-400',
  'Offer Sent': 'bg-purple-500/20 text-purple-400',
  'Waiting Payment': 'bg-yellow-500/20 text-yellow-400',
  'Paid': 'bg-emerald-500/20 text-emerald-400',
  'Delivered': 'bg-teal-500/20 text-teal-400',
};

const typeConfig = {
  'License': { icon: '📄', color: 'bg-purple-500/20' },
  'Stems': { icon: '🎛️', color: 'bg-pink-500/20' },
  'Commission': { icon: '🎵', color: 'bg-cyan-500/20' },
  'Custom Version': { icon: '✂️', color: 'bg-violet-500/20' },
};

const filters = ['All', 'New', 'Waiting on Me', 'Waiting on Buyer', 'Paid', 'Delivered'];

export default function DealsListDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredDeals = sampleDeals.filter(deal => {
    const matchesSearch = searchQuery === '' || 
      deal.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.track.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'New') matchesFilter = deal.status === 'New';
    else if (activeFilter === 'Waiting on Me') matchesFilter = ['New', 'In Review', 'Needs Info'].includes(deal.status);
    else if (activeFilter === 'Waiting on Buyer') matchesFilter = ['Offer Sent', 'Waiting Payment'].includes(deal.status);
    else if (activeFilter === 'Paid') matchesFilter = deal.status === 'Paid';
    else if (activeFilter === 'Delivered') matchesFilter = deal.status === 'Delivered';
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    active: sampleDeals.filter(d => !['Closed', 'Declined'].includes(d.status)).length,
    needsAction: sampleDeals.filter(d => ['New', 'In Review', 'Needs Info'].includes(d.status)).length,
    pendingPayment: sampleDeals.filter(d => d.status === 'Waiting Payment').reduce((sum, d) => sum + (d.amount || 0), 0),
    thisMonth: sampleDeals.filter(d => d.status === 'Paid').reduce((sum, d) => sum + (d.amount || 0), 0)
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Active Deals</p>
          <p className="font-display text-2xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="bg-amber-500/10 rounded-xl border border-amber-500/30 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Needs Action</p>
          <p className="font-display text-2xl font-bold text-amber-400">{stats.needsAction}</p>
        </div>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Pending Payment</p>
          <p className="font-mono text-xl font-bold text-white">${stats.pendingPayment.toLocaleString()}</p>
        </div>
        <div className="bg-emerald-500/10 rounded-xl border border-emerald-500/30 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">This Month</p>
          <p className="font-mono text-xl font-bold text-emerald-400">${stats.thisMonth.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {filters.map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}>{filter}</button>
          ))}
        </div>
        <div className="flex-1 sm:max-w-xs">
          <input type="text" placeholder="Search deals..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
        </div>
      </div>

      <div className="space-y-3">
        {filteredDeals.map(deal => (
          <div key={deal.id} onClick={() => navigate(`/deals/${deal.id}`)}
            className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 sm:p-5 hover:border-emerald-500/30 hover:bg-slate-800/60 transition-all cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${typeConfig[deal.type]?.color || 'bg-slate-700'}`}>
                  <span className="text-lg sm:text-xl">{typeConfig[deal.type]?.icon || '📋'}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-white font-semibold truncate">{deal.track}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-semibold whitespace-nowrap ${statusConfig[deal.status] || 'bg-slate-500/20 text-slate-400'}`}>{deal.status}</span>
                  </div>
                  <p className="text-slate-400 text-sm truncate">{deal.requester} • {deal.type}</p>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                {deal.amount ? <p className="text-emerald-400 font-bold font-mono text-lg">${deal.amount.toLocaleString()}</p> : <p className="text-slate-500 text-sm italic">No offer</p>}
                <p className="text-slate-500 text-xs font-mono">{deal.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700/50 text-xs text-slate-500">
              <span>📥 {deal.submitted}</span>
              <span>📅 Due: {deal.deadline}</span>
            </div>
          </div>
        ))}
        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">📋</div>
            <h3 className="text-white font-semibold mb-2">No deals found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your filters or search</p>
          </div>
        )}
      </div>
    </div>
  );
}
