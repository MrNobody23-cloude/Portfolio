import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Building, Rocket } from 'lucide-react';

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleExperiences, setVisibleExperiences] = useState(new Set());
  const experienceRefs = useRef([]);

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
    <section id="experience" className="py-24 section-space relative overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0 opacity-20">
        <div className="stars"></div>
        <div className="stars stars-layer-2"></div>
      </div>

      {/* Subtle Ambient Light */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-white/[0.02] blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2 rounded-full space-card border border-white/20 mb-4 animate-fade-in-up">
            <span className="text-sm font-semibold text-gray-300">EXPERIENCE</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6 font-harry animate-fade-in-up stagger-1">
            Work <span className="text-gradient-nebula glow-cyan">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-600 mx-auto rounded-full animate-scale-in stagger-2"></div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4 text-lg">Loading experience...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">Error: {error}</p>
            <p className="text-gray-500 mt-2">Please check if the backend server is running on port 5000</p>
          </div>
        )}

        {/* Timeline */}
        {!loading && !error && experiences.length > 0 && (
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={el => experienceRefs.current[index] = el}
                className={`relative pl-10 pb-16 last:pb-0 transition-all duration-700 ${visibleExperiences.has(index)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Line */}
                {index !== experiences.length - 1 && (
                  <div className={`absolute left-[15px] top-14 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] to-cyan-500 transition-all duration-1000 ${visibleExperiences.has(index) ? 'scale-y-100' : 'scale-y-0'
                    }`} style={{ transformOrigin: 'top', transitionDelay: `${index * 200 + 300}ms` }}></div>
                )}

                {/* Timeline Dot */}
                <div className={`absolute left-0 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-black shadow-lg z-10 transition-all duration-500 ${visibleExperiences.has(index) ? 'scale-100' : 'scale-0'
                  }`} style={{ transitionDelay: `${index * 200 + 100}ms` }}></div>

                {/* Content Card */}
                <div className="space-card p-8 hover-lift ml-6 border border-[#D4AF37]/20 relative overflow-hidden group">
                  {/* Glowing Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-3xl group-hover:bg-[#D4AF37]/20 transition-all"></div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 relative z-10">
                    <div>
                      <h3 className="text-2xl text-white font-harry mb-2">{exp.position}</h3>
                      <div className="flex items-center mt-2 text-gray-300">
                        <Building className="w-5 h-5 mr-2 text-[#D4AF37]" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mt-3 md:mt-0 space-card px-4 py-2 rounded-lg border border-[#D4AF37]/20">
                      <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                      {exp.duration}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 relative z-10">{exp.description}</p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] text-sm rounded-full font-medium border border-[#D4AF37]/30 hover:bg-[#D4AF37]/30 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;