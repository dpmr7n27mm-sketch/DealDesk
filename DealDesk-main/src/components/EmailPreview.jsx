import React, { useState } from 'react';

export default function EmailPreview() {
  const [emailType, setEmailType] = useState('terms');

  const emailTypes = [
    { id: 'terms', label: 'Term Sheet', icon: '📋' },
    { id: 'payment', label: 'Payment Request', icon: '💳' },
    { id: 'delivery', label: 'File Delivery', icon: '📦' },
    { id: 'reminder', label: 'Follow-up', icon: '🔔' },
  ];

  const sampleEmail = {
    terms: {
      subject: 'Term Sheet for "Midnight Dynasty" License',
      preview: 'Hi Sarah, Thanks for your interest in licensing "Midnight Dynasty"...',
      body: `Hi Sarah,

Thanks for your interest in licensing "Midnight Dynasty" for your campaign.

I've put together a term sheet based on our discussion. Here's the summary:

• Track: Midnight Dynasty
• Usage: TV/Streaming Commercial
• Territory: North America
• Term: 1 Year
• Price: $2,500

Click below to review the full terms and accept or counter.`,
    },
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-400 text-sm">Preview how emails appear to buyers before sending</p>

      {/* Email Type Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {emailTypes.map(type => (
          <button key={type.id} onClick={() => setEmailType(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              emailType === type.id ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}>
            <span>{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Email Preview */}
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Email Header */}
        <div className="p-4 border-b border-slate-700/50 bg-slate-900/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold text-sm">KS</div>
            <div>
              <p className="text-white font-semibold">KVNG SAUCE <span className="text-slate-400 font-normal">(via DealDesk)</span></p>
              <p className="text-slate-400 text-sm">to: sarah.chen@universalmusic.com</p>
            </div>
          </div>
          <p className="text-white font-semibold">{sampleEmail.terms.subject}</p>
        </div>

        {/* Email Body */}
        <div className="p-4 sm:p-6">
          <div className="bg-white rounded-xl p-6 text-slate-800">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {sampleEmail.terms.body}
            </pre>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">
                Review Term Sheet →
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/30">
          <p className="text-slate-500 text-xs text-center">
            Sent via DealDesk • <span className="text-cyan-400">dealdesk.io/deal/abc123</span>
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-cyan-400 text-lg flex-shrink-0">💡</span>
          <div>
            <h4 className="text-cyan-400 font-semibold mb-1">Email Branding</h4>
            <p className="text-slate-400 text-sm">
              Emails are sent from "Your Name (via DealDesk)" and include your profile image. 
              Buyers can reply directly and the conversation syncs to your deal case file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
