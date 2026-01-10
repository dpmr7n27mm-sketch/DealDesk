import React, { useState } from 'react';

export default function EmailPreview() {
  const [previewType, setPreviewType] = useState('terms');
  const deal = { track: 'Midnight Dynasty', buyer: 'Sarah Chen', email: 'sarah@universal.com', price: 2500, creator: 'KVNG SAUCE' };
  const types = [{ id: 'terms', label: 'Term Sheet', icon: '📄' }, { id: 'accepted', label: 'Accepted', icon: '✅' }, { id: 'payment', label: 'Payment', icon: '💰' }, { id: 'delivery', label: 'Delivery', icon: '📦' }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-2 border-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center"><span className="text-slate-900 font-bold font-mono">D</span></div><span className="font-display text-white text-xl font-bold">DealDesk</span></div>
          <span className="text-emerald-400 text-sm font-medium">Email Preview</span>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div><h1 className="font-display text-2xl font-bold text-white tracking-tight">Email Preview</h1><p className="text-slate-400 text-sm">See what {deal.buyer} will receive</p></div>
          <button className="px-6 py-3 bg-emerald-500 text-slate-900 font-bold rounded-xl">Send Email</button>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto">{types.map(t => (<button key={t.id} onClick={() => setPreviewType(t.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap ${previewType === t.id ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800/50 text-slate-400'}`}><span>{t.icon}</span>{t.label}</button>))}</div>
        
        {/* Email Preview */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 space-y-2">
            <div className="flex gap-2 text-sm"><span className="text-slate-500 w-14">From:</span><span className="text-slate-800 font-medium">{deal.creator} (via DealDesk)</span></div>
            <div className="flex gap-2 text-sm"><span className="text-slate-500 w-14">To:</span><span className="text-slate-800">{deal.buyer}</span></div>
            <div className="flex gap-2 text-sm"><span className="text-slate-500 w-14">Subject:</span><span className="text-slate-900 font-semibold">{previewType === 'terms' ? `Term Sheet: "${deal.track}"` : previewType === 'payment' ? `Payment Received: "${deal.track}"` : previewType === 'delivery' ? `Files Ready: "${deal.track}"` : `Terms Accepted: "${deal.track}"`}</span></div>
          </div>
          <div className="px-8 py-6" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="text-center mb-8 pb-6 border-b border-slate-200">
              <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg"><div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center"><span className="text-slate-900 font-bold text-xs">D</span></div><span className="text-white font-semibold text-sm">DealDesk</span></div>
            </div>
            <p className="text-slate-800 mb-6">Hi {deal.buyer.split(' ')[0]},</p>
            
            {previewType === 'terms' && (
              <div>
                <p className="text-slate-700 mb-6">Thank you for your interest in licensing "{deal.track}". Here are the terms:</p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                  <h3 className="text-slate-900 font-bold text-lg mb-4" style={{ fontFamily: 'system-ui' }}>📄 Term Sheet</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-200"><span className="text-slate-600">Track</span><span className="text-slate-900 font-medium">{deal.track}</span></div>
                    <div className="flex justify-between py-2 border-b border-slate-200"><span className="text-slate-600">License Fee</span><span className="text-emerald-600 font-bold">${deal.price.toLocaleString()}</span></div>
                    <div className="flex justify-between py-2 border-b border-slate-200"><span className="text-slate-600">Usage</span><span className="text-slate-900">Film/TV Sync</span></div>
                    <div className="flex justify-between py-2"><span className="text-slate-600">Territory</span><span className="text-slate-900">Worldwide</span></div>
                  </div>
                </div>
                <div className="text-center my-8"><span className="inline-block px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl cursor-pointer">Review & Accept →</span></div>
              </div>
            )}
            
            {previewType === 'payment' && (
              <div>
                <p className="text-slate-700 mb-6">Your payment for "{deal.track}" has been received!</p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4"><span className="text-2xl">💰</span><h3 className="text-emerald-800 font-bold text-lg" style={{ fontFamily: 'system-ui' }}>Payment Confirmed</h3></div>
                  <p className="text-emerald-700">Amount: <strong>${deal.price.toLocaleString()}</strong></p>
                </div>
                <p className="text-slate-600">Files will be delivered shortly.</p>
              </div>
            )}
            
            {previewType === 'delivery' && (
              <div>
                <p className="text-slate-700 mb-6">Your files for "{deal.track}" are ready!</p>
                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4"><span className="text-2xl">📦</span><h3 className="text-cyan-800 font-bold text-lg" style={{ fontFamily: 'system-ui' }}>Your Files</h3></div>
                  <div className="space-y-2 text-sm text-cyan-700">{['Master WAV', 'Instrumental', 'Clean Edit'].map((f, i) => <div key={i} className="flex items-center gap-2"><span>✓</span>{f}</div>)}</div>
                </div>
                <div className="text-center my-8"><span className="inline-block px-8 py-4 bg-cyan-500 text-white font-bold rounded-xl cursor-pointer">Download Files →</span></div>
              </div>
            )}
            
            {previewType === 'accepted' && (
              <div>
                <p className="text-slate-700 mb-6">Great news! Terms for "{deal.track}" have been finalized.</p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4"><span className="text-2xl">✅</span><h3 className="text-emerald-800 font-bold text-lg" style={{ fontFamily: 'system-ui' }}>Terms Accepted</h3></div>
                  <p className="text-emerald-700">Final amount: <strong>${deal.price.toLocaleString()}</strong></p>
                </div>
                <div className="text-center my-8"><span className="inline-block px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl cursor-pointer">Complete Payment →</span></div>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-slate-200"><p className="text-slate-700 mb-2">Best,</p><p className="text-slate-900 font-semibold">{deal.creator}</p></div>
            <div className="mt-8 pt-6 border-t border-slate-200 text-center"><p className="text-slate-400 text-xs">Sent via DealDesk • Reply to message {deal.creator}</p></div>
          </div>
        </div>
        
        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex gap-3"><span className="text-cyan-400">ℹ</span><div><h4 className="text-cyan-400 font-semibold mb-1">Preview</h4><p className="text-slate-400 text-sm">This is exactly how the email appears. All buttons are one-click links.</p></div></div>
        </div>
      </div>
    </div>
  );
}
