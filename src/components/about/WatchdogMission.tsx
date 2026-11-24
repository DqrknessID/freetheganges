import React from 'react';
import { ShieldCheck, FileCheck, Compass, Award, Globe2, FileCheck2, Scale } from 'lucide-react';
import { ActiveView } from '../../types';
import { useScrollReveal } from '../../utils/useScrollReveal';

interface WatchdogMissionProps {
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
}

export const WatchdogMission: React.FC<WatchdogMissionProps> = ({
  onNavigate,
  onOpenMethodology,
}) => {
  const gridRef = useScrollReveal<HTMLDivElement>({ selector: '.principle-card', stagger: 0.1 });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Institutional Charter Hero */}
      <section className="bg-surface border border-border-subtle rounded-xl p-8 sm:p-12 lg:p-16 space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-text-secondary" />
          <span className="text-xs font-medium text-text-secondary">
            Independent environmental watchdog charter
          </span>
        </div>

        <h1 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          FREE THE GANGES: Environmental Intelligence for the GBM Basin
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed sm:leading-loose max-w-4xl">
          FREE THE GANGES is an independent environmental intelligence and scientific research initiative dedicated 
          to monitoring ecological degradation throughout the transboundary Ganges-Brahmaputra-Meghna (GBM) river basin. 
          Operating outside governmental agencies, corporate lobbies, and national political partisanship, the platform 
          serves as an open public-interest audit on the health of South Asia's most vital hydrological life-support system.
        </p>

        <div className="pt-2 flex flex-wrap gap-3.5">
          <button
            type="button"
            onClick={onOpenMethodology}
            className="min-h-[44px] px-6 py-2.5 rounded-lg bg-text-primary text-base font-semibold text-xs flex items-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            <FileCheck className="w-4 h-4 text-base" />
            <span>Open Sensor Methodology</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('atlas')}
            className="min-h-[44px] px-6 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle hover:border-border-strong text-text-primary text-xs font-medium flex items-center gap-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-text-secondary" />
            <span>Explore Basin GIS Atlas</span>
          </button>
        </div>
      </section>

      {/* Core Scientific & Institutional Principles */}
      <section className="space-y-6">
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
          <Award className="w-5 h-5 text-text-secondary" />
          Core scientific and institutional principles
        </h2>

        {/* Asymmetric Editorial Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary Featured Anchor Card (Spans 2 columns on desktop) */}
          <div className="principle-card lg:col-span-2 p-6 sm:p-8 rounded-xl bg-surface border border-border-subtle relative flex flex-col justify-between space-y-4 hover:border-border-strong transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary w-fit">
                  <Globe2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-text-muted">
                  Primary Mandate
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-text-primary font-sans">
                Transboundary Pan-Basin Holism
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Rivers do not respect sovereign political borders. By evaluating the Ganges, Brahmaputra, and Meghna as an 
                interconnected hydrological entity spanning India, Bangladesh, Nepal, and the Tibetan plateau, we resist 
                fragmented national narratives and expose regional ecological dependencies.
              </p>
            </div>
            <div className="pt-4 border-t border-border-subtle/70 flex flex-wrap items-center justify-between gap-2 text-xs text-text-secondary">
              <span className="font-mono text-[11px] text-text-primary">Pan-Basin Scope: 1,720,000 km² Catchment</span>
              <span className="font-mono text-[11px] text-text-secondary">Transboundary Riparian Integrity</span>
            </div>
          </div>

          {/* Secondary Pillars Stack (1 column) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="principle-card p-6 rounded-xl bg-surface border border-border-subtle space-y-3 hover:border-border-strong transition-colors flex-1 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="p-2 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary w-fit">
                  <FileCheck2 className="w-4 h-4" />
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
              <div className="pt-2 text-[11px] font-mono text-text-muted">
                Zero Fabrication Policy
              </div>
            </div>

            <div className="principle-card p-6 rounded-xl bg-surface border border-border-subtle space-y-3 hover:border-border-strong transition-colors flex-1 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="p-2 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary w-fit">
                  <Scale className="w-4 h-4" />
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
              <div className="pt-2 text-[11px] font-mono text-text-muted">
                WHO / CPCB / ECR Standards
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
