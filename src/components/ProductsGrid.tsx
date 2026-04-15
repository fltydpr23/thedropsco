import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="relative py-32 md:py-40">
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="mb-16">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-[var(--color-focus-yuzu)] mb-4">
            The Range
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-drops-cream)]">
              Four life moments.
              <br />
              <span className="text-gradient">Four formulas.</span>
            </h2>
            <p className="text-[var(--color-drops-silver)] max-w-xs text-sm leading-relaxed">
              Each drop is built around a specific moment in your life — not a generic formula trying to do everything.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <a
              key={product.id}
              href={`#product-${product.id}`}
              className="group relative rounded-[var(--radius-card)] p-6 glass-light hover:bg-white/[0.06] transition-all duration-500 overflow-hidden flex flex-col gap-4"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[var(--radius-card)]"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${product.color}15, transparent 70%)`,
                }}
              />

              {/* Color pip */}
              <div className="flex items-center justify-between relative z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${product.color}20`, border: `1px solid ${product.color}40` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }} />
                </div>
                <svg className="w-4 h-4 text-[var(--color-drops-muted)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>

              {/* Name + flavours */}
              <div className="relative z-10 flex-1">
                <h3
                  className="font-[var(--font-display)] text-3xl font-bold tracking-tight mb-2"
                  style={{ color: product.color }}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[var(--color-drops-muted)] leading-relaxed mb-3">
                  {product.flavours}
                </p>
                <p className="text-xs text-[var(--color-drops-silver)] leading-relaxed line-clamp-3">
                  {product.tagline}
                </p>
              </div>

              {/* Benefits preview */}
              <div className="relative z-10 space-y-1.5 pt-2 border-t border-white/5">
                {product.benefits.slice(0, 3).map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: product.color }} />
                    <span className="text-[10px] text-[var(--color-drops-muted)]">{b}</span>
                  </div>
                ))}
              </div>

              {/* Decorative bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${product.color}40, transparent)` }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
