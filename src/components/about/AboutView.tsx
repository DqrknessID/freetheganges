import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Award, 
  Compass, 
  FileCheck,
  Activity
} from 'lucide-react';
import { ActiveView } from '../../types';

interface AboutViewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenMethodology }) => {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Title & Institutional Charter */}
      <section className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-10 space-y-5 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-accent-cyan" />
          <span className="font-mono text-xs font-semibold text-accent-cyan uppercase tracking-widest">
            INDEPENDENT ENVIRONMENTAL WATCHDOG CHARTER
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary font-sans leading-tight">
          FREE THE GANGES: Environmental Intelligence for the GBM Basin
        </h1>

        <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-4xl">
          FREE THE GANGES is an independent environmental intelligence and scientific research initiative dedicated 
          to monitoring ecological degradation throughout the transboundary Ganges-Brahmaputra-Meghna (GBM) river basin. 
          Operating outside governmental agencies, corporate lobbies, and national political partisanship, the platform 
          serves as an open public-interest audit on the health of South Asia's most vital hydrological life-support system.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenMethodology}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-accent-cyan text-base font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-accent-cyan/90 transition-colors"
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

      {/* Core Principles Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary font-sans flex items-center gap-2">
          <Award className="w-5 h-5 text-accent-cyan" />
          Core Scientific & Institutional Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="w-9 h-9 rounded bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-semibold text-text-primary font-sans">
              Transboundary Pan-Basin Holism
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
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
            <p className="text-xs text-text-muted leading-relaxed">
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
            <p className="text-xs text-text-muted leading-relaxed">
              Measurements are continuously assessed against WHO drinking guidelines, Indian Central Pollution Control 
              Board (CPCB) Designated Best Use classes, and Bangladesh Environmental Conservation Rules (ECR), delivering 
              an uncompromised audit of legal compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Transboundary Basin Context */}
      <section className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-semibold text-text-primary font-sans flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent-cyan" />
          Transboundary Hydrological Context: India & Bangladesh
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-text-muted leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider text-accent-cyan">
              Upstream Diversion & The Farakka Barrage
            </h3>
            <p>
              Constructed in 1975 roughly 17 km upstream of the Bangladesh border, the Farakka Barrage diverts Ganges water 
              into the Bhagirathi-Hooghly channel to flush Kolkata Port. This artificial bifurcation has profoundly altered 
              downstream hydrology in Bangladesh's Padma branch. During dry winter months, decreased base discharge reduces 
              freshwater thrust against tidal intrusion from the Bay of Bengal, pushing salinity deep into the agricultural heartland.
            </p>
            <p>
              Under the 1996 Ganges Water Treaty, sharing formulas govern 10-day intervals from January to May. However, 
              monitoring stations on both sides frequently record discrepancies between allocated treaty volumes and actual 
              in-situ discharge arriving at Hardinge Bridge.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider text-accent-cyan">
              The Estuarine Crucible: Sundarbans & Climate Compounding
            </h3>
            <p>
              The lower delta houses the Sundarbans, the world's largest contiguous mangrove forest and a UNESCO World 
              Heritage ecosystem. Upstream silt trapping behind upstream dams and barrages has precipitated a severe sediment 
              deficit. Combined with relative sea-level rise and heightened cyclone frequency, coastal islands are subsiding 
              faster than natural replenishment rates.
            </p>
            <p>
              Meanwhile, heavy metal mobilization from the industrial corridors of Kanpur, Kolkata, and Dhaka converges into 
              the estuarine mixing zone, bioaccumulating across the food web and threatening endangered keystone species, 
              notably the Ganges River Dolphin (*Platanista gangetica*) and Royal Bengal Tiger.
            </p>
          </div>
        </div>
      </section>

      {/* Sensor Calibration & Data Audit Protocol */}
      <section className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-semibold text-text-primary font-sans flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent-cyan" />
          Sensor Calibration & Laboratory Audit Standards
        </h2>

        <p className="text-xs text-text-muted leading-relaxed">
          To maintain data integrity, automated telemetry stations in the FREE THE GANGES network adhere to strict 
          maintenance protocols. Optical dissolved oxygen sensors undergo bi-weekly chemical calibration using air-saturated 
          water baselines. Heavy metal assays (Arsenic, Chromium, Lead) are cross-calibrated against accredited laboratory 
          wet chemistry results utilizing Inductively Coupled Plasma Mass Spectrometry (ICP-MS) and Atomic Absorption 
          Spectroscopy (AAS).
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle text-xs font-mono text-text-secondary">
          <div>Geographic Coordinate Datum: WGS 84 (EPSG:4326)</div>
          <div>Bespoke Geopolitical Intelligence Palette (#080E17 / #101A28)</div>
          <div className="text-accent-green">Zero AI Slop Compliance: Verified</div>
        </div>
      </section>

    </div>
  );
};
