import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const totalWidth = track.scrollWidth - container.offsetWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Fade in each card
      const cards = track.querySelectorAll('.h-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.4, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-screen">
      {/* Section label */}
      <div className="absolute top-8 left-6 z-20">
        <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-drops-muted)]">
          Scroll to explore →
        </span>
      </div>

      {/* Cards track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 px-[10vw]"
        style={{ willChange: 'transform' }}
      >
        {/* Opening slide */}
        <div className="h-card shrink-0 w-[70vw] max-w-xl text-right">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-drops-cream)] leading-[0.9] mb-4">
            Four drops.
            <br />
            <span className="text-gradient-accent">Four life</span>
            <br />
            moments.
          </h2>
          <p className="text-[var(--color-drops-silver)] text-sm ml-auto max-w-xs">
            Each formula is built for a distinct moment in your life. Nothing generic. Nothing wasted.
          </p>
        </div>

        {/* Product cards */}
        {products.map((product) => (
          <div
            key={product.id}
            className="h-card shrink-0 w-[340px] md:w-[400px] rounded-[var(--radius-card)] glass-light p-8 flex flex-col relative overflow-hidden"
            style={{
              border: `1px solid ${product.color}20`,
              minHeight: '75vh',
            }}
          >
            {/* Top glow */}
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-[60px] opacity-20"
              style={{ backgroundColor: product.color }}
            />
            {/* Bottom glow */}
            <div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full blur-[50px] opacity-15"
              style={{ backgroundColor: product.color }}
            />

            {/* Header */}
            <div className="relative z-10">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-drops-muted)] block mb-6">
                {product.format}
              </span>
              <h3
                className="font-[var(--font-display)] text-6xl font-bold tracking-tight mb-3"
                style={{ color: product.color }}
              >
                {product.name}
              </h3>
              <p className="text-xs text-[var(--color-drops-silver)] italic mb-5 leading-relaxed max-w-[280px]">
                "{product.tagline}"
              </p>

              {/* Flavour pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {product.flavours.split(' · ').map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-full text-[10px] tracking-wide"
                    style={{
                      backgroundColor: `${product.color}15`,
                      border: `1px solid ${product.color}30`,
                      color: product.color,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="text-xs text-[var(--color-drops-silver)]">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Abstract bottle visual — fills middle space */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-8">
              <div className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-[30px] opacity-25 scale-150"
                  style={{ backgroundColor: product.color }}
                />
                {/* Bottle shape */}
                <svg
                  width="90"
                  height="160"
                  viewBox="0 0 90 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  {/* Bottle neck */}
                  <rect x="32" y="0" width="26" height="30" rx="6" fill={`${product.color}18`} stroke={`${product.color}40`} strokeWidth="1" />
                  {/* Bottle body */}
                  <rect x="8" y="28" width="74" height="120" rx="18" fill={`${product.color}10`} stroke={`${product.color}35`} strokeWidth="1" />
                  {/* Liquid fill */}
                  <rect x="9" y="88" width="72" height="59" rx="0" fill={`${product.color}22`} />
                  <rect x="9" y="136" width="72" height="12" rx="18" fill={`${product.color}30`} />
                  {/* Liquid top wave */}
                  <path
                    d={`M9 88 Q27 82 45 88 Q63 94 81 88 L81 148 Q63 148 45 148 Q27 148 9 148 Z`}
                    fill={`${product.color}20`}
                  />
                  {/* Shine */}
                  <rect x="16" y="36" width="8" height="60" rx="4" fill="rgba(255,255,255,0.07)" />
                  {/* Label area */}
                  <rect x="16" y="50" width="58" height="56" rx="10" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                  {/* Label text */}
                  <text x="45" y="74" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="var(--font-mono)" letterSpacing="2">THE DROPS CO</text>
                  <text x="45" y="88" textAnchor="middle" fontSize="11" fill={product.color} fontFamily="var(--font-display)" fontWeight="bold">{product.name}</text>
                  <text x="45" y="98" textAnchor="middle" fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="var(--font-body)">500 ml</text>
                </svg>
                {/* Floating drop */}
                <div
                  className="absolute -top-2 -right-2 w-3 h-3 rounded-full opacity-60"
                  style={{
                    backgroundColor: product.color,
                    animation: 'float 3s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full opacity-40"
                  style={{
                    backgroundColor: product.color,
                    animation: 'float 4s ease-in-out infinite 0.5s',
                  }}
                />
              </div>
            </div>

            {/* Bottom ingredient count */}
            <div className="relative z-10 pt-5 border-t border-white/5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-drops-muted)] block mb-1">
                Key Ingredients
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing.name}
                    className="text-[9px] px-2 py-0.5 rounded-full text-[var(--color-drops-muted)]"
                    style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {ing.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}


        {/* Closing slide — CTA */}
        <div className="h-card shrink-0 w-[70vw] max-w-lg flex flex-col justify-center">
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-drops-muted)] mb-6">
            Launching 2026
          </span>
          <h2 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-drops-cream)] mb-6 leading-tight">
            Ready to
            <br />
            <span className="text-gradient-accent">drop in?</span>
          </h2>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--color-drops-cream)] text-[var(--color-drops-black)] font-medium w-fit hover:scale-105 transition-transform duration-300"
          >
            Join the Waitlist
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
