import React, { useState } from 'react';

export default function ActivityFeed() {
  const [filter, setFilter] = useState('all');

  const activities = [
    { id: 1, type: 'payment', icon: '💰', title: 'Payment received', desc: 'Sarah Chen paid $2,500 for "Midnight Dynasty"', deal: 'DD-2024-0892', time: '2 min ago', unread: true, amount: 2500 },
    { id: 2, type: 'request', icon: '📥', title: 'New stems request', desc: 'DJ Remix King requested stems for "Golden Hour"', deal: 'DD-2024-0893', time: '15 min ago', unread: true },
    { id: 3, type: 'message', icon: '💬', title: 'New message', desc: 'Marcus Thompson: "Can we discuss the sync fee?"', deal: 'DD-2024-0887', time: '1 hour ago', unread: true },
    { id: 4, type: 'counter', icon: '🔄', title: 'Counter received', desc: 'Amanda Foster countered $8,000 → $6,500', deal: 'DD-2024-0890', time: '2 hours ago', unread: false },
    { id: 5, type: 'delivery', icon: '📦', title: 'Files downloaded', desc: 'Sarah Chen downloaded master files', deal: 'DD-2024-0892', time: '3 hours ago', unread: false },
    { id: 6, type: 'accepted', icon: '✅', title: 'Terms accepted', desc: 'Netflix accepted custom version terms', deal: 'DD-2024-0888', time: '5 hours ago', unread: false, amount: 3500 },
  ];

  const unreadCount = activities.filter(a => a.unread).length;
  const todayPayments = activities.filter(a => a.amount).reduce((sum, a) => sum + (a.amount || 0), 0);
  const filteredActivities = filter === 'all' ? activities : activities.filter(a => filter === 'unread' ? a.unread : a.type === filter.replace('s', ''));

  const getTypeStyles = (type) => {
    const styles = {
      payment: 'bg-emerald-500/20 border-emerald-500/30',
      request: 'bg-cyan-500/20 border-cyan-500/30',
      message: 'bg-blue-500/20 border-blue-500/30',
      counter: 'bg-amber-500/20 border-amber-500/30',
      delivery: 'bg-purple-500/20 border-purple-500/30',
      accepted: 'bg-emerald-500/20 border-emerald-500/30',
    };
    return styles[type] || 'bg-slate-500/20 border-slate-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Nav Bar */}
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-2 border-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-slate-900 font-bold text-lg font-mono">D</span>
            </div>
            <span className="font-display text-white text-xl font-bold tracking-wide truncate">DealDesk</span>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0 relative">
            <span className="text-slate-400 text-sm hidden sm:block uppercase tracking-wider">Activity</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 right-8 sm:right-12 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                {unreadCount}
              </span>
            )}
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">KS</div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">Activity Feed</h1>
            <p className="text-slate-400 text-sm">Everything happening across your deals</p>
          </div>
          <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 rounded-xl transition-colors border border-slate-700 text-sm font-medium flex-shrink-0">
            Mark all read
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 sm:p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Unread</p>
            <p className="text-xl sm:text-2xl font-bold text-white font-mono">{unreadCount}</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 sm:p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Received</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">${todayPayments.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 sm:p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">New Requests</p>
            <p className="text-xl sm:text-2xl font-bold text-white font-mono">{activities.filter(a => a.type === 'request' && a.unread).length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'payments', label: 'Payments' },
            { id: 'requests', label: 'Requests' },
            { id: 'messages', label: 'Messages' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                filter === f.id ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className={`bg-slate-800/40 border rounded-xl p-4 hover:bg-slate-800/60 transition-all cursor-pointer ${
                activity.unread ? 'border-emerald-500/30' : 'border-slate-700/50'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl border flex-shrink-0 ${getTypeStyles(activity.type)}`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm sm:text-base truncate">{activity.title}</h3>
                    {activity.unread && <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-slate-400 text-sm truncate mb-2">{activity.desc}</p>
                  <div className="flex items-center gap-3 text-xs">
                    {activity.deal && <span className="text-cyan-400 font-mono">{activity.deal}</span>}
                    <span className="text-slate-500">{activity.time}</span>
                  </div>
                </div>
                {activity.amount && (
                  <span className="text-emerald-400 font-bold font-mono text-sm sm:text-base flex-shrink-0">
                    +${activity.amount.toLocaleString()}
                  </span>
                )}
                <span className="text-slate-500 self-center flex-shrink-0">→</span>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🔔</div>
            <h3 className="text-white font-semibold mb-2">No activity yet</h3>
            <p className="text-slate-400 text-sm">New deal activity will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
