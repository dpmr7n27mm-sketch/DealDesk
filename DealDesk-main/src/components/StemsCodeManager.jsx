import React, { useState } from 'react';

export default function StemsCodeManager() {
  const [activeTab, setActiveTab] = useState('active');
  const [showModal, setShowModal] = useState(false);

  const codes = [
    { id: 1, code: 'STEMS-8X7K2M', type: 'single', status: 'active', notes: 'Remix contest' },
    { id: 2, code: 'VIP-SARAH', type: 'vip', status: 'active', uses: 8, assignedTo: 'Sarah Chen' },
    { id: 3, code: 'STEMS-3N9P4Q', type: 'single', status: 'used', usedBy: 'producer@gmail.com' },
    { id: 4, code: 'VIP-NETFLIX', type: 'vip', status: 'active', uses: 12, assignedTo: 'Netflix' },
    { id: 5, code: 'STEMS-7Y4R9W', type: 'single', status: 'active', notes: 'DJ collab' },
  ];

  const filtered = codes.filter(c => 
    activeTab === 'active' ? c.status === 'active' : 
    activeTab === 'vip' ? c.type === 'vip' : 
    c.status === activeTab
  );

  const stats = [
    { label: 'Single Codes', value: 3 },
    { label: 'VIP Codes', value: 4 },
    { label: 'Total Uses', value: 156 },
    { label: 'Delivered', value: 89, highlight: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p className="text-slate-400 text-sm">Manage single-use and VIP codes for protected stems access</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-colors flex-shrink-0"
        >
          + Generate Code
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`p-4 rounded-xl border ${
              stat.highlight 
                ? 'bg-emerald-500/10 border-emerald-500/30' 
                : 'bg-slate-800/40 border-slate-700/50'
            }`}
          >
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1 truncate">{stat.label}</p>
            <p className={`text-2xl font-bold font-mono ${stat.highlight ? 'text-emerald-400' : 'text-white'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['active', 'vip', 'used'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-emerald-500 text-slate-900' 
                : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Code</th>
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Type</th>
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Status</th>
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Usage</th>
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-4 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-4">
                    <code className="text-cyan-400 bg-slate-900/50 px-2 py-1 rounded font-mono font-bold text-sm break-all">
                      {c.code}
                    </code>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      c.type === 'vip' 
                        ? 'bg-amber-500/20 text-amber-400' 
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {c.type === 'vip' ? '⭐ VIP' : 'Single'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      c.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {c.type === 'vip' ? (
                      <span className="text-white font-mono text-sm">
                        {c.uses}× — <span className="text-slate-400">{c.assignedTo}</span>
                      </span>
                    ) : c.usedBy ? (
                      <span className="text-slate-300 text-sm truncate block max-w-[150px]">{c.usedBy}</span>
                    ) : (
                      <span className="text-slate-500 italic text-sm">Not used</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {c.status === 'active' && (
                        <>
                          <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg font-medium transition-colors">
                            Copy
                          </button>
                          <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg font-medium transition-colors">
                            Revoke
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-cyan-400 text-lg flex-shrink-0">ℹ</span>
          <div>
            <h4 className="text-cyan-400 font-semibold mb-1">Code Security</h4>
            <p className="text-slate-400 text-sm">
              Single-use codes expire after one request. VIP codes allow multiple requests from trusted buyers. 
              All codes require the buyer to specify their stems use case.
            </p>
          </div>
        </div>
      </div>

      {/* Generate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
            <h2 className="font-display text-xl font-bold text-white mb-6 tracking-tight">Generate Stems Code</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Code Type</label>
                <select className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                  <option>Single-use</option>
                  <option>VIP (reusable)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Notes (optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g., Remix contest, DJ collab"
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl mb-6">
              <p className="text-slate-400 text-xs uppercase mb-2 tracking-wider">Generated Code</p>
              <code className="text-cyan-400 text-lg font-bold font-mono">STEMS-A7K9M2</code>
            </div>

            <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-colors">
              Create Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
