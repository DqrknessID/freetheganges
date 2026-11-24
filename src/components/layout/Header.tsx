import React, { useState } from 'react';
import { 
  Compass, 
  Map as MapIcon, 
  Activity, 
  FileText, 
  Info, 
  Search, 
  Menu, 
  X, 
  ShieldCheck,
  Droplet
} from 'lucide-react';
import { ActiveView, NavItem } from '../../types';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', description: 'Regional Intelligence Dashboard' },
  { id: 'atlas', label: 'Environmental Atlas', description: 'Interactive GBM Basin GIS' },
  { id: 'indicators', label: 'Environmental Indicators', description: 'Scientific Data & Time Series' },
  { id: 'research', label: 'Research & Reports', description: 'Publications & Source Registry' },
  { id: 'about', label: 'About', description: 'Watchdog Charter & Mission' },
];

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onOpenMethodology,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleNavClick = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const getNavIcon = (id: ActiveView) => {
    switch (id) {
      case 'overview':
        return <Compass className="w-4 h-4" />;
      case 'atlas':
        return <MapIcon className="w-4 h-4" />;
      case 'indicators':
        return <Activity className="w-4 h-4" />;
      case 'research':
        return <FileText className="w-4 h-4" />;
      case 'about':
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md border-b border-border-subtle transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Wordmark & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('overview')}
              className="flex items-center gap-2.5 text-left group min-h-[44px] min-w-[44px] py-1"
              aria-label="Free the Ganges Home"
            >
              <div className="w-8 h-8 rounded-md bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-primary group-hover:border-border-strong transition-colors">
                <Droplet className="w-4 h-4 text-text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-base font-semibold text-text-primary">
                    FREE THE GANGES
                  </span>
                  <span className="sr-only">GBM BASIN MONITOR</span>
                </div>
                <p className="text-[11px] text-text-muted font-sans hidden sm:block">
                  Transboundary Environmental Intelligence Platform
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Primary Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`min-h-[44px] px-3.5 py-2 rounded-md text-xs font-medium tracking-normal flex items-center gap-2 transition-all ${
                    isActive
                      ? 'text-text-primary bg-surface-elevated border border-border-subtle shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <span className={isActive ? 'text-text-primary' : 'text-text-muted'}>
                    {getNavIcon(item.id)}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search Bar & Methodology Modal Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Input */}
            <div className="relative hidden md:block w-48 xl:w-64">
              <label htmlFor="global-basin-search" className="sr-only">
                Search basin rivers, hotspots, contaminants
              </label>
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-text-secondary">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                id="global-basin-search"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search basin, hotspot, or parameter..."
                className={`w-full h-9 pl-8 pr-3 bg-base border text-xs text-text-primary rounded placeholder:text-text-secondary font-mono transition-all ${
                  searchFocused 
                    ? 'border-border-strong bg-surface-elevated' 
                    : 'border-border-subtle hover:border-border-strong'
                }`}
              />
            </div>

            {/* Methodology Modal Trigger */}
            <button
              type="button"
              onClick={onOpenMethodology}
              className="min-h-[44px] px-3 py-2 rounded border border-border-subtle bg-surface-elevated hover:bg-surface-hover hover:border-border-strong text-text-primary text-xs font-mono flex items-center gap-2 transition-all"
              title="Inspect scientific methodology and sensor validation protocol"
              aria-label="Open scientific methodology and sensor validation protocol"
            >
              <ShieldCheck className="w-4 h-4 text-text-secondary" />
              <span className="hidden sm:inline">Methodology</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-surface-elevated px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          {/* Mobile Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search basin, hotspot, or parameter..."
              className="w-full h-11 pl-9 pr-3 bg-base border border-border-subtle text-xs text-text-primary rounded font-mono placeholder:text-text-secondary focus:border-border-strong focus:outline-none"
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full min-h-[44px] px-3 py-2.5 rounded text-left text-xs font-medium flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'text-text-primary bg-surface border border-border-strong font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <span className={isActive ? 'text-text-primary' : 'text-text-secondary'}>
                    {getNavIcon(item.id)}
                  </span>
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-[10px] text-text-secondary font-mono">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
