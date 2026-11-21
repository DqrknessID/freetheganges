import React from 'react';
import { ActiveView } from '../../types';
import { WatchdogMission } from './WatchdogMission';
import { BasinContext } from './BasinContext';
import { SensorMethodology } from './SensorMethodology';

interface AboutViewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenMethodology }) => {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* 1. Independent Watchdog Charter & Institutional Principles */}
      <WatchdogMission
        onNavigate={onNavigate}
        onOpenMethodology={onOpenMethodology}
      />

      {/* 2. Transboundary Hydrological & Geopolitical Context */}
      <BasinContext />

      {/* 3. Sensor Telemetry Calibration & Multi-Tier Provenance */}
      <SensorMethodology />
    </div>
  );
};
