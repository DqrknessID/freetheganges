import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResearchReportsView } from '../components/research/ResearchReportsView';
import { EnvironmentalAtlas } from '../components/atlas/EnvironmentalAtlas';
import { validateCoordinates } from '../../scripts/validate-basin-data';
import { evaluateThreshold, calculateComparisonDelta } from '../utils/thresholds';

// Re-export for backwards compatibility
export { calculateComparisonDelta };

describe('Tier 3: Compound Search & Filtering Synchronization', () => {
  it('synchronizes category pill selection with keyword text search in Research Hub', async () => {
    const user = userEvent.setup();
    render(<ResearchReportsView />);

    const searchInput = screen.getByPlaceholderText(/Search publications, executive summaries, tags.../i);

    // Filter to category "Scientific Assessment"
    await user.click(screen.getByRole('button', { name: 'Scientific Assessment' }));

    // Search for "alluvial" - should match Sengupta Arsenic paper
    await user.type(searchInput, 'alluvial');
    expect(screen.getByText(/Transboundary Arsenic Hydrodynamics/i)).toBeInTheDocument();
    expect(screen.queryByText(/Industrial Anoxia in the Buriganga River/i)).not.toBeInTheDocument();

    // Now search for "Chromium" while still in "Scientific Assessment" - should return 0 results
    // because Chromium paper is "Research Paper", not "Scientific Assessment"
    await user.clear(searchInput);
    await user.type(searchInput, 'Chromium');
    expect(screen.queryByText(/Transboundary Arsenic Hydrodynamics/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Industrial Anoxia in the Buriganga River/i)).not.toBeInTheDocument();

    // Now switch category to "Research Paper" with "Chromium" still in search
    await user.click(screen.getByRole('button', { name: 'Research Paper' }));
    expect(screen.getByText(/Industrial Anoxia in the Buriganga River/i)).toBeInTheDocument();
  });

  it('handles case-insensitive search queries and tag matching', async () => {
    const user = userEvent.setup();
    render(<ResearchReportsView />);

    const searchInput = screen.getByPlaceholderText(/Search publications, executive summaries, tags.../i);

    // Uppercase tag search
    await user.type(searchInput, 'PUBLIC HEALTH');
    expect(screen.getByText(/Transboundary Arsenic Hydrodynamics/i)).toBeInTheDocument();

    // Mixed case search
    await user.clear(searchInput);
    await user.type(searchInput, 'fArAkKa');
    expect(screen.getByText(/Hydrological Disruption at Farakka/i)).toBeInTheDocument();
  });
});

describe('Tier 3: Multi-Location Comparison with Telemetry Edge Cases', () => {
  it('computes comparison deltas accurately when both telemetry streams are active', () => {
    // Varanasi DO: 5.8 mg/L, Dhaka DO: 1.0 mg/L -> Delta: +4.8 mg/L
    const doComparison = calculateComparisonDelta(5.8, 1.0);
    expect(doComparison.valid).toBe(true);
    expect(doComparison.delta).toBe(4.8);
    expect(doComparison.displayDelta).toBe('+4.8');

    // Kanpur BOD: 84.0 mg/L, Varanasi BOD: 3.2 mg/L -> Delta: +80.8 mg/L
    const bodComparison = calculateComparisonDelta(84.0, 3.2);
    expect(bodComparison.valid).toBe(true);
    expect(bodComparison.delta).toBe(80.8);
    expect(bodComparison.displayDelta).toBe('+80.8');

    // Identical values
    const equalComparison = calculateComparisonDelta(7.4, 7.4);
    expect(equalComparison.delta).toBe(0);
    expect(equalComparison.displayDelta).toBe('0');
  });

  it('handles missing or offline sensor telemetry (null/undefined) gracefully with N/D', () => {
    // Primary station reporting, secondary station offline
    const partialComparison1 = calculateComparisonDelta(5.2, null);
    expect(partialComparison1.valid).toBe(false);
    expect(partialComparison1.delta).toBeNull();
    expect(partialComparison1.displayDelta).toBe('N/D');

    // Primary station offline, secondary station reporting
    const partialComparison2 = calculateComparisonDelta(undefined, 28.5);
    expect(partialComparison2.valid).toBe(false);
    expect(partialComparison2.displayDelta).toBe('N/D');

    // Both stations offline
    const fullOffline = calculateComparisonDelta(null, null);
    expect(fullOffline.valid).toBe(false);
    expect(fullOffline.displayDelta).toBe('N/D');

    // NaN input
    const nanComparison = calculateComparisonDelta(NaN, 10.0);
    expect(nanComparison.valid).toBe(false);
    expect(nanComparison.displayDelta).toBe('N/D');
  });

  it('preserves valid zero measurements and distinguishes them from missing data', () => {
    // Real measurement of 0.0 mg/L DO indicates dead zone / total anoxia
    const zeroMeasurement = calculateComparisonDelta(0.0, 4.5);
    expect(zeroMeasurement.valid).toBe(true);
    expect(zeroMeasurement.delta).toBe(-4.5);
    expect(zeroMeasurement.displayDelta).toBe('-4.5');

    // 0.0 vs 0.0
    const zeroZero = calculateComparisonDelta(0.0, 0.0);
    expect(zeroZero.valid).toBe(true);
    expect(zeroZero.delta).toBe(0);
    expect(zeroZero.displayDelta).toBe('0');
  });
});

