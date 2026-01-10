import React, { useState } from 'react';

export default function ConnectionsManager() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const connections = [
    { id: 1, name: 'Sarah Chen', email: 'sarah.chen@universalmusic.com', company: 'Universal Music', level: 'Verified', deals: 8, revenue: 24500, lastDeal: '2 days ago', avatar: 'SC' },
    { id: 2, name: 'Jordan Creative', email: 'creative@nike.com', company: 'Nike', level: 'Verified', deals: 4, revenue: 18000, lastDeal: '1 week ago', avatar: 'JC' },
    { id: 3, name: 'DJ Metro', email: 'dj.metro@gmail.com', company: null, level: 'Member', deals: 12, revenue: 4800, lastDeal: '3 days ago', avatar: 'DM' },
    { id: 4, name: 'Netflix Music', email: 'music@netflix.com', company: 'Netflix', level: 'Verified', deals: 3, revenue: 12500, lastDeal: '2 weeks ago', avatar: 'NF' },
    { id: 5, name: 'Amanda Foster', email: 'amanda@indie.co', company: 'Indie Records', level: 'Member', deals: 6, revenue: 3200, lastDeal: '5 days ago', avatar: 'AF' },
  ];

  const stats = {
    total: connections.length,
    verified: connections.filter(c => c.level === 'Verified').length,
    revenue: connections.reduce((sum, c) => sum + c.revenue, 0),
  };

  const filtered = connections.filter(c => {
    const matchesSearch = searchQuery === '' || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filter === 'all' || (filter === 'verified' && c.level === 'Verified');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <p className="text-slate-400 text-sm">Manage your buyer relationships and connection history</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Connections</p>
          <p className="font-mono text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-cyan-500/10 rounded-xl border border-cyan-500/30 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Verified</p>
          <p className="font-mono text-2xl font-bold text-cyan-400">{stats.verified}</p>
        </div>
        <div className="bg-emerald-500/10 rounded-xl border border-emerald-500/30 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Revenue</p>
          <p className="font-mono text-xl font-bold text-emerald-400">${stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          {['all', 'verified'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                filter === f ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}>{f}</button>
          ))}
        </div>
        <input type="text" placeholder="Search connections..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 sm:max-w-xs bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
      </div>

      {/* Connections List */}
      <div className="space-y-3">
        {filtered.map(conn => (
          <div key={conn.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 hover:border-emerald-500/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold flex-shrink-0">
                {conn.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-white font-semibold truncate">{conn.name}</h4>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                    conn.level === 'Verified' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-500/20 text-slate-400'
                  }`}>{conn.level}</span>
                </div>
                <p className="text-slate-400 text-sm truncate">{conn.company ? `${conn.company} • ` : ''}{conn.email}</p>
              </div>
              <div className="text-right hidden sm:block flex-shrink-0">
                <p className="text-emerald-400 font-mono font-bold">${conn.revenue.toLocaleString()}</p>
                <p className="text-slate-500 text-xs">{conn.deals} deals • {conn.lastDeal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
