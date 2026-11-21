import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroHeadline } from '../components/overview/HeroHeadline';
import { MetricPanelsGrid } from '../components/overview/MetricPanelsGrid';
import { BasinOverviewMap } from '../components/overview/BasinOverviewMap';
import { IntelligenceSummary } from '../components/overview/IntelligenceSummary';
import { OverviewDashboard } from '../components/overview/OverviewDashboard';
import { ProvenanceBadge } from '../components/research/ProvenanceBadge';
import { PublicationCard } from '../components/research/PublicationCard';
import { SourceRegistryTable } from '../components/research/SourceRegistryTable';
import { ResearchReportsView } from '../components/research/ResearchReportsView';
import { WatchdogMission } from '../components/about/WatchdogMission';
import { BasinContext } from '../components/about/BasinContext';
import { SensorMethodology } from '../components/about/SensorMethodology';
import { AboutView } from '../components/about/AboutView';
import { MethodologyModal } from '../components/layout/MethodologyModal';
import { publicationsData, sourceRegistryData } from '../data';

describe('Milestone 4: Overview Dashboard Components', () => {
  it('renders HeroHeadline with mission positioning, quick status pills, and CTAs', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const onOpenMethodology = vi.fn();

    render(<HeroHeadline onNavigate={onNavigate} onOpenMethodology={onOpenMethodology} />);

    // Headline
    expect(screen.getByText(/The Ganges is under pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/Draining 1.72 million square kilometers/i)).toBeInTheDocument();

    // Quick status badges
    expect(screen.getByText(/Basins Monitored: Ganges, Brahmaputra, Meghna/i)).toBeInTheDocument();
    expect(screen.getByText(/Transboundary: India & Bangladesh/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Stations: 16 Telemetry Hubs/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Independent Watchdog/i)).toBeInTheDocument();

    // CTAs trigger expected callbacks
    const atlasBtn = screen.getByRole('button', { name: /Launch Environmental Atlas/i });
    const indicatorsBtn = screen.getByRole('button', { name: /Examine Indicators/i });
    const methodBtn = screen.getByRole('button', { name: /Data Methodology/i });

    await user.click(atlasBtn);
    expect(onNavigate).toHaveBeenCalledWith('atlas');

    await user.click(indicatorsBtn);
    expect(onNavigate).toHaveBeenCalledWith('indicators');

    await user.click(methodBtn);
    expect(onOpenMethodology).toHaveBeenCalled();
  });

  it('renders MetricPanelsGrid with all 8 environmental domains', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<MetricPanelsGrid onNavigate={onNavigate} />);

    // Domain 1: Water Quality
    expect(screen.getByText('Water Quality')).toBeInTheDocument();
    expect(screen.getByText('Dissolved Oxygen Deficit')).toBeInTheDocument();
    expect(screen.getByText('0.2')).toBeInTheDocument();

    // Domain 2: Heavy Metals
    expect(screen.getByText('Heavy Metals')).toBeInTheDocument();
    expect(screen.getByText('Hexavalent Chromium (Cr-VI)')).toBeInTheDocument();
    expect(screen.getByText('48.5')).toBeInTheDocument();

    // Domain 3: Industrial Pollution
    expect(screen.getByText('Industrial Pollution')).toBeInTheDocument();
    expect(screen.getByText('Untreated Industrial Effluent')).toBeInTheDocument();

    // Domain 4: Agricultural Pollution
    expect(screen.getByText('Agricultural Pollution')).toBeInTheDocument();
    expect(screen.getByText('Nitrate (NO3) Runoff')).toBeInTheDocument();

    // Domain 5: Air Quality
    expect(screen.getByText('Air Quality (IGP Airshed)')).toBeInTheDocument();
    expect(screen.getByText('Atmospheric PM2.5 Inversion')).toBeInTheDocument();

    // Domain 6: Soil Contamination
    expect(screen.getByText('Soil Contamination')).toBeInTheDocument();
    expect(screen.getByText('Alluvial Arsenic Translocation')).toBeInTheDocument();

    // Domain 7: Biodiversity
    expect(screen.getByText('Biodiversity Vulnerability')).toBeInTheDocument();
    expect(screen.getByText('Ganges River Dolphin Density')).toBeInTheDocument();

    // Domain 8: Delta Conditions
    expect(screen.getByText('Delta Conditions')).toBeInTheDocument();
    expect(screen.getByText('Estuarine Salinity Front')).toBeInTheDocument();

    // Click quick hook button
    const examineBtns = screen.getAllByRole('button', { name: /Examine in (Atlas|Indicators)/i });
    expect(examineBtns.length).toBe(8);
    await user.click(examineBtns[0]);
    expect(onNavigate).toHaveBeenCalled();
  });

  it('renders BasinOverviewMap with river paths, urban centers, and hover tooltips', () => {
    const onNavigate = vi.fn();
    render(<BasinOverviewMap onNavigate={onNavigate} />);

    expect(screen.getByText('Transboundary Basin Regional Overview')).toBeInTheDocument();
    expect(screen.getByText(/Ganges-Brahmaputra-Meghna River Network/i)).toBeInTheDocument();

    // SVG elements and text
    expect(screen.getByText('Ganges (Ganga)')).toBeInTheDocument();
    expect(screen.getByText('Brahmaputra / Jamuna')).toBeInTheDocument();
    expect(screen.getByText('Padma / Meghna')).toBeInTheDocument();
    expect(screen.getByText('Sundarbans Delta')).toBeInTheDocument();
    expect(screen.getByText(/Farakka Barrage/i)).toBeInTheDocument();

    // Major urban centers
    expect(screen.getByText('Haridwar')).toBeInTheDocument();
    expect(screen.getByText('Kanpur')).toBeInTheDocument();
    expect(screen.getByText('Prayagraj')).toBeInTheDocument();
    expect(screen.getByText('Varanasi')).toBeInTheDocument();
    expect(screen.getByText('Patna')).toBeInTheDocument();
    expect(screen.getByText('Kolkata')).toBeInTheDocument();
    expect(screen.getByText('Dhaka')).toBeInTheDocument();
    expect(screen.getByText('Chandpur')).toBeInTheDocument();
    expect(screen.getByText('Chittagong')).toBeInTheDocument();

    // Hover tooltip test
    const kanpurText = screen.getByText('Kanpur');
    fireEvent.mouseEnter(kanpurText.parentElement!);
    expect(screen.getByText(/Jajmau Tanneries: Severe Hexavalent Chromium/i)).toBeInTheDocument();
    fireEvent.mouseLeave(kanpurText.parentElement!);

    // Haridwar hover test with pointer-events check
    const haridwarText = screen.getByText('Haridwar');
    fireEvent.mouseEnter(haridwarText.parentElement!);
    const haridwarHighlight = screen.getByText(/Ganges Upper Reaches: Clean Baseline Flow/i);
    expect(haridwarHighlight).toBeInTheDocument();
    const tooltipBox = haridwarHighlight.closest('div[style*="pointer-events"]');
    expect(tooltipBox).toHaveStyle({ pointerEvents: 'none' });
    fireEvent.mouseLeave(haridwarText.parentElement!);

    // BANGLADESH country label contrast verification
    const bangladeshText = screen.getByText('BANGLADESH');
    expect(bangladeshText).toBeInTheDocument();
    expect(bangladeshText).toHaveAttribute('fill', '#91A0B2');
  });

  it('renders IntelligenceSummary with regional briefing, watchlist, and research teaser', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<IntelligenceSummary onNavigate={onNavigate} />);

    expect(screen.getByText(/Regional Intelligence Dossier/i)).toBeInTheDocument();
    expect(screen.getByText(/Dossier Ref: GBM-INTEL-2026-11/i)).toBeInTheDocument();
    expect(screen.getByText(/Acute Watchlist Developments:/i)).toBeInTheDocument();
    expect(screen.getByText(/Kanpur Jajmau:/i)).toBeInTheDocument();
    expect(screen.getByText(/West Bengal Alluvial Belt:/i)).toBeInTheDocument();
    expect(screen.getByText(/Farakka to Sundarbans:/i)).toBeInTheDocument();
    expect(screen.getByText(/Dhaka Buriganga:/i)).toBeInTheDocument();

    // Research teaser
    expect(screen.getByText('Featured Research Assessment')).toBeInTheDocument();
    expect(screen.getByText(/Transboundary Arsenic Hydrodynamics/i)).toBeInTheDocument();

    const viewResearchBtn = screen.getByRole('button', { name: /View All Research & Reports/i });
    await user.click(viewResearchBtn);
    expect(onNavigate).toHaveBeenCalledWith('research');
  });

  it('assembles complete OverviewDashboard properly', () => {
    const onNavigate = vi.fn();
    const onOpenMethodology = vi.fn();

    render(<OverviewDashboard onNavigate={onNavigate} onOpenMethodology={onOpenMethodology} />);

    expect(screen.getByText(/The Ganges is under pressure/i)).toBeInTheDocument();
    expect(screen.getByText('Transboundary Basin Regional Overview')).toBeInTheDocument();
    expect(screen.getByText('Transboundary Environmental Metric Panels')).toBeInTheDocument();
    expect(screen.getByText(/Regional Intelligence Dossier/i)).toBeInTheDocument();
  });
});

