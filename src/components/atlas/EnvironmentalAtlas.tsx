import React, { useState } from 'react';
import { Compass, Map, Layers, FileText } from 'lucide-react';
import { SeverityTier } from '../../types';
import { hotspotsData } from '../../data';
import { LayerFilterPanel } from './LayerFilterPanel';
import { AtlasMapCanvas } from './AtlasMapCanvas';
import { LocationInspector, SelectedEntity } from './LocationInspector';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';

interface EnvironmentalAtlasProps {
  initialSearch?: string;
}

export const EnvironmentalAtlas: React.FC<EnvironmentalAtlasProps> = ({ initialSearch = '' }) => {
  // Layer toggles
  const [showRivers, setShowRivers] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showIndustries, setShowIndustries] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [showEcoZones, setShowEcoZones] = useState(true);

  // Filters
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityTier | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Active selected inspector entity (defaults to Kanpur Jajmau)
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>({
    type: 'hotspot',
    data: hotspotsData[0],
  });

  // Mobile view tab: 'map' | 'layers' | 'inspector'
  const [mobileTab, setMobileTab] = useState<'map' | 'layers' | 'inspector'>('map');

  // Map state triggers
  const [resetTrigger, setResetTrigger] = useState(0);
  const [zoomInTrigger, setZoomInTrigger] = useState(0);
  const [zoomOutTrigger, setZoomOutTrigger] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleResetBounds = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const handleZoomIn = () => {
    setZoomInTrigger((prev) => prev + 1);
  };

  const handleZoomOut = () => {
    setZoomOutTrigger((prev) => prev + 1);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const handleSelectEntity = (entity: SelectedEntity) => {
    setSelectedEntity(entity);
    setMobileTab('inspector');
  };

  return (
    <div 
      data-lenis-prevent
      className={`flex flex-col bg-base overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'h-[calc(100vh-4rem)]'
      }`}
    >
      {/* Top Atlas Sub-bar */}
      <div className="h-12 bg-surface border-b border-border-subtle px-4 flex items-center justify-between text-xs text-text-secondary shrink-0 z-20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-accent-cyan font-semibold">
            <Compass className="w-4 h-4 text-accent-cyan" />
            <span className="font-sans text-sm tracking-normal text-white">GBM Basin GIS Atlas</span>
          </span>
          <span className="hidden md:inline text-border-strong">|</span>
          <span className="hidden md:inline text-text-secondary">
            Coordinates: <span className="font-mono text-text-primary">20°N to 32°N, 73°E to 98°E</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-accent-green">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            <span className="hidden sm:inline text-text-secondary">15 Rivers / 11 Hotspots / 16 Stations Active</span>
          </span>
          <div className="text-text-secondary hidden lg:block font-mono text-[11px]">
            CRS: EPSG:4326 (WGS 84)
          </div>
        </div>
      </div>

      {/* Mobile Atlas Segmented Control Dock (visible on < lg) */}
      <div className="lg:hidden flex items-center justify-around bg-surface border-b border-border-subtle p-1.5 shrink-0 z-30 gap-1.5">
        <button
          type="button"
          onClick={() => setMobileTab('map')}
          className={`flex-1 py-2 px-2.5 text-xs font-semibold rounded flex items-center justify-center gap-1.5 min-h-[44px] transition-colors ${
            mobileTab === 'map'
              ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/40'
              : 'text-text-secondary hover:text-white bg-surface-elevated/50'
          }`}
          aria-label="View Map Canvas"
        >
          <Map className="w-3.5 h-3.5" />
          <span>Map Canvas</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('layers')}
          className={`flex-1 py-2 px-2.5 text-xs font-semibold rounded flex items-center justify-center gap-1.5 min-h-[44px] transition-colors ${
            mobileTab === 'layers'
              ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/40'
              : 'text-text-secondary hover:text-white bg-surface-elevated/50'
          }`}
          aria-label="View Layers and Filters"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layers & Filters</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('inspector')}
          className={`flex-1 py-2 px-2.5 text-xs font-semibold rounded flex items-center justify-center gap-1.5 min-h-[44px] transition-colors ${
            mobileTab === 'inspector'
              ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/40'
              : 'text-text-secondary hover:text-white bg-surface-elevated/50'
          }`}
          aria-label="View Location Dossier"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Location Dossier</span>
        </button>
      </div>

      {/* Tri-Pane Main View Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Filter & Layer Rail */}
        <div
          className={`${
            mobileTab === 'layers'
              ? 'absolute inset-0 z-30 flex flex-col w-full h-full bg-surface'
              : 'hidden lg:flex shrink-0'
          }`}
        >
          <LayerFilterPanel
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showRivers={showRivers}
            onToggleRivers={setShowRivers}
            showHotspots={showHotspots}
            onToggleHotspots={setShowHotspots}
            showIndustries={showIndustries}
            onToggleIndustries={setShowIndustries}
            showStations={showStations}
            onToggleStations={setShowStations}
            showEcoZones={showEcoZones}
            onToggleEcoZones={setShowEcoZones}
            selectedSeverity={selectedSeverity}
            onSelectSeverity={setSelectedSeverity}
            onClose={() => setMobileTab('map')}
          />
        </div>

        {/* Center Map Canvas Area (Fluid Flex-1, always full width on mobile/tablet) */}
        <main className="flex-1 bg-base relative flex flex-col justify-between overflow-hidden w-full h-full">
          {/* Map Controls Floating Overlay */}
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetBounds={handleResetBounds}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
          />

          {/* Floating Symbology Legend */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-auto">
            <MapLegend />
          </div>

          {/* Leaflet Map Canvas */}
          <AtlasMapCanvas
            showRivers={showRivers}
            showHotspots={showHotspots}
            showIndustries={showIndustries}
            showStations={showStations}
            showEcoZones={showEcoZones}
            selectedSeverity={selectedSeverity}
            searchQuery={searchQuery}
            onSelectEntity={handleSelectEntity}
            resetTrigger={resetTrigger}
            zoomInTrigger={zoomInTrigger}
            zoomOutTrigger={zoomOutTrigger}
          />
        </main>

        {/* Right Inspector Dossier Panel */}
        <div
          className={`${
            mobileTab === 'inspector'
              ? 'absolute inset-0 z-30 flex flex-col w-full h-full bg-surface'
              : 'hidden lg:flex shrink-0'
          }`}
        >
          <LocationInspector
            selectedEntity={selectedEntity}
            onClose={() => setMobileTab('map')}
          />
        </div>
      </div>
    </div>
  );
};
