import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import Ticker from './components/Ticker';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import ScienceSection from './components/ScienceSection';
import AboutSection from './components/AboutSection';
import WaitlistSection from './components/WaitlistSection';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showContent, setShowContent]   = useState(false);
  const [contentFaded, setContentFaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Called when intro iris wipe completes — mount the site, then fade it in
  const handleIntroComplete = () => {
    setShowContent(true);
    // Two RAF cycles to let React render the content before fading it in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setContentFaded(true);
        setTimeout(() => ScrollTrigger.refresh(), 600);
      });
    });
  };

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      <Cursor />

      {/* Site content — mounted after intro, faded in gradually */}
      {showContent && (
        <div
          ref={mainRef}
          style={{
            opacity: contentFaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <Ticker />
          <Navbar />
          <main>
            <Hero />
            <ProductShowcase />
            <ScienceSection />
            <AboutSection />
            <WaitlistSection />
          </main>
          <Footer />
        </div>
      )}

      {/* Intro overlay — always rendered, removes itself from DOM when done */}
      <IntroScreen onComplete={handleIntroComplete} />
    </>
  );
}
