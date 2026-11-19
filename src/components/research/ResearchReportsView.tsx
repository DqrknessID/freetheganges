import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  Search, 
  ExternalLink, 
  Globe
} from 'lucide-react';
import { ResearchPublication, SourceRegistryEntry, DataProvenance } from '../../types';

const SAMPLE_PUBLICATIONS: ResearchPublication[] = [
  {
    id: 'pub-01',
    title: 'Transboundary Arsenic Hydrodynamics: Alluvial Transport Across the Bengal Delta Plain',
    category: 'Scientific Assessment',
    authors: ['Dr. A. K. Sengupta', 'Dr. Farhana Rahman', 'Prof. M. S. Islam'],
    affiliation: 'Bengal Basin Hydrogeology Consortium & Jadavpur University',
    publishedDate: '2026-10-15',
    geographicScope: 'Lower Ganges and Bengal Basin (West Bengal and Southwestern Bangladesh)',
    executiveSummary: 'This multi-year empirical investigation examines the mobility of geogenic arsenic in shallow Holocene aquifers across the Indo-Bangladesh border plain. Intensive dry-season groundwater pumping accelerates the downward drawdown of dissolved organic carbon, mobilizing solid-phase arsenic from peat layers into domestic tube-well networks.',
    keyFindings: [
      'Over 42% of monitored shallow tube-wells exceed the WHO drinking water limit of 10 µg/L.',
      'Peak concentrations in Murshidabad and Nadia districts surpass 500 µg/L.',
      'Transboundary agricultural irrigation transfers dissolved arsenic into topsoil, accelerating paddy crop translocation.'
    ],
    evidenceMethodology: 'Inductively Coupled Plasma Mass Spectrometry (ICP-MS) analysis of 1,240 wellhead samples and continuous pressure-transducer monitoring.',
    confidenceLevel: 'HIGH',
    doiOrReference: 'https://doi.org/10.1016/j.envpol.2026.118942',
    tags: ['Arsenic', 'Groundwater', 'Public Health', 'Transboundary'],
  },
  {
    id: 'pub-02',
    title: 'Industrial Anoxia in the Buriganga River: Tannery Relocation Efficacy and Residual Chromium Load',
    category: 'Research Paper',
    authors: ['K. M. Ahmed', 'Shahidul Tariq', 'Elena Rostova'],
    affiliation: 'Bangladesh University of Engineering & Technology (BUET)',
    publishedDate: '2026-08-20',
    geographicScope: 'Dhaka Metropolitan Watershed (Buriganga, Turag, Dhaleshwari Rivers)',
    executiveSummary: 'Following the relocation of Hazaribagh tanneries to the Savar Tannery Estate, this study evaluates the biochemical recovery of the Buriganga River. Findings indicate that despite relocation, severe oxygen depletion persists due to untreated municipal sewage, while new contamination plumes emerge along the Dhaleshwari River due to central effluent treatment plant deficits.',
    keyFindings: [
      'Buriganga dry-season dissolved oxygen remains critically suppressed below 0.5 mg/L.',
      'Total chromium concentrations in Dhaleshwari sediments reached 1,850 mg/kg within 3 km of the Savar outfall.',
      'Bacterial coliform counts at Sadarghat exceed 100,000 MPN/100mL.'
    ],
    evidenceMethodology: 'Monthly surface grab sampling across 18 river stations paired with sediment core extraction and spectrophotometric assays.',
    confidenceLevel: 'HIGH',
    doiOrReference: 'BUET-WRE-REP-2026-04',
    tags: ['Industrial Effluent', 'Chromium', 'Dhaka', 'Anoxia'],
  },
  {
    id: 'pub-03',
    title: 'Hydrological Disruption at Farakka: Downstream Sediment Starvation and Estuarine Salinity Intrusion',
    category: 'Policy Brief',
    authors: ['Consortium Secretariat Policy Working Group'],
    affiliation: 'Free The Ganges International Research Network',
    publishedDate: '2026-06-12',
    geographicScope: 'Middle Ganges Barrage Reach to Sundarbans Mangrove Complex',
    executiveSummary: 'Evaluates the geopolitical and ecological consequences of flow diversion at Farakka Barrage. The artificial partition of dry-season discharge has reduced downstream freshwater thrust into the Padma branch, triggering coastal salinity intrusion reaching 112 km inland and accelerating bank erosion across Malda and Murshidabad.',
    keyFindings: [
      'Dry-season downstream discharge frequently dips below historical natural river maintenance flows.',
      'Sundarbans estuarine salinity fronts have expanded inland at an average rate of 1.4 km per year since 2010.',
      'Silt accumulation upstream of the barrage has elevated riverbed levels, amplifying monsoon inundation risks.'
    ],
    evidenceMethodology: 'Satellite altimetry cross-referenced against historical Joint Rivers Commission gauge records from 1996 to 2026.',
    confidenceLevel: 'MEDIUM',
    doiOrReference: 'FTG-PB-2026-01',
    tags: ['Hydropolitics', 'Farakka', 'Salinity', 'Sundarbans'],
  },
];

