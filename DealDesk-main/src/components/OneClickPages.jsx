import React, { useState } from 'react';

// Sample deal data
const dealData = {
  id: 3,
  type: 'Commission',
  track: '30s Brand Anthem',
  creator: {
    name: 'Marcus Chen',
    avatar: 'M'
  },
  termSheet: {
    version: 1,
    deliverable: '30-second original composition with stems',
    fee: 8500,
    deposit: 4250,
    balance: 4250,
    revisions: 2,
    deadline: 'Feb 1, 2026',
    draftDeadline: 'Jan 20, 2026',
    usage: 'Worldwide advertising, 2 years',
    exclusivity: 'Exclusive for athletic footwear category',
    deliverables: [
      'Draft WAV (watermarked)',
      'Final master WAV',
      'Instrumental WAV',
      'Stems package (WAV)'
    ]
  }
};

const deliveryFiles = [
  {
    id: 1,
    name: 'Nike_Anthem_FINAL_Master.wav',
    size: '48.2 MB',
    type: 'Master'
  },
  {
    id: 2,
    name: 'Nike_Anthem_FINAL_Instrumental.wav',
    size: '47.8 MB',
    type: 'Instrumental'
  },
  {
    id: 3,
    name: 'Nike_Anthem_STEMS.zip',
    size: '312.4 MB',
    type: 'Stems'
  }
];

