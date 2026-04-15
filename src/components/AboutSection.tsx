import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ingredient grid data
const ingredientGrid = [
  'Methylcobalamin', 'Zinc Bisglycinate', 'Magnesium Bisglycinate',
  'Liposomal Vitamin C', 'Ferrous Bisglycinate', 'Cholecalciferol',
  'Pyridoxal-5′-Phosphate', 'Calcium L-5-MTHF', 'Selenomethionine',
  'MK-7', 'rTG Fish Oil', 'Full B-Complex',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="section"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--black)', position: 'relative', zIndex: 1 }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 6vw, 7rem)',
            alignItems: 'center',
          }}
        >
          {/* Left — Text */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>
              Who we are
            </span>
            <h2 className="display-md" style={{ marginBottom: '2rem', textWrap: 'balance' }}>
              Nutrition done right should not be{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #D4E84A, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 400,
                }}
              >
                the exception.
              </span>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.5rem' }}>
              The Drops Co was built on a single conviction: that nutrition done right — honest, effective, and genuinely extraordinary to experience — should be the standard.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.5rem' }}>
              The format is liquid. Not because liquid is a trend — because liquid is the only format that lets us build taste profiles worthy of a café menu. Flavours you'd describe to someone else.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '2.5rem' }}>
              Nutrition that arrives the way a great drink arrives: with presence, with intention, with the distinct feeling that someone cared deeply about how it would land.
            </p>
            <a href="#waitlist" className="btn-outline">
              Join the waitlist
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h10M8 3l4 4-4 4"/>
              </svg>
            </a>
          </div>

          {/* Right — Ingredient composition grid with aura */}
          <div ref={gridRef} style={{ opacity: 0, position: 'relative' }}>
            {/* Subtle product-color aura to breathe life into the grid */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '120%',
                height: '120%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle at center, rgba(198, 115, 58, 0.08) 0%, rgba(78, 205, 196, 0.05) 50%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />
            <span className="label" style={{ display: 'block', marginBottom: '1.25rem' }}>
              Every ingredient. Every formula.
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1px',
                background: 'var(--border)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                overflow: 'hidden',
              }}
            >
              {ingredientGrid.map((name, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.1rem 1rem',
                    background: 'var(--surface)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.04em',
                    color: 'var(--muted)',
                    lineHeight: 1.4,
                    transition: 'color 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--white)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
              }}
            >
              All active, bioavailable forms · No synthetic fillers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
