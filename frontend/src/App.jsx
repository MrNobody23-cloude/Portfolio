import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GhostCursor from './components/GhostCursor';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-[#050505] relative overflow-hidden min-h-screen selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Celestial Background Layers */}
      <div className="starfield-v2">
        <div className="stars-v2"></div>

        {/* Animated Gold Dust Particles */}
        <div className="gold-dust" style={{ left: '10%', animationDelay: '0s' }}></div>
        <div className="gold-dust" style={{ left: '30%', animationDelay: '5s' }}></div>
        <div className="gold-dust" style={{ left: '50%', animationDelay: '2s' }}></div>
        <div className="gold-dust" style={{ left: '70%', animationDelay: '8s' }}></div>
        <div className="gold-dust" style={{ left: '90%', animationDelay: '3s' }}></div>
        <div className="gold-dust" style={{ left: '20%', animationDelay: '7s', bottom: '0', top: 'auto', animationDirection: 'reverse' }}></div>
        <div className="gold-dust" style={{ left: '80%', animationDelay: '1s', bottom: '0', top: 'auto', animationDirection: 'reverse' }}></div>

        {/* Nebula Glows */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#740001]/[0.05] blur-[120px] pointer-events-none"
          style={{ transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)` }}
        ></div>
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4AF37]/[0.03] blur-[100px] pointer-events-none"
          style={{ transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <GhostCursor />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;