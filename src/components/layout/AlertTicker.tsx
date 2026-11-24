import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Pause, Play, Radio } from 'lucide-react';
import { AlertItem } from '../../types';

interface AlertTickerProps {
  onSelectAlert?: (alert: AlertItem) => void;
}

const SAMPLE_ALERTS: AlertItem[] = [
  {
    id: 'alt-01',
    timestamp: '2026-11-19 14:00 UTC',
    category: 'Critical Alert',
    location: 'Kanpur, Uttar Pradesh',
    headline: 'Jajmau tannery outfall records Hexavalent Chromium (Cr-VI) at 48.5 mg/L, exceeding WHO guidelines by 970x.',
    severity: 'Critical',
    source: 'CPCB RTWQMS Station #04',
  },
  {
    id: 'alt-02',
    timestamp: '2026-11-19 11:30 UTC',
    category: 'Critical Alert',
    location: 'Dhaka, Bangladesh',
    headline: 'Buriganga River at Sadarghat experiences complete biological anoxia with Dissolved Oxygen measured at 0.2 mg/L.',
    severity: 'Critical',
    source: 'DoE Bangladesh Real-time Telemetry',
  },
  {
    id: 'alt-03',
    timestamp: '2026-11-19 09:15 UTC',
    category: 'Hydrological Advisory',
    location: 'Farakka Barrage, West Bengal',
    headline: 'Seasonal transboundary downstream discharge to Padma branch adjusted to 38,500 cusecs under 1996 Treaty protocol.',
    severity: 'Warning',
    source: 'Joint Rivers Commission (JRC)',
  },
  {
    id: 'alt-04',
    timestamp: '2026-11-19 06:45 UTC',
    category: 'Discharge Notice',
    location: 'Yamuna River, Delhi Okhla',
    headline: 'Surfactant foam accumulation persists at Okhla Barrage with Phosphate concentrations reaching 3.4 mg/L.',
    severity: 'Warning',
    source: 'DPCC Environmental Laboratory',
  },
];

export const AlertTicker: React.FC<AlertTickerProps> = ({ onSelectAlert }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SAMPLE_ALERTS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentAlert = SAMPLE_ALERTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SAMPLE_ALERTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SAMPLE_ALERTS.length) % SAMPLE_ALERTS.length);
  };

  const severityTextColor = (severity: AlertItem['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-accent-red';
      case 'Warning':
        return 'text-accent-amber';
      default:
        return 'text-text-primary';
    }
  };

  return (
    <div className="w-full bg-base border-b border-border-subtle/80 text-xs text-text-primary px-3 sm:px-6 py-1.5 flex items-center justify-between gap-3">
      {/* Lead wire label */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="inline-flex rounded-full h-1.5 w-1.5 bg-accent-red"></span>
        <span className="font-semibold text-text-primary flex items-center gap-1.5 text-xs">
          <Radio className="w-3.5 h-3.5 text-text-secondary" />
          <span className="hidden sm:inline">Basin Intelligence Wire</span>
          <span className="sm:hidden">Wire</span>
        </span>
      </div>

      {/* Alert content */}
      <button
        type="button"
        aria-label="Jump to map inspection"
        className="flex-1 min-w-0 flex items-center gap-2.5 overflow-hidden text-left cursor-pointer min-h-[44px]"
        onClick={() => onSelectAlert?.(currentAlert)}
        title="Jump to map inspection"
      >
        <span className={`text-[10px] font-mono font-medium uppercase tracking-wider shrink-0 ${severityTextColor(currentAlert.severity)}`}>
          {currentAlert.category}
        </span>
        <span className="text-text-secondary font-mono shrink-0 hidden md:inline text-[11px]">
          [{currentAlert.location}]
        </span>
        <p className="truncate text-text-primary hover:underline transition-colors text-[11px] sm:text-xs">
          {currentAlert.headline}
        </p>
      </button>

      {/* Controls */}
      <div className="flex items-center gap-1 shrink-0 text-text-secondary">
        <span className="font-mono text-[10px] hidden lg:inline mr-1 text-text-secondary">
          {currentIndex + 1}/{SAMPLE_ALERTS.length}
        </span>
        <button
          type="button"
          title={isPlaying ? 'Pause alert ticker' : 'Resume alert ticker'}
          aria-label={isPlaying ? 'Pause alert ticker' : 'Resume alert ticker'}
          onClick={() => setIsPlaying(!isPlaying)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 rounded hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          title="Previous intelligence bulletin"
          aria-label="Previous intelligence bulletin"
          onClick={handlePrev}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 rounded hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          title="Next intelligence bulletin"
          aria-label="Next intelligence bulletin"
          onClick={handleNext}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 rounded hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
