import React from 'react';
import { Activity, ChevronRight, ArrowUpRight } from 'lucide-react';
import { ActiveView } from '../../types';
import { useScrollReveal } from '../../utils/useScrollReveal';

interface MetricPanelsGridProps {
  onNavigate: (view: ActiveView) => void;
}

export interface OverviewMetricItem {
  id: string;
  category: string;
  metric: string;
  value: string;
  unit: string;
  status: 'Critical' | 'Severe' | 'Watchlist' | 'Monitored';
  exceedance: string;
  location: string;
  source: string;
  date: string;
  confidence: number;
  targetView: 'atlas' | 'indicators';
}

const OVERVIEW_METRICS: OverviewMetricItem[] = [
  {
    id: 'm1',
    category: 'Water Quality',
    metric: 'Dissolved Oxygen Deficit',
    value: '0.2',
    unit: 'mg/L',
    status: 'Critical',
    exceedance: 'Severe Anoxia (Standard: > 5.0 mg/L)',
    location: 'Dhaka, Buriganga River',
    source: 'DoE Bangladesh RTWQMS',
    date: 'November 2026',
    confidence: 96,
    targetView: 'indicators',
  },
  {
    id: 'm2',
    category: 'Heavy Metals',
    metric: 'Hexavalent Chromium (Cr-VI)',
    value: '48.5',
    unit: 'mg/L',
    status: 'Critical',
    exceedance: '970x WHO Drinking Limit (0.05 mg/L)',
    location: 'Kanpur, Jajmau Tannery Reach',
    source: 'CPCB Real-time Network',
    date: 'November 2026',
    confidence: 94,
    targetView: 'indicators',
  },
  {
    id: 'm3',
    category: 'Industrial Pollution',
    metric: 'Untreated Industrial Effluent',
    value: '450',
    unit: 'MLD',
    status: 'Critical',
    exceedance: '400+ Industrial Units Discharging',
    location: 'Middle Ganga Industrial Belt',
    source: 'NMCG Infrastructure Audit',
    date: 'October 2026',
    confidence: 90,
    targetView: 'atlas',
  },
  {
    id: 'm4',
    category: 'Agricultural Pollution',
    metric: 'Nitrate (NO3) Runoff',
    value: '14.2',
    unit: 'mg/L',
    status: 'Watchlist',
    exceedance: '1.42x Permissible Baseline (10.0 mg/L)',
    location: 'Kannauj to Prayagraj Belt',
    source: 'CPCB Basin Surveillance',
    date: 'November 2026',
    confidence: 92,
    targetView: 'indicators',
  },
  {
    id: 'm5',
    category: 'Air Quality (IGP Airshed)',
    metric: 'Atmospheric PM2.5 Inversion',
    value: '284',
    unit: 'µg/m³',
    status: 'Critical',
    exceedance: '18.9x WHO 24-hr Guideline (15 µg/m³)',
    location: 'Delhi-Varanasi-Patna Corridor',
    source: 'Copernicus Sentinel-5P',
    date: 'November 2026',
    confidence: 95,
    targetView: 'indicators',
  },
  {
    id: 'm6',
    category: 'Soil Contamination',
    metric: 'Alluvial Arsenic Translocation',
    value: '520',
    unit: 'µg/L',
    status: 'Critical',
    exceedance: '52.0x WHO Limit (10 µg/L)',
    location: 'Murshidabad & Nadia Aquifers',
    source: 'CGWB & SOES Bengal Study',
    date: 'September 2026',
    confidence: 97,
    targetView: 'indicators',
  },
  {
    id: 'm7',
    category: 'Biodiversity Vulnerability',
    metric: 'Ganges River Dolphin Density',
    value: '0.42',
    unit: 'ind / km',
    status: 'Severe',
    exceedance: '62% Population Decline since 2000',
    location: 'Vikramshila Sanctuary, Bihar',
    source: 'Wildlife Institute of India (WII)',
    date: 'Annual Assessment 2025-2026',
    confidence: 89,
    targetView: 'atlas',
  },
  {
    id: 'm8',
    category: 'Delta Conditions',
    metric: 'Estuarine Salinity Front',
    value: '8.4',
    unit: 'PSU',
    status: 'Watchlist',
    exceedance: '112 km Inland Penetration (Passur Reach)',
    location: 'Sundarbans Delta, Khulna Division',
    source: 'BWDB Coastal Hydrology',
    date: 'November 2026',
    confidence: 91,
    targetView: 'atlas',
  },
];

export const MetricPanelsGrid: React.FC<MetricPanelsGridProps> = ({ onNavigate }) => {
  const gridRef = useScrollReveal<HTMLDivElement>({ selector: '.metric-card', stagger: 0.06 });

  const getStatusTextColor = (status: OverviewMetricItem['status']) => {
    switch (status) {
      case 'Critical':
      case 'Severe':
        return 'text-accent-red';
      case 'Watchlist':
        return 'text-accent-amber';
      case 'Monitored':
      default:
        return 'text-accent-green';
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-sans font-bold text-white flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-text-secondary" />
            Transboundary Environmental Metric Panels
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Verified multi-parameter baseline measurements across India and Bangladesh
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('indicators')}
          className="min-h-[44px] px-3.5 py-2 text-xs font-medium text-text-secondary hover:text-text-primary hover:underline flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>All Scientific Charts</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {OVERVIEW_METRICS.map((item) => (
          <div
            key={item.id}
            className="metric-card bg-surface border border-border-subtle rounded-xl p-6 space-y-4 hover:border-border-strong transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-secondary">
                  {item.category}
                </span>
                <span className={`text-[11px] font-medium ${getStatusTextColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="font-semibold text-text-primary text-sm line-clamp-1">
                {item.metric}
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-3xl font-bold font-mono text-text-primary tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs font-mono text-text-secondary">
                  {item.unit}
                </span>
              </div>

              <p className="text-xs text-accent-red font-medium leading-relaxed">
                {item.exceedance}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle/80 space-y-2.5 text-xs text-text-secondary">
              <div className="truncate text-text-secondary">
                Location: <span className="text-text-primary">{item.location}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="truncate">Source: {item.source}</span>
                <span className="text-text-secondary shrink-0 font-mono">Conf: {item.confidence}%</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(item.targetView)}
                className="w-full min-h-[44px] px-3 py-2 rounded-lg bg-surface-elevated hover:bg-surface-hover border border-border-subtle hover:border-border-strong text-text-primary text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <span>Examine in {item.targetView === 'atlas' ? 'Atlas' : 'Indicators'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
