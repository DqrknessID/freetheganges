import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Database,
  Satellite,
  Radio,
  Cpu,
} from 'lucide-react';
import { IndicatorObservation } from '../../types';

interface ScientificDataTableProps {
  observations: IndicatorObservation[];
}

type SortField = 'date' | 'stationName' | 'parameterName' | 'value' | 'status';
type SortOrder = 'asc' | 'desc';

export const ScientificDataTable: React.FC<ScientificDataTableProps> = ({ observations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Compliant' | 'Warning' | 'Critical'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Extract unique categories for filter
  const uniqueCategories = useMemo(() => {
    const cats = new Set(observations.map((o) => o.category));
    return ['All', ...Array.from(cats)];
  }, [observations]);

  // Filter observations
  const filteredObservations = useMemo(() => {
    return observations.filter((obs) => {
      // Free text search
      const matchesSearch =
        searchQuery === '' ||
        obs.stationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.parameterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.date.includes(searchQuery);

      // Status filter
      const matchesStatus = statusFilter === 'All' || obs.status === statusFilter;

      // Category filter
      const matchesCategory = categoryFilter === 'All' || obs.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [observations, searchQuery, statusFilter, categoryFilter]);

  // Sort observations
  const sortedObservations = useMemo(() => {
    const sorted = [...filteredObservations];
    sorted.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredObservations, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedObservations.length / rowsPerPage));
  const paginatedObservations = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedObservations.slice(start, start + rowsPerPage);
  }, [sortedObservations, currentPage, rowsPerPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-text-secondary opacity-50" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-accent-cyan" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-accent-cyan" />
    );
  };

  const getStatusBadge = (status: IndicatorObservation['status']) => {
    switch (status) {
      case 'Critical':
        return (
          <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-accent-red/15 text-accent-red border border-accent-red/30">
            Critical
          </span>
        );
      case 'Warning':
        return (
          <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-accent-amber/15 text-accent-amber border border-accent-amber/30">
            Warning
          </span>
        );
      case 'Compliant':
      default:
        return (
          <span className="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-accent-green/15 text-accent-green border border-accent-green/30">
            Compliant
          </span>
        );
    }
  };

  const getProvenanceBadge = (provenance: IndicatorObservation['provenance']) => {
    switch (provenance) {
      case 'IN_SITU_OBSERVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
            <Radio className="w-3 h-3" />
            In-Situ Observed
          </span>
        );
      case 'SATELLITE_DERIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-accent-purple/10 text-[#A388EE] border border-[#A388EE]/30">
            <Satellite className="w-3 h-3" />
            Satellite Derived
          </span>
        );
      case 'MODELED_SIMULATION':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-accent-amber/10 text-accent-amber border border-accent-amber/20">
            <Cpu className="w-3 h-3" />
            Modeled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-surface-elevated text-text-secondary border border-border-subtle">
            <Database className="w-3 h-3" />
            Demo Simulation
          </span>
        );
    }
  };

  return (
    <div className="bg-surface border border-border-subtle rounded-xl p-4 sm:p-6 space-y-4">
      {/* Table Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-accent-cyan" />
            <h3 className="text-base sm:text-lg font-serif font-bold text-white">
              Scientific Telemetry Records and Observations
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Sortable multi-parameter dataset cross-referencing monitoring stations and statutory limits.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Search Input */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search station, parameter, date..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-9 pr-3 bg-base border border-border-subtle rounded-lg text-xs text-text-primary placeholder:text-text-secondary focus:border-accent-cyan focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              aria-label="Filter records by compliance status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="h-11 px-3 bg-base border border-border-subtle rounded-lg text-xs text-text-primary focus:border-accent-cyan focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Compliant">Compliant Only</option>
              <option value="Warning">Warning Only</option>
              <option value="Critical">Critical Only</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              aria-label="Filter records by category"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-11 px-3 bg-base border border-border-subtle rounded-lg text-xs text-text-primary focus:border-accent-cyan focus:outline-none"
            >
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Observations Table */}
      <div className="overflow-x-auto border border-border-subtle rounded-lg">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-surface-elevated border-b border-border-subtle text-text-secondary">
              <th className="p-3">
                <button
                  type="button"
                  onClick={() => handleSort('date')}
                  className="min-h-[44px] flex items-center gap-1.5 font-semibold hover:text-text-primary"
                >
                  Date
                  {renderSortIcon('date')}
                </button>
              </th>
              <th className="p-3">
                <button
                  type="button"
                  onClick={() => handleSort('stationName')}
                  className="min-h-[44px] flex items-center gap-1.5 font-semibold hover:text-text-primary"
                >
                  Monitoring Station
                  {renderSortIcon('stationName')}
                </button>
              </th>
              <th className="p-3">
                <button
                  type="button"
                  onClick={() => handleSort('parameterName')}
                  className="min-h-[44px] flex items-center gap-1.5 font-semibold hover:text-text-primary"
                >
                  Parameter
                  {renderSortIcon('parameterName')}
                </button>
              </th>
              <th className="p-3">
                <button
                  type="button"
                  onClick={() => handleSort('value')}
                  className="min-h-[44px] flex items-center gap-1.5 font-semibold hover:text-text-primary"
                >
                  Measured Value
                  {renderSortIcon('value')}
                </button>
              </th>
              <th className="p-3 font-semibold">
                Statutory Limit
              </th>
              <th className="p-3">
                <button
                  type="button"
                  onClick={() => handleSort('status')}
                  className="min-h-[44px] flex items-center gap-1.5 font-semibold hover:text-text-primary"
                >
                  Status
                  {renderSortIcon('status')}
                </button>
              </th>
              <th className="p-3 font-semibold">
                Provenance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {paginatedObservations.length > 0 ? (
              paginatedObservations.map((obs) => (
                <tr key={obs.id} className="hover:bg-surface-elevated/60 transition-colors">
                  <td className="p-3 font-semibold text-text-primary whitespace-nowrap">
                    {obs.date}
                  </td>
                  <td className="p-3 text-text-primary whitespace-nowrap">
                    {obs.stationName}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-text-primary font-medium block">
                      {obs.parameterName}
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      {obs.category}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-text-primary font-bold">
                      {obs.value}
                    </span>{' '}
                    <span className="text-text-secondary text-[11px]">{obs.unit}</span>
                  </td>
                  <td className="p-3 whitespace-nowrap text-text-secondary">
                    {obs.statutoryLimit} {obs.unit} ({obs.standardName})
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {getStatusBadge(obs.status)}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {getProvenanceBadge(obs.provenance)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-text-secondary font-mono">
                  No telemetry records match the selected filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-text-secondary pt-2">
        <div>
          Showing{' '}
          <span className="font-bold text-text-primary">
            {filteredObservations.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}
          </span>{' '}
          to{' '}
          <span className="font-bold text-text-primary">
            {Math.min(currentPage * rowsPerPage, filteredObservations.length)}
          </span>{' '}
          of <span className="font-bold text-text-primary">{filteredObservations.length}</span> records
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="min-h-[44px] px-3 py-2 rounded-lg bg-base border border-border-subtle text-text-primary hover:bg-surface-elevated disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="min-h-[44px] px-3 py-2 rounded-lg bg-base border border-border-subtle text-text-primary hover:bg-surface-elevated disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
