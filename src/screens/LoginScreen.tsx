import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { login } = useApp();
  const [role, setRole] = useState<'resident' | 'tourist'>('resident');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    const success = login(email, password, role);
    setLoading(false);
    if (success) {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-navy-dark via-navy to-slate-900 overflow-y-auto">
      {/* Hero Section */}
      <div className="relative pt-12 pb-8 px-6 text-center">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.qwenlm.ai/generated-images/32fae6a2-14b4-43ac-ae6e-ac46bda90142/_result.png"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="relative z-10">
          <div className="relative w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20 overflow-hidden">
            <img
              src="https://images.qwenlm.ai/generated-images/3dd7a587-010e-4db2-8b4a-b4c19ca00ce0/_result.png"
              alt="WeatherGuard Logo"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">WeatherGuard</h1>
          <p className="text-sm text-teal-300 font-medium">No Internet Should Not Mean No Warning</p>
        </div>
      </div>

      {/* Value Props */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🔔', text: 'Real-time Alerts' },
            { icon: '🗺️', text: 'Safe Route Guidance' },
            { icon: '🆘', text: 'Emergency Assistance' },
            { icon: '📡', text: 'Offline-First Design' },
          ].map((item) => (
            <div key={item.text} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs text-gray-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Role Selector */}
      <div className="px-6 mb-6">
        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
          <button
            onClick={() => setRole('resident')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              role === 'resident'
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                : 'text-gray-400'
            }`}
          >
            🏠 Resident
          </button>
          <button
            onClick={() => setRole('tourist')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              role === 'tourist'
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                : 'text-gray-400'
            }`}
          >
            🧭 Tourist
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="px-6 flex-1">
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end">
            <button className="text-xs text-teal-400 hover:text-teal-300">Forgot password?</button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs text-center animate-fade-in">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </span>
            ) : (
              'Login'
            )}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-navy px-3 text-xs text-gray-500">or continue with</span>
            </div>
          </div>

          <button className="w-full bg-white/5 border border-white/10 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6 pb-6">
            Don't have an account?{' '}
            <button className="text-teal-400 font-semibold hover:text-teal-300">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
