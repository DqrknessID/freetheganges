import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('Tier 2: Component Navigation & Application Shell', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders application with initial overview state and wordmark', () => {
    render(<App />);

    // Wordmark & Branding
    const wordmarkElements = screen.getAllByText('FREE THE GANGES');
    expect(wordmarkElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('GBM BASIN MONITOR')).toBeInTheDocument();

    // Alert Ticker present
    expect(screen.getByText(/BASIN INTELLIGENCE WIRE/i)).toBeInTheDocument();

    // Main navigation present
    const mainNav = screen.getByRole('navigation', { name: /Main Navigation/i });
    expect(mainNav).toBeInTheDocument();

    // Initial Overview headline
    expect(screen.getByText(/THE GANGES IS UNDER PRESSURE/i)).toBeInTheDocument();
  });

  it('switches between all 5 top-level views via desktop header navigation', async () => {
    const user = userEvent.setup();
    render(<App />);

    const mainNav = screen.getByRole('navigation', { name: /Main Navigation/i });

    // 1. Switch to Environmental Atlas
    const atlasBtn = within(mainNav).getByRole('button', { name: /Environmental Atlas/i });
    await user.click(atlasBtn);
    expect(screen.getByText(/GBM BASIN GIS ATLAS/i)).toBeInTheDocument();
    expect(screen.getByText(/Cartographic Layers/i)).toBeInTheDocument();
    expect(atlasBtn).toHaveAttribute('aria-current', 'page');

    // 2. Switch to Environmental Indicators
    const indicatorsBtn = within(mainNav).getByRole('button', { name: /Environmental Indicators/i });
    await user.click(indicatorsBtn);
    expect(screen.getByText(/Scientific Environmental Indicators & Time Series Analysis/i)).toBeInTheDocument();
    expect(indicatorsBtn).toHaveAttribute('aria-current', 'page');

    // 3. Switch to Research & Reports
    const researchBtn = within(mainNav).getByRole('button', { name: /Research & Reports/i });
    await user.click(researchBtn);
    expect(screen.getByText(/Research Publications & Transparent Source Registry/i)).toBeInTheDocument();
    expect(researchBtn).toHaveAttribute('aria-current', 'page');

    // 4. Switch to About
    const aboutBtn = within(mainNav).getByRole('button', { name: /About/i });
    await user.click(aboutBtn);
    expect(screen.getByText(/Independent Environmental Watchdog Charter/i)).toBeInTheDocument();
    expect(aboutBtn).toHaveAttribute('aria-current', 'page');

    // 5. Return to Overview via desktop nav Overview button
    const overviewBtn = within(mainNav).getByRole('button', { name: /Overview/i });
    await user.click(overviewBtn);
    expect(screen.getByText(/THE GANGES IS UNDER PRESSURE/i)).toBeInTheDocument();
  });

  it('triggers view switch to Atlas when typing in the global header search input from Overview', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByRole('textbox', { name: /Search basin rivers, hotspots, contaminants/i });
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, 'Kanpur');
    expect(screen.getByText(/GBM BASIN GIS ATLAS/i)).toBeInTheDocument();
  });

  it('opens and closes the scientific methodology modal', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Methodology modal is initially not in document
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click Methodology button in header
    const methodologyBtn = screen.getByRole('button', { name: /Open scientific methodology and sensor validation protocol/i });
    await user.click(methodologyBtn);

    // Modal dialog is now visible
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(screen.getByText(/Scientific Methodology and Sensor Validation Disclosure/i)).toBeInTheDocument();

    // Close via close button
    const closeBtn = screen.getByRole('button', { name: /Close methodology disclosure/i });
    await user.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Reopen and close via Escape key
    await user.click(methodologyBtn);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('toggles mobile drawer and navigates', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Mobile menu toggle button
    const hamburgerBtn = screen.getByRole('button', { name: /Open navigation drawer/i });
    expect(hamburgerBtn).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: /Mobile Navigation/i })).not.toBeInTheDocument();

    // Click to open drawer
    await user.click(hamburgerBtn);
    expect(screen.getByRole('button', { name: /Close navigation drawer/i })).toBeInTheDocument();
    const mobileNav = screen.getByRole('navigation', { name: /Mobile Navigation/i });
    expect(mobileNav).toBeInTheDocument();

    // Click About in mobile drawer
    const mobileAboutBtn = within(mobileNav).getByRole('button', { name: /About/i });
    await user.click(mobileAboutBtn);

    // Should navigate to About and close mobile drawer
    expect(screen.getByText(/Independent Environmental Watchdog Charter/i)).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: /Mobile Navigation/i })).not.toBeInTheDocument();
  });

  it('supports navigation via footer action links', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Footer is rendered on Overview
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // Click Environmental Atlas in footer
    const footerAtlasBtn = within(footer).getByRole('button', { name: /Interactive Atlas/i });
    await user.click(footerAtlasBtn);

    expect(screen.getByText(/GBM BASIN GIS ATLAS/i)).toBeInTheDocument();
  });

  it('cycles and pauses alerts in AlertTicker', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/BASIN INTELLIGENCE WIRE/i)).toBeInTheDocument();

    // Toggle pause/play
    const pauseBtn = screen.getByRole('button', { name: /Pause alert ticker/i });
    expect(pauseBtn).toBeInTheDocument();
    await user.click(pauseBtn);
    expect(screen.getByRole('button', { name: /Resume alert ticker/i })).toBeInTheDocument();

    // Cycle next alert
    const nextBtn = screen.getByRole('button', { name: /Next intelligence bulletin/i });
    await user.click(nextBtn);

    // Clicking alert headline should navigate to atlas
    const alertBtn = screen.getByRole('button', { name: /Jump to map inspection/i });
    await user.click(alertBtn);
    expect(screen.getByText(/GBM BASIN GIS ATLAS/i)).toBeInTheDocument();
  });
});
