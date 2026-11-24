import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
    return () => {};
  }

  if (lenisInstance) {
    return destroySmoothScroll;
  }

  lenisInstance = new Lenis({
    autoRaf: false,
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return destroySmoothScroll;
}

export function destroySmoothScroll(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function scrollToTop(): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  } else if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
}

export function stopLenis(): void {
  if (lenisInstance) {
    lenisInstance.stop();
  }
}

export function startLenis(): void {
  if (lenisInstance) {
    lenisInstance.start();
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
