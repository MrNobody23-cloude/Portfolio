import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Star, Rocket, Cpu, Zap } from 'lucide-react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const projectRefs = useRef([]);
  const sectionRef = useRef(null);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate progress through the section
        const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (sectionHeight + viewportHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (projects.length === 0) return; // Don't set up observers until projects are loaded

    const observers = [];

    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleProjects(prev => new Set([...prev, index]));
            } else {
              setVisibleProjects(prev => {
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
  }, [projects]); // Add projects as dependency

  return (
    <section ref={sectionRef} id="projects" className="py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header with Parallax */}
        <div
          className="text-center mb-32"
          style={{
            transform: `translateY(${scrollProgress * -30}px)`,
            opacity: 1 - scrollProgress * 0.3
          }}
        >
          <div className="inline-flex items-center px-6 py-2 rounded-full glass-panel border-[#D4AF37]/20 mb-6">
            <Rocket className="w-4 h-4 text-[#D4AF37] mr-3" />
            <span className="text-xs font-bold tracking-[0.3em] text-[#d0c5af] uppercase font-cinzel">The Great Archive</span>
          </div>
          <h2 className="text-6xl md:text-7xl text-white mb-8 font-cinzel tracking-wider">
            Featured <span className="text-reveal glow-gold">Artifacts</span>
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          <p className="text-xl text-[#99907c] mt-8 max-w-2xl mx-auto font-serif italic">
            "A collection of digital manifestations, each forged in the fires of logic and bound by the laws of exceptional UX."
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-20 h-20 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
            <p className="text-[#D4AF37] mt-6 tracking-widest font-harry text-xl">Consulting the Oracles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20 px-8 glass-panel rounded-3xl border-[#740001]/30">
            <p className="text-[#AE0001] text-xl font-bold font-cinzel">The Archive is Sealed</p>
            <p className="text-[#99907c] mt-4 font-serif italic">{error}</p>
          </div>
        )}

        {/* Projects - Dynamic 3D Cards */}
        {!loading && !error && projects.length > 0 && (
          <div className="space-y-40">
            {projects.map((project, index) => {
              const isVisible = visibleProjects.has(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  ref={el => projectRefs.current[index] = el}
                  className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}
                >
                  {/* Connecting Celestial Thread */}
                  {index < projects.length - 1 && (
                    <div
                      className={`absolute ${isEven ? 'right-0' : 'left-0'} top-full w-[1px] h-40 bg-gradient-to-b from-[#D4AF37]/40 to-transparent transition-all duration-1000 ${isVisible ? 'scale-y-100' : 'scale-y-0'
                        }`}
                      style={{ transformOrigin: 'top' }}
                    ></div>
                  )}

                  <div className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Project Image - Artifact Visualization */}
                    <div
                      className={`relative group ${isEven ? '' : 'lg:col-start-2'}`}
                    >
                      {/* Magical Aura */}
                      <div className="absolute -inset-10 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#740001]/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                      <div className="relative archive-card rounded-2xl p-[1px] shadow-2xl overflow-hidden group-hover:scale-[1.03] transition-all duration-700">
                        <div className="relative h-96 overflow-hidden rounded-2xl">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:rotate-1"
                          />
                          
                          {/* Ethereal Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                          <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                          {/* Top Badge */}
                          <div className="absolute top-6 right-6 px-6 py-2 glass-panel-heavy rounded-full border-[#D4AF37]/30">
                            <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] font-cinzel uppercase flex items-center gap-2">
                              <Zap className="w-3 h-3" />
                              {project.highlight}
                            </span>
                          </div>

                          {/* Tech Icons Overlay */}
                          <div className="absolute bottom-6 left-6 flex gap-3">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <div
                                key={i}
                                className="w-12 h-12 glass-panel-heavy rounded-xl flex items-center justify-center border-white/10 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                                style={{ transitionDelay: `${i * 100}ms` }}
                              >
                                <Cpu className="w-5 h-5 text-[#D4AF37]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Details - Scholarly Description */}
                    <div
                      className={`space-y-8 ${isEven ? '' : 'lg:col-start-1'}`}
                    >
                      {/* Archive Index */}
                      <div className="flex items-center gap-6">
                        <div className="text-7xl font-harry text-[#D4AF37]/20 tracking-tighter">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#D4AF37]/40 to-transparent"></div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-5xl md:text-6xl text-white font-cinzel leading-tight tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-xl text-[#d0c5af]/90 font-serif leading-relaxed italic border-l-2 border-[#D4AF37]/20 pl-8">
                          {project.description}
                        </p>
                      </div>

                      {/* Runes (Tech Stack) */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-5 py-2 glass-panel text-[#d0c5af] text-[10px] font-bold tracking-[0.2em] rounded-full border-white/5 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all duration-300 uppercase font-cinzel"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Interaction Commands */}
                      <div className="flex flex-wrap gap-6 pt-6">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative px-8 py-4 glass-panel-heavy rounded-full font-bold text-[#D4AF37] border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all hover:scale-105 active:scale-95 flex items-center box-glow-gold"
                        >
                          <ExternalLink className="w-4 h-4 mr-3 group-hover:rotate-45 transition-transform" />
                          <span className="text-[10px] tracking-[0.2em] uppercase font-cinzel">Invoke Ritual</span>
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group px-8 py-4 glass-panel rounded-full font-bold text-[#d0c5af] border-white/10 hover:border-white/30 transition-all hover:bg-white/5 flex items-center"
                        >
                          <Github className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform" />
                          <span className="text-[10px] tracking-[0.2em] uppercase font-cinzel">View Grimoire</span>
                        </a>
                      </div>

                      {/* Favor of the Gods (Stars) */}
                      <div className="flex gap-3 pt-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 text-[#D4AF37] transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                              }`}
                            style={{ transitionDelay: `${800 + i * 100}ms` }}
                            fill={i < 4 ? "currentColor" : "none"}
                            stroke="currentColor"
                          />
                        ))}
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

export default Projects;