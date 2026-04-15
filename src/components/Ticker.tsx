export default function Ticker() {
  const content = [
    'GOOD THINGS, QUIETLY',
    'LAUNCHING 2026',
    'LIQUID NUTRITION',
    'NO COMPROMISE',
    'HONEST INGREDIENTS',
    'EXTRAORDINARY TASTE',
    'FOUR FORMULAS',
    'FOUR LIFE MOMENTS',
  ];

  // Duplicate for seamless loop
  const items = [...content, ...content];

  return (
    <div
      style={{
        height: '32px',
        background: 'var(--black)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        className="ticker-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5rem',
              paddingRight: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              color: 'var(--muted)',
            }}
          >
            {item}
            <span style={{ color: 'var(--focus)', fontSize: '8px' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
