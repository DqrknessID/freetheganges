export type DataProvenance = 'IN_SITU_OBSERVED' | 'SATELLITE_DERIVED' | 'MODELED_SIMULATION' | 'ILLUSTRATIVE_DEMO';
export type ProvenanceTier = 'Tier 1' | 'Tier 2' | 'Tier 3';

export interface ResearchPublication {
  id: string;
  title: string;
  category: 'Research Paper' | 'Policy Brief' | 'Scientific Assessment' | 'Monitoring Update';
  authors: string[];
  affiliation: string;
  publishedDate: string;
  geographicScope: string;
  executiveSummary: string;
  keyFindings: string[];
  evidenceMethodology: string;
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'INDICATIVE';
  doiOrReference: string;
  tags: string[];
  downloadUrl?: string;
}

export interface SourceRegistryEntry {
  id: string;
  datasetName: string;
  provider: string;
  providerShortCode: 'CPCB' | 'UNEP' | 'WHO' | 'BWDB' | 'DoE' | 'NASA' | 'Copernicus' | 'ICDDRB';
  sourceUrl: string;
  dataType: DataProvenance;
  provenanceTier?: ProvenanceTier;
  geographicCoverage: string;
  temporalCoverage: string;
  parametersCovered: string[];
  updateFrequency: string;
  accessMethod: string;
  verificationDate: string;
  confidenceRating: 'HIGH' | 'MEDIUM' | 'INDICATIVE';
  notes?: string;
  licenseOrTerms?: string;
  knownLimitations?: string;
}
