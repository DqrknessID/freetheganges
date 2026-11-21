import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategorySelector } from '../components/indicators/CategorySelector';
import { MultiLocationComparison } from '../components/indicators/MultiLocationComparison';
import { ScientificDataTable } from '../components/indicators/ScientificDataTable';
import {
  CATEGORIES,
  PARAMETERS,
  MONITORING_STATIONS,
  getTimeSeriesChartData,
  INITIAL_OBSERVATIONS,
} from '../data/indicatorsData';
import { evaluateThreshold, calculateComparisonDelta } from '../utils/thresholds';

describe('Milestone 3: Scientific Indicators Data & Thresholds Engine', () => {
  it('covers all 9 required environmental categories', () => {
    const requiredCategories = [
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

    expect(CATEGORIES).toHaveLength(9);
    requiredCategories.forEach((cat) => {
      expect(CATEGORIES).toContain(cat);
    });

    // Check that every category has corresponding parameters
    CATEGORIES.forEach((cat) => {
      const params = PARAMETERS.filter((p) => p.category === cat);
      expect(params.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('validates multi-year seasonal time series generation (2021 to 2026)', () => {
    const series = getTimeSeriesChartData(
      'Kanpur Jajmau, Ganga Main Stem',
      'Dhaka Sadarghat, Buriganga River',
      'p1',
      'WHO'
    );

    // 2021-01 to 2026-11 is 5 * 12 + 11 = 71 points
    expect(series.length).toBe(71);
    expect(series[0].rawDate).toBe('2021-01');
    expect(series[series.length - 1].rawDate).toBe('2026-11');
    expect(series[series.length - 1].date).toContain('Nov 26');

    // Kanpur Jajmau has severe DO depletion (1.2 mg/L)
    expect(series[series.length - 1].primaryValue).toBe(1.2);
    // Dhaka Sadarghat has severe hypoxia (0.2 mg/L)
    expect(series[series.length - 1].secondaryValue).toBe(0.2);
    // WHO DO standard is 5.0
    expect(series[0].thresholdLimit).toBe(5.0);
  });

  it('evaluates threshold math correctly without javascript type coercion', () => {
    // Normal numeric values
    const compliantDO = evaluateThreshold(6.5, 5.0, 'min');
    expect(compliantDO.status).toBe('Compliant');
    expect(compliantDO.exceeded).toBe(false);

    const criticalDO = evaluateThreshold(1.2, 5.0, 'min');
    expect(criticalDO.status).toBe('Critical');
    expect(criticalDO.exceeded).toBe(true);

    const criticalBOD = evaluateThreshold(28.5, 3.0, 'max');
    expect(criticalBOD.status).toBe('Critical');
    expect(criticalBOD.exceeded).toBe(true);

    // Edge cases: null, undefined, NaN
    const nullEval = evaluateThreshold(null, 5.0, 'min');
    expect(nullEval.displayValue).toBe('N/D');

    const nanEval = evaluateThreshold(NaN, 5.0, 'min');
    expect(nanEval.displayValue).toBe('N/D');
  });

  it('calculates comparison delta between stations with correct sign', () => {
    const delta1 = calculateComparisonDelta(5.8, 1.2);
    expect(delta1.valid).toBe(true);
    expect(delta1.delta).toBe(4.6);
    expect(delta1.displayDelta).toBe('+4.6');

    const delta2 = calculateComparisonDelta(1.2, 5.8);
    expect(delta2.valid).toBe(true);
    expect(delta2.delta).toBe(-4.6);
    expect(delta2.displayDelta).toBe('-4.6');

    // Missing data guard
    const invalidDelta = calculateComparisonDelta(null, 5.0);
    expect(invalidDelta.valid).toBe(false);
    expect(invalidDelta.displayDelta).toBe('N/D');
  });
});

describe('Milestone 3: CategorySelector & Interactive Controls', () => {
  it('renders all 9 category buttons with accessible tap targets', async () => {
    const user = userEvent.setup();
    let selectedCat = 'Water Quality';
    const handleSelect = (cat: any) => {
      selectedCat = cat;
    };

    const { rerender } = render(
      <CategorySelector
        categories={CATEGORIES}
        activeCategory="Water Quality"
        onSelectCategory={handleSelect}
      />
    );

    for (const cat of CATEGORIES) {
      const btn = screen.getByRole('button', { name: cat });
      expect(btn).toBeInTheDocument();
      expect(btn.className).toContain('min-h-[44px]');
    }

    // Click Industrial Pollution
    await user.click(screen.getByRole('button', { name: 'Industrial Pollution' }));
    expect(selectedCat).toBe('Industrial Pollution');

    // Rerender with new activeCategory
    rerender(
      <CategorySelector
        categories={CATEGORIES}
        activeCategory="Industrial Pollution"
        onSelectCategory={handleSelect}
      />
    );
    expect(screen.getByRole('button', { name: 'Industrial Pollution' })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('Milestone 3: MultiLocationComparison Component', () => {
  it('renders station pickers and threshold toggle buttons', async () => {
    const user = userEvent.setup();
    let currentStandard: 'WHO' | 'CPCB' | 'ECR' = 'WHO';

    render(
      <MultiLocationComparison
        currentParam={PARAMETERS[0]} // DO
        monitoringStations={MONITORING_STATIONS}
        primaryStation="Kanpur Jajmau, Ganga Main Stem"
        secondaryStation="Chandpur Junction, Meghna-Padma"
        selectedStandard="WHO"
        primaryValue={1.2}
        secondaryValue={5.2}
        onSelectPrimary={() => {}}
        onSelectSecondary={() => {}}
        onSelectStandard={(std) => {
          currentStandard = std;
        }}
      />
    );

    // Verify Comboboxes
    const selects = screen.getAllByRole('combobox');
    expect(selects[0]).toHaveValue('Kanpur Jajmau, Ganga Main Stem');
    expect(selects[1]).toHaveValue('Chandpur Junction, Meghna-Padma');

    // Verify Standard buttons
    const cpcbBtn = screen.getByRole('button', { name: 'CPCB' });
    await user.click(cpcbBtn);
    expect(currentStandard).toBe('CPCB');

    // Verify Transboundary Variance Delta Card
    expect(screen.getByText(/Transboundary Variance/i)).toBeInTheDocument();
    expect(screen.getByText(/-4/i)).toBeInTheDocument();
  });
});

describe('Milestone 3: ScientificDataTable Component', () => {
  it('renders sortable observations and handles free-text search', async () => {
    const user = userEvent.setup();
    render(<ScientificDataTable observations={INITIAL_OBSERVATIONS} />);

    // Table title
    expect(screen.getByText(/Scientific Telemetry Records and Observations/i)).toBeInTheDocument();

    // Search for "Arsenic"
    const searchInput = screen.getByPlaceholderText(/Search station, parameter, date.../i);
    await user.type(searchInput, 'Arsenic');

    // Table should filter to rows mentioning Arsenic
    const rows = screen.getAllByText(/Arsenic/i);
    expect(rows.length).toBeGreaterThanOrEqual(1);

    // Sort by value
    const valueSortBtn = screen.getByRole('button', { name: /Measured Value/i });
    await user.click(valueSortBtn);
    expect(valueSortBtn).toBeInTheDocument();
  });

  it('filters table by compliance status dropdown', async () => {
    const user = userEvent.setup();
    render(<ScientificDataTable observations={INITIAL_OBSERVATIONS} />);

    const statusDropdown = screen.getByLabelText(/Filter records by compliance status/i);
    await user.selectOptions(statusDropdown, 'Critical');
    expect(statusDropdown).toHaveValue('Critical');

    // Should only show Critical badges or empty
    const criticalBadges = screen.getAllByText('Critical');
    expect(criticalBadges.length).toBeGreaterThan(0);
  });
});
