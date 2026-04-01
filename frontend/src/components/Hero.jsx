import React, { useState, useEffect } from 'react';
import { Sparkles, Wand2, ArrowRight, Download, Mail, Github, Linkedin, BookOpen, Star, Flame, ScrollText, ShieldCheck, Landmark } from 'lucide-react';
import AaryanPatel_Resume from '../MyInfo/AaryanPatel_Resume.pdf';

const Hero = () => {
  const scrollTo = (id) => {
    window.scrollTo({ top: id, behavior: 'smooth' });
  };
  const [houseTheme, setHouseTheme] = useState('Gryffindor');
  const [scrollPresence, setScrollPresence] = useState(0);
  const [activeSeal, setActiveSeal] = useState(null);

  const houseStyles = {
    Gryffindor: { color: '#740001', accent: '#D4AF37', text: '#f4e4bc', glow: 'rgba(116, 0, 1, 0.4)' },
    Slytherin: { color: '#1A472A', accent: '#AAAAAA', text: '#e5e2e1', glow: 'rgba(26, 71, 42, 0.4)' },
    Hufflepuff: { color: '#ECB939', accent: '#000000', text: '#f4e4bc', glow: 'rgba(236, 185, 57, 0.2)' },
    Ravenclaw: { color: '#0E1A40', accent: '#946B2D', text: '#e5e2e1', glow: 'rgba(14, 26, 64, 0.4)' }
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPresence(position);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const themes = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
    const currentIndex = themes.indexOf(houseTheme);
    setHouseTheme(currentIndex === 3 ? themes[0] : themes[currentIndex + 1]);
  };

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-20 px-6 bg-[#050505] transition-all duration-1000">

      {/* Background: Starfield and Faint Nebula */}
      <div className="starfield-v2" />
      <div className="stars-v2" />

      {/* Ambient Depth (Parallax Ink Smudges) */}
      <div className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out z-0 opacity-20"
        style={{ transform: `translateY(${scrollPresence * 0.15}px)` }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#740001] rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37] opacity-40 rounded-full blur-[180px] animate-pulse delay-1000"></div>
      </div>


      {/* Main Dossier (The "Black Parchment" Glass Panel) */}
      <div className="container mx-auto max-w-5xl relative z-10">
        <div
          className="relative glass-panel-heavy border-white/5 rounded-sm p-12 sm:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-1000"
          style={{
            borderLeft: `8px solid ${houseStyles[houseTheme].color}`,
            background: 'linear-gradient(135deg, rgba(14,14,14,0.9) 0%, rgba(5,5,5,0.95) 100%)',
          }}
        >
          <div className="absolute top-10 right-10 z-[100]">
            <button
              onClick={toggleTheme}
              className="group relative w-14 h-14 rounded-full glass-panel border-[#D4AF37]/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <Wand2 className="w-6 h-6 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <div className="absolute -inset-1 border border-[#D4AF37]/10 rounded-full animate-spin-slow"></div>
              {/* Tooltip */}
              <span className="absolute right-full mr-4 px-3 py-1 bg-[#1a1a1a] border border-[#D4AF37]/20 text-[#f4e4bc] font-cinzel text-[8px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Switch Resonance: {houseTheme}
              </span>
            </button>
          </div>

          {/* Title Section (Enchanted Ink Shimmer) */}
          <div className="space-y-6 pt-10">
            <div className="relative inline-block group">
              <h1
                className="text-6xl sm:text-9xl font-harry leading-[0.85] text-transparent bg-clip-text transition-all duration-1000"
                style={{
                  backgroundImage: `linear-gradient(to right, ${houseStyles[houseTheme].color}, #f4e4bc, ${houseStyles[houseTheme].color})`,
                  backgroundSize: '200% auto',
                  animation: 'shine 5s linear infinite'
                }}
              >
                Aaryan Patel
              </h1>
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4 opacity-30 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="flex items-center gap-6 justify-center sm:justify-start">
              <p className="text-3xl sm:text-4xl font-cinzel font-bold tracking-[0.4em] uppercase text-[#D4AF37] glow-gold">Digital Curator</p>
              <div className="flex-1 h-[1px] bg-white/5 hidden sm:block"></div>
            </div>
          </div>

          {/* Description (Scholarly Inked Text) */}
          <div className="grid lg:grid-cols-[1fr_200px] gap-12 mt-16 pb-16">
            <div className="space-y-12">
              <p className="text-xl sm:text-2xl leading-relaxed font-serif italic text-white/80 first-letter:text-6xl first-letter:font-harry first-letter:mr-2 family">
                "This dossier documents the alchemical evolution of a Digital Curator. Access to these records reveals a master of UI magic, one who casts scripts into the ether to forge immersive architectural wonders across the software abyss. Proceed with focused intent."
              </p>

              {/* VISI T ARCHIVE Action (Lumos Pulse Button) */}
              <div className="flex flex-wrap gap-8 items-center justify-center sm:justify-start">
                <a
                  href={AaryanPatel_Resume}
                  download
                  className="flex items-center gap-4 px-12 py-7 border border-white/10 text-[#f4e4bc] font-serif uppercase text-[10px] tracking-[0.5em] hover:bg-white/5 transition-all shadow-xl"
                >
                  <Download className="w-5 h-5 opacity-40" />
                  Download Resume
                </a>
              </div>
            </div>

            {/* Side Stamps/Metadata */}
            <div className="flex flex-col gap-8 opacity-40 items-center lg:items-end sm:text-right hidden sm:flex">
              <div className="w-32 h-32 border-2 border-dashed border-[#D4AF37]/40 rounded-full flex items-center justify-center rotate-12">
                <span className="font-cinzel text-[7px] text-center tracking-widest uppercase">Verified by<br />Archmage <br />Aaryan Patel</span>
              </div>
            </div>
          </div>

          {/* Wax Links Section (Dark Aged Wax) */}
          <div className="border-t border-white/5 pt-16 flex flex-wrap justify-center sm:justify-start gap-12 sm:gap-20">
            {seals.map((seal) => (
              <div
                key={seal.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveSeal(seal.id)}
                onMouseLeave={() => setActiveSeal(null)}
                onClick={() => scrollTo(seal.no)}
              >
                {/* The Aged Wax Seal */}
                <div
                  className="w-20 h-20 bg-[#1a0f08] border-2 border-white/10 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 overflow-hidden relative"
                  style={{ borderLeftColor: houseStyles[houseTheme].color, borderTopColor: houseStyles[houseTheme].color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#740001]/20 to-transparent"></div>
                  <seal.icon className="w-8 h-8 transition-colors duration-500" style={{ color: activeSeal === seal.id ? '#D4AF37' : '#D4AF3750' }} />
                  {/* Interaction Glow */}
                  <div className={`absolute inset-0 bg-[#D4AF37]/10 transition-opacity ${activeSeal === seal.id ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                <p className="mt-4 font-harry text-xl text-[#D4AF37] text-center tracking-widest group-hover:text-white transition-colors uppercase">{seal.label}</p>

                {/* Floating Memory Scroll */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 w-48 mb-8 p-5 bg-[#131313] border border-[#D4AF37]/30 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-700 pointer-events-none
                     ${activeSeal === seal.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#131313] border-r border-b border-[#D4AF37]/30 rotate-45"></div>
                  <h4 className="font-harry text-xl text-[#D4AF37] mb-2">{seal.label}</h4>
                  <p className="font-serif text-[11px] text-white/60 leading-relaxed italic">{seal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const seals = [
  { id: 'skills', no: 5000, label: 'Knowledge', desc: 'Deciphering the arcane structures of software engineering and interface design.', icon: BookOpen },
  { id: 'projects', no: 6500, label: 'Spells', desc: 'A curated index of functional alchemical artifacts created for the digital realm.', icon: ScrollText },
  { id: 'contact', no: 10800, label: 'Messenger', desc: 'Secure transmission lines for inquiries related to high-fidelity webcraft.', icon: Mail }
];

export default Hero;