import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const SensorMethodology: React.FC = () => {
  return (
    <section className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-accent-cyan" />
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
          Sensor Calibration & Laboratory Audit Standards
        </h2>
      </div>

      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        To maintain data integrity, automated telemetry stations in the FREE THE GANGES network adhere to strict 
        maintenance protocols. Optical dissolved oxygen sensors undergo bi-weekly chemical calibration using air-saturated 
        water baselines. Heavy metal assays (Arsenic, Chromium, Lead) are cross-calibrated against accredited laboratory 
        wet chemistry results utilizing Inductively Coupled Plasma Mass Spectrometry (ICP-MS) and Atomic Absorption 
        Spectroscopy (AAS).
      </p>

      {/* Multi-Tier Provenance Verification System */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
          <div className="flex items-center gap-1.5 text-accent-green font-mono text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>IN_SITU_OBSERVED</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Direct physical probes, automated continuous telemetry stations, or accredited wet chemistry grab sampling verified by regional labs.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
          <div className="flex items-center gap-1.5 text-accent-cyan font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>SATELLITE_DERIVED</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Multi-spectral remote sensing (Sentinel-2, Sentinel-5P TROPOMI, MODIS) processed via calibrated atmospheric retrieval algorithms.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
          <div className="flex items-center gap-1.5 text-accent-amber font-mono text-xs font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>MODELED_SIMULATION</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Hydrological advection-dispersion modeling, GIS interpolation, and regulatory exposure threshold simulations.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
          <div className="flex items-center gap-1.5 text-accent-red font-mono text-xs font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>ILLUSTRATIVE_DEMO</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Synthetic datasets deployed strictly for interface component verification. Explicitly labeled to preserve scientific honesty.
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle text-xs text-text-secondary">
        <div>Geographic Coordinate Datum: <span className="font-mono">WGS 84 (EPSG:4326)</span></div>
        <div>Intelligence Palette: <span className="font-mono">#080E17 / #101A28</span></div>
        <div className="text-accent-green font-semibold">Scientific Integrity Standard: Verified</div>
      </div>
    </section>
  );
};
