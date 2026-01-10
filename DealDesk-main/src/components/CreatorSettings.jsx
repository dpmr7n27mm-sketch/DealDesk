import React, { useState } from 'react';

export default function CreatorSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    displayName: 'KVNG SAUCE',
    artistName: 'KVNG SAUCE',
    emailSenderName: 'KVNG SAUCE',
    bio: 'Grammy-nominated producer. 200M+ streams. Credits: Drake, Future, 21 Savage.',
    profileImage: null,
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    defaultStemsPrice: 500,
    defaultLicensePrice: 2500,
    defaultCustomPrice: 1500,
    defaultCommissionPrice: 5000,
    defaultCommissionDeposit: 50,
    defaultDeadlineDays: 14,
    defaultRevisionsStems: 0,
    defaultRevisionsCustom: 1,
    defaultRevisionsCommission: 2,
    linkExpirationDays: 30,
    downloadLimit: 3,
    watermarkDrafts: true,
    paymentMethod: 'stripe',
    stripeConnected: true,
    paypalEmail: '',
    emailOnNewRequest: true,
    emailOnPayment: true,
    emailOnMessage: true,
    pushEnabled: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'defaults', label: 'Defaults' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'notifications', label: 'Alerts' },
  ];

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Subtitle */}
      <p className="text-slate-400 text-sm">
        Configure your profile, default terms, and payment preferences
      </p>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-slate-900'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4 sm:p-8">
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Profile Image */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center text-slate-900 font-bold text-2xl sm:text-3xl flex-shrink-0 font-display">
                KS
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold mb-2">Profile Image</h3>
                <p className="text-slate-400 text-sm mb-3">Shown on your deal links and buyer communications</p>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors font-semibold">
                  Upload Image
                </button>
              </div>
            </div>

            {/* Display Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Display Name</label>
                <input
                  type="text"
                  value={settings.displayName}
                  onChange={(e) => handleChange('displayName', e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <p className="text-slate-500 text-xs mt-1.5">Your public creator name</p>
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Email Sender Name</label>
                <input
                  type="text"
                  value={settings.emailSenderName}
                  onChange={(e) => handleChange('emailSenderName', e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <p className="text-slate-500 text-xs mt-1.5 truncate">Shows as "{settings.emailSenderName} (via DealDesk)"</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Bio</label>
              <textarea
                value={settings.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={3}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
              <p className="text-slate-500 text-xs mt-1.5">{settings.bio.length}/200 characters</p>
            </div>

            {/* Timezone & Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Defaults Tab */}
        {activeTab === 'defaults' && (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-slate-400 text-sm">
              Set default prices and terms for new deals. You can always adjust per-deal.
            </p>

            {/* Default Prices */}
            <div>
              <h3 className="font-display text-white font-bold mb-4 tracking-tight">Default Prices</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { field: 'defaultStemsPrice', label: 'Stems' },
                  { field: 'defaultLicensePrice', label: 'License' },
                  { field: 'defaultCustomPrice', label: 'Custom Version' },
                  { field: 'defaultCommissionPrice', label: 'Commission' },
                ].map(({ field, label }) => (
                  <div key={field}>
                    <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">{label}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <input
                        type="number"
                        value={settings[field]}
                        onChange={(e) => handleChange(field, parseInt(e.target.value))}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commission Deposit */}
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Commission Deposit %</label>
              <select
                value={settings.defaultCommissionDeposit}
                onChange={(e) => handleChange('defaultCommissionDeposit', parseInt(e.target.value))}
                className="w-full sm:w-48 bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value={25}>25%</option>
                <option value={50}>50% (default)</option>
                <option value={75}>75%</option>
                <option value={100}>100% upfront</option>
              </select>
            </div>

            {/* Default Revisions */}
            <div>
              <h3 className="font-display text-white font-bold mb-4 tracking-tight">Default Revisions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { field: 'defaultRevisionsStems', label: 'Stems', def: '0' },
                  { field: 'defaultRevisionsCustom', label: 'Custom', def: '1' },
                  { field: 'defaultRevisionsCommission', label: 'Commission', def: '2' },
                ].map(({ field, label, def }) => (
                  <div key={field}>
                    <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">{label}</label>
                    <select
                      value={settings[field]}
                      onChange={(e) => handleChange(field, parseInt(e.target.value))}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      {[0,1,2,3].map(n => (
                        <option key={n} value={n}>{n}{n.toString() === def ? ' (default)' : ''}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Delivery Tab */}
        {activeTab === 'delivery' && (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-slate-400 text-sm">
              Configure how files are delivered to buyers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Link Expiration</label>
                <select
                  value={settings.linkExpirationDays}
                  onChange={(e) => handleChange('linkExpirationDays', parseInt(e.target.value))}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days (default)</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                </select>
                <p className="text-slate-500 text-xs mt-1.5">Download links expire after this period</p>
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Download Limit</label>
                <select
                  value={settings.downloadLimit}
                  onChange={(e) => handleChange('downloadLimit', parseInt(e.target.value))}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value={1}>1 download</option>
                  <option value={3}>3 downloads (default)</option>
                  <option value={5}>5 downloads</option>
                  <option value={10}>10 downloads</option>
                </select>
                <p className="text-slate-500 text-xs mt-1.5">Max downloads per link</p>
              </div>
            </div>

            {/* Watermark Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl gap-4">
              <div className="min-w-0">
                <h4 className="text-white font-semibold">Watermark Commission Drafts</h4>
                <p className="text-slate-400 text-sm">Add audio watermark to draft deliveries</p>
              </div>
              <button
                onClick={() => handleChange('watermarkDrafts', !settings.watermarkDrafts)}
                className={`w-14 h-8 rounded-full transition-colors relative flex-shrink-0 ${
                  settings.watermarkDrafts ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                  settings.watermarkDrafts ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
              <div className="flex gap-3">
                <span className="text-cyan-400 text-lg flex-shrink-0">ℹ</span>
                <div className="min-w-0">
                  <h4 className="text-cyan-400 font-semibold mb-1">Secure Delivery</h4>
                  <p className="text-slate-400 text-sm">
                    All deliveries are logged with timestamp, file, and download count. 
                    You can revoke or regenerate any link instantly from the deal case file.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-slate-400 text-sm">
              Connect your payment account to receive funds from deals.
            </p>

            {/* Stripe */}
            <div className={`p-4 sm:p-6 rounded-xl border ${settings.stripeConnected ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900/30 border-slate-700'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-lg">S</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold">Stripe</h4>
                    <p className="text-slate-400 text-sm truncate">
                      {settings.stripeConnected ? 'Connected • Payouts enabled' : 'Not connected'}
                    </p>
                  </div>
                </div>
                {settings.stripeConnected ? (
                  <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full flex-shrink-0 w-fit">
                    ✓ Connected
                  </span>
                ) : (
                  <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-colors flex-shrink-0">
                    Connect Stripe
                  </button>
                )}
              </div>
            </div>

            {/* Fee Display */}
            <div className="bg-slate-900/30 rounded-xl p-4 sm:p-6">
              <h4 className="font-display text-white font-bold mb-4 tracking-tight">Fee Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm gap-4">
                  <span className="text-slate-400">DealDesk Fee</span>
                  <span className="text-white font-mono font-semibold flex-shrink-0">3% (max $250/deal)</span>
                </div>
                <div className="flex justify-between text-sm gap-4">
                  <span className="text-slate-400">Stripe Processing</span>
                  <span className="text-white font-mono font-semibold flex-shrink-0">2.9% + $0.30</span>
                </div>
                <hr className="border-slate-700" />
                <div className="flex justify-between text-sm gap-4">
                  <span className="text-slate-400">Example: $1,000 deal</span>
                  <span className="text-emerald-400 font-bold font-mono flex-shrink-0">You receive: $940.70</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 sm:space-y-6">
            <p className="text-slate-400 text-sm">
              Choose how you want to be notified about deal activity.
            </p>

            {[
              { field: 'emailOnNewRequest', label: 'New deal request', desc: 'When a buyer submits a request' },
              { field: 'emailOnPayment', label: 'Payment received', desc: 'When a buyer completes payment' },
              { field: 'emailOnMessage', label: 'New message', desc: 'When a buyer sends a message' },
            ].map(({ field, label, desc }) => (
              <div key={field} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl gap-4">
                <div className="min-w-0">
                  <h4 className="text-white font-semibold">{label}</h4>
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
                <button
                  onClick={() => handleChange(field, !settings[field])}
                  className={`w-14 h-8 rounded-full transition-colors relative flex-shrink-0 ${
                    settings[field] ? 'bg-emerald-500' : 'bg-slate-600'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                    settings[field] ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/25">
          Save Changes
        </button>
      </div>
    </div>
  );
}
