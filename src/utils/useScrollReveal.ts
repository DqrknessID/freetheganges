import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealOptions {
  selector?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): React.RefObject<T> {
  const containerRef = useRef<T>(null);
  const {
    selector,
    stagger = 0.08,
    delay = 0,
    y = 20,
    duration = 0.6,
    once = true,
  } = options;

  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
      return;
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const targets = selector ? container.querySelectorAll(selector) : container;
      if (targets && (targets instanceof NodeList ? targets.length > 0 : true)) {
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: selector ? stagger : 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [selector, stagger, delay, y, duration, once]);

  return containerRef;
}
