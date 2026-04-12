import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Building, Rocket } from 'lucide-react';

function Experience({ houseTheme }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleExperiences, setVisibleExperiences] = useState(new Set());
  const experienceRefs = useRef([]);

  const houseStyles = {
    Gryffindor: { color: '#740001', accent: '#D4AF37', text: '#f4e4bc', glow: 'rgba(116, 0, 1, 0.4)' },
    Slytherin: { color: '#1A472A', accent: '#AAAAAA', text: '#e5e2e1', glow: 'rgba(26, 71, 42, 0.4)' },
    Hufflepuff: { color: '#ECB939', accent: '#000000', text: '#f4e4bc', glow: 'rgba(236, 185, 57, 0.2)' },
    Ravenclaw: { color: '#0E1A40', accent: '#946B2D', text: '#e5e2e1', glow: 'rgba(14, 26, 64, 0.4)' }
  };

  const currentHouse = houseStyles[houseTheme] || houseStyles.Gryffindor;

  // Fetch experience from backend
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/experience`);
        if (!response.ok) throw new Error('Failed to fetch experience');
        const data = await response.json();
        setExperiences(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  useEffect(() => {
    if (experiences.length === 0) return; // Don't set up observers until experiences are loaded

    const observers = [];

    experienceRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleExperiences(prev => new Set([...prev, index]));
            } else {
              setVisibleExperiences(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }
          },
          { threshold: 0.3 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [experiences]); // Add experiences as dependency

  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header - The Chronology of Eons */}
        <div className="text-center mb-32">
          <div className="inline-flex items-center px-6 py-2 rounded-full glass-panel border-[#D4AF37]/20 mb-8" style={{ borderColor: `${currentHouse.accent}33` }}>
            <Calendar className="w-4 h-4 mr-3" style={{ color: currentHouse.accent }} />
            <span className="text-xs font-bold tracking-[0.4em] uppercase font-cinzel" style={{ color: currentHouse.text }}>The Chronology of Eons</span>
          </div>
          <h2 className="text-6xl md:text-7xl text-white mb-8 font-harry tracking-tight leading-none">
            Journey Through <span className="text-reveal transition-all duration-1000" style={{ backgroundImage: `linear-gradient(to right, ${currentHouse.accent}, ${currentHouse.text})`, textShadow: `0 0 20px ${currentHouse.accent}66` }}>Space-Time</span>
          </h2>
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" style={{ backgroundImage: `linear-gradient(to right, transparent, ${currentHouse.accent}, transparent)` }}></div>
          <p className="text-xl text-[#99907c] mt-10 max-w-2xl mx-auto font-serif italic">
            "A scroll of past manifestations, documented in the great archive of professional excellence."
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-20 h-20 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-8" style={{ borderColor: `${currentHouse.accent}33`, borderTopColor: currentHouse.accent }}></div>
            <p className="text-[#D4AF37] font-harry text-2xl tracking-widest animate-pulse" style={{ color: currentHouse.accent }}>Reading the Scrolls...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20 px-8 glass-panel rounded-3xl border-[#740001]/30">
            <p className="text-[#AE0001] text-xl font-bold font-cinzel">The Timeline is Shattered</p>
            <p className="text-[#99907c] mt-4 font-serif italic">{error}</p>
          </div>
        )}

        {/* Timeline - The Celestial Path */}
        {!loading && !error && experiences.length > 0 && (
          <div className="max-w-5xl mx-auto relative">
            {/* Main Path Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent transform -translate-x-1/2 hidden md:block" style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${currentHouse.accent}66, transparent)` }}></div>

            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleExperiences.has(index);

              return (
                <div
                  key={index}
                  ref={el => experienceRefs.current[index] = el}
                  className={`relative mb-32 last:mb-0 md:mb-40 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}
                >
                  <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Section */}
                    <div className="w-full md:w-[45%]">
                      <div className="archive-card p-10 rounded-[2.5rem] border-white/5 hover:border-[#D4AF37]/40 transition-all duration-700 box-glow-gold group" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                        
                        {/* Meta Info */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 glass-panel-heavy rounded-xl flex items-center justify-center border-[#D4AF37]/20" style={{ borderColor: `${currentHouse.accent}33` }}>
                              <Building className="w-5 h-5" style={{ color: currentHouse.accent }} />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-cinzel" style={{ color: currentHouse.text }}>{exp.company}</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#99907c] tracking-[0.2em] uppercase font-cinzel group-hover:text-[#D4AF37] transition-colors" style={{ groupHover: { color: currentHouse.accent } }}>{exp.duration}</span>
                        </div>

                        {/* Title Section */}
                        <div className="space-y-4 mb-8">
                          <h3 className="text-3xl text-white font-cinzel leading-tight tracking-tight">{exp.position}</h3>
                          <p className="text-base text-[#99907c] leading-relaxed font-serif italic border-l border-[#D4AF37]/20 pl-6" style={{ borderColor: `${currentHouse.accent}33` }}>
                            {exp.description}
                          </p>
                        </div>

                        {/* Skills/Tools Cluster */}
                        <div className="flex flex-wrap gap-2.5">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-4 py-2 glass-panel text-[9px] font-bold tracking-[0.2em] uppercase font-cinzel rounded-full border-white/5 hover:border-[#D4AF37]/40 transition-all hover:text-[#D4AF37]"
                              style={{ color: currentHouse.text }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node - The Singularity */}
                    <div className="absolute left-0 md:left-1/2 top-10 md:top-1/2 w-10 h-10 transform -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-10 transition-all duration-700">
                      <div className="w-4 h-4 rounded-full shadow-[0_0_20px_#D4AF37] group-hover:scale-150 transition-transform" style={{ background: currentHouse.accent, boxShadow: `0 0 20px ${currentHouse.accent}` }}></div>
                      <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 animate-ping opacity-20" style={{ borderColor: currentHouse.accent }}></div>
                    </div>

                    {/* Space for the other side */}
                    <div className="hidden md:block md:w-[45%] p-10">
                      <div className={`text-[120px] font-harry tracking-tighter transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ color: `${currentHouse.accent}0D` }}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;