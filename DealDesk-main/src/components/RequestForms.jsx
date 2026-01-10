import React, { useState } from 'react';

const formTypes = [
  { id: 'license', label: 'License', icon: '📄' },
  { id: 'stems', label: 'Stems', icon: '🎛️' },
  { id: 'custom', label: 'Custom Version', icon: '✂️' },
  { id: 'commission', label: 'Commission', icon: '🎵' }
];

const usageOptions = [
  'Social Media (TikTok, Instagram, YouTube)',
  'Podcast / Radio',
  'Film / Documentary',
  'TV / Streaming Series',
  'Commercial / Advertising',
  'Video Game',
  'Corporate / Internal',
  'Other'
];

const termLengthOptions = [
  '1 Year',
  '2 Years',
  '3 Years',
  '5 Years',
  'In Perpetuity'
];

const territoryOptions = [
  'United States',
  'North America',
  'Europe',
  'Worldwide',
  'Other (specify in notes)'
];

const whyStemsOptions = [
  'Remix for release',
  'Re-record / Cover',
  'Sync edit / Cutdown',
  'Content creation',
  'DJ set / Live performance',
  'Other'
];

const versionTypeOptions = [
  'Clean version',
  'Instrumental',
  'Alt mix',
  ':15 cutdown',
  ':30 cutdown',
  ':60 cutdown',
  'Other'
];

const commissionPurposeOptions = [
  'Commercial / Advertising',
  'Film / TV / Streaming',
  'Podcast intro/outro',
  'Video game',
  'Corporate / Branding',
  'Personal project',
  'Other'
];

const commissionLengthOptions = [
  ':15 (15 seconds)',
  ':30 (30 seconds)',
  ':60 (60 seconds)',
  '1-2 minutes',
  '2-3 minutes',
  '3+ minutes',
  'Flexible'
];

