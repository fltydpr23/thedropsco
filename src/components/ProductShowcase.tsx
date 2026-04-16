import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

// Maps product id → tinted dark body background colour
const bodyTintMap: Record<string, string> = {
  focus: 'rgb(39,43,14)',   // dark olive-yuzu
  body:  'rgb(37,27,17)',   // dark copper
  cycle: 'rgb(50,17,27)',   // dark neon-rose
  daily: 'rgb(21,44,43)',   // dark arctic-mint
};

function IngredientCrawl({ ingredients }: { ingredients: typeof products[0]['ingredients'] }) {
  const items = [...ingredients, ...ingredients, ...ingredients, ...ingredients];
  return (
    <div
      className="ingredient-container"
      style={{
        height: '260px',
        overflow: 'hidden',
        position: 'relative',
        maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
      }}
    >
      <div className="crawl-track">
        {items.map((ing, i) => (
          <div key={i} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.9rem', color: 'var(--white)', marginBottom: '0.2rem' }}>
              {ing.name}
            </div>
            <div className="label">{ing.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// DESKTOP: PINNED SCRUB
// ─────────────────────────────────────────────────────────
function DesktopProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const totalPanels = products.length;

      ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: 'top top',
        end: `+=${totalPanels * 100}vh`,
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * totalPanels), totalPanels - 1);
          setActiveIndex(idx);

          gsap.to(document.body, {
            backgroundColor: bodyTintMap[products[idx].id],
            duration: 0.7,
            ease: 'power3.out',
            overwrite: 'auto',
          });

          document.body.dataset['activeProduct'] = products[idx].id;
        },
        onLeave: () => {
          gsap.to(document.body, { backgroundColor: '#080808', duration: 1.2, ease: 'power1.out', overwrite: 'auto' });
          delete document.body.dataset['activeProduct'];
        },
        onLeaveBack: () => {
          gsap.to(document.body, { backgroundColor: '#080808', duration: 1.2, ease: 'power1.out', overwrite: 'auto' });
          delete document.body.dataset['activeProduct'];
        },
      });
    }, container);

    return () => {
      ctx.revert();
      gsap.to(document.body, { backgroundColor: '#080808', duration: 0.5, overwrite: 'auto' });
      delete document.body.dataset['activeProduct'];
    };
  }, []);

  const product = products[activeIndex];

  return (
    <section id="products-desktop" ref={containerRef} style={{ height: '100vh', position: 'relative' }}>
      <div
        ref={panelsRef}
        style={{
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
        data-product={product.id}
      >
        <div style={{ padding: 'clamp(3rem, 8vh, 6rem) clamp(1.5rem, 5vw, 5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', borderRight: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            {products.map((p, i) => (
              <div key={p.id} style={{ width: i === activeIndex ? '24px' : '6px', height: '2px', borderRadius: '1px', background: i === activeIndex ? product.color : 'var(--border)', transition: 'all 0.4s ease' }} />
            ))}
            <span className="label" style={{ marginLeft: '0.5rem' }}>{String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}</span>
          </div>
          <div key={product.id + '-name'} className="product-name-enter" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(5rem, 13vw, 14rem)', lineHeight: 0.88, letterSpacing: '-0.04em', color: product.color, transition: 'color 0.5s ease', marginBottom: '1.5rem' }}>
            {product.name}
          </div>
          <p key={product.id + '-tagline'} style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--muted)', maxWidth: '400px', marginBottom: '2.5rem' }}>
            {product.tagline}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {product.flavours.map((f) => (
              <span key={f} style={{ padding: '0.35rem 0.9rem', borderRadius: '999px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: product.color, border: `1px solid ${product.color}40`, background: `${product.color}0d`, transition: 'all 0.4s ease' }}>
                {f}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {product.benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: product.color, flexShrink: 0, transition: 'background 0.4s ease' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--white)', lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 'clamp(3rem, 8vh, 6rem) clamp(1.5rem, 5vw, 5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(3rem, 6vh, 6rem)', height: '100%' }}>
          <div>
            <div style={{ marginBottom: '3rem' }}>
              <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>The science</span>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '420px' }}>{product.description}</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Key ingredients</span>
              <IngredientCrawl ingredients={product.ingredients} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--muted)' }} />
            <span className="label">Scroll to explore each formula</span>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'var(--border)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((activeIndex + 1) / products.length) * 100}%`, background: product.color, transition: 'width 0.6s ease, background 0.5s ease' }} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// MOBILE: NATIVE FREE SCROLL STACK (NO PINNING)
// ─────────────────────────────────────────────────────────
function MobileProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create independent scroll triggers for each natively scrolling child
      // No pinning, just background tint updates and cursor updates
      products.forEach((p) => {
        ScrollTrigger.create({
          trigger: `#mobile-product-${p.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            gsap.to(document.body, { backgroundColor: bodyTintMap[p.id], duration: 0.6, overwrite: 'auto' });
            document.body.dataset['activeProduct'] = p.id;
          },
          onEnterBack: () => {
            gsap.to(document.body, { backgroundColor: bodyTintMap[p.id], duration: 0.6, overwrite: 'auto' });
            document.body.dataset['activeProduct'] = p.id;
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      gsap.to(document.body, { backgroundColor: '#080808', duration: 0.5, overwrite: 'auto' });
      delete document.body.dataset['activeProduct'];
    };
  }, []);

  return (
    <div id="products-mobile" ref={containerRef} style={{ position: 'relative' }}>
      {products.map((product, i) => (
        <div
          id={`mobile-product-${product.id}`}
          key={product.id}
          style={{
            minHeight: '100dvh', // Natural flow, grows to fit contents safely
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(5rem, 10vh, 7rem) 1.5rem 4rem',
            borderBottom: i === products.length - 1 ? 'none' : '1px solid var(--border)',
          }}
        >
          {/* Section 1: Hero Identity */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span className="label" style={{ color: 'var(--muted)' }}>
                {String(i + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: product.color }}></div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(3.5rem, 18vw, 6rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: product.color,
                marginBottom: '1rem',
              }}
            >
              {product.name}
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.5, color: 'var(--muted)', marginBottom: '2rem' }}>
              {product.tagline}
            </p>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {product.flavours.map((f) => (
                <span
                  key={f}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    color: product.color,
                    border: `1px solid ${product.color}40`,
                    background: `${product.color}0d`,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {product.benefits.map((b, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: product.color, marginTop: '0.5rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--white)', lineHeight: 1.4 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Science details (static un-animated list on mobile) */}
          <div style={{ paddingTop: '2.5rem', borderTop: '1px dotted var(--border-light)' }}>
            <span className="label" style={{ display: 'block', marginBottom: '1.5rem', color: product.color }}>
              The Science
            </span>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: '3rem' }}>
              {product.description}
            </p>

            <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>
              Key Ingredients
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {product.ingredients.map((ing, idx) => (
                <div key={idx} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.95rem', color: 'var(--white)', marginBottom: '0.4rem' }}>
                    {ing.name}
                  </div>
                  <div className="label" style={{ lineHeight: 1.4 }}>{ing.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN EXPORT (RESPONSIVE SWITCHER)
// ─────────────────────────────────────────────────────────
export default function ProductShowcase() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial read
    setMounted(true);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Avoid hydration issues by waiting for mount
  if (!mounted) return null;

  return isMobile ? <MobileProductShowcase /> : <DesktopProductShowcase />;
}
