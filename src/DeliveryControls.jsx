import React, { useState } from 'react';

export default function DeliveryControls() {
  const [expandedFile, setExpandedFile] = useState(null);
  const [showRevoke, setShowRevoke] = useState(false);

  const deal = { id: 'DD-2024-0892', type: 'License', track: 'Midnight Dynasty', buyer: 'Sarah Chen', amount: 2500 };

  const deliveries = [
    { id: 1, token: 'dlv_8x7k2m', file: 'Midnight_Dynasty_Master.wav', size: '48.2 MB', created: '2024-01-08', expires: '2024-02-07', downloads: 2, limit: 3, status: 'active', logs: [
      { time: '2024-01-08 2:35 PM', device: 'Mac/Chrome' },
      { time: '2024-01-09 10:12 AM', device: 'Mac/Chrome' },
    ]},
    { id: 2, token: 'dlv_3n9p4q', file: 'Midnight_Dynasty_Instrumental.wav', size: '45.8 MB', created: '2024-01-08', expires: '2024-02-07', downloads: 1, limit: 3, status: 'active', logs: [
      { time: '2024-01-08 2:36 PM', device: 'Mac/Chrome' },
    ]},
    { id: 3, token: 'dlv_expired', file: 'Midnight_Dynasty_Preview.mp3', size: '8.2 MB', created: '2023-12-01', expires: '2023-12-31', downloads: 3, limit: 3, status: 'expired', logs: [] },
  ];

  const getStatus = (d) => {
    if (d.status === 'expired') return { style: 'bg-slate-500/20 text-slate-400', label: 'Expired' };
    if (d.downloads >= d.limit) return { style: 'bg-amber-500/20 text-amber-400', label: 'Limit Reached' };
    return { style: 'bg-emerald-500/20 text-emerald-400', label: 'Active' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-2 border-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-slate-900 font-bold text-lg font-mono">D</span>
            </div>
            <span className="font-display text-white text-xl font-bold truncate">DealDesk</span>
          </div>
          <div className="flex items-center gap-2 text-sm flex-shrink-0">
            <span className="text-slate-400 hidden sm:inline">{deal.id}</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400 font-medium">Delivery</span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Deal Context */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📄</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="font-display text-lg font-bold text-white truncate tracking-tight">{deal.track}</h2>
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full font-semibold flex-shrink-0">{deal.type}</span>
                </div>
                <p className="text-slate-400 text-sm truncate">{deal.buyer}</p>
              </div>
            </div>
            <div className="text-left sm:text-right flex-shrink-0">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Amount Paid</p>
              <p className="text-emerald-400 text-xl font-bold font-mono">${deal.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">Delivery Links</h1>
            <p className="text-slate-400 text-sm">Manage file access and download logs</p>
          </div>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl text-sm flex-shrink-0">+ Add Files</button>
        </div>

        {/* Files */}
        <div className="space-y-4">
          {deliveries.map((d) => {
            const status = getStatus(d);
            return (
              <div key={d.id} className={`bg-slate-800/40 border rounded-2xl overflow-hidden transition-all ${expandedFile === d.id ? 'border-emerald-500/50' : 'border-slate-700/50'}`}>
                <div className="p-4 sm:p-5 cursor-pointer hover:bg-slate-700/20" onClick={() => setExpandedFile(expandedFile === d.id ? null : d.id)}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🎵</div>
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold text-sm truncate">{d.file}</h3>
                        <p className="text-slate-400 text-xs">{d.size} • Created {d.created}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                      <div className="text-center hidden sm:block">
                        <p className="font-mono text-white font-bold">{d.downloads}<span className="text-slate-500">/{d.limit}</span></p>
                        <p className="text-slate-500 text-xs">downloads</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status.style}`}>{status.label}</span>
                      <span className={`text-slate-400 transition-transform ${expandedFile === d.id ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                  </div>
                </div>

                {expandedFile === d.id && (
                  <div className="border-t border-slate-700/50 p-4 sm:p-5 bg-slate-900/30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Download Link</label>
                        <div className="flex gap-2">
                          <code className="flex-1 bg-slate-800 px-3 py-2 rounded-lg text-cyan-400 text-xs font-mono truncate">dealdesk.io/dl/{d.token}</code>
                          <button className="px-3 py-2 bg-slate-700 text-white text-xs rounded-lg font-medium flex-shrink-0">Copy</button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Expires</label>
                        <span className="text-white font-mono">{d.expires}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {d.status === 'active' && (
                        <>
                          <button className="px-3 py-2 bg-cyan-500/20 text-cyan-400 text-xs rounded-lg font-medium">Regenerate</button>
                          <button className="px-3 py-2 bg-amber-500/20 text-amber-400 text-xs rounded-lg font-medium">+ Limit</button>
                          <button onClick={() => setShowRevoke(true)} className="px-3 py-2 bg-red-500/20 text-red-400 text-xs rounded-lg font-medium">Revoke</button>
                        </>
                      )}
                      {(d.status === 'expired' || d.downloads >= d.limit) && (
                        <button className="px-3 py-2 bg-emerald-500 text-slate-900 text-xs rounded-lg font-bold">New Link</button>
                      )}
                    </div>

                    {d.logs.length > 0 && (
                      <div>
                        <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-2">Download Log</h4>
                        <div className="bg-slate-800/50 rounded-lg overflow-hidden">
                          {d.logs.map((log, i) => (
                            <div key={i} className="flex items-center justify-between px-4 py-2 border-b border-slate-700/50 last:border-0 text-sm">
                              <span className="text-slate-300 font-mono text-xs">{log.time}</span>
                              <span className="text-emerald-400 text-xs">✓ Downloaded</span>
                              <span className="text-slate-400 text-xs">{log.device}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex gap-3">
            <span className="text-cyan-400 text-lg flex-shrink-0">ℹ</span>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-1">Secure Delivery</h4>
              <p className="text-slate-400 text-sm">All downloads logged. Default: 30 days, 3 downloads. Revoke or regenerate any link instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {showRevoke && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">⚠️</div>
              <h2 className="font-display text-xl font-bold text-white mb-2 tracking-tight">Revoke Access?</h2>
              <p className="text-slate-400 text-sm">This will immediately invalidate the download link.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowRevoke(false)} className="flex-1 py-3 bg-slate-700 text-white font-medium rounded-xl">Cancel</button>
              <button onClick={() => setShowRevoke(false)} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl">Revoke</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
