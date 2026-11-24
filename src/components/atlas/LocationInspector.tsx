import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Activity, 
  Droplets,
  Building2,
  Trees,
  Compass,
  X
} from 'lucide-react';
import { 
  HotspotLocation, 
  IndustrialFacility, 
  WaterQualityStation, 
  EcologicalZone, 
  RiverPath 
} from '../../types/geo';

export type SelectedEntity = 
  | { type: 'hotspot'; data: HotspotLocation }
  | { type: 'industry'; data: IndustrialFacility }
  | { type: 'station'; data: WaterQualityStation }
  | { type: 'ecozone'; data: EcologicalZone }
  | { type: 'river'; data: RiverPath };

interface LocationInspectorProps {
  selectedEntity: SelectedEntity;
  onClearSelection?: () => void;
  onClose?: () => void;
}

export const LocationInspector: React.FC<LocationInspectorProps> = ({
  selectedEntity,
  onClose,
}) => {
  const renderHotspot = (hotspot: HotspotLocation) => {
    const isCritical = hotspot.severity === 'Critical';

    return (
      <div className="space-y-5">
        {/* Header Badges */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span 
              className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                isCritical 
                  ? 'bg-accent-red/20 text-accent-red border-accent-red/40' 
                  : 'bg-accent-amber/20 text-accent-amber border-accent-amber/40'
              }`}
            >
              {hotspot.severity} Severity
            </span>
            <span className="text-xs text-text-secondary">
              Trajectory: {hotspot.trajectory}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
            {hotspot.name}
          </h3>

          <div className="text-xs text-accent-cyan flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{hotspot.city}, {hotspot.state}, {hotspot.country}</span>
          </div>

          <div className="text-xs text-text-secondary font-mono">
            Coordinates: {hotspot.coordinates[0]}°N, {hotspot.coordinates[1]}°E
          </div>

          {hotspot.dischargeMld && (
            <div className="text-xs text-text-secondary flex items-center gap-1.5 pt-1">
              <Activity className="w-3.5 h-3.5 text-accent-amber" />
              <span>Estimated Effluent Discharge: <strong className="text-text-primary font-mono">{hotspot.dischargeMld} MLD</strong></span>
            </div>
          )}
        </div>

        {/* Verified Contaminant Telemetry */}
        <div className="space-y-2">
          <h4 className="text-xs text-text-secondary font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-accent-red" />
            Verified Contaminant Telemetry
          </h4>

          <div className="space-y-2">
            {hotspot.indicators.map((ind, i) => (
              <div key={i} className="p-2.5 rounded bg-surface-elevated border border-border-subtle space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-text-primary font-medium">{ind.name}</span>
                  <span className="font-mono text-accent-red font-bold">
                    {ind.value} {ind.unit}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>Standard: <span className="font-mono">{ind.standard} {ind.unit}</span> ({ind.standardSource})</span>
                  <span className={ind.exceeded ? 'text-accent-red font-semibold' : 'text-accent-green font-semibold'}>
                    {ind.exceeded ? 'Exceeded' : 'Compliant'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Narrative */}
        <div className="space-y-2">
          <h4 className="text-xs text-text-secondary font-semibold">
            Environmental narrative &amp; drivers
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {hotspot.context}
          </p>
        </div>

        {/* Attribution and Confidence */}
        <div className="pt-3 border-t border-border-subtle space-y-2 text-xs font-mono">
          <div className="flex justify-between text-text-secondary">
            <span>Data Confidence Rating:</span>
            <span className="text-accent-cyan font-bold">{hotspot.confidenceScore}%</span>
          </div>
          <div className="text-[11px] text-text-secondary">
            Attribution: {hotspot.sources.join(', ')}
          </div>
        </div>
      </div>
    );
  };

  const renderIndustry = (fac: IndustrialFacility) => {
    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
              fac.complianceStatus === 'Non-Compliant'
                ? 'bg-accent-red/20 text-accent-red border-accent-red/40'
                : fac.complianceStatus === 'Partially Compliant'
                ? 'bg-accent-green/20 text-accent-green border-accent-green/40'
                : 'bg-accent-amber/20 text-accent-amber border-accent-amber/40'
            }`}>
              {fac.complianceStatus}
            </span>
            <span className="text-xs font-mono text-text-secondary flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-accent-amber" />
              {fac.sector}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
            {fac.name}
          </h3>

          <div className="text-xs text-accent-cyan flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{fac.clusterName}, {fac.state}, {fac.country}</span>
          </div>

          <div className="text-xs text-text-secondary font-mono">
            Coordinates: {fac.coordinates[0]}°N, {fac.coordinates[1]}°E
          </div>
        </div>

        {/* Treatment Facility Status */}
        <div className="p-3 rounded bg-surface-elevated border border-border-subtle space-y-1.5">
          <span className="text-xs font-semibold text-text-secondary block">
            Wastewater Treatment Infrastructure
          </span>
          <p className="text-xs text-text-primary font-medium">
            {fac.treatmentFacility}
          </p>
        </div>

        {/* Key Chemical Effluents */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-text-secondary block">
            Discharge Chemical Profile
          </span>
          <div className="flex flex-wrap gap-1.5">
            {fac.keyChemicals.map((chem, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-base border border-border-strong text-accent-red">
                {chem}
              </span>
            ))}
          </div>
        </div>

        {/* Source and Confidence */}
        <div className="pt-3 border-t border-border-subtle space-y-2 text-xs font-mono">
          <div className="flex justify-between text-text-secondary">
            <span>Data Confidence Rating:</span>
            <span className="text-accent-cyan font-bold">{fac.confidenceScore}%</span>
          </div>
          <div className="text-[11px] text-text-secondary">
            Data Source: {fac.dataSource}
          </div>
        </div>
      </div>
    );
  };

  const renderStation = (station: WaterQualityStation) => {
    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40">
              {station.operatingAgency} Telemetry
            </span>
            <span className="text-xs font-mono text-accent-red font-bold">
              {station.exceedanceMultiplier}x Standard
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
            {station.stationName}
          </h3>

          <div className="text-xs text-accent-cyan flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 shrink-0" />
            <span>{station.river} | {station.location}, {station.country}</span>
          </div>

          <div className="text-xs text-text-secondary font-mono">
            Coordinates: {station.coordinates[0]}°N, {station.coordinates[1]}°E
          </div>
        </div>

        {/* Measured Parameter Card */}
        <div className="p-3 rounded bg-surface-elevated border border-border-subtle space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-secondary">Primary Contaminant:</span>
            <span className="font-semibold text-text-primary">{station.primaryContaminant}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-secondary">Observed Value:</span>
            <span className="font-mono text-accent-red font-bold text-sm">
              {station.measuredValue} {station.unit}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-text-secondary border-t border-border-subtle/60 pt-1.5 font-mono">
            <span>Regulatory Limit: {station.standardLimit} {station.unit}</span>
            <span>Sampled: {station.dateSampled}</span>
          </div>
        </div>

        <div className="text-xs font-mono text-text-secondary">
          Sample Protocol: <strong className="text-text-primary">{station.sampleType}</strong>
        </div>

        <div className="pt-3 border-t border-border-subtle space-y-2 text-xs font-mono">
          <div className="flex justify-between text-text-secondary">
            <span>Data Confidence Rating:</span>
            <span className="text-accent-cyan font-bold">{station.confidenceScore}%</span>
          </div>
        </div>
      </div>
    );
  };

  const renderEcoZone = (zone: EcologicalZone) => {
    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-accent-green/20 text-accent-green border border-accent-green/40">
              {zone.threatTier} Threat Tier
            </span>
            <span className="text-xs font-mono text-text-secondary">
              Area: {zone.areaSqKm.toLocaleString()} sq km
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
            {zone.name}
          </h3>

          <div className="text-xs text-accent-green flex items-center gap-1">
            <Trees className="w-3.5 h-3.5 shrink-0" />
            <span>{zone.category} | {zone.protectionStatus}</span>
          </div>

          <div className="text-xs text-text-secondary font-mono">
            Centroid: {zone.coordinatesCentroid[0]}°N, {zone.coordinatesCentroid[1]}°E
          </div>
        </div>

        {/* Key Species */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-text-secondary block">
            Endangered &amp; Keystone Species
          </span>
          <div className="space-y-1">
            {zone.keySpecies.map((sp, i) => (
              <div key={i} className="text-xs text-text-primary italic flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green shrink-0" />
                <span>{sp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Threats */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-text-secondary block">
            Primary Environmental Pressures
          </span>
          <div className="space-y-1">
            {zone.primaryThreats.map((thr, i) => (
              <div key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0 mt-1" />
                <span>{thr}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-border-subtle text-[11px] font-mono text-text-secondary">
          Reference: {zone.sourceReference}
        </div>
      </div>
    );
  };

  const renderRiver = (river: RiverPath) => {
    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40">
              {river.system} System
            </span>
            {river.lengthKm && (
              <span className="text-xs font-mono text-text-secondary">
                Length: {river.lengthKm} km
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-text-primary leading-tight font-sans">
            {river.name}
          </h3>

          <div className="text-xs font-mono text-accent-cyan flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>Hydrographic Vector Geometry</span>
          </div>

          {river.dischargeM3s && (
            <div className="text-xs font-mono text-text-secondary">
              Mean Discharge: <strong className="text-text-primary">{river.dischargeM3s.toLocaleString()} m³/s</strong>
            </div>
          )}
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">
          {river.description}
        </p>

        <div className="p-3 rounded bg-surface-elevated border border-border-subtle text-xs font-mono space-y-1 text-text-secondary">
          <div className="text-text-primary font-semibold">Survey Waypoint Chain:</div>
          <div>Total surveyed vertices: {river.coordinates.length} points</div>
          <div>Headwaters: {river.coordinates[0][0]}°N, {river.coordinates[0][1]}°E</div>
          <div>Terminal confluence: {river.coordinates[river.coordinates.length - 1][0]}°N, {river.coordinates[river.coordinates.length - 1][1]}°E</div>
        </div>
      </div>
    );
  };

  return (
    <aside
      data-lenis-prevent
      style={{ touchAction: 'pan-y' }}
      className="w-full lg:w-96 h-full bg-surface border-l border-border-subtle flex flex-col shrink-0 overflow-y-auto p-5 space-y-5"
    >
      {onClose && (
        <div className="flex items-center justify-between lg:hidden pb-3 border-b border-border-subtle">
          <span className="text-xs font-semibold text-white">Location Dossier</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-3 py-1.5 rounded bg-surface-elevated border border-border-subtle text-text-secondary hover:text-text-primary text-xs flex items-center gap-1.5"
            aria-label="Back to Map"
          >
            <X className="w-4 h-4" />
            <span>Back to Map</span>
          </button>
        </div>
      )}
      {selectedEntity.type === 'hotspot' && renderHotspot(selectedEntity.data)}
      {selectedEntity.type === 'industry' && renderIndustry(selectedEntity.data)}
      {selectedEntity.type === 'station' && renderStation(selectedEntity.data)}
      {selectedEntity.type === 'ecozone' && renderEcoZone(selectedEntity.data)}
      {selectedEntity.type === 'river' && renderRiver(selectedEntity.data)}
    </aside>
  );
};
