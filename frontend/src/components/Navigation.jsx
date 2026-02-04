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

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
      ? 'space-card backdrop-blur-lg border-b border-white/10'
      : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Rocket */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 border border-white/20">
                <Rocket className="w-6 h-6 text-white/80 group-hover:animate-bounce" />
              </div>
            </div>
            <div>
              <span className="text-2xl text-white group-hover:text-gray-300 transition-colors duration-300 font-harry">
                Aaryan Patel
              </span>
              <div className="text-xs text-gray-400">Software Engineer</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${activeSection === item.id
                    ? 'space-card border border-[#D4AF37]/50 text-white'
                    : 'text-gray-300 hover:text-white hover:space-card border border-transparent'
                    }`}
                >
                  <span className="flex items-center relative z-10">
                    <item.icon className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-cosmic rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative text-gray-300 hover:text-white focus:outline-none p-3 rounded-xl hover:space-card transition-all duration-300 border border-[#D4AF37]/20"
            >
              <div className="relative z-10">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden space-card border-t border-[#D4AF37]/30">
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group block w-full text-left px-5 py-4 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${activeSection === item.id
                  ? 'space-card border border-[#D4AF37]/50 text-white'
                  : 'text-gray-300 hover:text-white hover:space-card border border-transparent'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3 group-hover:animate-pulse" />
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