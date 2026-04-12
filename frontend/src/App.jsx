import React, { useEffect, useState, useMemo } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GhostCursor from './components/GhostCursor';

const houseStyles = {
  Gryffindor: { color: '#740001', accent: '#D4AF37', text: '#f4e4bc', glow: 'rgba(116, 0, 1, 0.4)' },
  Slytherin: { color: '#1A472A', accent: '#AAAAAA', text: '#e5e2e1', glow: 'rgba(26, 71, 42, 0.4)' },
  Hufflepuff: { color: '#ECB939', accent: '#000000', text: '#f4e4bc', glow: 'rgba(236, 185, 57, 0.2)' },
  Ravenclaw: { color: '#0E1A40', accent: '#946B2D', text: '#e5e2e1', glow: 'rgba(14, 26, 64, 0.4)' }
};

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [houseTheme, setHouseTheme] = useState(() => {
    return localStorage.getItem('houseTheme') || 'Gryffindor';
  });

  const activeStyle = useMemo(() => houseStyles[houseTheme], [houseTheme]);

  useEffect(() => {
    localStorage.setItem('houseTheme', houseTheme);
  }, [houseTheme]);

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

  const toggleTheme = () => {
    const themes = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
    const currentIndex = themes.indexOf(houseTheme);
    setHouseTheme(currentIndex === 3 ? themes[0] : themes[currentIndex + 1]);
  };

  return (
    <div 
      className="bg-[#050505] relative overflow-hidden min-h-screen selection:bg-[var(--accent-color)]/30 selection:text-white transition-colors duration-1000"
      style={{
        '--house-color': activeStyle.color,
        '--accent-color': activeStyle.accent,
        '--text-theme': activeStyle.text,
        '--glow-color': activeStyle.glow,
      }}
    >
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
          className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[120px] pointer-events-none transition-all duration-1000"
          style={{ 
            background: `var(--house-color)`,
            opacity: 0.05,
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)` 
          }}
        ></div>
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] pointer-events-none transition-all duration-1000"
          style={{ 
            background: `var(--accent-color)`,
            opacity: 0.03,
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` 
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <GhostCursor color={activeStyle.accent} />
        <Navigation houseTheme={houseTheme} />
        <main>
          <Hero houseTheme={houseTheme} toggleTheme={toggleTheme} />
          <About houseTheme={houseTheme} />
          <Skills houseTheme={houseTheme} />
          <Projects houseTheme={houseTheme} />
          <Experience houseTheme={houseTheme} />
          <Contact houseTheme={houseTheme} />
        </main>
        <Footer houseTheme={houseTheme} />
      </div>
    </div>
  );
}

export default App;