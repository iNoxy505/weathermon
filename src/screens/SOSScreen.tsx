import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageSquare, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SOSScreenProps {
  onBack: () => void;
}

export function SOSScreen({ onBack }: SOSScreenProps) {
  const { isOnline } = useApp();
  const [state, setState] = useState<'idle' | 'confirming' | 'sending' | 'sent' | 'sms-fallback'>('idle');

  const handleSOS = () => {
    setState('confirming');
  };

  const handleConfirm = () => {
    setState('sending');
    setTimeout(() => {
      if (isOnline) {
        setState('sent');
      } else {
        setState('sms-fallback');
      }
    }, 2000);
  };

  const handleReset = () => setState('idle');

  return (
    <div className="pb-20 animate-fade-in flex flex-col min-h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl border border-white/10">
          <ArrowLeft size={18} className="text-gray-300" />
        </button>
        <h1 className="text-lg font-bold text-white">Emergency</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5">
        {state === 'idle' && (
          <>
            {/* SOS Button */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse-ring" />
              <div className="absolute inset-[-8px] bg-red-500/10 rounded-full animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
              <button className="relative w-36 h-36 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30 active:scale-95 transition-transform">
                <span className="text-white text-3xl font-black tracking-wider">SOS</span>
              </button>
            </div>

            <h2 className="text-xl font-bold text-white mb-2 text-center">Emergency Assistance</h2>
            <p className="text-sm text-gray-400 text-center max-w-xs mb-8">
              In case of emergency, use the buttons below to alert rescue services or send an SMS with your location.
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={handleSOS}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-red-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
              >
                <Phone size={20} />
                <span>Send SOS — Help is on the way</span>
              </button>
              <button
                onClick={() => setState('sms-fallback')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
              >
                <MessageSquare size={20} />
                <span>Send SMS — Works offline</span>
              </button>
            </div>

            <p className="text-[10px] text-gray-600 text-center mt-6 max-w-xs">
              📍 Your GPS location will be shared with emergency responders. 
              SMS option works without internet connectivity.
            </p>
          </>
        )}

        {state === 'confirming' && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Confirm Emergency SOS</h2>
            <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto">
              This will alert emergency services and share your GPS location. Only proceed if this is a real emergency.
            </p>
            <div className="space-y-3 w-full max-w-xs mx-auto">
              <button
                onClick={handleConfirm}
                className="w-full bg-red-500 text-white font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform"
              >
                Yes, Send SOS Now
              </button>
              <button
                onClick={handleReset}
                className="w-full bg-white/5 border border-white/10 text-gray-300 font-medium py-3 rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {state === 'sending' && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="animate-spin w-10 h-10 text-red-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Sending SOS...</h2>
            <p className="text-sm text-gray-400">Alerting emergency services with your location</p>
          </div>
        )}

        {state === 'sent' && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-400" size={40} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Help is on the way!</h2>
            <p className="text-sm text-gray-400 mb-2">Emergency services have been notified.</p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-8">
              <Clock size={12} />
              <span>Sent at {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-green-400" />
                <span className="text-xs text-green-300">Location shared</span>
              </div>
              <p className="text-xs text-gray-400">32.2432°N, 77.1892°E</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full bg-white/5 border border-white/10 text-gray-300 font-medium py-3 rounded-2xl"
            >
              Done
            </button>
          </div>
        )}

        {state === 'sms-fallback' && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="text-blue-400" size={40} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">SMS Emergency</h2>
            <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto">
              {isOnline
                ? 'This will open your messaging app with a pre-filled emergency message including your GPS coordinates.'
                : 'No internet detected. SMS will be sent via your cellular network — works without data.'}
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6 text-left">
              <p className="text-xs text-gray-400 mb-2">Message preview:</p>
              <p className="text-xs text-white font-mono">
                🆘 EMERGENCY SOS<br />
                Location: 32.2432°N, 77.1892°E<br />
                Time: {new Date().toLocaleString()}<br />
                Please send help immediately.
              </p>
            </div>
            <div className="space-y-3 w-full max-w-xs mx-auto">
              <button
                className="w-full bg-blue-500 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                onClick={() => { setState('sent'); }}
              >
                <MessageSquare size={18} />
                Open SMS App
              </button>
              <button
                onClick={handleReset}
                className="w-full bg-white/5 border border-white/10 text-gray-300 font-medium py-3 rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
