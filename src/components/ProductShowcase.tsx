import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

// Maps product id → tinted dark body background colour (18% product + 82% base black #080808)
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
      style={{
        height: '260px',
        overflow: 'hidden',
        position: 'relative',
        // CSS mask fades top/bottom — fully colour-independent, no black-bar artefacts
        maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
      }}
    >
      <div className="crawl-track">
        {items.map((ing, i) => (
          <div
            key={i}
            style={{
              padding: '1rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: 'var(--white)',
                marginBottom: '0.2rem',
              }}
            >
              {ing.name}
            </div>
            <div className="label">{ing.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const panels = panelsRef.current;
    if (!container || !panels) return;

    const ctx = gsap.context(() => {
      // Pin the container and scrub through panels
      const totalPanels = products.length;

      ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: 'top top',
        end: `+=${totalPanels * 100}vh`,
        scrub: 0.5,  // snappier — more Apple-like
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * totalPanels),
            totalPanels - 1
          );

          setActiveIndex(idx);

          // Animate body background — fast, snappy, Apple-style
          gsap.to(document.body, {
            backgroundColor: bodyTintMap[products[idx].id],
            duration: 0.7,
            ease: 'power3.out',
            overwrite: 'auto',
          });

          // Signal cursor which product is active
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
    <section id="products" ref={containerRef} style={{ height: '100vh', position: 'relative' }}>
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
        {/* LEFT — Product identity */}
        <div
          style={{
            padding: 'clamp(3rem, 8vh, 6rem) clamp(1.5rem, 5vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            borderRight: '1px solid var(--border)',
          }}
        >
          {/* Product counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            {products.map((p, i) => (
              <div
                key={p.id}
                style={{
                  width: i === activeIndex ? '24px' : '6px',
                  height: '2px',
                  borderRadius: '1px',
                  background: i === activeIndex ? product.color : 'var(--border)',
                  transition: 'all 0.4s ease',
                }}
              />
            ))}
            <span className="label" style={{ marginLeft: '0.5rem' }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
          </div>

          {/* Enormous product name */}
          <div
            key={product.id + '-name'}
            className="product-name-enter"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(5rem, 13vw, 14rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              color: product.color,
              transition: 'color 0.5s ease',
              marginBottom: '1.5rem',
            }}
          >
            {product.name}
          </div>

          {/* Tagline */}
          <p
            key={product.id + '-tagline'}
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'var(--muted)',
              maxWidth: '400px',
              marginBottom: '2.5rem',
            }}
          >
            {product.tagline}
          </p>

          {/* Flavour pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {product.flavours.map((f) => (
              <span
                key={f}
                style={{
                  display: 'inline-block',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: product.color,
                  border: `1px solid ${product.color}40`,
                  background: `${product.color}0d`,
                  transition: 'all 0.4s ease',
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Benefits list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {product.benefits.map((b, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: product.color,
                    flexShrink: 0,
                    transition: 'background 0.4s ease',
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--white)', lineHeight: 1.4 }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Ingredients + nav */}
        <div
          style={{
            padding: 'clamp(3rem, 8vh, 6rem) clamp(1.5rem, 5vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(3rem, 6vh, 6rem)',
            height: '100%',
          }}
        >
          {/* Top: section label + description */}
          <div>
            <div style={{ marginBottom: '3rem' }}>
              <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
                The science
              </span>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '420px' }}>
                {product.description}
              </p>
            </div>

            {/* Ingredient crawl */}
            <div style={{ marginBottom: '2rem' }}>
              <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
                Key ingredients
              </span>
              <IngredientCrawl ingredients={product.ingredients} />
            </div>
          </div>

          {/* Bottom: scroll instruction */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '1px',
                background: 'var(--muted)',
              }}
            />
            <span className="label">Scroll to explore each formula</span>
          </div>
        </div>

        {/* Bottom: product format bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--border)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${((activeIndex + 1) / products.length) * 100}%`,
              background: product.color,
              transition: 'width 0.6s ease, background 0.5s ease',
            }}
          />
        </div>
      </div>
    </section>
  );
}
