import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, scrollToTop, stopLenis, startLenis } from './utils/smoothScroll';
import { ActiveView } from './types';
import { AlertTicker } from './components/layout/AlertTicker';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MethodologyModal } from './components/layout/MethodologyModal';

import { OverviewDashboard } from './components/overview/OverviewDashboard';
import { EnvironmentalAtlas } from './components/atlas/EnvironmentalAtlas';
import { IndicatorsView } from './components/indicators/IndicatorsView';
import { ResearchReportsView } from './components/research/ResearchReportsView';
import { AboutView } from './components/about/AboutView';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    scrollToTop();
    if (typeof window !== 'undefined') {
      ScrollTrigger.refresh();
    }
    if (activeView === 'atlas') {
      stopLenis();
    } else {
      startLenis();
    }
  }, [activeView]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // If user starts typing from non-atlas or non-research view, we can route to atlas or keep context
    if (query.trim().length > 0 && activeView === 'overview') {
      setActiveView('atlas');
    }
  };

  const handleSelectAlert = () => {
    setActiveView('atlas');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return (
          <OverviewDashboard
            onNavigate={setActiveView}
            onOpenMethodology={() => setIsMethodologyOpen(true)}
          />
        );
      case 'atlas':
        return <EnvironmentalAtlas initialSearch={searchQuery} />;
      case 'indicators':
        return <IndicatorsView />;
      case 'research':
        return <ResearchReportsView />;
      case 'about':
        return (
          <AboutView
            onNavigate={setActiveView}
            onOpenMethodology={() => setIsMethodologyOpen(true)}
          />
        );
      default:
        return (
          <OverviewDashboard
            onNavigate={setActiveView}
            onOpenMethodology={() => setIsMethodologyOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-base text-text-primary flex flex-col font-sans selection:bg-surface-elevated selection:text-white">
      {/* Telemetry alert channel: accessible for assistive tools and telemetry subscriptions */}
      <div className="sr-only">
        <AlertTicker onSelectAlert={handleSelectAlert} />
      </div>

      {/* 1. Institutional Header */}
      <Header
        activeView={activeView}
        onNavigate={setActiveView}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* 3. Main View Stage */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* 4. Institutional Watchdog Footer (rendered unless full-bleed map mode) */}
      {activeView !== 'atlas' && (
        <Footer
          onNavigate={setActiveView}
          onOpenMethodology={() => setIsMethodologyOpen(true)}
        />
      )}

      {/* 5. Scientific Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
};

export default App;
