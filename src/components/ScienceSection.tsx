import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, suffix: '%', label: 'Bioavailable Forms', sub: 'Every ingredient in its most active, absorbable form.' },
  { value: 0, suffix: '', label: 'Artificial Additives', sub: 'No fillers, no synthetic colours, no compromises.' },
  { value: 4, suffix: '', label: 'Targeted Formulas', sub: 'Four life moments. Four science-backed compositions.' },
  { value: 70, suffix: '%+', label: 'Better Absorption', sub: 'Liquid format delivers superior bioavailability vs tablets.' },
];

function StatCard({ value, suffix, label, sub, delay }: typeof stats[0] & { delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay }
          );
          // Counter
          gsap.to({ val: 0 }, {
            val: value,
            duration: 1.4,
            delay,
            ease: 'power2.out',
            onUpdate() {
              setCount(Math.round(this.targets()[0].val));
            },
          });
        },
        once: true,
      });
    });
    return () => ctx.revert();
  }, [value, delay]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0,
        padding: '2rem 1.75rem',
        borderRadius: 'var(--r-md)',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--focus)',
        }}
      >
        <span ref={numRef}>{count}</span>
        <span style={{ fontSize: '0.55em' }}>{suffix}</span>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: '0.875rem',
          color: 'var(--white)',
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>
        {sub}
      </div>
    </div>
  );
}

export default function ScienceSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="science"
      className="section"
      style={{ backgroundColor: 'var(--black)', position: 'relative', zIndex: 1 }}
    >
      <div className="container">
        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: '5rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '1.25rem' }}>
            The Science
          </span>
          <h2 className="display-md" style={{ maxWidth: '560px' }}>
            Not a trend.
            <br />
            <span style={{ color: 'var(--focus)', fontWeight: 300 }}>A standard.</span>
          </h2>
          <p
            style={{
              marginTop: '1.5rem',
              maxWidth: '500px',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--muted)',
            }}
          >
            We chose liquid because it's the only format that lets us build taste profiles worthy of a café menu — and deliver bioavailability that tablets can't match.
          </p>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
          }}
        >
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>

        {/* Rule */}
        <div style={{ marginTop: '5rem' }}>
          <div className="rule" />
        </div>
      </div>
    </section>
  );
}
