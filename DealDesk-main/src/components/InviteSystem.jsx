import React, { useState } from 'react';

export default function InviteSystem() {
  const [activeTab, setActiveTab] = useState('invites');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const status = { 
    level: 'Trusted Creator', 
    icon: '⭐', 
    used: 12, 
    allowed: 25, 
    total: 47, 
    rate: 78, 
    progress: 65 
  };
  
  const invites = [
    { id: 1, token: 'inv_8x7k2m', email: null, status: 'pending', expires: '2024-01-22' },
    { id: 2, token: 'inv_3n9p4q', email: 'producer@gmail.com', status: 'accepted', expires: '2024-01-19', acceptedBy: 'DJ Metro' },
    { id: 3, token: 'inv_6w2t8r', email: null, status: 'pending', expires: '2024-01-17' },
    { id: 4, token: 'inv_1y5h3k', email: 'beatmaker@email.com', status: 'expired', expires: '2023-12-29' },
  ];

  const ladder = [
    { level: 'New Creator', icon: '🌱', invites: '3-10', req: 'Join DealDesk', unlocked: true },
    { level: 'Trusted Creator', icon: '⭐', invites: '25-100', req: '5+ deals, low disputes', unlocked: true, current: true },
    { level: 'Ambassador', icon: '👑', invites: 'Unlimited', req: '50+ deals, verified ID', unlocked: false },
  ];

  const getStatusStyle = (s) => {
    if (s === 'pending') return 'bg-amber-500/20 text-amber-400';
    if (s === 'accepted') return 'bg-emerald-500/20 text-emerald-400';
    if (s === 'expired') return 'bg-slate-500/20 text-slate-400';
    return 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-400 text-sm">Invite other creators to join DealDesk</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)} 
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-colors flex-shrink-0"
        >
          + Create Invite
        </button>
      </div>

      {/* Trust Level Card */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
              {status.icon}
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold text-white truncate tracking-tight">
                {status.level}
              </h2>
              <p className="text-slate-400 text-sm">
                <span className="font-mono text-emerald-400 font-bold">{status.used}</span>
                {' '}/{' '}
                <span className="font-mono">{status.allowed}</span>
                {' '}invites this month
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 w-full lg:w-auto">
            <p className="text-slate-400 text-sm mb-2">Progress to Ambassador</p>
            <div className="w-full lg:w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" 
                style={{ width: `${status.progress}%` }} 
              />
            </div>
            <p className="text-slate-500 text-xs mt-1 font-mono">{status.progress}%</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700/50">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Sent</p>
            <p className="text-xl font-bold text-white font-mono">{status.total}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Accept Rate</p>
            <p className="text-xl font-bold text-emerald-400 font-mono">{status.rate}%</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Invitee Deals</p>
            <p className="text-xl font-bold text-white font-mono">156</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl w-fit">
        {['invites', 'ladder'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
              activeTab === tab 
                ? 'bg-emerald-500 text-slate-900' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'invites' ? 'My Invites' : 'Trust Ladder'}
          </button>
        ))}
      </div>

      {/* Invites Tab */}
      {activeTab === 'invites' && (
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Link</th>
                  <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Status</th>
                  <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Expires</th>
                  <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invites.map(inv => (
                  <tr key={inv.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-4">
                      <code className="text-cyan-400 text-xs bg-slate-900/50 px-2 py-1 rounded font-mono break-all">
                        dealdesk.io/i/{inv.token}
                      </code>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(inv.status)}`}>
                        {inv.status === 'accepted' ? `✓ ${inv.acceptedBy}` : inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-slate-400 text-sm font-mono whitespace-nowrap">{inv.expires}</span>
                    </td>
                    <td className="px-4 py-4">
                      {inv.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg font-medium transition-colors">
                            Copy
                          </button>
                          <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg font-medium transition-colors">
                            Revoke
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Trust Ladder Tab */}
      {activeTab === 'ladder' && (
        <div className="space-y-4">
          {ladder.map((tier, i) => (
            <div 
              key={i} 
              className={`p-4 sm:p-6 rounded-2xl border transition-all ${
                tier.current 
                  ? 'bg-emerald-500/10 border-emerald-500/50' 
                  : tier.unlocked 
                    ? 'bg-slate-800/40 border-slate-700/50' 
                    : 'bg-slate-800/20 border-slate-700/30 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                    tier.unlocked 
                      ? 'bg-gradient-to-br from-emerald-400 to-cyan-500' 
                      : 'bg-slate-700'
                  }`}>
                    {tier.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-lg font-bold text-white truncate">{tier.level}</h3>
                      {tier.current && (
                        <span className="px-2 py-0.5 bg-emerald-500 text-slate-900 text-xs font-bold rounded-full whitespace-nowrap">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm truncate">{tier.req}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-slate-400 text-xs uppercase tracking-wider">Invites/mo</p>
                  <p className="text-white font-bold font-mono">{tier.invites}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8 relative">
            <button 
              onClick={() => setShowCreateModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
            <h2 className="font-display text-xl font-bold text-white mb-6 tracking-tight">Create Invite Link</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Email (optional)
                </label>
                <input 
                  type="email" 
                  placeholder="Lock to specific email"
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Expires in
                </label>
                <select className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                  <option>7 days</option>
                  <option>14 days (recommended)</option>
                  <option>30 days</option>
                </select>
              </div>
            </div>

            <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-colors">
              Generate Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
