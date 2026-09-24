import React from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { mockRiskData } from '../data/mockData';
import { RiskGauge, FactorBar } from '../components/SharedComponents';

interface RiskScoreScreenProps {
  onBack: () => void;
}

export function RiskScoreScreen({ onBack }: RiskScoreScreenProps) {
  const [expandedFactor, setExpandedFactor] = React.useState<number | null>(null);

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl border border-white/10">
          <ArrowLeft size={18} className="text-gray-300" />
        </button>
        <div>
          <p className="text-xs text-gray-500">Home › Risk Score</p>
          <h1 className="text-lg font-bold text-white">Safety Composite</h1>
        </div>
      </div>

      {/* Gauge */}
      <div className="px-5 mb-6">
        <RiskGauge score={mockRiskData.compositeScore} label={mockRiskData.severityLabel} />
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">Last Updated</p>
            <p className="text-xs text-white font-medium">{mockRiskData.computedAt}</p>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="text-center">
            <p className="text-xs text-gray-500">Confidence</p>
            <p className="text-xs text-white font-medium">{mockRiskData.confidence}%</p>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Risk Factors</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
          {mockRiskData.factors.map((factor, idx) => (
            <div key={factor.name}>
              <button
                onClick={() => setExpandedFactor(expandedFactor === idx ? null : idx)}
                className="w-full"
              >
                <FactorBar name={factor.name} value={factor.value} severity={factor.severity} />
              </button>
              {expandedFactor === idx && (
                <div className="ml-27 pl-28 pb-2 animate-fade-in">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-gray-400">
                      {factor.name === 'Rainfall' && 'Current rainfall intensity is 78% of the danger threshold. Expected to continue for 4 more hours.'}
                      {factor.name === 'Soil Saturation' && 'Soil moisture content at 65%. Ground absorption capacity is significantly reduced.'}
                      {factor.name === 'River Level' && 'River at 45% of flood stage. Monitoring stations show gradual rise over past 6 hours.'}
                      {factor.name === 'Landslide Risk' && 'Terrain slope + saturation combination puts this area in critical landslide zone. Historical data shows 3 events in similar conditions.'}
                      {factor.name === 'Wind Speed' && 'Wind at 35% of advisory threshold. Currently within normal range for the season.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="px-5 mb-4">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-400" />
            <h3 className="text-sm font-semibold text-amber-300">Why is this a risk?</h3>
          </div>
          <ul className="space-y-2">
            {mockRiskData.explanation.map((text, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                <p className="text-xs text-gray-300 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legend */}
      <div className="px-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <h4 className="text-xs font-semibold text-gray-400 mb-2">Severity Scale</h4>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex rounded-full overflow-hidden h-2">
              <div className="flex-1 bg-green-500" />
              <div className="flex-1 bg-yellow-500" />
              <div className="flex-1 bg-orange-500" />
              <div className="flex-1 bg-red-500" />
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-500">Low</span>
            <span className="text-[10px] text-gray-500">Moderate</span>
            <span className="text-[10px] text-gray-500">High</span>
            <span className="text-[10px] text-gray-500">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
}
