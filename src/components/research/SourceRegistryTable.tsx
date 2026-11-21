import React, { useState } from 'react';
import { Database, Search, ExternalLink, Filter } from 'lucide-react';
import { SourceRegistryEntry, DataProvenance } from '../../types';
import { ProvenanceBadge } from './ProvenanceBadge';

interface SourceRegistryTableProps {
  sources: SourceRegistryEntry[];
}

export const SourceRegistryTable: React.FC<SourceRegistryTableProps> = ({ sources }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [selectedProvenance, setSelectedProvenance] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');

  const providers = ['All', 'CPCB', 'DoE', 'Copernicus', 'BWDB', 'WHO', 'UNEP', 'NASA', 'ICDDRB'];
  const tiers = ['All', 'Tier 1', 'Tier 2', 'Tier 3'];
  const provenanceOptions = [
    { value: 'All', label: 'All Provenance' },
    { value: 'IN_SITU_OBSERVED', label: 'In-Situ Field Sensor' },
    { value: 'SATELLITE_DERIVED', label: 'Satellite Earth Observation' },
    { value: 'MODELED_SIMULATION', label: 'Numerical Simulation Model' },
    { value: 'ILLUSTRATIVE_DEMO', label: 'Prototype Demonstration' },
  ];

  const filteredSources = sources.filter((source) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      q === '' ||
      source.datasetName.toLowerCase().includes(q) ||
      source.provider.toLowerCase().includes(q) ||
      source.providerShortCode.toLowerCase().includes(q) ||
      source.geographicCoverage.toLowerCase().includes(q) ||
      (source.provenanceTier && source.provenanceTier.toLowerCase().includes(q)) ||
      source.parametersCovered.some((p) => p.toLowerCase().includes(q));

    const matchesProvider = selectedProvider === 'All' || source.providerShortCode === selectedProvider;
    const matchesProvenance = selectedProvenance === 'All' || source.dataType === selectedProvenance;
    const matchesTier = selectedTier === 'All' || source.provenanceTier === selectedTier;

    return matchesSearch && matchesProvider && matchesProvenance && matchesTier;
  });

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-5">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-accent-cyan" />
            Comprehensive Environmental Dataset Registry
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
            Complete institutional provenance for all monitored parameters. Every data stream is classified 
            by observation method, temporal update cadence, and laboratory standard. Missing values are designated N/D.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets, providers, parameters..."
              className="w-full h-11 pl-9 pr-3 bg-base border border-border-subtle rounded-lg text-xs sm:text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-cyan focus:outline-none"
            />
          </div>

          {/* Provider and Provenance Filter Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Filter className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Provider:</span>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="h-11 px-3 bg-base border border-border-subtle rounded-lg text-xs text-text-primary focus:border-accent-cyan focus:outline-none"
                aria-label="Filter by provider"
              >
                {providers.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <span>Provenance:</span>
              <select
                value={selectedProvenance}
                onChange={(e) => setSelectedProvenance(e.target.value)}
                className="h-11 px-3 bg-base border border-border-subtle rounded-lg text-xs text-text-primary focus:border-accent-cyan focus:outline-none"
                aria-label="Filter by provenance"
              >
                {provenanceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <span>Tier:</span>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="h-11 px-3 bg-base border border-border-subtle rounded-lg text-xs text-text-primary focus:border-accent-cyan focus:outline-none"
                aria-label="Filter by tier"
              >
                {tiers.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Tiers' : t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sources Data Table */}
        <div className="overflow-x-auto border border-border-subtle rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-elevated text-text-primary border-b border-border-subtle">
              <tr>
                <th className="p-3">Dataset Name & Provider</th>
                <th className="p-3">Provenance Tier</th>
                <th className="p-3">Data Provenance</th>
                <th className="p-3">Geographic & Temporal Span</th>
                <th className="p-3">Parameters Covered</th>
                <th className="p-3">Update Cadence</th>
                <th className="p-3">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-secondary">
              {filteredSources.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-text-secondary">
                    No registry datasets match the selected search or provider filter.
                  </td>
                </tr>
              ) : (
                filteredSources.map((source) => (
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
                      {source.sourceUrl && (
                        <a
                          href={source.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] inline-flex items-center gap-1 text-[11px] text-accent-cyan hover:underline pt-0.5"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>

                    <td className="p-3">
                      {source.provenanceTier ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${
                          source.provenanceTier === 'Tier 1'
                            ? 'bg-accent-green/20 text-accent-green border-accent-green/40'
                            : source.provenanceTier === 'Tier 2'
                            ? 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/40'
                            : 'bg-accent-amber/20 text-accent-amber border-accent-amber/40'
                        }`}>
                          {source.provenanceTier}
                        </span>
                      ) : (
                        <span className="text-text-secondary">N/D</span>
                      )}
                    </td>

                    <td className="p-3">
                      <ProvenanceBadge type={source.dataType as DataProvenance} showDisclaimer={true} />
                    </td>

                    <td className="p-3 space-y-0.5 text-[11px]">
                      <div className="text-text-primary">{source.geographicCoverage || 'N/D'}</div>
                      <div className="text-text-secondary">{source.temporalCoverage || 'N/D'}</div>
                    </td>

                    <td className="p-3 text-[11px]">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {source.parametersCovered && source.parametersCovered.length > 0 ? (
                          source.parametersCovered.map((param, i) => (
                            <span key={i} className="px-1.5 py-0.2 rounded bg-base text-text-secondary border border-border-subtle text-[10px]">
                              {param}
                            </span>
                          ))
                        ) : (
                          <span className="text-text-secondary">N/D</span>
                        )}
                      </div>
                    </td>

                    <td className="p-3 text-[11px] text-text-primary">
                      {source.updateFrequency || 'N/D'}
                    </td>

                    <td className="p-3 space-y-1 text-[11px]">
                      <div className="text-accent-green font-semibold">
                        Verified {source.verificationDate || 'N/D'}
                      </div>
                      <div>
                        Rating: <span className="text-text-primary font-bold">{source.confidenceRating || 'N/D'}</span>
                      </div>
                      {source.licenseOrTerms && (
                        <div className="text-[10px] text-text-secondary truncate max-w-[160px]" title={source.licenseOrTerms}>
                          Terms: {source.licenseOrTerms}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Audit Statement Footer */}
        <div className="p-3.5 rounded-lg bg-surface-elevated border border-border-subtle text-xs text-text-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Scientific Data Protocol: No fabricated telemetry permitted. Missing records displayed as N/D.</span>
          <span className="text-accent-cyan font-semibold">
            {filteredSources.length} Authoritative Sources Active
          </span>
        </div>
      </div>
    </div>
  );
};
