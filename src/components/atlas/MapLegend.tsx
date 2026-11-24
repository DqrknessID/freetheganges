import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-surface/95 border border-border-subtle rounded-md shadow-xl text-xs w-52 sm:w-64 overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Legend"
        className="w-full min-h-[44px] px-3 py-2 flex items-center justify-between text-text-primary hover:bg-surface-elevated transition-colors"
      >
        <span className="flex items-center gap-1.5 font-semibold text-accent-cyan text-xs">
          <Layers className="w-3.5 h-3.5 text-accent-cyan" />
          Map Legend
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-text-secondary" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
        )}
      </button>

      {isOpen && (
        <div className="px-3 pb-3 pt-1 space-y-2.5 border-t border-border-subtle/60 text-xs">
          {/* River Symbology */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-text-secondary">River Trajectories</span>
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 rounded-full bg-[#38BDF8]" />
              <span className="text-text-primary">Main Stems (Ganga / Padma / Brahmaputra)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full bg-[#3B82F6]" />
              <span className="text-text-secondary">Tributaries and Branches</span>
            </div>
          </div>

          {/* Hotspots */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-text-secondary">Pollution Hotspots</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-red ring-2 ring-accent-red/30" />
              <span className="text-text-primary">Critical (BOD &gt; 50 mg/L or Cr/As)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-amber" />
              <span className="text-text-secondary">High Severity Impact</span>
            </div>
          </div>

          {/* Industrial Facilities */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-text-secondary">Industrial Facilities</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent-red" />
              <span className="text-text-primary">Non-Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent-amber" />
              <span className="text-text-secondary">Warning Notice / Under Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent-green" />
              <span className="text-text-secondary">Partially Compliant</span>
            </div>
          </div>

          {/* Water Quality & Eco Zones */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-text-secondary">Monitoring &amp; Eco-Zones</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <span className="text-text-secondary">Water Quality Station</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-accent-green bg-accent-green/20" />
              <span className="text-text-secondary">Ecological Sanctuary / Ramsar Site</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
