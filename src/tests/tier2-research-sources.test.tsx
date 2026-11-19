import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResearchReportsView } from '../components/research/ResearchReportsView';

describe('Tier 2: Research & Reports Hub and Source Registry', () => {
  it('renders research view with publications tab active by default', () => {
    render(<ResearchReportsView />);

    expect(screen.getByText(/Research Publications & Transparent Source Registry/i)).toBeInTheDocument();

    // Verify two primary section switcher buttons
    const pubTab = screen.getByRole('button', { name: /Research & Reports/i });
    const srcTab = screen.getByRole('button', { name: /Source Registry/i });

    expect(pubTab).toBeInTheDocument();
    expect(srcTab).toBeInTheDocument();

    // Publication search input
    expect(screen.getByPlaceholderText(/Search publications, executive summaries, tags.../i)).toBeInTheDocument();

    // Category filter pills
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Scientific Assessment' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Research Paper' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Policy Brief' })).toBeInTheDocument();
  });

  it('renders publication cards with metadata, executive summary, and empirical findings', () => {
    render(<ResearchReportsView />);

    // Check presence of peer-reviewed articles
    expect(screen.getByText(/Transboundary Arsenic Hydrodynamics: Alluvial Transport Across the Bengal Delta Plain/i)).toBeInTheDocument();
    expect(screen.getByText(/Industrial Anoxia in the Buriganga River: Tannery Relocation Efficacy and Residual Chromium Load/i)).toBeInTheDocument();
    expect(screen.getByText(/Hydrological Disruption at Farakka: Downstream Sediment Starvation and Estuarine Salinity Intrusion/i)).toBeInTheDocument();

    // Check authors and institutions
    expect(screen.getByText(/Dr. A. K. Sengupta/i)).toBeInTheDocument();
    expect(screen.getByText(/Bengal Basin Hydrogeology Consortium & Jadavpur University/i)).toBeInTheDocument();
    expect(screen.getByText(/Bangladesh University of Engineering & Technology \(BUET\)/i)).toBeInTheDocument();

    // Check empirical findings and tags
    expect(screen.getByText(/Over 42% of monitored shallow tube-wells exceed the WHO drinking water limit of 10 µg\/L/i)).toBeInTheDocument();
    expect(screen.getByText(/#Arsenic/i)).toBeInTheDocument();
    expect(screen.getByText(/#Chromium/i)).toBeInTheDocument();
  });

  it('filters publications by category button clicks', async () => {
    const user = userEvent.setup();
    render(<ResearchReportsView />);

    // Click "Policy Brief"
    const policyBriefBtn = screen.getByRole('button', { name: 'Policy Brief' });
    await user.click(policyBriefBtn);

    // Only Farakka paper should remain visible
    expect(screen.getByText(/Hydrological Disruption at Farakka/i)).toBeInTheDocument();
    expect(screen.queryByText(/Transboundary Arsenic Hydrodynamics/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Industrial Anoxia in the Buriganga River/i)).not.toBeInTheDocument();

    // Click "Research Paper"
    const researchPaperBtn = screen.getByRole('button', { name: 'Research Paper' });
    await user.click(researchPaperBtn);

    expect(screen.getByText(/Industrial Anoxia in the Buriganga River/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hydrological Disruption at Farakka/i)).not.toBeInTheDocument();

    // Click "All"
    const allBtn = screen.getByRole('button', { name: 'All' });
    await user.click(allBtn);

    expect(screen.getByText(/Transboundary Arsenic Hydrodynamics/i)).toBeInTheDocument();
    expect(screen.getByText(/Industrial Anoxia in the Buriganga River/i)).toBeInTheDocument();
    expect(screen.getByText(/Hydrological Disruption at Farakka/i)).toBeInTheDocument();
  });

  it('filters publications dynamically by free text search query', async () => {
    const user = userEvent.setup();
    render(<ResearchReportsView />);

    const searchInput = screen.getByPlaceholderText(/Search publications, executive summaries, tags.../i);

    // Search for "chromium"
    await user.type(searchInput, 'chromium');

    expect(screen.getByText(/Industrial Anoxia in the Buriganga River/i)).toBeInTheDocument();
    expect(screen.queryByText(/Transboundary Arsenic Hydrodynamics/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Hydrological Disruption at Farakka/i)).not.toBeInTheDocument();

    // Clear search
    await user.clear(searchInput);
    expect(screen.getByText(/Transboundary Arsenic Hydrodynamics/i)).toBeInTheDocument();

    // Non-existent search query
    await user.type(searchInput, 'nonexistentcontaminantterm');
    expect(screen.queryByText(/Transboundary Arsenic Hydrodynamics/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Industrial Anoxia in the Buriganga River/i)).not.toBeInTheDocument();
  });

  it('switches to Source Registry tab and renders comprehensive provider table', async () => {
    const user = userEvent.setup();
    render(<ResearchReportsView />);

    const srcTab = screen.getByRole('button', { name: /Source Registry/i });
    await user.click(srcTab);

    // Verify registry header
    expect(screen.getByText(/Comprehensive Environmental Dataset Registry/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete institutional provenance for all monitored parameters/i)).toBeInTheDocument();

    // Verify table columns
    expect(screen.getByText('Dataset Name & Provider')).toBeInTheDocument();
    expect(screen.getByText('Data Provenance')).toBeInTheDocument();
    expect(screen.getByText('Geographic & Temporal Span')).toBeInTheDocument();
    expect(screen.getByText('Parameters Covered')).toBeInTheDocument();
    expect(screen.getByText('Update Cadence')).toBeInTheDocument();
    expect(screen.getByText('Verification')).toBeInTheDocument();

    // Verify provider rows
    expect(screen.getByText('Central Pollution Control Board (CPCB)')).toBeInTheDocument();
    expect(screen.getByText('Department of Environment, Bangladesh (DoE)')).toBeInTheDocument();
    expect(screen.getByText('European Space Agency & Copernicus Programme')).toBeInTheDocument();
    expect(screen.getByText('British Geological Survey & DPHE Bangladesh')).toBeInTheDocument();

    // Verify Provenance Badges
    const inSituBadges = screen.getAllByText('IN_SITU_OBSERVED');
    expect(inSituBadges.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText('SATELLITE_DERIVED')).toBeInTheDocument();
    expect(screen.getByText('ILLUSTRATIVE_DEMO')).toBeInTheDocument();
  });

  it('explicitly designates illustrative prototype demo datasets with transparency', async () => {
    const user = userEvent.setup();
    render(<ResearchReportsView />);

    await user.click(screen.getByRole('button', { name: /Source Registry/i }));

    // Find the prototype simulator entry
    expect(screen.getByText(/Illustrative Real-Time Basin Simulator Dataset/i)).toBeInTheDocument();
    expect(screen.getByText('ILLUSTRATIVE_DEMO')).toBeInTheDocument();

    // Audit statement in footer
    expect(screen.getByText(/No fabricated telemetry permitted. Missing records displayed as N\/D./i)).toBeInTheDocument();
  });
});
