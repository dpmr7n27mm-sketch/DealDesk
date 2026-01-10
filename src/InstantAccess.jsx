import React, { useState } from 'react';

export default function InstantAccess() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutType, setCheckoutType] = useState(null);

  const creator = {
    name: 'KVNG SAUCE',
    avatar: 'KS',
    bio: 'Grammy-nominated producer. 200M+ streams.',
    verified: true,
  };

  const tracks = [
    {
      id: 1,
      title: 'Midnight Dynasty',
      bpm: 140,
      key: 'C minor',
      duration: '3:24',
      instantLicensePrice: 299,
      downloadPrice: 9.99,
      tags: ['Trap', 'Dark', 'Cinematic'],
      plays: '12.4K',
    },
    {
      id: 2,
      title: 'Golden Hour',
      bpm: 92,
      key: 'G major',
      duration: '2:58',
      instantLicensePrice: 499,
      downloadPrice: 9.99,
      tags: ['R&B', 'Smooth', 'Melodic'],
      plays: '8.2K',
    },
    {
      id: 3,
      title: 'Neon Dreams',
      bpm: 128,
      key: 'A minor',
      duration: '3:45',
      instantLicensePrice: 199,
      downloadPrice: 4.99,
      tags: ['Synth', 'Wave', 'Ambient'],
      plays: '5.1K',
    },
  ];

  const handleInstantLicense = (track) => {
    setSelectedTrack(track);
    setCheckoutType('license');
    setShowCheckout(true);
  };

  const handleBuyDownload = (track) => {
    setSelectedTrack(track);
    setCheckoutType('download');
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Creator Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center text-slate-900 font-bold text-xl sm:text-2xl shadow-lg shadow-emerald-500/25 flex-shrink-0 font-display">
              {creator.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-white truncate tracking-tight">
                  {creator.name}
                </h1>
                {creator.verified && (
                  <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                )}
              </div>
              <p className="text-slate-400 text-sm sm:text-base truncate">{creator.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Lanes Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Instant Access Lane */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl flex-shrink-0">⚡</span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white truncate tracking-tight">
                Instant Access
              </h2>
            </div>
            <p className="text-slate-400 text-sm">
              Purchase immediately. No negotiation needed. Instant delivery.
            </p>
          </div>

          {/* Custom Requests Lane */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl flex-shrink-0">📋</span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white truncate tracking-tight">
                Supervisors & Brands
              </h2>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Need custom terms? Submit a request for personalized deals.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Request License', 'Custom Version', 'Commission'].map(label => (
                <button key={label} className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg transition-colors font-medium whitespace-nowrap">
                  {label}
                </button>
              ))}
              <button className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs rounded-lg transition-colors font-medium whitespace-nowrap">
                Stems (Code)
              </button>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="space-y-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 sm:p-6 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3">
                    {/* Play Button */}
                    <button className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-emerald-500/25 flex-shrink-0">
                      <span className="text-slate-900 text-base sm:text-lg ml-0.5">▶</span>
                    </button>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white truncate tracking-tight">
                        {track.title}
                      </h3>
                      <div className="flex items-center gap-2 sm:gap-3 text-slate-400 text-xs sm:text-sm font-mono flex-wrap">
                        <span>{track.bpm} BPM</span>
                        <span className="text-slate-600">•</span>
                        <span>{track.key}</span>
                        <span className="text-slate-600">•</span>
                        <span>{track.duration}</span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{track.plays} plays</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="flex flex-col gap-2 sm:gap-3 sm:min-w-[200px] lg:min-w-[220px] flex-shrink-0">
                  {/* Instant License */}
                  <button
                    onClick={() => handleInstantLicense(track)}
                    className="flex items-center justify-between px-4 py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-colors group"
                  >
                    <span className="text-slate-900 font-semibold text-sm">
                      Instant License
                    </span>
                    <span className="text-slate-900 font-bold font-mono">
                      ${track.instantLicensePrice}
                    </span>
                  </button>

                  {/* Buy Download */}
                  <button
                    onClick={() => handleBuyDownload(track)}
                    className="flex items-center justify-between px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl transition-colors"
                  >
                    <span className="text-slate-300 font-medium text-sm">
                      Buy Download
                    </span>
                    <span className="text-white font-bold font-mono">
                      ${track.downloadPrice}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-6 sm:mt-8 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex gap-3">
            <span className="text-cyan-400 text-lg flex-shrink-0">ℹ</span>
            <div className="min-w-0">
              <h4 className="text-cyan-400 font-semibold mb-1">What's the difference?</h4>
              <p className="text-slate-400 text-sm">
                <span className="text-slate-300 font-semibold">Instant License:</span> Non-exclusive license for commercial use. Includes master WAV and instrumental.
                <br />
                <span className="text-slate-300 font-semibold">Buy Download:</span> Personal listening only. Not for commercial use.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedTrack && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl leading-none"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25 text-2xl">
                {checkoutType === 'license' ? '📄' : '⬇'}
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                {checkoutType === 'license' ? 'Instant License' : 'Buy Download'}
              </h2>
              <p className="text-slate-400 truncate px-4">
                {selectedTrack.title}
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
              <h4 className="text-slate-400 text-sm font-semibold mb-3 uppercase tracking-wider">What's Included</h4>
              <ul className="space-y-2">
                {checkoutType === 'license' ? (
                  <>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <span className="text-emerald-400">✓</span> Master WAV (44.1kHz/24-bit)
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <span className="text-emerald-400">✓</span> Instrumental WAV
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <span className="text-emerald-400">✓</span> Non-exclusive license
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <span className="text-emerald-400">✓</span> Worldwide, perpetual
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <span className="text-emerald-400">✓</span> High-quality MP3 (320kbps)
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <span className="text-emerald-400">✓</span> Personal listening only
                    </li>
                    <li className="flex items-center gap-2 text-slate-500 text-sm">
                      <span className="text-slate-600">✗</span> Not for commercial use
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Price Summary */}
            <div className="border-t border-slate-700 pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-sm">Subtotal</span>
                <span className="text-white font-mono font-semibold">
                  ${checkoutType === 'license' ? selectedTrack.instantLicensePrice.toFixed(2) : selectedTrack.downloadPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-sm">Processing</span>
                <span className="text-white font-mono font-semibold">
                  ${checkoutType === 'license' ? '8.97' : '0.44'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Total</span>
                <span className="text-emerald-400 text-xl sm:text-2xl font-bold font-mono">
                  ${checkoutType === 'license' ? (selectedTrack.instantLicensePrice + 8.97).toFixed(2) : (selectedTrack.downloadPrice + 0.44).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Email for delivery</label>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Pay Button */}
            <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/25 text-base">
              Pay with Card
            </button>

            <p className="text-center text-slate-500 text-xs mt-4">
              Secure payment via Stripe. Files delivered instantly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
