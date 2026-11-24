import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Map, Activity, ShieldCheck, Layers, Radio } from 'lucide-react';
import { ActiveView } from '../../types';
import { useScrollReveal } from '../../utils/useScrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const headlineWords = ['The', 'Ganges', 'is', 'under', 'pressure'];

interface HeroHeadlineProps {
  onNavigate: (view: ActiveView) => void;
  onOpenMethodology: () => void;
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({
  onNavigate,
  onOpenMethodology,
}) => {
  const headlineRef = useRef<HTMLSpanElement>(null);
  const heroRevealRef = useScrollReveal<HTMLDivElement>({ selector: '.hero-reveal', stagger: 0.1 });

  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.headline-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, headlineRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-surface border border-border-subtle rounded-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-14">
        
        {/* Main Positioning & Mission */}
        <div ref={heroRevealRef} className="space-y-6 max-w-3xl">
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            <span className="sr-only">The Ganges is under pressure</span>
            <span aria-hidden="true" ref={headlineRef} className="inline-block">
              {headlineWords.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span className="headline-word inline-block will-change-transform">
                    {word}
                  </span>
                  {idx < headlineWords.length - 1 && ' '}
                </React.Fragment>
              ))}
            </span>
          </h1>

          <p className="hero-reveal text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose font-sans max-w-2xl">
            Draining 1.72 million square kilometers across northern India and Bangladesh, the transboundary 
            Ganges-Brahmaputra-Meghna basin supports over 650 million people. Today, untreated municipal outfalls, 
            concentrated industrial chemical discharges, widespread geogenic arsenic mobilization, and upstream flow 
            interruptions threaten ecological resilience and regional public health. FREE THE GANGES provides 
            independent, continuous, and scientifically verified surveillance of this critical watershed.
          </p>

          {/* Quick Status Metadata */}
          <div className="hero-reveal flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-2 text-xs text-text-secondary">
            <span className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-accent-green" />
              Basins Monitored: Ganges, Brahmaputra, Meghna
            </span>
            <span className="text-border-strong hidden sm:inline">•</span>
            <span>
              Transboundary: India & Bangladesh
            </span>
            <span className="text-border-strong hidden sm:inline">•</span>
            <span>
              Active Stations: 16 Telemetry Hubs
            </span>
            <span className="text-border-strong hidden sm:inline">•</span>
            <span className="text-accent-cyan font-medium">
              Status: Independent Watchdog
            </span>
          </div>

          {/* Interactive CTAs with min 44px tap target */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('atlas')}
              className="min-h-[44px] px-6 py-2.5 rounded-lg bg-accent-cyan text-base font-semibold text-xs flex items-center gap-2 hover:bg-accent-cyan/90 transition-colors shadow-sm"
            >
              <Map className="w-4 h-4" />
              <span>Launch Environmental Atlas</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('indicators')}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary font-medium text-xs flex items-center gap-2 hover:bg-surface-hover hover:border-accent-cyan/40 transition-colors"
            >
              <Activity className="w-4 h-4 text-accent-cyan" />
              <span>Examine Indicators</span>
            </button>

            <button
              type="button"
              onClick={onOpenMethodology}
              className="min-h-[44px] px-4 py-2.5 rounded-lg text-text-secondary hover:text-text-primary text-xs flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-text-secondary" />
              <span>Data Methodology</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Panel */}
        <div className="shrink-0 bg-surface-elevated/70 border border-border-subtle rounded-xl p-6 lg:p-7 lg:w-84 space-y-5">
          <h3 className="text-xs font-semibold text-text-secondary flex items-center gap-2 tracking-wide uppercase">
            <Layers className="w-4 h-4 text-accent-cyan" />
            Basin Monitored Dimensions
          </h3>

          <div className="space-y-3.5 text-xs divide-y divide-border-subtle/60">
            <div className="flex justify-between pt-1">
              <span className="text-text-secondary">Total Catchment Area:</span>
              <span className="text-text-primary font-semibold font-mono">1,720,000 km²</span>
            </div>
            <div className="flex justify-between pt-2.5">
              <span className="text-text-secondary">Riparian Population:</span>
              <span className="text-text-primary font-semibold font-mono">650M+ Citizens</span>
            </div>
            <div className="flex justify-between pt-2.5">
              <span className="text-text-secondary">Tracked River Systems:</span>
              <span className="text-accent-cyan font-semibold font-mono">15 Major Rivers</span>
            </div>
            <div className="flex justify-between pt-2.5">
              <span className="text-text-secondary">Documented Hotspots:</span>
              <span className="text-accent-red font-semibold font-mono">11 High Priority</span>
            </div>
            <div className="flex justify-between pt-2.5">
              <span className="text-text-secondary">Water Quality Hubs:</span>
              <span className="text-accent-green font-semibold font-mono">16 Telemetry Stations</span>
            </div>
            <div className="flex justify-between pt-2.5">
              <span className="text-text-secondary">Spatial Bounds:</span>
              <span className="text-text-primary font-semibold font-mono">20°N-32°N, 73°E-98°E</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
