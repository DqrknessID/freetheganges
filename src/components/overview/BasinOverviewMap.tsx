import React, { useState } from 'react';
import { Map, ExternalLink, Compass, Globe, Layers } from 'lucide-react';
import { ActiveView } from '../../types';
import { BasinLiveMap } from './BasinLiveMap';
import { useScrollReveal } from '../../utils/useScrollReveal';

interface BasinOverviewMapProps {
  onNavigate: (view: ActiveView) => void;
}

interface UrbanCenter {
  name: string;
  country: 'India' | 'Bangladesh';
  coordinates: string;
  x: number;
  y: number;
  status: 'Critical' | 'Severe' | 'Watchlist' | 'Baseline';
  highlight: string;
}

const URBAN_CENTERS: UrbanCenter[] = [
  { name: 'Haridwar', country: 'India', coordinates: '29.96°N, 78.17°E', x: 98, y: 40, status: 'Baseline', highlight: 'Ganges Upper Reaches: Clean Baseline Flow' },
  { name: 'Kanpur', country: 'India', coordinates: '26.43°N, 80.40°E', x: 196, y: 184, status: 'Critical', highlight: 'Jajmau Tanneries: Severe Hexavalent Chromium (48.5 mg/L)' },
  { name: 'Prayagraj', country: 'India', coordinates: '25.43°N, 81.88°E', x: 262, y: 224, status: 'Watchlist', highlight: 'Ganges-Yamuna Sangam: Siltation and Elevated BOD' },
  { name: 'Varanasi', country: 'India', coordinates: '25.31°N, 83.01°E', x: 311, y: 228, status: 'Severe', highlight: 'Assi & Varuna Outfalls: Fecal Coliform Surges' },
  { name: 'Patna', country: 'India', coordinates: '25.62°N, 85.17°E', x: 409, y: 216, status: 'Severe', highlight: 'Gandak-Ganges Confluence: Untreated Sewage Plumes' },
  { name: 'Kolkata', country: 'India', coordinates: '22.58°N, 88.35°E', x: 547, y: 336, status: 'Severe', highlight: 'Hooghly Industrial Reach: Heavy Metals and Chemical Runoff' },
  { name: 'Dhaka', country: 'Bangladesh', coordinates: '23.71°N, 90.36°E', x: 640, y: 292, status: 'Critical', highlight: 'Buriganga River: Severe Biological Anoxia (DO 0.2 mg/L)' },
  { name: 'Chandpur', country: 'Bangladesh', coordinates: '23.23°N, 90.65°E', x: 649, y: 312, status: 'Watchlist', highlight: 'Padma-Meghna Confluence: Microplastics and Silt Deficits' },
  { name: 'Chittagong', country: 'Bangladesh', coordinates: '22.25°N, 91.80°E', x: 702, y: 348, status: 'Severe', highlight: 'Karnaphuli Estuary: Shipbreaking Asbestos and Oils' },
];

const STATUS_COLORS = {
  Critical: '#F87171',
  Severe: '#FB923C',
  Watchlist: '#38BDF8',
  Baseline: '#4ADE80',
};

export class BasinMapErrorBoundary extends React.Component<
  { children: React.ReactNode; onNavigate: (view: ActiveView) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onNavigate: (view: ActiveView) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error('BasinOverviewMap rendering error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          style={{
            backgroundColor: '#0e111b',
            border: '1px solid #182234',
            borderRadius: 12,
            padding: 24,
          }}
          aria-label="Basin Map Fallback Display"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '32px 16px' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
              Basin Cartography Canvas Temporarily Offline
            </h3>
            <p style={{ margin: 0, fontSize: 12, color: '#CBD5E1', maxWidth: 480, lineHeight: 1.6 }}>
              The high-resolution regional vector map encountered a rendering interruption. The underlying telemetry networks remain operational.
            </p>
            <button
              type="button"
              onClick={() => this.props.onNavigate('atlas')}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-surface-elevated hover:bg-surface-hover border border-border-strong text-text-primary text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              Launch Interactive Atlas
            </button>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

