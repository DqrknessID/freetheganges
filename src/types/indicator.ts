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
  cpcbStandard?: {
    standardClass: string;
    value: number;
    direction: 'max' | 'min';
  };
  bangladeshStandard?: {
    value: number;
    direction: 'max' | 'min';
  };
  criticalDangerThreshold: number;
  direction: 'max' | 'min';
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
