import React from 'react';
import { DataProvenance } from '../../types';

interface ProvenanceBadgeProps {
  type: DataProvenance;
  showDisclaimer?: boolean;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({ type, showDisclaimer = false }) => {
  const getBadgeStyle = (provenance: DataProvenance) => {
    switch (provenance) {
      case 'IN_SITU_OBSERVED':
        return 'bg-accent-green/20 text-accent-green border-accent-green/40';
      case 'SATELLITE_DERIVED':
        return 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/40';
      case 'MODELED_SIMULATION':
        return 'bg-accent-amber/20 text-accent-amber border-accent-amber/40';
      case 'ILLUSTRATIVE_DEMO':
        return 'bg-accent-red/20 text-accent-red border-accent-red/40';
      default:
        return 'bg-surface-elevated text-text-secondary border-border-subtle';
    }
  };

  return (
    <div className="inline-flex flex-col gap-1">
      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${getBadgeStyle(type)}`}>
        {type}
      </span>
      {showDisclaimer && type === 'ILLUSTRATIVE_DEMO' && (
        <span className="text-[10px] text-accent-red leading-tight">
          Simulated demonstration data for prototype verification
        </span>
      )}
    </div>
  );
};
