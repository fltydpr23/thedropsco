import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  product: Product;
  index: number;
}

export default function ProductSection({ product, index }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.35,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Content entrance on scroll
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        bottleRef.current,
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Benefits stagger
      gsap.fromTo(
        benefitsRef.current?.children || [],
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Ingredient cards stagger
      gsap.fromTo(
        ingredientsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ingredientsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id={`product-${product.id}`}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-20"
        style={{ background: `radial-gradient(circle, ${product.color}, transparent 70%)` }}
      />

      <div className={`relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full ${
        isEven ? '' : 'direction-rtl'
      }`}>
        {/* Content Side */}
        <div ref={contentRef} className={`${isEven ? '' : 'lg:order-2'}`} style={{ direction: 'ltr' }}>
          {/* Product badge */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: product.color }}
            />
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-drops-muted)]">
              {product.format}
            </span>
          </div>

          {/* Product name */}
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight mb-4"
            style={{ color: product.color }}
          >
            {product.name}
          </h2>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-[var(--color-drops-cream)] font-light leading-relaxed mb-3 max-w-lg italic">
            "{product.tagline}"
          </p>

          {/* Description */}
          <p className="text-sm text-[var(--color-drops-silver)] leading-relaxed mb-8 max-w-lg">
            {product.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-drops-muted)] mb-1">Flavour</span>
              <span className="text-sm text-[var(--color-drops-cream)]">{product.flavours}</span>
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-drops-muted)] mb-1">Size</span>
              <span className="text-sm text-[var(--color-drops-cream)]">{product.sizes}</span>
            </div>
          </div>

          {/* Benefits list */}
          <div ref={benefitsRef} className="space-y-3 mb-8">
            <span className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-drops-muted)] mb-3">What it helps with</span>
            {product.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-150"
                  style={{ backgroundColor: product.color }}
                />
                <span className="text-sm text-[var(--color-drops-cream)]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Side — Product bottle / abstract */}
        <div ref={bottleRef} className={`relative flex items-center justify-center ${isEven ? '' : 'lg:order-1'}`} style={{ direction: 'ltr' }}>
          <div className="relative w-72 h-96 md:w-80 md:h-[28rem]">
            {/* Abstract bottle shape */}
            <div
              className="absolute inset-0 rounded-[40px] border border-white/10 overflow-hidden"
              style={{
                background: `linear-gradient(160deg, ${product.gradientFrom}15, ${product.gradientTo}08, transparent)`,
              }}
            >
              {/* Inner glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-2/3"
                style={{
                  background: `linear-gradient(to top, ${product.color}20, transparent)`,
                }}
              />

              {/* Liquid fill animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${product.color}30)`,
                    animation: 'liquidWave 4s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Product label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-drops-muted)] mb-2">
                  The Drops Co
                </span>
                <span
                  className="font-[var(--font-display)] text-4xl font-bold tracking-tight"
                  style={{ color: product.color }}
                >
                  {product.name}
                </span>
                <div className="w-8 h-px mt-4 mb-3" style={{ backgroundColor: product.color, opacity: 0.4 }} />
                <span className="text-xs text-[var(--color-drops-silver)] text-center">
                  {product.flavours}
                </span>
                <span className="text-[10px] text-[var(--color-drops-muted)] mt-1">500 ml</span>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-[60px] opacity-30"
              style={{ backgroundColor: product.color }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-[80px] opacity-20"
              style={{ backgroundColor: product.gradientTo }}
            />
          </div>
        </div>
      </div>

      {/* Ingredient cards at bottom */}
      <div
        ref={ingredientsRef}
        className="absolute bottom-8 left-0 right-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {product.ingredients.map((ing, i) => (
              <div
                key={i}
                className="ingredient-card glass-light rounded-[var(--radius-sm)] p-4 cursor-default"
              >
                <span
                  className="text-xs font-medium block mb-1"
                  style={{ color: product.color }}
                >
                  {ing.name}
                </span>
                <span className="text-[10px] text-[var(--color-drops-muted)] block mb-2">
                  {ing.subtitle}
                </span>
                <span className="text-[11px] text-[var(--color-drops-silver)] leading-relaxed block">
                  {ing.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
