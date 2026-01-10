import React, { useState } from 'react';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = {
    totalRevenue: 285000,
    revenueChange: 23,
    dealsCompleted: 47,
    dealsChange: 15,
    avgDealSize: 6063,
    avgDealChange: 8,
    avgResponseTime: '2.4h',
    responseChange: -18,
  };

  const revenueByType = [
    { type: 'License', amount: 125000, deals: 18, pct: 44 },
    { type: 'Commission', amount: 95000, deals: 12, pct: 33 },
    { type: 'Custom', amount: 42000, deals: 10, pct: 15 },
    { type: 'Stems', amount: 23000, deals: 7, pct: 8 },
  ];

  const topBuyers = [
    { name: 'Universal Music', deals: 8, revenue: 45000, initials: 'UM' },
    { name: 'Netflix', deals: 6, revenue: 38000, initials: 'NF' },
    { name: 'Peloton', deals: 5, revenue: 28000, initials: 'PE' },
    { name: 'Sarah Chen', deals: 4, revenue: 22000, initials: 'SC' },
  ];

  const monthlyRevenue = [
    { month: 'Aug', amount: 18 },
    { month: 'Sep', amount: 24 },
    { month: 'Oct', amount: 31 },
    { month: 'Nov', amount: 28 },
    { month: 'Dec', amount: 42 },
    { month: 'Jan', amount: 52 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Nav Bar */}
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-2 border-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-slate-900 font-bold text-lg font-mono">D</span>
            </div>
            <span className="font-display text-white text-xl font-bold tracking-wide truncate">DealDesk</span>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-slate-400 text-sm hidden sm:block uppercase tracking-wider">Analytics</span>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">KS</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">Analytics</h1>
            <p className="text-slate-400 text-sm">Track your deal performance and revenue</p>
          </div>
          <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl flex-shrink-0">
            {['7D', '30D', '90D', 'YTD'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range.toLowerCase())}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  timeRange === range.toLowerCase() ? 'bg-emerald-500 text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Total Revenue', value: `$${(stats.totalRevenue / 1000).toFixed(0)}K`, change: stats.revenueChange, highlight: true },
            { label: 'Deals Closed', value: stats.dealsCompleted, change: stats.dealsChange },
            { label: 'Avg Deal Size', value: `$${stats.avgDealSize.toLocaleString()}`, change: stats.avgDealChange },
            { label: 'Response Time', value: stats.avgResponseTime, change: stats.responseChange, invert: true },
          ].map((metric, i) => (
            <div key={i} className={`p-4 sm:p-5 rounded-2xl border ${
              metric.highlight ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border-emerald-500/30' : 'bg-slate-800/40 border-slate-700/50'
            }`}>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-slate-400 text-xs uppercase tracking-wider truncate">{metric.label}</span>
                <span className={`text-xs sm:text-sm font-semibold flex-shrink-0 ${
                  (metric.invert ? metric.change < 0 : metric.change > 0) ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <p className={`text-2xl sm:text-3xl font-bold font-mono ${metric.highlight ? 'text-emerald-400' : 'text-white'}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-6">
            <h3 className="font-display text-lg font-bold text-white mb-4 sm:mb-6 tracking-tight">Revenue Trend</h3>
            <div className="flex items-end justify-between h-40 sm:h-48 gap-2 sm:gap-4">
              {monthlyRevenue.map((month, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-lg min-h-[8px]"
                    style={{ height: `${(month.amount / 52) * 100}%` }}
                  />
                  <span className="text-slate-400 text-xs">{month.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-slate-700 gap-4">
              <div className="min-w-0">
                <span className="text-slate-400 text-xs uppercase tracking-wider">Peak</span>
                <p className="text-white font-bold font-mono truncate">Jan: $52K</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-slate-400 text-xs uppercase tracking-wider">6-Mo Total</span>
                <p className="text-emerald-400 font-bold font-mono">$195K</p>
              </div>
            </div>
          </div>

          {/* Revenue by Type */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-6">
            <h3 className="font-display text-lg font-bold text-white mb-4 sm:mb-6 tracking-tight">By Deal Type</h3>
            <div className="space-y-4">
              {revenueByType.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5 gap-2">
                    <span className="text-slate-300 text-sm truncate">{item.type}</span>
                    <span className="text-white font-semibold font-mono flex-shrink-0">${(item.amount / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                  <p className="text-slate-500 text-xs mt-1">{item.deals} deals</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Buyers */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-6">
          <h3 className="font-display text-lg font-bold text-white mb-4 sm:mb-6 tracking-tight">Top Buyers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {topBuyers.map((buyer, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 bg-slate-900/30 rounded-xl">
                <span className="text-slate-500 text-sm font-mono w-4 flex-shrink-0">{i + 1}</span>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-xs flex-shrink-0">
                  {buyer.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-semibold text-sm truncate">{buyer.name}</p>
                  <p className="text-slate-500 text-xs">{buyer.deals} deals</p>
                </div>
                <p className="text-emerald-400 font-bold font-mono text-sm flex-shrink-0">
                  ${(buyer.revenue / 1000).toFixed(0)}K
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
