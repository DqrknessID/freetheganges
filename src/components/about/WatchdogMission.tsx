import React from 'react';
import { ShieldCheck, FileCheck, Compass, Award } from 'lucide-react';
import { ActiveView } from '../../types';

interface WatchdogMissionProps {
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
}

export const WatchdogMission: React.FC<WatchdogMissionProps> = ({
  onNavigate,
  onOpenMethodology,
}) => {
  return (
    <div className="space-y-8">
      {/* Institutional Charter Hero */}
      <section className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-10 space-y-5 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-accent-cyan" />
          <span className="text-xs font-semibold text-accent-cyan">
            Independent environmental watchdog charter
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          FREE THE GANGES: Environmental Intelligence for the GBM Basin
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-4xl">
          FREE THE GANGES is an independent environmental intelligence and scientific research initiative dedicated 
          to monitoring ecological degradation throughout the transboundary Ganges-Brahmaputra-Meghna (GBM) river basin. 
          Operating outside governmental agencies, corporate lobbies, and national political partisanship, the platform 
          serves as an open public-interest audit on the health of South Asia's most vital hydrological life-support system.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenMethodology}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-accent-cyan text-base font-semibold text-xs flex items-center gap-2 hover:bg-accent-cyan/90 transition-colors"
          >
            <FileCheck className="w-4 h-4" />
            <span>Open Sensor Methodology</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('atlas')}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle hover:border-accent-cyan/40 text-text-primary text-xs font-medium flex items-center gap-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-accent-cyan" />
            <span>Explore Basin GIS Atlas</span>
          </button>
        </div>
      </section>

      {/* Core Scientific & Institutional Principles */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-accent-cyan" />
          Core scientific and institutional principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="w-9 h-9 rounded bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-semibold text-text-primary font-sans">
              Transboundary Pan-Basin Holism
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Rivers do not respect sovereign political borders. By evaluating the Ganges, Brahmaputra, and Meghna as an 
              interconnected hydrological entity spanning India, Bangladesh, Nepal, and the Tibetan plateau, we resist 
              fragmented national narratives and expose regional ecological dependencies.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="w-9 h-9 rounded bg-accent-green/10 border border-accent-green/30 flex items-center justify-center text-accent-green font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-sm font-semibold text-text-primary font-sans">
              Transparent Provenance & Zero Fabrication
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Every indicator displayed on FREE THE GANGES links to an authoritative physical monitoring station, 
              satellite overpass, or peer-reviewed citation. We explicitly distinguish between measured observations, 
              numerical models, and demonstrative prototypes. Missing telemetry is reported as N/D, never fabricated.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="w-9 h-9 rounded bg-accent-amber/10 border border-accent-amber/30 flex items-center justify-center text-accent-amber font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-sm font-semibold text-text-primary font-sans">
              Statutory Benchmarking Rigor
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Measurements are continuously assessed against WHO drinking guidelines, Indian Central Pollution Control 
              Board (CPCB) Designated Best Use classes, and Bangladesh Environmental Conservation Rules (ECR), delivering 
              an uncompromised audit of legal compliance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
