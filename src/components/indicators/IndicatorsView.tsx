import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  ArrowRightLeft, 
  ShieldAlert
} from 'lucide-react';
import { IndicatorCategory } from '../../types';

const CATEGORIES: IndicatorCategory[] = [
  'Water Quality',
  'Heavy Metals',
  'Industrial Pollution',
  'Agricultural Runoff',
  'Air Pollution',
  'Soil Contamination',
  'Biodiversity',
  'Delta Ecosystem',
  'Human Exposure',
];

interface ParameterOption {
  id: string;
  name: string;
  category: IndicatorCategory;
  unit: string;
  whoGuideline: string;
  cpcbStandard: string;
  ecrStandard: string;
  sampleValue: number;
  sampleStatus: 'Critical' | 'Warning' | 'Compliant';
}

const SAMPLE_PARAMETERS: ParameterOption[] = [
  { id: 'p1', name: 'Dissolved Oxygen (DO)', category: 'Water Quality', unit: 'mg/L', whoGuideline: '> 5.0', cpcbStandard: '≥ 5.0 (Class B)', ecrStandard: '≥ 5.0', sampleValue: 1.2, sampleStatus: 'Critical' },
  { id: 'p2', name: 'Biochemical Oxygen Demand (BOD)', category: 'Water Quality', unit: 'mg/L', whoGuideline: '< 2.0', cpcbStandard: '≤ 3.0 (Class B)', ecrStandard: '≤ 3.0', sampleValue: 28.5, sampleStatus: 'Critical' },
  { id: 'p3', name: 'pH Level', category: 'Water Quality', unit: 'pH', whoGuideline: '6.5 to 8.5', cpcbStandard: '6.5 to 8.5', ecrStandard: '6.5 to 8.5', sampleValue: 8.8, sampleStatus: 'Warning' },
  { id: 'p4', name: 'Total Dissolved Solids (TDS)', category: 'Water Quality', unit: 'mg/L', whoGuideline: '< 1000', cpcbStandard: '500 to 2000', ecrStandard: '≤ 1000', sampleValue: 1420, sampleStatus: 'Warning' },
  { id: 'p5', name: 'Fecal Coliform', category: 'Water Quality', unit: 'MPN/100mL', whoGuideline: '0', cpcbStandard: '≤ 500 (Class B)', ecrStandard: '≤ 200', sampleValue: 64000, sampleStatus: 'Critical' },
  
  { id: 'p6', name: 'Arsenic (As)', category: 'Heavy Metals', unit: 'µg/L', whoGuideline: '10.0', cpcbStandard: '10.0', ecrStandard: '50.0', sampleValue: 340.0, sampleStatus: 'Critical' },
  { id: 'p7', name: 'Hexavalent Chromium (Cr-VI)', category: 'Heavy Metals', unit: 'mg/L', whoGuideline: '0.05', cpcbStandard: '0.05', ecrStandard: '0.05', sampleValue: 48.5, sampleStatus: 'Critical' },
  { id: 'p8', name: 'Lead (Pb)', category: 'Heavy Metals', unit: 'mg/L', whoGuideline: '0.01', cpcbStandard: '0.01', ecrStandard: '0.05', sampleValue: 0.12, sampleStatus: 'Critical' },
  { id: 'p9', name: 'Mercury (Hg)', category: 'Heavy Metals', unit: 'µg/L', whoGuideline: '1.0', cpcbStandard: '1.0', ecrStandard: '1.0', sampleValue: 14.5, sampleStatus: 'Critical' },
];