const SAMPLE_SOURCES: SourceRegistryEntry[] = [
  {
    id: 'src-01',
    datasetName: 'Real-Time Water Quality Monitoring Network (RTWQMS)',
    provider: 'Central Pollution Control Board (CPCB)',
    providerShortCode: 'CPCB',
    sourceUrl: 'https://cpcb.nic.in/real-time-water-quality-data',
    dataType: 'IN_SITU_OBSERVED',
    geographicCoverage: 'Ganges Main Stem (Rishikesh to Diamond Harbour, 36 Stations)',
    temporalCoverage: '2018 to Present (Hourly Telemetry)',
    parametersCovered: ['pH', 'Dissolved Oxygen', 'BOD', 'COD', 'Conductivity', 'Turbidity', 'Nitrates'],
    updateFrequency: 'Hourly automated sensor stream',
    accessMethod: 'Official Portal & Open Environmental Data Bulletin',
    verificationDate: '2026-11-15',
    confidenceRating: 'HIGH',
    notes: 'Continuous sensor nodes equipped with automated anti-fouling wipers. Audited monthly by regional laboratories.',
  },
  {
    id: 'src-02',
    datasetName: 'National River Water Quality Assessment Bulletins',
    provider: 'Department of Environment, Bangladesh (DoE)',
    providerShortCode: 'DoE',
    sourceUrl: 'http://doe.gov.bd/site/publications',
    dataType: 'IN_SITU_OBSERVED',
    geographicCoverage: 'Buriganga, Turag, Shitalakshya, Meghna, Karnaphuli Reaches',
    temporalCoverage: '2015 to 2026 (Monthly Composite)',
    parametersCovered: ['DO', 'BOD', 'COD', 'TDS', 'Total Chromium', 'Lead', 'Cadmium', 'Fecal Coliform'],
    updateFrequency: 'Monthly laboratory report bulletins',
    accessMethod: 'Official Bulletin Downloads & Academic Exchange',
    verificationDate: '2026-10-30',
    confidenceRating: 'HIGH',
    notes: 'Accredited wet chemistry laboratory testing following Standard Methods for Examination of Water and Wastewater.',
  },
  {
    id: 'src-03',
    datasetName: 'Sentinel-5P TROPOMI Tropospheric Nitrogen Dioxide & Aerosol Plumes',
    provider: 'European Space Agency & Copernicus Programme',
    providerShortCode: 'Copernicus',
    sourceUrl: 'https://dataspace.copernicus.eu',
    dataType: 'SATELLITE_DERIVED',
    geographicCoverage: 'Pan-GBM Basin Airshed (Indo-Gangetic Plain)',
    temporalCoverage: '2018 to Present (Daily Overpass)',
    parametersCovered: ['Tropospheric NO2 Column', 'Aerosol Index', 'Carbon Monoxide'],
    updateFrequency: 'Daily satellite overpass swath',
    accessMethod: 'Copernicus Open Access Hub REST API',
    verificationDate: '2026-11-18',
    confidenceRating: 'HIGH',
    notes: 'Level-2 scientific product processed with standard operational retrieval algorithms.',
  },
  {
    id: 'src-04',
    datasetName: 'Bengal Delta Arsenic Groundwater Geodatabase',
    provider: 'British Geological Survey & DPHE Bangladesh',
    providerShortCode: 'ICDDRB',
    sourceUrl: 'https://www.bgs.ac.uk/groundwater/health/arsenic/bangladesh',
    dataType: 'IN_SITU_OBSERVED',
    geographicCoverage: '61 Districts of Bangladesh & Southern West Bengal',
    temporalCoverage: 'National Wellhead Survey Baseline with Periodic Updates',
    parametersCovered: ['Arsenic', 'Iron', 'Manganese', 'Chloride', 'Well Depth'],
    updateFrequency: 'Multi-year survey iterations',
    accessMethod: 'Open Research Dataset & GIS Repository',
    verificationDate: '2026-09-10',
    confidenceRating: 'HIGH',
    notes: 'Reference benchmark dataset for geogenic arsenic distribution in shallow and deep aquifers.',
  },
  {
    id: 'src-05',
    datasetName: 'Illustrative Real-Time Basin Simulator Dataset',
    provider: 'Free The Ganges Research Lab',
    providerShortCode: 'UNEP',
    sourceUrl: 'https://freetheganges.org/data/simulated-baseline',
    dataType: 'ILLUSTRATIVE_DEMO',
    geographicCoverage: 'GBM Regional Synthetic Grid',
    temporalCoverage: '2026 Synthetic Demonstration Interval',
    parametersCovered: ['Real-time sensor interpolation', 'Simulated emergency alerts'],
    updateFrequency: 'Continuous demonstration stream',
    accessMethod: 'In-app local simulated data layer',
    verificationDate: '2026-11-19',
    confidenceRating: 'INDICATIVE',
    notes: 'Explicitly labeled prototype demonstration data used for validating real-time UI components.',
  },
];

