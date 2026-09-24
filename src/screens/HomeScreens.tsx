import React from 'react';
import { Bell, ChevronRight, CloudRain, Droplets, Wind, Mountain, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockRiskData, mockWeather, mockAlerts } from '../data/mockData';
import { RiskBadge, FactorBar } from '../components/SharedComponents';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeResident({ onNavigate }: HomeScreenProps) {
  const { user } = useApp();
  const unreadCount = mockAlerts.filter(a => !a.read).length;

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">Good morning,</p>
            <h1 className="text-xl font-bold text-white">{user?.name?.split(' ')[0] || 'User'}</h1>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <MapPin size={10} /> {user?.zone || 'Village A'}
            </p>
          </div>
          <button onClick={() => onNavigate('alerts')} className="relative p-2 bg-white/5 rounded-xl border border-white/10">
            <Bell size={20} className="text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Risk Card */}
      <div className="px-5 mb-4">
        <button
          onClick={() => onNavigate('risk')}
          className="w-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 text-left hover:bg-white/[0.07] transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <RiskBadge score={mockRiskData.compositeScore} label={mockRiskData.severityLabel} />
              <span className="text-xs text-gray-500">Updated {mockRiskData.computedAt}</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </div>
          <h2 className="text-white font-semibold text-sm mb-1">Area Safety Status</h2>
          <p className="text-xs text-gray-400">
            Landslide risk is elevated. Heavy rainfall expected in the next 6 hours.
          </p>
        </button>
      </div>

      {/* Weather Card */}
      <div className="px-5 mb-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Current Weather</p>
              <p className="text-3xl font-bold text-white">{mockWeather.temperature}°C</p>
              <p className="text-xs text-gray-400 mt-1">{mockWeather.condition}</p>
              <p className="text-xs text-gray-500">H: {mockWeather.high}° L: {mockWeather.low}°</p>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-1">🌧️</div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Droplets size={10} /> {mockWeather.humidity}%
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Wind size={10} /> {mockWeather.windSpeed} km/h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Current Conditions</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <FactorBar name="Rainfall" value={mockRiskData.factors[0].value} severity={mockRiskData.factors[0].severity} />
          <FactorBar name="Soil Saturation" value={mockRiskData.factors[1].value} severity={mockRiskData.factors[1].severity} />
          <FactorBar name="River Level" value={mockRiskData.factors[2].value} severity={mockRiskData.factors[2].severity} />
          <FactorBar name="Wind Speed" value={mockRiskData.factors[4].value} severity={mockRiskData.factors[4].severity} />
        </div>
      </div>

      {/* Safety Overview */}
      <div className="px-5 mb-4">
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🛡️</span>
            <h3 className="text-sm font-semibold text-teal-300">Safety Overview</h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Based on current telemetry, your area has an elevated risk level. Stay alert and keep emergency contacts accessible. 
            The nearest safe zone is 1.2 km away.
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-[10px] text-gray-400">Telemetry verified</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-teal-400 rounded-full" />
              <span className="text-[10px] text-gray-400">Offline cached</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeTourist({ onNavigate }: HomeScreenProps) {
  const { user } = useApp();

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">Welcome,</p>
            <h1 className="text-xl font-bold text-white">{user?.name?.split(' ')[0] || 'Traveler'}</h1>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <MapPin size={10} /> {user?.currentLocation || 'Current Location'}
            </p>
          </div>
          <button onClick={() => onNavigate('alerts')} className="relative p-2 bg-white/5 rounded-xl border border-white/10">
            <Bell size={20} className="text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>

      {/* Risk Card */}
      <div className="px-5 mb-4">
        <button
          onClick={() => onNavigate('risk')}
          className="w-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 text-left"
        >
          <div className="flex items-center justify-between mb-3">
            <RiskBadge score={mockRiskData.compositeScore} label={mockRiskData.severityLabel} />
            <span className="text-xs text-gray-500">Updated {mockRiskData.computedAt}</span>
          </div>
          <h2 className="text-white font-semibold text-sm mb-1">Area Risk Summary</h2>
          <p className="text-xs text-gray-400">
            This region has elevated landslide risk due to recent heavy rainfall. Exercise caution on mountain roads.
          </p>
        </button>
      </div>

      {/* Nearest Safe Zone */}
      <div className="px-5 mb-4">
        <button
          onClick={() => onNavigate('map')}
          className="w-full bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-2xl p-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <MapPin className="text-green-400" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Nearest Safe Zone</p>
              <p className="text-sm font-semibold text-white">Community Relief Center</p>
              <p className="text-xs text-green-400">1.2 km · 15 min walk</p>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </div>
        </button>
      </div>

      {/* Weather */}
      <div className="px-5 mb-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Weather</p>
              <p className="text-3xl font-bold text-white">{mockWeather.temperature}°C</p>
              <p className="text-xs text-gray-400">{mockWeather.condition}</p>
            </div>
            <div className="text-4xl">🌧️</div>
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="px-5 mb-4">
        <button
          onClick={() => onNavigate('map')}
          className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden text-left"
        >
          <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <path d="M0 100 Q100 60 200 100 T400 100" fill="none" stroke="rgba(20,184,166,0.3)" strokeWidth="2" />
                <path d="M0 130 Q100 90 200 130 T400 130" fill="none" stroke="rgba(20,184,166,0.2)" strokeWidth="1.5" />
                <circle cx="200" cy="100" r="6" fill="#14b8a6" />
                <circle cx="200" cy="100" r="12" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0.5" />
                <circle cx="280" cy="80" r="4" fill="#22c55e" />
                <path d="M200 100 L280 80" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <MapPin className="text-teal-400 mx-auto mb-1" size={24} />
              <p className="text-xs text-gray-300">Tap to view full map</p>
            </div>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">Safe route to Community Relief Center</span>
            <ChevronRight size={14} className="text-gray-500" />
          </div>
        </button>
      </div>

      {/* Status */}
      <div className="px-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-[10px] text-gray-400">Telemetry verified</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-teal-400 rounded-full" />
            <span className="text-[10px] text-gray-400">Offline cached</span>
          </div>
        </div>
      </div>
    </div>
  );
}