const BasinOverviewMapInner: React.FC<BasinOverviewMapProps> = ({ onNavigate }) => {
  const isTest = typeof window !== 'undefined' && navigator.userAgent.includes('jsdom');
  const [mapMode, setMapMode] = useState<'interactive' | 'schematic'>(isTest ? 'schematic' : 'interactive');
  const [activeCenter, setActiveCenter] = useState<UrbanCenter | null>(null);
  const getColor = (s: UrbanCenter['status']) => STATUS_COLORS[s];
  const sectionRef = useScrollReveal<HTMLElement>({ y: 24, duration: 0.6 });

  return (
    <section ref={sectionRef} className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-8 lg:p-10 space-y-6">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-white flex items-center gap-2" style={{ margin: 0 }}>
            <Compass style={{ width: 20, height: 20, color: '#94A3B8', flexShrink: 0 }} />
            Transboundary Basin Regional Overview
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#A1A1AA' }}>
            Ganges-Brahmaputra-Meghna River Network: India & Bangladesh
          </p>
        </div>

        {/* Controls: Mode Switcher & Atlas Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', backgroundColor: '#121316', padding: 3, borderRadius: 8, border: '1px solid #22252c' }}>
            <button
              type="button"
              onClick={() => setMapMode('interactive')}
              className="min-h-[44px] px-3 py-2 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all"
              style={{
                backgroundColor: mapMode === 'interactive' ? '#181a20' : 'transparent',
                color: mapMode === 'interactive' ? '#f4f4f5' : '#71717a',
                border: mapMode === 'interactive' ? '1px solid #2c3039' : '1px solid transparent',
              }}
            >
              <Globe style={{ width: 14, height: 14 }} />
              Live Interactive Map
            </button>
            <button
              type="button"
              onClick={() => setMapMode('schematic')}
              className="min-h-[44px] px-3 py-2 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all"
              style={{
                backgroundColor: mapMode === 'schematic' ? '#181a20' : 'transparent',
                color: mapMode === 'schematic' ? '#f4f4f5' : '#71717a',
                border: mapMode === 'schematic' ? '1px solid #2c3039' : '1px solid transparent',
              }}
            >
              <Layers style={{ width: 14, height: 14 }} />
              Basin Schematic
            </button>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('atlas')}
            className="min-h-[44px] px-3.5 py-2 rounded-lg bg-surface-elevated border border-border-strong text-text-primary text-xs font-medium flex items-center gap-2 hover:bg-surface-hover hover:border-border-strong transition-colors cursor-pointer whitespace-nowrap"
          >
            <Map style={{ width: 14, height: 14 }} />
            Launch Full Interactive Atlas
            <ExternalLink style={{ width: 12, height: 12 }} />
          </button>
        </div>
      </div>

      {/* Live Map or Schematic View */}
      {mapMode === 'interactive' && (
        <BasinLiveMap onNavigate={onNavigate} />
      )}

      {/* SVG Canvas Container */}
      <div style={{ display: mapMode === 'schematic' ? 'block' : 'none', position: 'relative', backgroundColor: '#0D192B', borderRadius: 10, border: '2px solid #2D4263', overflow: 'hidden', minHeight: '450px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>

        {/* Hover Tooltip */}
        {activeCenter && (
          <div style={{
            position: 'absolute', top: 12, left: 12, zIndex: 20,
            pointerEvents: 'none',
            backgroundColor: 'rgba(15,26,42,0.97)', border: '1px solid #2D4263',
            borderRadius: 8, padding: '10px 12px', fontSize: 11,
            fontFamily: 'monospace', maxWidth: 260, boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{activeCenter.name}</span>
              <span style={{
                color: getColor(activeCenter.status),
                border: `1px solid ${getColor(activeCenter.status)}55`,
                borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 700,
              }}>
                {activeCenter.status.toUpperCase()}
              </span>
            </div>
            <div style={{ color: '#CBD5E1', marginBottom: 6 }}>{activeCenter.country} · {activeCenter.coordinates}</div>
            <div style={{ color: '#FFFFFF', borderTop: '1px solid #1E3050', paddingTop: 6, lineHeight: 1.5 }}>
              {activeCenter.highlight}
            </div>
          </div>
        )}

        {/* River Key Legend Overlay */}
        <div className="absolute bottom-3 right-3 z-10 flex flex-wrap items-center gap-2 sm:gap-3.5 bg-[#0A1422]/95 border border-border-strong rounded-md px-2.5 sm:px-3 py-1.5 text-[11px] font-mono text-white">
          {[
            { color: '#38BDF8', label: 'Ganges' },
            { color: '#4ADE80', label: 'Brahmaputra' },
            { color: '#C084FC', label: 'Meghna' },
            { color: '#E7AE55', label: 'Border', dashed: true },
          ].map(l => (
            <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'inline-block', width: 16, height: 3, backgroundColor: l.color, opacity: l.dashed ? 0.8 : 1, borderRadius: 2 }} />
              {l.label}
            </span>
          ))}
        </div>

        {/* Responsive Aspect-Ratio Scaled SVG with Guaranteed Minimum Height */}
        <div style={{ width: '100%', minHeight: '440px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            viewBox="0 0 800 420"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block', width: '100%', height: 'auto', minHeight: '420px', maxHeight: '520px' }}
            role="img"
            aria-label="GBM Basin Regional Overview Cartography"
          >
            <defs>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Deep Ocean Basin (Bay of Bengal) */}
            <rect x="0" y="0" width="800" height="420" fill="#0C1B2E" />
            <path d="M 520,380 C 560,375 620,395 680,385 C 720,380 760,400 800,390 L 800,420 L 520,420 Z" fill="#071220" />
            <text x="700" y="410" fill="#60A5FA" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="2">BAY OF BENGAL</text>

            {/* 2. India Land Contour */}
            <path d="M 0,0 L 533,0 L 533,168 L 524,210 L 528,245 L 526,275 L 530,320 L 536,365 L 520,380 L 520,420 L 0,420 Z" fill="#182E48" stroke="#25466C" strokeWidth="1" />

            {/* 3. Bangladesh Land Contour (Contrasting Shading) */}
            <path
              d="M 533,168 L 570,182 L 620,192 L 670,190 L 715,205 L 730,215 L 722,250 L 738,280 L 745,310 L 728,350 L 718,375 L 702,355 L 680,390 L 638,400 L 550,400 L 536,365 L 530,320 L 526,275 L 528,245 L 524,210 Z"
              fill="#1E3857"
              stroke="#E7AE55"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />

            {/* 4. Indo-Gangetic Plain Alluvial Shading */}
            <path d="M 40,80 Q 250,140 520,230 L 520,280 Q 250,260 40,160 Z" fill="#1F3958" opacity="0.75" />
            <text x="50" y="115" fill="#93C5FD" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="2">INDO-GANGETIC PLAIN</text>

            {/* 5. Sundarbans Delta */}
            <polygon points="536,365 615,360 638,406 548,408" fill="#0E3D2A" stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="554" y="390" fill="#4ADE80" fontSize="10.5" fontFamily="monospace" fontWeight="700">Sundarbans Delta</text>

            {/* 6. Grid Lines */}
            {[200, 400, 600].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="420" stroke="#254366" strokeWidth="1" strokeDasharray="3 6" />
            ))}
            {[140, 280].map(y => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#254366" strokeWidth="1" strokeDasharray="3 6" />
            ))}

            {/* 7. Coordinate labels */}
            <text x="8" y="16" fill="#CBD5E1" fontSize="9" fontFamily="monospace">31°N 76°E</text>
            <text x="724" y="16" fill="#CBD5E1" fontSize="9" fontFamily="monospace">31°N 94°E</text>
            <text x="8" y="416" fill="#CBD5E1" fontSize="9" fontFamily="monospace">21°N 76°E</text>
            <text x="724" y="416" fill="#CBD5E1" fontSize="9" fontFamily="monospace">21°N 94°E</text>

            {/* 8. Country text labels */}
            <text x="130" y="80" fill="#CBD5E1" opacity="0.9" fontSize="20" fontWeight="700" fontFamily="sans-serif" letterSpacing="5">INDIA</text>
            <text x="560" y="230" fill="#91A0B2" opacity="0.9" fontSize="13" fontWeight="700" fontFamily="sans-serif" letterSpacing="3">BANGLADESH</text>

            {/* 9. River Paths with Multi-layer Glow */}
            {/* Ganges main stem: underlay + core (#38BDF8, 4.5px) */}
            <path d="M 98,40 Q 140,110 196,184 T 262,224 T 311,228 T 409,216 T 529,248 T 595,280"
              fill="none" stroke="#38BDF8" strokeWidth="9" strokeLinecap="round" opacity="0.25" filter="url(#glow-cyan)" />
            <path d="M 98,40 Q 140,110 196,184 T 262,224 T 311,228 T 409,216 T 529,248 T 595,280"
              fill="none" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" opacity="1.0" />

            {/* Yamuna tributary: underlay + core (#38BDF8, 3.5px) */}
            <path d="M 60,70 Q 110,130 190,195 T 262,224"
              fill="none" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" opacity="0.2" />
            <path d="M 60,70 Q 110,130 190,195 T 262,224"
              fill="none" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />

            {/* Hooghly: underlay + core (#38BDF8, 3.5px) */}
            <path d="M 529,248 Q 538,285 547,336 T 555,382"
              fill="none" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" opacity="0.2" />
            <path d="M 529,248 Q 538,285 547,336 T 555,382"
              fill="none" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />

            {/* Brahmaputra / Jamuna: underlay + core (#4ADE80, 4.5px) */}
            <path d="M 760,140 Q 710,170 698,192 T 618,200 T 605,250 T 595,280"
              fill="none" stroke="#4ADE80" strokeWidth="9" strokeLinecap="round" opacity="0.25" filter="url(#glow-green)" />
            <path d="M 760,140 Q 710,170 698,192 T 618,200 T 605,250 T 595,280"
              fill="none" stroke="#4ADE80" strokeWidth="4.5" strokeLinecap="round" opacity="1.0" />

            {/* Upper Meghna: underlay + core (#C084FC, 3.5px) */}
            <path d="M 720,210 Q 685,245 660,275 T 649,312"
              fill="none" stroke="#C084FC" strokeWidth="7" strokeLinecap="round" opacity="0.25" />
            <path d="M 720,210 Q 685,245 660,275 T 649,312"
              fill="none" stroke="#C084FC" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />

            {/* Padma / Meghna estuary: underlay + core (#C084FC, 4.5px) */}
            <path d="M 595,280 Q 625,300 649,312 T 670,360 T 685,412"
              fill="none" stroke="#C084FC" strokeWidth="10" strokeLinecap="round" opacity="0.25" filter="url(#glow-purple)" />
            <path d="M 595,280 Q 625,300 649,312 T 670,360 T 685,412"
              fill="none" stroke="#C084FC" strokeWidth="4.5" strokeLinecap="round" opacity="1.0" />

            {/* River labels */}
            <text x="150" y="148" fill="#38BDF8" fontSize="11" fontFamily="sans-serif" fontWeight="700" opacity="0.95">Ganges (Ganga)</text>
            <text x="648" y="174" fill="#4ADE80" fontSize="10" fontFamily="sans-serif" fontWeight="700" opacity="0.95">Brahmaputra / Jamuna</text>
            <text x="604" y="318" fill="#C084FC" fontSize="10" fontFamily="sans-serif" fontWeight="600">Upper Meghna</text>
            <text x="620" y="345" fill="#C084FC" fontSize="10" fontFamily="sans-serif" fontWeight="600">Padma / Meghna</text>
            <text x="502" y="310" fill="#38BDF8" fontSize="10" fontFamily="sans-serif" opacity="0.85">Hooghly</text>

            {/* Farakka Barrage Marker */}
            <g transform="translate(529,248)">
              <rect x="-6" y="-6" width="12" height="12" fill="#F87171" rx="2" stroke="#FFFFFF" strokeWidth="1" />
              <text x="12" y="4" fill="#F87171" fontSize="9" fontFamily="monospace" fontWeight="700">Farakka Barrage</text>
            </g>

            {/* 10. Urban Centers with Bright Halos & #FFFFFF Labels */}
            {URBAN_CENTERS.map((city) => (
              <g
                key={city.name}
                transform={`translate(${city.x}, ${city.y})`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setActiveCenter(city)}
                onMouseLeave={() => setActiveCenter(null)}
                onClick={() => onNavigate('atlas')}
              >
                {/* Multi-Ring Bright Halo */}
                <circle r="12" fill={getColor(city.status)} opacity="0.22" />
                <circle r="7.5" fill="none" stroke={getColor(city.status)} strokeWidth="1.5" opacity="0.75" />
                {/* Core Pin */}
                <circle r="4.5" fill="#0A1422" stroke={getColor(city.status)} strokeWidth="2" />
                <circle r="2" fill={getColor(city.status)} />
                {/* Invisible Hit Area */}
                <circle r="16" fill="transparent" />
                {/* High Contrast White Label with Dark Stroke Outline */}
                <text
                  x="10"
                  y="4"
                  fill="#FFFFFF"
                  fontSize="10.5"
                  fontFamily="sans-serif"
                  fontWeight="600"
                  paintOrder="stroke fill"
                  stroke="#08101A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                >
                  {city.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Status Legend Row */}
      <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
        {(Object.entries(STATUS_COLORS) as [UrbanCenter['status'], string][]).map(([s, c]) => (
          <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontFamily: 'monospace', color: '#CBD5E1' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c, display: 'inline-block' }} />
            {s}
          </span>
        ))}
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#CBD5E1', marginLeft: 'auto' }}>
          Tap or hover cities for detail · Click to open Atlas
        </span>
      </div>
    </section>
  );
};

export const BasinOverviewMap: React.FC<BasinOverviewMapProps> = (props) => {
  return (
    <BasinMapErrorBoundary onNavigate={props.onNavigate}>
      <BasinOverviewMapInner {...props} />
    </BasinMapErrorBoundary>
  );
};
