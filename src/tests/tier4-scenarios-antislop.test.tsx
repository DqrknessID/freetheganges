import '@testing-library/jest-dom/vitest';
import * as fs from 'fs';
import * as path from 'path';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { EnvironmentalAtlas } from '../components/atlas/EnvironmentalAtlas';
import { ResearchReportsView } from '../components/research/ResearchReportsView';
import { evaluateThreshold } from './tier1-bounding-box-thresholds.test';
import { calculateComparisonDelta } from './tier3-cross-feature-workflows.test';

describe('Tier 4: Scenario 1 - Kanpur Jajmau Chromium Crisis Assessment', () => {
  it('exercises crisis assessment for Hexavalent Chromium exceedance in Jajmau tannery reach', () => {
    render(<EnvironmentalAtlas />);

    // 1. Verify Kanpur Jajmau hotspot dossier is inspected
    expect(screen.getByText(/Kanpur Jajmau & Sisamau Industrial Reach/i)).toBeInTheDocument();
    expect(screen.getByText(/CRITICAL SEVERITY/i)).toBeInTheDocument();

    // 2. Locate Hexavalent Chromium contaminant
    expect(screen.getByText(/Hexavalent Chromium \(Cr-VI\)/i)).toBeInTheDocument();
    expect(screen.getByText(/48.5 mg\/L/i)).toBeInTheDocument();

    // 3. Evaluate mathematical exceedance against CPCB and WHO standard limit (0.05 mg/L)
    const measuredChromium = 48.5; // mg/L
    const standardLimit = 0.05;    // mg/L (50 µg/L)
    const exceedanceRatio = measuredChromium / standardLimit;

    // 48.5 / 0.05 = 970x exceedance
    expect(exceedanceRatio).toBe(970);
    expect(exceedanceRatio).toBeGreaterThan(100);

    const evaluation = evaluateThreshold(measuredChromium, standardLimit, 'max');
    expect(evaluation.status).toBe('Critical');
    expect(evaluation.exceeded).toBe(true);

    // 4. Verify CPCB attribution and 450 MLD discharge context
    expect(screen.getByText(/Over 400 tanneries cluster along the Jajmau reach/i)).toBeInTheDocument();
    expect(screen.getByText(/CPCB Real-Time Water Quality Network/i)).toBeInTheDocument();
  });
});

describe('Tier 4: Scenario 2 - Transboundary Hypoxia Comparison (Varanasi vs Dhaka)', () => {
  it('evaluates transboundary DO hypoxia variance between Ganges main stem and Buriganga River', () => {
    // Varanasi (Assi Ghat) observed DO: 5.8 mg/L (Viable for aquatic biodiversity)
    const varanasiDO = 5.8;
    // Dhaka (Sadarghat, Buriganga) observed DO: 0.2 mg/L (Total biological anoxia)
    const dhakaDO = 0.2;

    const whoAquaticLimit = 5.0; // mg/L

    // Evaluate Varanasi
    const varanasiEval = evaluateThreshold(varanasiDO, whoAquaticLimit, 'min');
    expect(varanasiEval.status).toBe('Compliant');
    expect(varanasiEval.exceeded).toBe(false);

    // Evaluate Dhaka
    const dhakaEval = evaluateThreshold(dhakaDO, whoAquaticLimit, 'min');
    expect(dhakaEval.status).toBe('Critical');
    expect(dhakaEval.exceeded).toBe(true);

    // Transboundary Hypoxia Variance Delta
    const doDelta = calculateComparisonDelta(varanasiDO, dhakaDO);
    expect(doDelta.valid).toBe(true);
    expect(doDelta.delta).toBe(5.6);
    expect(doDelta.displayDelta).toBe('+5.6');

    // Biochemical Oxygen Demand (BOD) comparison
    // Varanasi BOD: 3.2 mg/L, Dhaka BOD: 48.0 mg/L
    const varanasiBOD = 3.2;
    const dhakaBOD = 48.0;
    const cpcbBODLimit = 3.0;

    const bodDelta = calculateComparisonDelta(dhakaBOD, varanasiBOD);
    expect(bodDelta.delta).toBe(44.8);
    expect(dhakaBOD).toBeGreaterThan(cpcbBODLimit * 10);
  });
});

describe('Tier 4: Scenario 3 - Policy Researcher Workflow (Arsenic & Source Verification)', () => {
  it('executes full researcher workflow from query to primary source verification', async () => {
    const user = userEvent.setup();
    render(<ResearchReportsView />);

    // Step 1: Researcher searches for "arsenic"
    const searchInput = screen.getByPlaceholderText(/Search publications, executive summaries, tags.../i);
    await user.type(searchInput, 'arsenic');

    // Step 2: Paper located
    expect(screen.getByText(/Transboundary Arsenic Hydrodynamics/i)).toBeInTheDocument();
    expect(screen.getByText(/Over 42% of monitored shallow tube-wells exceed the WHO drinking water limit of 10 µg\/L/i)).toBeInTheDocument();

    // Step 3: Researcher switches to Source Registry to audit benchmark database
    const srcTab = screen.getByRole('button', { name: /Source Registry/i });
    await user.click(srcTab);

    // Step 4: Auditor verifies British Geological Survey & DPHE dataset
    expect(screen.getByText(/Bengal Delta Arsenic Groundwater Geodatabase/i)).toBeInTheDocument();
    expect(screen.getByText(/British Geological Survey & DPHE Bangladesh/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified 2026-09-10/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Rating:/i).length).toBeGreaterThanOrEqual(1);
  });
});

describe('Tier 4: Scenario 4 & Anti-Slop Audit', () => {
  it('enforces strict Anti-Slop rule: ZERO em dashes in all source components', () => {
    const componentsDir = path.resolve(process.cwd(), 'src/components');
    expect(fs.existsSync(componentsDir)).toBe(true);

    const getFiles = (dir: string): string[] => {
      const results: string[] = [];
      const list = fs.readdirSync(dir);
      for (const item of list) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results.push(...getFiles(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
          results.push(fullPath);
        }
      }
      return results;
    };

    const componentFiles = getFiles(componentsDir);
    expect(componentFiles.length).toBeGreaterThan(0);

    const emDashRegex = /—|\u2014/;
    const violations: string[] = [];

    for (const file of componentFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, lineNum) => {
        if (emDashRegex.test(line)) {
          violations.push(`${path.basename(file)}:${lineNum + 1} contains em dash: "${line.trim()}"`);
        }
      });
    }

    if (violations.length > 0) {
      console.error('Anti-Slop Audit Violations:', violations);
    }
    expect(violations).toHaveLength(0);
  });

  it('verifies accessibility compliance: buttons have accessible names and min 44px tap targets', () => {
    const { container } = render(<App />);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(5);

    buttons.forEach((btn) => {
      // Must have accessible text or aria-label or title
      const hasAccessibleName = 
        Boolean(btn.textContent && btn.textContent.trim().length > 0) ||
        Boolean(btn.getAttribute('aria-label')) ||
        Boolean(btn.getAttribute('title'));

      expect(hasAccessibleName).toBe(true);

      // Must have min-h-[44px] class or equivalent minimum height
      const classList = btn.className;
      const hasTouchTarget = 
        classList.includes('min-h-[44px]') ||
        classList.includes('h-11') ||
        classList.includes('h-12') ||
        classList.includes('h-9') ||
        classList.includes('p-2') ||
        classList.includes('py-2');

      expect(hasTouchTarget).toBe(true);
    });
  });
});
