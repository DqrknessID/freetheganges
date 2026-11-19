import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnvironmentalAtlas } from '../components/atlas/EnvironmentalAtlas';
import { IndicatorsView } from '../components/indicators/IndicatorsView';

describe('Tier 2: Environmental Atlas GIS & Map Inspector', () => {
  it('renders atlas sub-bar with coordinate bounds and CRS', () => {
    render(<EnvironmentalAtlas />);

    expect(screen.getByText(/GBM BASIN GIS ATLAS/i)).toBeInTheDocument();
    expect(screen.getByText(/20°N to 32°N, 73°E to 98°E/i)).toBeInTheDocument();
    expect(screen.getByText(/EPSG:4326 \(WGS 84\)/i)).toBeInTheDocument();
  });

  it('renders all cartographic layer checkboxes and handles toggling', async () => {
    const user = userEvent.setup();
    render(<EnvironmentalAtlas />);

    // Layer checkboxes
    const riversToggle = screen.getByRole('checkbox', { name: /River Trajectories/i });
    const hotspotsToggle = screen.getByRole('checkbox', { name: /Pollution Hotspots/i });
    const industriesToggle = screen.getByRole('checkbox', { name: /Industrial Facilities/i });
    const stationsToggle = screen.getByRole('checkbox', { name: /Monitoring Stations/i });
    const ecoZonesToggle = screen.getByRole('checkbox', { name: /Ecological Zones/i });

    // Initially all checked
    expect(riversToggle).toBeChecked();
    expect(hotspotsToggle).toBeChecked();
    expect(industriesToggle).toBeChecked();
    expect(stationsToggle).toBeChecked();
    expect(ecoZonesToggle).toBeChecked();

    // Toggle off rivers and hotspots
    await user.click(riversToggle);
    expect(riversToggle).not.toBeChecked();

    await user.click(hotspotsToggle);
    expect(hotspotsToggle).not.toBeChecked();

    // Re-check
    await user.click(riversToggle);
    expect(riversToggle).toBeChecked();
  });

  it('filters by degradation severity tier', async () => {
    const user = userEvent.setup();
    render(<EnvironmentalAtlas />);

    const criticalBtn = screen.getByRole('button', { name: /^Critical$/i });
    const highBtn = screen.getByRole('button', { name: /^High$/i });
    const allBtn = screen.getByRole('button', { name: /^All$/i });

    await user.click(criticalBtn);
    expect(criticalBtn.className).toContain('text-accent-cyan');

    await user.click(highBtn);
    expect(highBtn.className).toContain('text-accent-cyan');

    await user.click(allBtn);
    expect(allBtn.className).toContain('text-accent-cyan');
  });

  it('supports basin search filtering in atlas panel', async () => {
    const user = userEvent.setup();
    render(<EnvironmentalAtlas initialSearch="" />);

    const searchInput = screen.getByPlaceholderText(/Search river, city, facility.../i);
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, 'Buriganga');
    expect(searchInput).toHaveValue('Buriganga');
  });

  it('displays detailed hotspot inspector dossier with coordinates, contaminants, and attribution', () => {
    render(<EnvironmentalAtlas />);

    // Inspector header
    expect(screen.getByText(/CRITICAL SEVERITY/i)).toBeInTheDocument();
    expect(screen.getByText(/Trajectory: Worsening/i)).toBeInTheDocument();
    expect(screen.getByText(/Kanpur Jajmau & Sisamau Industrial Reach/i)).toBeInTheDocument();
    expect(screen.getByText(/Kanpur, Uttar Pradesh, India/i)).toBeInTheDocument();
    expect(screen.getByText(/Coordinates: 26.43°N, 80.4°E/i)).toBeInTheDocument();

    // Contaminant telemetry
    expect(screen.getByText(/Verified Contaminant Telemetry/i)).toBeInTheDocument();
    expect(screen.getByText(/Hexavalent Chromium \(Cr-VI\)/i)).toBeInTheDocument();
    expect(screen.getByText(/48.5 mg\/L/i)).toBeInTheDocument();
    expect(screen.getByText(/Biochemical Oxygen Demand \(BOD\)/i)).toBeInTheDocument();
    expect(screen.getByText(/84 mg\/L/i)).toBeInTheDocument();

    // Narrative and confidence
    expect(screen.getByText(/Over 400 tanneries cluster along the Jajmau reach/i)).toBeInTheDocument();
    expect(screen.getByText(/Data Confidence Rating:/i)).toBeInTheDocument();
    expect(screen.getByText(/94%/i)).toBeInTheDocument();
    expect(screen.getByText(/National Mission for Clean Ganga/i)).toBeInTheDocument();
  });

  it('renders map reset and fullscreen controls', () => {
    render(<EnvironmentalAtlas />);

    expect(screen.getByRole('button', { name: /Reset Map Bounds to GBM Basin/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Toggle Fullscreen/i })).toBeInTheDocument();
  });
});

