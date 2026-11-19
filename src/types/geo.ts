export interface BoundingBox {
  latMin: number; // 20.0
  latMax: number; // 32.0
  lngMin: number; // 73.0
  lngMax: number; // 98.0
}

export const GBM_BOUNDING_BOX: BoundingBox = {
  latMin: 20.0,
  latMax: 32.0,
  lngMin: 73.0,
  lngMax: 98.0,
};

export type SeverityTier = 'Critical' | 'High' | 'Moderate' | 'Monitored';
export type RiverSystem = 'Ganges' | 'Brahmaputra' | 'Meghna' | 'Tributary' | 'Transboundary';
export type BasinCountry = 'India' | 'Bangladesh' | 'Transboundary';

export interface RiverPath {
  id: string;
  name: string;
  system: RiverSystem;
  coordinates: [number, number][]; // [latitude, longitude]
  color: string;
  width: number;
  description: string;
  lengthKm?: number;
  dischargeM3s?: number;
}

export interface HotspotIndicator {
  name: string;
  value: number;
  unit: string;
  standard: number;
  standardSource: string;
  exceeded: boolean;
}

export interface HotspotLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  country: 'India' | 'Bangladesh';
  coordinates: [number, number]; // [latitude, longitude]
  category: string;
  severity: SeverityTier;
  trajectory: 'Worsening' | 'Improving' | 'Unchanging' | 'Developing';
  primaryPollutants: string[];
  dischargeMld?: number;
  indicators: HotspotIndicator[];
  context: string;
  sources: string[];
  confidenceScore: number; // 0-100
  affectedPopulation?: number;
  keyDrivers?: string;
}

export interface IndustrialFacility {
  id: string;
  name: string;
  sector: 'Tannery' | 'Textile & Dyeing' | 'Thermal Power' | 'Fertilizer' | 'Pulp & Paper' | 'Sugar & Distillery' | 'Petrochemical';
  clusterName: string;
  country: 'India' | 'Bangladesh';
  state: string;
  coordinates: [number, number]; // [latitude, longitude]
  complianceStatus: 'Non-Compliant' | 'Warning Notice' | 'Partially Compliant' | 'Under Review';
  keyChemicals: string[];
  treatmentFacility: string;
  confidenceScore: number;
  dataSource: string;
}

export interface WaterQualityStation {
  id: string;
  stationName: string;
  river: string;
  location: string;
  country: 'India' | 'Bangladesh';
  coordinates: [number, number]; // [latitude, longitude]
  operatingAgency: 'CPCB' | 'BWDB' | 'DoE Bangladesh' | 'SPCB' | 'CGWB' | 'Academic';
  primaryContaminant: string;
  measuredValue: number;
  unit: string;
  standardLimit: number;
  exceedanceMultiplier: number;
  sampleType: 'Real-Time Telemetry' | 'Laboratory Grab Sample' | 'Multi-Year Composite';
  dateSampled: string;
  confidenceScore: number;
}

export interface EcologicalZone {
  id: string;
  name: string;
  category: 'Mangrove Delta' | 'Ramsar Wetland' | 'Haor Basin' | 'Dolphin Sanctuary' | 'Alluvial Floodplain';
  coordinatesCentroid: [number, number]; // [latitude, longitude]
  areaSqKm: number;
  protectionStatus: string;
  threatTier: SeverityTier;
  keySpecies: string[];
  primaryThreats: string[];
  sourceReference: string;
}
