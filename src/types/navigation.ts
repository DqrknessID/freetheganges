export type ActiveView = 'overview' | 'atlas' | 'indicators' | 'research' | 'about';

export interface NavItem {
  id: ActiveView;
  label: string;
  description: string;
  badge?: string;
}

export interface AlertItem {
  id: string;
  timestamp: string;
  category: 'Critical Alert' | 'Discharge Notice' | 'Hydrological Advisory' | 'Monitoring Update';
  location: string;
  headline: string;
  severity: 'Critical' | 'Warning' | 'Info';
  source: string;
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'River' | 'Hotspot' | 'Industrial' | 'Station' | 'Publication' | 'Indicator';
  viewTarget: ActiveView;
  targetId?: string;
  coordinates?: [number, number];
}

export interface BasinMetricSummary {
  id: string;
  domain: string;
  parameter: string;
  measurement: string;
  unit: string;
  coverage: string;
  date: string;
  source: string;
  confidenceScore: number;
  status: 'Critical' | 'Warning' | 'Compliant';
  trend: 'Worsening' | 'Improving' | 'Stable';
  context: string;
}
