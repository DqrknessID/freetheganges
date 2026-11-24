import React from 'react';
import { DataProvenance } from '../../types';

interface ProvenanceBadgeProps {
  type: DataProvenance;
  showDisclaimer?: boolean;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({ type, showDisclaimer = false }) => {
  return (
    <div className="inline-flex flex-col gap-1">
      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium border bg-surface-elevated text-text-secondary border-border-subtle">
        {type}
      </span>
      {showDisclaimer && type === 'ILLUSTRATIVE_DEMO' && (
        <span className="text-[10px] text-text-muted leading-tight font-mono">
          Simulated demonstration data for prototype verification
        </span>
      )}
    </div>
  );
};
