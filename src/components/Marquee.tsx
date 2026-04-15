import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const words = ['Focus', '·', 'Body', '·', 'Cycle', '·', 'Daily', '·', 'Liquid', '·', 'Nutrition', '·', 'No Compromise', '·'];
  const doubled = [...words, ...words, ...words];

  return (
    <div ref={containerRef} className="py-16 border-y border-white/5 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((word, i) => (
          <span
            key={i}
            className={`mx-6 text-4xl md:text-6xl lg:text-7xl font-[var(--font-display)] font-bold tracking-tight ${
              word === '·'
                ? 'text-[var(--color-drops-muted)] text-2xl'
                : 'text-gradient'
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