describe('Tier 2: Scientific Environmental Indicators & Visualizations', () => {
  it('renders indicators view with 9 domain categories', () => {
    render(<IndicatorsView />);

    expect(screen.getByText(/Scientific Environmental Indicators & Time Series Analysis/i)).toBeInTheDocument();

    const expectedCats = [
      'Water Quality',
      'Heavy Metals',
      'Industrial Pollution',
      'Agricultural Runoff',
      'Air Pollution',
      'Soil Contamination',
      'Biodiversity',
      'Delta Ecosystem',
      'Human Exposure',
    ];

    expectedCats.forEach((cat) => {
      expect(screen.getByRole('button', { name: cat })).toBeInTheDocument();
    });
  });

  it('switches categories and updates parameter pills dynamically', async () => {
    const user = userEvent.setup();
    render(<IndicatorsView />);

    // Initially on Water Quality
    expect(screen.getByRole('button', { name: /Dissolved Oxygen \(DO\) \(mg\/L\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Biochemical Oxygen Demand \(BOD\) \(mg\/L\)/i })).toBeInTheDocument();

    // Switch to Heavy Metals
    const heavyMetalsBtn = screen.getByRole('button', { name: 'Heavy Metals' });
    await user.click(heavyMetalsBtn);

    // Verify Heavy Metals parameter pills appear
    expect(screen.getByRole('button', { name: /Arsenic \(As\) \(µg\/L\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Hexavalent Chromium \(Cr-VI\) \(mg\/L\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Lead \(Pb\) \(mg\/L\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mercury \(Hg\) \(µg\/L\)/i })).toBeInTheDocument();
  });

  it('updates selected parameter and displays statutory standards', async () => {
    const user = userEvent.setup();
    render(<IndicatorsView />);

    // Switch to Heavy Metals
    await user.click(screen.getByRole('button', { name: 'Heavy Metals' }));

    // Click Arsenic
    const arsenicBtn = screen.getByRole('button', { name: /Arsenic \(As\) \(µg\/L\)/i });
    await user.click(arsenicBtn);

    // Active Benchmark Standard should reflect Arsenic
    expect(screen.getByText(/Active Benchmark Standard/i)).toBeInTheDocument();
    expect(screen.getByText(/10.0 µg\/L/i)).toBeInTheDocument();
  });

  it('selects multi-location comparison stations and updates delta math', async () => {
    const user = userEvent.setup();
    render(<IndicatorsView />);

    const [primarySelect, secondarySelect] = screen.getAllByRole('combobox');

    expect(primarySelect).toBeInTheDocument();
    expect(secondarySelect).toBeInTheDocument();

    // Change primary station to Kanpur
    await user.selectOptions(primarySelect, 'Kanpur Jajmau, Ganga Main Stem');
    expect(primarySelect).toHaveValue('Kanpur Jajmau, Ganga Main Stem');

    // Change secondary station to Chandpur
    await user.selectOptions(secondarySelect, 'Chandpur Junction, Meghna-Padma');
    expect(secondarySelect).toHaveValue('Chandpur Junction, Meghna-Padma');

    // Threshold standards buttons
    const whoBtn = screen.getByRole('button', { name: 'WHO' });
    const cpcbBtn = screen.getByRole('button', { name: 'CPCB' });
    const ecrBtn = screen.getByRole('button', { name: 'ECR' });

    await user.click(cpcbBtn);
    expect(cpcbBtn.className).toContain('text-accent-amber');

    await user.click(ecrBtn);
    expect(ecrBtn.className).toContain('text-accent-amber');

    await user.click(whoBtn);
    expect(whoBtn.className).toContain('text-accent-amber');
  });

  it('renders comparative delta cards and time-series container', () => {
    render(<IndicatorsView />);

    // Time series engine container
    expect(screen.getByText(/Recharts Time-Series Engine Container/i)).toBeInTheDocument();
    expect(screen.getByText(/Period: 2021 to 2026 \(Monthly Aggregate\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Nov 2026 \(Latest Telemetry\)/i)).toBeInTheDocument();

    // Comparative summary cards
    expect(screen.getByText(/Exceeds Standard/i)).toBeInTheDocument();
    expect(screen.getByText(/Severe Exceedance/i)).toBeInTheDocument();
    expect(screen.getByText(/Observed telemetry from CPCB/i)).toBeInTheDocument();
  });
});
