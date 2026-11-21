import React from 'react';
import { ActiveView } from '../../types';
import { HeroHeadline } from './HeroHeadline';
import { MetricPanelsGrid } from './MetricPanelsGrid';
import { BasinOverviewMap } from './BasinOverviewMap';
import { IntelligenceSummary } from './IntelligenceSummary';

interface OverviewDashboardProps {
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onOpenMethodology,
}) => {
  return (
    <div className="space-y-10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Hero Headline & Mission Positioning */}
      <HeroHeadline
        onNavigate={onNavigate}
        onOpenMethodology={onOpenMethodology}
      />

      {/* 2. Basin Overview Cartography Preview */}
      <BasinOverviewMap
        onNavigate={onNavigate}
      />

      {/* 3. 8 Domain Metric Panels Grid */}
      <MetricPanelsGrid
        onNavigate={onNavigate}
      />

      {/* 4. Regional Intelligence Dossier & Research Teaser */}
      <IntelligenceSummary
        onNavigate={onNavigate}
      />
    </div>
  );
};
