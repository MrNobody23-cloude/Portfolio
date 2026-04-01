import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Heart, Rocket } from 'lucide-react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (

    <footer className="relative py-24 overflow-hidden bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand - The Archivist Label */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass-panel-heavy rounded-2xl flex items-center justify-center border-[#D4AF37]/20 box-glow-gold">
                <Rocket className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-3xl text-white font-cinzel leading-none tracking-tighter">Aaryan <span className="text-[#D4AF37]">Patel</span></h3>
                <p className="text-[10px] font-bold text-[#99907c] tracking-[0.4em] uppercase font-cinzel mt-2">Celestial Archivist</p>
              </div>
            </div>
            <p className="text-lg text-[#99907c] font-serif italic max-w-md leading-relaxed">
              "Mapping the infinite constellations of the digital void, one manifestation at a time. The archive remains eternal."
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/MrNobody23-cloude", color: "white" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/aaryan-patel-9869962a2/", color: "gold" },
                { icon: Mail, href: "mailto:aaryanpatel080@gmail.com", color: "red" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center border-white/5 hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-1 hover:box-glow-gold group"
                >
                  <social.icon className="w-5 h-5 text-[#d0c5af] group-hover:text-[#D4AF37] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation - The Gilded Pathways */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold text-[#D4AF37] tracking-[0.4em] uppercase font-cinzel">Pathways</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-[#99907c] hover:text-[#D4AF37] transition-all duration-500 font-cinzel text-sm tracking-widest flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#D4AF37] mr-0 group-hover:mr-3 transition-all duration-500"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Pulse - The Quick Reach */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold text-[#D4AF37] tracking-[0.4em] uppercase font-cinzel">Quick Reach</h4>
            <p className="text-[#99907c] font-serif italic leading-relaxed">
              Open to cosmic collaborations and architectural explorations.
            </p>
            <a 
              href="mailto:aaryanpatel080@gmail.com" 
              className="block text-white font-cinzel tracking-widest hover:text-[#D4AF37] transition-colors overflow-hidden text-ellipsis"
            >
              aaryanpatel080@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar - The Final Seal */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-[#666] tracking-[0.3em] uppercase font-cinzel flex items-center">
            © {new Date().getFullYear()} <span className="text-[#D4AF37] mx-2">Aaryan Patel</span> • Sealed with <Heart className="w-3 h-3 text-[#740001] mx-2 animate-pulse" /> across the eons
          </p>
          
          <button
            onClick={scrollToTop}
            className="group relative flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 glass-panel-heavy rounded-full flex items-center justify-center border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-all duration-700 box-glow-gold hover:scale-110">
              <ArrowUp className="w-5 h-5 text-[#D4AF37] group-hover:-translate-y-1 transition-transform" />
            </div>
            <span className="text-[8px] font-bold text-[#99907c] tracking-[0.4em] uppercase font-cinzel opacity-0 group-hover:opacity-100 transition-opacity">Return to Origin</span>
          </button>
        </div>
      </div>
      
      {/* Decorative Final Rune */}
      <div className="absolute -bottom-20 -right-20 text-[300px] font-harry text-[#D4AF37]/5 pointer-events-none select-none rotate-12">
        Fin
      </div>
    </footer>

  );
}

export default Footer;