import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Heart, Rocket } from 'lucide-react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="section-dark py-16 relative overflow-hidden border-t border-[#D4AF37]/20">
      {/* Starfield */}
      <div className="absolute inset-0 opacity-30">
        <div className="stars"></div>
      </div>

      {/* Subtle Ambient Light */}
      <div className="absolute top-10 right-20 w-20 h-20 rounded-full bg-white/[0.02] blur-2xl"></div>
      <div className="absolute bottom-10 left-20 w-16 h-16 rounded-full bg-white/[0.015] blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-white/20">
                <Rocket className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-2xl text-white font-harry">Aaryan Patel</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Full Stack Developer exploring the infinite possibilities of the digital cosmos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/MrNobody23-cloude"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 space-card rounded-lg hover:scale-110 transition-all duration-300 border border-[#D4AF37]/20"
              >
                <Github className="w-5 h-5 text-[#D4AF37]" />
              </a>
              <a
                href="https://www.linkedin.com/in/aaryan-patel-9869962a2/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 space-card rounded-lg hover:scale-110 transition-all duration-300 border border-cyan-500/20"
              >
                <Linkedin className="w-5 h-5 text-cyan-300" />
              </a>
              <a
                href="mailto:aaryanpatel080@gmail.com"
                className="p-3 space-card rounded-lg hover:scale-110 transition-all duration-300 border border-pink-500/20"
              >
                <Mail className="w-5 h-5 text-pink-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Navigation</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#hero" className="hover:text-[#D4AF37] transition-colors flex items-center group">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2 group-hover:animate-pulse"></span>
                Home
              </a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors flex items-center group">
                <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2 group-hover:animate-pulse"></span>
                About
              </a></li>
              <li><a href="#skills" className="hover:text-[#D4AF37] transition-colors flex items-center group">
                <span className="w-2 h-2 rounded-full bg-pink-500 mr-2 group-hover:animate-pulse"></span>
                Skills
              </a></li>
              <li><a href="#projects" className="hover:text-[#D4AF37] transition-colors flex items-center group">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 group-hover:animate-pulse"></span>
                Projects
              </a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors flex items-center group">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 group-hover:animate-pulse"></span>
                Contact
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Contact</h4>
            <p className="text-gray-400 mb-4">
              Open to collaborations and new projects.
            </p>
            <a href="mailto:aaryanpatel080@gmail.com" className="text-[#D4AF37] hover:text-[#F4C430] transition-colors glow-gold">
              aaryanpatel080@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
            © {new Date().getFullYear()} Aaryan Patel. Crafted with <Heart className="w-4 h-4 inline text-pink-500 mx-1 animate-pulse" /> across the cosmos
          </p>
          <button
            onClick={scrollToTop}
            className="p-4 space-card rounded-xl hover:scale-110 transition-all duration-300 group border border-[#D4AF37]/30 animate-pulse-glow"
          >
            <ArrowUp className="w-5 h-5 text-[#D4AF37] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;