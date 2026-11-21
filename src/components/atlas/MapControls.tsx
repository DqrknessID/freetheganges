import React from 'react';
import { Plus, Minus, RotateCcw, Maximize2, Minimize2, Radio } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetBounds: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetBounds,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <>
      {/* Top Left Basemap Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="bg-surface/95 border border-border-subtle rounded-md px-3 py-1.5 text-xs text-text-secondary shadow-md flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Esri World Dark Canvas</span>
        </div>
      </div>

      {/* Top Right Floating Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
        <div className="flex flex-col bg-surface border border-border-subtle rounded-md shadow-md overflow-hidden">
          <button
            type="button"
            onClick={onZoomIn}
            title="Zoom In"
            aria-label="Zoom In"
            className="min-h-[44px] min-w-[44px] p-2.5 text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors flex items-center justify-center border-b border-border-subtle/60"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onZoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
            className="min-h-[44px] min-w-[44px] p-2.5 text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onResetBounds}
          title="Reset Map Bounds to GBM Basin"
          aria-label="Reset Map Bounds to GBM Basin"
          className="min-h-[44px] min-w-[44px] bg-surface hover:bg-surface-elevated border border-border-subtle rounded-md p-2 text-text-primary shadow-md flex items-center justify-center transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-accent-cyan" />
        </button>

        <button
          type="button"
          onClick={onToggleFullscreen}
          title="Toggle Fullscreen"
          aria-label="Toggle Fullscreen"
          className="min-h-[44px] min-w-[44px] bg-surface hover:bg-surface-elevated border border-border-subtle rounded-md p-2 text-text-primary shadow-md flex items-center justify-center transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-accent-cyan" />
          ) : (
            <Maximize2 className="w-4 h-4 text-text-secondary hover:text-text-primary" />
          )}
        </button>
      </div>
    </>
  );
};
