import React, { useState } from 'react';
import { User, Phone, Globe, Bell, MapPin, Download, HardDrive, Clock, ChevronRight, Shield } from 'lucide-react';
import { ToggleRow } from '../components/SharedComponents';
import { mockSettings } from '../data/mockData';
import { useApp } from '../context/AppContext';

interface SettingsScreenProps {
  onLogout: () => void;
}

export function SettingsScreen({ onLogout }: SettingsScreenProps) {
  const { user } = useApp();
  const [settings, setSettings] = useState(mockSettings);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [language, setLanguage] = useState(user?.language || 'English');
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownload = () => {
    setDownloading(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setSettings(s => ({ ...s, offlineMapSize: s.offlineMapSize + 12.3 }));
          return 0;
        }
        return prev + 5;
      });
    }, 150);
  };

  const languages = ['English', 'हिन्दी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'Español', 'Français'];

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-white">⚙️ Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">Manage your preferences and data</p>
      </div>

      {/* Account Section */}
      <div className="px-5 mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Account</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Name</label>
            <div className="flex items-center gap-2">
              <User size={14} className="text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none"
              />
            </div>
          </div>
          <div className="border-t border-white/5" />
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Phone</label>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-500" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none"
              />
            </div>
          </div>
          <div className="border-t border-white/5" />
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Language</label>
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="flex items-center gap-2 w-full"
            >
              <Globe size={14} className="text-gray-500" />
              <span className="flex-1 text-left text-white text-sm">{language}</span>
              <ChevronRight size={14} className={`text-gray-500 transition-transform ${showLangPicker ? 'rotate-90' : ''}`} />
            </button>
            {showLangPicker && (
              <div className="mt-2 bg-navy-dark rounded-xl border border-white/10 overflow-hidden animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLangPicker(false); }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      lang === language ? 'text-teal-400 bg-teal-500/10' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="px-5 mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Notifications</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <ToggleRow
            label="Critical Alerts"
            description="Life-threatening hazard warnings"
            enabled={settings.criticalAlerts}
            onToggle={() => toggleSetting('criticalAlerts')}
          />
          <div className="border-t border-white/5" />
          <ToggleRow
            label="Weather Alerts"
            description="Rainfall, temperature, wind updates"
            enabled={settings.weatherAlerts}
            onToggle={() => toggleSetting('weatherAlerts')}
          />
          <div className="border-t border-white/5" />
          <ToggleRow
            label="Location Updates"
            description="Zone-based risk notifications"
            enabled={settings.locationUpdates}
            onToggle={() => toggleSetting('locationUpdates')}
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="px-5 mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Location</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <ToggleRow
            label="Location Services"
            description="Required for accurate risk scoring"
            enabled={settings.locationServices}
            onToggle={() => toggleSetting('locationServices')}
          />
        </div>
      </div>

      {/* Offline Section */}
      <div className="px-5 mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Offline Data</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <Download size={14} className="text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Download Map Area</p>
                <p className="text-xs text-gray-500">Cache tiles for offline use</p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-3 py-1.5 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded-lg disabled:opacity-50"
            >
              {downloading ? `${downloadProgress}%` : 'Download'}
            </button>
          </div>

          {downloading && (
            <div className="mb-4 animate-fade-in">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-150"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Storage */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <HardDrive size={12} className="text-gray-500" />
                <span className="text-xs text-gray-400">Storage Used</span>
              </div>
              <span className="text-xs text-gray-400">{settings.offlineMapSize} MB / {settings.offlineMapTotal} MB</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all"
                style={{ width: `${(settings.offlineMapSize / settings.offlineMapTotal) * 100}%` }}
              />
            </div>
          </div>

          {/* Last Sync */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <Clock size={12} className="text-gray-500" />
            <span className="text-xs text-gray-500">Last sync: {settings.lastSync}</span>
          </div>
        </div>
      </div>

      {/* About / Security */}
      <div className="px-5 mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">About</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Shield size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-white font-medium">WeatherGuard</p>
              <p className="text-xs text-gray-500">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            "No Internet Should Not Mean No Warning" — A disaster-safety platform for residents and tourists in hazard-prone areas.
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 pb-6">
        <button
          onClick={onLogout}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-400 font-semibold py-3 rounded-xl hover:bg-red-500/20 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
