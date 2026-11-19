import React from 'react';
import { 
  Map, 
  Activity, 
  FileText, 
  ShieldCheck, 
  ArrowUpRight, 
  Flame, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { ActiveView } from '../../types';

interface OverviewDashboardProps {
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
}

interface OverviewMetricCard {
  id: string;
  category: string;
  metric: string;
  value: string;
  unit: string;
  status: 'Critical' | 'Warning' | 'Monitored';
  exceedance: string;
  location: string;
  source: string;
  date: string;
  confidence: number;
}

const OVERVIEW_METRICS: OverviewMetricCard[] = [
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
  },
  {
    id: 'm4',
    category: 'Agricultural Pollution',
    metric: 'Nitrate (NO3) Runoff',
    value: '14.2',
    unit: 'mg/L',
    status: 'Warning',
    exceedance: '1.42x Permissible Baseline (10.0 mg/L)',
    location: 'Kannauj to Prayagraj Belt',
    source: 'CPCB Basin Surveillance',
    date: 'November 2026',
    confidence: 92,
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
  },
  {
    id: 'm7',
    category: 'Biodiversity Vulnerability',
    metric: 'Ganges River Dolphin Density',
    value: '0.42',
    unit: 'ind / km',
    status: 'Critical',
    exceedance: '62% Population Decline since 2000',
    location: 'Vikramshila Sanctuary, Bihar',
    source: 'Wildlife Institute of India (WII)',
    date: 'Annual Assessment 2025-2026',
    confidence: 89,
  },
  {
    id: 'm8',
    category: 'Delta Ecosystem',
    metric: 'Estuarine Salinity Front',
    value: '8.4',
    unit: 'PSU',
    status: 'Warning',
    exceedance: '112 km Inland Penetration (Passur Reach)',
    location: 'Sundarbans Delta, Khulna Division',
    source: 'BWDB Coastal Hydrology',
    date: 'November 2026',
    confidence: 91,
  },
];

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onOpenMethodology,
}) => {
  const getStatusBadge = (status: OverviewMetricCard['status']) => {
    switch (status) {
      case 'Critical':
        return 'bg-accent-red/20 text-accent-red border-accent-red/40';
      case 'Warning':
        return 'bg-accent-amber/20 text-accent-amber border-accent-amber/40';
      default:
        return 'bg-accent-green/20 text-accent-green border-accent-green/40';
    }
  };

  return (
    <div className="space-y-10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Headline & Strategic Positioning */}
      <section className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-red animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-red">
                ACUTE BASIN SURVEILLANCE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-text-primary leading-tight font-sans">
              THE GANGES IS UNDER PRESSURE
            </h1>

            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              Draining 1.72 million square kilometers across northern India and Bangladesh, the transboundary 
              Ganges-Brahmaputra-Meghna basin supports over 650 million people. Today, untreated municipal outfalls, 
              concentrated industrial chemical discharges, widespread geogenic arsenic mobilization, and upstream flow 
              interruptions threaten ecological resilience and regional public health. FREE THE GANGES provides 
              independent, continuous, and scientifically verified surveillance of this critical watershed.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('atlas')}
                className="min-h-[44px] px-5 py-2.5 rounded-lg bg-accent-cyan text-base font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-accent-cyan/90 transition-colors shadow-lg shadow-accent-cyan/10"
              >
                <Map className="w-4 h-4" />
                <span>Launch Environmental Atlas</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('indicators')}
                className="min-h-[44px] px-5 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary font-medium text-xs tracking-wider flex items-center gap-2 hover:bg-surface-hover hover:border-accent-cyan/40 transition-colors"
              >
                <Activity className="w-4 h-4 text-accent-cyan" />
                <span>Examine Indicators</span>
              </button>

              <button
                type="button"
                onClick={onOpenMethodology}
                className="min-h-[44px] px-4 py-2.5 rounded-lg text-text-muted hover:text-text-primary font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-text-secondary" />
                <span>Data Methodology</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="shrink-0 bg-surface-elevated border border-border-strong rounded-lg p-5 lg:w-80 space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase text-text-secondary tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent-cyan" />
              Basin Monitored Dimensions
            </h3>

            <div className="space-y-3 font-mono text-xs divide-y divide-border-subtle">
              <div className="flex justify-between pt-1">
                <span className="text-text-muted">Total Catchment Area:</span>
                <span className="text-text-primary font-bold">1,720,000 km²</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-text-muted">Riparian Population:</span>
                <span className="text-text-primary font-bold">650M+ Citizens</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-text-muted">Tracked River Systems:</span>
                <span className="text-accent-cyan font-bold">15 Major Rivers</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-text-muted">Documented Hotspots:</span>
                <span className="text-accent-red font-bold">11 High Priority</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-text-muted">Water Quality Hubs:</span>
                <span className="text-accent-green font-bold">16 Telemetry Stations</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-text-muted">Spatial Bounds:</span>
                <span className="text-text-primary font-bold">20°N-32°N, 73°E-98°E</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8 Domain Metric Panels Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-text-primary font-sans flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-cyan" />
              Transboundary Environmental Metric Panels
            </h2>
            <p className="text-xs text-text-muted font-mono mt-0.5">
              Verified multi-parameter baseline measurements across India and Bangladesh
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('indicators')}
            className="min-h-[44px] px-3 text-xs font-mono text-accent-cyan hover:underline flex items-center gap-1"
          >
            <span>All Scientific Charts</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {OVERVIEW_METRICS.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-border-subtle rounded-lg p-4 space-y-3 hover:border-accent-cyan/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">
                    {item.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border uppercase ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="font-semibold text-text-primary text-sm line-clamp-1">
                  {item.metric}
                </div>

                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-2xl font-bold font-mono text-text-primary">
                    {item.value}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {item.unit}
                  </span>
                </div>

                <p className="text-[11px] font-mono text-accent-red font-medium">
                  {item.exceedance}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle space-y-1 text-[10px] font-mono text-text-secondary">
                <div className="truncate text-text-muted">
                  Location: <span className="text-text-primary">{item.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="truncate">Source: {item.source}</span>
                  <span className="text-accent-cyan shrink-0">Conf: {item.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Intelligence Highlights & Research Teaser */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Intelligence Briefing Card */}
        <div className="lg:col-span-2 bg-surface border border-border-subtle rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2 font-sans">
              <Flame className="w-4 h-4 text-accent-amber" />
              Regional Intelligence Briefing: Winter Hydrological Stagnation
            </h3>
            <span className="text-[11px] font-mono text-text-secondary">
              Report Ref: GBM-INTEL-2026-11
            </span>
          </div>

          <p className="text-xs text-text-muted leading-relaxed">
            As monsoon discharge subsides, base river flow across the Middle Ganga and lower Yamuna has dropped below 
            historical seasonal medians. In Kanpur and Varanasi, dilution capacity is critically impaired, resulting in 
            elevated biochemical oxygen demand (BOD) exceeding 30 mg/L in immediate outfall mixing zones. Concurrently, 
            downstream in Dhaka, the Buriganga and Shitalakshya river systems are approaching near-total biological anoxia, 
            driven by untreated industrial textile effluents and municipal wastewater.
          </p>

          <div className="p-3.5 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
            <h4 className="text-xs font-semibold text-text-primary font-mono uppercase tracking-wider text-accent-cyan">
              Key Actionable Watchlist Points:
            </h4>
            <ul className="space-y-1 text-xs text-text-muted list-disc list-inside">
              <li>Kanpur Jajmau: 36 MLD CETP operating above hydraulic capacity with bypass into Sisamau Nala.</li>
              <li>West Bengal Alluvial Belt: Chronic shallow tube-well arsenic levels exceeding 300 µg/L.</li>
              <li>Sundarbans Mangrove Reach: Seasonal salinity intrusion extending upstream toward Khulna.</li>
            </ul>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('atlas')}
              className="min-h-[44px] px-4 py-2 rounded bg-surface-elevated border border-border-subtle hover:border-accent-cyan/40 text-xs font-mono text-accent-cyan flex items-center gap-2 transition-colors"
            >
              <span>Inspect Affected Atlas Reaches</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Research Publication Teaser */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-base font-semibold text-text-primary font-sans">
                Featured Publication
              </h3>
            </div>

            <div className="p-1 rounded inline-block bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 text-[10px] font-mono uppercase">
              Scientific Assessment 2026
            </div>

            <h4 className="text-sm font-semibold text-text-primary leading-snug">
              Transboundary Arsenic Hydrodynamics: Alluvial Transport Across the Bengal Delta Plain
            </h4>

            <p className="text-xs text-text-muted leading-relaxed line-clamp-4">
              A comprehensive multi-year empirical investigation into the mobility of geogenic arsenic in shallow 
              Holocene aquifers between West Bengal and Southwestern Bangladesh, evaluating deep-well extraction 
              impacts and agricultural bioaccumulation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('research')}
            className="w-full min-h-[44px] px-4 py-2.5 rounded bg-surface-elevated border border-border-subtle hover:border-accent-cyan/40 text-xs font-mono text-text-primary flex items-center justify-center gap-2 transition-colors"
          >
            <span>View All Research & Reports</span>
            <ChevronRight className="w-4 h-4 text-accent-cyan" />
          </button>
        </div>

      </section>
    </div>
  );
};