export default function OneClickPages() {
  const [currentPage, setCurrentPage] = useState('termsheet'); // termsheet, payment, download
  const [termSheetAction, setTermSheetAction] = useState(null); // null, 'accepted', 'countering'
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState({});

  // Counter form state
  const [counterForm, setCounterForm] = useState({
    fee: dealData.termSheet.fee,
    deadline: '',
    revisions: dealData.termSheet.revisions,
    notes: ''
  });

  const handleAccept = () => {
    setTermSheetAction('accepted');
    setTimeout(() => setCurrentPage('payment'), 1500);
  };

  const handleCounter = () => {
    setTermSheetAction('countering');
  };

  const handleSubmitCounter = (e) => {
    e.preventDefault();
    setTermSheetAction('counter_sent');
  };

  const handlePayment = () => {
    setPaymentComplete(true);
  };

  const handleDownload = (fileId) => {
    setDownloadStarted(prev => ({ ...prev, [fileId]: true }));
  };

  // Navigation for demo purposes
  const PageNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t-2 border-gray-700 px-6 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <p className="text-xs font-body text-gray-400">Demo Navigation</p>
        <div className="flex items-center gap-2">
          {['termsheet', 'payment', 'download'].map(page => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                setTermSheetAction(null);
                setPaymentComplete(false);
              }}
              className={`px-4 py-2 text-sm font-body font-semibold rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {page === 'termsheet' && 'Term Sheet'}
              {page === 'payment' && 'Payment'}
              {page === 'download' && 'Download'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', -apple-system, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Demo Navigation */}
      <PageNav />

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-4 border-emerald-500">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold font-body">
              {dealData.creator.avatar}
            </div>
            <div>
              <p className="font-body text-sm text-gray-400">Deal from</p>
              <p className="font-display text-xl font-bold text-white">{dealData.creator.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 pb-24">
        
        {/* ============ TERM SHEET PAGE ============ */}
        {currentPage === 'termsheet' && (
          <div className="space-y-6">
            {/* Success State */}
            {termSheetAction === 'accepted' && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Terms Accepted!</h1>
                <p className="font-body text-gray-600">Redirecting to payment...</p>
              </div>
            )}

            {/* Counter Sent State */}
            {termSheetAction === 'counter_sent' && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Counter Proposal Sent</h1>
                <p className="font-body text-gray-600 mb-4">
                  {dealData.creator.name} will review your proposed changes and respond via email.
                </p>
                <button 
                  onClick={() => setTermSheetAction(null)}
                  className="font-body text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  ← Back to term sheet
                </button>
              </div>
            )}

            {/* Counter Form */}
            {termSheetAction === 'countering' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-purple-600 px-6 py-4">
                  <h1 className="font-display text-xl font-bold text-white">Counter Proposal</h1>
                  <p className="font-body text-sm text-purple-200">Suggest changes to the terms</p>
                </div>
                <form onSubmit={handleSubmitCounter} className="p-6 space-y-5">
                  <div>
                    <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                      Proposed Fee
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 font-mono text-gray-500">$</span>
                      <input
                        type="number"
                        value={counterForm.fee}
                        onChange={(e) => setCounterForm({...counterForm, fee: e.target.value})}
                        className="w-full pl-8 pr-4 py-3 font-mono text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                      Proposed Deadline
                    </label>
                    <input
                      type="date"
                      value={counterForm.deadline}
                      onChange={(e) => setCounterForm({...counterForm, deadline: e.target.value})}
                      className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                      Revisions Included
                    </label>
                    <select
                      value={counterForm.revisions}
                      onChange={(e) => setCounterForm({...counterForm, revisions: e.target.value})}
                      className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white"
                    >
                      <option value="1">1 revision</option>
                      <option value="2">2 revisions</option>
                      <option value="3">3 revisions</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                      Notes / Reasoning
                    </label>
                    <textarea
                      value={counterForm.notes}
                      onChange={(e) => setCounterForm({...counterForm, notes: e.target.value})}
                      placeholder="Explain your proposed changes..."
                      rows={3}
                      className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setTermSheetAction(null)}
                      className="flex-1 px-4 py-3 font-body font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 font-body font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all"
                    >
                      Send Counter
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Main Term Sheet View */}
            {!termSheetAction && (
              <>
                {/* Deal Header */}
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded text-xs font-body font-bold uppercase tracking-wide bg-fuchsia-900 text-fuchsia-100">
                      🎵 {dealData.type}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-body font-semibold rounded-full">
                      v{dealData.termSheet.version}
                    </span>
                  </div>
                  <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">{dealData.track}</h1>
                  <p className="font-body text-gray-600">{dealData.termSheet.deliverable}</p>
                </div>

                {/* Term Sheet Details */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="font-display text-lg font-bold text-gray-900">Term Sheet</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-body text-sm text-gray-500">Total Fee</span>
                      <span className="font-mono text-xl font-bold text-gray-900">${dealData.termSheet.fee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-body text-sm text-gray-500">Deposit (50%)</span>
                      <span className="font-mono text-sm text-gray-700">${dealData.termSheet.deposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-body text-sm text-gray-500">Balance (on draft approval)</span>
                      <span className="font-mono text-sm text-gray-700">${dealData.termSheet.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-body text-sm text-gray-500">Revisions Included</span>
                      <span className="font-body text-sm text-gray-900">{dealData.termSheet.revisions}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-body text-sm text-gray-500">Draft Deadline</span>
                      <span className="font-body text-sm text-gray-900">{dealData.termSheet.draftDeadline}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-body text-sm text-gray-500">Final Deadline</span>
                      <span className="font-body text-sm text-gray-900">{dealData.termSheet.deadline}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-body text-sm text-gray-500">Usage Rights</span>
                      <span className="font-body text-sm text-gray-900 text-right max-w-xs">{dealData.termSheet.usage}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-body text-sm text-gray-500">Exclusivity</span>
                      <span className="font-body text-sm text-gray-900 text-right max-w-xs">{dealData.termSheet.exclusivity}</span>
                    </div>
                    <div className="py-3">
                      <span className="font-body text-sm text-gray-500 block mb-2">Deliverables</span>
                      <ul className="space-y-1">
                        {dealData.termSheet.deliverables.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 font-body text-sm text-gray-900">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCounter}
                    className="flex-1 px-6 py-4 bg-white text-gray-700 font-body font-bold text-lg rounded-xl hover:bg-gray-50 transition-all shadow-lg border-2 border-gray-200"
                  >
                    Counter
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-body font-bold text-lg rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
                  >
                    Accept Terms
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ============ PAYMENT PAGE ============ */}
        {currentPage === 'payment' && (
          <div className="space-y-6">
            {paymentComplete ? (
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="font-body text-gray-600 mb-4">
                  You'll receive a confirmation email shortly. {dealData.creator.name} has been notified and will begin work on your project.
                </p>
                <p className="font-mono text-sm text-gray-500">
                  Transaction ID: TXN-2026-00847
                </p>
              </div>
            ) : (
              <>
                {/* Payment Summary */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h1 className="font-display text-xl font-bold text-gray-900">Payment</h1>
                    <p className="font-body text-sm text-gray-500">Deposit for {dealData.track}</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="font-body text-sm text-gray-500">Deposit (50%)</span>
                        <span className="font-mono text-lg font-semibold text-gray-900">${dealData.termSheet.deposit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-body text-sm text-gray-500">Processing Fee</span>
                        <span className="font-mono text-sm text-gray-500">$123.40</span>
                      </div>
                      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                        <span className="font-body text-sm font-semibold text-gray-900">Total Due Now</span>
                        <span className="font-mono text-2xl font-bold text-gray-900">$4,373.40</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <p className="font-body text-sm text-blue-800">
                        <span className="font-semibold">Balance of ${dealData.termSheet.balance.toLocaleString()}</span> will be due after you approve the draft.
                      </p>
                    </div>

                    {/* Fake Payment Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          className="w-full px-4 py-3 font-mono text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                            Expiry
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 font-mono text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 font-mono text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-body font-bold text-lg rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Pay $4,373.40
                </button>

                <p className="font-body text-xs text-blue-200 text-center">
                  Secured by Stripe. Your payment info is encrypted.
                </p>
              </>
            )}
          </div>
        )}

        {/* ============ DOWNLOAD PAGE ============ */}
        {currentPage === 'download' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-gray-900">Your Files Are Ready</h1>
                  <p className="font-body text-sm text-gray-500">{dealData.track} — Final Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm font-body text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Expires in 28 days
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  3 downloads remaining
                </span>
              </div>
            </div>

            {/* File List */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="font-display text-lg font-bold text-gray-900">Files</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {deliveryFiles.map(file => (
                  <div key={file.id} className="p-5">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-gray-900 truncate">{file.name}</p>
                        <p className="font-body text-xs text-gray-500">{file.size} · {file.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(file.id)}
                      disabled={downloadStarted[file.id]}
                      className={`w-full px-4 py-3 rounded-lg font-body text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        downloadStarted[file.id]
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {downloadStarted[file.id] ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Downloaded
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Download All */}
            <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-body font-bold text-lg rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download All Files
            </button>

            {/* Help Text */}
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-body text-sm text-blue-200">
                <span className="font-semibold">Having trouble?</span> If your link expired or you've used all downloads, click below to request a new link.
              </p>
              <button className="mt-2 font-body text-sm text-white font-semibold hover:underline">
                Request New Link →
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="font-body text-sm text-blue-200">
            Powered by <span className="font-display font-bold">DEAL<span className="text-emerald-400">DESK</span></span>
          </p>
        </div>
      </main>
    </div>
  );
}