describe('Tier 3: Boundary Value Analysis (Spatial and Regulatory)', () => {
  it('validates spatial boundary vertices and infinitesimal epsilon offsets', () => {
    // Exact 4 vertices of the basin
    expect(validateCoordinates(20.0, 73.0, 'SW Vertex')).toHaveLength(0);
    expect(validateCoordinates(32.0, 73.0, 'NW Vertex')).toHaveLength(0);
    expect(validateCoordinates(20.0, 98.0, 'SE Vertex')).toHaveLength(0);
    expect(validateCoordinates(32.0, 98.0, 'NE Vertex')).toHaveLength(0);

    // Epsilon inside
    expect(validateCoordinates(20.000001, 73.000001, 'Inside SW')).toHaveLength(0);
    expect(validateCoordinates(31.999999, 97.999999, 'Inside NE')).toHaveLength(0);

    // Epsilon outside
    const southErr = validateCoordinates(19.999999, 85.0, 'Outside South');
    expect(southErr.length).toBe(1);
    expect(southErr[0]).toContain('Latitude');

    const northErr = validateCoordinates(32.000001, 85.0, 'Outside North');
    expect(northErr.length).toBe(1);
    expect(northErr[0]).toContain('Latitude');

    const westErr = validateCoordinates(26.0, 72.999999, 'Outside West');
    expect(westErr.length).toBe(1);
    expect(westErr[0]).toContain('Longitude');

    const eastErr = validateCoordinates(26.0, 98.000001, 'Outside East');
    expect(eastErr.length).toBe(1);
    expect(eastErr[0]).toContain('Longitude');
  });

  it('validates exact threshold boundary limits', () => {
    // Dissolved Oxygen: threshold = 5.0 (direction 'min')
    // At exactly 5.0, it is compliant (not below)
    const exactDO = evaluateThreshold(5.0, 5.0, 'min');
    expect(exactDO.exceeded).toBe(false);
    expect(exactDO.status).toBe('Compliant');

    // At 4.9999, it is exceeded (below minimum)
    const slightBreachDO = evaluateThreshold(4.9999, 5.0, 'min');
    expect(slightBreachDO.exceeded).toBe(true);

    // Biochemical Oxygen Demand: threshold = 3.0 (direction 'max')
    // At exactly 3.0, it is compliant (not exceeding)
    const exactBOD = evaluateThreshold(3.0, 3.0, 'max');
    expect(exactBOD.exceeded).toBe(false);
    expect(exactBOD.status).toBe('Compliant');

    // At 3.0001, it is exceeded
    const slightBreachBOD = evaluateThreshold(3.0001, 3.0, 'max');
    expect(slightBreachBOD.exceeded).toBe(true);

    // Arsenic: threshold = 10.0 µg/L
    const exactAs = evaluateThreshold(10.0, 10.0, 'max');
    expect(exactAs.exceeded).toBe(false);
    const breachAs = evaluateThreshold(10.001, 10.0, 'max');
    expect(breachAs.exceeded).toBe(true);
  });
});

describe('Tier 3: Pairwise Interaction Between Map Filters and Selection States', () => {
  it('maintains active hotspot inspector dossier across multiple layer filter state changes', async () => {
    const user = userEvent.setup();
    render(<EnvironmentalAtlas />);

    // Inspector dossier is initialized with Kanpur Jajmau
    expect(screen.getByText(/Kanpur Jajmau & Sisamau Industrial Reach/i)).toBeInTheDocument();
    expect(screen.getByText(/48.5 mg\/L/i)).toBeInTheDocument();

    // Toggle various layers off and on in pairwise combinations
    const riversToggle = screen.getByRole('checkbox', { name: /River Trajectories/i });
    const industriesToggle = screen.getByRole('checkbox', { name: /Industrial Facilities/i });
    const stationsToggle = screen.getByRole('checkbox', { name: /Monitoring Stations/i });

    // Combination 1: Rivers OFF, Industries OFF
    await user.click(riversToggle);
    await user.click(industriesToggle);

    // Inspector dossier should remain active and visible
    expect(screen.getByText(/Kanpur Jajmau & Sisamau Industrial Reach/i)).toBeInTheDocument();
    expect(screen.getByText(/Trajectory: Worsening/i)).toBeInTheDocument();

    // Combination 2: Stations OFF, Rivers ON
    await user.click(stationsToggle);
    await user.click(riversToggle);

    expect(screen.getByText(/Kanpur Jajmau & Sisamau Industrial Reach/i)).toBeInTheDocument();
    expect(screen.getByText(/94%/i)).toBeInTheDocument();
  });

  it('filters severity while toggling layers without crash', async () => {
    const user = userEvent.setup();
    render(<EnvironmentalAtlas />);

    // Switch severity to High
    const highBtn = screen.getByRole('button', { name: /^High$/i });
    await user.click(highBtn);

    // Toggle eco zones off
    const ecoZonesToggle = screen.getByRole('checkbox', { name: /Ecological Zones/i });
    await user.click(ecoZonesToggle);

    // Reset severity to All
    const allBtn = screen.getByRole('button', { name: /^All$/i });
    await user.click(allBtn);

    expect(allBtn.className).toContain('text-accent-cyan');
  });
});