export default function RequestForms() {
  const [activeForm, setActiveForm] = useState('license');
  const [submitted, setSubmitted] = useState(false);
  
  // Form states
  const [licenseForm, setLicenseForm] = useState({
    email: '',
    tracks: '',
    usage: '',
    termLength: '',
    territory: '',
    deadline: '',
    exclusiveInquiry: false,
    budget: '',
    notes: ''
  });

  const [stemsForm, setStemsForm] = useState({
    email: '',
    tracks: '',
    code: '',
    whyStems: '',
    deadline: '',
    notes: '',
    references: ''
  });

  const [customForm, setCustomForm] = useState({
    email: '',
    track: '',
    versionTypes: [],
    deadline: '',
    notes: '',
    reference: ''
  });

  const [commissionForm, setCommissionForm] = useState({
    email: '',
    purpose: '',
    length: '',
    vibeKeywords: '',
    deadline: '',
    references: '',
    budget: '',
    needsStems: false
  });

  const handleVersionTypeToggle = (type) => {
    setCustomForm(prev => ({
      ...prev,
      versionTypes: prev.versionTypes.includes(type)
        ? prev.versionTypes.filter(t => t !== type)
        : [...prev.versionTypes, type]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-6">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
          .font-display { font-family: 'Playfair Display', Georgia, serif; }
          .font-body { font-family: 'DM Sans', -apple-system, sans-serif; }
          .font-mono { font-family: 'IBM Plex Mono', monospace; }
        `}</style>
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Request Submitted</h1>
          <p className="font-body text-gray-600 mb-6">
            You'll receive an email confirmation shortly. The creator will review your request and get back to you within 24-48 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="font-body text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', -apple-system, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-4 border-emerald-500">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold font-body">
              M
            </div>
            <div>
              <p className="font-body text-sm text-gray-400">Request from</p>
              <p className="font-display text-xl font-bold text-white">Marcus Chen</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Form Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {formTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveForm(type.id)}
              className={`px-4 py-2.5 rounded-lg font-body text-sm font-semibold transition-all flex items-center gap-2 ${
                activeForm === type.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span>{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h1 className="font-display text-xl font-bold text-gray-900">
              {activeForm === 'license' && 'License Request'}
              {activeForm === 'stems' && 'Stems Request'}
              {activeForm === 'custom' && 'Custom Version Request'}
              {activeForm === 'commission' && 'Commission Request'}
            </h1>
            <p className="font-body text-sm text-gray-500 mt-1">
              {activeForm === 'license' && 'Request a license for sync, content, or commercial use.'}
              {activeForm === 'stems' && 'Request access to stems and trackouts.'}
              {activeForm === 'custom' && 'Request edits, cutdowns, or alternate versions.'}
              {activeForm === 'commission' && 'Commission original custom music.'}
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* LICENSE FORM */}
            {activeForm === 'license' && (
              <>
                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={licenseForm.email}
                    onChange={(e) => setLicenseForm({...licenseForm, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Track(s) / Release <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={licenseForm.tracks}
                    onChange={(e) => setLicenseForm({...licenseForm, tracks: e.target.value})}
                    placeholder="e.g., Midnight Drive, Neon Pulse"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Usage <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={licenseForm.usage}
                    onChange={(e) => setLicenseForm({...licenseForm, usage: e.target.value})}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="">Select usage type...</option>
                    {usageOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                      Term Length <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={licenseForm.termLength}
                      onChange={(e) => setLicenseForm({...licenseForm, termLength: e.target.value})}
                      className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    >
                      <option value="">Select...</option>
                      {termLengthOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                      Territory <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={licenseForm.territory}
                      onChange={(e) => setLicenseForm({...licenseForm, territory: e.target.value})}
                      className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    >
                      <option value="">Select...</option>
                      {territoryOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={licenseForm.deadline}
                    onChange={(e) => setLicenseForm({...licenseForm, deadline: e.target.value})}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Budget Range <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={licenseForm.budget}
                    onChange={(e) => setLicenseForm({...licenseForm, budget: e.target.value})}
                    placeholder="e.g., $500-1000"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Notes <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={licenseForm.notes}
                    onChange={(e) => setLicenseForm({...licenseForm, notes: e.target.value})}
                    placeholder="Any additional details about your project..."
                    rows={3}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <input
                    type="checkbox"
                    id="exclusive"
                    checked={licenseForm.exclusiveInquiry}
                    onChange={(e) => setLicenseForm({...licenseForm, exclusiveInquiry: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="exclusive" className="font-body text-sm text-amber-800">
                    <span className="font-semibold">Interested in exclusive rights?</span>
                    <span className="block text-amber-600 text-xs mt-0.5">This will flag your request for manual discussion.</span>
                  </label>
                </div>
              </>
            )}

            {/* STEMS FORM */}
            {activeForm === 'stems' && (
              <>
                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={stemsForm.email}
                    onChange={(e) => setStemsForm({...stemsForm, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Track(s) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={stemsForm.tracks}
                    onChange={(e) => setStemsForm({...stemsForm, tracks: e.target.value})}
                    placeholder="e.g., Midnight Drive"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Access Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={stemsForm.code}
                    onChange={(e) => setStemsForm({...stemsForm, code: e.target.value.toUpperCase()})}
                    placeholder="Enter your code"
                    className="w-full px-4 py-3 font-mono text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all uppercase tracking-wider"
                  />
                  <p className="font-body text-xs text-gray-500 mt-1">Don't have a code? Contact the creator directly.</p>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Why do you need stems? <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={stemsForm.whyStems}
                    onChange={(e) => setStemsForm({...stemsForm, whyStems: e.target.value})}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="">Select reason...</option>
                    {whyStemsOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={stemsForm.deadline}
                    onChange={(e) => setStemsForm({...stemsForm, deadline: e.target.value})}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Reference Links <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={stemsForm.references}
                    onChange={(e) => setStemsForm({...stemsForm, references: e.target.value})}
                    placeholder="Links to your project, Spotify, etc."
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Notes <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={stemsForm.notes}
                    onChange={(e) => setStemsForm({...stemsForm, notes: e.target.value})}
                    placeholder="Any additional details..."
                    rows={3}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </>
            )}

            {/* CUSTOM VERSION FORM */}
            {activeForm === 'custom' && (
              <>
                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customForm.email}
                    onChange={(e) => setCustomForm({...customForm, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Track <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customForm.track}
                    onChange={(e) => setCustomForm({...customForm, track: e.target.value})}
                    placeholder="e.g., Midnight Drive"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Version Type(s) <span className="text-gray-400 font-normal">(select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {versionTypeOptions.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleVersionTypeToggle(type)}
                        className={`px-3 py-2 rounded-lg font-body text-sm font-medium transition-all ${
                          customForm.versionTypes.includes(type)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={customForm.deadline}
                    onChange={(e) => setCustomForm({...customForm, deadline: e.target.value})}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Reference Link <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={customForm.reference}
                    onChange={(e) => setCustomForm({...customForm, reference: e.target.value})}
                    placeholder="Link to example of what you're looking for"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Instructions / Notes <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={customForm.notes}
                    onChange={(e) => setCustomForm({...customForm, notes: e.target.value})}
                    placeholder="Describe what you need..."
                    rows={3}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </>
            )}

            {/* COMMISSION FORM */}
            {activeForm === 'commission' && (
              <>
                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={commissionForm.email}
                    onChange={(e) => setCommissionForm({...commissionForm, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    What is this for? <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={commissionForm.purpose}
                    onChange={(e) => setCommissionForm({...commissionForm, purpose: e.target.value})}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="">Select purpose...</option>
                    {commissionPurposeOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Length Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={commissionForm.length}
                    onChange={(e) => setCommissionForm({...commissionForm, length: e.target.value})}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="">Select length...</option>
                    {commissionLengthOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Vibe Keywords <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={commissionForm.vibeKeywords}
                    onChange={(e) => setCommissionForm({...commissionForm, vibeKeywords: e.target.value})}
                    placeholder="e.g., Uplifting, Electronic, Cinematic, Dark"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <p className="font-body text-xs text-gray-500 mt-1">Separate with commas</p>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={commissionForm.deadline}
                    onChange={(e) => setCommissionForm({...commissionForm, deadline: e.target.value})}
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Reference Links <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={commissionForm.references}
                    onChange={(e) => setCommissionForm({...commissionForm, references: e.target.value})}
                    placeholder="Links to tracks that capture the vibe"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                    Budget Range <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={commissionForm.budget}
                    onChange={(e) => setCommissionForm({...commissionForm, budget: e.target.value})}
                    placeholder="e.g., $2,000-5,000"
                    className="w-full px-4 py-3 font-body text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <input
                    type="checkbox"
                    id="needsStems"
                    checked={commissionForm.needsStems}
                    onChange={(e) => setCommissionForm({...commissionForm, needsStems: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="needsStems" className="font-body text-sm text-cyan-800">
                    <span className="font-semibold">I'll need stems included</span>
                    <span className="block text-cyan-600 text-xs mt-0.5">Final delivery will include trackouts/stems.</span>
                  </label>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-body font-bold text-lg rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
              >
                Submit Request
              </button>
              <p className="font-body text-xs text-gray-500 text-center mt-3">
                You'll receive a confirmation email and the creator will respond within 24-48 hours.
              </p>
            </div>
          </form>
        </div>

        {/* Powered by footer */}
        <div className="mt-8 text-center">
          <p className="font-body text-sm text-blue-200">
            Powered by <span className="font-display font-bold">DEAL<span className="text-emerald-400">DESK</span></span>
          </p>
        </div>
      </main>
    </div>
  );
}
