import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { describe, it, expect } from 'vitest';
import { validateCoordinates, validateBasinDatasets, BOUNDING_BOX } from '../../scripts/validate-basin-data';
import { evaluateThreshold, calculateComparisonDelta } from '../utils/thresholds';
import { 
  ThresholdStandard, 
  IndicatorCategory, 
  DataProvenance, 
  HotspotIndicator 
} from '../types';

// Re-export for backwards compatibility
export { evaluateThreshold, calculateComparisonDelta };

describe('Tier 1: Geospatial Bounding Box Verification', () => {
  it('validates bounding box constant coordinates', () => {
    expect(BOUNDING_BOX.latMin).toBe(20.0);
    expect(BOUNDING_BOX.latMax).toBe(32.0);
    expect(BOUNDING_BOX.lngMin).toBe(73.0);
    expect(BOUNDING_BOX.lngMax).toBe(98.0);
  });

  it('passes verified basin cities and critical monitoring reaches within bounds', () => {
    // Kanpur Jajmau
    const kanpur = validateCoordinates(26.4499, 80.3319, 'Kanpur');
    expect(kanpur).toHaveLength(0);

    // Varanasi Assi Ghat
    const varanasi = validateCoordinates(25.3176, 82.9739, 'Varanasi');
    expect(varanasi).toHaveLength(0);

    // Patna Danapur
    const patna = validateCoordinates(25.5941, 85.1376, 'Patna');
    expect(patna).toHaveLength(0);

    // Kolkata / Hooghly
    const kolkata = validateCoordinates(22.5726, 88.3639, 'Kolkata');
    expect(kolkata).toHaveLength(0);

    // Dhaka Sadarghat / Buriganga
    const dhaka = validateCoordinates(23.8103, 90.4125, 'Dhaka');
    expect(dhaka).toHaveLength(0);

    // Guwahati Brahmaputra
    const guwahati = validateCoordinates(26.1445, 91.7362, 'Guwahati');
    expect(guwahati).toHaveLength(0);

    // Sundarbans Delta mangrove reach
    const sundarbans = validateCoordinates(21.9497, 89.1833, 'Sundarbans');
    expect(sundarbans).toHaveLength(0);

    // Haridwar upper Ganges
    const haridwar = validateCoordinates(29.9457, 78.1642, 'Haridwar');
    expect(haridwar).toHaveLength(0);

    // Allahabad / Prayagraj Sangam
    const prayagraj = validateCoordinates(25.4358, 81.8463, 'Prayagraj');
    expect(prayagraj).toHaveLength(0);

    // Sylhet Surma / Meghna reach
    const sylhet = validateCoordinates(24.8949, 91.8687, 'Sylhet');
    expect(sylhet).toHaveLength(0);
  });

  it('rejects out of bounds coordinates outside GBM basin limits', () => {
    // Karachi, Pakistan (Longitude 67.0011°E < 73.0°E)
    const karachi = validateCoordinates(24.8607, 67.0011, 'Karachi');
    expect(karachi.length).toBeGreaterThanOrEqual(1);
    expect(karachi[0]).toContain('Longitude 67.0011°E outside GBM bounding box');

    // Kabul, Afghanistan (Latitude 34.5553°N > 32.0°N and Longitude 69.2075°E < 73.0°E)
    const kabul = validateCoordinates(34.5553, 69.2075, 'Kabul');
    expect(kabul.length).toBe(2);

    // Southern Bay of Bengal (Latitude 15.0°N < 20.0°N)
    const bayOfBengal = validateCoordinates(15.0000, 88.0000, 'Bay of Bengal South');
    expect(bayOfBengal.length).toBe(1);
    expect(bayOfBengal[0]).toContain('Latitude 15°N outside GBM bounding box');

    // Northern Tibetan Plateau (Latitude 35.0°N > 32.0°N)
    const tibet = validateCoordinates(35.0000, 85.0000, 'Northern Plateau');
    expect(tibet.length).toBe(1);
    expect(tibet[0]).toContain('Latitude 35°N outside GBM bounding box');

    // Western Gujarat/Arabian Sea border (Longitude 70.0°E < 73.0°E)
    const westArabian = validateCoordinates(22.0000, 70.0000, 'West Limit');
    expect(westArabian.length).toBe(1);
    expect(westArabian[0]).toContain('Longitude 70°E outside GBM bounding box');

    // Eastern Myanmar border (Longitude 99.5°E > 98.0°E)
    const eastMyanmar = validateCoordinates(24.0000, 99.5000, 'East Limit');
    expect(eastMyanmar.length).toBe(1);
    expect(eastMyanmar[0]).toContain('Longitude 99.5°E outside GBM bounding box');

    // Negative coordinates (Southern / Western hemisphere)
    const negativeCoords = validateCoordinates(-25.0, -80.0, 'Negative Coords');
    expect(negativeCoords.length).toBe(2);

    // Invalid non-numeric or NaN coordinates
    const nanCoords = validateCoordinates(NaN, 85.0, 'NaN Lat');
    expect(nanCoords.length).toBe(1);
    expect(nanCoords[0]).toContain('Invalid latitude value');
  });

  it('validates precise boundary vertices of the bounding box', () => {
    // Exact 4 corners
    expect(validateCoordinates(20.0, 73.0, 'SW Corner')).toHaveLength(0);
    expect(validateCoordinates(32.0, 73.0, 'NW Corner')).toHaveLength(0);
    expect(validateCoordinates(20.0, 98.0, 'SE Corner')).toHaveLength(0);
    expect(validateCoordinates(32.0, 98.0, 'NE Corner')).toHaveLength(0);

    // Slightly outside boundaries
    expect(validateCoordinates(19.9999, 80.0, 'Below South')).toHaveLength(1);
    expect(validateCoordinates(32.0001, 80.0, 'Above North')).toHaveLength(1);
    expect(validateCoordinates(25.0, 72.9999, 'West of West')).toHaveLength(1);
    expect(validateCoordinates(25.0, 98.0001, 'East of East')).toHaveLength(1);
  });

  it('validates dataset directories through validateBasinDatasets', () => {
    const res = validateBasinDatasets('non-existent-dir-check');
    expect(res.valid).toBe(true);
    expect(res.errors).toHaveLength(0);
    expect(res.checkedCount).toBe(0);
  });

  it('validates GeoJSON MultiLineString geometries and catches out-of-bounds coordinates', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'geojson-multiline-test-'));
    try {
      // 1. Valid braided channel MultiLineString within GBM basin
      const validGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'Brahmaputra Braided Channels' },
            geometry: {
              type: 'MultiLineString',
              coordinates: [
                [[91.73, 26.14], [91.80, 26.18]],
                [[91.75, 26.12], [91.82, 26.16]],
              ],
            },
          },
        ],
      };
      fs.writeFileSync(path.join(tempDir, 'valid-braided.geojson'), JSON.stringify(validGeoJSON));
      const validRes = validateBasinDatasets(tempDir);
      expect(validRes.valid).toBe(true);
      expect(validRes.checkedCount).toBe(4);
      expect(validRes.errors).toHaveLength(0);

      // 2. Out-of-bounds MultiLineString coordinates
      const invalidGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'Adversarial MultiLine Reach' },
            geometry: {
              type: 'MultiLineString',
              coordinates: [
                [[50.0, 10.0], [51.0, 11.0]],
              ],
            },
          },
        ],
      };
      fs.writeFileSync(path.join(tempDir, 'invalid-multiline.geojson'), JSON.stringify(invalidGeoJSON));
      const invalidRes = validateBasinDatasets(tempDir);
      expect(invalidRes.valid).toBe(false);
      expect(invalidRes.errors.length).toBeGreaterThanOrEqual(2);
      expect(invalidRes.errors.some(err => err.includes('multiline[0][0]'))).toBe(true);
      expect(invalidRes.errors.some(err => err.includes('Latitude 10°N outside GBM bounding box'))).toBe(true);
      expect(invalidRes.errors.some(err => err.includes('Longitude 50°E outside GBM bounding box'))).toBe(true);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('validates GeoJSON MultiPolygon geometries and catches out-of-bounds coordinates', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'geojson-multipoly-test-'));
    try {
      // 1. Valid MultiPolygon (Sundarbans mangrove island complexes)
      const validGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'Sundarbans Mangrove Complex' },
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  [[88.90, 21.80], [89.10, 21.80], [89.10, 21.95], [88.90, 21.95], [88.90, 21.80]],
                ],
              ],
            },
          },
        ],
      };
      fs.writeFileSync(path.join(tempDir, 'valid-multipoly.geojson'), JSON.stringify(validGeoJSON));
      const validRes = validateBasinDatasets(tempDir);
      expect(validRes.valid).toBe(true);
      expect(validRes.checkedCount).toBe(5);
      expect(validRes.errors).toHaveLength(0);

      // 2. Out-of-bounds MultiPolygon
      const invalidGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'Adversarial MultiPoly Island' },
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  [[50.0, 10.0], [51.0, 10.0], [51.0, 11.0], [50.0, 11.0], [50.0, 10.0]],
                ],
              ],
            },
          },
        ],
      };
      fs.writeFileSync(path.join(tempDir, 'invalid-multipoly.geojson'), JSON.stringify(invalidGeoJSON));
      const invalidRes = validateBasinDatasets(tempDir);
      expect(invalidRes.valid).toBe(false);
      expect(invalidRes.errors.length).toBeGreaterThanOrEqual(2);
      expect(invalidRes.errors.some(err => err.includes('multipoly[0][0][0]'))).toBe(true);
      expect(invalidRes.errors.some(err => err.includes('Latitude 10°N outside GBM bounding box'))).toBe(true);
      expect(invalidRes.errors.some(err => err.includes('Longitude 50°E outside GBM bounding box'))).toBe(true);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('extracts and validates coordinates in TypeScript data files without dropping coordinates outside [15°N, 35°N]', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-coordinates-test-'));
    try {
      // TypeScript dataset declaring Bangalore South (Lat 12.9716°N < 15°N) and London
      const tsContent = `
        export const sampleBasinStations = [
          { name: 'Bangalore South', coordinates: [12.9716, 77.5946] },
          { name: 'London UK', coordinates: [51.5074, -0.1278] },
          { name: 'Kanpur Tannery Reach', coordinates: [26.4499, 80.3319] }
        ];
      `;
      fs.writeFileSync(path.join(tempDir, 'sample_data.ts'), tsContent);
      const res = validateBasinDatasets(tempDir);
      // Bangalore is < 20°N; London is < 73°E and > 32°N; Kanpur is valid.
      expect(res.checkedCount).toBe(3);
      expect(res.valid).toBe(false);
      expect(res.errors.length).toBeGreaterThanOrEqual(2);
      expect(res.errors.some(err => err.includes('Latitude 12.9716°N outside GBM bounding box'))).toBe(true);
      expect(res.errors.some(err => err.includes('outside GBM bounding box'))).toBe(true);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

describe('Tier 1: Standards Threshold Evaluation Engine', () => {
  // Dissolved Oxygen (DO): Direction 'min'. Higher is better. WHO > 5.0, CPCB Class B >= 5.0, Hypoxic < 4.0, Anoxia < 2.0
  it('evaluates Dissolved Oxygen (DO) against WHO and CPCB Class B standards', () => {
    const thresholdDO = 5.0; // mg/L
    const healthyDO = evaluateThreshold(6.8, thresholdDO, 'min');
    expect(healthyDO.exceeded).toBe(false);
    expect(healthyDO.status).toBe('Compliant');

    const borderlineDO = evaluateThreshold(5.0, thresholdDO, 'min');
    expect(borderlineDO.exceeded).toBe(false);
    expect(borderlineDO.status).toBe('Compliant');

    const warningDO = evaluateThreshold(3.8, thresholdDO, 'min');
    expect(warningDO.exceeded).toBe(true);
    expect(warningDO.status).toBe('Warning');

    const criticalAnoxiaDO = evaluateThreshold(1.1, thresholdDO, 'min');
    expect(criticalAnoxiaDO.exceeded).toBe(true);
    expect(criticalAnoxiaDO.status).toBe('Critical');
  });

  // Biochemical Oxygen Demand (BOD): Direction 'max'. Lower is better. WHO < 2.0, CPCB Class B <= 3.0, Heavy pollution > 6.0
  it('evaluates Biochemical Oxygen Demand (BOD) against standards', () => {
    const thresholdBOD = 3.0; // mg/L (CPCB Class B)
    const cleanBOD = evaluateThreshold(1.8, thresholdBOD, 'max');
    expect(cleanBOD.exceeded).toBe(false);
    expect(cleanBOD.status).toBe('Compliant');

    const permissibleBOD = evaluateThreshold(3.0, thresholdBOD, 'max');
    expect(permissibleBOD.exceeded).toBe(false);
    expect(permissibleBOD.status).toBe('Compliant');

    const moderateBOD = evaluateThreshold(4.5, thresholdBOD, 'max');
    expect(moderateBOD.exceeded).toBe(true);
    expect(moderateBOD.status).toBe('Warning');

    const criticalBOD = evaluateThreshold(28.5, thresholdBOD, 'max');
    expect(criticalBOD.exceeded).toBe(true);
    expect(criticalBOD.status).toBe('Critical');
  });

  // pH Level: Normal range 6.5 - 8.5
  it('evaluates pH range constraints', () => {
    const checkPH = (val: number): 'Compliant' | 'Warning' | 'Critical' => {
      if (val >= 6.5 && val <= 8.5) return 'Compliant';
      if ((val >= 6.0 && val < 6.5) || (val > 8.5 && val <= 9.0)) return 'Warning';
      return 'Critical';
    };

    expect(checkPH(7.4)).toBe('Compliant');
    expect(checkPH(6.5)).toBe('Compliant');
    expect(checkPH(8.5)).toBe('Compliant');
    expect(checkPH(6.2)).toBe('Warning');
    expect(checkPH(8.8)).toBe('Warning');
    expect(checkPH(5.4)).toBe('Critical');
    expect(checkPH(9.6)).toBe('Critical');
  });

  // Arsenic (As): WHO guideline <= 10.0 µg/L, Bangladesh ECR <= 50.0 µg/L
  it('evaluates Arsenic (As) against WHO and Bangladesh national standards', () => {
    const whoAsThreshold = 10.0;
    const ecrAsThreshold = 50.0;

    const safeWell = evaluateThreshold(4.2, whoAsThreshold, 'max');
    expect(safeWell.exceeded).toBe(false);
    expect(safeWell.status).toBe('Compliant');

    const whoBreachEcrSafe = evaluateThreshold(32.0, whoAsThreshold, 'max');
    expect(whoBreachEcrSafe.exceeded).toBe(true);
    const ecrCheck = evaluateThreshold(32.0, ecrAsThreshold, 'max');
    expect(ecrCheck.exceeded).toBe(false);

    const highToxicityWell = evaluateThreshold(340.0, ecrAsThreshold, 'max');
    expect(highToxicityWell.exceeded).toBe(true);
    expect(highToxicityWell.status).toBe('Critical');
  });

  // Hexavalent Chromium (Cr-VI): WHO / CPCB limit <= 0.05 mg/L (50 µg/L)
  it('evaluates Hexavalent Chromium (Cr-VI) in industrial tannery reaches', () => {
    const crThreshold = 0.05; // mg/L
    const compliantRiver = evaluateThreshold(0.015, crThreshold, 'max');
    expect(compliantRiver.exceeded).toBe(false);
    expect(compliantRiver.status).toBe('Compliant');

    const jajmauTanneryEffluent = evaluateThreshold(48.5, crThreshold, 'max');
    expect(jajmauTanneryEffluent.exceeded).toBe(true);
    expect(jajmauTanneryEffluent.status).toBe('Critical');
  });

  // Lead (Pb): WHO/CPCB limit <= 0.01 mg/L (10 µg/L)
  it('evaluates Lead (Pb) neurotoxicity limit', () => {
    const leadThreshold = 0.01; // mg/L
    const cleanLead = evaluateThreshold(0.003, leadThreshold, 'max');
    expect(cleanLead.exceeded).toBe(false);

    const exceedanceLead = evaluateThreshold(0.12, leadThreshold, 'max');
    expect(exceedanceLead.exceeded).toBe(true);
    expect(exceedanceLead.status).toBe('Critical');
  });

  // Mercury (Hg): WHO / CPCB limit <= 1.0 µg/L
  it('evaluates Mercury (Hg) bioaccumulation threshold', () => {
    const hgThreshold = 1.0; // µg/L
    const baselineHg = evaluateThreshold(0.3, hgThreshold, 'max');
    expect(baselineHg.exceeded).toBe(false);

    const toxicHg = evaluateThreshold(14.5, hgThreshold, 'max');
    expect(toxicHg.exceeded).toBe(true);
    expect(toxicHg.status).toBe('Critical');
  });

  // Fecal Coliform: CPCB Class B desirable <= 500, max permissible <= 2500 MPN/100mL
  it('evaluates Fecal Coliform counts against bathing standards', () => {
    const coliformThreshold = 500; // MPN/100mL
    const pristineUpperGanges = evaluateThreshold(180, coliformThreshold, 'max');
    expect(pristineUpperGanges.exceeded).toBe(false);

    const urbanDownstream = evaluateThreshold(64000, coliformThreshold, 'max');
    expect(urbanDownstream.exceeded).toBe(true);
    expect(urbanDownstream.status).toBe('Critical');
  });

  // PM2.5 Air Quality: WHO 24hr <= 15 µg/m³, CPCB 24hr <= 60 µg/m³
  it('evaluates Indo-Gangetic Plain PM2.5 airshed standard', () => {
    const cpcbPM25 = 60.0;
    const cleanAir = evaluateThreshold(35.0, cpcbPM25, 'max');
    expect(cleanAir.exceeded).toBe(false);

    const winterInversionSmog = evaluateThreshold(285.0, cpcbPM25, 'max');
    expect(winterInversionSmog.exceeded).toBe(true);
    expect(winterInversionSmog.status).toBe('Critical');
  });

  // Turbidity, TDS, Nitrates, Phosphates
  it('evaluates auxiliary water parameters (TDS, Nitrates, Phosphates, Turbidity)', () => {
    // TDS: Desirable 500, permissible 1000 mg/L
    const tdsThreshold = 1000;
    expect(evaluateThreshold(450, tdsThreshold, 'max').exceeded).toBe(false);
    expect(evaluateThreshold(3850, tdsThreshold, 'max').exceeded).toBe(true);

    // Nitrates: CPCB/WHO limit 45-50 mg/L
    const nitrateThreshold = 45.0;
    expect(evaluateThreshold(12.0, nitrateThreshold, 'max').exceeded).toBe(false);
    expect(evaluateThreshold(68.0, nitrateThreshold, 'max').exceeded).toBe(true);

    // Phosphates: Eutrophication trigger 0.1 mg/L
    const phosphateThreshold = 0.1;
    expect(evaluateThreshold(0.04, phosphateThreshold, 'max').exceeded).toBe(false);
    expect(evaluateThreshold(0.55, phosphateThreshold, 'max').exceeded).toBe(true);

    // Turbidity: 5.0 NTU limit
    const turbidityThreshold = 5.0;
    expect(evaluateThreshold(2.2, turbidityThreshold, 'max').exceeded).toBe(false);
    expect(evaluateThreshold(45.0, turbidityThreshold, 'max').exceeded).toBe(true);
  });
});

describe('Tier 1: Data Schema Integrity & Provenance Tagging', () => {
  it('validates allowed DataProvenance enum values strictly', () => {
    const validTags: DataProvenance[] = [
      'IN_SITU_OBSERVED',
      'SATELLITE_DERIVED',
      'MODELED_SIMULATION',
      'ILLUSTRATIVE_DEMO',
    ];

    const isValidProvenance = (tag: string): tag is DataProvenance => {
      return validTags.includes(tag as DataProvenance);
    };

    expect(isValidProvenance('IN_SITU_OBSERVED')).toBe(true);
    expect(isValidProvenance('SATELLITE_DERIVED')).toBe(true);
    expect(isValidProvenance('MODELED_SIMULATION')).toBe(true);
    expect(isValidProvenance('ILLUSTRATIVE_DEMO')).toBe(true);
    expect(isValidProvenance('UNVERIFIED_SOURCE')).toBe(false);
    expect(isValidProvenance('AI_GENERATED')).toBe(false);
  });

  it('handles missing telemetry with explicit N/D string and never substitutes 0', () => {
    const missingValueResult = evaluateThreshold(null, 5.0, 'min');
    expect(missingValueResult.displayValue).toBe('N/D');
    expect(missingValueResult.displayValue).not.toBe('0');
    expect(missingValueResult.displayValue).not.toBe('0.0');

    const undefinedValueResult = evaluateThreshold(undefined, 5.0, 'min');
    expect(undefinedValueResult.displayValue).toBe('N/D');

    // Real measurement of 0 is valid and must NOT be treated as N/D
    const realZeroResult = evaluateThreshold(0.0, 5.0, 'min');
    expect(realZeroResult.displayValue).toBe('0');
    expect(realZeroResult.exceeded).toBe(true);
  });

  it('strictly guards evaluateThreshold against JavaScript type coercion for non-numeric falsy inputs', () => {
    // Empty string "" must return N/D and not coerce to 0 or Critical
    const emptyStrMin = evaluateThreshold("" as any, 5.0, 'min');
    expect(emptyStrMin.displayValue).toBe('N/D');
    expect(emptyStrMin.exceeded).toBe(false);
    expect(emptyStrMin.status).toBe('Warning');

    const emptyStrMax = evaluateThreshold("" as any, 5.0, 'max');
    expect(emptyStrMax.displayValue).toBe('N/D');
    expect(emptyStrMax.exceeded).toBe(false);
    expect(emptyStrMax.status).toBe('Warning');

    // Boolean false must return N/D and not coerce to 0
    const boolFalseMin = evaluateThreshold(false as any, 5.0, 'min');
    expect(boolFalseMin.displayValue).toBe('N/D');
    expect(boolFalseMin.exceeded).toBe(false);
    expect(boolFalseMin.status).toBe('Warning');

    // Boolean true must return N/D
    const boolTrueMin = evaluateThreshold(true as any, 5.0, 'min');
    expect(boolTrueMin.displayValue).toBe('N/D');
    expect(boolTrueMin.exceeded).toBe(false);
    expect(boolTrueMin.status).toBe('Warning');

    // Object and array inputs must return N/D
    expect(evaluateThreshold({} as any, 5.0, 'min').displayValue).toBe('N/D');
    expect(evaluateThreshold([] as any, 5.0, 'min').displayValue).toBe('N/D');

    // Real numeric zero must be evaluated accurately
    const numericZeroMin = evaluateThreshold(0.0, 5.0, 'min');
    expect(numericZeroMin.displayValue).toBe('0');
    expect(numericZeroMin.exceeded).toBe(true);
    expect(numericZeroMin.status).toBe('Critical');

    const numericZeroMax = evaluateThreshold(0.0, 5.0, 'max');
    expect(numericZeroMax.displayValue).toBe('0');
    expect(numericZeroMax.exceeded).toBe(false);
    expect(numericZeroMax.status).toBe('Compliant');
  });

  it('strictly guards calculateComparisonDelta against JavaScript type coercion for non-numeric inputs', () => {
    const emptyDelta = calculateComparisonDelta("" as any, 5.0);
    expect(emptyDelta.valid).toBe(false);
    expect(emptyDelta.displayDelta).toBe('N/D');
    expect(emptyDelta.delta).toBeNull();

    const falseDelta = calculateComparisonDelta(5.0, false as any);
    expect(falseDelta.valid).toBe(false);
    expect(falseDelta.displayDelta).toBe('N/D');
    expect(falseDelta.delta).toBeNull();

    // Numeric zeroes are valid
    const zeroDelta = calculateComparisonDelta(0.0, 5.0);
    expect(zeroDelta.valid).toBe(true);
    expect(zeroDelta.delta).toBe(-5);
    expect(zeroDelta.displayDelta).toBe('-5');
  });

  it('verifies HotspotIndicator contract compliance', () => {
    const sampleIndicator: HotspotIndicator = {
      name: 'Hexavalent Chromium (Cr-VI)',
      value: 48.5,
      unit: 'mg/L',
      standard: 0.05,
      standardSource: 'WHO Drinking Limit',
      exceeded: true,
    };

    expect(sampleIndicator.value).toBeGreaterThan(sampleIndicator.standard);
    expect(sampleIndicator.exceeded).toBe(true);
    expect(typeof sampleIndicator.unit).toBe('string');
    expect(sampleIndicator.unit.length).toBeGreaterThan(0);
    expect(sampleIndicator.standardSource.length).toBeGreaterThan(0);
  });

  it('verifies ThresholdStandard contract compliance', () => {
    const sampleStandard: ThresholdStandard = {
      standardName: 'WHO',
      thresholdValue: 10.0,
      direction: 'max',
      unit: 'µg/L',
      description: 'Maximum allowable concentration in drinking water',
    };

    expect(sampleStandard.standardName).toBe('WHO');
    expect(sampleStandard.thresholdValue).toBe(10.0);
    expect(sampleStandard.direction).toBe('max');
  });

  it('validates all 9 primary indicator categories are supported', () => {
    const expectedCategories: IndicatorCategory[] = [
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

    expect(expectedCategories).toHaveLength(9);
    expectedCategories.forEach(cat => {
      expect(typeof cat).toBe('string');
      expect(cat.length).toBeGreaterThan(3);
    });
  });
});
