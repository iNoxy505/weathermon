import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginScreen } from './screens/LoginScreen';
import { HomeResident, HomeTourist } from './screens/HomeScreens';
import { RiskScoreScreen } from './screens/RiskScoreScreen';
import { AlertsScreen } from './screens/AlertsScreen';
import { SOSScreen } from './screens/SOSScreen';
import { MapScreen } from './screens/MapScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { BottomNav, OfflineBanner } from './components/SharedComponents';
import { mockAlerts } from './data/mockData';
import { Wifi, WifiOff, Shield } from 'lucide-react';

function AppContent() {
  const { isAuthenticated, isOnline, setOnline, user, logout } = useApp();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState('home');

  const unreadAlerts = mockAlerts.filter(a => !a.read).length;

  const navigate = (screen: string) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen(previousScreen || 'home');
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('home');
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-950 p-4">
        {/* Phone Frame */}
        <div className="relative w-full max-w-[390px] h-[844px] max-h-[95vh] bg-slate-900 rounded-[3rem] border-[3px] border-slate-700 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50" />
          {/* Status Bar */}
          <div className="relative z-40 flex items-center justify-between px-8 pt-2 pb-1 text-[10px] text-white/60">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
          {/* Screen Content */}
          <div className="h-[calc(100%-28px)] overflow-y-auto scrollbar-hide custom-scrollbar">
            <LoginScreen onLogin={() => setCurrentScreen('home')} />
          </div>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return user?.role === 'tourist'
          ? <HomeTourist onNavigate={navigate} />
          : <HomeResident onNavigate={navigate} />;
      case 'risk':
        return <RiskScoreScreen onBack={goBack} />;
      case 'alerts':
        return <AlertsScreen onBack={goBack} />;
      case 'sos':
        return <SOSScreen onBack={goBack} />;
      case 'map':
        return <MapScreen onNavigate={navigate} />;
      case 'settings':
        return <SettingsScreen onLogout={handleLogout} />;
      default:
        return <HomeResident onNavigate={navigate} />;
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-slate-950 p-4">
      {/* Desktop sidebar info */}
      <div className="hidden lg:flex flex-col items-start mr-8 max-w-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 overflow-hidden">
            <img
              src="https://images.qwenlm.ai/generated-images/3dd7a587-010e-4db2-8b4a-b4c19ca00ce0/_result.png"
              alt="Logo"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">WeatherGuard</h1>
            <p className="text-xs text-teal-400">Disaster Safety Platform</p>
          </div>
        </div>
        <div className="space-y-3 text-sm text-gray-400">
          <p>🔔 Real-time hazard alerts</p>
          <p>📊 Area risk scoring</p>
          <p>🗺️ Safe route guidance</p>
          <p>🆘 One-tap emergency SOS</p>
          <p>📡 Offline-first design</p>
        </div>
        <div className="mt-6 space-y-2">
          <button
            onClick={() => setOnline(!isOnline)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isOnline
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isOnline ? 'Online — Tap to simulate offline' : 'Offline — Tap to go online'}
          </button>
          <p className="text-[10px] text-gray-600">Toggle connectivity to test offline behavior</p>
        </div>
      </div>

      {/* Phone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] max-h-[95vh] bg-slate-900 rounded-[3rem] border-[3px] border-slate-700 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50" />
        {/* Status Bar */}
        <div className="relative z-40 flex items-center justify-between px-8 pt-2 pb-1 text-[10px] text-white/60">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setOnline(!isOnline)}
              className="flex items-center gap-0.5"
              title="Toggle connectivity"
            >
              {isOnline ? (
                <Wifi size={10} className="text-green-400" />
              ) : (
                <WifiOff size={10} className="text-amber-400" />
              )}
            </button>
            <span>🔋</span>
          </div>
        </div>
        {/* Offline Banner */}
        <div className="relative z-30">
          <OfflineBanner />
        </div>
        {/* Screen Content */}
        <div className="h-[calc(100%-28px)] overflow-y-auto scrollbar-hide custom-scrollbar bg-gradient-to-b from-navy-dark to-slate-900">
          {renderScreen()}
        </div>
        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <BottomNav
            active={currentScreen}
            onNavigate={navigate}
            unreadAlerts={unreadAlerts}
          />
          {/* Home indicator */}
          <div className="h-5 bg-navy-dark/95 flex items-center justify-center">
            <div className="w-28 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Mobile connectivity toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-[100]">
        <button
          onClick={() => setOnline(!isOnline)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg ${
            isOnline
              ? 'bg-green-500/90 text-white'
              : 'bg-amber-500/90 text-black'
          }`}
        >
          {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isOnline ? 'Online' : 'Offline'}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