describe('Milestone 4: Research & Reports Hub and Source Registry', () => {
  it('renders ProvenanceBadge for each data provenance tier', () => {
    const { rerender } = render(<ProvenanceBadge type="IN_SITU_OBSERVED" />);
    expect(screen.getByText('IN_SITU_OBSERVED')).toBeInTheDocument();

    rerender(<ProvenanceBadge type="SATELLITE_DERIVED" />);
    expect(screen.getByText('SATELLITE_DERIVED')).toBeInTheDocument();

    rerender(<ProvenanceBadge type="MODELED_SIMULATION" />);
    expect(screen.getByText('MODELED_SIMULATION')).toBeInTheDocument();

    rerender(<ProvenanceBadge type="ILLUSTRATIVE_DEMO" showDisclaimer={true} />);
    expect(screen.getByText('ILLUSTRATIVE_DEMO')).toBeInTheDocument();
    expect(screen.getByText(/Simulated demonstration data for prototype verification/i)).toBeInTheDocument();
  });

  it('renders PublicationCard with download action and metadata', async () => {
    const pub = publicationsData[0];
    render(<PublicationCard publication={pub} />);

    expect(screen.getByText(pub.title)).toBeInTheDocument();
    expect(screen.getByText(pub.category)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(pub.publishedDate))).toBeInTheDocument();
    expect(screen.getByText(pub.confidenceLevel)).toBeInTheDocument();
    expect(screen.getByText(pub.executiveSummary)).toBeInTheDocument();

    // Download button
    const downloadBtn = screen.getByRole('button', { name: new RegExp(`Download research brief for ${pub.title}`, 'i') });
    expect(downloadBtn).toBeInTheDocument();
  });

  it('renders SourceRegistryTable with filtering and provenance tags', async () => {
    const user = userEvent.setup();
    render(<SourceRegistryTable sources={sourceRegistryData} />);

    expect(screen.getByText('Comprehensive Environmental Dataset Registry')).toBeInTheDocument();
    expect(screen.getByText(/Central Pollution Control Board \(CPCB\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Department of Environment, Bangladesh \(DoE\)/i)).toBeInTheDocument();
    expect(screen.getByText(/European Space Agency & Copernicus Programme/i)).toBeInTheDocument();
    expect(screen.getByText(/British Geological Survey & DPHE Bangladesh/i)).toBeInTheDocument();
    expect(screen.getByText(/Bangladesh Water Development Board \(BWDB\)/i)).toBeInTheDocument();
    expect(screen.getByText(/World Health Organization \(WHO\)/i)).toBeInTheDocument();
    expect(screen.getByText(/United Nations Environment Programme \(UNEP\)/i)).toBeInTheDocument();
    expect(screen.getByText(/NASA Earth Science Division/i)).toBeInTheDocument();

    // Filter by provider
    const providerSelect = screen.getByLabelText(/Filter by provider/i);
    await user.selectOptions(providerSelect, 'BWDB');

    expect(screen.getByText(/Transboundary Hydrological Telemetry and Discharge Records/i)).toBeInTheDocument();
    expect(screen.queryByText(/European Space Agency & Copernicus Programme/i)).not.toBeInTheDocument();

    // Reset filter
    await user.selectOptions(providerSelect, 'All');
    expect(screen.getByText(/European Space Agency & Copernicus Programme/i)).toBeInTheDocument();
  });

  it('renders full ResearchReportsView and supports category and text filtering', async () => {
    const user = userEvent.setup();
    render(<ResearchReportsView />);

    expect(screen.getByText(/Research Publications & Transparent Source Registry/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Research & Reports/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Source Registry/i })).toBeInTheDocument();

    // Switch to Monitoring Update
    const monitoringBtn = screen.getByRole('button', { name: 'Monitoring Update' });
    await user.click(monitoringBtn);

    expect(screen.getByText(/Quarterly Hydrological Bulletin: Ganges-Padma Flow Regime/i)).toBeInTheDocument();
    expect(screen.queryByText(/Transboundary Arsenic Hydrodynamics/i)).not.toBeInTheDocument();
  });
});

