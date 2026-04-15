import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      style={{
        padding: 'clamp(6rem, 14vh, 12rem) 0',
        backgroundColor: 'var(--black)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Background accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '80px',
          background: 'linear-gradient(to bottom, var(--focus), transparent)',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div
          ref={contentRef}
          style={{
            opacity: 0,
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Label */}
          <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>
            Launching 2026
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            Join the drop.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--muted)',
              marginBottom: '3rem',
              lineHeight: 1.65,
            }}
          >
            Be first. Get early access and launch pricing.
          </p>

          {submitted ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                borderRadius: 'var(--r-pill)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--focus)',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.9rem' }}>
                You're on the list. Good things coming.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '0.5rem',
                maxWidth: '480px',
                margin: '0 auto',
                padding: '0.35rem 0.35rem 0.35rem 1.25rem',
                borderRadius: 'var(--r-pill)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={() => {}}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.65rem 1.5rem', borderRadius: 'var(--r-pill)' }}
              >
                Join
              </button>
            </form>
          )}

          {error && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--cycle)' }}>
              {error}
            </p>
          )}

          {/* Fine print */}
          <p
            style={{
              marginTop: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
            }}
          >
            No spam. No selling your data. Just the drop.
          </p>
        </div>
      </div>
    </section>
  );
}
