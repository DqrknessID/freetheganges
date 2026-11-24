import React, { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';
import { IndicatorCategory } from '../../types';
import { useScrollReveal } from '../../utils/useScrollReveal';
import {
  CATEGORIES,
  PARAMETERS,
  MONITORING_STATIONS,
  getStationCurrentValue,
  getTimeSeriesChartData,
  INITIAL_OBSERVATIONS,
} from '../../data/indicatorsData';
import { CategorySelector } from './CategorySelector';
import { TimeSeriesChart } from './TimeSeriesChart';
import { MultiLocationComparison } from './MultiLocationComparison';
import { ScientificDataTable } from './ScientificDataTable';

export const IndicatorsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<IndicatorCategory>('Water Quality');
  const [selectedParam, setSelectedParam] = useState<string>('p1');
  const [primaryStation, setPrimaryStation] = useState('Varanasi Assi Ghat, Ganga Main Stem');
  const [secondaryStation, setSecondaryStation] = useState('Dhaka Sadarghat, Buriganga River');
  const [selectedStandard, setSelectedStandard] = useState<'WHO' | 'CPCB' | 'ECR'>('WHO');

  // Filter parameters by active category
  const filteredParams = useMemo(() => {
    return PARAMETERS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Current active parameter
  const currentParam = useMemo(() => {
    return PARAMETERS.find((p) => p.id === selectedParam) || filteredParams[0] || PARAMETERS[0];
  }, [selectedParam, filteredParams]);

  // Handle category switch
  const handleCategoryChange = (category: IndicatorCategory) => {
    setActiveCategory(category);
    const firstInCat = PARAMETERS.find((p) => p.category === category);
    if (firstInCat) {
      setSelectedParam(firstInCat.id);
    }
  };

  // Get current measured values
  const primaryValue = useMemo(() => {
    return getStationCurrentValue(primaryStation, currentParam.id);
  }, [primaryStation, currentParam.id]);

  const secondaryValue = useMemo(() => {
    return getStationCurrentValue(secondaryStation, currentParam.id);
  }, [secondaryStation, currentParam.id]);

  // Active statutory threshold limit
  const activeLimit = useMemo(() => {
    if (selectedStandard === 'CPCB') {
      return currentParam.cpcbStandard?.value ?? currentParam.whoGuideline;
    }
    if (selectedStandard === 'ECR') {
      return currentParam.bangladeshStandard?.value ?? currentParam.whoGuideline;
    }
    return currentParam.whoGuideline;
  }, [currentParam, selectedStandard]);

  // Time series chart data
  const chartData = useMemo(() => {
    return getTimeSeriesChartData(
      primaryStation,
      secondaryStation,
      currentParam.id,
      selectedStandard
    );
  }, [primaryStation, secondaryStation, currentParam.id, selectedStandard]);

  const chartSectionRef = useScrollReveal<HTMLDivElement>({ y: 20, duration: 0.6 });
  const tableSectionRef = useScrollReveal<HTMLDivElement>({ y: 20, duration: 0.6 });

  return (
    <div className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14 sm:space-y-18">
      {/* Title & Introduction */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-text-secondary" />
          <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Scientific Environmental Indicators & Time Series Analysis
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-4xl">
          Continuous scientific measurement data across 9 environmental domains. Cross-reference observational 
          telemetry against statutory standards: WHO Drinking Guidelines, Central Pollution Control Board (CPCB) 
          Designated Best Use criteria, and Bangladesh Environmental Conservation Rules (ECR).
        </p>
      </div>

      {/* 9 Category Selector Tabs */}
      <CategorySelector
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* Parameter Pills within Active Category */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Parameters">
        <span className="text-xs font-semibold text-text-secondary mr-2">
          Parameters:
        </span>
        {filteredParams.length > 0 ? (
          filteredParams.map((param) => (
            <button
              key={param.id}
              type="button"
              onClick={() => setSelectedParam(param.id)}
              className={`min-h-[44px] px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-border-strong ${
                selectedParam === param.id
                  ? 'bg-surface-elevated text-text-primary border border-border-strong font-bold shadow-sm'
                  : 'bg-surface text-text-secondary border border-border-subtle hover:text-text-primary hover:border-border-strong'
              }`}
            >
              {param.name} ({param.unit})
            </button>
          ))
        ) : (
          <span className="text-xs text-text-secondary italic">
            Parameters for {activeCategory} available in complete dataset registry.
          </span>
        )}
      </div>

      {/* Multi-Location Comparison Controller & Metrics */}
      <MultiLocationComparison
        currentParam={currentParam}
        monitoringStations={MONITORING_STATIONS}
        primaryStation={primaryStation}
        secondaryStation={secondaryStation}
        selectedStandard={selectedStandard}
        primaryValue={primaryValue}
        secondaryValue={secondaryValue}
        onSelectPrimary={setPrimaryStation}
        onSelectSecondary={setSecondaryStation}
        onSelectStandard={setSelectedStandard}
      />

      {/* Recharts Time-Series Visualization Container */}
      <div ref={chartSectionRef}>
        <TimeSeriesChart
          data={chartData}
          primaryStation={primaryStation}
          secondaryStation={secondaryStation}
          parameterName={currentParam.name}
          unit={currentParam.unit}
          selectedStandard={selectedStandard}
          thresholdLimit={activeLimit}
        />
      </div>

      {/* Scientific Telemetry Observations Data Table */}
      <div ref={tableSectionRef}>
        <ScientificDataTable observations={INITIAL_OBSERVATIONS} />
      </div>
    </div>
  );
};
