import { useState } from 'react';
import Modal from './Modal';
import { legalData, faqData } from '../data/legal';

const footerLinks = {
  Formulas: ['Focus', 'Body', 'Cycle', 'Daily'],
  Company: ['Our Story', 'Science', 'FAQ', 'Press'],
  Legal: ['Privacy', 'Terms', 'Cookies'],
};

const socials = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    if (['FAQ', 'Privacy', 'Terms', 'Cookies'].includes(link)) {
      e.preventDefault();
      setActiveModal(link);
    }
  };

  const renderModalContent = () => {
    if (!activeModal) return null;

    if (activeModal === 'FAQ') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {faqData.map((faq, i) => (
            <div key={i}>
              <h4 style={{ color: 'var(--white)', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 500 }}>
                {faq.question}
              </h4>
              <p style={{ margin: 0 }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      );
    }

    const legalInfo = legalData[activeModal];
    if (legalInfo) {
      return (
        <div className="legal-content">
          {legalInfo.content}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--black)',
          padding: 'clamp(3rem, 6vh, 5rem) 0 2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container">
          {/* Main grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr repeat(3, 1fr)',
              gap: '3rem',
              paddingBottom: '3rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  color: 'var(--white)',
                  letterSpacing: '0.02em',
                  marginBottom: '0.75rem',
                }}
              >
                the drops co
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--muted)',
                  lineHeight: 1.65,
                  maxWidth: '220px',
                  marginBottom: '1.5rem',
                }}
              >
                Liquid nutrition. Honest ingredients. Extraordinary taste.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                      transition: 'color 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--white)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([col, links]) => (
              <div key={col}>
                <span className="label" style={{ display: 'block', marginBottom: '1.25rem' }}>
                  {col}
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href={['FAQ', 'Privacy', 'Terms', 'Cookies'].includes(link) ? '#' : `#${link.toLowerCase().replace(' ', '-')}`}
                        onClick={(e) => handleLinkClick(e, link)}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--muted)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--white)')}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--muted)')}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div
            style={{
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
              }}
            >
              © 2026 The Drops Co · Good things, quietly.
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--subtle)',
              }}
            >
              BENGALURU, IN · Liquid Nutrition
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        title={activeModal === 'FAQ' ? 'Frequently Asked Questions' : (legalData[activeModal || '']?.title || '')}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
}
