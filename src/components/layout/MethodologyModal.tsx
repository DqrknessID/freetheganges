import React, { useEffect } from 'react';
import { X, ShieldCheck, Database, Award, Info, AlertTriangle } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-base/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="methodology-title"
    >
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal dialog */}
      <div data-lenis-prevent className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border-strong rounded-xl shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-elevated">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="methodology-title" className="font-sans text-xl sm:text-2xl font-bold text-white tracking-wide">
                Scientific Methodology and Sensor Validation Disclosure
              </h2>
              <p className="text-xs text-text-secondary">
                Institutional Data Standard Revision 4.2: Transboundary Ganges-Brahmaputra-Meghna Basin
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close methodology disclosure dialog"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-text-primary">
          {/* Section 1: Watchdog Charter */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-accent-cyan flex items-center gap-2">
              <Award className="w-4 h-4 text-accent-cyan" />
              1. Institutional Charter and Independent Watchdog Mandate
            </h3>
            <p className="text-text-secondary leading-relaxed">
              FREE THE GANGES operates as an independent, non-governmental environmental intelligence platform. 
              Its mandate is to document, analyze, and synthesize environmental degradation across the transboundary 
              Ganges-Brahmaputra-Meghna (GBM) river basin encompassing India and Bangladesh. The platform does not 
              advocate for national or partisan interests, but provides transparent, reproducible, and verifiable 
              scientific data for public health, biodiversity conservation, and riparian policy oversight.
            </p>
          </section>

          {/* Section 2: Data Provenance Tiers */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-accent-cyan flex items-center gap-2">
              <Database className="w-4 h-4 text-accent-cyan" />
              2. Data Provenance and Quality Assurance Tiers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded border border-accent-green/30 bg-accent-green/5 space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-accent-green/20 text-accent-green border border-accent-green/40">
                  IN_SITU_OBSERVED
                </span>
                <p className="text-xs text-text-secondary">
                  Physical water sampling and laboratory wet-chemistry assays conducted by certified institutions 
                  (Central Pollution Control Board, Bangladesh Water Development Board, British Geological Survey). 
                  Laboratory calibration follows Standard Methods for the Examination of Water and Wastewater (APHA).
                </p>
              </div>

              <div className="p-3 rounded border border-accent-cyan/30 bg-accent-cyan/5 space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40">
                  SATELLITE_DERIVED
                </span>
                <p className="text-xs text-text-secondary">
                  Earth observation telemetry sourced from Copernicus Sentinel-2, Sentinel-5P TROPOMI, NASA MODIS, 
                  and Landsat 8/9 instruments. Algorithms utilize validated atmospheric corrections and spectral indices 
                  for suspended sediment concentration and surface chlorophyll-a.
                </p>
              </div>

              <div className="p-3 rounded border border-accent-amber/30 bg-accent-amber/5 space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-accent-amber/20 text-accent-amber border border-accent-amber/40">
                  MODELED_SIMULATION
                </span>
                <p className="text-xs text-text-secondary">
                  Hydrodynamic and pollutant transport estimations generated via 1D/2D hydraulic models (HEC-RAS, Delft3D, 
                  SWAT). Used to interpolate seasonal dissolved oxygen deficits and estuarine salinity fronts across unmonitored reaches.
                </p>
              </div>

              <div className="p-3 rounded border border-accent-red/30 bg-accent-red/5 space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-accent-red/20 text-[#FCA5A5] border border-accent-red/40">
                  ILLUSTRATIVE_DEMO
                </span>
                <p className="text-xs text-text-secondary">
                  Explicitly marked demonstrative or interpolated historical data used to illustrate interface functionality 
                  where real-time sensor streams are undergoing institutional verification. Clearly identified with visual badges.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Threshold Standards */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-accent-cyan flex items-center gap-2">
              <Info className="w-4 h-4 text-accent-cyan" />
              3. Regulatory Standards and Evaluation Criteria
            </h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Every parameter evaluated in FREE THE GANGES is cross-referenced against three established statutory benchmarks:
            </p>
            <div className="overflow-x-auto border border-border-subtle rounded">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-elevated text-text-primary border-b border-border-subtle">
                  <tr>
                    <th className="p-2.5">Indicator</th>
                    <th className="p-2.5">Unit</th>
                    <th className="p-2.5">WHO Guideline</th>
                    <th className="p-2.5">CPCB Best Use Standard</th>
                    <th className="p-2.5">Bangladesh ECR Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-text-secondary">
                  <tr>
                    <td className="p-2.5 text-text-primary">Dissolved Oxygen (DO)</td>
                    <td className="p-2.5">mg/L</td>
                    <td className="p-2.5">&gt; 5.0 (aquatic)</td>
                    <td className="p-2.5">&ge; 5.0 (Class B bathing)</td>
                    <td className="p-2.5">&ge; 5.0 (pisciculture)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-text-primary">Biochemical Oxygen Demand (BOD)</td>
                    <td className="p-2.5">mg/L</td>
                    <td className="p-2.5">&lt; 2.0 (clean baseline)</td>
                    <td className="p-2.5">&le; 3.0 (Class B bathing)</td>
                    <td className="p-2.5">&le; 3.0 (recreation)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-text-primary">Arsenic (As)</td>
                    <td className="p-2.5">&micro;g/L</td>
                    <td className="p-2.5">10.0 (maximum safe limit)</td>
                    <td className="p-2.5">10.0 (IS 10500 / CPCB)</td>
                    <td className="p-2.5">50.0 (national limit)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-text-primary">Hexavalent Chromium (Cr-VI)</td>
                    <td className="p-2.5">&micro;g/L</td>
                    <td className="p-2.5">50.0 (total) / 5.0 (Cr-VI)</td>
                    <td className="p-2.5">50.0 (total) / 5.0 (Cr-VI)</td>
                    <td className="p-2.5">50.0 (total)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-text-primary">Fecal Coliform</td>
                    <td className="p-2.5">MPN/100mL</td>
                    <td className="p-2.5">0 (drinking water)</td>
                    <td className="p-2.5">&le; 500 (desirable) / 2500 (max)</td>
                    <td className="p-2.5">&le; 200 (bathing)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Geographic Envelope */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-accent-cyan flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-accent-cyan" />
              4. Geographic Scope and Spatial Envelope
            </h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              All geospatial features strictly conform to the Ganges-Brahmaputra-Meghna regional basin envelope:
              latitude range 20.0000 degrees North to 32.0000 degrees North, longitude range 73.0000 degrees East to 98.0000 degrees East. 
              The spatial boundary covers upstream glaciated headwaters (Gangotri and Yamunotri glaciers), middle agricultural plains, 
              the transboundary bifurcation at Farakka Barrage, and the estuarine mangrove delta of the Sundarbans discharging into the Bay of Bengal.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3.5 border-t border-border-subtle bg-surface-elevated">
          <span className="text-xs text-text-secondary">
            Scientific Oversight Committee: Free The Ganges Research Consortium
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] px-5 py-2 rounded bg-surface hover:bg-surface-hover border border-border-subtle text-text-primary text-xs font-medium transition-colors"
          >
            Acknowledge and Close
          </button>
        </div>
      </div>
    </div>
  );
};
