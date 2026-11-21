import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { 
  riverPaths, 
  hotspotsData, 
  industrialFacilities, 
  waterQualityStations, 
  ecologicalZones 
} from '../data';
import { LocationInspector } from '../components/atlas/LocationInspector';
import { MapControls } from '../components/atlas/MapControls';
import { MapLegend } from '../components/atlas/MapLegend';
import { EnvironmentalAtlas } from '../components/atlas/EnvironmentalAtlas';

describe('Milestone 2: Curated GIS Datasets Verification', () => {
  it('contains verified dataset item counts and attributes', () => {
    // 17 rivers
    expect(riverPaths.length).toBe(17);
    riverPaths.forEach((river) => {
      expect(river.id).toBeTruthy();
      expect(river.name).toBeTruthy();
      expect(river.coordinates.length).toBeGreaterThanOrEqual(3);
    });

    // 11 hotspots
    expect(hotspotsData.length).toBe(11);
    hotspotsData.forEach((h) => {
      expect(h.id).toMatch(/^HS-\d{2}$/);
      expect(h.name).toBeTruthy();
      expect(h.indicators.length).toBeGreaterThan(0);
    });

    // 17 industrial facilities
    expect(industrialFacilities.length).toBe(17);
    industrialFacilities.forEach((ind) => {
      expect(ind.id).toMatch(/^IND-\d{2}$/);
      expect(ind.keyChemicals.length).toBeGreaterThan(0);
    });

    // 16 water quality monitoring stations
    expect(waterQualityStations.length).toBe(16);
    waterQualityStations.forEach((wq) => {
      expect(wq.id).toMatch(/^WQ-\d{2}$/);
      expect(wq.measuredValue).toBeGreaterThan(0);
    });

    // 7 ecological zones
    expect(ecologicalZones.length).toBe(7);
    ecologicalZones.forEach((eco) => {
      expect(eco.id).toMatch(/^ECO-\d{2}$/);
      expect(eco.keySpecies.length).toBeGreaterThan(0);
    });
  });
});

describe('Milestone 2: LocationInspector Polymorphic Dossier Rendering', () => {
  it('renders IndustrialFacility entity in LocationInspector', () => {
    render(
      <LocationInspector
        selectedEntity={{
          type: 'industry',
          data: industrialFacilities[0], // Jajmau Tannery Cluster
        }}
      />
    );

    expect(screen.getByText('Jajmau Tannery Cluster')).toBeInTheDocument();
    expect(screen.getByText('Non-Compliant')).toBeInTheDocument();
    expect(screen.getByText(/36 MLD CETP \(frequently overloaded\)/i)).toBeInTheDocument();
    expect(screen.getByText('Hexavalent Chromium (Cr-VI)')).toBeInTheDocument();
  });

  it('renders WaterQualityStation entity in LocationInspector', () => {
    render(
      <LocationInspector
        selectedEntity={{
          type: 'station',
          data: waterQualityStations[0], // Chakdaha Groundwater-Surface Hub
        }}
      />
    );

    expect(screen.getByText('Chakdaha Groundwater-Surface Hub')).toBeInTheDocument();
    expect(screen.getByText('34x Standard')).toBeInTheDocument();
    expect(screen.getByText(/340 µg\/L/i)).toBeInTheDocument();
    expect(screen.getByText(/Regulatory Limit: 10 µg\/L/i)).toBeInTheDocument();
  });

  it('renders EcologicalZone entity in LocationInspector', () => {
    render(
      <LocationInspector
        selectedEntity={{
          type: 'ecozone',
          data: ecologicalZones[0], // Sundarbans Mangrove Delta
        }}
      />
    );

    expect(screen.getByText('Sundarbans Mangrove Delta')).toBeInTheDocument();
    expect(screen.getByText('Critical Threat Tier')).toBeInTheDocument();
    expect(screen.getByText(/Panthera tigris tigris \(Bengal Tiger\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Salinity intrusion from upstream freshwater diversion/i)).toBeInTheDocument();
  });

  it('renders RiverPath entity in LocationInspector', () => {
    render(
      <LocationInspector
        selectedEntity={{
          type: 'river',
          data: riverPaths[0], // Ganges Main Stem
        }}
      />
    );

    expect(screen.getByText('Ganges Main Stem')).toBeInTheDocument();
    expect(screen.getByText('Ganges System')).toBeInTheDocument();
    expect(screen.getByText(/2525 km/i)).toBeInTheDocument();
    expect(screen.getByText(/16[.,]650/i)).toBeInTheDocument();
  });
});

describe('Milestone 2: MapControls & MapLegend Interactions', () => {
  it('triggers control callbacks on user clicks', async () => {
    const user = userEvent.setup();
    const onZoomIn = vi.fn();
    const onZoomOut = vi.fn();
    const onResetBounds = vi.fn();
    const onToggleFullscreen = vi.fn();

    render(
      <MapControls
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onResetBounds={onResetBounds}
        isFullscreen={false}
        onToggleFullscreen={onToggleFullscreen}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Zoom In' }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Zoom Out' }));
    expect(onZoomOut).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Reset Map Bounds to GBM Basin' }));
    expect(onResetBounds).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Toggle Fullscreen' }));
    expect(onToggleFullscreen).toHaveBeenCalledTimes(1);
  });

  it('toggles MapLegend collapsible state', async () => {
    const user = userEvent.setup();
    render(<MapLegend />);

    const legendBtn = screen.getByRole('button', { name: 'Toggle Legend' });
    expect(screen.getByText(/Main Stems \(Ganga \/ Padma \/ Brahmaputra\)/i)).toBeInTheDocument();

    // Collapse
    await user.click(legendBtn);
    expect(screen.queryByText(/Main Stems \(Ganga \/ Padma \/ Brahmaputra\)/i)).not.toBeInTheDocument();

    // Re-expand
    await user.click(legendBtn);
    expect(screen.getByText(/Main Stems \(Ganga \/ Padma \/ Brahmaputra\)/i)).toBeInTheDocument();
  });

  it('renders EnvironmentalAtlas container and coordinates sub-bar telemetry', () => {
    render(<EnvironmentalAtlas />);
    expect(screen.getByText(/GBM BASIN GIS ATLAS/i)).toBeInTheDocument();
    expect(screen.getByText(/15 Rivers \/ 11 Hotspots \/ 16 Stations Active/i)).toBeInTheDocument();
  });
});
