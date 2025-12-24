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
    <div className="bg-black relative overflow-hidden">
      {/* Global Subtle Background Layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle Star Layer */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        >
          <div className="stars"></div>
        </div>

        {/* Secondary Star Layer */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) translateY(${scrollY * 0.05}px)`
          }}
        >
          <div className="stars stars-layer-2"></div>
        </div>

        {/* Subtle Ambient Gradient */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[150px]"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
          }}
        ></div>

        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[120px]"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <GhostCursor />
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;