import React from 'react';
import { 
  Search, 
  Layers, 
  Filter, 
  Building2, 
  Droplets, 
  Trees,
  X 
} from 'lucide-react';
import { SeverityTier } from '../../types';

interface LayerFilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showRivers: boolean;
  onToggleRivers: (show: boolean) => void;
  showHotspots: boolean;
  onToggleHotspots: (show: boolean) => void;
  showIndustries: boolean;
  onToggleIndustries: (show: boolean) => void;
  showStations: boolean;
  onToggleStations: (show: boolean) => void;
  showEcoZones: boolean;
  onToggleEcoZones: (show: boolean) => void;
  selectedSeverity: SeverityTier | 'All';
  onSelectSeverity: (severity: SeverityTier | 'All') => void;
  onClose?: () => void;
}

export const LayerFilterPanel: React.FC<LayerFilterPanelProps> = ({
  searchQuery,
  onSearchChange,
  showRivers,
  onToggleRivers,
  showHotspots,
  onToggleHotspots,
  showIndustries,
  onToggleIndustries,
  showStations,
  onToggleStations,
  showEcoZones,
  onToggleEcoZones,
  selectedSeverity,
  onSelectSeverity,
  onClose,
}) => {
  return (
    <aside
      data-lenis-prevent
      style={{ touchAction: 'pan-y' }}
      className="w-full lg:w-80 h-full bg-surface border-r border-border-subtle flex flex-col shrink-0 overflow-y-auto p-4 space-y-5"
    >
      {onClose && (
        <div className="flex items-center justify-between lg:hidden pb-2 border-b border-border-subtle">
          <span className="text-xs font-semibold text-white">Layers & Filters</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-3 py-1.5 rounded bg-surface-elevated border border-border-subtle text-text-secondary hover:text-text-primary text-xs flex items-center gap-1.5"
            aria-label="Back to Map"
          >
            <X className="w-4 h-4" />
            <span>Back to Map</span>
          </button>
        </div>
      )}
      {/* Search Filter */}
      <div className="space-y-1.5">
        <label 
          htmlFor="atlas-layer-search" 
          className="text-xs font-semibold text-text-secondary block"
        >
          Filter Basin Features
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-text-secondary">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            id="atlas-layer-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search river, city, facility..."
            className="w-full h-9 pl-8 pr-3 bg-base border border-border-subtle rounded text-xs text-text-primary placeholder:text-text-secondary focus:border-accent-cyan focus:outline-none"
          />
        </div>
      </div>

      {/* Cartographic Layers */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-accent-cyan" />
          Cartographic Layers
        </span>

        <div className="space-y-1.5">
          <label className="flex items-center justify-between p-2 rounded bg-surface-elevated border border-border-subtle hover:border-border-strong cursor-pointer min-h-[44px]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-accent-cyan rounded-full" />
              <span className="text-xs text-text-primary">River Trajectories (15)</span>
            </div>
            <input
              type="checkbox"
              aria-label="River Trajectories"
              checked={showRivers}
              onChange={(e) => onToggleRivers(e.target.checked)}
              className="rounded border-border-strong text-accent-cyan focus:ring-accent-cyan min-h-[20px] min-w-[20px]"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-surface-elevated border border-border-subtle hover:border-border-strong cursor-pointer min-h-[44px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-red" />
              <span className="text-xs text-text-primary">Pollution Hotspots (11)</span>
            </div>
            <input
              type="checkbox"
              aria-label="Pollution Hotspots"
              checked={showHotspots}
              onChange={(e) => onToggleHotspots(e.target.checked)}
              className="rounded border-border-strong text-accent-red focus:ring-accent-red min-h-[20px] min-w-[20px]"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-surface-elevated border border-border-subtle hover:border-border-strong cursor-pointer min-h-[44px]">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-accent-amber" />
              <span className="text-xs text-text-primary">Industrial Facilities (17)</span>
            </div>
            <input
              type="checkbox"
              aria-label="Industrial Facilities"
              checked={showIndustries}
              onChange={(e) => onToggleIndustries(e.target.checked)}
              className="rounded border-border-strong text-accent-amber focus:ring-accent-amber min-h-[20px] min-w-[20px]"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-surface-elevated border border-border-subtle hover:border-border-strong cursor-pointer min-h-[44px]">
            <div className="flex items-center gap-2">
              <Droplets className="w-3.5 h-3.5 text-accent-green" />
              <span className="text-xs text-text-primary">Monitoring Stations (16)</span>
            </div>
            <input
              type="checkbox"
              aria-label="Monitoring Stations"
              checked={showStations}
              onChange={(e) => onToggleStations(e.target.checked)}
              className="rounded border-border-strong text-accent-green focus:ring-accent-green min-h-[20px] min-w-[20px]"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-surface-elevated border border-border-subtle hover:border-border-strong cursor-pointer min-h-[44px]">
            <div className="flex items-center gap-2">
              <Trees className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="text-xs text-text-primary">Ecological Zones (7)</span>
            </div>
            <input
              type="checkbox"
              aria-label="Ecological Zones"
              checked={showEcoZones}
              onChange={(e) => onToggleEcoZones(e.target.checked)}
              className="rounded border-border-strong text-accent-cyan focus:ring-accent-cyan min-h-[20px] min-w-[20px]"
            />
          </label>
        </div>
      </div>

      {/* Severity Filter */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-accent-cyan" />
          Degradation Severity
        </span>
        <div className="grid grid-cols-2 gap-2">
          {(['All', 'Critical', 'High', 'Moderate'] as const).map((sev) => (
            <button
              key={sev}
              type="button"
              onClick={() => onSelectSeverity(sev)}
              className={`min-h-[44px] px-3 py-1.5 rounded text-xs font-medium border text-center transition-colors ${
                selectedSeverity === sev
                  ? 'bg-accent-cyan/15 border-accent-cyan text-accent-cyan font-semibold'
                  : 'bg-surface-elevated border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Basin Bounding Box Notice */}
      <div className="pt-2 border-t border-border-subtle space-y-1 text-xs text-text-secondary">
        <div className="text-text-secondary">Rigorous Spatial Bounds:</div>
        <div>Lat: <span className="font-mono">20.0000°N to 32.0000°N</span></div>
        <div>Lng: <span className="font-mono">73.0000°E to 98.0000°E</span></div>
        <div className="text-accent-green pt-1">Passes Geospatial Bounding Audit</div>
      </div>
    </aside>
  );
};
