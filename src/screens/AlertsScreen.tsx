import React, { useState } from 'react';
import { ArrowLeft, Wifi, WifiOff } from 'lucide-react';
import { mockAlerts } from '../data/mockData';
import { AlertCard } from '../components/SharedComponents';
import { useApp } from '../context/AppContext';

interface AlertsScreenProps {
  onBack: () => void;
}

export function AlertsScreen({ onBack }: AlertsScreenProps) {
  const { isOnline } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'critical', label: '🚨 Critical' },
    { id: 'warning', label: '⚠️ Warning' },
    { id: 'advisory', label: 'ℹ️ Advisory' },
  ];

  const filteredAlerts = filter === 'all'
    ? mockAlerts
    : mockAlerts.filter(a => a.severity === filter);

  const selected = mockAlerts.find(a => a.id === selectedAlert);

  if (selected) {
    const severityConfig: Record<string, { color: string; bg: string }> = {
      critical: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
      warning: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
      advisory: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
      info: { color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/30' },
    };
    const config = severityConfig[selected.severity];

    return (
      <div className="pb-20 animate-fade-in">
        <div className="px-5 pt-6 pb-4 flex items-center gap-3">
          <button onClick={() => setSelectedAlert(null)} className="p-2 bg-white/5 rounded-xl border border-white/10">
            <ArrowLeft size={18} className="text-gray-300" />
          </button>
          <h1 className="text-lg font-bold text-white">Alert Detail</h1>
        </div>
        <div className="px-5">
          <div className={`${config.bg} border rounded-2xl p-5`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold ${config.color} uppercase`}>{selected.severity}</span>
              <span className="text-xs text-gray-500">• {selected.issuedAt}</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-3">{selected.title}</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">{selected.description}</p>
            <div className="border-t border-white/10 pt-3">
              <p className="text-xs text-gray-500">Area: {selected.area}</p>
              {selected.expiresAt && <p className="text-xs text-gray-500">Expires: {selected.expiresAt}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-white">🔔 Alerts</h1>
        <p className="text-xs text-gray-500 mt-0.5">Stay informed about hazards in your area</p>
      </div>

      {/* Filters */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filter === f.id
                  ? 'bg-teal-500 text-white'
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="px-5 space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onClick={() => setSelectedAlert(alert.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <span className="text-4xl mb-3 block">✅</span>
            <p className="text-sm text-gray-400">No active alerts in your area</p>
            <p className="text-xs text-gray-600 mt-1">You're all clear for now</p>
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          {isOnline ? (
            <>
              <Wifi size={12} className="text-green-400" />
              <span>Live • Last synced just now</span>
            </>
          ) : (
            <>
              <WifiOff size={12} className="text-amber-400" />
              <span>Offline • Showing cached alerts</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
