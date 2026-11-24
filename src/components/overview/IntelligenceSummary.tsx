import React from 'react';
import { Flame, FileText, ChevronRight, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { ActiveView } from '../../types';
import { useScrollReveal } from '../../utils/useScrollReveal';

interface IntelligenceSummaryProps {
  onNavigate: (view: ActiveView) => void;
}

export const IntelligenceSummary: React.FC<IntelligenceSummaryProps> = ({ onNavigate }) => {
  const containerRef = useScrollReveal<HTMLElement>({ selector: '.intel-card', stagger: 0.1 });

  return (
    <section ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Intelligence Briefing Card (CFR Conflict Tracker Style Dossier) */}
      <div className="intel-card lg:col-span-2 bg-surface border border-border-subtle rounded-xl p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-sans font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-text-secondary" />
            Regional Intelligence Dossier: Seasonal Hydrological Stagnation
          </h3>
          <span className="text-[11px] font-mono text-text-muted self-start sm:self-auto">
            Dossier Ref: GBM-INTEL-2026-11
          </span>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          As monsoon discharge subsides, base river flow across the Middle Ganga and lower Yamuna has dropped below 
          historical seasonal medians. In Kanpur and Varanasi, dilution capacity is critically impaired, resulting in 
          elevated biochemical oxygen demand (BOD) exceeding 30 mg/L in immediate outfall mixing zones. Concurrently, 
          downstream in Dhaka, the Buriganga and Shitalakshya river systems are approaching near-total biological anoxia, 
          driven by untreated industrial textile effluents and municipal wastewater.
        </p>

        {/* Actionable Watchlist Points */}
        <div className="p-5 rounded-lg bg-surface-elevated border border-border-subtle space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-text-muted" />
            <h4 className="text-xs font-semibold text-text-primary">
              Acute watchlist developments:
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-text-secondary list-disc list-inside">
            <li>
              <span className="text-text-primary font-medium">Kanpur Jajmau:</span> 36 MLD CETP operating above hydraulic capacity with direct bypass into Sisamau Nala.
            </li>
            <li>
              <span className="text-text-primary font-medium">West Bengal Alluvial Belt:</span> Chronic shallow tube-well arsenic levels exceeding 300 µg/L across Murshidabad and Nadia.
            </li>
            <li>
              <span className="text-text-primary font-medium">Farakka to Sundarbans:</span> Estuarine salinity intrusion extending 112 km upstream toward Khulna Division.
            </li>
            <li>
              <span className="text-text-primary font-medium">Dhaka Buriganga:</span> Dissolved oxygen reaching critical low of 0.2 mg/L at Sadarghat terminal.
            </li>
          </ul>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('atlas')}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-surface-elevated hover:bg-surface-hover border border-border-subtle hover:border-border-strong text-xs font-medium text-text-primary flex items-center gap-2 transition-colors"
          >
            <span>Inspect Affected Atlas Reaches</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('indicators')}
            className="min-h-[44px] px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>View Threshold Exceedance Charts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Featured Research Publication Teaser */}
      <div className="intel-card bg-surface border border-border-subtle rounded-xl p-6 space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-text-secondary" />
            <h3 className="text-base font-sans font-bold text-white">
              Featured Research Assessment
            </h3>
          </div>

          <span className="text-[11px] font-mono font-medium text-text-secondary block">
            Scientific Assessment 2026
          </span>

          <h4 className="text-sm font-semibold text-text-primary leading-snug">
            Transboundary Arsenic Hydrodynamics: Alluvial Transport Across the Bengal Delta Plain
          </h4>

          <p className="text-xs text-text-secondary leading-relaxed line-clamp-4">
            A comprehensive multi-year empirical investigation into the mobility of geogenic arsenic in shallow 
            Holocene aquifers between West Bengal and Southwestern Bangladesh, evaluating deep-well extraction 
            impacts and agricultural bioaccumulation.
          </p>

          <div className="text-[11px] text-text-secondary font-mono">
            Lead: Dr. A. K. Sengupta (Jadavpur University & BUET Consortium)
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('research')}
          className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-surface-elevated hover:bg-surface-hover border border-border-subtle hover:border-border-strong text-xs font-medium text-text-primary flex items-center justify-center gap-2 transition-colors"
        >
          <span>View All Research & Reports</span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </button>
      </div>

    </section>
  );
};