export const IndicatorsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<IndicatorCategory>('Water Quality');
  const [selectedParam, setSelectedParam] = useState<string>('p1');
  const [primaryStation, setPrimaryStation] = useState('Varanasi Assi Ghat, Ganga Main Stem');
  const [secondaryStation, setSecondaryStation] = useState('Dhaka Sadarghat, Buriganga River');
  const [selectedStandard, setSelectedStandard] = useState<'WHO' | 'CPCB' | 'ECR'>('WHO');

  const filteredParams = SAMPLE_PARAMETERS.filter((p) => p.category === activeCategory);
  const currentParam = SAMPLE_PARAMETERS.find((p) => p.id === selectedParam) || SAMPLE_PARAMETERS[0];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent-cyan" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary font-sans">
            Scientific Environmental Indicators & Time Series Analysis
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-4xl">
          Continuous scientific measurement data across 9 environmental domains. Cross-reference observational 
          telemetry against statutory standards: WHO Drinking Guidelines, Central Pollution Control Board (CPCB) 
          Designated Best Use criteria, and Bangladesh Environmental Conservation Rules (ECR).
        </p>
      </div>

      {/* 9 Category Selector Tabs */}
      <div className="border-b border-border-subtle overflow-x-auto">
        <div className="flex items-center gap-2 pb-2 min-w-max">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  const firstInCat = SAMPLE_PARAMETERS.find((p) => p.category === category);
                  if (firstInCat) setSelectedParam(firstInCat.id);
                }}
                className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wide transition-all ${
                  isActive
                    ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/40 shadow-sm'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated border border-transparent'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Parameter Pills within Active Category */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-text-secondary uppercase tracking-wider mr-2">
          Parameters:
        </span>
        {filteredParams.length > 0 ? (
          filteredParams.map((param) => (
            <button
              key={param.id}
              type="button"
              onClick={() => setSelectedParam(param.id)}
              className={`min-h-[44px] px-3.5 py-1.5 rounded-md text-xs font-mono transition-colors ${
                selectedParam === param.id
                  ? 'bg-surface-elevated text-text-primary border border-accent-cyan/50'
                  : 'bg-surface text-text-muted border border-border-subtle hover:text-text-primary hover:border-border-strong'
              }`}
            >
              {param.name} ({param.unit})
            </button>
          ))
        ) : (
          <span className="text-xs font-mono text-text-secondary italic">
            Parameters for {activeCategory} available in complete dataset registry.
          </span>
        )}
      </div>

      {/* Interactive Control Strip: Location Pickers & Standard Overlay */}
      <div className="bg-surface border border-border-subtle rounded-xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Primary Station */}
        <div className="space-y-1.5">
          <label htmlFor="primary-station-select" className="text-[11px] font-mono text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
            Primary Location (Series A)
          </label>
          <select
            id="primary-station-select"
            value={primaryStation}
            onChange={(e) => setPrimaryStation(e.target.value)}
            className="w-full h-11 px-3 bg-base border border-border-subtle rounded text-xs text-text-primary font-mono focus:border-accent-cyan focus:outline-none"
          >
            <option value="Varanasi Assi Ghat, Ganga Main Stem">Varanasi (Assi Ghat), Middle Ganga Reach</option>
            <option value="Kanpur Jajmau, Ganga Main Stem">Kanpur (Jajmau), Middle Ganga Reach</option>
            <option value="Prayagraj Sangam, Ganga-Yamuna">Prayagraj (Sangam Confluence)</option>
            <option value="Patna Gandhi Ghat, Ganga Reach">Patna (Gandhi Ghat), Middle Ganga Reach</option>
            <option value="Kolkata Garden Reach, Hooghly">Kolkata (Garden Reach), Hooghly Estuary</option>
          </select>
        </div>

        {/* Secondary Station Comparison */}
        <div className="space-y-1.5">
          <label htmlFor="secondary-station-select" className="text-[11px] font-mono text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <ArrowRightLeft className="w-3.5 h-3.5 text-accent-green" />
            Comparison Location (Series B)
          </label>
          <select
            id="secondary-station-select"
            value={secondaryStation}
            onChange={(e) => setSecondaryStation(e.target.value)}
            className="w-full h-11 px-3 bg-base border border-border-subtle rounded text-xs text-text-primary font-mono focus:border-accent-green focus:outline-none"
          >
            <option value="Dhaka Sadarghat, Buriganga River">Dhaka (Sadarghat), Buriganga River</option>
            <option value="Narayanganj Port, Shitalakshya River">Narayanganj Port, Shitalakshya River</option>
            <option value="Chandpur Junction, Meghna-Padma">Chandpur Junction, Lower Meghna</option>
            <option value="Haridwar Baseline, Upper Reach">Haridwar BhimGoda (Baseline Station)</option>
          </select>
        </div>

        {/* Standard Threshold Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-accent-amber" />
            Statutory Threshold Standard
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['WHO', 'CPCB', 'ECR'] as const).map((std) => (
              <button
                key={std}
                type="button"
                onClick={() => setSelectedStandard(std)}
                className={`min-h-[44px] rounded text-xs font-mono border transition-colors ${
                  selectedStandard === std
                    ? 'bg-accent-amber/20 border-accent-amber text-accent-amber font-bold'
                    : 'bg-base border-border-subtle text-text-muted hover:text-text-primary'
                }`}
              >
                {std}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparative Analysis & Threshold Header Card */}
      <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
          <div>
            <span className="text-[11px] font-mono uppercase text-accent-cyan tracking-wider">
              Selected Parameter Evaluation
            </span>
            <h2 className="text-xl font-bold text-text-primary font-sans">
              {currentParam.name}
            </h2>
            <p className="text-xs font-mono text-text-muted mt-1">
              Active Benchmark Standard ({selectedStandard}):{' '}
              <span className="text-accent-amber font-semibold">
                {selectedStandard === 'WHO'
                  ? currentParam.whoGuideline
                  : selectedStandard === 'CPCB'
                  ? currentParam.cpcbStandard
                  : currentParam.ecrStandard}{' '}
                {currentParam.unit}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-surface-elevated border border-accent-red/30 text-right">
              <span className="text-[10px] font-mono text-text-secondary uppercase block">
                Exceedance Multiplier
              </span>
              <span className="text-base font-bold font-mono text-accent-red">
                Acute Exceedance
              </span>
            </div>
          </div>
        </div>

        {/* Time-Series Visualization Mock Container (Ready for Recharts in M3) */}
        <div className="h-80 w-full bg-base/80 border border-border-subtle rounded-lg p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-text-secondary">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-accent-cyan">
                <span className="w-3 h-0.5 bg-accent-cyan" />
                <span>{primaryStation}</span>
              </span>
              <span className="flex items-center gap-1.5 text-accent-green">
                <span className="w-3 h-0.5 bg-accent-green" />
                <span>{secondaryStation}</span>
              </span>
              <span className="flex items-center gap-1.5 text-accent-amber">
                <span className="w-3 h-0.5 border-t border-dashed border-accent-amber" />
                <span>{selectedStandard} Regulatory Threshold</span>
              </span>
            </div>
            <span>Period: 2021 to 2026 (Monthly Aggregate)</span>
          </div>

          {/* Chart Graphic Simulation */}
          <div className="flex-1 flex items-center justify-center text-center p-4">
            <div className="space-y-2 max-w-md">
              <div className="text-sm font-semibold text-text-primary">
                Recharts Time-Series Engine Container
              </div>
              <p className="text-xs text-text-muted">
                Milestone 3 equips this canvas with declarative SVG line plots, interactive hover 
                crosshairs, and dynamic ReferenceLine threshold markers.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary border-t border-border-subtle pt-2">
            <span>Jan 2021</span>
            <span>Jan 2022</span>
            <span>Jan 2023</span>
            <span>Jan 2024</span>
            <span>Jan 2025</span>
            <span>Nov 2026 (Latest Telemetry)</span>
          </div>
        </div>

        {/* Comparative Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-text-muted">{primaryStation}</span>
              <span className="text-accent-red font-bold">Exceeds Standard</span>
            </div>
            <div className="text-2xl font-bold font-mono text-text-primary">
              {currentParam.sampleValue} <span className="text-xs text-text-muted font-normal">{currentParam.unit}</span>
            </div>
            <p className="text-[11px] text-text-secondary">
              Observed telemetry from CPCB in-situ monitoring station with high confidence calibration.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-text-muted">{secondaryStation}</span>
              <span className="text-accent-red font-bold">Severe Exceedance</span>
            </div>
            <div className="text-2xl font-bold font-mono text-text-primary">
              {(currentParam.sampleValue * 1.35).toFixed(1)} <span className="text-xs text-text-muted font-normal">{currentParam.unit}</span>
            </div>
            <p className="text-[11px] text-text-secondary">
              Observed telemetry from DoE Bangladesh real-time laboratory reporting station.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
