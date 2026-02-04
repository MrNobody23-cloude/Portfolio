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
    <section ref={sectionRef} id="projects" className="py-24 section-dark relative overflow-hidden">
      {/* Subtle Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-slow ${8 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Subtle Ambient Light */}
      <div
        className="absolute top-40 right-0 w-32 h-32 rounded-full bg-white/[0.02] blur-2xl"
        style={{
          transform: `translateY(${scrollProgress * 100}px) translateX(${scrollProgress * -50}px)`
        }}
      ></div>

      <div
        className="absolute bottom-40 left-0 w-40 h-40 rounded-full bg-white/[0.015] blur-2xl"
        style={{
          transform: `translateY(${scrollProgress * -80}px) translateX(${scrollProgress * 50}px)`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Parallax */}
        <div
          className="text-center mb-20"
          style={{
            transform: `translateY(${scrollProgress * -30}px)`,
            opacity: 1 - scrollProgress * 0.3
          }}
        >
          <div className="inline-flex items-center px-5 py-2 rounded-full space-card border border-white/20 mb-4 animate-fade-in-up">
            <Rocket className="w-5 h-5 text-white/60 mr-2" />
            <span className="text-sm font-semibold text-gray-300">PORTFOLIO</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6 font-harry animate-fade-in-up stagger-1">
            Featured <span className="text-gradient-cosmic glow-gold">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-600 mx-auto rounded-full animate-scale-in stagger-2"></div>
          <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto animate-fade-in-up stagger-3">
            Showcasing my development journey
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4 text-lg">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">Error: {error}</p>
            <p className="text-gray-500 mt-2">Please check if the backend server is running on port 5000</p>
          </div>
        )}

        {/* Projects - Dynamic 3D Cards */}
        {!loading && !error && projects.length > 0 && (
          <div className="space-y-32">
            {projects.map((project, index) => {
              const isVisible = visibleProjects.has(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  ref={el => projectRefs.current[index] = el}
                  className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  {/* Connecting Line */}
                  {index < projects.length - 1 && (
                    <div
                      className={`absolute ${isEven ? 'right-0' : 'left-0'} top-full w-0.5 h-32 bg-gradient-to-b from-[#D4AF37] to-transparent transition-all duration-1000 ${isVisible ? 'scale-y-100' : 'scale-y-0'
                        }`}
                      style={{ transformOrigin: 'top' }}
                    ></div>
                  )}

                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Project Image - Floating Animation */}
                    <div
                      className={`relative group ${isEven ? '' : 'lg:col-start-2'}`}
                      style={{
                        transform: isVisible
                          ? 'translateX(0) rotateY(0deg)'
                          : `translateX(${isEven ? '-100px' : '100px'}) rotateY(${isEven ? '20deg' : '-20deg'})`,
                        transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      {/* Hover Glow Effect */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Image Container with 3D Effect */}
                      <div className="relative overflow-hidden rounded-2xl border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-2xl">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Scan Line Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-1000"></div>

                        {/* Floating Badge */}
                        <div className="absolute top-4 right-4 px-4 py-2 space-card border border-cyan-500/50 backdrop-blur-sm">
                          <span className="text-cyan-300 text-sm font-bold flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            {project.highlight}
                          </span>
                        </div>

                        {/* Tech Stack Icons */}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 space-card rounded-lg flex items-center justify-center border border-[#D4AF37]/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                              style={{ transitionDelay: `${i * 100}ms` }}
                            >
                              <Cpu className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Project Details - Slide Animation */}
                    <div
                      className={`space-y-6 ${isEven ? '' : 'lg:col-start-1'}`}
                      style={{
                        transform: isVisible
                          ? 'translateX(0) translateY(0)'
                          : `translateX(${isEven ? '50px' : '-50px'}) translateY(30px)`,
                        opacity: isVisible ? 1 : 0,
                        transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: '200ms'
                      }}
                    >
                      {/* Project Number */}
                      <div className="flex items-center gap-4">
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-cosmic opacity-30">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
                      </div>

                      {/* Title */}
                      <h3 className="text-4xl md:text-5xl text-white font-harry leading-tight">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium rounded-full border border-[#D4AF37]/40 hover:bg-[#D4AF37]/20 hover:scale-105 transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="space-button space-button-primary group"
                        >
                          <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform" />
                          Launch Project
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="space-button group"
                        >
                          <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                          View Code
                        </a>
                      </div>

                      {/* Decorative Stars */}
                      <div className="flex gap-2 pt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 text-yellow-400 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                              }`}
                            style={{ transitionDelay: `${800 + i * 100}ms` }}
                            fill="currentColor"
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
    </section >
  );
}

export default Projects;