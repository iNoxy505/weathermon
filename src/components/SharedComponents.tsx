import React from 'react';
import { Home, MapPin, Bell, Phone, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BottomNavProps {
  active: string;
  onNavigate: (screen: string) => void;
  unreadAlerts?: number;
}

export function BottomNav({ active, onNavigate, unreadAlerts = 0 }: BottomNavProps) {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: MapPin, label: 'Map' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: unreadAlerts },
    { id: 'sos', icon: Phone, label: 'SOS' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-navy-dark/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-2">
        {items.map((item) => {
          const isActive = active === item.id;
          const isSOS = item.id === 'sos';
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
                isSOS
                  ? 'bg-red-500/20 text-red-400'
                  : isActive
                  ? 'text-teal-400'
                  : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <item.icon size={22} strokeWidth={isActive || isSOS ? 2.5 : 1.5} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive || isSOS ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {isActive && !isSOS && (
                <div className="absolute -bottom-1 w-4 h-0.5 bg-teal-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function OfflineBanner() {
  const { isOnline } = useApp();
  if (isOnline) return null;
  return (
    <div className="bg-amber-500/90 text-black text-center text-xs font-semibold py-1.5 px-4">
      ⚡ You're offline — showing cached data
    </div>
  );
}

export function RiskBadge({ score, label, size = 'md' }: { score: number; label: string; size?: 'sm' | 'md' | 'lg' }) {
  const getColor = (s: number) => {
    if (s >= 75) return 'bg-red-500';
    if (s >= 50) return 'bg-orange-500';
    if (s >= 25) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`${getColor(score)} ${sizes[size]} text-white font-bold rounded-full inline-flex items-center gap-1`}>
      <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
      {label}
    </span>
  );
}

export function FactorBar({ name, value, severity }: { name: string; value: number; severity: string }) {
  const getBarColor = (s: string) => {
    switch (s) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-xs text-gray-400 w-24 truncate">{name}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(severity)} rounded-full transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-white w-8 text-right">{value}%</span>
    </div>
  );
}

export function RiskGauge({ score, label }: { score: number; label: string }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 75) return '#ef4444';
    if (s >= 50) return '#f97316';
    if (s >= 25) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="45" fill="none"
          stroke={getColor(score)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-gauge-fill"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
    </div>
  );
}

export function AlertCard({ alert, onClick }: { alert: any; onClick?: () => void }) {
  const severityConfig: Record<string, { color: string; bg: string; icon: string }> = {
    critical: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', icon: '🚨' },
    warning: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', icon: '⚠️' },
    advisory: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', icon: 'ℹ️' },
    info: { color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/30', icon: '📋' },
  };

  const config = severityConfig[alert.severity] || severityConfig.info;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border ${config.bg} transition-all hover:scale-[1.01] active:scale-[0.99]`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-sm ${config.color}`}>{alert.title}</h3>
            {!alert.read && <span className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0" />}
          </div>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{alert.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] text-gray-500">{alert.area}</span>
            <span className="text-[10px] text-gray-600">•</span>
            <span className="text-[10px] text-gray-500">{alert.issuedAt}</span>
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

export function ToggleRow({ label, description, enabled, onToggle }: { label: string; description?: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 mr-4">
        <p className="text-sm text-white font-medium">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-teal-500' : 'bg-gray-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
