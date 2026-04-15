import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const line2Ref   = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean, Apple-style stagger entrance — no drop, just typography
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      line2Ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.55'
    )
    .fromTo(
      subRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.15'
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
        backgroundColor: 'var(--black)',
        padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          width: '100%',
        }}
      >
        {/* Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--focus)',
            }}
          />
          <span className="label" style={{ color: 'var(--muted)', letterSpacing: '0.2em' }}>
            Liquid Nutrition · Launching 2026
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ lineHeight: 1 }}>
          <div
            ref={line1Ref}
            style={{ opacity: 0 }}
            className="display-xl"
          >
            Good things,
          </div>
          <div
            ref={line2Ref}
            style={{
              opacity: 0,
              color: 'var(--focus)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 11rem)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
            }}
          >
            quietly.
          </div>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          style={{
            opacity: 0,
            marginTop: '2rem',
            maxWidth: '420px',
            fontSize: '1rem',
            lineHeight: 1.65,
            color: 'var(--muted)',
          }}
        >
          Honest ingredients. Extraordinary taste.
          <br />No compromise.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            marginTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <a href="#products" className="btn-primary">
            Explore the range
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M8 3l4 4-4 4"/>
            </svg>
          </a>
          <a href="#about" className="btn-outline">
            Our story
          </a>
        </div>
      </div>

      {/* Scroll line */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0,
        }}
      >
        <span className="label" style={{ fontSize: '9px' }}>SCROLL</span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--muted), transparent)',
          }}
        />
      </div>

      {/* Bottom vignette — uses body bg color so it stays flush */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, var(--black), transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </section>
  );
}
