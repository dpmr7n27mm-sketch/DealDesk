import React, { useState } from 'react';

const dealLinks = [
  { id: 1, type: 'License', url: 'dealdesk.io/r/kvngsauce/license', clicks: 47, requests: 12, active: true },
  { id: 2, type: 'Stems', url: 'dealdesk.io/r/kvngsauce/stems', clicks: 23, requests: 8, active: true, codeRequired: true },
  { id: 3, type: 'Custom Version', url: 'dealdesk.io/r/kvngsauce/custom', clicks: 31, requests: 5, active: true },
  { id: 4, type: 'Commission', url: 'dealdesk.io/r/kvngsauce/commission', clicks: 18, requests: 3, active: true },
];

const typeConfig = {
  'License': { icon: '📄', desc: 'Negotiated non-exclusive license', color: 'purple' },
  'Stems': { icon: '🎛️', desc: 'Protected stems access (code required)', color: 'pink' },
  'Custom Version': { icon: '✂️', desc: 'Edits, cutdowns, alternate mixes', color: 'violet' },
  'Commission': { icon: '🎵', desc: 'New custom music creation', color: 'cyan' },
};

export default function LinksTab() {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(`https://${url}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stats = {
    totalClicks: dealLinks.reduce((sum, l) => sum + l.clicks, 0),
    totalRequests: dealLinks.reduce((sum, l) => sum + l.requests, 0),
    conversionRate: Math.round((dealLinks.reduce((sum, l) => sum + l.requests, 0) / dealLinks.reduce((sum, l) => sum + l.clicks, 0)) * 100),
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-slate-400 text-sm">
        Share your Deal Links to receive requests. Each link type has its own form.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Clicks</p>
          <p className="font-mono text-xl font-bold text-white">{stats.totalClicks}</p>
        </div>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Requests</p>
          <p className="font-mono text-xl font-bold text-emerald-400">{stats.totalRequests}</p>
        </div>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Conversion</p>
          <p className="font-mono text-xl font-bold text-cyan-400">{stats.conversionRate}%</p>
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {dealLinks.map(link => {
          const config = typeConfig[link.type];
          return (
            <div key={link.id} className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-${config.color}-500/20`}>
                    {config.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-semibold">{link.type} Request</h3>
                      {link.codeRequired && (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full font-semibold">Code Required</span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{config.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-white font-mono font-bold">{link.clicks}</p>
                    <p className="text-slate-500 text-xs">clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-emerald-400 font-mono font-bold">{link.requests}</p>
                    <p className="text-slate-500 text-xs">requests</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row gap-3">
                <code className="flex-1 bg-slate-900/50 px-4 py-2.5 rounded-lg text-cyan-400 text-sm font-mono truncate">
                  {link.url}
                </code>
                <button
                  onClick={() => copyToClipboard(link.url, link.id)}
                  className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex-shrink-0 ${
                    copiedId === link.id 
                      ? 'bg-emerald-500 text-slate-900' 
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  {copiedId === link.id ? '✓ Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-cyan-400 text-lg flex-shrink-0">💡</span>
          <div>
            <h4 className="text-cyan-400 font-semibold mb-1">Pro Tip</h4>
            <p className="text-slate-400 text-sm">
              Add these links to your website, social bio, or share directly with supervisors. 
              Stems links require a code—manage codes in the Stems Codes section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
