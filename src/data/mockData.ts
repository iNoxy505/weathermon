export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'resident' | 'tourist';
  language: string;
  zone?: string;
  currentLocation?: string;
}

export interface RiskFactor {
  name: string;
  value: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  icon: string;
}

export interface RiskData {
  compositeScore: number;
  severityLabel: string;
  computedAt: string;
  confidence: number;
  factors: RiskFactor[];
  explanation: string[];
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'advisory' | 'info';
  title: string;
  description: string;
  area: string;
  issuedAt: string;
  expiresAt?: string;
  read: boolean;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
}

export interface SafeZone {
  id: string;
  name: string;
  distance: string;
  time: string;
  lat: number;
  lng: number;
}

export const mockUser: User = {
  id: '1',
  name: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  phone: '+91 98765 43210',
  role: 'resident',
  language: 'English',
  zone: 'Village A - Shimla District',
  currentLocation: 'Manali, Himachal Pradesh',
};

export const mockTouristUser: User = {
  id: '2',
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  phone: '+1 555-0123',
  role: 'tourist',
  language: 'English',
  currentLocation: 'Manali, Himachal Pradesh',
};

export const mockRiskData: RiskData = {
  compositeScore: 67,
  severityLabel: 'High Risk',
  computedAt: '2 min ago',
  confidence: 89,
  factors: [
    { name: 'Rainfall', value: 78, severity: 'high', icon: 'rain' },
    { name: 'Soil Saturation', value: 65, severity: 'moderate', icon: 'soil' },
    { name: 'River Level', value: 45, severity: 'moderate', icon: 'river' },
    { name: 'Landslide Risk', value: 82, severity: 'critical', icon: 'landslide' },
    { name: 'Wind Speed', value: 35, severity: 'low', icon: 'wind' },
  ],
  explanation: [
    'Heavy rainfall (78%) has saturated the soil in your area over the past 48 hours.',
    'Landslide risk is elevated due to steep terrain combined with soil saturation above 60%.',
    'River levels remain moderate but are rising — monitor for flash flood warnings.',
  ],
};

export const mockAlerts: Alert[] = [
  {
    id: '1',
    severity: 'critical',
    title: 'Landslide Warning — Northern Ridge',
    description: 'A landslide has been detected on the northern ridge road. Avoid the area between km 12-15 of NH-21. Emergency services are on site.',
    area: 'Village A - Northern Sector',
    issuedAt: '15 min ago',
    read: false,
  },
  {
    id: '2',
    severity: 'warning',
    title: 'Heavy Rainfall Expected',
    description: 'IMD has issued a warning for heavy to very heavy rainfall in the next 6 hours. Stay alert and keep emergency contacts ready.',
    area: 'Shimla District',
    issuedAt: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    severity: 'advisory',
    title: 'River Level Rising — Beas River',
    description: 'Water levels at the Beas River monitoring station have risen 1.2m in the last 3 hours. Low-lying areas should prepare for possible flooding.',
    area: 'Beas River Basin',
    issuedAt: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    severity: 'info',
    title: 'Weather Update Available',
    description: 'New satellite data has been processed. Risk scores have been updated for your zone.',
    area: 'Your Zone',
    issuedAt: '5 hours ago',
    read: true,
  },
  {
    id: '5',
    severity: 'warning',
    title: 'Road Closure — Mountain Pass',
    description: 'Rohtang Pass has been closed due to snow and landslide risk. Alternative routes via Atal Tunnel are available.',
    area: 'Manali - Leh Highway',
    issuedAt: '6 hours ago',
    read: true,
  },
];

export const mockWeather: WeatherData = {
  temperature: 18,
  humidity: 82,
  windSpeed: 24,
  condition: 'Heavy Rain',
  icon: 'storm',
  high: 22,
  low: 14,
};

export const mockSafeZones: SafeZone[] = [
  { id: '1', name: 'Community Relief Center', distance: '1.2 km', time: '15 min walk', lat: 32.2432, lng: 77.1892 },
  { id: '2', name: 'Government School (Elevated)', distance: '2.4 km', time: '8 min drive', lat: 32.2398, lng: 77.1934 },
  { id: '3', name: 'District Hospital Complex', distance: '3.8 km', time: '12 min drive', lat: 32.2356, lng: 77.1801 },
];

export const mockSettings = {
  criticalAlerts: true,
  weatherAlerts: true,
  locationUpdates: true,
  locationServices: true,
  offlineMapSize: 45.2,
  offlineMapTotal: 100,
  lastSync: '2 min ago',
};