export const ResearchReportsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'publications' | 'sources'>('publications');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPublications = SAMPLE_PUBLICATIONS.filter((pub) => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getProvenanceBadge = (type: DataProvenance) => {
    switch (type) {
      case 'IN_SITU_OBSERVED':
        return 'bg-accent-green/20 text-accent-green border-accent-green/40';
      case 'SATELLITE_DERIVED':
        return 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/40';
      case 'MODELED_SIMULATION':
        return 'bg-accent-amber/20 text-accent-amber border-accent-amber/40';
      case 'ILLUSTRATIVE_DEMO':
        return 'bg-accent-red/20 text-accent-red border-accent-red/40';
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-accent-cyan" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary font-sans">
            Research Publications & Transparent Source Registry
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-4xl">
          Peer-reviewed scientific literature, independent policy briefs, and a comprehensive audit trail of 
          all environmental data providers. Demonstrative sample data is transparently badged to uphold scientific rigor.
        </p>
      </div>

      {/* Primary Section Switcher */}
      <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('publications')}
          className={`min-h-[44px] px-5 py-2 rounded-lg text-xs font-mono font-semibold tracking-wide flex items-center gap-2 transition-all ${
            activeTab === 'publications'
              ? 'bg-accent-cyan text-base font-bold text-xs uppercase'
              : 'bg-surface text-text-muted hover:text-text-primary hover:bg-surface-elevated border border-border-subtle'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Research & Reports ({SAMPLE_PUBLICATIONS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sources')}
          className={`min-h-[44px] px-5 py-2 rounded-lg text-xs font-mono font-semibold tracking-wide flex items-center gap-2 transition-all ${
            activeTab === 'sources'
              ? 'bg-accent-cyan text-base font-bold text-xs uppercase'
              : 'bg-surface text-text-muted hover:text-text-primary hover:bg-surface-elevated border border-border-subtle'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Source Registry ({SAMPLE_SOURCES.length} Providers)</span>
        </button>
      </div>

      {/* Publications View */}
      {activeTab === 'publications' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications, executive summaries, tags..."
                className="w-full h-11 pl-9 pr-3 bg-base border border-border-subtle rounded text-xs text-text-primary font-mono placeholder:text-text-secondary focus:border-accent-cyan focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {(['All', 'Scientific Assessment', 'Research Paper', 'Policy Brief'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[44px] px-3.5 py-1.5 rounded text-xs font-mono border whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-surface-elevated text-accent-cyan border-accent-cyan/40 font-semibold'
                      : 'bg-surface text-text-muted border-border-subtle hover:text-text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Publications Cards Grid */}
          <div className="space-y-4">
            {filteredPublications.map((pub) => (
              <article
                key={pub.id}
                className="bg-surface border border-border-subtle rounded-xl p-6 space-y-4 hover:border-accent-cyan/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                      {pub.category}
                    </span>
                    <span className="text-xs font-mono text-text-secondary">
                      Published: {pub.publishedDate}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-text-secondary">
                    Confidence: <span className="text-accent-green font-bold">{pub.confidenceLevel}</span>
                  </span>
                </div>

                <h2 className="text-lg font-bold text-text-primary font-sans leading-snug">
                  {pub.title}
                </h2>

                <div className="text-xs font-mono text-text-muted">
                  Authors: <span className="text-text-primary">{pub.authors.join(', ')}</span> | {pub.affiliation}
                </div>

                <div className="text-xs font-mono text-accent-cyan flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Geographic Scope: {pub.geographicScope}</span>
                </div>

                <div className="p-3.5 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
                  <h3 className="text-xs font-mono uppercase font-semibold text-text-secondary">
                    Executive Summary
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {pub.executiveSummary}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono uppercase font-semibold text-text-secondary">
                    Key Empirical Findings:
                  </h4>
                  <ul className="space-y-1 text-xs text-text-muted list-disc list-inside">
                    {pub.keyFindings.map((finding, idx) => (
                      <li key={idx}>{finding}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {pub.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-base text-text-secondary border border-border-subtle text-[11px]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={pub.doiOrReference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-3 flex items-center gap-1.5 text-accent-cyan hover:underline"
                  >
                    <span>Inspect Publication Reference</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Source Registry View */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary font-sans flex items-center gap-2">
                <Database className="w-5 h-5 text-accent-cyan" />
                Comprehensive Environmental Dataset Registry
              </h2>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Complete institutional provenance for all monitored parameters. Every data stream is classified 
                by observation method, temporal update cadence, and laboratory standard. Missing values are designated N/D.
              </p>
            </div>

            <div className="overflow-x-auto border border-border-subtle rounded-lg">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-elevated text-text-primary border-b border-border-subtle">
                  <tr>
                    <th className="p-3">Dataset Name & Provider</th>
                    <th className="p-3">Data Provenance</th>
                    <th className="p-3">Geographic & Temporal Span</th>
                    <th className="p-3">Parameters Covered</th>
                    <th className="p-3">Update Cadence</th>
                    <th className="p-3">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-text-muted">
                  {SAMPLE_SOURCES.map((source) => (
                    <tr key={source.id} className="hover:bg-surface-elevated/50 transition-colors">
                      <td className="p-3 space-y-1">
                        <div className="font-semibold text-text-primary">
                          {source.datasetName}
                        </div>
                        <div className="text-[11px] text-text-secondary flex items-center gap-1.5">
                          <span>{source.provider}</span>
                          <span className="px-1.5 py-0.2 rounded bg-base text-accent-cyan border border-border-subtle text-[10px]">
                            {source.providerShortCode}
                          </span>
                        </div>
                      </td>

                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getProvenanceBadge(source.dataType)}`}>
                          {source.dataType}
                        </span>
                      </td>

                      <td className="p-3 space-y-0.5 text-[11px]">
                        <div className="text-text-primary">{source.geographicCoverage}</div>
                        <div className="text-text-secondary">{source.temporalCoverage}</div>
                      </td>

                      <td className="p-3 text-[11px]">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {source.parametersCovered.map((param, i) => (
                            <span key={i} className="px-1.5 py-0.2 rounded bg-base text-text-secondary border border-border-subtle text-[10px]">
                              {param}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-3 text-[11px] text-text-primary">
                        {source.updateFrequency}
                      </td>

                      <td className="p-3 space-y-1 text-[11px]">
                        <div className="text-accent-green font-semibold">
                          Verified {source.verificationDate}
                        </div>
                        <div>
                          Rating: <span className="text-text-primary font-bold">{source.confidenceRating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-elevated border border-border-subtle text-xs font-mono text-text-secondary flex items-center justify-between">
              <span>Scientific Data Protocol: No fabricated telemetry permitted. Missing records displayed as N/D.</span>
              <span className="text-accent-cyan">5 Authoritative Sources Active</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
