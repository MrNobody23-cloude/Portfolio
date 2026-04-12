import React, { useState } from 'react';
import { Menu, X, Home, User, Code, Briefcase, Award, Mail, Rocket } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail }
];

function Navigation({ houseTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const houseStyles = {
    Gryffindor: { color: '#740001', accent: '#D4AF37', text: '#f4e4bc', glow: 'rgba(116, 0, 1, 0.4)' },
    Slytherin: { color: '#1A472A', accent: '#AAAAAA', text: '#e5e2e1', glow: 'rgba(26, 71, 42, 0.4)' },
    Hufflepuff: { color: '#ECB939', accent: '#000000', text: '#f4e4bc', glow: 'rgba(236, 185, 57, 0.2)' },
    Ravenclaw: { color: '#0E1A40', accent: '#946B2D', text: '#e5e2e1', glow: 'rgba(14, 26, 64, 0.4)' }
  };

  const currentHouse = houseStyles[houseTheme] || houseStyles.Gryffindor;

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? 'glass-panel-heavy border-b border-[#D4AF37]/20 py-2'
      : 'bg-transparent py-4'
      }`} style={{ borderBottomColor: scrolled ? `${currentHouse.accent}33` : 'transparent' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Celestial Logo */}
          <div
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full glass-panel border-[#D4AF37]/30 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700 shadow-[0_0_15px_rgba(212,175,55,0.2)]" style={{ borderColor: `${currentHouse.accent}4D`, boxShadow: `0 0 15px ${currentHouse.accent}33` }}>
                <Rocket className="w-6 h-6 group-hover:animate-pulse" style={{ color: currentHouse.accent }} />
                <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20" style={{ borderColor: `${currentHouse.text}1A` }}></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-harry tracking-widest group-hover:glow-gold transition-all duration-300" style={{ color: currentHouse.accent, textShadow: activeSection === 'hero' ? `0 0 10px ${currentHouse.accent}` : 'none' }}>
                Aaryan Patel
              </span>
              <span className="text-[10px] text-[#99907c] uppercase tracking-[0.3em] font-cinzel">Celestial Architect</span>
            </div>
          </div>

          {/* Desktop Navigation - The Glass Bridge Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-full border border-white/5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase font-cinzel ${activeSection === item.id
                    ? 'text-black scale-105'
                    : 'text-[#d0c5af] hover:text-white hover:bg-white/10'
                    }`}
                  style={{ 
                    backgroundColor: activeSection === item.id ? currentHouse.accent : 'transparent',
                    boxShadow: activeSection === item.id ? `0 0 20px ${currentHouse.accent}66` : 'none'
                  }}
                >
                  <span className="flex items-center relative z-10">
                    <item.icon className={`w-3.5 h-3.5 mr-2 ${activeSection === item.id ? 'text-black' : ''}`} style={{ color: activeSection === item.id ? 'black' : currentHouse.accent }} />
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative hover:text-white focus:outline-none p-3 rounded-full glass-panel border-[#D4AF37]/20 transition-all duration-300"
              style={{ color: currentHouse.accent, borderColor: `${currentHouse.accent}33` }}
            >
              <div className="relative z-10">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - The Floating Scroll */}
      {isOpen && (
        <div className="md:hidden glass-panel-heavy border-t border-[#D4AF37]/20 m-4 rounded-3xl overflow-hidden animate-scale-in" style={{ borderTopColor: `${currentHouse.accent}33` }}>
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group block w-full text-left px-6 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all duration-300 font-cinzel ${activeSection === item.id
                  ? 'text-black'
                  : 'text-[#d0c5af] hover:bg-white/5'
                  }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  backgroundColor: activeSection === item.id ? currentHouse.accent : 'transparent'
                }}
              >
                <span className="flex items-center">
                  <item.icon className={`w-4 h-4 mr-4 ${activeSection === item.id ? 'text-black' : ''}`} style={{ color: activeSection === item.id ? 'black' : currentHouse.accent }} />
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;