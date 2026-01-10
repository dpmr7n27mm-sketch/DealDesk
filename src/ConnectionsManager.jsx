import React, { useState } from 'react';

export default function ConnectionsManager() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const connections = [
    { id: 1, name: 'Sarah Chen', company: 'Universal Music', role: 'Music Supervisor', type: 'verified', status: 'active', deals: 12, spent: 45000, lastActive: '2 days ago', initials: 'SC' },
    { id: 2, name: 'Marcus Thompson', company: 'Netflix', role: 'Sr. Music Coordinator', type: 'verified', status: 'active', deals: 8, spent: 32000, lastActive: '1 week ago', initials: 'MT' },
    { id: 3, name: 'DJ Remix King', company: null, role: 'Independent Artist', type: 'member', status: 'active', deals: 3, spent: 1500, lastActive: '3 days ago', initials: 'RK' },
    { id: 4, name: 'Amanda Foster', company: 'Peloton', role: 'Licensing Manager', type: 'verified', status: 'pending', deals: 0, spent: 0, lastActive: 'Invite sent', initials: 'AF' },
  ];

  const stats = { total: 47, verified: 18, repeat: 32, revenue: 285000 };

  const getTypeStyles = (type) => {
    if (type === 'verified') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (type === 'member') return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  const filtered = connections.filter(c => {
    if (filter === 'verified' && c.type !== 'verified') return false;
    if (filter === 'pending' && c.status !== 'pending') return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Nav Bar */}
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-2 border-emerald-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-slate-900 font-bold text-lg font-mono">D</span>
            </div>
            <span className="font-display text-white text-xl font-bold tracking-wide truncate">DealDesk</span>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-slate-400 text-sm hidden sm:block uppercase tracking-wider">Connections</span>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">KS</div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">Connections</h1>
            <p className="text-slate-400 text-sm">Manage your buyer relationships</p>
          </div>
          <button onClick={() => setShowInviteModal(true)} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/25 flex-shrink-0">
            + Invite Buyer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Total', value: stats.total, icon: '🤝' },
            { label: 'Verified', value: stats.verified, icon: '✓' },
            { label: 'Repeat', value: stats.repeat, icon: '🔄' },
            { label: 'Revenue', value: `$${(stats.revenue / 1000).toFixed(0)}K`, icon: '💰', highlight: true },
          ].map((stat, i) => (
            <div key={i} className={`p-3 sm:p-4 rounded-xl border ${stat.highlight ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800/40 border-slate-700/50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span>{stat.icon}</span>
                <span className="text-slate-400 text-xs uppercase tracking-wider truncate">{stat.label}</span>
              </div>
              <p className={`text-xl sm:text-2xl font-bold font-mono ${stat.highlight ? 'text-emerald-400' : 'text-white'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'verified', 'pending'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize whitespace-nowrap ${filter === f ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          </div>
        </div>

        {/* Connections List */}
        <div className="space-y-3">
          {filtered.map((conn) => (
            <div key={conn.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 sm:p-5 hover:border-slate-600/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                      conn.type === 'verified' ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-900' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {conn.initials}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-slate-800 ${conn.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-white font-semibold truncate">{conn.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border flex-shrink-0 ${getTypeStyles(conn.type)}`}>
                        {conn.type === 'verified' ? '✓ Verified' : 'Member'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm truncate">{conn.role}{conn.company ? ` @ ${conn.company}` : ''}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Deals</p>
                    <p className="text-white font-bold font-mono">{conn.deals}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Spent</p>
                    <p className="text-emerald-400 font-bold font-mono">${(conn.spent / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="flex gap-2">
                    {conn.status === 'pending' ? (
                      <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg font-medium">Resend</button>
                    ) : (
                      <button className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs rounded-lg font-medium">New Deal</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🔍</div>
            <h3 className="text-white font-semibold mb-2">No connections found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setShowInviteModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">×</button>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">Invite a Buyer</h2>
            <p className="text-slate-400 text-sm mb-6">Create a direct connection</p>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Email</label>
                <input type="email" placeholder="buyer@company.com" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Name (optional)</label>
                <input type="text" placeholder="Contact name" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
              </div>
            </div>
            <button className="w-full mt-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/25">
              Send Invite
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
