import React, { useState } from 'react';

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState('30d');

  const stats = {
    revenue: { value: 24750, change: 18, label: 'Revenue' },
    deals: { value: 12, change: 25, label: 'Deals Closed' },
    avgDeal: { value: 2062, change: -5, label: 'Avg Deal Size' },
    conversion: { value: 34, change: 8, label: 'Conversion %' },
  };

  const topBuyers = [
    { name: 'Netflix', company: 'Netflix', deals: 4, total: 8500, avatar: 'NF' },
    { name: 'Sarah Chen', company: 'Universal Music', deals: 3, total: 6200, avatar: 'SC' },
    { name: 'Nike Creative', company: 'Nike', deals: 2, total: 5500, avatar: 'NK' },
    { name: 'DJ Metro', company: 'Independent', deals: 5, total: 2100, avatar: 'DM' },
  ];

  const dealTypes = [
    { type: 'License', count: 8, revenue: 12500, color: 'purple' },
    { type: 'Commission', count: 3, revenue: 8500, color: 'cyan' },
    { type: 'Stems', count: 6, revenue: 2400, color: 'pink' },
    { type: 'Custom Version', count: 4, revenue: 1350, color: 'violet' },
  ];

  return (
    <div className="space-y-6">
      {/* Period Toggle */}
      <div className="flex justify-between items-center">
        <p className="text-slate-400 text-sm">Performance overview and insights</p>
        <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg">
          {['7d', '30d', '90d', 'all'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                period === p ? 'bg-emerald-500 text-slate-900' : 'text-slate-400 hover:text-white'
              }`}>{p === 'all' ? 'All Time' : p}</button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(stats).map((stat, i) => (
          <div key={i} className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="font-mono text-2xl font-bold text-white">
              {stat.label.includes('Revenue') || stat.label.includes('Avg') ? `$${stat.value.toLocaleString()}` : stat.label.includes('%') ? `${stat.value}%` : stat.value}
            </p>
            <p className={`text-xs mt-1 ${stat.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}% vs last period
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Types */}
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 sm:p-6">
          <h3 className="font-display text-lg font-bold text-white mb-4 tracking-tight">By Deal Type</h3>
          <div className="space-y-4">
            {dealTypes.map((dt, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white font-medium">{dt.type}</span>
                  <span className="text-slate-400">{dt.count} deals • <span className="text-emerald-400 font-mono">${dt.revenue.toLocaleString()}</span></span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full bg-${dt.color}-500 rounded-full`} style={{ width: `${(dt.revenue / stats.revenue.value) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Buyers */}
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 sm:p-6">
          <h3 className="font-display text-lg font-bold text-white mb-4 tracking-tight">Top Buyers</h3>
          <div className="space-y-3">
            {topBuyers.map((buyer, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                  {buyer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{buyer.name}</p>
                  <p className="text-slate-500 text-xs truncate">{buyer.company} • {buyer.deals} deals</p>
                </div>
                <p className="text-emerald-400 font-mono font-bold">${buyer.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4 sm:p-6">
        <h3 className="font-display text-lg font-bold text-white mb-4 tracking-tight">Revenue Over Time</h3>
        <div className="h-48 flex items-center justify-center border border-dashed border-slate-700 rounded-xl">
          <p className="text-slate-500 text-sm">📊 Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
}
