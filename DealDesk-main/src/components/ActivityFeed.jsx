import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ActivityFeed() {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

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

  const filters = ['all', 'unread', 'payments', 'requests', 'messages'];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Unread</p>
          <p className="font-mono text-2xl font-bold text-amber-400">{unreadCount}</p>
        </div>
        <div className="bg-emerald-500/10 rounded-xl border border-emerald-500/30 p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Today's Revenue</p>
          <p className="font-mono text-2xl font-bold text-emerald-400">${todayPayments.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4 hidden sm:block">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Activity</p>
          <p className="font-mono text-2xl font-bold text-white">{activities.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize whitespace-nowrap transition-colors ${
              filter === f ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}>{f}</button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities.map(activity => (
          <div key={activity.id} onClick={() => navigate(`/deals/${activity.deal}`)}
            className={`rounded-xl border p-4 cursor-pointer transition-all hover:bg-slate-700/30 ${getTypeStyles(activity.type)} ${activity.unread ? 'border-l-4' : ''}`}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-xl flex-shrink-0">
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className={`font-semibold truncate ${activity.unread ? 'text-white' : 'text-slate-300'}`}>{activity.title}</h4>
                  <span className="text-slate-500 text-xs whitespace-nowrap">{activity.time}</span>
                </div>
                <p className="text-slate-400 text-sm truncate">{activity.desc}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-slate-500 text-xs font-mono">{activity.deal}</span>
                  {activity.amount && <span className="text-emerald-400 text-xs font-mono font-bold">+${activity.amount.toLocaleString()}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
