import React, { useState } from 'react';

// Sample deal data for this case file
const dealData = {
  id: 3,
  type: 'Commission',
  status: 'Paid',
  track: '30s Brand Anthem',
  requester: {
    name: 'Jordan Creative',
    email: 'creative@nike.com',
    company: 'Nike',
    level: 'Verified Buyer'
  },
  submitted: 'Jan 6, 2026',
  deadline: 'Feb 1, 2026',
  amount: 8500,
  description: 'Need an original 30-second anthem for new running shoe campaign. High energy, inspirational, modern electronic with orchestral elements.',
  vibeKeywords: ['Inspirational', 'High Energy', 'Epic', 'Modern'],
  needsStems: true
};

const messages = [
  {
    id: 1,
    from: 'buyer',
    name: 'Jordan Creative',
    email: 'creative@nike.com',
    date: 'Jan 6, 2026 · 10:32 AM',
    content: "Hi! We're launching a new running shoe line in February and need an original 30-second anthem. Looking for something high energy and inspirational—think epic modern electronic with some orchestral swells. Budget is flexible for the right track. Let me know if you're interested!"
  },
  {
    id: 2,
    from: 'creator',
    name: 'You',
    date: 'Jan 6, 2026 · 2:15 PM',
    content: "This sounds like a great project! I'd love to work on this. A few questions: Do you have any reference tracks that capture the vibe you're going for? And what's your timeline for first draft delivery?"
  },
  {
    id: 3,
    from: 'buyer',
    name: 'Jordan Creative',
    email: 'creative@nike.com',
    date: 'Jan 6, 2026 · 4:48 PM',
    content: "Perfect! References attached in the request. We'd ideally want a first draft by Jan 20th to leave time for revisions before the Feb 1 final deadline. Does that work?"
  },
  {
    id: 4,
    from: 'creator',
    name: 'You',
    date: 'Jan 7, 2026 · 9:00 AM',
    content: "Timeline works. I've put together a term sheet—take a look and let me know if the terms work for you."
  },
  {
    id: 5,
    from: 'system',
    date: 'Jan 7, 2026 · 9:01 AM',
    content: 'Term Sheet v1 sent to buyer'
  },
  {
    id: 6,
    from: 'system',
    date: 'Jan 7, 2026 · 11:30 AM',
    content: 'Buyer accepted Term Sheet v1'
  },
  {
    id: 7,
    from: 'system',
    date: 'Jan 7, 2026 · 11:32 AM',
    content: 'Payment received: $8,500.00'
  }
];

const termSheetVersions = [
  {
    version: 1,
    date: 'Jan 7, 2026',
    status: 'Accepted',
    terms: {
      deliverable: '30-second original composition with stems',
      fee: 8500,
      deposit: 4250,
      revisions: 2,
      deadline: 'Feb 1, 2026',
      usage: 'Worldwide advertising, 2 years',
      exclusivity: 'Exclusive for athletic footwear category'
    }
  }
];

const deliveryFiles = [
  {
    id: 1,
    name: 'Nike_Anthem_Draft_v1.wav',
    type: 'Draft',
    uploaded: 'Jan 18, 2026',
    downloads: 2,
    maxDownloads: 3,
    expiresIn: '12 days',
    watermarked: true
  }
];

const statusConfig = {
  'New': { bg: 'bg-blue-600', text: 'text-white' },
  'In Review': { bg: 'bg-amber-500', text: 'text-white' },
  'Needs Info': { bg: 'bg-orange-500', text: 'text-white' },
  'Offer Sent': { bg: 'bg-purple-600', text: 'text-white' },
  'Waiting Payment': { bg: 'bg-yellow-500', text: 'text-gray-900' },
  'Paid': { bg: 'bg-emerald-500', text: 'text-white' },
  'Delivered': { bg: 'bg-teal-500', text: 'text-white' },
  'Closed': { bg: 'bg-gray-400', text: 'text-white' },
  'Declined': { bg: 'bg-red-600', text: 'text-white' },
  'Blocked': { bg: 'bg-red-800', text: 'text-white' }
};

