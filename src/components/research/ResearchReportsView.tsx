import React, { useState, useMemo } from 'react';
import { FileText, Database, Search } from 'lucide-react';
import { publicationsData, sourceRegistryData } from '../../data';
import { PublicationCard } from './PublicationCard';
import { SourceRegistryTable } from './SourceRegistryTable';
import { useScrollReveal } from '../../utils/useScrollReveal';

export const ResearchReportsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'publications' | 'sources'>('publications');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const listRef = useScrollReveal<HTMLDivElement>({ selector: 'article', stagger: 0.06 });

  const categories = ['All', 'Scientific Assessment', 'Research Paper', 'Policy Brief'] as const;

  // Filter and sort publications (newest first)
  const filteredPublications = useMemo(() => {
    return publicationsData
      .filter((pub) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          pub.title.toLowerCase().includes(q) ||
          pub.executiveSummary.toLowerCase().includes(q) ||
          pub.authors.some((a) => a.toLowerCase().includes(q)) ||
          pub.tags.some((t) => t.toLowerCase().includes(q));

        const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-accent-cyan" />
          <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Research Publications & Transparent Source Registry
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-4xl">
          Peer-reviewed scientific literature, independent policy briefs, and a comprehensive audit trail of 
          all environmental data providers. Demonstrative sample data is transparently badged to uphold scientific rigor.
        </p>
      </div>

      {/* Primary Section Switcher */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-border-subtle pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('publications')}
          className={`min-h-[44px] px-5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
            activeTab === 'publications'
              ? 'bg-accent-cyan text-base font-semibold shadow-sm'
              : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated border border-border-subtle'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Research & Reports ({publicationsData.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sources')}
          className={`min-h-[44px] px-5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
            activeTab === 'sources'
              ? 'bg-accent-cyan text-base font-semibold shadow-sm'
              : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated border border-border-subtle'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Source Registry ({sourceRegistryData.length} Providers)</span>
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
                className="w-full h-11 pl-9 pr-3 bg-base border border-border-subtle rounded-lg text-xs sm:text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-cyan focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-surface-elevated text-accent-cyan border-accent-cyan/40 font-semibold'
                      : 'bg-surface text-text-secondary border-border-subtle hover:text-text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Publications Cards Grid */}
          <div ref={listRef} className="space-y-4">
            {filteredPublications.length === 0 ? (
              <div className="bg-surface border border-border-subtle rounded-xl p-8 text-center text-text-secondary text-sm">
                No publications found matching your search criteria. Try a different query or select All categories.
              </div>
            ) : (
              filteredPublications.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} />
              ))
            )}
          </div>
        </div>
      )}

      {/* Source Registry View */}
      {activeTab === 'sources' && (
        <SourceRegistryTable sources={sourceRegistryData} />
      )}

    </div>
  );
};
