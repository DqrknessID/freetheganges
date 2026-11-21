import React from 'react';
import { MapPin, ArrowRightLeft, ShieldAlert, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { ParameterMetadata, MonitoringStation } from '../../types';
import { evaluateThreshold, calculateComparisonDelta } from '../../utils/thresholds';

interface MultiLocationComparisonProps {
  currentParam: ParameterMetadata;
  monitoringStations: MonitoringStation[];
  primaryStation: string;
  secondaryStation: string;
  selectedStandard: 'WHO' | 'CPCB' | 'ECR';
  primaryValue: number;
  secondaryValue: number;
  onSelectPrimary: (station: string) => void;
  onSelectSecondary: (station: string) => void;
  onSelectStandard: (standard: 'WHO' | 'CPCB' | 'ECR') => void;
}

export const MultiLocationComparison: React.FC<MultiLocationComparisonProps> = ({
  currentParam,
  monitoringStations,
  primaryStation,
  secondaryStation,
  selectedStandard,
  primaryValue,
  secondaryValue,
  onSelectPrimary,
  onSelectSecondary,
  onSelectStandard,
}) => {
  // Determine active threshold limit
  let activeLimit = currentParam.whoGuideline ?? 5.0;
  let activeDisplayLimit = currentParam.whoGuidelineDisplay ?? `${activeLimit}`;

  if (selectedStandard === 'CPCB') {
    activeLimit = currentParam.cpcbStandard?.value ?? activeLimit;
    activeDisplayLimit = currentParam.cpcbStandardDisplay ?? `${activeLimit}`;
  } else if (selectedStandard === 'ECR') {
    activeLimit = currentParam.bangladeshStandard?.value ?? activeLimit;
    activeDisplayLimit = currentParam.ecrStandardDisplay ?? `${activeLimit}`;
  }

  // Evaluate thresholds using thresholds utility
  const primaryEval = evaluateThreshold(primaryValue, activeLimit, currentParam.direction);
  const secondaryEval = evaluateThreshold(secondaryValue, activeLimit, currentParam.direction);
  const deltaResult = calculateComparisonDelta(primaryValue, secondaryValue);

  // Find station metadata
  const primaryMeta = monitoringStations.find((s) => s.selectValue === primaryStation);
  const secondaryMeta = monitoringStations.find((s) => s.selectValue === secondaryStation);

  // Status badges
  const getPrimaryStatusBadge = () => {
    if (primaryEval.status === 'Critical') {
      return (
        <span className="text-accent-red font-bold flex items-center gap-1">
          <AlertOctagon className="w-3.5 h-3.5" />
          Exceeds Standard
        </span>
      );
    }
    if (primaryEval.status === 'Warning') {
      return (
        <span className="text-accent-amber font-bold flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          Exceeds Standard
        </span>
      );
    }
    return (
      <span className="text-accent-green font-bold flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Compliant
      </span>
    );
  };

  const getSecondaryStatusBadge = () => {
    if (secondaryEval.status === 'Critical') {
      return (
        <span className="text-accent-red font-bold flex items-center gap-1">
          <AlertOctagon className="w-3.5 h-3.5" />
          Severe Exceedance
        </span>
      );
    }
    if (secondaryEval.status === 'Warning') {
      return (
        <span className="text-accent-amber font-bold flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          Exceeds Standard
        </span>
      );
    }
    return (
      <span className="text-accent-green font-bold flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Compliant
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Interactive Control Strip: Location Pickers and Standard Overlay */}
      <div className="bg-surface border border-border-subtle rounded-xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Primary Station */}
        <div className="space-y-1.5">
          <label
            htmlFor="primary-station-select"
            className="text-xs font-semibold text-text-secondary flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
            Primary Location (Series A)
          </label>
          <select
            id="primary-station-select"
            value={primaryStation}
            onChange={(e) => onSelectPrimary(e.target.value)}
            className="w-full h-11 px-3 bg-base border border-border-subtle rounded-lg text-xs text-text-primary focus:border-accent-cyan focus:outline-none"
          >
            {monitoringStations.map((station) => (
              <option key={`prim_${station.id}`} value={station.selectValue}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {/* Secondary Station Comparison */}
        <div className="space-y-1.5">
          <label
            htmlFor="secondary-station-select"
            className="text-xs font-semibold text-text-secondary flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-accent-green" />
            Comparison Location (Series B)
          </label>
          <select
            id="secondary-station-select"
            value={secondaryStation}
            onChange={(e) => onSelectSecondary(e.target.value)}
            className="w-full h-11 px-3 bg-base border border-border-subtle rounded-lg text-xs text-text-primary focus:border-accent-green focus:outline-none"
          >
            {monitoringStations.map((station) => (
              <option key={`sec_${station.id}`} value={station.selectValue}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {/* Standard Threshold Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-accent-amber" />
            Statutory Threshold Standard
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['WHO', 'CPCB', 'ECR'] as const).map((std) => (
              <button
                key={std}
                type="button"
                onClick={() => onSelectStandard(std)}
                className={`min-h-[44px] rounded-lg text-xs font-medium border transition-colors ${
                  selectedStandard === std
                    ? 'bg-accent-amber/20 border-accent-amber text-accent-amber font-bold'
                    : 'bg-base border-border-subtle text-text-secondary hover:text-text-primary'
                }`}
              >
                {std}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Parameter Header Card */}
      <div className="bg-surface border border-border-subtle rounded-xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
          <div>
            <span className="text-xs font-semibold text-accent-cyan">
              Selected Parameter Evaluation
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {currentParam.name}
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Active Benchmark Standard ({selectedStandard}):{' '}
              <span className="text-accent-amber font-semibold font-mono">
                {activeDisplayLimit} {currentParam.unit}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg border text-right ${
                primaryEval.status === 'Critical' || secondaryEval.status === 'Critical'
                  ? 'bg-accent-red/10 border-accent-red/30'
                  : primaryEval.status === 'Warning' || secondaryEval.status === 'Warning'
                  ? 'bg-accent-amber/10 border-accent-amber/30'
                  : 'bg-accent-green/10 border-accent-green/30'
              }`}
            >
              <span className="text-[10px] font-mono text-text-secondary uppercase block">
                Exceedance Multiplier
              </span>
              <span
                className={`text-sm sm:text-base font-bold font-mono ${
                  primaryEval.status === 'Critical' || secondaryEval.status === 'Critical'
                    ? 'text-accent-red'
                    : primaryEval.status === 'Warning' || secondaryEval.status === 'Warning'
                    ? 'text-accent-amber'
                    : 'text-accent-green'
                }`}
              >
                {primaryEval.status === 'Critical' || secondaryEval.status === 'Critical'
                  ? 'Acute Exceedance'
                  : primaryEval.status === 'Warning' || secondaryEval.status === 'Warning'
                  ? 'Standard Warning'
                  : 'Compliant Baseline'}
              </span>
            </div>
          </div>
        </div>

        {/* Comparative Summary Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary Station Card */}
          <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-text-secondary truncate max-w-[180px]">{primaryStation}</span>
              {getPrimaryStatusBadge()}
            </div>
            <div className="text-2xl font-bold font-mono text-text-primary">
              {primaryValue} <span className="text-xs text-text-secondary font-normal">{currentParam.unit}</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              {primaryMeta?.provider || 'CPCB'} in-situ monitoring station with high confidence calibration. Observed telemetry from CPCB.
            </p>
          </div>

          {/* Secondary Station Card */}
          <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-text-secondary truncate max-w-[180px]">{secondaryStation}</span>
              {getSecondaryStatusBadge()}
            </div>
            <div className="text-2xl font-bold font-mono text-text-primary">
              {secondaryValue} <span className="text-xs text-text-secondary font-normal">{currentParam.unit}</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              {secondaryMeta?.provider || 'DoE Bangladesh'} real-time laboratory reporting station. Observed telemetry from DoE Bangladesh.
            </p>
          </div>

          {/* Delta Variance Card */}
          <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-text-secondary">Transboundary Variance</span>
              <span className="text-accent-cyan font-bold">Delta (A - B)</span>
            </div>
            <div className="text-2xl font-bold font-mono text-accent-cyan flex items-center gap-1.5">
              {deltaResult.delta !== null && deltaResult.delta > 0 ? (
                <ArrowUpRight className="w-5 h-5 text-accent-cyan" />
              ) : deltaResult.delta !== null && deltaResult.delta < 0 ? (
                <ArrowDownRight className="w-5 h-5 text-accent-green" />
              ) : null}
              {deltaResult.displayDelta}{' '}
              <span className="text-xs text-text-secondary font-normal">{currentParam.unit}</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Comparative gradient between {primaryMeta?.name.split(',')[0]} and {secondaryMeta?.name.split(',')[0]}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
