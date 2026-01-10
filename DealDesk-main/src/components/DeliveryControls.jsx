import React, { useState } from 'react';

export default function DeliveryControls() {
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const deliveries = [
    { id: 1, deal: 'DD-2024-0892', track: 'Midnight Dynasty', buyer: 'Sarah Chen', status: 'active', downloads: 2, limit: 3, expires: 'Jan 20, 2026', files: ['Master WAV', 'Instrumental'] },
    { id: 2, deal: 'DD-2024-0893', track: 'Neon Pulse Stems', buyer: 'DJ Metro', status: 'active', downloads: 0, limit: 3, expires: 'Jan 25, 2026', files: ['Stems ZIP', 'Master WAV'] },
    { id: 3, deal: 'DD-2024-0897', track: 'Electric Dreams', buyer: 'Remix Artist', status: 'expired', downloads: 3, limit: 3, expires: 'Jan 5, 2026', files: ['Stems ZIP'] },
  ];

  const downloadLogs = [
    { id: 1, file: 'Master WAV', buyer: 'Sarah Chen', time: 'Today 2:34 PM', ip: '192.168.1.xxx', delivery: 'DD-2024-0892' },
    { id: 2, file: 'Instrumental', buyer: 'Sarah Chen', time: 'Today 2:35 PM', ip: '192.168.1.xxx', delivery: 'DD-2024-0892' },
    { id: 3, file: 'Stems ZIP', buyer: 'Remix Artist', time: 'Jan 5, 10:22 AM', ip: '10.0.0.xxx', delivery: 'DD-2024-0897' },
  ];

  const stats = {
    active: deliveries.filter(d => d.status === 'active').length,
    total: downloadLogs.length,
    expiringSoon: deliveries.filter(d => d.status === 'active').length,
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-400 text-sm">Manage delivery links, track downloads, and revoke access</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-500/10 rounded-xl border border-emerald-500/30 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Active Links</p>
          <p className="font-mono text-2xl font-bold text-emerald-400">{stats.active}</p>
        </div>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Downloads</p>
          <p className="font-mono text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-amber-500/10 rounded-xl border border-amber-500/30 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Expiring Soon</p>
          <p className="font-mono text-2xl font-bold text-amber-400">{stats.expiringSoon}</p>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700/50">
          <h3 className="font-display text-white font-bold tracking-tight">Active Deliveries</h3>
        </div>
        <div className="divide-y divide-slate-700/50">
          {deliveries.map(delivery => (
            <div key={delivery.id} className="p-4 hover:bg-slate-700/20 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-white font-semibold truncate">{delivery.track}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                      delivery.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>{delivery.status}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{delivery.buyer} • {delivery.deal}</p>
                  <p className="text-slate-500 text-xs mt-1">Files: {delivery.files.join(', ')}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-white font-mono">{delivery.downloads}/{delivery.limit}</p>
                    <p className="text-slate-500 text-xs">downloads</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-300 text-sm">{delivery.expires}</p>
                    <p className="text-slate-500 text-xs">expires</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg font-medium transition-colors">
                      Regenerate
                    </button>
                    <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg font-medium transition-colors">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Logs */}
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700/50">
          <h3 className="font-display text-white font-bold tracking-tight">Download Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-3 uppercase tracking-wider">File</th>
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-3 uppercase tracking-wider">Buyer</th>
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-3 uppercase tracking-wider">Time</th>
                <th className="text-left text-slate-400 text-xs font-semibold px-4 py-3 uppercase tracking-wider">Deal</th>
              </tr>
            </thead>
            <tbody>
              {downloadLogs.map(log => (
                <tr key={log.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                  <td className="px-4 py-3 text-white text-sm">{log.file}</td>
                  <td className="px-4 py-3 text-slate-300 text-sm">{log.buyer}</td>
                  <td className="px-4 py-3 text-slate-400 text-sm">{log.time}</td>
                  <td className="px-4 py-3 text-cyan-400 text-xs font-mono">{log.delivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
