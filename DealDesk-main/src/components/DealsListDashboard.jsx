import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sampleDeals = [
  { id: 'DD-2024-0892', type: 'License', requester: 'sarah.chen@universalmusic.com', track: 'Midnight Drive', status: 'New', amount: null, submitted: '2h ago', deadline: 'Jan 15' },
  { id: 'DD-2024-0893', type: 'Stems', requester: 'dj.nova@gmail.com', track: 'Neon Pulse', status: 'Offer Sent', amount: 450, submitted: '1d ago', deadline: 'Jan 20' },
  { id: 'DD-2024-0894', type: 'Commission', requester: 'creative@nike.com', track: '30s Brand Anthem', status: 'Paid', amount: 8500, submitted: '3d ago', deadline: 'Feb 1' },
  { id: 'DD-2024-0895', type: 'Custom', requester: 'editor@netflix.com', track: 'Midnight Drive (60s)', status: 'Waiting', amount: 1200, submitted: '4d ago', deadline: 'Jan 18' },
  { id: 'DD-2024-0896', type: 'License', requester: 'sync@spotifyads.com', track: 'Summer Haze', status: 'Review', amount: null, submitted: '5d ago', deadline: 'Jan 25' },
];

const statusStyles = {
  'New': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Review': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Offer Sent': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Waiting': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Paid': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const typeIcons = {
  'License': '◈',
  'Stems': '◉',
  'Commission': '▣',
  'Custom': '◇',
};

const filters = ['All', 'New', 'Active', 'Paid'];

export default function DealsListDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const stats = [
    { label: 'ACTIVE', value: '7', accent: false },
    { label: 'ACTION', value: '3', accent: true },
    { label: 'PENDING', value: '$1.2K', accent: false },
    { label: 'MONTH', value: '$8.5K', accent: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-xl border ${
              stat.accent 
                ? 'bg-cyan-500/5 border-cyan-500/20' 
                : 'bg-white/[0.02] border-white/5'
            }`}
          >
            <p className="text-[10px] font-medium tracking-widest text-white/30 mb-1">
              {stat.label}
            </p>
            <p className={`text-xl font-semibold font-mono ${
              stat.accent ? 'text-cyan-400' : 'text-white'
            }`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all ${
              activeFilter === filter
                ? 'bg-white text-black'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
            }`}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Deals List */}
      <div className="space-y-2">
        {sampleDeals.map((deal, index) => (
          <div
            key={deal.id}
            onClick={() => navigate(`/deals/${deal.id}`)}
            className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 rounded-2xl p-4 cursor-pointer transition-all"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-center gap-4">
              {/* Type Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg text-white/60 group-hover:text-cyan-400 transition-colors">
                {typeIcons[deal.type] || '◈'}
              </div>

              {/* Deal Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium truncate">{deal.track}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-medium tracking-wider rounded-full border ${statusStyles[deal.status] || 'bg-white/10 text-white/50'}`}>
                    {deal.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-white/40 text-sm truncate">
                  {deal.type} · {deal.submitted}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right">
                {deal.amount ? (
                  <p className="text-emerald-400 font-mono font-semibold">
                    ${deal.amount.toLocaleString()}
                  </p>
                ) : (
                  <p className="text-white/20 text-sm">—</p>
                )}
                <p className="text-white/20 text-xs font-mono">{deal.id.slice(-4)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-black flex items-center justify-center text-2xl font-light shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all">
        +
      </button>
    </div>
  );
}