export default function DealCaseFile() {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');

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
                <button className="px-4 py-2 text-sm font-body font-semibold text-emerald-400 bg-gray-800 rounded border border-emerald-500/30">
                  Deals
                </button>
                <button className="px-4 py-2 text-sm font-body font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
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

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Back button */}
        <button className="flex items-center gap-2 text-blue-200 hover:text-white font-body text-sm mb-4 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Deals
        </button>

        {/* Deal Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center px-3 py-1.5 rounded text-xs font-body font-bold uppercase tracking-wide bg-fuchsia-900 text-fuchsia-100">
                  {dealData.type}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-bold ${statusConfig[dealData.status].bg} ${statusConfig[dealData.status].text}`}>
                  {dealData.status}
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">{dealData.track}</h1>
              <p className="font-body text-gray-600">{dealData.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {dealData.vibeKeywords.map(keyword => (
                  <span key={keyword} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-body rounded">
                    {keyword}
                  </span>
                ))}
                {dealData.needsStems && (
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-body font-semibold rounded">
                    + Stems
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="font-mono text-3xl font-semibold text-emerald-600">${dealData.amount.toLocaleString()}</p>
              <p className="font-body text-sm text-gray-500">Due: {dealData.deadline}</p>
            </div>
          </div>

          {/* Requester info */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold font-body">
                {dealData.requester.name.charAt(0)}
              </div>
              <div>
                <p className="font-body font-semibold text-gray-900">{dealData.requester.name}</p>
                <p className="font-body text-sm text-gray-500">{dealData.requester.email}</p>
              </div>
              <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-body font-semibold rounded-full">
                {dealData.requester.level}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-body font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                Decline
              </button>
              <button className="px-4 py-2 text-sm font-body font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                Block
              </button>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Messages & Term Sheet */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-6 py-4 text-sm font-body font-semibold border-b-2 transition-colors ${
                      activeTab === 'messages'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Messages
                  </button>
                  <button
                    onClick={() => setActiveTab('termsheet')}
                    className={`px-6 py-4 text-sm font-body font-semibold border-b-2 transition-colors ${
                      activeTab === 'termsheet'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Term Sheet
                  </button>
                </div>
              </div>

              {/* Messages tab */}
              {activeTab === 'messages' && (
                <div className="p-6">
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                    {messages.map(message => (
                      <div key={message.id} className={`${message.from === 'system' ? 'text-center' : ''}`}>
                        {message.from === 'system' ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-body text-gray-600">{message.content}</span>
                            <span className="text-xs font-body text-gray-400">· {message.date}</span>
                          </div>
                        ) : (
                          <div className={`flex gap-3 ${message.from === 'creator' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold font-body ${
                              message.from === 'creator' 
                                ? 'bg-gradient-to-br from-blue-500 to-cyan-600' 
                                : 'bg-gradient-to-br from-orange-500 to-red-600'
                            }`}>
                              {message.from === 'creator' ? 'M' : message.name.charAt(0)}
                            </div>
                            <div className={`flex-1 max-w-md ${message.from === 'creator' ? 'text-right' : ''}`}>
                              <div className={`inline-block px-4 py-3 rounded-2xl ${
                                message.from === 'creator'
                                  ? 'bg-blue-600 text-white rounded-tr-sm'
                                  : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                              }`}>
                                <p className="font-body text-sm">{message.content}</p>
                              </div>
                              <p className="font-body text-xs text-gray-400 mt-1">{message.date}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message input */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-body font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all">
                      Send
                    </button>
                  </div>
                </div>
              )}

              {/* Term Sheet tab */}
              {activeTab === 'termsheet' && (
                <div className="p-6">
                  {termSheetVersions.map(sheet => (
                    <div key={sheet.version} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="font-display font-bold text-gray-900">v{sheet.version}</span>
                          <span className="text-sm font-body text-gray-500">{sheet.date}</span>
                        </div>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-body font-semibold rounded-full">
                          {sheet.status}
                        </span>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="font-body text-sm text-gray-500">Deliverable</span>
                          <span className="font-body text-sm text-gray-900 text-right">{sheet.terms.deliverable}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-sm text-gray-500">Total Fee</span>
                          <span className="font-mono text-sm font-semibold text-gray-900">${sheet.terms.fee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-sm text-gray-500">Deposit (50%)</span>
                          <span className="font-mono text-sm text-gray-900">${sheet.terms.deposit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-sm text-gray-500">Revisions Included</span>
                          <span className="font-body text-sm text-gray-900">{sheet.terms.revisions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-sm text-gray-500">Deadline</span>
                          <span className="font-body text-sm text-gray-900">{sheet.terms.deadline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-sm text-gray-500">Usage Rights</span>
                          <span className="font-body text-sm text-gray-900 text-right">{sheet.terms.usage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-sm text-gray-500">Exclusivity</span>
                          <span className="font-body text-sm text-gray-900 text-right">{sheet.terms.exclusivity}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="mt-4 w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-500 font-body font-semibold rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors">
                    + Create New Version
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Payment & Delivery */}
          <div className="space-y-6">
            {/* Payment Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-4">Payment</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-gray-500">Total</span>
                  <span className="font-mono text-lg font-semibold text-gray-900">${dealData.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-gray-500">Platform Fee (3%)</span>
                  <span className="font-mono text-sm text-gray-500">-$250.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-gray-500">Processing</span>
                  <span className="font-mono text-sm text-gray-500">-$246.80</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <span className="font-body text-sm font-semibold text-gray-900">You Receive</span>
                  <span className="font-mono text-xl font-bold text-emerald-600">$8,003.20</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-body text-sm text-emerald-700 font-semibold">Paid on Jan 7, 2026</span>
              </div>
            </div>

            {/* Delivery Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-4">Delivery</h3>
              
              {deliveryFiles.length > 0 ? (
                <div className="space-y-3">
                  {deliveryFiles.map(file => (
                    <div key={file.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                          <div>
                            <p className="font-body text-sm font-semibold text-gray-900">{file.name}</p>
                            <p className="font-body text-xs text-gray-500">Uploaded {file.uploaded}</p>
                          </div>
                        </div>
                        {file.watermarked && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-body font-semibold rounded">
                            Watermarked
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs font-body text-gray-500">
                        <span>{file.downloads}/{file.maxDownloads} downloads</span>
                        <span>Expires in {file.expiresIn}</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${(file.downloads / file.maxDownloads) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-body text-sm text-gray-500">No files delivered yet</p>
              )}

              <button className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-body font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Final Delivery
              </button>

              <button className="mt-2 w-full px-4 py-2 text-sm font-body font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Regenerate Link
              </button>
            </div>

            {/* Status Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-4">Status</h3>
              <div className="space-y-2">
                <select className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Paid</option>
                  <option>Delivered</option>
                  <option>Closed</option>
                  <option>Declined</option>
                  <option>Blocked</option>
                </select>
                <p className="font-body text-xs text-gray-400">Manual override. Use sparingly.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
