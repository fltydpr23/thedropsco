import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PRODUCT_COLORS: Record<string, string> = {
  focus: '#D4E84A',
  body:  '#C6733A',
  cycle: '#F23B6F',
  daily: '#4ECDC4',
};

const DEFAULT_COLOR = '#F0EDE8';

// Teardrop — tip at top-centre (20,2) is the click hotspot
const DROP_PATH = 'M20,2 C20,2 4,20 4,33 C4,43.5 11,50 20,50 C29,50 36,43.5 36,33 C36,20 20,2 20,2 Z';

export default function Cursor() {
  const svgRef   = useRef<SVGSVGElement>(null);
  const pathRef  = useRef<SVGPathElement>(null);
  const posRef   = useRef({ x: -300, y: -300 });
  const colorRef = useRef(DEFAULT_COLOR);
  const visRef   = useRef(false);

  useEffect(() => {
    // Track mouse
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visRef.current) {
        visRef.current = true;
        gsap.to(svgRef.current, { opacity: 1, duration: 0.25 });
      }
    };
    const onLeave = () => {
      visRef.current = false;
      gsap.to(svgRef.current, { opacity: 0, duration: 0.25 });
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    let raf: number;

    const tick = () => {
      // ── Position ──────────────────────────────────────────────
      if (svgRef.current && visRef.current) {
        const { x, y } = posRef.current;
        // SVG is 24×34; tip is at top-center → offset x-12, y-1
        svgRef.current.style.transform = `translate(${x - 12}px, ${y - 1}px)`;
      }

      // ── Colour from active product ─────────────────────────────
      const prod    = document.body.dataset['activeProduct'];
      const target  = prod ? (PRODUCT_COLORS[prod] ?? DEFAULT_COLOR) : DEFAULT_COLOR;

      if (target !== colorRef.current && pathRef.current) {
        colorRef.current = target;
        // Use attr tween so GSAP writes the SVG attribute (not just inline CSS)
        gsap.to(pathRef.current, {
          attr: { fill: target },
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="24"
      height="34"
      viewBox="0 0 40 52"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0,
        overflow: 'visible',
        willChange: 'transform',
      }}
    >
      <path
        ref={pathRef}
        d={DROP_PATH}
        fill={DEFAULT_COLOR}
      />
      {/* Specular highlight */}
      <path
        d="M13,16 C11,21 11,27 12,32"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
