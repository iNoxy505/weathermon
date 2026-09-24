import React from 'react';
import { MapPin, Navigation, Clock, AlertTriangle, Wifi, Download } from 'lucide-react';
import { mockSafeZones } from '../data/mockData';
import { useApp } from '../context/AppContext';

interface MapScreenProps {
  onNavigate: (screen: string) => void;
}

export function MapScreen({ onNavigate }: MapScreenProps) {
  const { isOnline } = useApp();
  const [selectedZone, setSelectedZone] = React.useState(mockSafeZones[0]);

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-bold text-white">🗺️ Safe Routes</h1>
        <p className="text-xs text-gray-500 mt-0.5">Navigate to the nearest safe zone</p>
      </div>

      {/* Map Area */}
      <div className="px-5 mb-4">
        <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl overflow-hidden border border-white/10">
          {/* Map SVG */}
          <svg viewBox="0 0 400 260" className="w-full h-full">
            {/* Terrain */}
            <defs>
              <linearGradient id="terrain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="route" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <rect width="400" height="260" fill="url(#terrain)" />
            
            {/* Grid lines */}
            {[...Array(8)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 35} x2="400" y2={i * 35} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={`v${i}`} x1={i * 45} y1="0" x2={i * 45} y2="260" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            ))}

            {/* Roads */}
            <path d="M50 200 Q120 180 200 160 Q280 140 350 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <path d="M0 130 Q100 120 200 130 Q300 140 400 120" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

            {/* River */}
            <path d="M0 80 Q80 90 150 70 Q220 50 300 65 Q380 80 400 75" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="4" />

            {/* Safe route */}
            <path
              d="M180 180 Q200 150 220 130 Q240 110 270 95 Q290 85 310 80"
              fill="none"
              stroke="url(#route)"
              strokeWidth="3"
              strokeDasharray="8 4"
              className="animate-pulse"
            />

            {/* Risk zone */}
            <circle cx="120" cy="100" r="30" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
            <text x="120" y="105" textAnchor="middle" fill="rgba(239,68,68,0.6)" fontSize="8">RISK ZONE</text>

            {/* You marker */}
            <circle cx="180" cy="180" r="8" fill="#14b8a6" />
            <circle cx="180" cy="180" r="14" fill="none" stroke="#14b8a6" strokeWidth="1.5" opacity="0.5" />
            <circle cx="180" cy="180" r="20" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.3" />
            <text x="180" y="200" textAnchor="middle" fill="#14b8a6" fontSize="9" fontWeight="bold">YOU</text>

            {/* Safe zone marker */}
            <circle cx="310" cy="80" r="6" fill="#22c55e" />
            <circle cx="310" cy="80" r="10" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.5" />
            <text x="310" y="70" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">SAFE</text>

            {/* Other safe zones */}
            <circle cx="250" cy="140" r="4" fill="#22c55e" opacity="0.5" />
            <circle cx="340" cy="160" r="4" fill="#22c55e" opacity="0.5" />
          </svg>

          {/* Risk overlay banner */}
          <button
            onClick={() => onNavigate('risk')}
            className="absolute top-3 left-3 right-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium py-2 px-3 rounded-lg flex items-center gap-2"
          >
            <AlertTriangle size={14} />
            <span>High risk area — Exercise caution</span>
          </button>

          {/* Offline indicator */}
          {!isOnline && (
            <div className="absolute bottom-3 right-3 bg-amber-500/90 text-black text-[10px] font-bold py-1 px-2 rounded-md flex items-center gap-1">
              <Download size={10} />
              Offline Map
            </div>
          )}
        </div>
      </div>

      {/* Route Info */}
      <div className="px-5 mb-4">
        <div className="bg-gradient-to-br from-teal-500/10 to-green-500/5 border border-teal-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
              <Navigation className="text-teal-400" size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{selectedZone.name}</p>
              <p className="text-xs text-gray-400">{selectedZone.distance} • {selectedZone.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-teal-400" />
              <span className="text-xs text-gray-400">{selectedZone.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-teal-400" />
              <span className="text-xs text-gray-400">{selectedZone.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safe Zones List */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Nearby Safe Zones</h3>
        <div className="space-y-2">
          {mockSafeZones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                selectedZone.id === zone.id
                  ? 'bg-teal-500/10 border-teal-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedZone.id === zone.id ? 'bg-teal-500/20' : 'bg-white/5'
                }`}>
                  <MapPin size={14} className={selectedZone.id === zone.id ? 'text-teal-400' : 'text-gray-400'} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{zone.name}</p>
                  <p className="text-xs text-gray-500">{zone.distance} • {zone.time}</p>
                </div>
                {selectedZone.id === zone.id && (
                  <span className="text-xs text-teal-400 font-medium">Selected</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="px-5">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          {isOnline ? (
            <>
              <Wifi size={12} className="text-green-400" />
              <span>Live map data</span>
            </>
          ) : (
            <>
              <Download size={12} className="text-amber-400" />
              <span>Using cached map tiles</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
