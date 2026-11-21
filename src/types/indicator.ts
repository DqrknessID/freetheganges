export type IndicatorCategory =
  | 'Water Quality'
  | 'Heavy Metals'
  | 'Industrial Pollution'
  | 'Agricultural Runoff'
  | 'Air Pollution'
  | 'Soil Contamination'
  | 'Biodiversity'
  | 'Delta Ecosystem'
  | 'Human Exposure';

export interface ThresholdStandard {
  standardName: 'WHO' | 'CPCB Class A' | 'CPCB Class B' | 'CPCB Class C' | 'CPCB Class D' | 'CPCB Class E' | 'Bangladesh ECR';
  thresholdValue: number;
  direction: 'max' | 'min'; // 'max': exceeding is bad; 'min': below is bad (e.g. DO)
  unit: string;
  description?: string;
}

export interface TimeSeriesPoint {
  date: string; // "YYYY-MM" or "YYYY-MM-DD"
  value: number;
  locationId: string;
  locationName: string;
  status: 'Compliant' | 'Warning' | 'Critical';
}

export interface ParameterMetadata {
  id: string;
  name: string;
  category: IndicatorCategory;
  unit: string;
  description: string;
  whoGuideline?: number;
  whoGuidelineDisplay?: string;
  cpcbStandard?: {
    standardClass: string;
    value: number;
    direction: 'max' | 'min';
  };
  cpcbStandardDisplay?: string;
  bangladeshStandard?: {
    value: number;
    direction: 'max' | 'min';
  };
  ecrStandardDisplay?: string;
  criticalDangerThreshold: number;
  direction: 'max' | 'min';
}

export interface MonitoringStation {
  id: string;
  name: string;
  selectValue: string;
  reach: string;
  jurisdiction: 'India' | 'Bangladesh';
  coordinates: [number, number]; // [lat, lng] strictly 20-32 N, 73-98 E
  provider: string;
  description: string;
}

export interface IndicatorObservation {
  id: string;
  date: string;
  stationId: string;
  stationName: string;
  parameterId: string;
  parameterName: string;
  category: IndicatorCategory;
  value: number;
  unit: string;
  statutoryLimit: number;
  standardName: 'WHO' | 'CPCB' | 'ECR';
  status: 'Compliant' | 'Warning' | 'Critical';
  provenance: 'IN_SITU_OBSERVED' | 'SATELLITE_DERIVED' | 'MODELED_SIMULATION' | 'ILLUSTRATIVE_DEMO';
}

export interface ChartDataPoint {
  date: string;
  rawDate: string;
  primaryValue: number;
  secondaryValue: number;
  thresholdLimit?: number;
}

export interface MultiLocationComparisonData {
  parameterId: string;
  parameterName: string;
  unit: string;
  primaryLocation: {
    id: string;
    name: string;
    currentValue: number;
    status: 'Compliant' | 'Warning' | 'Critical';
  };
  secondaryLocation: {
    id: string;
    name: string;
    currentValue: number;
    status: 'Compliant' | 'Warning' | 'Critical';
  };
  delta: number;
  standardThreshold: number;
  standardLabel: string;
}
