import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const dealData = {
  id: 'DD-2024-0894',
  type: 'Commission',
  status: 'Paid',
  track: '30s Brand Anthem',
  requester: { name: 'Jordan Creative', email: 'creative@nike.com', company: 'Nike', level: 'Verified Buyer' },
  submitted: 'Jan 6, 2026',
  deadline: 'Feb 1, 2026',
  amount: 8500,
  deposit: 4250,
  balance: 4250,
  description: 'Need an original 30-second anthem for new running shoe campaign. High energy, inspirational, modern electronic with orchestral elements.',
  vibeKeywords: ['Inspirational', 'High Energy', 'Epic', 'Modern'],
};

const messages = [
  { id: 1, from: 'buyer', name: 'Jordan Creative', date: 'Jan 6 · 10:32 AM', content: "Hi! We're launching a new running shoe line in February and need an original 30-second anthem. Looking for something high energy and inspirational." },
  { id: 2, from: 'creator', name: 'You', date: 'Jan 6 · 2:15 PM', content: "This sounds like a great project! Do you have any reference tracks that capture the vibe? What's your timeline for first draft?" },
  { id: 3, from: 'buyer', name: 'Jordan Creative', date: 'Jan 6 · 4:48 PM', content: "References attached. We'd want a first draft by Jan 20th to leave time for revisions before Feb 1 final deadline." },
  { id: 4, from: 'system', date: 'Jan 7 · 9:01 AM', content: 'Term Sheet v1 sent to buyer' },
  { id: 5, from: 'system', date: 'Jan 7 · 11:30 AM', content: 'Terms accepted • Deposit payment received: $4,250' },
];

const termSheet = {
  version: 'v2 (Final)',
  price: 8500,
  deposit: '50%',
  deliverables: ['30-second master WAV', 'Instrumental version', 'Stems package', 'Up to 2 revisions'],
  deadline: 'Feb 1, 2026',
  draftDate: 'Jan 20, 2026',
  usage: 'Global advertising, all media, 1 year',
  ownership: 'Work-for-hire, full buyout',
};

export default function DealCaseFile() {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const { dealId } = useParams();

  const tabs = [
    { id: 'messages', label: 'Messages', count: messages.filter(m => m.from !== 'system').length },
    { id: 'terms', label: 'Term Sheet' },
    { id: 'payment', label: 'Payment' },
    { id: 'delivery', label: 'Delivery' },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button onClick={() => navigate('/deals')} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
        <span>←</span> Back to Deals
      </button>

      {/* Deal Header */}
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-cyan-500/20 text-cyan-400">
                {dealData.type}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">
                {dealData.status}
              </span>
              <span className="text-slate-500 text-xs font-mono">{dealId || dealData.id}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">{dealData.track}</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-slate-900 font-bold text-sm">JC</div>
              <div>
                <p className="text-white font-semibold">{dealData.requester.name}</p>
                <p className="text-slate-400 text-sm">{dealData.requester.company} • {dealData.requester.level}</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 text-left lg:text-right">
            <p className="text-emerald-400 font-bold font-mono text-2xl">${dealData.amount.toLocaleString()}</p>
            <p className="text-slate-400 text-sm">Due: {dealData.deadline}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id ? 'bg-emerald-500 text-slate-900' : 'text-slate-400 hover:text-white'
            }`}>
            {tab.label}
            {tab.count && <span className={`px-1.5 py-0.5 text-xs rounded ${activeTab === tab.id ? 'bg-slate-900/20' : 'bg-slate-700'}`}>{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 divide-y divide-slate-700/50">
            {messages.map(msg => (
              <div key={msg.id} className={`p-4 ${msg.from === 'system' ? 'bg-slate-900/30' : ''}`}>
                {msg.from === 'system' ? (
                  <p className="text-slate-400 text-sm text-center">
                    <span className="text-cyan-400">⚡</span> {msg.content} <span className="text-slate-500">• {msg.date}</span>
                  </p>
                ) : (
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      msg.from === 'creator' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
                    }`}>{msg.from === 'creator' ? 'KS' : 'JC'}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{msg.name}</span>
                        <span className="text-slate-500 text-xs">{msg.date}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{msg.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..."
              className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
            <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-colors">Send</button>
          </div>
        </div>
      )}

      {/* Terms Tab */}
      {activeTab === 'terms' && (
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white tracking-tight">Term Sheet</h3>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">{termSheet.version}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/30 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Price</p>
              <p className="text-emerald-400 font-bold font-mono text-xl">${termSheet.price.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900/30 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Deposit</p>
              <p className="text-white font-bold font-mono text-xl">{termSheet.deposit}</p>
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Deliverables</p>
            <ul className="space-y-2">
              {termSheet.deliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-2 text-white text-sm"><span className="text-emerald-400">✓</span>{d}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
            <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Draft Due</p><p className="text-white font-mono">{termSheet.draftDate}</p></div>
            <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Final Due</p><p className="text-white font-mono">{termSheet.deadline}</p></div>
            <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Usage</p><p className="text-white text-sm">{termSheet.usage}</p></div>
            <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Ownership</p><p className="text-white text-sm">{termSheet.ownership}</p></div>
          </div>
        </div>
      )}

      {/* Payment Tab */}
      {activeTab === 'payment' && (
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 sm:p-6 space-y-6">
          <h3 className="font-display text-lg font-bold text-white tracking-tight">Payment Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Deposit Received</p>
              <p className="text-emerald-400 font-bold font-mono text-xl">${dealData.deposit.toLocaleString()}</p>
              <p className="text-emerald-400/60 text-xs mt-1">Jan 7, 2026</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Balance Due</p>
              <p className="text-amber-400 font-bold font-mono text-xl">${dealData.balance.toLocaleString()}</p>
              <p className="text-amber-400/60 text-xs mt-1">After draft approval</p>
            </div>
            <div className="bg-slate-900/30 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total</p>
              <p className="text-white font-bold font-mono text-xl">${dealData.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Tab */}
      {activeTab === 'delivery' && (
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 sm:p-6 space-y-6">
          <h3 className="font-display text-lg font-bold text-white tracking-tight">Delivery Files</h3>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-cyan-400 text-sm">
              <span className="font-bold">Draft pending</span> — Upload your draft once it's ready. The buyer will be notified to review.
            </p>
          </div>
          <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-colors">
            Upload Draft Files
          </button>
        </div>
      )}
    </div>
  );
}
