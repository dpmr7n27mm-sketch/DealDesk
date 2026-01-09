import React, { useState } from 'react';

// Sample links data
const dealLinks = [
  {
    id: 1,
    type: 'License',
    slug: 'license-2026',
    url: 'dealdesk.io/m/license-2026',
    active: true,
    clicks: 47,
    requests: 12,
    created: 'Dec 15, 2025'
  },
  {
    id: 2,
    type: 'Stems',
    slug: 'stems-access',
    url: 'dealdesk.io/m/stems-access',
    active: true,
    clicks: 23,
    requests: 8,
    created: 'Dec 20, 2025',
    requiresCode: true
  },
  {
    id: 3,
    type: 'Custom Version',
    slug: 'custom-edits',
    url: 'dealdesk.io/m/custom-edits',
    active: true,
    clicks: 15,
    requests: 4,
    created: 'Jan 2, 2026'
  },
  {
    id: 4,
    type: 'Commission',
    slug: 'hire-me',
    url: 'dealdesk.io/m/hire-me',
    active: false,
    clicks: 89,
    requests: 31,
    created: 'Nov 1, 2025'
  }
];

const stemsCodes = [
  {
    id: 1,
    code: 'STUDIO2026',
    type: 'VIP',
    uses: 'Unlimited',
    used: 14,
    created: 'Jan 1, 2026',
    active: true
  },
  {
    id: 2,
    code: 'REMIX-7X9K',
    type: 'Single Use',
    uses: '1',
    used: 0,
    created: 'Jan 5, 2026',
    active: true
  },
  {
    id: 3,
    code: 'COLLAB-A3F2',
    type: 'Single Use',
    uses: '1',
    used: 1,
    created: 'Dec 28, 2025',
    active: false
  }
];

const typeConfig = {
  'License': { bg: 'bg-indigo-900', text: 'text-indigo-100', icon: '📄' },
  'Stems': { bg: 'bg-cyan-800', text: 'text-cyan-100', icon: '🎛️' },
  'Commission': { bg: 'bg-fuchsia-900', text: 'text-fuchsia-100', icon: '🎵' },
  'Custom Version': { bg: 'bg-violet-800', text: 'text-violet-100', icon: '✂️' }
};

export default function LinksTab() {
  const [activeSection, setActiveSection] = useState('links');
  const [copiedId, setCopiedId] = useState(null);
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);
  const [showNewCodeModal, setShowNewCodeModal] = useState(false);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(`https://${text}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
              <div className="hidden md:flex items-center gap-1">
                <button className="px-4 py-2 text-sm font-body font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                  Deals
                </button>
                <button className="px-4 py-2 text-sm font-body font-semibold text-emerald-400 bg-gray-800 rounded border border-emerald-500/30">
                  Links
                </button>
                <button className="px-4 py-2 text-sm font-body font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold font-body shadow-lg">
                M
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-black text-white mb-2">Your Deal Links</h1>
            <p className="font-body text-blue-200">Share these links to receive requests. No marketplace, no browsing—just direct access.</p>
          </div>
        </div>

        {/* Section Toggle */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveSection('links')}
            className={`px-5 py-2.5 text-sm font-body font-semibold rounded-lg transition-all ${
              activeSection === 'links'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            Deal Links
          </button>
          <button
            onClick={() => setActiveSection('codes')}
            className={`px-5 py-2.5 text-sm font-body font-semibold rounded-lg transition-all ${
              activeSection === 'codes'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            Stems Codes
          </button>
        </div>

        {/* Deal Links Section */}
        {activeSection === 'links' && (
          <div className="space-y-4">
            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dealLinks.map(link => (
                <div 
                  key={link.id} 
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 p-5 ${!link.active ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-body font-bold uppercase tracking-wide ${typeConfig[link.type].bg} ${typeConfig[link.type].text}`}>
                        {typeConfig[link.type].icon} {link.type}
                      </span>
                      {!link.active && (
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-body font-semibold rounded">
                          Paused
                        </span>
                      )}
                      {link.requiresCode && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-body font-semibold rounded">
                          Code Required
                        </span>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>

                  {/* URL Display */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg font-mono text-sm text-gray-700 truncate">
                      {link.url}
                    </div>
                    <button
                      onClick={() => copyToClipboard(link.url, link.id)}
                      className={`px-3 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                        copiedId === link.id
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {copiedId === link.id ? (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="font-body text-gray-600"><span className="font-semibold text-gray-900">{link.clicks}</span> clicks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-body text-gray-600"><span className="font-semibold text-gray-900">{link.requests}</span> requests</span>
                    </div>
                    <span className="font-body text-gray-400">Created {link.created}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button className="flex-1 px-3 py-2 text-sm font-body font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-body font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                      {link.active ? 'Pause' : 'Activate'}
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-body font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Link Button */}
            <button 
              onClick={() => setShowNewLinkModal(true)}
              className="w-full md:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/30 text-white font-body font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Deal Link
            </button>
          </div>
        )}

        {/* Stems Codes Section */}
        {activeSection === 'codes' && (
          <div className="space-y-4">
            {/* Info Banner */}
            <div className="bg-cyan-900/50 border border-cyan-500/30 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-body text-sm text-cyan-100">
                  <span className="font-semibold">Stems codes</span> protect your trackouts. Share single-use codes for one-off requests, or VIP codes for trusted collaborators.
                </p>
              </div>
            </div>

            {/* Codes List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="text-left text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Code</th>
                    <th className="text-left text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Type</th>
                    <th className="text-left text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Uses</th>
                    <th className="text-left text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-right text-xs font-body font-bold uppercase tracking-wider px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stemsCodes.map((code, index) => (
                    <tr 
                      key={code.id}
                      className={`border-b border-gray-100 ${!code.active ? 'opacity-50' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                            {code.code}
                          </span>
                          <button
                            onClick={() => copyToClipboard(code.code, `code-${code.id}`)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {copiedId === `code-${code.id}` ? (
                              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-body font-semibold ${
                          code.type === 'VIP' 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {code.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-body text-sm text-gray-900">
                          {code.used} / {code.uses}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body font-semibold ${
                          code.active 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {code.active ? 'Active' : 'Used'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-sm font-body font-semibold text-red-600 hover:text-red-700 transition-colors">
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Generate Codes */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowNewCodeModal(true)}
                className="px-6 py-3 bg-white text-gray-900 font-body font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Generate Single-Use Code
              </button>
              <button 
                className="px-6 py-3 bg-amber-500 text-white font-body font-semibold rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Create VIP Code
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="font-body text-xs text-blue-200 uppercase tracking-wider mb-1">Total Clicks</p>
            <p className="font-display text-2xl font-bold text-white">174</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="font-body text-xs text-blue-200 uppercase tracking-wider mb-1">Total Requests</p>
            <p className="font-display text-2xl font-bold text-white">55</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="font-body text-xs text-blue-200 uppercase tracking-wider mb-1">Conversion Rate</p>
            <p className="font-display text-2xl font-bold text-emerald-400">31.6%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="font-body text-xs text-blue-200 uppercase tracking-wider mb-1">Active Links</p>
            <p className="font-display text-2xl font-bold text-white">3</p>
          </div>
        </div>
      </main>
    </div>
  );
}
