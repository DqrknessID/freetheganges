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
    <div className="space-y-16 sm:space-y-20 lg:space-y-28 py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
