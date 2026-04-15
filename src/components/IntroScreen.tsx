import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PRODUCTS = [
  { id: 'focus', color: '#D4E84A' },
  { id: 'body',  color: '#C6733A' },
  { id: 'cycle', color: '#F23B6F' },
  { id: 'daily', color: '#4ECDC4' },
];

const DROP_PATH = 'M20,2 C20,2 4,20 4,33 C4,43.5 11,50 20,50 C29,50 36,43.5 36,33 C36,20 20,2 20,2 Z';
const HIGHLIGHT  = 'M13,16 C11,21 11,27 12,32';

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropRefs     = useRef<(SVGSVGElement | null)[]>([]);
  const nameRef      = useRef<HTMLSpanElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drops = dropRefs.current.filter((d): d is SVGSVGElement => Boolean(d));
    const namEl = nameRef.current;
    const logo  = logoRef.current;
    if (!namEl || !logo || drops.length < 4) return;

    const PER = 1.1; // pacing between drops

    // Initial states
    gsap.set(drops, { y: -window.innerHeight, opacity: 0, transformOrigin: '50% 100%' });
    gsap.set(namEl, { opacity: 0 });
    gsap.set(logo,  { opacity: 0 });

    const tl = gsap.timeline();

    // Wordmark fades in first
    tl.to(logo, { opacity: 1, duration: 0.55, ease: 'power1.out' });

    // Sequence of drops
    PRODUCTS.forEach((prod, i) => {
      const drop = drops[i];
      if (!drop) return;
      const at = 0.5 + i * PER;

      // Swap label colour just before drop arrives
      tl.call(() => {
        if (namEl) {
          namEl.textContent = prod.id.toUpperCase();
          (namEl as HTMLElement).style.color = prod.color;
        }
      }, [], at - 0.05);

      tl
        // Snapped above viewport
        .set(drop, { y: -window.innerHeight * 0.85, opacity: 1, scaleX: 0.8, scaleY: 1.45 }, at)
        // Free fall
        .to(drop,  { y: 0, duration: 0.42, ease: 'power3.in' }, at)
        // Squash on plate
        .to(drop,  { scaleY: 0.45, scaleX: 1.6, duration: 0.07, ease: 'power1.out' }, at + 0.40)
        // Label flashes on impact
        .to(namEl, { opacity: 1, duration: 0.12 }, at + 0.40)
        // Spring back
        .to(drop,  { scaleY: 1, scaleX: 1, duration: 0.38, ease: 'elastic.out(1.2, 0.5)' }, at + 0.47);

      // All drops except the last one vanish back up into the void
      if (i < PRODUCTS.length - 1) {
        const vanish = at + PER - 0.2;
        tl
          .to(namEl, { opacity: 0, duration: 0.18 }, vanish - 0.06)
          .set(drop, { transformOrigin: '50% 50%' }, vanish)
          .to(drop,  { scale: 0, opacity: 0, duration: 0.16, ease: 'back.in(2.5)' }, vanish);
      }
    });

    // After 4th drop settles, graceful cinematic fade-out (stage curtain lift)
    // No more awkward mint screen flooding
    const afterAll = 0.5 + (PRODUCTS.length - 1) * PER + 0.42 + 0.07 + 0.38 + 0.35;
    const lastDrop = drops[drops.length - 1];

    tl
      .to(namEl, { opacity: 0, duration: 0.4 }, afterAll)
      .to(logo,  { opacity: 0, duration: 0.4 }, afterAll)
      .to(lastDrop, { scale: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut', transformOrigin: '50% 100%' }, afterAll)
      
      // Entire overlay fades away seamlessly into the hero background
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.75,
        ease: 'power2.inOut',
        onComplete: () => {
          const el = containerRef.current;
          if (el) el.style.display = 'none';
          onComplete(); // Triggers the Hero animations in App.tsx
        },
      }, afterAll + 0.2); 

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#080808',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Wordmark */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute', top: '2.5rem',
          left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: '13px', letterSpacing: '0.1em',
          color: 'rgba(240,237,232,0.35)', whiteSpace: 'nowrap',
          opacity: 0,
        }}
      >
        the drops co
      </div>

      {/* Drops */}
      <div style={{ position: 'relative', width: 96, height: 134 }}>
        {PRODUCTS.map((prod, i) => (
          <svg
            key={prod.id}
            ref={(el) => { dropRefs.current[i] = el; }}
            viewBox="0 0 40 52"
            width="96"
            height="134"
            style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
          >
            <defs>
              <filter id={`glow-${prod.id}`} x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={DROP_PATH}
              fill={prod.color}
              filter={`url(#glow-${prod.id})`}
            />
            <path
              d={HIGHLIGHT}
              stroke="rgba(255,255,255,0.30)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ))}
      </div>

      {/* Product label */}
      <span
        ref={nameRef}
        style={{
          display: 'block', marginTop: '1.4rem',
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          letterSpacing: '0.34em', color: '#D4E84A',
          opacity: 0,
        }}
      />
    </div>
  );
}