describe('Milestone 4: About View & Institutional Profile', () => {
  it('renders WatchdogMission with independent charter and 3 core principles', () => {
    const onNavigate = vi.fn();
    const onOpenMethodology = vi.fn();

    render(<WatchdogMission onNavigate={onNavigate} onOpenMethodology={onOpenMethodology} />);

    expect(screen.getByText(/INDEPENDENT ENVIRONMENTAL WATCHDOG CHARTER/i)).toBeInTheDocument();
    expect(screen.getByText(/FREE THE GANGES: Environmental Intelligence for the GBM Basin/i)).toBeInTheDocument();
    expect(screen.getByText('Transboundary Pan-Basin Holism')).toBeInTheDocument();
    expect(screen.getByText('Transparent Provenance & Zero Fabrication')).toBeInTheDocument();
    expect(screen.getByText('Statutory Benchmarking Rigor')).toBeInTheDocument();
  });

  it('renders BasinContext with deep transboundary hydropolitics information', () => {
    render(<BasinContext />);

    expect(screen.getByText(/Transboundary Hydrological Context: India & Bangladesh/i)).toBeInTheDocument();
    expect(screen.getByText(/Upstream Diversion & The Farakka Barrage/i)).toBeInTheDocument();
    expect(screen.getByText(/The Estuarine Crucible: Sundarbans & Climate Compounding/i)).toBeInTheDocument();
    expect(screen.getByText(/Ganges Water Treaty/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Hardinge Bridge/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders SensorMethodology with calibration protocols and multi-tier provenance', () => {
    render(<SensorMethodology />);

    expect(screen.getByText(/Sensor Calibration & Laboratory Audit Standards/i)).toBeInTheDocument();
    expect(screen.getByText(/Optical dissolved oxygen sensors undergo bi-weekly chemical calibration/i)).toBeInTheDocument();
    expect(screen.getByText('IN_SITU_OBSERVED')).toBeInTheDocument();
    expect(screen.getByText('SATELLITE_DERIVED')).toBeInTheDocument();
    expect(screen.getByText('MODELED_SIMULATION')).toBeInTheDocument();
    expect(screen.getByText('ILLUSTRATIVE_DEMO')).toBeInTheDocument();
  });

  it('assembles complete AboutView properly', () => {
    const onNavigate = vi.fn();
    const onOpenMethodology = vi.fn();

    render(<AboutView onNavigate={onNavigate} onOpenMethodology={onOpenMethodology} />);

    expect(screen.getByText(/INDEPENDENT ENVIRONMENTAL WATCHDOG CHARTER/i)).toBeInTheDocument();
    expect(screen.getByText(/Transboundary Hydrological Context: India & Bangladesh/i)).toBeInTheDocument();
    expect(screen.getByText(/Sensor Calibration & Laboratory Audit Standards/i)).toBeInTheDocument();
  });

  it('renders MethodologyModal with WCAG AA compliant typography and contrast classes', () => {
    const onClose = vi.fn();
    render(<MethodologyModal isOpen={true} onClose={onClose} />);

    expect(screen.getByText(/Scientific Methodology and Sensor Validation Disclosure/i)).toBeInTheDocument();

    // Subtitle has text-text-secondary
    const subtitle = screen.getByText(/Institutional Data Standard Revision 4.2/i);
    expect(subtitle).toHaveClass('text-text-secondary');

    // Provenance cards have text-text-secondary
    const inSituText = screen.getByText(/Physical water sampling and laboratory wet-chemistry assays/i);
    expect(inSituText).toHaveClass('text-text-secondary');

    // ILLUSTRATIVE_DEMO badge has high-contrast styling
    const demoBadge = screen.getByText('ILLUSTRATIVE_DEMO');
    expect(demoBadge).toHaveClass('text-[#FCA5A5]');

    // Footer text has text-text-secondary
    const footerText = screen.getByText(/Scientific Oversight Committee: Free The Ganges Research Consortium/i);
    expect(footerText).toHaveClass('text-text-secondary');
  });
});
