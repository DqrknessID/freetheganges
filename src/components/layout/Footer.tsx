import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';
import { ActiveView } from '../../types';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenMethodology }) => {
  return (
    <footer className="w-full bg-base border-t border-border-subtle text-text-secondary mt-auto text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Organization & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm font-bold tracking-normal text-text-primary">
                Free the Ganges Consortium
              </span>
              <span className="text-[10px] text-accent-cyan font-semibold">
                Independent Monitor
              </span>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed">
              Independent environmental intelligence and scientific research platform monitoring transboundary 
              ecological degradation throughout the Ganges-Brahmaputra-Meghna (GBM) river basin across India and Bangladesh.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-accent-cyan">
              <Globe className="w-3.5 h-3.5" />
              <span>Spatial Envelope: <span className="font-mono">20°N to 32°N, 73°E to 98°E</span></span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text-primary">
              Navigation Corridors
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('overview')}
                  className="min-h-[44px] flex items-center hover:text-accent-cyan transition-colors"
                >
                  Regional Intelligence Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('atlas')}
                  className="min-h-[44px] flex items-center hover:text-accent-cyan transition-colors"
                >
                  Interactive Atlas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('indicators')}
                  className="min-h-[44px] flex items-center hover:text-accent-cyan transition-colors"
                >
                  Environmental Indicators & Data
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('research')}
                  className="min-h-[44px] flex items-center hover:text-accent-cyan transition-colors"
                >
                  Research Reports & Source Registry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="min-h-[44px] flex items-center hover:text-accent-cyan transition-colors"
                >
                  Watchdog Charter & Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Data Providers & Attribution */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text-primary">
              Verified Data Providers
            </h4>
            <ul className="space-y-1.5 text-text-secondary text-xs">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>CPCB (Central Pollution Control Board, India)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>BWDB (Bangladesh Water Development Board)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>DoE (Department of Environment, Bangladesh)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                <span>Copernicus Sentinel-2 & Sentinel-5P</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                <span>NASA Earth Observing System (MODIS/Landsat)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                <span>WHO Guidelines for Drinking-water Quality</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Methodology & Scientific Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text-primary">
              Scientific Governance
            </h4>
            <p className="text-text-secondary text-xs leading-relaxed">
              All environmental indicators are cross-verified against statutory WHO guidelines, CPCB surface water 
              classes, and Bangladesh ECR criteria. Sensor telemetry is audited for calibration drift.
            </p>
            <div>
              <button
                type="button"
                onClick={onOpenMethodology}
                className="min-h-[44px] px-3.5 py-2 rounded bg-surface border border-border-subtle hover:border-accent-cyan/40 hover:text-text-primary text-xs flex items-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-accent-cyan" />
                <span>Open Methodology Disclosure</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-secondary">
          <div>
            &copy; 2026 Free the Ganges Research Consortium. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-accent-green flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-green" />
              Basin Telemetry Engine: Operational
            </span>
            <span className="font-mono text-[10px]">Version 1.0.0-RC1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
